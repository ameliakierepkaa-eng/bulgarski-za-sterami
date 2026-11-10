/* ===== NARZĘDZIA ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const first = s => s.split('|')[0];
const alts = s => s.split('|');
const ICON = {
  spk:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  slow:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 15c0-4 3.5-7 8-7s7 3 7 6h2a1 1 0 0 1 0 2H5a2 2 0 0 1-2-1zm4 3h2v2H7zm8 0h2v2h-2z"/></svg>',
  mic:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  star:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z"/></svg>',
  lock:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V8a3 3 0 0 0-6 0z"/></svg>',
  check:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  x:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  plane:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0v5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5z"/></svg>'
};
/* Ilustracje działów (64×64): kontur tuszem + przesunięta plama koloru (a1 terakota, a2 złoto, a3 zieleń, a4 granat). */
const ILLUS = {
  d0:'<path class="a1" d="M14 16h40v24H32l-10 9v-9h-8z"/><path d="M10 12h40v26H28l-10 9v-9h-8z"/><text x="30" y="31" font-size="17" text-anchor="middle" lang="bg">Аа</text>',
  d1:'<circle class="a2" cx="34" cy="34" r="20"/><circle cx="32" cy="32" r="20"/><path d="M32 19v13l9 6M32 12v3M32 49v3M12 32h3M49 32h3"/>',
  d2:'<path class="a1" d="M14 31h42l-6 22H20z"/><path d="M10 28h44l-6 22H16z"/><path d="M20 28c0-10 6-16 12-16s12 6 12 16M23 34v10M32 34v10M41 34v10"/>',
  d3:'<path class="a1" d="M33 16h20l5 5-5 5H33z"/><path class="a3" d="M33 30H15l-5 5 5 5h18z"/><path d="M30 8v50M22 58h16M30 14h20l5 5-5 5H30zM30 28H12l-5 5 5 5h18z"/>',
  d4:'<path class="a4" d="M12 20c8-3 15-3 22 2 7-5 14-5 22-2v32c-8-3-15-3-22 2-7-5-14-5-22-2z"/><path d="M10 18c8-3 15-3 22 2 7-5 14-5 22-2v32c-8-3-15-3-22 2-7-5-14-5-22-2zM32 20v32M16 28h10M16 34h10M16 40h7"/><text x="43" y="38" font-size="12" text-anchor="middle" lang="bg">-ът</text>',
  d5:'<circle class="a1" cx="22" cy="21" r="7"/><circle class="a3" cx="45" cy="21" r="7"/><circle class="a2" cx="34" cy="40" r="5"/><circle cx="20" cy="19" r="7"/><circle cx="43" cy="19" r="7"/><path d="M7 52c0-10 5-16 13-16 4 0 7 1 9 4M57 52c0-10-5-16-14-16-4 0-7 1-9 4"/><circle cx="32" cy="38" r="5"/><path d="M23 58c0-7 4-11 9-11s9 4 9 11"/>',
  d6:'<path class="a1" d="M12 30 34 12l22 18z"/><circle class="a2" cx="53" cy="12" r="5"/><path d="M10 28 32 10l22 18M15 25v28h34V25M27 53V40h10v13"/><rect x="38" y="31" width="7" height="7"/>',
  d7:'<path class="a1" d="M34 52S12 40 12 25a10 10 0 0 1 22-4 10 10 0 0 1 22 4c0 15-22 27-22 27z"/><path d="M32 50S10 38 10 23a10 10 0 0 1 22-4 10 10 0 0 1 22 4c0 15-22 27-22 27z"/><path d="M12 31h10l4-7 5 14 4-9h17"/>',
  d8:'<rect class="a2" x="12" y="23" width="44" height="30" rx="4"/><rect x="10" y="20" width="44" height="30" rx="4"/><path d="M24 20v-6h16v6M20 20v30M44 20v30M17 50v4M47 50v4"/>',
  d9:'<path class="a4" d="M8 10h28v18H20l-7 6v-6H8z"/><path class="a1" d="M30 32h28v18h-5v6l-7-6H30z"/><path d="M6 8h28v18H18l-7 6v-6H6zM28 30h28v18h-5v6l-7-6H28z"/><text x="20" y="22" font-size="12" text-anchor="middle" lang="bg">ме</text><text x="42" y="44" font-size="12" text-anchor="middle" lang="bg">ми</text>',
  d10:'<path class="a2" d="M24 50l10-9 10 9v6H24zM28 18h12l-6 6z"/><path d="M18 8h28M18 56h28M22 8c0 12 9 16 9 24s-9 12-9 24M42 8c0 12-9 16-9 24s9 12 9 24"/>',
  d11:'<rect class="a3" x="12" y="17" width="44" height="40" rx="3"/><rect x="10" y="14" width="44" height="40" rx="3"/><path d="M10 24h44M20 9v9M44 9v9M22 39l6 6 12-12"/>',
  d12:'<rect class="a4" x="10" y="27" width="40" height="28" rx="3"/><path class="a1" d="M42 6h18v12h-8l-5 5v-5h-5z"/><rect x="8" y="24" width="40" height="28" rx="3"/><path d="M20 24v-5h16v5M8 36h40M40 4h18v12h-8l-5 5v-5h-5z"/>',
  d13:'<circle class="a1" cx="21" cy="27" r="5"/><path class="a1" d="M15 35h12l4 18H11z"/><path d="M6 12c8 6 17-6 26 0s17-6 26 0M20 12v9M44 12v9"/><circle cx="20" cy="26" r="5"/><path d="M14 34h12l4 18H10zM14 52v6M20 52v6M26 52v6"/><circle cx="44" cy="26" r="5"/><path d="M38 34h12l4 18H34zM38 52v6M44 52v6M50 52v6"/>',
  a0:'<path class="a4" d="M18 17h32l-4 12H22z"/><path d="M16 14h32l-4 12H20zM24 26l-3 30h22l-3-30M12 56h40M32 14V6M27 6h10M26 14l-1 12M32 14v12M38 14l1 12"/>',
  a1:'<path class="a1" d="M13 37c0-7 6-11 16-11h10c6 0 10 4 10 9 0 4-3 7-9 7H19c-4 0-6-2-6-5z"/><path d="M10 34c0-7 6-11 16-11h10c6 0 10 4 10 9 0 4-3 7-9 7H16c-4 0-6-2-6-5zM4 12h52M30 12v11M46 31h10M56 23v14M15 30c1-4 5-6 10-6v7H15M18 39l-3 7M38 39l3 7"/><circle cx="15" cy="49" r="3"/><circle cx="42" cy="49" r="3"/>',
  a2:'<path class="a4" d="M16 40a8 8 0 0 1 2-16 11 11 0 0 1 21-3 9 9 0 0 1 9 19z"/><path d="M14 38a8 8 0 0 1 2-16 11 11 0 0 1 21-3 9 9 0 0 1 9 19zM48 47a8 8 0 0 1 8 8M48 41a14 14 0 0 1 14 14"/><circle class="k" cx="48" cy="55" r="2.5"/>',
  a3:'<path class="a1" d="M14 13l40 5v10l-40 5z"/><path d="M12 8v50M6 58h12M12 10l40 5v10l-40 5zM24 11.5v17M36 13v14M28 56h28"/>',
  a4:'<circle class="a4" cx="34" cy="37" r="20"/><path class="a1" d="M32 13l5 22h-10z"/><circle cx="32" cy="35" r="20"/><path d="M32 13l5 22-5 22-5-22zM10 35l22-5 22 5-22 5z"/><text x="32" y="9" font-size="10" text-anchor="middle">N</text>',
  a5:'<path class="a4" d="M16 38a8 8 0 0 1 2-16 11 11 0 0 1 21-3 9 9 0 0 1 9 19z"/><path class="a2" d="M33 36l-6 12h7l-4 12 12-16h-7l4-8z"/><path d="M14 36a8 8 0 0 1 2-16 11 11 0 0 1 21-3 9 9 0 0 1 9 19zM31 34l-6 12h7l-4 12 12-16h-7l4-8zM17 44l-3 6M22 46l-3 6M49 44l-3 6"/>',
  a6:'<rect class="a1" x="12" y="37" width="10" height="16" rx="3"/><rect class="a1" x="46" y="37" width="10" height="16" rx="3"/><path d="M14 35v-5a18 18 0 0 1 36 0v5M15 50c0 6 6 9 14 9"/><rect x="10" y="34" width="10" height="16" rx="3"/><rect x="44" y="34" width="10" height="16" rx="3"/><circle class="k" cx="31" cy="59" r="2.5"/>',
  a7:'<path class="a2" d="M34 11l24 42H10z"/><path d="M32 8l24 42H8zM32 22v14M4 58h56"/><circle class="k" cx="32" cy="43" r="2.2"/>'
};
const illus = (u, cls = '') => u && ILLUS[u.id] ? `<svg class="ill ${cls}" viewBox="0 0 64 64" aria-hidden="true">${ILLUS[u.id]}</svg>` : '';
const stars = (n, cls = 'stars') => `<span class="${cls}" aria-label="${n} z 3 gwiazdek">${[1,2,3].map(i => `<span class="${i <= n ? 'on' : ''}">${ICON.star}</span>`).join('')}</span>`;

/* transkrypcja na polskie litery */
const TR = {а:'a',б:'b',в:'w',г:'g',д:'d',е:'e',ж:'ż',з:'z',и:'i',й:'j',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'ch',ц:'c',ч:'cz',ш:'sz',щ:'szt',ъ:'ă',ь:'j',ю:'ju',я:'ja',ѝ:'i'};
function translit(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i], lo = ch.toLowerCase(); let t = TR[lo];
    if (t === undefined) { out += ch; continue; }
    if ((lo === 'я' || lo === 'ю') && i > 0 && /[бвгдзклмнпрстфхцчшщ]/i.test(s[i - 1])) t = lo === 'я' ? 'ia' : 'iu';
    if (ch !== lo) t = t[0].toUpperCase() + t.slice(1);
    out += t;
  }
  return out;
}
function norm(s) { return String(s).toLowerCase().replace(/ѝ/g, 'и').replace(/ё/g,'е').replace(/[.,!?;:„“”"«»()…–—\-]/g, ' ').replace(/\s+/g, ' ').trim(); }
function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({length: n + 1}, (_, i) => i);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
function checkText(input, answers) {
  const u = norm(input); if (!u) return {ok:false};
  let best = 99;
  for (const a of alts(answers)) { const d = lev(u, norm(a)); if (d === 0) return {ok:true}; best = Math.min(best, d); }
  const tgt = norm(first(answers));
  const tol = tgt.length > 14 ? 2 : tgt.length > 4 ? 1 : 0;
  if (best <= tol) return {ok:true, typo:true};
  return {ok:false};
}
function similarity(a, b) { a = norm(a); b = norm(b); const m = Math.max(a.length, b.length) || 1; return 1 - lev(a, b) / m; }

/* ===== INDEKS TREŚCI ===== */
const LEVELS = []; const LV = {};
UNITS.forEach(u => u.levels.forEach((l, i) => { l.unit = u; l.n = i + 1; LEVELS.push(l); LV[l.id] = l; }));
const TRACK = { day: LEVELS.filter(l => l.unit.track === 'day'), air: LEVELS.filter(l => l.unit.track === 'air') };
const PH_UNIT = {id:'ph', t:'Zwroty', bt:'Изрази', track:'ph', cefr:''};
PHRASES.forEach((c, ci) => { const items = c.items.filter(([pl, bg]) => !/[…\/]/.test(bg)); LV['ph' + ci] = {id:'ph' + ci, t:c.n, bt:'Изрази', unit:PH_UNIT, n:ci + 1, w:items, s:items, g:[], tip:''}; });
const ALLW = LEVELS.flatMap(l => l.w.map((w, i) => ({lv:l, i, w, ref:`${l.id}:w:${i}`})));
function getRef(ref) {
  if (ref.startsWith('n:')) { const n = NOUNS[+ref.slice(2)]; return n ? {k:'n', ref, n, i:+ref.slice(2), lv:LV[n[4]]} : null; }
  const [id, k, i] = ref.split(':'); const l = LV[id]; if (!l) return null;
  const arr = k === 'w' ? l.w : k === 's' ? l.s : l.g; const d = arr && arr[+i]; if (!d) return null;
  return {lv:l, i:+i, k, ref, w:k === 'w' ? d : null, s:k === 's' ? d : null, g:k === 'g' ? d : null};
}

/* ===== STAN I ZAPIS ===== */
const KEY = 'bg-za-sterami-v1';
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
function defaults() { return {v:1, updatedAt:0, xp:0, goal:30, daily:{date:'', xp:0}, streak:0, lastDay:'', lv:{}, mistakes:{}, placement:null, autoVoice:true, translit:true, rate:0.9, track:'day', answered:0, correct:0, game:{stage:0, day:null, visited:[0]}, best:{}, theme:'auto', haptics:true}; }
let S = defaults();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(defaults(), JSON.parse(raw)); } catch (e) {}
/* motyw: auto (jak w systemie) / jasny / ciemny */
function applyTheme() {
  const r = document.documentElement;
  if (S.theme === 'light' || S.theme === 'dark') r.dataset.theme = S.theme; else delete r.dataset.theme;
}
applyTheme();
/* lekka wibracja na telefonie przy odpowiedzi */
function buzz(pattern) { if (S.haptics && navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} } }
let cloud = null, syncState = 'local', cloudBusy = false, cloudAgain = false, saveTimer = null;
function save() {
  S.updatedAt = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  clearTimeout(saveTimer); saveTimer = setTimeout(cloudSave, 1500);
}
async function cloudSave() {
  if (!cloud) return;
  if (cloudBusy) { cloudAgain = true; return; }
  cloudBusy = true;
  try { await cloud.set({state: JSON.stringify(S), updatedAt: S.updatedAt}); syncState = 'cloud'; }
  catch (e) { syncState = 'local'; }
  cloudBusy = false;
  if (cloudAgain) { cloudAgain = false; cloudSave(); }
}
function mergeStates(a, b) {
  a = Object.assign(defaults(), a); b = Object.assign(defaults(), b);
  const nw = (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b, od = nw === a ? b : a;
  const m = JSON.parse(JSON.stringify(nw));
  m.xp = Math.max(a.xp, b.xp); m.answered = Math.max(a.answered, b.answered); m.correct = Math.max(a.correct, b.correct);
  Object.entries(od.lv || {}).forEach(([id, v]) => { const c = m.lv[id]; if (!c || (v.stars || 0) > (c.stars || 0)) m.lv[id] = v; });
  if ((od.lastDay || '') > (m.lastDay || '')) { m.lastDay = od.lastDay; m.streak = od.streak; }
  else if (od.lastDay === m.lastDay) m.streak = Math.max(m.streak, od.streak);
  if (od.daily && m.daily && od.daily.date === m.daily.date) m.daily.xp = Math.max(m.daily.xp, od.daily.xp);
  const ga = m.game, gb = od.game || {};
  ga.visited = [...new Set([...(ga.visited || []), ...(gb.visited || [])])];
  if ((gb.stage || 0) > (ga.stage || 0)) { ga.stage = gb.stage; ga.day = gb.day; }
  else if (gb.day && ga.day && gb.day.date === ga.day.date && gb.day.stage === ga.day.stage) {
    ga.day.tiles.forEach((t, i) => { const o = gb.day.tiles[i]; if (o && o.done && !t.done) { t.done = true; t.stars = o.stars; if (o.id) t.id = o.id; } });
    ga.day.finished = ga.day.finished || gb.day.finished;
  }
  Object.entries(od.best || {}).forEach(([k, v]) => { m.best[k] = Math.max(m.best[k] || 0, v); });
  if (!m.placement && od.placement) m.placement = od.placement;
  m.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return m;
}
function applyRemote(d) {
  if (!d || !d.state) return false;
  let remote; try { remote = JSON.parse(d.state); } catch (e) { return false; }
  const before = JSON.stringify(S);
  S = mergeStates(S, remote);
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  const changed = JSON.stringify(S) !== before;
  if (changed && !L) { renderHud(); route(); }
  return JSON.stringify(S) !== d.state;
}
async function initCloud() {
  if (!window.claude || !window.claude.use) return;
  try {
    const [db, user] = await Promise.all([claude.use('db'), claude.use('user')]);
    if (!db || !user) return;
    const id = await user.id(); if (!id) return;
    const ref = db.doc('data/users/' + id + '/progress');
    const snap = await Promise.race([ref.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
    cloud = ref; syncState = 'cloud';
    if (snap.exists) { if (applyRemote(snap.data())) cloudSave(); }
    else if (S.updatedAt) cloudSave();
    ref.onSnapshot(sn => { if (sn.exists && !cloudBusy) { const d = sn.data(); if (d && (d.updatedAt || 0) > (S.updatedAt || 0)) applyRemote(d); } }, () => {});
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && cloud) cloud.get().then(sn => { if (sn.exists && applyRemote(sn.data())) cloudSave(); }).catch(() => {}); });
    if ($('#syncline')) $('#syncline').textContent = syncText();
  } catch (e) { cloud = null; }
}
const syncText = () => syncState === 'cloud' ? 'Postęp zapisuje się na Twoim koncie – zobaczysz go na telefonie i komputerze.' : 'Postęp zapisuje się na tym urządzeniu. Zrób czasem kopię zapasową (niżej).';

/* ===== XP, SERIA, RANGI ===== */
const RANKS = [[0,'Курсантка','Kursantka'],[120,'Пилот','Pilotka'],[400,'Командир','Dowódczyni'],[900,'Инструктор','Instruktorka'],[1600,'Ас','As przestworzy']];
const rankOf = xp => { let r = 0; RANKS.forEach((k, i) => { if (xp >= k[0]) r = i; }); return r; };
function streakNow() { return (S.lastDay === today() || S.lastDay === yesterday()) ? S.streak : 0; }
function dailyXP() { return S.daily.date === today() ? S.daily.xp : 0; }
function addXP(n) {
  if (n <= 0) return;
  const before = rankOf(S.xp);
  S.xp += n;
  if (S.daily.date !== today()) S.daily = {date:today(), xp:0};
  S.daily.xp += n;
  if (S.lastDay !== today()) { S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1; S.lastDay = today(); }
  const after = rankOf(S.xp);
  if (after > before) setTimeout(() => toast(`Awans! Nowa ranga: ${RANKS[after][1]} (${RANKS[after][2]})`), 600);
}
function renderHud() {
  $('#xp').textContent = S.xp;
  $('#streak').textContent = streakNow();
  const r = RANKS[rankOf(S.xp)];
  $('#rankline').innerHTML = `<span lang="bg">${r[1]}</span> · ${r[2]}`;
  const dd = (S.game.day && S.game.day.date === today()) ? S.game.day.tiles.filter(t => t.done).length : 0;
  const p = Math.min(1, dd / 6);
  if (window.PWA && window.PWA.saveState) window.PWA.saveState({date:today(), done:dd, finished:!!(S.game.day && S.game.day.date === today() && S.game.day.finished), streak:streakNow()});
  const earthTop = 6 + 34 * p;  /* sztuczny horyzont: im bliżej celu, tym więcej nieba */
  $('#gauge').innerHTML = `<defs><clipPath id="gc"><circle cx="23" cy="23" r="20"/></clipPath></defs>
    <g clip-path="url(#gc)"><rect x="0" y="0" width="46" height="46" fill="var(--sky)"/><rect x="0" y="${earthTop}" width="46" height="46" fill="var(--earth)"/>
    <line x1="0" x2="46" y1="${earthTop}" y2="${earthTop}" stroke="var(--on-sky)" stroke-width="1.5"/></g>
    <circle cx="23" cy="23" r="20" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
    <text x="23" y="27" text-anchor="middle" font-size="11" fill="var(--on-sky)">${dd}/6</text>`;
  $('#gauge').setAttribute('aria-label', `Dzisiejsza plansza: ${dd} z 6 lekcji`);
  $('#gauge').innerHTML += `<title>Dzisiejsza plansza: ${dd} / 6</title>`;
}

/* ===== DOSTĘP DO LEVELI ===== */
const lvState = id => S.lv[id] || null;
const isDone = id => { const s = lvState(id); return !!(s && (s.stars > 0 || s.test)); };
function isOpen(l) {
  const list = TRACK[l.unit.track]; const idx = list.indexOf(l);
  if (idx === 0) return l.unit.track === 'day' ? true : (isDone('d0-2') || isDone('d0-1'));
  return isDone(list[idx - 1].id);
}
const nextLevel = track => TRACK[track].find(l => isOpen(l) && !isDone(l.id)) || null;

/* ===== LEKTOR (TTS) I DYKTOWANIE ===== */
let tts = null, audioMode = ('speechSynthesis' in window) ? 'browser' : 'none', dict = null, dictOff = false;
function bgVoice() { try { return speechSynthesis.getVoices().find(v => (v.lang || '').toLowerCase().startsWith('bg')); } catch (e) { return null; } }
function audioOK() { return audioMode === 'claude' || (audioMode === 'browser' && !!bgVoice()); }
function speak(text, slow) {
  text = String(text).replace(/…/g, ' ');
  if (audioMode === 'claude' && tts) {
    tts.speak(text, {language:'bg', rate: slow ? 0.72 : S.rate}).catch(e => {
      const c = e && e.code;
      if (c === 'not_granted' || c === 'unavailable') { audioMode = 'none'; applyAudioClass(); toast('Lektor jest wyłączony dla tej strony. Ćwiczenia ze słuchu pokażą tekst.'); }
      else if (c === 'rate_limited') toast('Lektor potrzebuje chwili przerwy. Spróbuj za moment.');
      else if (c === 'no_gesture') toast('Kliknij przycisk głośnika, aby odsłuchać.');
    });
    return;
  }
  if (audioMode === 'browser') {
    try { const u = new SpeechSynthesisUtterance(text); u.lang = 'bg-BG'; const v = bgVoice(); if (v) u.voice = v; u.rate = slow ? 0.7 : S.rate; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {}
  }
}
function applyAudioClass() { document.body.classList.toggle('noaudio', !audioOK()); }
/* Rozpoznawanie mowy przeglądarki (Chrome na Androidzie i komputerze, Safari) – ten sam interfejs co dyktowanie w claude.ai */
function webDictation() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return null;
  const subs = {final:new Set(), partial:new Set(), state:new Set()};
  const emit = (k, v) => subs[k].forEach(f => { try { f(v); } catch (e) {} });
  const on = k => cb => { subs[k].add(cb); return () => subs[k].delete(cb); };
  const codeOf = err => (err === 'not-allowed' || err === 'service-not-allowed') ? 'not_granted' : err === 'language-not-supported' ? 'unavailable' : err === 'aborted' ? 'stopped' : err;
  let rec = null, live = false;
  return {
    active: () => live,
    start() {
      return new Promise((res, rej) => {
        try {
          rec = new SR(); rec.lang = 'bg-BG'; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
          let started = false;
          rec.onstart = () => { started = live = true; emit('state', {state:'listening'}); res(); };
          rec.onresult = e => {
            let interim = '';
            for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) emit('final', {text:' ' + r[0].transcript}); else interim += r[0].transcript; }
            emit('partial', {text:interim});
          };
          rec.onerror = e => {
            const code = codeOf(e.error);
            if (!started) rej({code});
            else if (code === 'not_granted' || code === 'unavailable') emit('state', {state:'idle', reason:code});
          };
          rec.onend = () => { live = false; emit('state', {state:'idle'}); };
          emit('state', {state:'starting'}); rec.start();
        } catch (err) { rej({code:'unavailable'}); }
      });
    },
    stop() { try { if (rec) rec.stop(); } catch (e) {} return Promise.resolve(); },
    onFinal: on('final'), onPartial: on('partial'), onState: on('state')
  };
}
function initSpeech() {
  if (!window.claude || !window.claude.use) { dict = webDictation(); applyAudioClass(); return; }
  claude.use('tts').then(t => { if (t) { tts = t; audioMode = 'claude'; } applyAudioClass(); }).catch(() => applyAudioClass());
  claude.use('dictation').then(d => { dict = d; }).catch(() => {});
}
if ('speechSynthesis' in window) { try { speechSynthesis.onvoiceschanged = () => { applyAudioClass(); if (location.hash === '#pomoc') viewHelp(); }; } catch (e) {} }
document.addEventListener('click', e => {
  const b = e.target.closest('[data-say]'); if (!b) return;
  e.preventDefault(); speak(b.dataset.say, b.dataset.slow === '1');
});
const spkBtn = (t, extra = '') => `<button class="spk ${extra}" data-say="${esc(t)}" aria-label="Posłuchaj">${ICON.spk}</button>`;

/* ===== TOAST ===== */
let toastT = null;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 3600); }

/* ===== ROUTING ===== */
const VIEWS = ['plansza','kurs','zwroty','gramatyka','slowka','gry','powtorki','profil','test','pomoc'];
function route() {
  let v = (location.hash || '').slice(1); if (v === 'trasa') v = 'kurs'; if (!VIEWS.includes(v)) v = 'plansza';
  const navV = v === 'test' ? 'plansza' : (v === 'powtorki' || v === 'pomoc') ? 'profil' : v;
  $$('nav.tabs a').forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + navV ? 'page' : 'false'));
  ({plansza:viewBoard, kurs:viewMap, gry:viewGames, zwroty:viewPhrases, gramatyka:viewGrammar, slowka:viewDict, powtorki:viewReview, profil:viewProfile, test:viewTest, pomoc:viewHelp})[v]();
  if (v !== lastView) { const el = $('#view'); el.classList.remove('fade'); void el.offsetWidth; el.classList.add('fade'); lastView = v; }
  renderHud();
}
let lastView = '';
window.addEventListener('hashchange', () => { route(); window.scrollTo(0, 0); });

/* ===== WIDOK: TRASA ===== */
function viewMap() {
  const tr = S.track;
  const nx = nextLevel(tr);
  let html = `<h2 class="view">Mapa kursu</h2><p class="muted" style="margin-top:0">Wszystkie levele po kolei. Codzienne lekcje dobiera plansza, ale tu możesz poćwiczyć dowolny otwarty level.</p>`;
  html += `<div class="row" style="justify-content:space-between;margin-bottom:16px">
    <div class="trackswitch" role="group" aria-label="Trasa">
      <button data-track="day" aria-pressed="${tr === 'day'}">Na co dzień · ${TRACK.day.filter(l => isDone(l.id)).length}/${TRACK.day.length}</button>
      <button data-track="air" aria-pressed="${tr === 'air'}">${ICON.plane} Lotnictwo · ${TRACK.air.filter(l => isDone(l.id)).length}/${TRACK.air.length}</button></div></div>
    <div class="card" style="margin-bottom:16px"><div class="row" style="justify-content:space-between;font-size:14px"><span>Ukończone levele</span><span class="mono">${LEVELS.filter(l => isDone(l.id)).length} / ${LEVELS.length}</span></div><div class="bar" style="margin-top:6px"><i style="width:${100 * LEVELS.filter(l => isDone(l.id)).length / LEVELS.length}%"></i></div></div>`;
  if (nx) html += `<div class="next"><div><span class="eyebrow">Następny lot · ${nx.unit.cefr}</span><b>${esc(nx.t)}</b><span lang="bg" style="opacity:.75">${esc(nx.bt)}</span></div><button class="btn" data-start="${nx.id}">Start</button></div>`;
  else if (tr === 'air' && !isOpen(TRACK.air[0])) html += `<div class="card muted">Trasa lotnicza otworzy się po pierwszym levelu na trasie „Na co dzień” albo po teście wstępnym.</div>`;
  else html += `<div class="card"><b>Trasa ukończona!</b> <span class="muted">Zdobywaj 3 gwiazdki i ćwicz w Powtórkach.</span></div>`;
  UNITS.filter(u => u.track === tr).forEach((u, ui) => {
    html += `<section class="unit"><div class="unit-head">${illus(u)}<div><span class="eyebrow">Etap ${ui + 1} · ${u.cefr}</span><h3 lang="bg">${esc(u.bt)}</h3><span class="pl">${esc(u.t)}</span></div></div><ol class="route">`;
    u.levels.forEach(l => {
      const st = lvState(l.id), open = isOpen(l), done = isDone(l.id);
      const cls = !open ? 'locked' : (st && st.stars > 0) ? 'done' : (st && st.test) ? 'test' : 'open';
      const node = !open ? ICON.lock : (st && st.stars > 0) ? ICON.check : (st && st.test) ? ICON.check : `${l.n}`;
      const right = !open ? '' : (st && st.stars > 0) ? stars(st.stars) : (st && st.test) ? '<span class="eyebrow">zaliczone testem</span>' : '<span class="eyebrow" style="color:var(--sky)">gotowe</span>';
      html += `<li class="wp ${cls}"><span class="node" aria-hidden="true">${node}</span>
        <button class="wpbtn" ${open ? `data-start="${l.id}"` : 'disabled'} aria-label="${esc(l.t)}${open ? '' : ' – zablokowane'}">
        <span style="min-width:0"><span class="t">${esc(l.t)}</span><span class="b" lang="bg">${esc(l.bt)}</span></span>${right}</button></li>`;
    });
    html += `</ol></section>`;
  });
  $('#view').innerHTML = html;
  $$('[data-track]').forEach(b => b.onclick = () => { S.track = b.dataset.track; save(); viewMap(); });
  $$('[data-start]').forEach(b => b.onclick = () => openBriefing(b.dataset.start));
}

/* ===== WIDOK: POWTÓRKI ===== */
function viewReview() {
  const refs = Object.entries(S.mistakes).filter(([r, c]) => c > 0 && getRef(r)).sort((a, b) => b[1] - a[1]);
  const doneLv = LEVELS.filter(l => isDone(l.id));
  $('#view').innerHTML = `<h2 class="view">Powtórki</h2><p class="muted" style="margin-top:0">Tu wracają słowa i zdania, w których się pomyliłaś. Poprawna odpowiedź zdejmuje je z listy.</p>
  <div class="stack">
   <div class="card stack"><div class="row" style="justify-content:space-between"><div><div class="eyebrow">Do powtórki</div><b class="mono" style="font-size:28px">${refs.length}</b></div>
   <button class="btn" id="revGo" ${refs.length || doneLv.length ? '' : 'disabled'}>${refs.length ? 'Powtórz błędy' : 'Trening losowy'}</button></div>
   ${!refs.length && !doneLv.length ? '<p class="muted" style="margin:0">Ukończ pierwszy level, a powtórki pojawią się tutaj.</p>' : ''}</div>
   ${refs.length ? `<div class="plist">${refs.slice(0, 40).map(([r, c]) => { const it = getRef(r); const pl = it.n ? it.n[1] : it.w ? it.w[0] : it.s ? it.s[0] : (it.g.pl || it.g.q || ''); const bg = it.n ? `${it.n[0]} → ${it.n[3]}` : it.w ? first(it.w[1]) : it.s ? first(it.s[1]) : (it.g.s ? it.g.s.replace('___', it.g.o[0]) : it.g.o[0]);
     return `<div class="prow"><div class="txt"><div class="bg" lang="bg">${esc(bg)}</div><div class="pl">${esc(pl)}</div></div><span class="mono muted" title="Liczba pomyłek">×${c}</span></div>`; }).join('')}</div>` : ''}
  </div>`;
  const g = $('#revGo'); if (g) g.onclick = () => startReview();
}

/* ===== WIDOK: PROFIL ===== */
function viewProfile() {
  const ri = rankOf(S.xp), r = RANKS[ri], nr = RANKS[ri + 1];
  const done = LEVELS.filter(l => isDone(l.id)).length;
  const words = LEVELS.filter(l => isDone(l.id)).reduce((a, l) => a + l.w.length, 0);
  const acc = S.answered ? Math.round(100 * S.correct / S.answered) : 0;
  const p = nr ? (S.xp - r[0]) / (nr[0] - r[0]) : 1;
  const pl = S.placement && !S.placement.skipped ? S.placement : null;
  $('#view').innerHTML = `<h2 class="view">Profil pilotki</h2>
  <div class="stack">
   <div class="card stack"><div><div class="eyebrow">Ranga</div><b style="font-family:var(--f-display);font-size:22px" lang="bg">${r[1]}</b> <span class="muted">${r[2]}</span></div>
    <div class="bar"><i style="width:${Math.round(p * 100)}%"></i></div>
    <div class="muted" style="font-size:14px">${nr ? `${S.xp} / ${nr[0]} XP do rangi <span lang="bg">${nr[1]}</span> (${nr[2]})` : 'Najwyższa ranga. Gratulacje!'}</div></div>
   <div class="kpis" style="margin:0"><div class="kpi"><b>${done}/${LEVELS.length}</b><span>leveli</span></div><div class="kpi"><b>${words}</b><span>słówek</span></div><div class="kpi"><b>${acc}%</b><span>trafność</span></div></div>
   ${hangarHTML()}
   ${pl ? `<div class="card"><div class="eyebrow">Test wstępny</div><b>Poziom ${esc(pl.cefr)}</b> <span class="muted">· ${pl.score}/${PLACEMENT.length} pkt</span><p style="margin:6px 0 0" class="muted">${esc(pl.planShort || '')}</p></div>` : ''}
   <a class="card helpcard" href="#pomoc"><div><div class="eyebrow">Ustawienia telefonu</div><b>Lektor, mikrofon i instalacja</b>
     <div class="muted" style="font-size:14px;margin-top:2px">Co zrobić na Androidzie, a co na iPhonie, żeby aplikacja mówiła i rozpoznawała wymowę.</div>
     <div class="chips" style="margin-top:8px">${statusChips()}</div></div><span class="helpgo" aria-hidden="true">→</span></a>
   <div id="pushCard"></div>
   <div class="card">
    <div class="setrow"><div><b>Lektor po odpowiedzi</b><div class="muted" style="font-size:14px">Odczytuje poprawną odpowiedź po bułgarsku.</div></div>
      <div class="seg" id="voiceSeg"><button data-v="1" aria-pressed="${S.autoVoice}">Włączony</button><button data-v="0" aria-pressed="${!S.autoVoice}">Wyłączony</button></div></div>
    <div class="setrow"><div><b>Tempo lektora</b></div>
      <div class="seg" id="rateSeg">${[[0.8,'Wolno'],[0.9,'Spokojnie'],[1,'Normalnie']].map(([v, n]) => `<button data-r="${v}" aria-pressed="${S.rate === v}">${n}</button>`).join('')}</div></div>
    <div class="setrow"><div><b>Pisanie łacinką</b><div class="muted" style="font-size:14px">Wpisujesz „sz”, pojawia się „ш”; „cz” → ч, „ż” → ж, „ja” → я, „y” → ъ.</div></div>
      <div class="seg" id="trSeg"><button data-x="1" aria-pressed="${S.translit}">Tak</button><button data-x="0" aria-pressed="${!S.translit}">Nie</button></div></div>
    <div class="setrow"><div><b>Motyw</b></div>
      <div class="seg" id="themeSeg">${[['auto','Auto'],['light','Jasny'],['dark','Ciemny']].map(([v, n]) => `<button data-t="${v}" aria-pressed="${S.theme === v}">${n}</button>`).join('')}</div></div>
    ${'vibrate' in navigator ? `<div class="setrow"><div><b>Wibracje</b><div class="muted" style="font-size:14px">Krótka wibracja przy dobrej i złej odpowiedzi.</div></div>
      <div class="seg" id="hapSeg"><button data-h="1" aria-pressed="${S.haptics}">Tak</button><button data-h="0" aria-pressed="${!S.haptics}">Nie</button></div></div>` : ''}
    <div class="setrow"><div><b>Status</b><div class="muted" style="font-size:14px" id="syncline">${syncText()}</div><div class="muted" style="font-size:14px">${audioOK() ? 'Lektor dostępny.' : 'Lektor niedostępny – <a href="#pomoc">zobacz, jak go włączyć</a>.'}</div><div class="muted" style="font-size:14px">${dict ? 'Rozpoznawanie mowy dostępne.' : 'Rozpoznawanie mowy niedostępne – <a href="#pomoc">zobacz instrukcję</a>.'}</div></div></div>
   </div>
   ${installCard()}
   <div class="card stack"><div><div class="eyebrow">Kopia zapasowa</div><b>Przenieś postęp na inne urządzenie</b>
    <div class="muted" style="font-size:14px;margin-top:4px">Pobierz plik z postępem i wczytaj go na drugim telefonie lub komputerze. Wczytanie łączy oba postępy – nic nie zginie.</div></div>
    <div class="row"><button class="btn soft" id="bkSave">Pobierz kopię</button><label class="btn soft filebtn">Wczytaj kopię<input type="file" id="bkLoad" accept="application/json,.json"></label></div></div>
   <div class="row"><a class="btn soft" href="#powtorki">Lista błędów (${Object.values(S.mistakes).filter(c => c > 0).length})</a><a class="btn soft" href="#test">Powtórz test wstępny</a><button class="btn ghost" id="resetBtn">Wyzeruj postęp</button></div>
   <div id="resetConfirm" hidden class="card stack" style="border-color:var(--bad)"><b>Na pewno usunąć cały postęp?</b><span class="muted">Stracisz XP, gwiazdki, serię i powtórki. Tego nie da się cofnąć.</span>
     <div class="row"><button class="btn bad" id="resetYes">Tak, wyzeruj</button><button class="btn ghost" id="resetNo">Anuluj</button></div></div>
  </div>`;
  $('#voiceSeg').onclick = e => { const b = e.target.closest('[data-v]'); if (!b) return; S.autoVoice = b.dataset.v === '1'; save(); viewProfile(); };
  $('#rateSeg').onclick = e => { const b = e.target.closest('[data-r]'); if (!b) return; S.rate = +b.dataset.r; save(); viewProfile(); speak('Здравей! Как си?'); };
  $('#trSeg').onclick = e => { const b = e.target.closest('[data-x]'); if (!b) return; S.translit = b.dataset.x === '1'; save(); viewProfile(); };
  $('#themeSeg').onclick = e => { const b = e.target.closest('[data-t]'); if (!b) return; S.theme = b.dataset.t; applyTheme(); save(); viewProfile(); };
  const hs = $('#hapSeg'); if (hs) hs.onclick = e => { const b = e.target.closest('[data-h]'); if (!b) return; S.haptics = b.dataset.h === '1'; save(); viewProfile(); buzz(20); };
  const ib = $('#installBtn'); if (ib) ib.onclick = () => window.PWA.install();
  $('#bkSave').onclick = exportProgress;
  $('#bkLoad').onchange = e => { const f = e.target.files && e.target.files[0]; if (f) importProgress(f); e.target.value = ''; };
  $('#resetBtn').onclick = () => { $('#resetConfirm').hidden = false; };
  $('#resetNo').onclick = () => { $('#resetConfirm').hidden = true; };
  renderPushCard();
  $('#resetYes').onclick = () => { const keep = {goal:S.goal, rate:S.rate, autoVoice:S.autoVoice, translit:S.translit}; S = Object.assign(defaults(), keep); save(); location.hash = '#plansza'; route(); toast('Postęp wyzerowany.'); };
}

/* ===== POWIADOMIENIA O LEKCJI (push, 2× dziennie) ===== */
const SECRETS_URL = 'https://github.com/ameliakierepkaa-eng/bulgarski-za-sterami/settings/secrets/actions';
async function renderPushCard() {
  const box = $('#pushCard'); if (!box || window.claude) return;
  const P = window.PWA, head = `<div><div class="eyebrow">Powiadomienia</div><b style="font-family:var(--f-display);font-size:20px">Przypomnienie o lekcji 2× dziennie</b>
    <div class="muted" style="font-size:14px;margin-top:2px">Ok. 8:00 i 19:00 (latem 9:00 i 20:00). Gdy plansza jest już zrobiona, powiadomienie Cię tylko pochwali.</div></div>`;
  const card = inner => { box.innerHTML = `<section class="card stack">${head}${inner}</section>`; };
  if (!P || !P.push || !P.push.supported()) {
    card(P && P.ios() && !P.standalone() ? '<p class="muted" style="margin:0">Na iPhonie powiadomienia działają tylko w aplikacji dodanej do ekranu początkowego (iOS 16.4 lub nowszy). Dodaj ją (Profil → Lektor, mikrofon i instalacja) i otwórz z ikony.</p>'
      : '<p class="muted" style="margin:0">Ta przeglądarka nie obsługuje powiadomień. Otwórz aplikację zainstalowaną z Chrome (Android) albo z ekranu początkowego (iPhone).</p>');
    return;
  }
  if (P.push.permission() === 'denied') { card('<p class="muted" style="margin:0">Powiadomienia są zablokowane. Włącz je w ustawieniach telefonu: <b>Ustawienia → Aplikacje → Bułgarski → Powiadomienia</b> (Android) albo <b>Ustawienia → Powiadomienia → Bułgarski</b> (iPhone), a potem wróć tutaj.</p>'); return; }
  let sub = null; try { sub = await P.push.current(); } catch (e) {}
  if (!sub) {
    card('<button class="btn" id="pushOn">Włącz powiadomienia</button>');
    $('#pushOn').onclick = async () => { try { await P.push.enable(); toast('Powiadomienia włączone na tym telefonie.'); } catch (e) { toast(String(e.message) === 'denied' ? 'Nie zezwolono na powiadomienia.' : 'Nie udało się włączyć powiadomień.'); } renderPushCard(); };
    return;
  }
  const code = JSON.stringify(sub);
  card(`<div class="schip ok" style="align-self:flex-start">${ICON.check} Powiadomienia włączone na tym telefonie</div>
    <div class="row"><button class="btn soft" id="pushTest">Pokaż próbne</button><button class="btn ghost" id="pushOff">Wyłącz</button></div>
    <details class="vb"><summary><b>Jednorazowo: połącz telefon z harmonogramem</b></summary>
      <ol class="muted" style="padding-left:20px;margin:8px 0">
        <li>Dotknij <b>Skopiuj kod telefonu</b>.</li>
        <li>Otwórz <a href="${SECRETS_URL}" target="_blank" rel="noopener">ustawienia sekretów na GitHubie</a> (zaloguj się) → sekret <b>PUSH_SUBSCRIPTIONS</b> → <b>Update</b> (albo <b>New repository secret</b> o tej nazwie).</li>
        <li>Wklej kod i zapisz. Kilka telefonów? Wklej każdy kod w osobnej linii.</li></ol>
      <button class="btn" id="pushCopy">Skopiuj kod telefonu</button>
      <textarea class="answer" id="pushCode" rows="3" readonly style="font-size:12px;margin-top:8px">${esc(code)}</textarea></details>`);
  $('#pushTest').onclick = () => P.push.test().catch(() => toast('Nie udało się pokazać powiadomienia.'));
  $('#pushOff').onclick = async () => { await P.push.disable().catch(() => {}); toast('Powiadomienia wyłączone.'); renderPushCard(); };
  $('#pushCopy').onclick = async () => { try { await navigator.clipboard.writeText(code); toast('Kod skopiowany. Wklej go w GitHubie.'); } catch (e) { const t = $('#pushCode'); t.focus(); t.select(); toast('Zaznaczyłam kod – skopiuj go ręcznie.'); } };
}

/* ===== WIDOK: POMOC – lektor, mikrofon, instalacja ===== */
const isInstalled = () => !!(window.PWA && window.PWA.standalone());
const isIOS = () => window.PWA ? window.PWA.ios() : /iphone|ipad|ipod/i.test(navigator.userAgent);
function statusChips() {
  const chip = (ok, txt) => `<span class="schip ${ok ? 'ok' : 'no'}">${ok ? ICON.check : '!'} ${txt}</span>`;
  return [window.claude ? '' : chip(isInstalled(), isInstalled() ? 'Aplikacja zainstalowana' : 'Otwarte w przeglądarce'),
    chip(audioOK(), audioOK() ? 'Lektor działa' : 'Brak głosu bułgarskiego'),
    chip(!!dict, dict ? 'Mikrofon: obsługiwany' : 'Rozpoznawanie mowy niedostępne'),
    chip(navigator.onLine, navigator.onLine ? 'Internet: jest' : 'Brak internetu')].join('');
}
let helpOS = null;
function viewHelp() {
  const os = helpOS || (isIOS() ? 'ios' : 'android');
  const v = bgVoice();
  const step = (n, t, body) => `<li class="hstep"><span class="hnum">${n}</span><div><b>${t}</b>${body}</div></li>`;
  const android = `<ol class="hsteps">
    ${step(1, 'Zainstaluj aplikację i otwieraj ją z ikony', `<p>Otwórz link w <b>Chrome</b> → menu <b>⋮</b> → <b>Zainstaluj aplikację</b> (albo <b>Dodaj do ekranu głównego</b>). Potem zawsze otwieraj grę z ikony – działa jak zwykła aplikacja, na pełnym ekranie.</p>`)}
    ${step(2, 'Lektor: pobierz głos bułgarski (raz, ok. 1 minuta)', `<p><b>Ustawienia</b> telefonu → wpisz w wyszukiwarkę <b>„Zamiana tekstu na mowę”</b> (albo: Ułatwienia dostępu → Zamiana tekstu na mowę).</p>
      <p>Jako mechanizm wybierz <b>Usługi mowy Google</b> → ikona ⚙ → <b>Zainstaluj dane głosowe</b> → <b>Български (България)</b> → pobierz.</p>
      <p class="muted">Potem zamknij aplikację całkiem i otwórz ponownie. Głos działa także bez internetu.</p>`)}
    ${step(3, 'Mikrofon: pozwól aplikacji słuchać', `<p>Przy pierwszym ćwiczeniu mówienia wybierz <b>Zezwól</b>. Jeśli przez pomyłkę odmówiłaś: <b>Chrome → ⋮ → Ustawienia → Ustawienia witryn → Mikrofon</b> i zezwól dla <i>${esc(location.host || 'tej strony')}</i>.</p>
      <p class="muted">Rozpoznawanie mowy w Androidzie działa przez Google, więc <b>potrzebny jest internet</b>. Musi też być włączona aplikacja <b>Google</b> (Ustawienia → Aplikacje → Google → Włącz).</p>`)}
    ${step(4, 'Bez internetu', '<p>Lekcje, plansza, gry i lektor działają. Ćwiczenia mówienia zamieniają się w samoocenę – posłuchaj, powiedz na głos i oceń się sama.</p>')}
  </ol>`;
  const ios = `<ol class="hsteps">
    ${step(1, 'Zainstaluj aplikację i otwieraj ją z ikony', `<p>Otwórz link w <b>Safari</b> → przycisk <b>Udostępnij</b> (kwadrat ze strzałką) → <b>Do ekranu początkowego</b> → <b>Dodaj</b>. Potem zawsze otwieraj grę z ikony.</p>`)}
    ${step(2, 'Lektor: pobierz głos bułgarski (raz)', `<p><b>Ustawienia → Dostępność → Treść mówiona</b> (w niektórych wersjach: Zawartość mówiona) <b>→ Głosy → Bułgarski</b> → wybierz głos (np. <b>Daria</b>) i dotknij, żeby go pobrać.</p>
      <p class="muted">Potem zamknij aplikację (przesuń ją w górę na liście aplikacji) i otwórz ponownie. Głos działa też bez internetu.</p>`)}
    ${step(3, 'Mikrofon i rozpoznawanie mowy', `<p>Włącz dyktowanie: <b>Ustawienia → Ogólne → Klawiatura → Włącz dyktowanie</b>. Przy pierwszym ćwiczeniu mówienia pozwól na <b>mikrofon</b> i <b>rozpoznawanie mowy</b>.</p>
      <p class="muted"><b>Uczciwie:</b> Apple ogranicza rozpoznawanie mowy w aplikacjach dodanych do ekranu początkowego, a bułgarski nie zawsze jest obsługiwany. Jeśli test mikrofonu na górze tej strony nie zadziała, ćwiczenia mówienia będą w trybie samooceny – reszta aplikacji działa normalnie.</p>`)}
    ${step(4, 'Bez internetu', '<p>Lekcje, plansza, gry i lektor (jeśli głos jest pobrany) działają. Rozpoznawanie mowy potrzebuje internetu.</p>')}
  </ol>`;
  $('#view').innerHTML = `<a href="#profil" class="muted backlink">← Profil</a>
   <h2 class="view">Lektor, mikrofon i instalacja</h2>
   <p class="muted" style="margin-top:0">Aplikacja korzysta z głosu i mikrofonu Twojego telefonu. Wystarczy raz ustawić kilka rzeczy – instrukcja poniżej.</p>
   <section class="card stack"><div class="eyebrow">Ten telefon teraz</div><div class="chips">${statusChips()}</div>
    ${v ? `<div class="muted" style="font-size:14px">Głos lektora: <b>${esc(v.name)}</b></div>` : ''}
    <div class="row"><button class="btn soft" id="tSpk" ${audioOK() ? '' : 'disabled'}>${ICON.spk} Test lektora</button><button class="btn soft" id="tMic" ${dict ? '' : 'disabled'}>${ICON.mic} Test mikrofonu</button></div>
    <div id="tOut" class="muted" style="min-height:24px" aria-live="polite"></div></section>
   <div class="trackswitch" role="group" aria-label="Telefon" style="margin:18px 0 6px"><button data-os="android" aria-pressed="${os === 'android'}">Android</button><button data-os="ios" aria-pressed="${os === 'ios'}">iPhone</button></div>
   ${os === 'ios' ? ios : android}
   <p class="muted" style="font-size:14px">Po każdej zmianie w ustawieniach telefonu zamknij aplikację całkiem i otwórz ją ponownie, a potem wróć tutaj i zrób test.</p>`;
  $$('[data-os]').forEach(b => b.onclick = () => { helpOS = b.dataset.os; viewHelp(); });
  $('#tSpk').onclick = () => { speak('Здравей! Аз съм твоят лектор.'); $('#tOut').innerHTML = 'Powinnaś usłyszeć: <b lang="bg">Здравей! Аз съм твоят лектор.</b> Jeśli nic nie słychać, sprawdź głośność.'; };
  $('#tMic').onclick = () => testMic($('#tOut'));
}
async function testMic(out) {
  if (!dict) return;
  let got = '', offs = [];
  const done = msg => { offs.forEach(f => { try { f(); } catch (e) {} }); offs = []; out.innerHTML = msg; };
  out.innerHTML = 'Słucham… powiedz wyraźnie: <b lang="bg">Здравей</b>';
  offs.push(dict.onFinal(e => { got += e.text; }));
  offs.push(dict.onPartial(e => { if (e.text) out.innerHTML = `Słyszę: <span lang="bg">${esc(e.text)}</span>`; }));
  offs.push(dict.onState(s => { if (s.state !== 'idle') return;
    done(got.trim() ? `Rozpoznano: <b lang="bg">${esc(got.trim())}</b> – mikrofon działa ✓`
      : s.reason === 'not_granted' ? 'Brak dostępu do mikrofonu. Zezwól na mikrofon (krok 3 poniżej) i spróbuj ponownie.'
      : 'Nic nie rozpoznano. Sprawdź internet i spróbuj jeszcze raz.'); }));
  try { await dict.start(); setTimeout(() => { try { dict.stop(); } catch (e) {} }, 6000); }
  catch (e) { done(e && e.code === 'not_granted' ? 'Brak dostępu do mikrofonu. Zezwól na mikrofon (krok 3 poniżej) i spróbuj ponownie.' : 'Rozpoznawanie mowy nie ruszyło – sprawdź internet albo instrukcję poniżej.'); }
}
function installCard() {
  const head = t => `<div><div class="eyebrow">Na telefonie</div><b>${t}</b></div>`;
  if (window.claude) return `<div class="card stack">${head('Aplikacja na ekranie głównym')}
    <ol style="margin:0;padding-left:20px" class="muted"><li>Otwórz ten link w przeglądarce telefonu (Chrome na Androidzie, Safari na iPhonie) i zaloguj się do Claude.</li>
    <li>Android: menu ⋮ → <b>Dodaj do ekranu głównego</b>. iPhone: przycisk Udostępnij → <b>Do ekranu początkowego</b>.</li>
    <li>Ikona otwiera grę jak aplikację, a postęp jest wspólny z komputerem.</li></ol></div>`;
  const P = window.PWA;
  if (P && P.standalone()) return `<div class="card stack">${head('Aplikacja jest zainstalowana')}<span class="muted">Działa też bez internetu. Postęp zapisuje się na tym urządzeniu – pamiętaj o kopii zapasowej poniżej.</span></div>`;
  if (P && P.prompt) return `<div class="card stack">${head('Zainstaluj jako aplikację')}<span class="muted">Ikona na ekranie głównym, pełny ekran i nauka bez internetu.</span><button class="btn" id="installBtn">Zainstaluj aplikację</button></div>`;
  const ios = P && P.ios();
  return `<div class="card stack">${head('Zainstaluj jako aplikację')}
    <ol style="margin:0;padding-left:20px" class="muted">${ios
      ? '<li>Otwórz tę stronę w <b>Safari</b>.</li><li>Dotknij przycisku <b>Udostępnij</b> (kwadrat ze strzałką).</li><li>Wybierz <b>Do ekranu początkowego</b> → <b>Dodaj</b>.</li>'
      : '<li>Otwórz tę stronę w <b>Chrome</b> na telefonie.</li><li>Dotknij menu <b>⋮</b> → <b>Zainstaluj aplikację</b> (albo <b>Dodaj do ekranu głównego</b>).</li><li>Ikona pojawi się wśród aplikacji – gra działa też bez internetu.</li>'}</ol></div>`;
}
function exportProgress() {
  const blob = new Blob([JSON.stringify({app:'bg-za-sterami', exportedAt:new Date().toISOString(), state:S}, null, 1)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `bulgarski-postep-${today()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast('Kopia zapisana w Pobranych.');
}
function importProgress(file) {
  const r = new FileReader();
  r.onload = () => {
    let d; try { d = JSON.parse(r.result); } catch (e) { toast('To nie jest plik z kopią postępu.'); return; }
    const st = d && d.state ? d.state : d;
    if (!st || typeof st.xp !== 'number' || typeof st.lv !== 'object') { toast('To nie jest plik z kopią postępu.'); return; }
    S = mergeStates(S, st); applyTheme(); save(); route();
    toast(`Wczytano kopię: ${S.xp} XP, ${LEVELS.filter(l => isDone(l.id)).length} leveli.`);
  };
  r.onerror = () => toast('Nie udało się odczytać pliku.');
  r.readAsText(file);
}

/* ===== WIDOK: TEST WSTĘPNY ===== */
let PT = null;
function viewTest() {
  if (!PT || PT.done) PT = {i:0, answers:[], qs:PLACEMENT.map(q => ({...q, opts: shuffle(q.o)})), done:false};
  drawTestQ();
}
function drawTestQ() {
  const q = PT.qs[PT.i];
  $('#view').innerHTML = `<div class="stack">
    <div class="row" style="justify-content:space-between"><span class="eyebrow">Test wstępny</span><span class="qcount">${PT.i + 1} / ${PT.qs.length}</span></div>
    <div class="pbar"><i style="width:${100 * PT.i / PT.qs.length}%"></i></div>
    <div class="prompt" style="margin-top:8px">${q.q}</div>
    <div class="opts">${q.opts.map((o, i) => `<button class="opt" data-a="${esc(o)}"><span class="k">${i + 1}</span><span ${/[а-я]/i.test(o) ? 'lang="bg"' : ''}>${esc(o)}</span></button>`).join('')}
    <button class="opt" data-a="__idk"><span class="k">${q.opts.length + 1}</span><span class="muted">Nie wiem</span></button></div>
    <p class="muted" style="font-size:14px">Jeśli nie znasz odpowiedzi, wybierz „Nie wiem” – test będzie dokładniejszy niż przy zgadywaniu.</p></div>`;
  $$('.opt').forEach(b => b.onclick = () => {
    PT.answers[PT.i] = b.dataset.a === q.o[0];
    PT.i++;
    if (PT.i >= PT.qs.length) finishTest(); else drawTestQ();
  });
}
function finishTest() {
  PT.done = true;
  const tiers = [0,1,2,3,4].map(t => { const idx = PT.qs.map((q, i) => q.tier === t ? i : -1).filter(i => i >= 0); const ok = idx.filter(i => PT.answers[i]).length; return {t, ok, n:idx.length, pass: ok >= idx.length - 1 && ok >= 2}; });
  const skills = {}; PT.qs.forEach((q, i) => { skills[q.sk] = skills[q.sk] || {ok:0, n:0}; skills[q.sk].n++; if (PT.answers[i]) skills[q.sk].ok++; });
  const score = PT.answers.filter(Boolean).length;
  const cefr = score <= 4 ? 'A0' : score <= 9 ? 'A1' : score <= 14 ? 'A1+' : 'A2';
  /* codzienne: zaliczamy etapy po kolei, dopóki zdany jest próg */
  const dayUnits = [['d0'], ['d1','d2'], ['d3'], ['d4']];
  const passedDay = []; for (let t = 0; t < 4; t++) { if (tiers[t].pass) passedDay.push(...dayUnits[t]); else break; }
  const passedAir = tiers[4].pass && passedDay.length ? ['a0'] : [];
  const nextDay = TRACK.day.find(l => !passedDay.includes(l.unit.id));
  const nextAir = TRACK.air.find(l => !passedAir.includes(l.unit.id));
  const skName = {voc:'Słownictwo', read:'Czytanie i rozumienie', gram:'Gramatyka', air:'Słownictwo lotnicze'};
  const weakest = Object.entries(skills).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)[0][0];
  const weakTip = {voc:'Codziennie przejrzyj 10 zwrotów w zakładce Zwroty i odsłuchaj je.', read:'Czytaj na głos zdania z lekcji – transkrypcja pod tekstem pomoże z cyrylicą.', gram:'Zacznij dzień od jednej karty w zakładce Gramatyka (najpierw: rodzajnik i „да”).', air:'Trasa lotnicza – jeden level dziennie, a potem rozmówki „Lotnisko i aeroklub”.'}[weakest];
  const planShort = `Start: „${nextDay ? nextDay.t : 'trasa ukończona'}” i „${nextAir ? nextAir.t : 'trasa lotnicza ukończona'}”. Słabszy punkt: ${skName[weakest].toLowerCase()}.`;
  PT.result = {score, cefr, passedDay, passedAir, planShort};
  $('#view').innerHTML = `<div class="stack">
   <div class="card stack"><div class="eyebrow">Wynik testu</div>
    <div class="row" style="align-items:baseline"><b style="font-family:var(--f-display);font-size:34px">${cefr}</b><span class="muted">${score} z ${PT.qs.length} poprawnych</span></div>
    ${Object.entries(skills).map(([k, v]) => `<div><div class="row" style="justify-content:space-between;font-size:14px"><span>${skName[k]}</span><span class="mono">${v.ok}/${v.n}</span></div><div class="bar"><i style="width:${100 * v.ok / v.n}%"></i></div></div>`).join('')}
   </div>
   <div class="card stack"><div class="eyebrow">Twój plan lotu</div>
    <div><b>Na co dzień:</b> ${passedDay.length ? `zaliczasz ${passedDay.length} ${passedDay.length === 1 ? 'etap' : 'etapy'} i ` : ''}zaczynasz od „${esc(nextDay ? nextDay.t : '—')}”.</div>
    <div><b>Lotnictwo:</b> ${passedAir.length ? 'znasz podstawy, więc ' : ''}zaczynasz od „${esc(nextAir ? nextAir.t : '—')}”.</div>
    <div><b>Do poprawy:</b> ${skName[weakest].toLowerCase()}. ${weakTip}</div>
    <div><b>Codzienna plansza:</b>
     <ol style="margin:6px 0 0;padding-left:20px"><li>Nowy level (po kolei, ok. 2 „Na co dzień” na 1 lotniczy).</li><li>Utrwalenie ostatnich lekcji.</li><li>Zwroty dnia.</li><li>Utrwalanie słówek.</li><li>Mówienie i gramatyka.</li><li>Powtórka błędów – i lądowanie w kolejnym mieście.</li></ol></div>
    <div class="muted" style="font-size:14px">Każdego dnia plansza ułoży te lekcje sama. Cała trasa dnia to ok. 25 minut.</div>
   </div>
   <div class="row"><button class="btn" id="applyPlan">Zastosuj plan i lecimy</button><button class="btn ghost" id="redoTest">Powtórz test</button></div></div>`;
  $('#applyPlan').onclick = () => {
    LEVELS.forEach(l => { if ((passedDay.includes(l.unit.id) || passedAir.includes(l.unit.id)) && !isDone(l.id)) S.lv[l.id] = {stars:0, test:true}; });
    S.placement = {score, cefr, planShort, date:today()}; S.track = 'day'; S.game.day = null; save();
    location.hash = '#plansza'; toast('Plan zapisany. Powodzenia!');
  };
  $('#redoTest').onclick = () => { PT = null; viewTest(); };
}

/* ===== LEKCJA: ODPRAWA ===== */
function openBriefing(id, tile = null) {
  const l = LV[id]; const el = $('#lesson');
  el.hidden = false; document.body.style.overflow = 'hidden';
  el.innerHTML = `<div class="wrap lesson-top"><button class="xbtn" id="lx" aria-label="Zamknij">${ICON.x}</button><span class="eyebrow" style="flex:1">Odprawa · ${esc(l.unit.t)}</span></div>
   <div class="lesson-body"><div class="wrap brief stack">
    <div class="brief-head"><div><div class="prompt-kind">Level ${l.unit.id.toUpperCase()}.${l.n} · ${l.unit.cefr} · ${esc(l.unit.t)}</div><h2 class="view">${esc(l.t)}</h2><div class="muted" lang="bg">${esc(l.bt)}</div></div>${illus(l.unit, 'big')}</div>
    <div class="tipbox tblwrap">${l.tip}</div>
    <div><div class="eyebrow">Słówka w tym levelu</div><div class="words">${l.w.map(w => `<div class="wcell">${spkBtn(first(w[1]))}<div><b lang="bg">${esc(first(w[1]))}</b><small>${esc(w[0])} · <span class="mono">${esc(translit(first(w[1])))}</span></small></div></div>`).join('')}</div></div>
   </div></div>
   <div class="lesson-foot"><div class="wrap foot-in"><button class="btn block" id="lgo">Startujemy · ${13 + (l.g.length > 2 ? 1 : 0) + (l.g.length > 3 ? 1 : 0)} zadań</button></div></div>`;
  $('#lx').onclick = closeLesson;
  $('#lgo').onclick = () => startLesson(id, tile);
}
function closeLesson() {
  if (micCleanup) { micCleanup(); micCleanup = null; }
  if (dict && dict.active && dict.active()) dict.stop().catch(() => {});
  $('#lesson').hidden = true; $('#lesson').innerHTML = ''; document.body.style.overflow = ''; L = null; route();
}

/* ===== LEKCJA: BUDOWANIE ZADAŃ ===== */
const NI = i => ({kind:'n', i, n:NOUNS[i], lv:LV[NOUNS[i][4]], ref:'n:' + i});
const W = (lv, i) => ({kind:'w', lv, i, w:lv.w[i], ref:`${lv.id}:w:${i}`});
const SN = (lv, i) => ({kind:'s', lv, i, s:lv.s[i], ref:`${lv.id}:s:${i}`});
const GR = (lv, i) => ({kind:'g', lv, i, g:lv.g[i], ref:`${lv.id}:g:${i}`});
function distractWords(item, n, field) {
  const pool = shuffle(item.lv.w.filter((_, i) => i !== item.i)).concat(shuffle(ALLW.filter(x => x.lv.unit === item.lv.unit && x.lv !== item.lv).map(x => x.w))).concat(shuffle(ALLW.map(x => x.w)));
  const target = field === 'bg' ? first(item.w[1]) : item.w[0]; const out = [];
  for (const w of pool) { const v = field === 'bg' ? first(w[1]) : w[0]; if (v !== target && !out.includes(v)) out.push(v); if (out.length >= n) break; }
  return out;
}
function buildLesson(lv) {
  const wi = shuffle(lv.w.map((_, i) => i)), si = shuffle(lv.s.map((_, i) => i)), gi = shuffle(lv.g.map((_, i) => i));
  const w = k => W(lv, wi[k % wi.length]), s = k => SN(lv, si[k % si.length]), g = k => GR(lv, gi[k % gi.length]);
  const items = [
    {t:'mc', dir:'pl2bg', it:w(0)}, {t:'listen', it:w(1)}, {t:'gram', it:g(0)}, {t:'mc', dir:'bg2pl', it:w(2)},
    {t:'order', it:s(0)}, {t:'match', its:[3,4,5,6,7].map(k => w(k)).filter((x, i, a) => a.findIndex(y => y.ref === x.ref) === i)},
    {t:'write', it:w(8)}, {t:'gram', it:g(1)}, {t:'order', it:s(1)}, {t:'speak', it:s(2)}];
  if (lv.g.length > 2) items.push({t:'gram', it:g(2)});
  items.push({t:'dict', it:s(3)}, {t:'write', it:s(4)});
  if (lv.g.length > 3) items.push({t:'gram', it:g(3)});
  items.push({t:'mc', dir:'pl2bg', it:w(9)});
  return items;
}
function exFromRef(ref) {
  const it = getRef(ref); if (!it) return null;
  if (it.k === 'n') return {t:pick(['gender','article']), it:NI(it.i)};
  const obj = it.k === 'w' ? W(it.lv, it.i) : it.k === 's' ? SN(it.lv, it.i) : GR(it.lv, it.i);
  if (it.k === 'w') return pick([{t:'mc', dir:'pl2bg', it:obj}, {t:'write', it:obj}, {t:'mc', dir:'bg2pl', it:obj}]);
  if (it.k === 's') return pick([{t:'order', it:obj}, {t:'write', it:obj}, {t:'order', it:obj}]);
  return {t:'gram', it:obj};
}
function startReview() {
  const refs = Object.entries(S.mistakes).filter(([r, c]) => c > 0 && getRef(r)).sort((a, b) => b[1] - a[1]).slice(0, 10).map(x => x[0]);
  let items = refs.map(exFromRef).filter(Boolean);
  const done = LEVELS.filter(l => isDone(l.id));
  while (items.length < 8 && done.length) {
    const l = pick(done); const k = pick(['w','w','s','g']);
    const arr = k === 'w' ? l.w : k === 's' ? l.s : l.g; const ref = `${l.id}:${k}:${Math.floor(Math.random() * arr.length)}`;
    const ex = exFromRef(ref); if (ex) items.push(ex);
  }
  if (!items.length) items = buildWords(poolLevels()).slice(0, 8);
  $('#lesson').hidden = false; document.body.style.overflow = 'hidden';
  L = {mode:'review', lv:null, tile:5, queue:shuffle(items), i:0, first:0, right:0, scored:0, retried:new Set()};
  renderLessonShell(); renderEx();
}
let L = null;
function startLesson(id, tile = null) {
  const lv = LV[id];
  L = {mode:'level', lv, tile, queue:buildLesson(lv), i:0, right:0, scored:0, retried:new Set(), wrong:[]};
  renderLessonShell(); renderEx();
}
function renderLessonShell() {
  $('#lesson').innerHTML = `<div class="wrap lesson-top"><button class="xbtn" id="lx" aria-label="Przerwij lekcję">${ICON.x}</button>${L.lv ? illus(L.lv.unit, 'tiny') : ''}<div class="pbar"><i id="pb" style="width:0"></i></div><span class="qcount" id="qc"></span></div>
   <div class="lesson-body" id="lbody"><div class="wrap" id="ex"></div></div>
   <div class="lesson-foot" id="lfoot"><div class="wrap foot-in"><div class="fb" id="fb"></div><div class="foot-btns" id="fbtns"></div></div></div>`;
  $('#lx').onclick = closeLesson;
}

/* ===== LEKCJA: SILNIK ===== */
let CUR = null, micCleanup = null; /* {ready, check(), skip?} */
function setFoot(mode) {
  const f = $('#lfoot'); f.classList.remove('ok', 'bad');
  if (mode === 'check') {
    $('#fb').innerHTML = '';
    $('#fbtns').innerHTML = `${CUR && CUR.skipLabel ? `<button class="btn ghost" id="skipB">${CUR.skipLabel}</button>` : ''}<button class="btn" id="chk" ${CUR && CUR.ready ? '' : 'disabled'}>Sprawdź</button>`;
    $('#chk').onclick = doCheck;
    const sk = $('#skipB'); if (sk) sk.onclick = () => CUR.skip();
  }
}
function setReady(v) { if (CUR) CUR.ready = v; const c = $('#chk'); if (c) c.disabled = !v; }
function renderEx() {
  const q = L.queue[L.i];
  $('#pb').style.width = `${100 * L.i / L.queue.length}%`;
  $('#qc').textContent = `${L.i + 1}/${L.queue.length}`;
  if (micCleanup) { micCleanup(); micCleanup = null; }
  CUR = {ready:false, q};
  const box = $('#ex'); $('#lbody').scrollTop = 0;
  ({mc:exMC, listen:exListen, gram:exGram, order:exOrder, match:exMatch, write:exWrite, speak:exSpeak, dict:exDict, gender:exGender, article:exArticle})[q.t](box, q);
  setFoot('check');
}
function doCheck() {
  if (!CUR || !CUR.ready || CUR.checked) return;
  const r = CUR.check(); if (!r) return;
  CUR.checked = true; resolveAnswer(r);
}
function resolveAnswer(r) {
  const q = L.queue[L.i];
  const isRetry = L.retried.has(q);
  if (!r.skipped) {
    if (!isRetry) { L.scored++; if (r.ok) L.right++; S.answered++; if (r.ok) S.correct++; }
    const refs = q.its ? (r.badRefs || []) : [q.it.ref];
    if (!r.ok) { refs.forEach(ref => S.mistakes[ref] = (S.mistakes[ref] || 0) + 1); if (!isRetry) { const copy = {...q}; L.retried.add(copy); L.queue.push(copy); } }
    else if (q.it && S.mistakes[q.it.ref]) { S.mistakes[q.it.ref]--; if (S.mistakes[q.it.ref] <= 0) delete S.mistakes[q.it.ref]; }
  }
  const f = $('#lfoot'); f.classList.add(r.ok ? 'ok' : 'bad');
  if (!r.skipped) buzz(r.ok ? 15 : [40, 60, 40]);
  const head = r.skipped ? 'Pominięte' : r.ok ? (r.typo ? 'Dobrze, ale uważaj na literówkę' : pick(['Świetnie!', 'Dobrze!', 'Brawo!', 'Tak jest!', 'Отлично!'])) : 'Nie tym razem';
  $('#fb').innerHTML = `<div class="msg"><h4>${esc(head)}</h4>${r.answer ? `<div class="ans" ${r.answerBg ? 'lang="bg"' : ''}>${esc(r.answer)}</div>` : ''}${r.answerBg && r.answer ? `<div class="tr-line" style="text-align:left">${esc(translit(r.answer))}</div>` : ''}${r.extra ? `<div class="note">${r.extra}</div>` : ''}</div>${r.sayBg ? spkBtn(r.sayBg) : ''}`;
  $('#fbtns').innerHTML = `<button class="btn ${r.ok ? 'ok' : 'bad'}" id="nxt">Dalej</button>`;
  $('#nxt').onclick = nextEx; $('#nxt').focus();
  if (r.sayBg && S.autoVoice && audioOK() && !r.noAuto) speak(r.sayBg);
  save();
}
function nextEx() { L.i++; if (L.i >= L.queue.length) finishLesson(); else renderEx(); }
document.addEventListener('keydown', e => {
  if (!L || $('#lesson').hidden) return;
  if (e.key === 'Enter' && !e.shiftKey) {
    const n = $('#nxt'); if (n) { e.preventDefault(); n.click(); return; }
    if (CUR && CUR.ready && document.activeElement && document.activeElement.tagName !== 'BUTTON') { e.preventDefault(); doCheck(); }
    return;
  }
  if (/^[1-6]$/.test(e.key) && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
    const o = $$('#ex .opt')[+e.key - 1]; if (o && !$('#nxt')) o.click();
  }
});

/* --- typy zadań --- */
function optsHTML(opts, bg, abc) { return `<div class="opts">${opts.map((o, i) => `<button class="opt" data-v="${esc(o)}"><span class="k">${abc ? 'ABCD'[i] : i + 1}</span><span ${bg ? 'lang="bg"' : ''}>${esc(o)}</span></button>`).join('')}</div>`; }
function wireOpts(box, correct, mk) {
  let sel = null;
  $$('.opt', box).forEach(b => b.onclick = () => { if (CUR.checked) return; $$('.opt', box).forEach(x => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); sel = b.dataset.v; setReady(true); });
  CUR.check = () => { const ok = sel === correct; $$('.opt', box).forEach(x => { if (x.dataset.v === correct) x.classList.add('right'); else if (x.dataset.v === sel) x.classList.add('wrong'); }); return mk(ok, sel); };
}
function exMC(box, q) {
  const w = q.it.w, bg = first(w[1]);
  if (q.dir === 'pl2bg') {
    const opts = shuffle([bg, ...distractWords(q.it, 3, 'bg')]);
    box.innerHTML = `<div class="prompt-kind">Wybierz tłumaczenie</div><div class="prompt">${esc(w[0])}</div><div class="sub">Jak to powiedzieć po bułgarsku?</div>${optsHTML(opts, true)}`;
    wireOpts(box, bg, ok => ({ok, answer:bg, answerBg:true, sayBg:bg, extra:w[2] ? esc(w[2]) : ''}));
  } else {
    const opts = shuffle([w[0], ...distractWords(q.it, 3, 'pl')]);
    box.innerHTML = `<div class="prompt-kind">Co to znaczy?</div><div class="row" style="gap:12px;margin-bottom:6px">${spkBtn(bg)}<div class="prompt" lang="bg" style="margin:0">${esc(bg)}</div></div><div class="sub mono">${esc(translit(bg))}</div>${optsHTML(opts, false)}`;
    wireOpts(box, w[0], ok => ({ok, answer:`${bg} = ${w[0]}`, sayBg:bg, extra:w[2] ? esc(w[2]) : '', noAuto:true}));
  }
}
function exListen(box, q) {
  const w = q.it.w, bg = first(w[1]);
  const opts = shuffle([w[0], ...distractWords(q.it, 3, 'pl')]);
  if (audioOK()) {
    box.innerHTML = `<div class="prompt-kind">Słuchanie</div><div class="prompt">Co słyszysz?</div><div class="row" style="justify-content:center;gap:16px;margin:10px 0 20px">${spkBtn(bg, 'big')}<button class="spk" data-say="${esc(bg)}" data-slow="1" aria-label="Wolniej">${ICON.slow}</button></div>${optsHTML(opts, false)}`;
    setTimeout(() => speak(bg), 250);
  } else {
    box.innerHTML = `<div class="prompt-kind">Czytanie</div><div class="prompt" lang="bg">${esc(bg)}</div><div class="sub">Lektor jest niedostępny, więc przeczytaj słowo i wybierz znaczenie.</div>${optsHTML(opts, false)}`;
  }
  wireOpts(box, w[0], ok => ({ok, answer:`${bg} = ${w[0]}`, sayBg:bg, noAuto:true}));
}
function exGram(box, q) {
  const g = q.it.g, correct = g.o[0], opts = shuffle(g.o);
  const prompt = g.s ? `<span lang="bg">${esc(g.s).replace('___', '<span style="border-bottom:3px solid var(--earth);padding:0 18px"></span>')}</span>` : g.q;
  box.innerHTML = `<div class="prompt-kind">Gramatyka</div><div class="prompt">${prompt}</div>${g.pl ? `<div class="sub">${esc(g.pl)}</div>` : '<div class="sub"></div>'}${optsHTML(opts, /[а-я]/i.test(correct))}`;
  wireOpts(box, correct, ok => {
    const full = g.s ? g.s.replace('___', correct) : correct;
    return {ok, answer: g.s ? full : correct, answerBg: !!g.s || /[а-я]/i.test(correct), sayBg: g.s ? full : (/[а-я]/i.test(correct) ? correct : ''), extra: g.why || ''};
  });
}
const PROPER = ['София','Полша','Анна','Петър','Варна','България'];
const tokens = s => s.replace(/[.,!?…]/g, '').split(/\s+/).filter(Boolean).map((t, i) => (i === 0 && !PROPER.includes(t)) ? t[0].toLowerCase() + t.slice(1) : t);
function exOrder(box, q) {
  const sent = q.it.s, main = first(sent[1]);
  const toks = tokens(main);
  const others = shuffle(q.it.lv.s.filter((_, i) => i !== q.it.i).flatMap(x => tokens(first(x[1]))).filter(t => !toks.includes(t)));
  const extra = [...new Set(others)].slice(0, toks.length > 5 ? 2 : 3);
  const bank = shuffle([...toks, ...extra]).map((t, i) => ({t, id:i}));
  const chosen = [];
  box.innerHTML = `<div class="prompt-kind">Ułóż zdanie</div><div class="prompt">${esc(sent[0])}</div><div class="sub">Dotknij słów w odpowiedniej kolejności. Niektóre słowa są zbędne.</div>
   <div class="tiles" id="tl" aria-label="Twoje zdanie"></div><div class="tiles bank" id="tb"></div>`;
  const draw = () => {
    $('#tl').innerHTML = chosen.map(c => `<button class="tile" lang="bg" data-id="${c.id}">${esc(c.t)}</button>`).join('');
    $('#tb').innerHTML = bank.map(c => `<button class="tile ${chosen.includes(c) ? 'used' : ''}" lang="bg" data-id="${c.id}" ${chosen.includes(c) ? 'tabindex="-1" aria-hidden="true"' : ''}>${esc(c.t)}</button>`).join('');
    setReady(chosen.length > 0);
  };
  $('#tb').onclick = e => { const b = e.target.closest('.tile'); if (!b || CUR.checked) return; const c = bank[+b.dataset.id]; if (!chosen.includes(c)) { chosen.push(c); draw(); } };
  $('#tl').onclick = e => { const b = e.target.closest('.tile'); if (!b || CUR.checked) return; const k = chosen.findIndex(c => c.id === +b.dataset.id); if (k >= 0) { chosen.splice(k, 1); draw(); } };
  draw();
  CUR.check = () => {
    const got = norm(chosen.map(c => c.t).join(' '));
    const ok = alts(sent[1]).some(a => norm(tokens(a).join(' ')) === got);
    return {ok, answer:main, answerBg:true, sayBg:main};
  };
}
function exMatch(box, q) {
  const its = q.its.slice(0, 5);
  const L1 = shuffle(its.map((x, j) => ({k:j, v:x.w[0]}))), R1 = shuffle(its.map((x, j) => ({k:j, v:first(x.w[1])})));
  let selL = null, selR = null, left = its.length; const bad = new Set();
  box.innerHTML = `<div class="prompt-kind">Dopasuj pary</div><div class="prompt">Połącz słowa w pary</div><div class="sub">Dotknij słowa po lewej i jego tłumaczenia po prawej.</div>
   <div class="matchgrid"><div class="col">${L1.map(x => `<button class="mt" data-side="l" data-k="${x.k}">${esc(x.v)}</button>`).join('')}</div>
   <div class="col">${R1.map(x => `<button class="mt" lang="bg" data-side="r" data-k="${x.k}">${esc(x.v)}</button>`).join('')}</div></div>`;
  const tryPair = () => {
    if (!selL || !selR) return;
    const a = selL, b = selR; selL = selR = null;
    if (a.dataset.k === b.dataset.k) {
      a.classList.add('gone'); b.classList.add('gone'); a.setAttribute('aria-pressed','false'); b.setAttribute('aria-pressed','false');
      if (audioOK()) speak(b.textContent);
      if (--left === 0) { CUR.checked = true; const badRefs = [...bad].map(k => its[+k].ref); resolveAnswer({ok: bad.size <= 1, answer: bad.size ? `Pomyłki: ${bad.size}` : 'Wszystkie pary bez błędu', badRefs: bad.size > 1 ? badRefs : [], noAuto:true}); }
    } else {
      bad.add(a.dataset.k); [a, b].forEach(x => { x.classList.add('err'); x.setAttribute('aria-pressed','false'); setTimeout(() => x.classList.remove('err'), 500); });
    }
  };
  box.querySelector('.matchgrid').onclick = e => {
    const b = e.target.closest('.mt'); if (!b || b.classList.contains('gone')) return;
    const side = b.dataset.side;
    $$(`.mt[data-side="${side}"]`, box).forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    if (side === 'l') selL = b; else selR = b;
    tryPair();
  };
  CUR.check = () => null;
  setTimeout(() => { const c = $('#chk'); if (c) c.hidden = true; }, 0);
}
/* klawiatura i pisanie */
const KB = ['я в е р т ъ у и о п ш щ', 'а с д ф г х й к л ж ч ю', 'з ь ц б н м'];
const LAT = {a:'а',b:'б',v:'в',w:'в',g:'г',d:'д',e:'е','ż':'ж','ź':'ж',z:'з',i:'и',j:'й',k:'к',l:'л','ł':'л',m:'м',n:'н',o:'о','ó':'у',p:'п',r:'р',s:'с','ś':'с',t:'т',u:'у',f:'ф',h:'х',c:'ц','ć':'ц',y:'ъ',x:'ь',q:'я','ą':'ъ','ę':'е','ń':'н'};
const DI = {'сz':'ш','цz':'ч','цh':'х','йa':'я','йu':'ю','шt':'щ'};
function answerBox(placeholder) {
  return `<textarea class="answer" id="ans" rows="2" lang="bg" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(placeholder)}" aria-label="Twoja odpowiedź"></textarea>
   <div class="kb" id="kb" aria-label="Klawiatura bułgarska">${KB.map((r, i) => `<div class="krow">${r.split(' ').map(k => `<button type="button" data-k="${k}">${k}</button>`).join('')}${i === 2 ? '<button type="button" class="wide" data-k=" ">spacja</button><button type="button" class="wide" data-k="⌫" aria-label="Usuń">⌫</button>' : ''}</div>`).join('')}</div>
   <label class="toggle"><input type="checkbox" id="trl" ${S.translit ? 'checked' : ''}> Zamieniaj łacinkę na cyrylicę (sz → ш, cz → ч, ż → ж, ja → я, y → ъ)</label>`;
}
function wireAnswer(onChange) {
  const inp = $('#ans');
  $('#kb').onclick = e => {
    const b = e.target.closest('[data-k]'); if (!b || CUR.checked) return;
    const k = b.dataset.k, s = inp.selectionStart ?? inp.value.length, en = inp.selectionEnd ?? s;
    if (k === '⌫') { if (s !== en) inp.setRangeText('', s, en, 'end'); else if (s > 0) inp.setRangeText('', s - 1, s, 'end'); }
    else inp.setRangeText(k, s, en, 'end');
    onChange();
  };
  $('#trl').onchange = e => { S.translit = e.target.checked; save(); };
  inp.addEventListener('input', e => {
    if (S.translit && e.inputType === 'insertText' && e.data && e.data.length === 1) {
      const ch = e.data, lo = ch.toLowerCase(), rep = LAT[lo];
      if (rep) {
        const pos = inp.selectionStart, before = inp.value.slice(0, pos - 1), after = inp.value.slice(pos);
        const prev = before.slice(-1), key = prev.toLowerCase() + lo;
        let nb;
        if (DI[key]) { let r = DI[key]; if (prev !== prev.toLowerCase()) r = r.toUpperCase(); nb = before.slice(0, -1) + r; }
        else nb = before + (ch !== lo ? rep.toUpperCase() : rep);
        inp.value = nb + after; inp.setSelectionRange(nb.length, nb.length);
      }
    }
    onChange();
  });
  setTimeout(() => { if (matchMedia('(pointer:fine)').matches) inp.focus(); }, 50);
  return inp;
}
function exWrite(box, q) {
  const isW = q.it.kind === 'w'; const pl = isW ? q.it.w[0] : q.it.s[0]; const ans = isW ? q.it.w[1] : q.it.s[1];
  box.innerHTML = `<div class="prompt-kind">Pisanie</div><div class="prompt">${esc(pl)}</div><div class="sub">Napisz po bułgarsku.</div>${answerBox('Pisz tutaj…')}`;
  const inp = wireAnswer(() => setReady(norm(inp.value).length > 0));
  CUR.check = () => { const r = checkText(inp.value, ans); const main = first(ans); return {ok:r.ok, typo:r.typo, answer:main, answerBg:true, sayBg:main, extra: alts(ans).length > 1 ? `Też poprawnie: <span lang="bg">${alts(ans).slice(1).map(esc).join(' · ')}</span>` : (isW && q.it.w[2] ? esc(q.it.w[2]) : '')}; };
}
function exDict(box, q) {
  const s = q.it.s, main = first(s[1]);
  if (!audioOK()) { exWrite(box, q); return; }
  box.innerHTML = `<div class="prompt-kind">Dyktando</div><div class="prompt">Zapisz, co słyszysz</div><div class="row" style="gap:12px;margin:8px 0 16px">${spkBtn(main, 'big')}<button class="spk" data-say="${esc(main)}" data-slow="1" aria-label="Wolniej">${ICON.slow}</button></div>${answerBox('Zapisz zdanie…')}`;
  setTimeout(() => speak(main), 250);
  const inp = wireAnswer(() => setReady(norm(inp.value).length > 0));
  CUR.check = () => { const r = checkText(inp.value, s[1]); return {ok:r.ok, typo:r.typo, answer:main, answerBg:true, sayBg:main, extra:esc(s[0]), noAuto:true}; };
}
function exSpeak(box, q) {
  const s = q.it.s || q.it.w, main = first(s[1]);
  const canMic = !!dict && !dictOff;
  box.innerHTML = `<div class="prompt-kind">Mówienie</div><div class="prompt">${esc(s[0])}</div><div class="sub">Powiedz to na głos po bułgarsku.</div>
   <div class="card stack" style="text-align:center"><div class="target" lang="bg">${esc(main)}</div><div class="tr-line">${esc(translit(main))}</div><div class="row" style="justify-content:center">${spkBtn(main)}<button class="spk" data-say="${esc(main)}" data-slow="1" aria-label="Wolniej">${ICON.slow}</button></div></div>
   <div id="spArea" style="margin-top:14px"></div>`;
  CUR.skipLabel = 'Nie mogę teraz mówić';
  CUR.skip = () => { CUR.checked = true; if (dict && dict.active && dict.active()) dict.stop().catch(() => {}); resolveAnswer({ok:true, skipped:true, answer:main, answerBg:true, sayBg:main, noAuto:true}); };
  if (canMic) micMode(main); else selfMode(main);
}
function micMode(main) {
  let heard = '', partial = '', unsubs = [];
  $('#spArea').innerHTML = `<button class="mic" id="micB" aria-label="Nagrywaj">${ICON.mic}</button><div class="heard" id="heard"><i>Dotknij mikrofonu i mów</i></div>`;
  const show = () => { $('#heard').innerHTML = heard || partial ? `<span lang="bg">${esc((heard + ' ' + partial).trim())}</span>` : '<i>Słucham…</i>'; setReady(!!heard.trim() || !!partial.trim()); };
  unsubs.push(dict.onFinal(({text}) => { heard = (heard + text).replace(/^\s+/, ''); partial = ''; if ($('#heard')) show(); }));
  unsubs.push(dict.onPartial(({text}) => { partial = text; if ($('#heard')) show(); }));
  unsubs.push(dict.onState(({state, reason}) => {
    const b = $('#micB'); if (!b) return;
    b.classList.toggle('live', state === 'listening' || state === 'starting');
    if (state === 'idle' && (reason === 'unavailable' || reason === 'not_granted')) { dictOff = true; cleanup(); selfMode(main, reason === 'not_granted' ? 'Mikrofon jest wyłączony dla tej strony.' : 'Rozpoznawanie mowy po bułgarsku nie jest tu dostępne.'); }
  }));
  const cleanup = () => { unsubs.forEach(u => { try { u(); } catch (e) {} }); unsubs = []; };
  micCleanup = cleanup;
  $('#micB').onclick = () => {
    if (dict.active()) { dict.stop().catch(() => {}); return; }
    heard = ''; partial = ''; show();
    dict.start({language:'bg'}).catch(e => {
      const c = e && e.code;
      if (c === 'unavailable' || c === 'not_granted') { dictOff = true; cleanup(); selfMode(main, c === 'not_granted' ? 'Bez zgody na mikrofon – oceń się sama.' : 'Rozpoznawanie mowy po bułgarsku nie jest tu dostępne – oceń się sama.'); }
      else if (c === 'rate_limited') toast('Za dużo nagrań naraz. Spróbuj za chwilę.');
      else if (c !== 'stopped' && c !== 'dismissed') toast('Mikrofon nie zadziałał. Spróbuj ponownie.');
    });
  };
  CUR.check = () => {
    if (dict.active()) dict.stop().catch(() => {});
    cleanup();
    const said = (heard + ' ' + partial).trim();
    const sim = Math.max(...alts(q_s_alts(main)).map(a => similarity(said, a)));
    const ok = sim >= 0.75;
    return {ok, answer:main, answerBg:true, sayBg:main, noAuto:ok, extra:`Rozpoznany tekst: <span lang="bg">${esc(said || '—')}</span> · zgodność ${Math.round(sim * 100)}%${ok ? '' : '. Posłuchaj lektora i spróbuj przy powtórce.'}`};
  };
}
function q_s_alts(main) { const q = L.queue[L.i]; return q.it.s ? q.it.s[1] : q.it.w ? q.it.w[1] : main; }
function selfMode(main, why) {
  $('#spArea').innerHTML = `${why ? `<p class="muted" style="text-align:center;font-size:14px">${esc(why)}</p>` : '<p class="muted" style="text-align:center;font-size:14px">Rozpoznawanie mowy nie działa w tej przeglądarce (najlepiej sprawdza się Chrome). Oceń się sama.</p>'}
   <ol style="margin:0 auto;max-width:420px;padding-left:20px;color:var(--muted)"><li>Posłuchaj lektora.</li><li>Powiedz zdanie na głos 2–3 razy.</li><li>Oceń, czy brzmiało podobnie.</li></ol>
   <div class="row" style="justify-content:center;margin-top:14px"><button class="btn ok" id="selfOk">Powiedziałam dobrze</button><button class="btn ghost" id="selfBad">Jeszcze nie</button></div>`;
  $('#selfOk').onclick = () => { if (CUR.checked) return; CUR.checked = true; resolveAnswer({ok:true, answer:main, answerBg:true, sayBg:main, noAuto:true}); };
  $('#selfBad').onclick = () => { if (CUR.checked) return; CUR.checked = true; resolveAnswer({ok:false, answer:main, answerBg:true, sayBg:main, extra:'Wrócimy do tego zdania na końcu lekcji.'}); };
  CUR.check = () => null;
  setReady(false);
  setTimeout(() => { const c = $('#chk'); if (c) c.hidden = true; }, 0);
}

