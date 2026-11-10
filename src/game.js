
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
function ensureDay() { const g = S.game; if (!g.day || g.day.date !== today()) { g.day = makeDay(); save(); } }
/* Jeden nowy level dziennie: zawsze pierwszy nieukończony, ok. 2 „Na co dzień” na 1 lotniczy.
   Nieukończony level wraca na planszę następnego dnia – nic się nie przeskakuje. */
function nextDaily() {
  const d = nextLevel('day'), a = nextLevel('air');
  if (!d || !a) return d || a;
  const nd = TRACK.day.filter(l => isDone(l.id)).length, na = TRACK.air.filter(l => isDone(l.id)).length;
  return na * 2 < nd ? a : d;
}
function resolveLevel(t) {
  if (t.id && LV[t.id]) return LV[t.id];
  if (t.k === 'new') return nextDaily();
  if (t.k === 'day') return nextLevel('day');
  return nextLevel('air') || nextLevel('day');
}
const isLevelTile = t => t.k === 'new' || t.k === 'day' || t.k === 'air';
function recentLevels() {
  const last = (tr, n) => TRACK[tr].filter(l => isDone(l.id)).slice(-n);
  const ls = [...last('day', 2), ...last('air', 1)];
  return ls.length ? ls : poolLevels();
}
function tileTitle(t) {
  if (isLevelTile(t)) { const l = resolveLevel(t); return l ? l.t : 'Trening utrwalający'; }
  if (t.k === 'recap') return 'Utrwalenie ostatnich lekcji';
  if (t.k === 'phr') return `Zwroty: ${LV[t.ph].t}`;
  if (t.k === 'words') return 'Słówka – utrwalanie';
  if (t.k === 'mix') return 'Mówienie i gramatyka';
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
  } else if (t.k === 'recap') startPractice(i, buildRecap(recentLevels()), 'Utrwalenie ostatnich lekcji');
  else if (t.k === 'phr') openPhraseBrief(i);
  else if (t.k === 'words') startPractice(i, buildWords(poolLevels()), 'Słówka – utrwalanie');
  else if (t.k === 'mix') startPractice(i, buildMix(poolLevels()), 'Mówienie i gramatyka');
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
/* Hangar: co 5 ukończonych leveli nowy model wiatrakowca – nazwy to bułgarskie ptaki (przy okazji słówka). */
const GYROS = [['врабче','wróbel'],['синигер','sikorka'],['лястовица','jaskółka'],['кос','kos'],['славей','słowik'],['гугутка','sierpówka'],['кукувица','kukułka'],['кълвач','dzięcioł'],['сврака','sroka'],['гарван','kruk'],['чапла','czapla'],['щъркел','bocian'],['пеликан','pelikan'],['сокол','sokół'],['ястреб','jastrząb'],['сова','sowa'],['бухал','puchacz'],['лебед','łabędź'],['орел','orzeł']];
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
  const n = levelsDone(), t = gyroTier(n), [bg, pl] = GYROS[t];
  const max = t >= GYROS.length - 1, need = max ? 0 : (t + 1) * GYRO_STEP - n;
  const pctv = max ? 100 : Math.round(100 * (GYRO_STEP - need) / GYRO_STEP);
  return `<section class="gyrocard"><a href="#profil" class="gyro-pic" aria-label="Hangar">${heroSVG(t)}</a><div class="gyro-txt">
    <span class="eyebrow">Twój wiatrakowiec · model ${t + 1}/${GYROS.length}</span>
    <b><span lang="bg">„${esc(capF(bg))}”</span> <span class="muted">– ${esc(pl)}</span></b>
    <div class="bar"><i style="width:${pctv}%"></i></div>
    <small>${max ? 'Masz najlepszy model w hangarze!' : `Jeszcze <b>${need}</b> ${plLv(need)} do modelu <span lang="bg">„${esc(capF(GYROS[t + 1][0]))}”</span> (${esc(GYROS[t + 1][1])})`}</small></div></section>`;
}
function hangarHTML() {
  const n = levelsDone(), t = gyroTier(n);
  return `<section class="card stack"><div><div class="eyebrow">Hangar</div><h3 style="margin:2px 0 0;font-family:var(--f-display);font-size:22px">Twoje wiatrakowce</h3>
    <p class="muted" style="margin:4px 0 0">Co ${GYRO_STEP} ukończonych leveli dostajesz nowy model. Każdy nosi imię bułgarskiego ptaka. Ukończone levele: ${n}.</p></div>
    <div class="hangar">${GYROS.map(([bg, pl], i) => `<div class="hg ${i <= t ? 'on' : ''} ${i === t ? 'cur' : ''}">${i <= t ? heroSVG(i) : `<span class="hg-lock">${ICON.lock}</span>`}<b lang="bg">${i <= t ? esc(capF(bg)) : '?'}</b><small>${i <= t ? esc(pl) : `po ${i * GYRO_STEP} levelach`}</small></div>`).join('')}</div></section>`;
}
let heroShown = {key:'', idx:-1};

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
  let segs = '';
  for (let k = 0; k < 7; k++) {
    const [x1, y1] = P[k], [x2, y2] = P[k + 1], done = k < target;
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
  html += `<div class="stagehead"><div class="eyebrow">Etap ${d.stage % CITIES.length + 1} z ${CITIES.length}${lap > 1 ? ` · runda ${lap}` : ''} · dziś</div>
    <h2 class="view">${d.finished ? `Wylądowałaś: <span lang="bg">${esc(to.bg)}</span>` : `<span lang="bg">${esc(from.bg)}</span> → <span lang="bg">${esc(to.bg)}</span>`}</h2>
    <p class="muted" style="margin:0">${d.finished ? 'Dzisiejsza trasa zaliczona. Pocztówka trafiła do kolekcji.' : `Przelot ${esc(from.pl)} – ${esc(to.pl)}: 5 lekcji i powtórka. Każde pole przesuwa Twój wiatrakowiec.`}</p></div>
   ${window.claude ? '' : '<a class="hintbar" href="#pomoc"><span>🔇</span><span>Lektor nie mówi po bułgarsku? <b>Zobacz, jak włączyć głos</b></span><span aria-hidden="true">→</span></a>'}
   ${gyroCard()}
   <div class="board" id="board">
    <svg class="board-bg" viewBox="0 0 360 640" preserveAspectRatio="none" aria-hidden="true">
      <rect width="360" height="640" fill="var(--map)"/>
      <g stroke="var(--map-line)" stroke-width="1">${grid}</g>
      <path d="M360 330C338 350 344 380 326 400C310 420 322 450 304 474C290 494 300 520 286 545C276 566 290 600 280 640H360Z" fill="var(--water)" opacity=".6"/>
      <g fill="none" stroke="var(--water)" stroke-width="1.3"><path d="M318 440q6-4 12 0t12 0"/><path d="M306 520q6-4 12 0t12 0"/><path d="M318 600q6-4 12 0t12 0"/></g>
      <path d="M0 205C40 200 60 230 90 262S150 290 180 300S220 350 240 380S290 400 318 418" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="196" cy="236" rx="16" ry="8" transform="rotate(-15 196 236)" fill="var(--water)"/>
      <g fill="none" stroke="var(--relief)" stroke-width="1.3">${contours(42, 118, -20, [[52,32],[38,23],[25,15],[12,7]])}${contours(328, 250, 25, [[44,28],[30,19],[17,10]])}${contours(58, 476, 10, [[38,22],[24,14],[12,7]])}</g>
      <path d="M38 121l4-8 4 8z" fill="var(--ink)"/><text x="49" y="121" font-size="9" fill="var(--muted)" style="font-family:var(--f-mono)">2925</text>
      <path d="M324 253l4-8 4 8z" fill="var(--ink)"/><text x="296" y="270" font-size="9" fill="var(--muted)" style="font-family:var(--f-mono)">2191</text>
      <g transform="translate(314 64)"><circle r="20" fill="none" stroke="var(--ink)" stroke-width="1" opacity=".45"/><path d="M0-25L4 0H-4z" fill="var(--earth)"/><path d="M0 25L4 0H-4z" fill="var(--ink)" opacity=".7"/><path d="M-25 0L0 3V-3zM25 0L0 3V-3z" fill="var(--ink)" opacity=".4"/><text y="-29" text-anchor="middle" font-size="10" font-weight="600" fill="var(--ink)" style="font-family:var(--f-mono)">N</text></g>
      <g transform="translate(24 618)"><path d="M0 0H60M0-4V4M30-3V3M60-4V4" stroke="var(--ink)" stroke-width="1.2"/><rect y="-2" width="30" height="4" fill="var(--ink)"/><text x="66" y="3.5" font-size="9" fill="var(--ink)" style="font-family:var(--f-mono)">10 NM</text></g>
      <g class="cloud c1" fill="var(--surface)" opacity=".75"><circle cx="300" cy="372" r="12"/><circle cx="314" cy="366" r="15"/><circle cx="330" cy="373" r="10"/><rect x="290" y="372" width="48" height="10" rx="5"/></g>
      <g class="cloud c2" fill="var(--surface)" opacity=".75"><circle cx="40" cy="306" r="10"/><circle cx="54" cy="300" r="13"/><circle cx="68" cy="306" r="9"/><rect x="31" y="305" width="45" height="9" rx="4.5"/></g>
      ${segs}
    </svg>
    <div class="cityp start" style="${pct(P[0])}"><b lang="bg">${esc(from.bg)}</b><span>${esc(from.pl)}${from.icao ? ` · <i class="mono">${from.icao}</i>` : ''}</span></div>
    <div class="cityp dest ${d.finished ? 'reached' : ''}" style="${pct(P[7])}"><b lang="bg">${esc(to.bg)}</b><span>${esc(to.pl)}${to.icao ? ` · <i class="mono">${to.icao}</i>` : ''}</span></div>
    ${d.tiles.map((t, i) => {
      const st = t.done ? 'done' : i === cur ? 'cur' : 'locked';
      const T = TILE[t.k];
      const lvl = isLevelTile(t) ? resolveLevel(t) : null;
      const ico = lvl ? illus(lvl.unit) : T.icon;
      return `<button class="tnode ${st}" style="${pct(P[i + 1])}" data-tile="${i}" ${st === 'locked' ? 'disabled' : ''} aria-label="Lekcja ${i + 1}: ${esc(tileTitle(t))}${st === 'locked' ? ' – zablokowana' : st === 'done' ? ' – zaliczona' : ''}">
        <span class="disc">${t.done ? ICON.check : st === 'locked' ? ICON.lock : ico}</span>
        <span class="tcap"><b>${i < 5 ? `${i + 1}. ` : ''}${T.cap}</b><small>${t.done ? `<span class="ministars">${'★'.repeat(t.stars || 0)}</span>` : T.sub}</small></span></button>`;
    }).join('')}
    <div class="hero" id="hero" style="${pct(P[startIdx])}">${heroSVG()}</div>
   </div>`;
  if (d.finished) {
    html += `<section class="card postcard stack"><div class="eyebrow">Nowa pocztówka</div><div class="row" style="gap:12px">${spkBtn(to.f)}<div style="min-width:0;flex:1"><b lang="bg" style="font-size:18px">${esc(to.f)}</b><div class="muted">${esc(to.fpl)}</div></div></div>
      <div class="row"><button class="btn" id="bonus">Leć dalej: dodatkowy etap</button><a class="btn ghost" href="#kurs">Mapa kursu</a></div></section>`;
  } else {
    html += `<button class="btn block" style="margin-top:16px" data-tile="${cur}">Start · ${cur < 5 ? `Lekcja ${cur + 1}` : 'Powtórka'}: ${esc(tileTitle(d.tiles[cur]))}</button>`;
  }
  html += `<section style="margin-top:22px"><div class="eyebrow" style="margin-bottom:8px">Plan dnia</div><div class="plist">${d.tiles.map((t, i) => `
    <div class="prow"><span class="pnum ${t.done ? 'on' : ''}">${t.done ? ICON.check : i + 1}</span><div class="txt"><b>${esc(tileTitle(t))}</b><div class="pl">${i < 5 ? TILE[t.k].sub : 'Błędy z całego kursu, potem lądowanie'}</div></div>
    ${t.done || i === cur ? `<button class="btn ${t.done ? 'ghost' : ''}" style="min-height:38px;padding:6px 14px" data-tile="${i}">${t.done ? 'Powtórz' : 'Start'}</button>` : `<span class="muted">${ICON.lock}</span>`}</div>`).join('')}</div></section>`;
  html += `<section style="margin-top:26px"><div class="row" style="justify-content:space-between;margin-bottom:8px"><span class="eyebrow">Kolekcja pocztówek</span><span class="qcount">${S.game.visited.length} / ${CITIES.length}</span></div>
    <div class="cards">${CITIES.map((c, i) => S.game.visited.includes(i) ?
      `<div class="pc"><b lang="bg">${esc(c.bg)}</b><small>${esc(c.pl)}${c.icao ? ` · <span class="mono">${c.icao}</span>` : ''}</small><p lang="bg">${esc(c.f)}</p><p class="muted">${esc(c.fpl)}</p>${spkBtn(c.f)}</div>` :
      `<div class="pc locked"><b>?</b><small>${i === 0 ? 'Start' : 'Jeszcze nie odwiedzone'}</small></div>`).join('')}</div></section>`;
  $('#view').innerHTML = html;
  $$('[data-tile]').forEach(b => b.onclick = () => startTile(+b.dataset.tile));
  const sk = $('#skipTest'); if (sk) sk.onclick = () => { S.placement = {skipped:true}; save(); viewBoard(); };
  const bo = $('#bonus'); if (bo) bo.onclick = () => { S.game.day = makeDay(); save(); heroShown = {key:'', idx:-1}; viewBoard(); renderHud(); };
  if (startIdx !== target) { const h = $('#hero'); requestAnimationFrame(() => requestAnimationFrame(() => { h.style.cssText = pct(P[target]); })); }
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
    ${upg ? `<div class="card gyrocard upgrade"><span class="gyro-pic">${heroSVG(tier1)}</span><div class="gyro-txt" style="text-align:left"><span class="eyebrow">Nowy wiatrakowiec w hangarze!</span><b><span lang="bg">„${esc(capF(upg[0]))}”</span> <span class="muted">– ${esc(upg[1])}</span></b><small>${tier1 < GYROS.length - 1 ? `Następny model za ${GYRO_STEP} leveli.` : 'To najlepszy model – gratulacje!'}</small></div></div>` : ''}
    <div class="kpis"><div class="kpi"><b>+${xp}</b><span>XP</span></div><div class="kpi"><b>${Math.round(acc * 100)}%</b><span>trafność</span></div><div class="kpi"><b>${streakNow()}</b><span>dni z rzędu</span></div></div>
   </div></div>
   <div class="lesson-foot"><div class="wrap foot-in"><div class="foot-btns">
    ${!pass || !onBoard ? `<button class="btn ghost" id="again">${pass ? 'Powtórz' : 'Spróbuj ponownie'}</button>` : ''}
    ${onBoard ? `<button class="btn" id="toBoard">Wróć na planszę</button>` : (L.mode === 'level' && pass && nextId ? `<button class="btn" id="goNext">Następny level</button>` : `<button class="btn" id="toMap">Zamknij</button>`)}
   </div></div></div>`;
  if (landed || upg || (pass && starsN === 3) || (mode0 === 'review' && acc >= 0.9)) confetti();
  const lvId = L.lv && L.lv.id, tile = L.tile, again = L.again, mode = L.mode;
  $('#lx').onclick = closeLesson;
  const a = $('#again'); if (a) a.onclick = () => { if (mode === 'level') openBriefing(lvId, tile); else if (mode === 'review') startReview(); else if (again) again(); };
  const g = $('#goNext'); if (g) g.onclick = () => openBriefing(nextId);
  const t = $('#toMap'); if (t) t.onclick = closeLesson;
  const tb = $('#toBoard'); if (tb) tb.onclick = () => { closeLesson(); if (location.hash !== '#plansza') location.hash = '#plansza'; window.scrollTo(0, 0); };
}

