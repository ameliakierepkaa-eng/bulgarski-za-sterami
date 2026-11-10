// Wysyła przypomnienie o lekcji na zapisane telefony.
// Uruchamia go GitHub Actions (.github/workflows/push.yml) dwa razy dziennie.
// Sekrety repozytorium: VAPID_PRIVATE_KEY (klucz prywatny) i PUSH_SUBSCRIPTIONS (kody telefonów, każdy w osobnej linii).
import webpush from 'web-push';

const SITE = 'https://ameliakierepkaa-eng.github.io/bulgarski-za-sterami/';
const pub = process.env.VAPID_PUBLIC_KEY;
const priv = (process.env.VAPID_PRIVATE_KEY || '').trim();
const raw = (process.env.PUSH_SUBSCRIPTIONS || '').trim();

if (!pub || !priv || !raw) {
  console.log('Brak klucza albo kodów telefonów w sekretach – nic nie wysyłam.');
  process.exit(0);
}
webpush.setVapidDetails(SITE, pub, priv);

function parseSubs(text) {
  try { const j = JSON.parse(text); return Array.isArray(j) ? j : [j]; } catch (e) { /* kilka linii */ }
  return text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(s => s && s.endpoint);
}

const slot = process.env.SLOT || (new Date().getUTCHours() < 12 ? 'rano' : 'wieczor');
const MSG = {
  rano: [
    ['Добро утро! ☀️', 'Dzisiejsza plansza czeka – 5 lekcji i powtórka. Wiatrakowiec gotowy do startu.'],
    ['Здравей! 🚁', 'Kilka minut bułgarskiego na dobry początek dnia?'],
    ['Готова ли си? ✈️', 'Nowy level już czeka na planszy.']
  ],
  wieczor: [
    ['Добър вечер! 🌙', 'Jeszcze zdążysz z dzisiejszą lekcją bułgarskiego.'],
    ['Последен полет днес 🛬', 'Dokończ planszę i wyląduj w kolejnym mieście.'],
    ['Хайде! 💪', 'Kilka minut powtórki przed snem – słówka lepiej zostają w głowie.']
  ]
};
const list = MSG[slot] || MSG.rano;
const [title, body] = list[new Date().getUTCDate() % list.length];
const payload = JSON.stringify({title, body, url: './#plansza', slot});

const subs = parseSubs(raw);
console.log(`Wysyłam (${slot}) do ${subs.length} telefonu/ów: ${title}`);
let ok = 0;
for (const s of subs) {
  try { await webpush.sendNotification(s, payload, {TTL: 6 * 3600, urgency: 'normal'}); ok++; }
  catch (e) {
    const code = e.statusCode;
    console.log(code === 404 || code === 410
      ? 'Kod telefonu wygasł – włącz powiadomienia w aplikacji ponownie i podmień kod w sekrecie PUSH_SUBSCRIPTIONS.'
      : `Błąd wysyłania (${code || e.message}).`);
  }
}
console.log(`Wysłano: ${ok}/${subs.length}`);
if (subs.length && !ok) process.exitCode = 1;
