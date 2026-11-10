
/* ===== TREŚCI DOPASOWANE DO POSTĘPU ===== */
const reachedLevels = () => { const r = LEVELS.filter(l => isOpen(l)); return r.length ? r : [LEVELS[0]]; };
const reachedNouns = () => { const ids = new Set(reachedLevels().map(l => l.id)); let idx = NOUNS.map((n, i) => ids.has(n[4]) ? i : -1).filter(i => i >= 0); if (idx.length < 8) idx = [...new Set([...idx, ...NOUNS.map((_, i) => i).slice(0, 10)])]; return idx; };
const catUnlocked = name => name === 'Podstawy' || (PH_UNLOCK[name] && LV[PH_UNLOCK[name]] && isOpen(LV[PH_UNLOCK[name]]));
function myPhrases(filter = 'all') {
  const out = [];
  if (filter === 'all' || filter !== 'lv') PHRASES.forEach((c, ci) => { if (!catUnlocked(c.n) || (filter !== 'all' && filter !== c.n)) return; const lv = LV['ph' + ci]; lv.s.forEach((x, i) => out.push({pl:x[0], bg:x[1], lv, i, src:c.n})); });
  if (filter === 'all' || filter === 'lv') reachedLevels().forEach(lv => lv.s.forEach((x, i) => out.push({pl:x[0], bg:x[1], lv, i, src:lv.t})));
  return out;
}
const byMistakes = arr => shuffle(arr).sort((a, b) => (S.mistakes[b.ref] || 0) - (S.mistakes[a.ref] || 0));
const take = (arr, n) => { const out = []; for (let k = 0; k < n && arr.length; k++) out.push(arr[k % arr.length]); return out; };
function finishBest(key, val) { if (val > (S.best[key] || 0)) { S.best[key] = val; save(); return true; } return false; }

/* ===== NOWE TYPY ZADAŃ: RODZAJ I RODZAJNIK ===== */
const GNAME = {m:'męski', f:'żeński', n:'nijaki'};
const GPRON = {m:'той', f:'тя', n:'то'};
const GRULE = {m:'Rodzaj męski: pełny rodzajnik -ът (podmiot), krótki -а w dopełnieniu.', f:'Rodzaj żeński: rodzajnik -та.', n:'Rodzaj nijaki: rodzajnik -то.'};
function exGender(box, q) {
  const n = q.it.n;
  box.innerHTML = `<div class="prompt-kind">Rodzaj rzeczownika</div><div class="row" style="gap:12px;margin-bottom:6px">${spkBtn(n[0])}<div class="prompt" lang="bg" style="margin:0">${esc(n[0])}</div></div><div class="sub">${esc(n[1])} – jaki to rodzaj po bułgarsku?</div>
   <div class="opts">${['m','f','n'].map((g, i) => `<button class="opt" data-v="${g}"><span class="k">${i + 1}</span><span>${GNAME[g]} <span class="muted" lang="bg">(${GPRON[g]})</span></span></button>`).join('')}</div>`;
  wireOpts(box, n[2], ok => ({ok, answer:`${n[0]} – ${GNAME[n[2]]} → ${n[3]}`, sayBg:n[3], extra:esc(n[5] || GRULE[n[2]]), noAuto:true}));
}
function exArticle(box, q) {
  const n = q.it.n, base = n[0];
  const cands = [...new Set([base + 'ът', base + 'та', base + 'то', base.replace(/[аяоей]$/, '') + 'ът', base + 'ят'])].filter(x => x !== n[3]);
  const opts = shuffle([n[3], ...shuffle(cands).slice(0, 2)]);
  box.innerHTML = `<div class="prompt-kind">Rodzajnik: -ът / -та / -то</div><div class="prompt">Mówimy o czymś konkretnym: <span lang="bg">${esc(base)}</span> → ?</div><div class="sub">„${esc(n[1])}”, ale ten konkretny. Wybierz formę z rodzajnikiem.</div>${optsHTML(opts, true)}`;
  wireOpts(box, n[3], ok => ({ok, answer:`${base} → ${n[3]}`, answerBg:false, sayBg:n[3], extra:esc(`${GNAME[n[2]]}. ${n[5] || GRULE[n[2]]}`)}));
}

/* ===== ZAKŁADKA: ZWROTY (fiszki, dopasowanie, lista) ===== */
let phMode = 'fiszki', phFilter = 'all', FC = null, MG = null, phraseQ = '';
function viewPhrases() {
  const cats = PHRASES.filter(c => catUnlocked(c.n)).map(c => c.n);
  if (phFilter !== 'all' && phFilter !== 'lv' && !cats.includes(phFilter)) phFilter = 'all';
  const n = myPhrases(phFilter).length;
  $('#view').innerHTML = `<h2 class="view">Zwroty</h2><p class="muted" style="margin-top:0">Twoja talia rośnie z każdym levelem: nowe kategorie zwrotów i zdania z odblokowanych lekcji. Teraz masz ${myPhrases().length} zwrotów.</p>
   <div class="seg modes" role="group" aria-label="Tryb">${[['fiszki','Fiszki'],['dopasuj','Dopasuj pary'],['lista','Lista']].map(([k, t]) => `<button data-m="${k}" aria-pressed="${phMode === k}">${t}</button>`).join('')}</div>
   ${phMode !== 'lista' ? `<div class="chips" style="margin:12px 0">${[['all','Wszystkie moje'], ['lv','Z leveli'], ...cats.map(c => [c, c])].map(([k, t]) => `<button class="chip" data-f="${esc(k)}" aria-pressed="${phFilter === k}">${esc(t)}</button>`).join('')}</div>` : ''}
   <div id="phbox"></div>`;
  $$('[data-m]').forEach(b => b.onclick = () => { phMode = b.dataset.m; viewPhrases(); });
  $$('[data-f]').forEach(b => b.onclick = () => { phFilter = b.dataset.f; FC = null; MG = null; viewPhrases(); });
  if (phMode === 'fiszki') drawFlash(); else if (phMode === 'dopasuj') drawMatchGame(); else drawPhraseList();
}
function drawFlash() {
  const key = phFilter;
  if (!FC || FC.key !== key) FC = {key, deck:shuffle(myPhrases(key)), known:0, flipped:false, dir:(FC && FC.dir) || 'pl'};
  const box = $('#phbox');
  if (!FC.deck.length) {
    box.innerHTML = `<div class="card stack" style="text-align:center"><b style="font-family:var(--f-display);font-size:20px">Talia przerobiona!</b><span class="muted">Znasz ${FC.known} zwrotów z tej talii.</span><button class="btn" id="fcAgain">Przetasuj i jeszcze raz</button></div>`;
    $('#fcAgain').onclick = () => { FC = null; drawFlash(); };
    return;
  }
  const c = FC.deck[0];
  const front = FC.dir === 'pl' ? `<div class="fpl">${esc(c.pl)}</div>` : `<div class="fbg" lang="bg">${esc(c.bg)}</div><div class="tr-line">${esc(translit(c.bg))}</div>`;
  const back = FC.dir === 'pl' ? `<div class="fbg" lang="bg">${esc(c.bg)}</div><div class="tr-line">${esc(translit(c.bg))}</div><div class="muted">${esc(c.pl)}</div>` : `<div class="fpl">${esc(c.pl)}</div><div class="muted" lang="bg">${esc(c.bg)}</div>`;
  box.innerHTML = `<div class="row" style="justify-content:space-between;margin-bottom:10px"><span class="qcount">Zostało ${FC.deck.length} · umiesz ${FC.known}</span>
     <button class="chip" id="fcDir">${FC.dir === 'pl' ? 'Najpierw polski' : 'Najpierw bułgarski'} ⇄</button></div>
   <div class="flash ${FC.flipped ? 'flipped' : ''}" id="fcCard" role="button" tabindex="0" aria-label="Odwróć fiszkę">
     <div class="face front"><span class="eyebrow">${esc(c.src)}</span>${front}<span class="muted" style="font-size:13px">Dotknij, aby odwrócić</span></div>
     <div class="face back"><span class="eyebrow">${esc(c.src)}</span>${back}${spkBtn(c.bg)}</div></div>
   <div class="foot-btns" style="margin-top:14px">${FC.flipped ? `<button class="btn ghost" id="fcNo">Jeszcze nie</button><button class="btn ok" id="fcYes">Umiem</button>` : `<button class="btn block" id="fcFlip">Pokaż odpowiedź</button>`}</div>`;
  const flip = () => { FC.flipped = true; drawFlash(); if (S.autoVoice && audioOK()) speak(c.bg); };
  $('#fcCard').onclick = () => { if (!FC.flipped) flip(); };
  $('#fcCard').onkeydown = e => { if ((e.key === 'Enter' || e.key === ' ') && !FC.flipped) { e.preventDefault(); flip(); } };
  const fl = $('#fcFlip'); if (fl) fl.onclick = flip;
  $('#fcDir').onclick = () => { FC.dir = FC.dir === 'pl' ? 'bg' : 'pl'; FC.flipped = false; drawFlash(); };
  const no = $('#fcNo'); if (no) no.onclick = () => { const x = FC.deck.shift(); FC.deck.splice(Math.min(3, FC.deck.length), 0, x); FC.flipped = false; drawFlash(); };
  const yes = $('#fcYes'); if (yes) yes.onclick = () => { FC.deck.shift(); FC.known++; FC.flipped = false; if (FC.known % 5 === 0) { addXP(2); save(); renderHud(); } drawFlash(); };
}
function drawMatchGame() {
  const box = $('#phbox');
  if (!MG || MG.done) {
    const pool = shuffle(myPhrases(phFilter));
    MG = {pairs:pool.slice(0, 5), left:Math.min(5, pool.length), miss:0, t0:Date.now(), selL:null, selR:null, done:false};
  }
  const P5 = MG.pairs;
  const Lc = shuffle(P5.map((x, j) => ({k:j, v:x.pl}))), Rc = shuffle(P5.map((x, j) => ({k:j, v:x.bg})));
  box.innerHTML = `<div class="row" style="justify-content:space-between;margin-bottom:10px"><span class="qcount" id="mgInfo">Pary: 0/${P5.length} · błędy: 0</span><span class="qcount">Rekord: ${S.best.match || 0} pkt</span></div>
   <div class="matchgrid phm"><div class="col">${Lc.map(x => `<button class="mt" data-side="l" data-k="${x.k}">${esc(x.v)}</button>`).join('')}</div>
   <div class="col">${Rc.map(x => `<button class="mt" lang="bg" data-side="r" data-k="${x.k}">${esc(x.v)}</button>`).join('')}</div></div><div id="mgEnd"></div>`;
  let got = 0;
  box.querySelector('.matchgrid').onclick = e => {
    const b = e.target.closest('.mt'); if (!b || b.classList.contains('gone')) return;
    const side = b.dataset.side;
    $$(`.mt[data-side="${side}"]`, box).forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    if (side === 'l') MG.selL = b; else MG.selR = b;
    if (!MG.selL || !MG.selR) return;
    const a = MG.selL, c = MG.selR; MG.selL = MG.selR = null;
    if (a.dataset.k === c.dataset.k) { a.classList.add('gone'); c.classList.add('gone'); got++; if (audioOK()) speak(c.textContent); }
    else { MG.miss++; [a, c].forEach(x => { x.classList.add('err'); x.setAttribute('aria-pressed', 'false'); setTimeout(() => x.classList.remove('err'), 500); }); }
    $('#mgInfo').textContent = `Pary: ${got}/${P5.length} · błędy: ${MG.miss}`;
    if (got === P5.length) {
      MG.done = true;
      const sec = Math.round((Date.now() - MG.t0) / 1000), pts = Math.max(10, 150 - sec * 2 - MG.miss * 10);
      const rec = finishBest('match', pts); addXP(3); save(); renderHud();
      $('#mgEnd').innerHTML = `<div class="card stack" style="margin-top:14px;text-align:center"><b style="font-family:var(--f-display);font-size:20px">${pts} pkt${rec ? ' · nowy rekord!' : ''}</b><span class="muted">Czas: ${sec} s, błędy: ${MG.miss}</span><button class="btn" id="mgNext">Następna runda</button></div>`;
      $('#mgNext').onclick = () => drawMatchGame();
    }
  };
}
function drawPhraseList() {
  const q = norm(phraseQ);
  $('#phbox').innerHTML = `<input class="search" id="pq" placeholder="Szukaj po polsku lub bułgarsku…" value="${esc(phraseQ)}" aria-label="Szukaj zwrotu" style="margin:12px 0"><div id="plist" class="stack"></div>`;
  const draw = () => {
    const q = norm(phraseQ);
    $('#plist').innerHTML = PHRASES.map(c => {
      if (!catUnlocked(c.n)) { const l = LV[PH_UNLOCK[c.n]]; return `<section class="card row" style="gap:10px"><span class="muted">${ICON.lock}</span><div><b>${esc(c.n)}</b><div class="muted" style="font-size:14px">Odblokujesz w levelu „${esc(l ? l.t : '')}”.</div></div></section>`; }
      const items = c.items.filter(([pl, bg]) => !q || norm(pl).includes(q) || norm(bg).includes(q) || norm(translit(bg)).includes(q));
      if (!items.length) return '';
      return `<section><div class="eyebrow" style="margin:8px 0">${esc(c.n)}</div><div class="plist">${items.map(([pl, bg]) =>
        `<div class="prow"><div class="txt"><div class="bg" lang="bg">${esc(bg)}</div><div class="tr">${esc(translit(bg))}</div><div class="pl">${esc(pl)}</div></div>${spkBtn(bg)}</div>`).join('')}</div></section>`;
    }).join('') || '<p class="muted">Brak wyników.</p>';
  };
  const pq = $('#pq'); pq.oninput = () => { phraseQ = pq.value; draw(); };
  draw();
}

/* ===== ZAKŁADKA: SŁÓWKA (gra w pisanie, gra w mówienie, słowniczek) ===== */
let dictTrack = 'mine', dictQ = '';
const myWords = () => byMistakes(reachedLevels().flatMap(l => l.w.map((_, i) => W(l, i))));
function startWordGame(kind) {
  const ws = myWords();
  const items = kind === 'write' ? take(ws, 10).map(it => ({t:'write', it})) : take(ws, 8).map(it => ({t:'speak', it}));
  startPractice(null, items, kind === 'write' ? 'Gra: pisanie słówek' : 'Gra: mówienie słówek', () => startWordGame(kind));
}
function viewDict() {
  const nMine = myWords().length;
  $('#view').innerHTML = `<h2 class="view">Słówka</h2><p class="muted" style="margin-top:0">Obie gry losują słówka z Twoich odblokowanych leveli (teraz ${nMine}). Najpierw wracają te, w których były błędy.</p>
   <div class="gamegrid">
    <button class="gamecard" id="gWrite"><span class="gicon">${'<span class="glyph" lang="bg">Пиши</span>'}</span><b>Gra: pisanie</b><span class="muted">10 słówek. Widzisz polskie słowo, piszesz po bułgarsku – klawiaturą cyrylicy albo łacinką.</span><span class="btn">Graj</span></button>
    <button class="gamecard" id="gSpeak"><span class="gicon">${ICON.mic}</span><b>Gra: mówienie</b><span class="muted">8 słówek. Słuchasz lektora i mówisz na głos; aplikacja sprawdza wymowę.</span><span class="btn">Graj</span></button>
   </div>
   <h3 class="eyebrow" style="margin:24px 0 8px">Słowniczek</h3>
   <div class="stack"><input class="search" id="dq" placeholder="Szukaj…" value="${esc(dictQ)}" aria-label="Szukaj słowa">
   <div class="chips">${[['mine','Moje'],['all','Wszystkie'],['day','Na co dzień'],['air','Lotnictwo']].map(([k, n]) => `<button class="chip" data-t="${k}" aria-pressed="${dictTrack === k}">${n}</button>`).join('')}</div>
   <div id="dlist"></div></div>`;
  $('#gWrite').onclick = () => startWordGame('write');
  $('#gSpeak').onclick = () => startWordGame('speak');
  $$('[data-t]').forEach(b => b.onclick = () => { dictTrack = b.dataset.t; viewDict(); });
  const dq = $('#dq'); dq.oninput = () => { dictQ = dq.value; drawDict(); };
  drawDict();
}
function drawDict() {
  const q = norm(dictQ);
  const groups = UNITS.filter(u => dictTrack === 'all' || dictTrack === 'mine' || u.track === dictTrack).map(u => {
    const rows = u.levels.filter(l => dictTrack !== 'mine' || isOpen(l)).flatMap(l => l.w.map(w => ({w, l}))).filter(({w}) => !q || norm(w[0]).includes(q) || norm(w[1]).includes(q));
    if (!rows.length) return '';
    return `<section><div class="eyebrow" style="margin:14px 0 8px"><span lang="bg">${esc(u.bt)}</span> · ${esc(u.t)}</div><div class="plist">${rows.map(({w}) =>
      `<div class="prow"><div class="txt"><div class="bg" lang="bg">${esc(alts(w[1]).join(' / '))}</div><div class="tr">${esc(translit(first(w[1])))}</div><div class="pl">${esc(w[0])}${w[2] ? ` · <b style="color:var(--earth)">${esc(w[2])}</b>` : ''}</div></div>${spkBtn(first(w[1]))}</div>`).join('')}</div></section>`;
  }).join('');
  $('#dlist').innerHTML = groups || '<p class="muted">Nic nie znaleziono.</p>';
}

/* ===== ZAKŁADKA: GRAMATYKA (ćwiczenia + ściąga) ===== */
/* ===== ODMIANA CZASOWNIKÓW ===== */
const PRON = [['аз','ja'],['ти','ty'],['той','on'],['ние','my'],['вие','wy'],['те','oni']];
const TENSE_PL = {pres:'czas teraźniejszy', past:'czas przeszły', fut:'czas przyszły'};
const vForms = (v, tense) => (tense === 'past' ? v[3] : v[2]).split(' ');
function verbTenses(v) { const pair = v[1].includes(' / '); return v[5] ? ['fut', 'past'] : pair ? ['pres', 'past'] : ['pres', 'past', 'fut']; }
function verbItem(vi, tense, p) {
  const v = VERBS[vi], forms = vForms(v, tense), refl = v[6] ? 'се ' : '';
  let pron = PRON[p][0], plp = PRON[p][1];
  if (p === 2 && Math.random() < 0.5) { pron = 'тя'; plp = 'ona'; }
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const s = tense === 'past' ? `Вчера ${pron} ${refl}___.` : tense === 'fut' ? `Утре ${pron} ще ${refl}___.` : `${cap(pron)} ${refl}___.`;
  const correct = forms[p];
  const others = [...new Set([...vForms(v, 'pres'), ...vForms(v, 'past')])].filter(f => f !== correct);
  const o = [correct, ...shuffle(others).slice(0, 3)];
  const table = vForms(v, tense).map((f, i) => `${PRON[i][0]} ${tense === 'fut' ? 'ще ' : ''}${refl}${f}`).join(', ');
  return {t:'gram', it:{kind:'g', lv:null, i:0, ref:`v:${vi}:${tense}:${p}`, g:{s, o, pl:`${TENSE_PL[tense]} · ${plp} · ${v[0]} (${v[1]})`, why:`Odmiana: <span lang="bg">${esc(table)}</span>.${v[4] ? ' ' + esc(v[4]) : ''}`}}};
}
function verbItems(n) {
  const all = VERBS.flatMap((v, vi) => verbTenses(v).flatMap(t => [0,1,2,3,4,5].map(p => ({vi, t, p}))));
  const sorted = shuffle(all).sort((a, b) => (S.mistakes[`v:${b.vi}:${b.t}:${b.p}`] || 0) - (S.mistakes[`v:${a.vi}:${a.t}:${a.p}`] || 0));
  const out = [], usedV = new Set();
  for (const x of sorted) { if (usedV.has(x.vi) && usedV.size < VERBS.length) continue; usedV.add(x.vi); out.push(verbItem(x.vi, x.t, x.p)); if (out.length >= n) break; }
  return out;
}
function verbsCheat() {
  return `<article class="card gcard"><h3>Odmiana czasowników (${VERBS.length})</h3><p class="muted" style="margin-top:0">Kliknij czasownik, żeby zobaczyć odmianę. Czas przyszły: <span lang="bg">ще</span> + forma teraźniejsza (<span lang="bg">ще летя, ще летиш…</span>).</p>
    <div class="verbs">${VERBS.map(v => `<details class="vb"><summary><b lang="bg">${esc(v[1])}</b> <span class="muted">${esc(v[0])}</span></summary><div class="tblwrap"><table class="mini"><tr><td></td><td><b>${v[5] ? 'po да / ще' : 'teraz'}</b></td><td><b>wczoraj (aoryst)</b></td></tr>${PRON.map(([bg, pl], i) => `<tr><td>${pl}</td><td lang="bg">${bg} ${v[5] ? 'ще ' : ''}${v[6] ? 'се ' : ''}${esc(vForms(v, 'pres')[i])}</td><td lang="bg">${bg} ${v[6] ? 'се ' : ''}${esc(vForms(v, 'past')[i])}</td></tr>`).join('')}</table></div>${v[4] ? `<p class="muted" style="margin:4px 0 0;font-size:14px">${esc(v[4])}</p>` : ''}</details>`).join('')}</div></article>`;
}
function grammarItems(kind) {
  if (kind === 'verbs') return verbItems(12);
  const lv = reachedLevels();
  if (kind === 'order') {
    const pool = byMistakes([...lv.flatMap(l => l.s.map((_, i) => SN(l, i))), ...PHRASES.map((c, ci) => catUnlocked(c.n) ? LV['ph' + ci].s.map((_, i) => SN(LV['ph' + ci], i)) : []).flat()]);
    return take(pool, 10).map(it => ({t:'order', it}));
  }
  if (kind === 'gender') return take(byMistakes(reachedNouns().map(NI)), 10).map(it => ({t:'gender', it}));
  if (kind === 'article') return take(byMistakes(reachedNouns().map(NI)), 10).map(it => ({t:'article', it}));
  return take(byMistakes(lv.flatMap(l => l.g.map((_, i) => GR(l, i)))), 10).map(it => ({t:'gram', it}));
}
const GTITLE = {verbs:'Odmiana czasowników', order:'Ułóż zdanie', gender:'Rodzaj: męski, żeński, nijaki', article:'Rodzajnik: -ът / -та / -то', gram:'Gramatyka z leveli'};
function viewGrammar() {
  const lv = reachedLevels();
  const nS = lv.reduce((a, l) => a + l.s.length, 0) + PHRASES.filter(c => catUnlocked(c.n)).reduce((a, c) => a + LV['ph' + PHRASES.indexOf(c)].s.length, 0);
  const nN = reachedNouns().length, nG = lv.reduce((a, l) => a + l.g.length, 0);
  const card = (k, icon, desc, cnt) => `<button class="gamecard" data-g="${k}"><span class="gicon">${icon}</span><b>${GTITLE[k]}</b><span class="muted">${desc}</span><span class="qcount">z Twoich leveli: ${cnt}</span><span class="btn">Ćwicz</span></button>`;
  $('#view').innerHTML = `<h2 class="view">Gramatyka</h2><p class="muted" style="margin-top:0">Ćwiczenia biorą zdania i słowa z leveli, które masz odblokowane – każdy nowy level dokłada materiał.</p>
   <div class="gamegrid">
    ${card('verbs', '<span class="glyph" lang="bg">аз ти той</span>', 'Teraz, wczoraj i jutro: wybierz dobrą formę czasownika. Po każdym zadaniu widzisz całą odmianę.', VERBS.length + ' czasowników')}
    ${card('order', '<span class="glyph" lang="bg">а б в</span>', 'U góry zdanie po polsku, na dole kafelki po bułgarsku. Ułóż je w dobrej kolejności.', nS + ' zdań')}
    ${card('gender', '<span class="glyph" lang="bg">той тя то</span>', 'Czy słowo jest męskie, żeńskie czy nijakie? Po bułgarsku rodzaj często jest inny niż po polsku.', nN + ' rzeczowników')}
    ${card('article', '<span class="glyph" lang="bg">-ът -та -то</span>', 'Bułgarzy doklejają końcówkę, gdy mówią o czymś konkretnym: самолет → самолетът.', nN + ' rzeczowników')}
    ${card('gram', '<span class="glyph">___</span>', 'Uzupełnianie luk: formy czasowników, przyimki, czas przyszły i przeszły.', nG + ' zadań')}
   </div>
   <h3 class="eyebrow" style="margin:26px 0 8px">Ściąga</h3>
   <div class="stack">${verbsCheat()}${GRAMMAR.map(g => `<article class="card gcard"><h3>${esc(g.t)}</h3><div class="tblwrap">${g.h}</div></article>`).join('')}</div>`;
  $$('[data-g]').forEach(b => b.onclick = () => { const k = b.dataset.g; const go = () => startPractice(null, grammarItems(k), GTITLE[k], go); go(); });
}

/* ===== ZAKŁADKA: GRY I ZABAWY ===== */
let G = null, blitzT = null;
function viewGames() {
  if (blitzT) { clearInterval(blitzT); blitzT = null; }
  $('#view').innerHTML = `<h2 class="view">Gry i zabawy</h2><p class="muted" style="margin-top:0">Na rozluźnienie po lekcjach. Za każdą grę dostajesz trochę XP.</p>
   <div class="gamegrid">
    <button class="gamecard" data-game="songs"><span class="gicon">${'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18a3 3 0 1 1-2-2.8V5l12-2v12a3 3 0 1 1-2-2.8V6.4L9 7.8z"/></svg>'}</span><b>Piosenka z luką</b><span class="muted">Fragment bułgarskiej pieśni lub wiersza z jedną luką. Wybierz brakujące słowo: A, B, C czy D? ${LYRIC_ITEMS.length} zadań.</span><span class="qcount">Rekord: ${S.best.songs2 || 0}/10</span></button>
    <button class="gamecard" data-game="blitz"><span class="gicon">${'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>'}</span><b>Błyskawica 60 s</b><span class="muted">Ile słówek przetłumaczysz w minutę? Słówka z Twoich leveli.</span><span class="qcount">Rekord: ${S.best.blitz || 0}</span></button>
    <button class="gamecard" data-game="memo"><span class="gicon"><span class="glyph" lang="bg">Аа ⇄ Pp</span></span><b>Memory: pary</b><span class="muted">Odkrywaj karty i łącz słówka w pary: polskie z bułgarskim. Im mniej ruchów, tym lepiej.</span><span class="qcount">Rekord: ${S.best.memo ? S.best.memo + ' pkt' : '–'}</span></button>
   </div><div id="gamebox" style="margin-top:18px"></div>`;
  $$('[data-game]').forEach(b => b.onclick = () => { ({songs:startSongs, blitz:startBlitz, memo:startMemo})[b.dataset.game](); setTimeout(() => $('#gamebox').scrollIntoView({behavior:'smooth', block:'start'}), 30); });
}
/* --- Piosenka z luką --- */
const LYRIC_ITEMS = LYRICS.flatMap((l, li) => l.gaps.map(([w, wrong], gi) => ({li, gi, w, wrong})));
const isLetter = ch => !!ch && /[A-Za-zА-Яа-яЁёЀ-ӿ]/.test(ch);
/* każde wystąpienie słowa (bez względu na wielkość liter) zamienia na lukę albo na wyróżnione słowo */
function gapHTML(text, w, fill) {
  const lo = text.toLowerCase(), lw = w.toLowerCase(); let out = '', from = 0, i, n = 0;
  while ((i = lo.indexOf(lw, from)) >= 0) {
    if (isLetter(text[i - 1]) || isLetter(text[i + w.length])) { out += esc(text.slice(from, i + 1)); from = i + 1; continue; }
    out += esc(text.slice(from, i)) + (fill ? `<b class="gap filled">${esc(text.slice(i, i + w.length))}</b>` : '<span class="gap">?</span>'); from = i + w.length; n++;
  }
  return n ? out + esc(text.slice(from)) : null;
}
function startSongs() {
  const used = new Set(), qs = [];
  for (const it of shuffle(LYRIC_ITEMS)) { if (used.has(it.li) && qs.length < LYRICS.length) continue; used.add(it.li); qs.push(it); if (qs.length >= 10) break; }
  G = {type:'songs', qs, i:0, score:0}; drawSong();
}
function drawSong() {
  const box = $('#gamebox'); if (!box) return;
  if (G.i >= G.qs.length) {
    const rec = finishBest('songs2', G.score); addXP(G.score); save(); renderHud();
    box.innerHTML = `<div class="card stack" style="text-align:center"><b style="font-family:var(--f-display);font-size:24px">${G.score} / ${G.qs.length}${rec ? ' · nowy rekord!' : ''}</b><span class="muted">+${G.score} XP · w grze jest ${LYRIC_ITEMS.length} luk z ${LYRICS.length} fragmentów</span><button class="btn" id="gAgain">Następne 10</button></div>`;
    $('#gAgain').onclick = startSongs; return;
  }
  const q = G.qs[G.i], L0 = LYRICS[q.li], opts = shuffle([q.w, ...q.wrong]);
  box.innerHTML = `<div class="card stack lyric"><div class="row" style="justify-content:space-between"><span class="eyebrow">Luka ${G.i + 1}/${G.qs.length}</span><span class="qcount">Wynik: ${G.score}</span></div>
    <div><div class="song-title"><span class="eyebrow">Utwór</span> <b lang="bg">„${esc(L0.song)}”</b></div><div class="muted" style="font-size:14px">${esc(L0.who)}</div></div>
    <div class="lline" lang="bg" id="lyr">„${gapHTML(L0.text, q.w, false)}”</div>
    <b>Jakie słowo pasuje w lukę?</b>
    ${optsHTML(opts, true, true)}<div id="sfb"></div></div>`;
  let answered = false;
  $$('#gamebox .opt').forEach(b => b.onclick = () => {
    if (answered) return; answered = true;
    const ok = b.dataset.v === q.w; if (ok) G.score++;
    $$('#gamebox .opt').forEach(x => { if (x.dataset.v === q.w) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
    $('#lyr').innerHTML = `„${gapHTML(L0.text, q.w, true)}”`;
    $('#sfb').innerHTML = `<div class="${ok ? 'okbox' : 'badbox'}"><b>${ok ? 'Brawo!' : `Brakowało słowa: ${esc(q.w)}`}</b><div class="row" style="gap:10px;flex-wrap:nowrap">${spkBtn(L0.text)}<div><div lang="bg">${esc(L0.text)}</div><div class="tr-line" style="text-align:left">${esc(translit(L0.text))}</div></div></div><div>Tłumaczenie: <i>${esc(L0.tr)}</i></div></div><button class="btn block" id="sNext" style="margin-top:10px">Dalej</button>`;
    $('#sNext').onclick = () => { G.i++; drawSong(); };
    if (audioOK() && S.autoVoice) speak(L0.text);
  });
}
function startBlitz() {
  const pool = shuffle(reachedLevels().flatMap(l => l.w.map((_, i) => W(l, i))));
  G = {type:'blitz', pool, k:0, score:0, end:Date.now() + 60000};
  if (blitzT) clearInterval(blitzT);
  blitzT = setInterval(() => {
    const box = $('#gamebox'); if (!box || G.type !== 'blitz') { clearInterval(blitzT); blitzT = null; return; }
    const left = Math.max(0, G.end - Date.now());
    const bar = $('#bzBar'); if (bar) bar.style.width = `${left / 600}%`;
    const tt = $('#bzT'); if (tt) tt.textContent = Math.ceil(left / 1000) + ' s';
    if (left <= 0) { clearInterval(blitzT); blitzT = null; endBlitz(); }
  }, 200);
  drawBlitz();
}
function drawBlitz() {
  const box = $('#gamebox'); if (!box) return;
  const it = G.pool[G.k % G.pool.length], bg = first(it.w[1]);
  const opts = shuffle([bg, ...distractWords(it, 3, 'bg')]);
  box.innerHTML = `<div class="card stack"><div class="row" style="justify-content:space-between"><span class="eyebrow">Błyskawica</span><span class="mono" id="bzT">60 s</span><span class="qcount">Punkty: ${G.score}</span></div>
    <div class="bar"><i id="bzBar" style="width:${Math.max(0, G.end - Date.now()) / 600}%;background:var(--earth)"></i></div>
    <div class="prompt" style="text-align:center;margin:8px 0">${esc(it.w[0])}</div>${optsHTML(opts, true)}</div>`;
  $$('#gamebox .opt').forEach(b => b.onclick = () => {
    if (G.end <= Date.now()) return;
    const ok = b.dataset.v === bg;
    if (ok) { G.score++; G.k++; drawBlitz(); }
    else { b.classList.add('wrong'); $$('#gamebox .opt').forEach(x => { if (x.dataset.v === bg) x.classList.add('right'); x.disabled = true; }); G.k++; setTimeout(() => { if (G.type === 'blitz' && G.end > Date.now()) drawBlitz(); }, 700); }
  });
}
function endBlitz() {
  const box = $('#gamebox'); if (!box) return;
  const rec = finishBest('blitz', G.score); addXP(Math.min(20, G.score)); save(); renderHud();
  box.innerHTML = `<div class="card stack" style="text-align:center"><span class="eyebrow">Koniec czasu</span><b style="font-family:var(--f-display);font-size:28px">${G.score} słówek${rec ? ' · rekord!' : ''}</b><span class="muted">Najlepszy wynik: ${S.best.blitz || 0}</span><button class="btn" id="gAgain">Jeszcze raz</button></div>`;
  $('#gAgain').onclick = startBlitz;
}
/* --- Memory: pary polskie ↔ bułgarskie --- */
function startMemo() {
  const pool = shuffle(reachedLevels().flatMap(l => l.w.map((_, i) => W(l, i)))), pick6 = [], seenPl = new Set(), seenBg = new Set();
  for (const it of pool) { const pl = it.w[0], bg = first(it.w[1]); if (seenPl.has(pl) || seenBg.has(bg) || bg.length > 18 || pl.length > 22) continue; seenPl.add(pl); seenBg.add(bg); pick6.push({pl, bg}); if (pick6.length >= 6) break; }
  const cards = shuffle(pick6.flatMap((p, k) => [{k, txt:p.pl, bg:false}, {k, txt:p.bg, bg:true}]));
  G = {type:'memo', cards, open:[], done:new Set(), moves:0, lock:false}; drawMemo();
}
function drawMemo() {
  const box = $('#gamebox'); if (!box) return;
  box.innerHTML = `<div class="card stack"><div class="row" style="justify-content:space-between"><span class="eyebrow">Memory · znajdź 6 par</span><span class="qcount">Ruchy: ${G.moves}</span></div>
    <div class="memo">${G.cards.map((c, i) => { const up = G.open.includes(i) || G.done.has(c.k); return `<button class="mc ${up ? 'up' : ''} ${G.done.has(c.k) ? 'got' : ''} ${c.bg ? 'isbg' : ''}" data-i="${i}" ${G.done.has(c.k) ? 'disabled' : ''}>${up ? `<span ${c.bg ? 'lang="bg"' : ''}>${esc(c.txt)}</span>` : '<span class="mc-back" aria-hidden="true"></span>'}</button>`; }).join('')}</div>
    <p class="muted" style="margin:0;font-size:14px">Bułgarskie słowa mają terakotowe obramowanie. Odkryj dwie karty – jeśli to para, zostają odkryte.</p></div>`;
  $$('#gamebox .mc').forEach(b => b.onclick = () => {
    const i = +b.dataset.i, c = G.cards[i];
    if (G.lock || G.open.includes(i) || G.done.has(c.k)) return;
    G.open.push(i); if (c.bg && audioOK() && S.autoVoice) speak(c.txt);
    if (G.open.length === 2) {
      G.moves++; const [a, b2] = G.open.map(x => G.cards[x]);
      if (a.k === b2.k) { G.done.add(a.k); G.open = []; buzz && buzz(30); drawMemo(); if (G.done.size === 6) endMemo(); return; }
      G.lock = true; drawMemo(); setTimeout(() => { G.open = []; G.lock = false; if (G.type === 'memo') drawMemo(); }, 1000); return;
    }
    drawMemo();
  });
}
function endMemo() {
  const pts = Math.max(10, 100 - Math.max(0, G.moves - 6) * 8), rec = finishBest('memo', pts);
  addXP(Math.round(pts / 10)); save(); renderHud();
  $('#gamebox').insertAdjacentHTML('beforeend', `<div class="card stack" style="text-align:center;margin-top:12px"><b style="font-family:var(--f-display);font-size:24px">Wszystkie pary! ${pts} pkt${rec ? ' · rekord!' : ''}</b><span class="muted">${G.moves} ruchów (idealnie: 6) · +${Math.round(pts / 10)} XP</span><button class="btn" id="gAgain">Nowa plansza</button></div>`);
  $('#gAgain').onclick = startMemo;
}

/* ===== START ===== */
route();
initSpeech();
initCloud();
