# Notatki dla Claude Code

- Projekt bez zależności. Po każdej zmianie w `src/` lub `web/` uruchom `node build.js` (na Windows bez Node: `powershell -ExecutionPolicy Bypass -File build.ps1`) i otwórz `docs/index.html` przez lokalny serwer. Service worker nie działa z `file://`.
- `docs/` to strona na GitHub Pages (PWA). Zbudowany `docs/` trzeba commitować razem ze źródłami. `web/pwa.js` trafia tylko do `docs/`, nie do `dist/artifact.html`, dlatego kod w `src/` musi działać bez `window.PWA`.
- Kolejność skryptów w `build.js` jest ważna: `data.js` → `app.js` → `game.js` → `fun.js` (ten ostatni wywołuje `route()`, `initSpeech()`, `initCloud()`).
- Treści edukacyjne trzymaj w `src/data.js`. Bułgarski musi być poprawny; warianty odpowiedzi rozdzielaj `|`, poprawna opcja w zadaniach gramatycznych jest zawsze pierwsza.
- Użytkowniczka to kobieta – polskie polecenia i zdania w formie żeńskiej (np. „Zgubiłam się”, „Chciałabym”).
- Kolory tylko przez tokeny CSS z `:root` w `src/shell.html` (jasny i ciemny motyw). Układ musi działać na telefonie (~400 px).
- Nie dodawaj cytatów z tekstów piosenek chronionych prawem autorskim (tylko utwory sprzed 1929 r.).
- Stan aplikacji: obiekt `S` (patrz `defaults()` w `app.js`); zapis przez `save()`. Nowe pola dodawaj w `defaults()`, a jeśli mają się łączyć między urządzeniami – także w `mergeStates()`.
