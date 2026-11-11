
/* ===== GRA: DZIENNA PLANSZA ===== */
function seedRng(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  return () => { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
function sshuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const city = s => CITIES[((s % CITIES.length) + CITIES.length) % CITIES.length];
const TILE = {
  new:{cap:'Nowy level', sub:'lekcja dnia', icon:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.6 6.1 6.6.6-5 4.4 1.5 6.5L12 16.7l-5.7 3.4 1.5-6.5-5-4.4 6.6-.6z"/></svg>'},
  recap:{cap:'Utrwalenie', sub:'ostatnie lekcje', icon:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>'},
  day:{cap:'Nowy level', sub:'Na co dzień', icon:'<span class="glyph" lang="bg">Аа</span>'},
  air:{cap:'Nowy level', sub:'Lotnictwo', icon:ICON.plane},
  phr:{cap:'Zwroty', sub:'dnia', icon:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/></svg>'},
  words:{cap:'Słówka', sub:'utrwalanie', icon:'<span class="glyph" lang="bg">Б</span>'},
  mix:{cap:'Mówienie', sub:'i gramatyka', icon:ICON.mic},
  review:{cap:'Powtórka', sub:'i lądowanie', icon:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/></svg>'}
};
/* punkty planszy w układzie 360×640: miasto startu, 6 pól, miasto docelowe */
const P = [[180,600],[96,522],[266,452],[98,380],[262,306],[104,232],[250,160],[180,66]];

function makeDay() {
  const st = S.game.stage, r = seedRng(today() + '#' + st);
  const cats = PHRASES.map((c, i) => catUnlocked(c.n) ? i : -1).filter(i => i >= 0);
  const ci = cats.length ? cats[Math.floor(r() * cats.length)] : 0, ph = LV['ph' + ci];
  const idx = sshuffle(ph.s.map((_, i) => i), r).slice(0, 5);
  return {date:today(), stage:st, finished:false,
    tiles:[{k:'new'}, {k:'recap'}, {k:'phr', ph:ph.id, idx}, {k:'words'}, {k:'mix'}, {k:'review'}].map(t => ({...t, done:false, stars:0}))};
}
/* Niedokończona plansza przechodzi na następny dzień razem z zaliczonymi polami – nowa powstaje dopiero po lądowaniu. */
function ensureDay() {
  const g = S.game;
  if (g.day && g.day.date === today()) return;
  if (g.day && !g.day.finished && Array.isArray(g.day.tiles) && g.day.tiles.length === 6 && g.day.tiles[0].k === 'new') { g.day.date = today(); g.day.carried = true; }
  else g.day = makeDay();
  save();
}
/* Jeden nowy level dziennie: zawsze pierwszy nieukończony, ok. 2 „Na co dzień” na 1 lotniczy.
   Nieukończony level wraca na planszę następnego dnia – nic się nie przeskakuje. */
/* Rytm zależy od numeru etapu (codzienny, codzienny, lotniczy), a nie od liczby zaliczonych leveli –
   inaczej po teście wstępnym, który zalicza wiele leveli „Na co dzień”, plansza długo dawała same lotnicze. */
function nextDaily() {
  const d = nextLevel('day'), a = nextLevel('air');
  if (!d || !a) return d || a;
  const st = S.game.day ? S.game.day.stage : S.game.stage;
  return st % 3 === 2 ? a : d;
}
function resolveLevel(t) {
  if (t.k === 'new' && !t.done) return nextDaily();
  if (t.id && LV[t.id]) return LV[t.id];
  if (t.k === 'new') return nextDaily();
  if (t.k === 'day') return nextLevel('day');
  return nextLevel('air') || nextLevel('day');
}
const isLevelTile = t => t.k === 'new' || t.k === 'day' || t.k === 'air';
/* Każda plansza miesza oba tory (średnio 2/3 pól codziennych, 1/3 lotniczych):
   utrwalenie i mówienie idą torem nowego levelu, słówka zawsze z drugiego toru, zwroty są codzienne. */
function tileTheme(t) {
  const d = S.game.day, l0 = d && d.tiles[0] ? resolveLevel(d.tiles[0]) : null;
  const nt = l0 ? l0.unit.track : 'day', other = nt === 'day' ? 'air' : 'day';
  if (isLevelTile(t)) { const l = resolveLevel(t); return l ? l.unit.track : nt; }
  return t.k === 'words' ? other : (t.k === 'recap' || t.k === 'mix') ? nt : t.k === 'phr' ? 'day' : null;
}
const THEME_PL = {day:'codzienne', air:'lotnicze'};
function trackPool(tr) {
  let ls = TRACK[tr].filter(l => isDone(l.id));
  const nx = nextLevel(tr); if (ls.length < 2 && nx && !ls.includes(nx)) ls = ls.concat(nx);
  return ls.length ? ls : poolLevels();
}
function recentLevels(tr) {
  const ls = TRACK[tr || 'day'].filter(l => isDone(l.id)).slice(-2);
  return ls.length ? ls : trackPool(tr || 'day');
}
function tileSub(t) {
  const th = tileTheme(t);
  if (t.k === 'new') return th === 'air' ? 'lotniczy' : 'codzienny';
  if (t.k === 'recap' || t.k === 'words' || t.k === 'mix') return THEME_PL[th];
  return TILE[t.k].sub;
}
function tileTitle(t) {
  if (isLevelTile(t)) { const l = resolveLevel(t); return l ? l.t : 'Trening utrwalający'; }
  if (t.k === 'recap') return `Utrwalenie – ${THEME_PL[tileTheme(t)]}`;
  if (t.k === 'phr') return `Zwroty: ${LV[t.ph].t}`;
  if (t.k === 'words') return `Słówka – ${THEME_PL[tileTheme(t)]}`;
  if (t.k === 'mix') return `Mówienie i gramatyka – ${THEME_PL[tileTheme(t)]}`;
  const n = Object.values(S.mistakes).filter(c => c > 0).length;
  return n ? `Powtórka błędów (${n})` : 'Powtórka dnia';
}
function poolLevels() {
  let ls = LEVELS.filter(l => isDone(l.id));
  const cur = [nextLevel('day'), nextLevel('air')].filter(Boolean);
  if (ls.length < 3) ls = ls.concat(cur.filter(l => !ls.includes(l)));
  return ls.length ? ls : [LEVELS[0]];
}
function buildWords(levels) {
  let pool = levels.flatMap(l => l.w.map((_, i) => W(l, i)));
  pool = shuffle(pool).sort((a, b) => (S.mistakes[b.ref] || 0) - (S.mistakes[a.ref] || 0));
  const a = k => pool[k % pool.length];
  const m = [3,4,5,6,7].map(a).filter((x, i, arr) => arr.findIndex(y => y.ref === x.ref) === i);
  return [{t:'mc', dir:'pl2bg', it:a(0)}, {t:'listen', it:a(1)}, {t:'mc', dir:'bg2pl', it:a(2)}, {t:'match', its:m},
    {t:'write', it:a(8)}, {t:'mc', dir:'pl2bg', it:a(3)}, {t:'listen', it:a(4)}, {t:'write', it:a(5)}, {t:'mc', dir:'bg2pl', it:a(6)}];
}
function buildMix(levels) {
  const G = shuffle(levels.flatMap(l => l.g.map((_, i) => GR(l, i))));
  const Sx = shuffle(levels.flatMap(l => l.s.map((_, i) => SN(l, i))));
  const g = k => G[k % G.length], s = k => Sx[k % Sx.length];
  const vb = verbItems(2);
  return [{t:'gram', it:g(0)}, {t:'speak', it:s(0)}, vb[0], {t:'order', it:s(1)}, {t:'gram', it:g(1)}, {t:'dict', it:s(2)},
    {t:'gram', it:g(2)}, {t:'speak', it:s(3)}, vb[1], {t:'order', it:s(4)}, {t:'gram', it:g(3)}, {t:'write', it:s(5)}];
}
function buildRecap(levels) {
  const Wd = shuffle(levels.flatMap(l => l.w.map((_, i) => W(l, i))));
  const Sx = shuffle(levels.flatMap(l => l.s.map((_, i) => SN(l, i))));
  const G = shuffle(levels.flatMap(l => l.g.map((_, i) => GR(l, i))));
  const w = k => Wd[k % Wd.length], s = k => Sx[k % Sx.length], g = k => G[k % G.length];
  const out = [{t:'mc', dir:'pl2bg', it:w(0)}, {t:'listen', it:w(1)}, {t:'order', it:s(0)}, {t:'write', it:w(2)}, {t:'speak', it:s(1)},
    {t:'mc', dir:'bg2pl', it:w(3)}, {t:'dict', it:s(2)}, {t:'write', it:s(3)}];
  if (G.length) out.splice(3, 0, {t:'gram', it:g(0)}), out.splice(7, 0, {t:'gram', it:g(1)});
  return out;
}
function buildPhr(t) {
  const lv = LV[t.ph], i = t.idx;
  return [{t:'mc', dir:'pl2bg', it:W(lv, i[0])}, {t:'order', it:SN(lv, i[1])}, {t:'listen', it:W(lv, i[2])}, {t:'speak', it:SN(lv, i[0])},
    {t:'order', it:SN(lv, i[3])}, {t:'mc', dir:'pl2bg', it:W(lv, i[4])}, {t:'write', it:SN(lv, i[2])}, {t:'speak', it:SN(lv, i[3])},
    {t:'dict', it:SN(lv, i[4])}, {t:'order', it:SN(lv, i[0])}];
}
function startPractice(tile, items, title, againFn) {
  $('#lesson').hidden = false; document.body.style.overflow = 'hidden';
  L = {mode:'practice', title, lv:null, tile, queue:items, i:0, right:0, scored:0, retried:new Set(), again: againFn || (() => startTile(tile))};
  renderLessonShell(); renderEx();
}
function startTile(i) {
  ensureDay();
  const t = S.game.day.tiles[i];
  if (isLevelTile(t)) {
    const l = resolveLevel(t);
    if (l) { t.id = l.id; save(); openBriefing(l.id, i); }
    else startPractice(i, buildWords(t.k === 'new' ? LEVELS : LEVELS.filter(x => x.unit.track === t.k)), 'Trening utrwalający');
  } else if (t.k === 'recap') startPractice(i, buildRecap(recentLevels(tileTheme(t))), tileTitle(t));
  else if (t.k === 'phr') openPhraseBrief(i);
  else if (t.k === 'words') startPractice(i, buildWords(trackPool(tileTheme(t))), tileTitle(t));
  else if (t.k === 'mix') startPractice(i, buildMix(trackPool(tileTheme(t))), tileTitle(t));
  else startReview();
}
function openPhraseBrief(i) {
  const t = S.game.day.tiles[i], lv = LV[t.ph];
  const el = $('#lesson'); el.hidden = false; document.body.style.overflow = 'hidden';
  el.innerHTML = `<div class="wrap lesson-top"><button class="xbtn" id="lx" aria-label="Zamknij">${ICON.x}</button><span class="eyebrow" style="flex:1">Odprawa · Zwroty dnia</span></div>
   <div class="lesson-body"><div class="wrap brief stack">
    <div><div class="prompt-kind">${esc(lv.t)}</div><h2 class="view">5 zwrotów na dziś</h2><div class="muted">Odsłuchaj każdy i powtórz na głos. Potem sprawdzimy, czy zostały w głowie.</div></div>
    <div class="plist">${t.idx.map(k => { const [pl, bg] = lv.s[k]; return `<div class="prow"><div class="txt"><div class="bg" lang="bg">${esc(bg)}</div><div class="tr">${esc(translit(bg))}</div><div class="pl">${esc(pl)}</div></div>${spkBtn(bg)}</div>`; }).join('')}</div>
   </div></div>
   <div class="lesson-foot"><div class="wrap foot-in"><button class="btn block" id="lgo">Startujemy · 10 zadań</button></div></div>`;
  $('#lx').onclick = closeLesson;
  $('#lgo').onclick = () => startPractice(i, buildPhr(t), `Zwroty: ${lv.t}`);
}
function markTile(i, starsN) {
  const d = S.game.day; if (!d || d.date !== today() || !d.tiles[i]) return null;
  const t = d.tiles[i];
  if (i > 0 && !d.tiles[i - 1].done) return null;
  t.done = true; t.stars = Math.max(t.stars || 0, starsN);
  if (!d.finished && d.tiles.every(x => x.done)) {
    d.finished = true;
    const to = (d.stage + 1) % CITIES.length;
    if (!S.game.visited.includes(to)) S.game.visited.push(to);
    S.game.stage = d.stage + 1;
    return city(d.stage + 1);
  }
  return null;
}

/* --- postać: pilotka w wiatrakowcu (własny rysunek) --- */
/* Hangar: co 5 ukończonych leveli nowy model – prawdziwe wiatrakowce w kolejności historycznej.
   [nazwa, rok / okres, kraj po polsku, kraj po bułgarsku, ciekawostka]. Rysunki są uproszczone, nie w skali. */
const GYROS = [
 ['Cierva C.4','1923','Hiszpania','Испания','Pierwszy wiatrakowiec, który naprawdę poleciał. Zbudował go Juan de la Cierva; przegubowe mocowanie łopat sprawiło, że maszyna przestała się przewracać na bok.'],
 ['Cierva C.8','1928','Wielka Brytania','Великобритания','Wersja C.8L jako pierwszy wiropłat przeleciała nad kanałem La Manche – z Londynu do Paryża. Za sterami siedział sam de la Cierva.'],
 ['Cierva C.19','1929','Wielka Brytania','Великобритания','Pierwszy wiatrakowiec Ciervy budowany seryjnie. Wirnik rozkręcało się przed startem strumieniem powietrza od śmigła, odchylonym przez usterzenie.'],
 ['Pitcairn PCA-2','1931','USA','САЩ','Pierwszy wiropłat z amerykańskim certyfikatem. Amelia Earhart ustanowiła na nim rekord wysokości – ponad 5600 m.'],
 ['Cierva C.30','1933','Wielka Brytania','Великобритания','Przełom: sterowanie bezpośrednie. Pilot pochyla całą głowicę wirnika, więc niepotrzebne są skrzydła ani lotki. W lotnictwie brytyjskim latał jako Avro Rota.'],
 ['Kellett KD-1','1934','USA','САЩ','W 1939 r. woził pocztę z dachu budynku poczty w Filadelfii – to była pierwsza regularna poczta lotnicza obsługiwana przez wiropłat.'],
 ['Kayaba Ka-1','1941','Japonia','Япония','Japoński wiatrakowiec obserwacyjny, wzorowany na amerykańskim Kellett KD-1.'],
 ['Bensen B-8','1955','USA','САЩ','Mały jednoosobowy wiatrakowiec Igora Bensena do samodzielnej budowy w garażu. To on spopularyzował słowo „gyrocopter”.'],
 ['Fairey Rotodyne','1957','Wielka Brytania','Великобритания','Pasażerski gigant na ok. 40 osób. Startował pionowo dzięki dyszom na końcach łopat, a w locie przelotowym wirnik kręcił się sam, jak w wiatrakowcu. Projekt przerwano w 1962 r.'],
 ['Wallis WA-116','1961','Wielka Brytania','Великобритания','Maleńki wiatrakowiec Kena Wallisa. Egzemplarz „Little Nellie” zagrał w filmie o Jamesie Bondzie „Żyje się tylko dwa razy” (1967).'],
 ['McCulloch J-2','1962','USA','САЩ','Dwumiejscowy wiatrakowiec z zamkniętą kabiną i miejscami obok siebie, z fabrycznym certyfikatem.'],
 ['Air & Space 18A','lata 60.','USA','САЩ','Certyfikowany dwumiejscowy wiatrakowiec, który potrafi wykonać „skok”: mocno rozkręcony wirnik odrywa go od ziemi prawie bez rozbiegu.'],
 ['RAF 2000','lata 90.','Kanada','Канада','Dwumiejscowy wiatrakowiec z zamkniętą kabiną, sprzedawany jako zestaw do samodzielnego montażu.'],
 ['Magni M-16','od lat 90.','Włochy','Италия','Popularny wiatrakowiec szkolny w układzie tandem (uczeń z przodu, instruktor z tyłu). W 2019 r. James Ketchell obleciał na nim świat.'],
 ['AutoGyro MT-03','od 2003','Niemcy','Германия','Otwarty tandem z Hildesheim – jeden z najczęściej spotykanych współczesnych wiatrakowców. Norman Surplus obleciał na nim kulę ziemską.'],
 ['ELA 07','od 2004','Hiszpania','Испания','Lekki otwarty tandem z Andaluzji – wiatrakowce wróciły do ojczyzny swojego wynalazcy.'],
 ['Xenon','od 2006','Polska','Полша','Wiatrakowiec produkowany w Polsce: zamknięta kabina i miejsca obok siebie, jak w samochodzie.'],
 ['AutoGyro Calidus','2009','Niemcy','Германия','Opływowa, zamknięta kabina w układzie tandem – stworzony do szybkich i wygodnych przelotów.'],
 ['PAL-V Liberty','od 2012 (prototyp)','Holandia','Нидерландия','Latający samochód: po drodze jeździ na trzech kołach, a po rozłożeniu wirnika i śmigła lata jako wiatrakowiec.']
];
const GYRO_STEP = 5;
const capF = s => s[0].toUpperCase() + s.slice(1);
const levelsDone = () => LEVELS.filter(l => isDone(l.id)).length;
const gyroTier = (n = levelsDone()) => Math.min(GYROS.length - 1, Math.floor(n / GYRO_STEP));
const plLv = n => n === 1 ? 'level' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? 'levele' : 'leveli';
function heroSVG(t = gyroTier()) {
  const body = ['var(--earth)', 'var(--sky)', 'var(--ok)', 'var(--gold)'][t % 4];
  const fin = t >= 16 ? '<path d="M68 15h8v8h-8z" fill="var(--surface)"/><path d="M68 23h8v8h-8z" fill="var(--ok)"/><path d="M68 31h8v9l-8-3z" fill="var(--bad)"/>'
    : t >= 10 ? `<path d="M68 15h8v25l-8-3z" fill="${t % 4 === 1 ? 'var(--earth)' : 'var(--sky)'}"/>` : `<path d="M69 21h6.5v19l-6.5-2.5z" fill="${t % 4 === 1 ? 'var(--earth)' : 'var(--sky)'}"/>`;
  return `<svg viewBox="0 0 88 64" aria-hidden="true">
  ${t >= 12 ? '<g fill="var(--surface)" stroke="var(--line)" opacity=".85"><circle cx="80" cy="36" r="3"/><circle cx="85" cy="33" r="2.2"/></g>' : ''}
  <rect x="38" y="9" width="3.5" height="17" rx="1" fill="var(--ink)"/>
  <g class="rotor"><ellipse cx="40" cy="9" rx="36" ry="2.6" fill="var(--ink)" opacity=".8"/>${t >= 14 ? '<ellipse cx="6" cy="9" rx="3.5" ry="2.6" fill="var(--gold)"/><ellipse cx="74" cy="9" rx="3.5" ry="2.6" fill="var(--gold)"/>' : ''}</g>
  <circle cx="40" cy="9" r="3" fill="var(--ink)"/>
  <rect x="56" y="33" width="17" height="3.5" rx="1.5" fill="var(--ink)"/>
  ${fin}${t >= 3 && t < 16 ? '<rect x="69" y="27" width="6.5" height="2.2" fill="var(--surface)"/>' : ''}
  <g class="prop"><ellipse cx="63" cy="35" rx="2" ry="10" fill="var(--muted)"/></g>
  <path d="M14 37c0-9 7-14 19-14h14c8 0 13 5 13 12 0 5-4 8-11 8H24c-6 0-10-2-10-6z" fill="${body}" stroke="var(--ink)" stroke-width="1.2"/>
  ${t >= 3 ? '<path d="M16 39h42" stroke="var(--surface)" stroke-width="2"/>' : ''}
  ${t >= 18 ? '<path d="M44 32l1.6 3.2 3.5.4-2.6 2.4.7 3.4-3.2-1.7-3.1 1.7.7-3.4-2.6-2.4 3.5-.4z" fill="var(--gold)" stroke="var(--ink)" stroke-width=".6"/>' : ''}
  <path d="M18 33c1-6 6-9 13-9v10H18z" fill="var(--sky-soft)" stroke="var(--ink)" stroke-width="1"/>
  ${t >= 8 ? '<circle cx="47" cy="24" r="5.2" fill="#F1C7A1"/><path d="M41.8 23.6a5.2 5.2 0 0 1 10.4 0z" fill="var(--earth)"/>' : ''}
  <circle cx="36" cy="23" r="6.5" fill="#F1C7A1"/>
  <path d="M29.5 22.5a6.5 6.5 0 0 1 13 0z" fill="var(--sky)"/>
  <path d="M41 24c3 1 5 4 5.5 7" stroke="#7A4A2A" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <rect x="33" y="22" width="5" height="2.4" rx="1" fill="var(--ink)"/>
  ${t >= 1 && t < 4 ? '<path d="M26 25l3-8h2.5l-2 8z" fill="var(--sky-soft)" stroke="var(--ink)" stroke-width="1"/>' : ''}
  ${t >= 4 ? `<path d="M23 27c1-10 9-14 18-13 7 1 11 5 12 12" fill="var(--sky-soft)" fill-opacity=".45" stroke="var(--ink)" stroke-width="1.2"/>` : ''}
  ${t >= 6 ? '<circle cx="14.6" cy="37.5" r="1.7" fill="var(--bad)"/><circle cx="74" cy="17" r="1.5" fill="var(--ok)"/>' : ''}
  <path d="M24 43l-3 6M46 43l3 6" stroke="var(--ink)" stroke-width="2"/>
  <circle cx="21" cy="51" r="4.5" fill="var(--ink)"/><circle cx="49" cy="51" r="4.5" fill="var(--ink)"/>
  ${t >= 2 ? `<path d="M15 51a6 5 0 0 1 12 0zM43 51a6 5 0 0 1 12 0z" fill="${body}" stroke="var(--ink)" stroke-width="1"/>` : ''}
</svg>`;
}
function gyroCard() {
  const n = levelsDone(), t = gyroTier(n), g = GYROS[t];
  const max = t >= GYROS.length - 1, need = max ? 0 : (t + 1) * GYRO_STEP - n;
  const pctv = max ? 100 : Math.round(100 * (GYRO_STEP - need) / GYRO_STEP);
  return `<section class="gyrocard"><a href="#profil" class="gyro-pic" aria-label="Hangar">${heroSVG(t)}</a><div class="gyro-txt">
    <span class="eyebrow">Twój wiatrakowiec · model ${t + 1}/${GYROS.length}</span>
    <b>${esc(g[0])} <span class="muted">· ${esc(g[1])} · <span lang="bg">${esc(g[3])}</span></span></b>
    <div class="bar"><i style="width:${pctv}%"></i></div>
    <small>${max ? 'Masz najnowszy model w hangarze!' : `Jeszcze <b>${need}</b> ${plLv(need)} do modelu ${esc(GYROS[t + 1][0])}`} · <a href="#profil">o tym modelu</a></small></div></section>`;
}
function hangarHTML() {
  const n = levelsDone(), t = gyroTier(n);
  return `<section class="card stack"><div><div class="eyebrow">Hangar</div><h3 style="margin:2px 0 0;font-family:var(--f-display);font-size:22px">Twoje wiatrakowce</h3>
    <p class="muted" style="margin:4px 0 0">Co ${GYRO_STEP} ukończonych leveli dostajesz nowy model. To prawdziwe wiatrakowce – od pierwszego z 1923 r. do latającego samochodu. Rysunki są uproszczone. Ukończone levele: ${n}.</p></div>
    <div class="hangar">${GYROS.map((g, i) => i <= t
      ? `<details class="hg on ${i === t ? 'cur' : ''}" ${i === t ? 'open' : ''}><summary>${heroSVG(i)}<b>${esc(g[0])}</b><small>${esc(g[1])} · ${esc(g[2])}</small></summary><p>${esc(g[4])}</p><p class="muted">Kraj po bułgarsku: <b lang="bg">${esc(g[3])}</b></p></details>`
      : `<div class="hg"><span class="hg-lock">${ICON.lock}</span><b>?</b><small>po ${i * GYRO_STEP} levelach</small></div>`).join('')}</div></section>`;
}
let heroShown = {key:'', idx:-1};

/* ===== MAPY PLANSZY: krajobraz dopasowany do miasta docelowego (indeks w CITIES) ===== */
const SCENE_OF = [['gory','Витоша'],['rzeka','река Марица'],['roze','Розова долина'],['rownina','Тракийска низина'],['morze','Черно море'],['morze','Черно море'],['morze','Черно море'],['rownina','Шуменско плато'],['dunaj','река Дунав'],['rzeka','река Янтра'],['gory','Стара планина'],['rownina','Дунавска равнина'],['dunaj','река Дунав'],['skaly','Белоградчишки скали'],['jeziora','Седемте рилски езера'],['gory','Пирин'],['skaly','Мелнишки пирамиди']];
function boardScene(ci) {
  const [kind, label] = SCENE_OF[ci] || SCENE_OF[0];
  const rings = (cx, cy, rot, rs) => `<g fill="none" stroke="var(--relief)" stroke-width="1.2">${rs.map(([rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})"/>`).join('')}</g>`;
  const mt = (x, y, s) => `<path d="M${x - s} ${y}L${x} ${y - s * 1.3}L${x + s} ${y}Z" fill="var(--relief)" opacity=".7"/><path d="M${x - s * .3} ${y - s * .91}L${x} ${y - s * 1.3}L${x + s * .3} ${y - s * .91}L${x + s * .1} ${y - s * .8}L${x} ${y - s * .93}L${x - s * .1} ${y - s * .8}Z" fill="var(--surface)"/>`;
  const tree = (x, y) => `<path d="M${x} ${y - 11}l-5.5 11h11z" fill="var(--ok)" opacity=".5"/>`;
  const trees = pts => pts.map(([x, y]) => tree(x, y)).join('');
  const wave = (x, y) => `<path d="M${x} ${y}q5-4 10 0t10 0" fill="none" stroke="var(--surface)" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`;
  const waves = pts => pts.map(([x, y]) => wave(x, y)).join('');
  const field = (pts, col, op) => `<path d="M${pts}Z" fill="var(--${col})" opacity="${op}"/>`;
  const S_ = {
    gory: () => rings(54, 150, -15, [[60,38],[44,27],[28,16]]) + rings(310, 300, 20, [[52,34],[36,23],[20,12]]) + rings(52, 470, 8, [[46,28],[30,18]])
      + mt(40, 168, 26) + mt(74, 172, 34) + mt(300, 318, 30) + mt(332, 322, 22) + mt(40, 486, 24) + mt(70, 490, 18) + mt(330, 520, 20)
      + trees([[150,150],[166,158],[140,166],[196,470],[212,478],[182,482],[330,150],[316,160],[30,330],[46,338],[330,440]])
      + `<ellipse cx="184" cy="268" rx="15" ry="7" fill="var(--water)"/>`,
    jeziora: () => rings(180, 330, 0, [[150,210],[120,170]]) + mt(40, 150, 28) + mt(330, 200, 30) + mt(34, 420, 24) + mt(332, 470, 26) + mt(180, 120, 20)
      + [[176,180,17,9],[150,236,13,7],[204,262,19,10],[168,318,14,8],[196,366,12,6],[160,424,20,10],[190,486,15,8]].map(([x, y, a, b]) => `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="var(--water)"/><ellipse cx="${x - a * .3}" cy="${y - b * .25}" rx="${a * .35}" ry="${b * .3}" fill="var(--surface)" opacity=".5"/>`).join('')
      + `<path d="M176 189q-20 22-24 40M152 243q30 6 48 12M204 272q-24 22-34 40M170 326q16 20 24 34M194 372q-22 26-32 44M162 434q18 26 26 44" fill="none" stroke="var(--water)" stroke-width="2" stroke-linecap="round"/>`
      + trees([[60,300],[76,310],[300,330],[316,340],[70,540],[300,560]]),
    morze: () => `<path d="M360 0H318C300 50 330 96 312 150C296 198 328 250 310 306C296 352 326 402 308 456C294 500 322 552 306 600C302 616 306 630 304 640H360Z" fill="var(--water)"/>`
      + `<path d="M318 0C300 50 330 96 312 150C296 198 328 250 310 306C296 352 326 402 308 456C294 500 322 552 306 600C302 616 306 630 304 640" fill="none" stroke="var(--gold)" stroke-width="5" opacity=".45"/>`
      + waves([[326,60],[334,120],[324,200],[336,262],[326,340],[334,420],[324,500],[332,572]])
      + `<g transform="translate(338 300)"><path d="M-9 4h18l-4 6h-10z" fill="var(--ink)"/><path d="M0 3V-16l11 15z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/><path d="M-1.5 2V-12l-8 12z" fill="var(--earth)"/></g>`
      + `<g transform="translate(300 400)"><path d="M-4 0h8l-1.5-22h-5z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/><path d="M-2.9-8h5.8M-2.5-15h5" stroke="var(--earth)" stroke-width="3"/><path d="M-3-22h6v-5h-6z" fill="var(--gold)" stroke="var(--ink)" stroke-width="1"/></g>`
      + `<path d="M30 110q5-6 10 0q5-6 10 0M60 130q4-5 8 0q4-5 8 0M36 470q5-6 10 0q5-6 10 0" fill="none" stroke="var(--ink)" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>`
      + rings(46, 250, -10, [[40,24],[24,14]]) + field('20 540L120 520L140 590L30 610', 'ok', '.14') + trees([[40,360],[56,368],[150,560],[30,160]]),
    dunaj: () => `<path d="M0 96C60 84 110 110 180 100S300 84 360 98V128C300 114 240 132 180 130S60 114 0 126Z" fill="var(--water)"/>`
      + waves([[30,108],[110,114],[236,112],[310,104]])
      + `<g transform="translate(96 108)"><path d="M-16 0h32l-5 7h-22z" fill="var(--ink)"/><rect x="-7" y="-7" width="13" height="7" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/><rect x="0" y="-13" width="4" height="6" fill="var(--earth)"/></g>`
      + field('0 128L0 0L360 0L360 98C300 84 240 96 180 100S60 84 0 96', 'ok', '.10')
      + field('20 300L120 286L132 350L26 366', 'gold', '.22') + field('232 430L340 416L346 486L240 500', 'ok', '.16') + field('24 520L110 508L120 570L30 584', 'gold', '.2')
      + `<path d="M30 316l96-13M30 332l98-13M30 348l100-13M240 448l100-13M242 466l102-13" stroke="var(--relief)" stroke-width="1" opacity=".8"/>`
      + rings(320, 250, 15, [[36,22],[20,12]]) + trees([[40,200],[56,208],[330,340],[316,350],[200,560],[216,568]]),
    rzeka: () => `<path d="M150 0C120 60 220 110 190 180S110 250 160 320S250 380 200 450S110 520 150 580S190 620 180 640" fill="none" stroke="var(--water)" stroke-width="11" stroke-linecap="round"/>`
      + `<path d="M150 0C120 60 220 110 190 180S110 250 160 320S250 380 200 450S110 520 150 580S190 620 180 640" fill="none" stroke="var(--surface)" stroke-width="1.2" stroke-dasharray="6 10" opacity=".7"/>`
      + `<g transform="translate(176 318)"><path d="M-22 0q22-18 44 0" fill="none" stroke="var(--ink)" stroke-width="2.4"/><path d="M-22 0h44M-11-7v7M0-9.5v9.5M11-7v7" stroke="var(--ink)" stroke-width="1.4"/></g>`
      + rings(46, 140, -12, [[42,26],[26,15],[12,7]]) + rings(318, 230, 18, [[40,25],[24,14]]) + rings(50, 430, 6, [[40,24],[24,14]]) + rings(316, 520, -8, [[38,22],[22,12]])
      + trees([[30,250],[46,258],[330,120],[314,130],[330,400],[40,540],[56,548]]),
    roze: () => mt(30, 120, 24) + mt(62, 124, 30) + mt(100, 122, 22) + mt(270, 118, 22) + mt(306, 124, 30) + mt(340, 120, 22) + mt(40, 598, 20) + mt(320, 600, 24)
      + [0,1,2,3,4,5,6].map(r => { const y = 210 + r * 52; return `<path d="M24 ${y}Q180 ${y + 16} 336 ${y}" fill="none" stroke="var(--ok)" stroke-width="5" opacity=".28" stroke-linecap="round"/>` + [40,72,104,136,168,200,232,264,296,326].map((x, i) => `<circle cx="${x}" cy="${y + 15 * (1 - Math.pow((x - 180) / 156, 2)) - 1}" r="${i % 3 ? 3.2 : 4}" fill="var(--${i % 4 === 1 ? 'gold' : 'earth'})" opacity=".7"/>`).join(''); }).join('')
      + `<path d="M0 168C80 150 130 180 200 166S300 150 360 172" fill="none" stroke="var(--water)" stroke-width="3" stroke-linecap="round"/>`,
    rownina: () => field('14 110L150 96L160 190L20 206', 'gold', '.26') + field('170 100L346 84L346 176L176 192', 'ok', '.16') + field('14 226L120 214L128 316L18 330', 'ok', '.14')
      + field('236 250L346 238L346 340L242 352', 'gold', '.24') + field('14 420L140 406L150 500L20 516', 'gold', '.2') + field('220 470L346 458L346 560L226 574', 'ok', '.15')
      + `<path d="M22 130l130-13M22 150l132-13M22 170l134-13M240 272l104-11M242 294l102-11M244 316l100-11M22 440l122-12M22 462l124-12M22 484l126-12" stroke="var(--relief)" stroke-width="1"/>`
      + [[200,120],[230,136],[262,116],[300,134],[330,150],[40,250],[70,270],[96,246],[246,496],[282,512],[318,494]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="var(--gold)"/><circle cx="${x}" cy="${y}" r="2" fill="var(--ink)" opacity=".7"/>`).join('')
      + `<path d="M0 372C70 356 130 388 200 372S300 352 360 370" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round"/>`
      + `<g transform="translate(320 400)"><path d="M0 0v-20M-10-26l20 12M10-26l-20 12" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/><path d="M-5 0h10l-2-10h-6z" fill="var(--earth)" opacity=".8"/></g>`
      + trees([[176,560],[192,568],[40,560]]),
    skaly: () => [[36,190,16,58],[64,200,12,44],[88,186,15,66],[296,330,15,62],[322,342,12,46],[340,326,13,70],[40,500,14,54],[66,510,11,40],[300,560,13,50],[326,566,11,38],[150,150,10,34],[210,560,10,34]].map(([x, y, w, h], i) => `<path d="M${x - w} ${y}Q${x - w * 1.1} ${y - h * .6} ${x - w * .5} ${y - h}Q${x} ${y - h * 1.14} ${x + w * .5} ${y - h}Q${x + w * 1.1} ${y - h * .6} ${x + w} ${y}Z" fill="var(--earth)" opacity="${i % 2 ? .3 : .42}"/><path d="M${x - w * .5} ${y - h * .55}q${w * .5} ${h * .08} ${w} 0M${x - w * .7} ${y - h * .25}q${w * .7} ${h * .08} ${w * 1.4} 0" fill="none" stroke="var(--ink)" stroke-width=".8" opacity=".35"/>`).join('')
      + rings(180, 300, 0, [[70,44],[48,28],[26,14]]) + trees([[150,420],[166,428],[240,200],[256,208],[30,330],[330,150]])
      + `<path d="M0 396C60 382 120 404 180 392S300 380 360 394" fill="none" stroke="var(--water)" stroke-width="3" stroke-linecap="round"/>`
  };
  return {kind, label, svg: (S_[kind] || S_.gory)()};
}

function viewBoard() {
  ensureDay();
  const d = S.game.day, from = city(d.stage), to = city(d.stage + 1);
  const lap = Math.floor(d.stage / CITIES.length) + 1;
  const doneN = d.tiles.filter(t => t.done).length;
  const target = d.finished ? 7 : doneN;
  const cur = d.tiles.findIndex(t => !t.done);
  const key = d.date + '#' + d.stage;
  const startIdx = heroShown.key === key && heroShown.idx >= 0 && heroShown.idx < target ? heroShown.idx : target;
  const pct = ([x, y]) => `left:${(x / 360 * 100).toFixed(2)}%;top:${(y / 640 * 100).toFixed(2)}%`;
  const PP = d.stage % 2 ? P.map(([x, y]) => [360 - x, y]) : P;   /* co drugi etap trasa biegnie lustrzanie */
  const scene = boardScene((d.stage + 1) % CITIES.length);
  let segs = '';
  for (let k = 0; k < 7; k++) {
    const [x1, y1] = PP[k], [x2, y2] = PP[k + 1], done = k < target;
    segs += `<path d="M${x1} ${y1} C${x1} ${y1 - 46} ${x2} ${y2 + 46} ${x2} ${y2}" fill="none" stroke="${done ? 'var(--earth)' : 'var(--ink)'}" stroke-width="${done ? 4 : 2}" stroke-linecap="round" ${done ? '' : 'stroke-dasharray="1 9" opacity=".55"'}/>`;
  }
  let grid = '';
  for (let x = 60; x < 360; x += 60) grid += `<path d="M${x} 0V640"/>`;
  for (let y = 80; y < 640; y += 80) grid += `<path d="M0 ${y}H360"/>`;
  const contours = (cx, cy, rot, rings) => rings.map(([rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})"/>`).join('');
  let html = '';
  if (!S.placement && !Object.keys(S.lv).length) {
    html += `<section class="card welcome stack" style="margin-bottom:18px">
      <div><div class="eyebrow">Odprawa przed pierwszym lotem</div><h2 class="view" style="margin-top:4px">Sprawdźmy, od czego zacząć</h2>
      <p class="muted" style="margin:6px 0 0">20 pytań, ok. 4 minuty. Test dobierze lekcje na planszy do tego, co już umiesz.</p></div>
      <div class="row"><a class="btn" href="#test">Zacznij test wstępny</a><button class="btn ghost" id="skipTest">Zacznę od zera</button></div></section>`;
  }
  html += `<div class="stagehead"><div class="eyebrow">Etap ${d.stage % CITIES.length + 1} z ${CITIES.length}${lap > 1 ? ` · runda ${lap}` : ''} · ${d.carried && !d.finished ? 'ciąg dalszy' : 'dziś'}</div>
    <h2 class="view">${d.finished ? `Wylądowałaś: <span lang="bg">${esc(to.bg)}</span>` : `<span lang="bg">${esc(from.bg)}</span> → <span lang="bg">${esc(to.bg)}</span>`}</h2>
    <p class="muted" style="margin:0">${d.finished ? 'Dzisiejsza trasa zaliczona. Pocztówka trafiła do kolekcji.' : `Przelot ${esc(from.pl)} – ${esc(to.pl)}: 5 lekcji i powtórka, tematy codzienne i lotnicze na zmianę.`}</p></div>
   ${window.claude ? '' : '<a class="hintbar" href="#pomoc"><span>🔇</span><span>Lektor nie mówi po bułgarsku? <b>Zobacz, jak włączyć głos</b></span><span aria-hidden="true">→</span></a>'}
   ${gyroCard()}
   <div class="board" id="board">
    <svg class="board-bg" viewBox="0 0 360 640" preserveAspectRatio="none" aria-hidden="true">
      <rect width="360" height="640" fill="var(--map)"/>
      <g stroke="var(--map-line)" stroke-width="1">${grid}</g>
      ${scene.svg}
      <text x="336" y="623" text-anchor="end" font-size="14" font-weight="800" fill="var(--muted)" lang="bg" style="font-family:var(--f-display);letter-spacing:.06em">${esc(scene.label)}</text>
      <g transform="translate(314 64)"><circle r="20" fill="none" stroke="var(--ink)" stroke-width="1" opacity=".45"/><path d="M0-25L4 0H-4z" fill="var(--earth)"/><path d="M0 25L4 0H-4z" fill="var(--ink)" opacity=".7"/><path d="M-25 0L0 3V-3zM25 0L0 3V-3z" fill="var(--ink)" opacity=".4"/><text y="-29" text-anchor="middle" font-size="10" font-weight="600" fill="var(--ink)" style="font-family:var(--f-mono)">N</text></g>
      <g transform="translate(24 618)"><path d="M0 0H60M0-4V4M30-3V3M60-4V4" stroke="var(--ink)" stroke-width="1.2"/><rect y="-2" width="30" height="4" fill="var(--ink)"/><text x="66" y="3.5" font-size="9" fill="var(--ink)" style="font-family:var(--f-mono)">10 NM</text></g>
      <g class="cloud c1" fill="var(--surface)" opacity=".8"><circle cx="170" cy="372" r="12"/><circle cx="184" cy="366" r="15"/><circle cx="200" cy="373" r="10"/><rect x="160" y="372" width="48" height="10" rx="5"/></g>
      <g class="cloud c2" fill="var(--surface)" opacity=".8"><circle cx="160" cy="206" r="10"/><circle cx="174" cy="200" r="13"/><circle cx="188" cy="206" r="9"/><rect x="151" y="205" width="45" height="9" rx="4.5"/></g>
      ${segs}
    </svg>
    <div class="cityp start" style="${pct(PP[0])}"><b lang="bg">${esc(from.bg)}</b><span>${esc(from.pl)}${from.icao ? ` · <i class="mono">${from.icao}</i>` : ''}</span></div>
    <div class="cityp dest ${d.finished ? 'reached' : ''}" style="${pct(PP[7])}"><b lang="bg">${esc(to.bg)}</b><span>${esc(to.pl)}${to.icao ? ` · <i class="mono">${to.icao}</i>` : ''}</span></div>
    ${d.tiles.map((t, i) => {
      const st = t.done ? 'done' : i === cur ? 'cur' : 'locked';
      const T = TILE[t.k];
      const lvl = isLevelTile(t) ? resolveLevel(t) : null;
      const ico = lvl ? illus(lvl.unit) : T.icon;
      return `<button class="tnode ${st}" style="${pct(PP[i + 1])}" data-tile="${i}" ${st === 'locked' ? 'disabled' : ''} aria-label="Lekcja ${i + 1}: ${esc(tileTitle(t))}${st === 'locked' ? ' – zablokowana' : st === 'done' ? ' – zaliczona' : ''}">
        <span class="disc">${t.done ? ICON.check : st === 'locked' ? ICON.lock : ico}</span>
        <span class="tcap"><b>${i < 5 ? `${i + 1}. ` : ''}${T.cap}</b><small>${t.done ? `<span class="ministars">${'★'.repeat(t.stars || 0)}</span>` : `<i class="th ${tileTheme(t) || ''}">${esc(tileSub(t))}</i>`}</small></span></button>`;
    }).join('')}
    <div class="hero" id="hero" style="${pct(PP[startIdx])}">${heroSVG()}</div>
   </div>`;
  if (d.finished) {
    html += `<section class="card postcard stack"><div class="eyebrow">Nowa pocztówka</div><div class="row" style="gap:12px">${spkBtn(to.f)}<div style="min-width:0;flex:1"><b lang="bg" style="font-size:18px">${esc(to.f)}</b><div class="muted">${esc(to.fpl)}</div></div></div>
      <div class="row"><button class="btn" id="bonus">Leć dalej: dodatkowy etap</button><a class="btn ghost" href="#kurs">Mapa kursu</a></div></section>`;
  } else {
    html += `<button class="btn block cta" data-tile="${cur}">${ICON.plane} Start ·${cur < 5 ? `Lekcja ${cur + 1}` : 'Powtórka'}: ${esc(tileTitle(d.tiles[cur]))}</button>`;
  }
  html += `<section style="margin-top:22px"><div class="eyebrow" style="margin-bottom:8px">Plan dnia</div><div class="plist">${d.tiles.map((t, i) => `
    <div class="prow"><span class="pnum ${t.done ? 'on' : ''}">${t.done ? ICON.check : i + 1}</span><div class="txt"><b>${esc(tileTitle(t))}</b><div class="pl">${i < 5 ? `<span class="thdot ${tileTheme(t) || ''}"></span>${esc(tileTheme(t) === 'air' ? 'temat lotniczy' : 'temat codzienny')}` : 'Błędy z całego kursu, potem lądowanie'}</div></div>
    ${t.done || i === cur ? `<button class="btn ${t.done ? 'ghost' : ''}" style="min-height:38px;padding:6px 14px" data-tile="${i}">${t.done ? 'Powtórz' : 'Start'}</button>` : `<span class="muted">${ICON.lock}</span>`}</div>`).join('')}</div></section>`;
  html += `<section style="margin-top:26px"><div class="row" style="justify-content:space-between;margin-bottom:8px"><span class="eyebrow">Kolekcja pocztówek</span><span class="qcount">${S.game.visited.length} / ${CITIES.length}</span></div>
    <div class="cards">${CITIES.map((c, i) => S.game.visited.includes(i) ?
      `<div class="pc"><b lang="bg">${esc(c.bg)}</b><small>${esc(c.pl)}${c.icao ? ` · <span class="mono">${c.icao}</span>` : ''}</small><p lang="bg">${esc(c.f)}</p><p class="muted">${esc(c.fpl)}</p><div class="row" style="gap:8px">${spkBtn(c.f)}${READS[i] ? `<button class="chip" data-read="${i}">Czytanka</button>` : ''}</div></div>` :
      `<div class="pc locked"><b>?</b><small>${i === 0 ? 'Start' : 'Jeszcze nie odwiedzone'}</small></div>`).join('')}</div></section>`;
  $('#view').innerHTML = html;
  $$('[data-tile]').forEach(b => b.onclick = () => startTile(+b.dataset.tile));
  $$('[data-read]').forEach(b => b.onclick = () => openReading(+b.dataset.read));
  const sk = $('#skipTest'); if (sk) sk.onclick = () => { S.placement = {skipped:true}; save(); viewBoard(); };
  const bo = $('#bonus'); if (bo) bo.onclick = () => { S.game.day = makeDay(); save(); heroShown = {key:'', idx:-1}; viewBoard(); renderHud(); };
  if (startIdx !== target) { const h = $('#hero'); requestAnimationFrame(() => requestAnimationFrame(() => { h.style.cssText = pct(PP[target]); })); }
  heroShown = {key, idx:target};
}

/* ===== LEKCJA: WYNIK ===== */
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = document.createElement('div'); box.className = 'confetti'; box.setAttribute('aria-hidden', 'true');
  const colors = ['var(--sky)', 'var(--earth)', 'var(--gold)', 'var(--ok)', '#fff', '#00966E', '#D62612'];
  box.innerHTML = Array.from({length:60}, () => `<i style="left:${Math.random() * 100}%;background:${pick(colors)};--dx:${Math.round(Math.random() * 160 - 80)}px;--rot:${Math.round(Math.random() * 900 - 450)}deg;animation-duration:${(1.8 + Math.random() * 1.6).toFixed(2)}s;animation-delay:${(Math.random() * .4).toFixed(2)}s"></i>`).join('');
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4200);
}
function finishLesson() {
  const mode0 = L.mode;
  const acc = L.scored ? L.right / L.scored : 1;
  const starsN = acc >= 0.9 ? 3 : acc >= 0.75 ? 2 : acc >= 0.6 ? 1 : 0;
  const pass = L.mode === 'review' || starsN > 0;
  let xp = L.right * 2, nextId = null;
  const tier0 = gyroTier();
  if (L.mode === 'level') {
    if (starsN > 0) xp += 5 + (starsN === 3 ? 5 : 0);
    const prev = S.lv[L.lv.id] || {stars:0};
    if (starsN > (prev.stars || 0)) S.lv[L.lv.id] = {stars:starsN, best:Math.round(acc * 100)};
    const n = nextLevel(L.lv.unit.track); nextId = n ? n.id : null;
    S.track = L.lv.unit.track;
  } else if (L.mode === 'practice' && pass) xp += 5;
  let landed = null;
  if (L.tile != null && pass) landed = markTile(L.tile, L.mode === 'review' ? 3 : starsN);
  if (landed) xp += 20;
  const factI = landed ? nextFact() : null, examId = L.exam || null, examPc = Math.round(acc * 100);
  if (examId) { if (!S.exams) S.exams = {}; if (examPc > (S.exams[examId] || 0)) S.exams[examId] = examPc; }
  const allDone = LEVELS.every(l => isDone(l.id));
  addXP(xp); save(); renderHud();
  const onBoard = L.tile != null;
  const name = L.mode === 'level' ? L.lv.t : L.mode === 'practice' ? L.title : 'Powtórka';
  const title = landed ? `Lądowanie: ${landed.bg}!` : L.mode === 'review' ? 'Powtórka zakończona' : pass ? (starsN === 3 ? 'Idealnie!' : 'Zaliczone!') : 'Odejście na drugi krąg';
  const sub = landed ? `Wylądowałaś w mieście ${landed.pl}. Cała dzisiejsza plansza zaliczona – brawo!` : L.mode === 'review' ? 'Błędy, które poprawiłaś, zniknęły z listy.' : pass ? `„${name}” zaliczone.${onBoard ? ' Wiatrakowiec leci na następne pole.' : ''}` : 'Do zaliczenia potrzeba 60% poprawnych odpowiedzi. Spróbuj jeszcze raz – tym razem pójdzie lepiej.';
  const tier1 = gyroTier(), upg = tier1 > tier0 ? GYROS[tier1] : null;
  $('#lesson').innerHTML = `<div class="wrap lesson-top"><button class="xbtn" id="lx" aria-label="Zamknij">${ICON.x}</button><span style="flex:1"></span></div>
   <div class="lesson-body"><div class="wrap result">
    ${L.mode === 'level' ? illus(L.lv.unit, 'big') : ''}
    <div class="prompt-kind">${esc(L.mode === 'level' ? L.lv.unit.t : name)}</div>
    <h2 class="view" style="font-size:28px">${esc(title)}</h2>
    ${L.mode !== 'review' ? stars(starsN, 'bigstars') : ''}
    <p class="muted">${esc(sub)}</p>
    ${landed ? `<div class="card postcard" style="text-align:left"><div class="eyebrow">Pocztówka</div><div class="row" style="gap:12px;margin-top:6px">${spkBtn(landed.f)}<div style="flex:1;min-width:0"><b lang="bg">${esc(landed.f)}</b><div class="muted">${esc(landed.fpl)}</div></div></div></div>` : ''}
    ${factI != null ? chestHTML(factI) : ''}
    ${landed && READS[CITIES.indexOf(landed)] ? `<button class="btn soft block" id="resRead" style="margin-top:10px">Przeczytaj czytankę o mieście</button>` : ''}
    ${examId === 'pilot' ? (examPc >= 80 && allDone ? diplomaBoxHTML() : `<p class="muted">${examPc >= 80 ? 'Świetny wynik! Dyplom odblokuje się po ukończeniu wszystkich leveli.' : 'Do zaliczenia egzaminu potrzeba 80%.'}</p>`) : ''}
    ${upg ? `<div class="card gyrocard upgrade"><span class="gyro-pic">${heroSVG(tier1)}</span><div class="gyro-txt" style="text-align:left"><span class="eyebrow">Nowy wiatrakowiec w hangarze!</span><b>${esc(upg[0])} <span class="muted">· ${esc(upg[1])} · ${esc(upg[2])}</span></b><small>${esc(upg[4])}</small><small>${tier1 < GYROS.length - 1 ? `Następny model za ${GYRO_STEP} leveli.` : 'To najlepszy model – gratulacje!'}</small></div></div>` : ''}
    <div class="kpis"><div class="kpi"><b>+${xp}</b><span>XP</span></div><div class="kpi"><b>${Math.round(acc * 100)}%</b><span>trafność</span></div><div class="kpi"><b>${streakNow()}</b><span>dni z rzędu</span></div></div>
   </div></div>
   <div class="lesson-foot"><div class="wrap foot-in"><div class="foot-btns">
    ${!pass || !onBoard ? `<button class="btn ghost" id="again">${pass ? 'Powtórz' : 'Spróbuj ponownie'}</button>` : ''}
    ${onBoard ? `<button class="btn" id="toBoard">Wróć na planszę</button>` : (L.mode === 'level' && pass && nextId ? `<button class="btn" id="goNext">Następny level</button>` : `<button class="btn" id="toMap">Zamknij</button>`)}
   </div></div></div>`;
  if (landed || upg || (pass && starsN === 3) || (mode0 === 'review' && acc >= 0.9)) confetti();
  const lvId = L.lv && L.lv.id, tile = L.tile, again = L.again, mode = L.mode;
  $('#lx').onclick = closeLesson;
  const co = $('#chestOpen'); if (co) co.onclick = () => { co.hidden = true; $('#chestIn').hidden = false; confetti(); };
  const rr = $('#resRead'); if (rr) rr.onclick = () => openReading(CITIES.indexOf(landed));
  wireDiploma(examPc);
  const a = $('#again'); if (a) a.onclick = () => { if (mode === 'level') openBriefing(lvId, tile); else if (mode === 'review') startReview(); else if (again) again(); };
  const g = $('#goNext'); if (g) g.onclick = () => openBriefing(nextId);
  const t = $('#toMap'); if (t) t.onclick = closeLesson;
  const tb = $('#toBoard'); if (tb) tb.onclick = () => { closeLesson(); if (location.hash !== '#plansza') location.hash = '#plansza'; window.scrollTo(0, 0); };
}

