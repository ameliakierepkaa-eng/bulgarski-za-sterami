/* ===== APLIKACJA NA TELEFON (PWA) – tylko w wersji z GitHub Pages ===== */
const PWA = {
  prompt: null,
  standalone: () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true,
  ios: () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
  async install() {
    if (!PWA.prompt) return false;
    PWA.prompt.prompt();
    const r = await PWA.prompt.userChoice.catch(() => null);
    PWA.prompt = null;
    if (location.hash === '#profil') route();
    return !!(r && r.outcome === 'accepted');
  }
};
window.PWA = PWA;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); PWA.prompt = e; if (location.hash === '#profil') route(); });
window.addEventListener('appinstalled', () => { PWA.prompt = null; toast('Zainstalowano! Ikona jest na ekranie głównym.'); });

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloading) return; reloading = true; location.reload(); });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      const offer = w => {
        const bar = document.createElement('div');
        bar.className = 'toast update';
        bar.innerHTML = '<span>Jest nowa wersja aplikacji.</span><button class="btn soft" type="button">Odśwież</button>';
        bar.querySelector('button').onclick = () => { bar.remove(); w.postMessage('skipWaiting'); };
        document.body.appendChild(bar);
      };
      if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing; if (!w) return;
        w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) offer(w); });
      });
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
    }).catch(() => {});
  });
}
