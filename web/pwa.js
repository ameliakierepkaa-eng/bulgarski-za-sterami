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
/* Powiadomienia push: klucz publiczny VAPID (prywatny jest tylko w sekretach GitHuba). */
const VAPID_PUBLIC = 'BJynTcCWbt1wgE2RkhO2kMyqLrJvTlAI-zcXe_mMeSHJ7EC0Am_yyefVtw6iwwrhBb7I_SF7HSv2CqZ1jj-54Yo';
const b64uToBytes = s => { const b = atob((s + '='.repeat((4 - s.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, c => c.charCodeAt(0)); };
PWA.push = {
  supported: () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window,
  permission: () => ('Notification' in window ? Notification.permission : 'unsupported'),
  async current() { const r = await navigator.serviceWorker.ready; return r.pushManager.getSubscription(); },
  async enable() {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') throw new Error(perm);
    const r = await navigator.serviceWorker.ready;
    return (await r.pushManager.getSubscription()) || r.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: b64uToBytes(VAPID_PUBLIC)});
  },
  async disable() { const s = await PWA.push.current(); if (s) await s.unsubscribe(); },
  async test() { const r = await navigator.serviceWorker.ready; return r.showNotification('Bułgarski za sterami', {body: 'Tak będą wyglądać przypomnienia o lekcji. Добре!', icon: 'icons/icon-192.png', tag: 'test', data: {url: './#plansza'}}); }
};
/* Stan dnia dla service workera – żeby powiadomienie wiedziało, czy lekcja jest już zrobiona. */
PWA.saveState = st => { try { caches.open('bg-stan').then(c => c.put('stan', new Response(JSON.stringify(st), {headers: {'Content-Type': 'application/json'}}))).catch(() => {}); } catch (e) {} };
window.PWA = PWA;
/* pwa.js ładuje się po aplikacji – odśwież widoki, które z niego korzystają */
if (typeof renderHud === 'function') renderHud();
if (typeof route === 'function' && /^#(profil|pomoc)$/.test(location.hash)) route();
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
