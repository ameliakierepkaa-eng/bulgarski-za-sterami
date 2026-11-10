// Service worker: aplikacja działa bez internetu po pierwszym otwarciu.
// Wersję podstawia build – każda publikacja tworzy nową pamięć podręczną.
const VERSION = '__VERSION__';
const CACHE = 'bg-za-sterami-' + VERSION;
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('bg-za-sterami-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

// Powiadomienia push (wysyła je harmonogram GitHub Actions dwa razy dziennie)
const localDate = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (err) { d = {body: e.data ? e.data.text() : ''}; }
  e.waitUntil((async () => {
    let st = null;
    try { const c = await caches.open('bg-stan'); const r = await c.match('stan'); if (r) st = await r.json(); } catch (err) {}
    let title = d.title || 'Bułgarski za sterami', body = d.body || 'Czas na lekcję bułgarskiego!';
    if (st && st.date === localDate()) {
      if (st.finished) { title = 'Отлично! 🎉'; body = 'Dzisiejsza plansza zaliczona. Jeśli masz ochotę – szybka gra albo powtórka.'; }
      else if (st.done > 0) body = `Masz już ${st.done} z 6 pól. Jeszcze ${6 - st.done} i lądujesz w kolejnym mieście!`;
    } else if (st && st.streak > 1) body += ` Seria: ${st.streak} dni – nie przerywaj jej!`;
    return self.registration.showNotification(title, {body, icon: 'icons/icon-192.png', tag: 'lekcja', renotify: true, data: {url: d.url || './#plansza'}});
  })());
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './#plansza', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope) && 'focus' in w) { if ('navigate' in w) w.navigate(url).catch(() => {}); return w.focus(); }
    return self.clients.openWindow(url);
  }));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Strona: najpierw sieć (świeża wersja), bez sieci – kopia z pamięci
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }

  // Czcionki Google: z pamięci, w tle odświeżane
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // Własne pliki: z pamięci, a jeśli ich nie ma – z sieci
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
