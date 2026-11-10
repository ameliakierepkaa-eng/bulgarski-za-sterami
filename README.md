# Bułgarski za sterami 🇧🇬🚁

Gra do nauki bułgarskiego z polskiego: codzienna plansza (5 lekcji + powtórka, wiatrakowiec lecący przez Bułgarię), kurs z levelami „Na co dzień” i „Lotnictwo / wiatrakowce”, fiszki i dopasowywanie zwrotów, ćwiczenia z gramatyki (układanie zdań, rodzaje, rodzajnik -ът/-та/-то), gry w pisanie i mówienie słówek oraz zakładka „Gry i zabawy”.

**▶ Zagraj:** https://ameliakierepkaa-eng.github.io/bulgarski-za-sterami/

## Na telefon

Aplikację instaluje się prosto ze strony, bez sklepu Play ani App Store:

- **Android (Chrome):** otwórz link → menu **⋮** → **Zainstaluj aplikację** (albo przycisk „Zainstaluj aplikację” w zakładce Profil).
- **iPhone (Safari):** otwórz link → **Udostępnij** → **Do ekranu początkowego**.

Po instalacji gra ma własną ikonę, otwiera się na pełnym ekranie i działa bez internetu. Postęp zapisuje się na urządzeniu. Żeby przenieść go na inne urządzenie, użyj **Profil → Kopia zapasowa**.

## Powiadomienia o lekcji (2× dziennie)

Harmonogram `.github/workflows/push.yml` (GitHub Actions) uruchamia `push/send.mjs` o 7:00 i 18:00 UTC (8:00 i 19:00 czasu polskiego zimą, 9:00 i 20:00 latem) i wysyła powiadomienie push na zapisane telefony.

1. **Settings → Secrets and variables → Actions:** sekret `VAPID_PRIVATE_KEY` – klucz prywatny (para do klucza publicznego w `web/pwa.js` i w workflow).
2. Na telefonie: **Profil → Powiadomienia → Włącz powiadomienia → Skopiuj kod telefonu** i wklej go jako sekret `PUSH_SUBSCRIPTIONS` (kilka telefonów – każdy kod w osobnej linii).
3. Test: **Actions → Przypomnienia o lekcji → Run workflow**.

Na iPhonie powiadomienia działają tylko w aplikacji dodanej do ekranu początkowego (iOS 16.4+). GitHub może opóźnić uruchomienie o kilkanaście–kilkadziesiąt minut.

## Budowanie

Czysty HTML + CSS + JavaScript, bez frameworków i bez zależności. Kod źródłowy jest w `src/` i `web/`, gotowa strona w `docs/`.

```bash
node build.js                                        # z Node.js
powershell -ExecutionPolicy Bypass -File build.ps1   # albo na Windows bez Node
```

Po każdej zmianie w `src/` lub `web/` zbuduj projekt i wrzuć na GitHub także folder `docs/`.

## Publikacja na GitHub Pages

1. Utwórz publiczne repozytorium `bulgarski-za-sterami` i wrzuć do niego wszystkie pliki projektu.
2. **Settings → Pages → Build and deployment:** Source = **Deploy from a branch**, Branch = **main**, folder = **/docs** → **Save**.
3. Po 1–2 minutach strona działa pod adresem `https://<twoja-nazwa>.github.io/bulgarski-za-sterami/`.

## Struktura

| Plik | Co zawiera |
|---|---|
| `src/shell.html` | `<title>`, czcionki, cały CSS (tokeny kolorów, jasny/ciemny motyw, dolny pasek na telefonie) i szkielet HTML |
| `src/data.js` | Treści: `UNITS`, `PHRASES`, `GRAMMAR`, `PLACEMENT`, `CITIES`, `PH_UNLOCK`, `NOUNS`, `SONGS`, `TRIVIA`, `FRIENDS` |
| `src/app.js` | Rdzeń: stan i zapis, kopia zapasowa, motyw, XP/rangi/seria, lektor i rozpoznawanie mowy, routing, mapa kursu, powtórki, profil, test wstępny, silnik ćwiczeń |
| `src/game.js` | Dzienna plansza, postać, pocztówki, ekran wyniku (z konfetti) |
| `src/fun.js` | Zakładki Zwroty, Słówka, Gramatyka, Gry i zabawy; na końcu start aplikacji |
| `web/head.html` | Nagłówek strony: meta, manifest, ikony |
| `web/pwa.js` | Instalacja aplikacji i powiadomienie o nowej wersji |
| `web/sw.js` | Service worker – działanie bez internetu |
| `web/manifest.webmanifest`, `web/icons/` | Nazwa, kolory i ikony aplikacji |
| `build.js` / `build.ps1` | Składają wszystko w `docs/` (GitHub Pages) i `dist/artifact.html` (claude.ai) |

## Formaty danych (`src/data.js`)

- Słówko: `['polski', 'bułgarski|wariant2', 'notatka?']` – warianty po `|` są akceptowane jako poprawne odpowiedzi.
- Zdanie: `['polski', 'bułgarski|wariant']`.
- Gramatyka: `{s:'Zdanie z ___', o:['poprawna','zła','zła'], pl:'tłumaczenie', why:'wyjaśnienie'}` albo `{q:'pytanie', o:[...]}`. Poprawna odpowiedź jest zawsze pierwsza w `o`.
- Rzeczownik: `['bg', 'pl', 'm|f|n', 'forma z rodzajnikiem', 'id levelu', 'uwaga?']`.

## Uwagi

- **Lektor:** w claude.ai używa `window.claude.use('tts')`, a poza nim głosu przeglądarki (`speechSynthesis`). Na Androidzie bułgarski głos daje „Usługa Google zamiany tekstu na mowę” (Ustawienia → Ułatwienia dostępu → Zamiana tekstu na mowę → zainstaluj język bułgarski). Na iPhonie: Ustawienia → Dostępność → Zawartość mówiona → Głosy → Български.
- **Rozpoznawanie mowy:** w claude.ai `claude.use('dictation')`, poza nim Web Speech API (Chrome, Safari). Bez mikrofonu ćwiczenia mówienia przechodzą w samoocenę.
- **Postęp:** `localStorage` (klucz `bg-za-sterami-v1`). W claude.ai dodatkowo baza artefaktu (`db`), która łączy stan między urządzeniami. Poza claude.ai służy do tego plik kopii zapasowej.
- Cytaty piosenek są tylko z utworów z domeny publicznej (sprzed 1929 r.). O współczesne utwory gra pyta bez cytowania tekstów.
