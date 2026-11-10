// Składa aplikację z plików w src/ i web/.
// Użycie: node build.js   (bez Node na Windows: powershell -File build.ps1 – robi to samo)
//
//  docs/              → strona na GitHub Pages (instalowana na telefonie jako aplikacja – PWA)
//  dist/artifact.html → treść do publikacji jako Artifact w claude.ai
const fs = require('fs');
const path = require('path');

const root = __dirname;
const src = f => fs.readFileSync(path.join(root, 'src', f), 'utf8');
const web = f => path.join(root, 'web', f);
const ORDER = ['data.js', 'app.js', 'game.js', 'fun.js']; // kolejność ma znaczenie: fun.js na końcu uruchamia aplikację
const VERSION = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);

const scripts = ORDER.map(src).join('\n');
const body = src('shell.html') + '\n<script>\n' + scripts + '\n</script>\n';
const head = fs.readFileSync(web('head.html'), 'utf8');
const pwa = fs.readFileSync(web('pwa.js'), 'utf8');

// 1) claude.ai – bez szkieletu i bez service workera
fs.mkdirSync(path.join(root, 'dist'), {recursive: true});
fs.writeFileSync(path.join(root, 'dist', 'artifact.html'), body);

// 2) GitHub Pages – pełna strona + manifest, service worker i ikony
const out = path.join(root, 'docs');
fs.mkdirSync(path.join(out, 'icons'), {recursive: true});
fs.writeFileSync(path.join(out, 'index.html'), head + body + '<script>\n' + pwa + '\n</script>\n</body></html>\n');
fs.writeFileSync(path.join(out, 'sw.js'), fs.readFileSync(web('sw.js'), 'utf8').replace('__VERSION__', VERSION));
fs.copyFileSync(web('manifest.webmanifest'), path.join(out, 'manifest.webmanifest'));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
for (const f of fs.readdirSync(web('icons'))) fs.copyFileSync(path.join(web('icons'), f), path.join(out, 'icons', f));

console.log(`Gotowe (wersja ${VERSION}): docs/ (GitHub Pages) i dist/artifact.html (claude.ai)`);
