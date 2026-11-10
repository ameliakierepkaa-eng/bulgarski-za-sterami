
/* ===== GRA: DZIENNA PLANSZA ===== */
function seedRng(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  return () => { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
function sshuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const city = s => CITIES[((s % CITIES.length) + CITIES.length) % CITIES.length];
const TILE = {
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
    tiles:[{k:'day'}, {k:'air'}, {k:'phr', ph:ph.id, idx}, {k:'words'}, {k:'mix'}, {k:'review'}].map(t => ({...t, done:false, stars:0}))};
}
function ensureDay() { const g = S.game; if (!g.day || g.day.date !== today()) { g.day = makeDay(); save(); } }
function resolveLevel(t) {
  if (t.id && LV[t.id]) return LV[t.id];
  if (t.k === 'day') return nextLevel('day');
  return nextLevel('air') || nextLevel('day');
}
function tileTitle(t) {
  if (t.k === 'day' || t.k === 'air') { const l = resolveLevel(t); return l ? l.t : 'Trening utrwalający'; }
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
  return [{t:'gram', it:g(0)}, {t:'speak', it:s(0)}, {t:'order', it:s(1)}, {t:'gram', it:g(1)}, {t:'dict', it:s(2)},
    {t:'gram', it:g(2)}, {t:'speak', it:s(3)}, {t:'order', it:s(4)}, {t:'gram', it:g(3)}, {t:'write', it:s(5)}];
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
  if (t.k === 'day' || t.k === 'air') {
    const l = resolveLevel(t);
    if (l) { t.id = l.id; save(); openBriefing(l.id, i); }
    else startPractice(i, buildWords(LEVELS.filter(x => x.unit.track === t.k)), 'Trening utrwalający');
  } else if (t.k === 'phr') openPhraseBrief(i);
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
const HERO = `<svg viewBox="0 0 84 64" aria-hidden="true">
  <rect x="38" y="9" width="3.5" height="17" rx="1" fill="var(--ink)"/>
  <g class="rotor"><ellipse cx="40" cy="9" rx="36" ry="2.6" fill="var(--ink)" opacity=".8"/></g>
  <circle cx="40" cy="9" r="3" fill="var(--ink)"/>
  <rect x="56" y="33" width="17" height="3.5" rx="1.5" fill="var(--ink)"/>
  <path d="M69 21h6.5v19l-6.5-2.5z" fill="var(--sky)"/>
  <g class="prop"><ellipse cx="63" cy="35" rx="2" ry="10" fill="var(--muted)"/></g>
  <path d="M14 37c0-9 7-14 19-14h14c8 0 13 5 13 12 0 5-4 8-11 8H24c-6 0-10-2-10-6z" fill="var(--earth)"/>
  <path d="M18 33c1-6 6-9 13-9v10H18z" fill="var(--sky-soft)" stroke="var(--ink)" stroke-width="1"/>
  <circle cx="36" cy="23" r="6.5" fill="#F1C7A1"/>
  <path d="M29.5 22.5a6.5 6.5 0 0 1 13 0z" fill="var(--sky)"/>
  <path d="M41 24c3 1 5 4 5.5 7" stroke="#7A4A2A" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <rect x="33" y="22" width="5" height="2.4" rx="1" fill="var(--ink)"/>
  <path d="M24 43l-3 6M46 43l3 6" stroke="var(--ink)" stroke-width="2"/>
  <circle cx="21" cy="51" r="4.5" fill="var(--ink)"/><circle cx="49" cy="51" r="4.5" fill="var(--ink)"/>
</svg>`;
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
    segs += `<path d="M${x1} ${y1} C${x1} ${y1 - 46} ${x2} ${y2 + 46} ${x2} ${y2}" fill="none" stroke="${done ? 'var(--sky)' : 'var(--line)'}" stroke-width="${done ? 6 : 4}" stroke-linecap="round" ${done ? '' : 'stroke-dasharray="2 11"'}/>`;
  }
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
   <div class="board" id="board">
    <svg class="board-bg" viewBox="0 0 360 640" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sky-soft)"/><stop offset="1" style="stop-color:var(--surface)"/></linearGradient></defs>
      <rect width="360" height="640" fill="url(#skyg)"/>
      <path d="M0 120 L40 92 L70 110 L110 70 L150 104 L190 80 L230 112 L270 86 L320 116 L360 96 L360 140 L0 140z" fill="var(--surface2)"/>
      <path d="M0 560 C60 530 120 556 180 540 C240 524 300 548 360 530 L360 640 L0 640z" fill="var(--earth-soft)"/>
      <g class="cloud c1" fill="var(--surface)"><circle cx="300" cy="400" r="16"/><circle cx="318" cy="394" r="20"/><circle cx="338" cy="402" r="14"/><rect x="290" y="400" width="56" height="14" rx="7"/></g>
      <g class="cloud c2" fill="var(--surface)"><circle cx="40" cy="300" r="13"/><circle cx="58" cy="292" r="17"/><circle cx="76" cy="300" r="12"/><rect x="30" y="298" width="56" height="12" rx="6"/></g>
      <g class="cloud c1" fill="var(--surface)"><circle cx="60" cy="168" r="12"/><circle cx="76" cy="160" r="15"/><circle cx="92" cy="168" r="11"/></g>
      ${segs}
    </svg>
    <div class="cityp start" style="${pct(P[0])}"><b lang="bg">${esc(from.bg)}</b><span>${esc(from.pl)}${from.icao ? ` · <i class="mono">${from.icao}</i>` : ''}</span></div>
    <div class="cityp dest ${d.finished ? 'reached' : ''}" style="${pct(P[7])}"><b lang="bg">${esc(to.bg)}</b><span>${esc(to.pl)}${to.icao ? ` · <i class="mono">${to.icao}</i>` : ''}</span></div>
    ${d.tiles.map((t, i) => {
      const st = t.done ? 'done' : i === cur ? 'cur' : 'locked';
      const T = TILE[t.k];
      return `<button class="tnode ${st}" style="${pct(P[i + 1])}" data-tile="${i}" ${st === 'locked' ? 'disabled' : ''} aria-label="Lekcja ${i + 1}: ${esc(tileTitle(t))}${st === 'locked' ? ' – zablokowana' : st === 'done' ? ' – zaliczona' : ''}">
        <span class="disc">${t.done ? ICON.check : st === 'locked' ? ICON.lock : T.icon}</span>
        <span class="tcap"><b>${i < 5 ? `${i + 1}. ` : ''}${T.cap}</b><small>${t.done ? `<span class="ministars">${'★'.repeat(t.stars || 0)}</span>` : T.sub}</small></span></button>`;
    }).join('')}
    <div class="hero" id="hero" style="${pct(P[startIdx])}">${HERO}</div>
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
  $('#lesson').innerHTML = `<div class="wrap lesson-top"><button class="xbtn" id="lx" aria-label="Zamknij">${ICON.x}</button><span style="flex:1"></span></div>
   <div class="lesson-body"><div class="wrap result">
    <div class="prompt-kind">${esc(L.mode === 'level' ? L.lv.unit.t : name)}</div>
    <h2 class="view" style="font-size:28px">${esc(title)}</h2>
    ${L.mode !== 'review' ? stars(starsN, 'bigstars') : ''}
    <p class="muted">${esc(sub)}</p>
    ${landed ? `<div class="card postcard" style="text-align:left"><div class="eyebrow">Pocztówka</div><div class="row" style="gap:12px;margin-top:6px">${spkBtn(landed.f)}<div style="flex:1;min-width:0"><b lang="bg">${esc(landed.f)}</b><div class="muted">${esc(landed.fpl)}</div></div></div></div>` : ''}
    <div class="kpis"><div class="kpi"><b>+${xp}</b><span>XP</span></div><div class="kpi"><b>${Math.round(acc * 100)}%</b><span>trafność</span></div><div class="kpi"><b>${streakNow()}</b><span>dni z rzędu</span></div></div>
   </div></div>
   <div class="lesson-foot"><div class="wrap foot-in"><div class="foot-btns">
    ${!pass || !onBoard ? `<button class="btn ghost" id="again">${pass ? 'Powtórz' : 'Spróbuj ponownie'}</button>` : ''}
    ${onBoard ? `<button class="btn" id="toBoard">Wróć na planszę</button>` : (L.mode === 'level' && pass && nextId ? `<button class="btn" id="goNext">Następny level</button>` : `<button class="btn" id="toMap">Zamknij</button>`)}
   </div></div></div>`;
  if (landed || (pass && starsN === 3) || (mode0 === 'review' && acc >= 0.9)) confetti();
  const lvId = L.lv && L.lv.id, tile = L.tile, again = L.again, mode = L.mode;
  $('#lx').onclick = closeLesson;
  const a = $('#again'); if (a) a.onclick = () => { if (mode === 'level') openBriefing(lvId, tile); else if (mode === 'review') startReview(); else if (again) again(); };
  const g = $('#goNext'); if (g) g.onclick = () => openBriefing(nextId);
  const t = $('#toMap'); if (t) t.onclick = closeLesson;
  const tb = $('#toBoard'); if (tb) tb.onclick = () => { closeLesson(); if (location.hash !== '#plansza') location.hash = '#plansza'; window.scrollTo(0, 0); };
}

