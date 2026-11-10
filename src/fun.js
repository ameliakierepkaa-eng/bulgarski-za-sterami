
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
function grammarItems(kind) {
  const lv = reachedLevels();
  if (kind === 'order') {
    const pool = byMistakes([...lv.flatMap(l => l.s.map((_, i) => SN(l, i))), ...PHRASES.map((c, ci) => catUnlocked(c.n) ? LV['ph' + ci].s.map((_, i) => SN(LV['ph' + ci], i)) : []).flat()]);
    return take(pool, 10).map(it => ({t:'order', it}));
  }
  if (kind === 'gender') return take(byMistakes(reachedNouns().map(NI)), 10).map(it => ({t:'gender', it}));
  if (kind === 'article') return take(byMistakes(reachedNouns().map(NI)), 10).map(it => ({t:'article', it}));
  return take(byMistakes(lv.flatMap(l => l.g.map((_, i) => GR(l, i)))), 10).map(it => ({t:'gram', it}));
}
const GTITLE = {order:'Ułóż zdanie', gender:'Rodzaj: męski, żeński, nijaki', article:'Rodzajnik: -ът / -та / -то', gram:'Gramatyka z leveli'};
function viewGrammar() {
  const lv = reachedLevels();
  const nS = lv.reduce((a, l) => a + l.s.length, 0) + PHRASES.filter(c => catUnlocked(c.n)).reduce((a, c) => a + LV['ph' + PHRASES.indexOf(c)].s.length, 0);
  const nN = reachedNouns().length, nG = lv.reduce((a, l) => a + l.g.length, 0);
  const card = (k, icon, desc, cnt) => `<button class="gamecard" data-g="${k}"><span class="gicon">${icon}</span><b>${GTITLE[k]}</b><span class="muted">${desc}</span><span class="qcount">z Twoich leveli: ${cnt}</span><span class="btn">Ćwicz</span></button>`;
  $('#view').innerHTML = `<h2 class="view">Gramatyka</h2><p class="muted" style="margin-top:0">Ćwiczenia biorą zdania i słowa z leveli, które masz odblokowane – każdy nowy level dokłada materiał.</p>
   <div class="gamegrid">
    ${card('order', '<span class="glyph" lang="bg">а б в</span>', 'U góry zdanie po polsku, na dole kafelki po bułgarsku. Ułóż je w dobrej kolejności.', nS + ' zdań')}
    ${card('gender', '<span class="glyph" lang="bg">той тя то</span>', 'Czy słowo jest męskie, żeńskie czy nijakie? Po bułgarsku rodzaj często jest inny niż po polsku.', nN + ' rzeczowników')}
    ${card('article', '<span class="glyph" lang="bg">-ът -та -то</span>', 'Bułgarzy doklejają końcówkę, gdy mówią o czymś konkretnym: самолет → самолетът.', nN + ' rzeczowników')}
    ${card('gram', '<span class="glyph">___</span>', 'Uzupełnianie luk: formy czasowników, przyimki, czas przyszły i przeszły.', nG + ' zadań')}
   </div>
   <h3 class="eyebrow" style="margin:26px 0 8px">Ściąga</h3>
   <div class="stack">${GRAMMAR.map(g => `<article class="card gcard"><h3>${esc(g.t)}</h3><div class="tblwrap">${g.h}</div></article>`).join('')}</div>`;
  $$('[data-g]').forEach(b => b.onclick = () => { const k = b.dataset.g; const go = () => startPractice(null, grammarItems(k), GTITLE[k], go); go(); });
}

/* ===== ZAKŁADKA: GRY I ZABAWY ===== */
let G = null, blitzT = null;
function viewGames() {
  if (blitzT) { clearInterval(blitzT); blitzT = null; }
  $('#view').innerHTML = `<h2 class="view">Gry i zabawy</h2><p class="muted" style="margin-top:0">Na rozluźnienie po lekcjach. Za każdą grę dostajesz trochę XP.</p>
   <div class="gamegrid">
    <button class="gamecard" data-game="songs"><span class="gicon">${'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18a3 3 0 1 1-2-2.8V5l12-2v12a3 3 0 1 1-2-2.8V6.4L9 7.8z"/></svg>'}</span><b>Jaka to piosenka?</b><span class="muted">Słynne bułgarskie piosenki i wiersze: zgadnij tytuł lub wykonawcę, poznaj tłumaczenie.</span><span class="qcount">Rekord: ${S.best.songs || 0}/8</span></button>
    <button class="gamecard" data-game="blitz"><span class="gicon">${'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>'}</span><b>Błyskawica 60 s</b><span class="muted">Ile słówek przetłumaczysz w minutę? Słówka z Twoich leveli.</span><span class="qcount">Rekord: ${S.best.blitz || 0}</span></button>
    <button class="gamecard" data-game="ff"><span class="gicon"><span class="glyph" lang="bg">?!</span></span><b>Fałszywi przyjaciele</b><span class="muted">Prawda czy fałsz? Słowa, które brzmią po polsku, a znaczą coś zupełnie innego.</span><span class="qcount">Rekord: ${S.best.ff || 0}/10</span></button>
   </div><div id="gamebox" style="margin-top:18px"></div>`;
  $$('[data-game]').forEach(b => b.onclick = () => { ({songs:startSongs, blitz:startBlitz, ff:startFF})[b.dataset.game](); setTimeout(() => $('#gamebox').scrollIntoView({behavior:'smooth', block:'start'}), 30); });
}
function startSongs() {
  const qs = shuffle([...shuffle(SONGS).slice(0, 5).map(x => ({...x, kind:'song'})), ...shuffle(TRIVIA).slice(0, 3).map(x => ({...x, kind:'trivia'}))]);
  G = {type:'songs', qs, i:0, score:0}; drawSong();
}
function drawSong() {
  const box = $('#gamebox'); if (!box) return;
  if (G.i >= G.qs.length) {
    const rec = finishBest('songs', G.score); addXP(G.score); save(); renderHud();
    box.innerHTML = `<div class="card stack" style="text-align:center"><b style="font-family:var(--f-display);font-size:22px">${G.score} / ${G.qs.length}${rec ? ' · nowy rekord!' : ''}</b><span class="muted">+${G.score} XP</span><button class="btn" id="gAgain">Zagraj jeszcze raz</button></div>`;
    $('#gAgain').onclick = startSongs; return;
  }
  const q = G.qs[G.i], correct = q.o[0], opts = shuffle(q.o);
  box.innerHTML = `<div class="card stack lyric"><div class="row" style="justify-content:space-between"><span class="eyebrow">${q.kind === 'song' ? 'Cytat' : 'Pytanie'} ${G.i + 1}/${G.qs.length}</span><span class="qcount">Wynik: ${G.score}</span></div>
    ${q.kind === 'song' ? `<div class="row" style="gap:12px">${spkBtn(q.line)}<div style="flex:1;min-width:0"><div class="lline" lang="bg">„${esc(q.line)}”</div><div class="tr-line" style="text-align:left">${esc(translit(q.line))}</div></div></div><b>${esc(q.q || 'Z jakiego utworu pochodzi ten tekst?')}</b>` : `<b style="font-size:18px">${esc(q.q)}</b>`}
    ${optsHTML(opts, /[а-я]/i.test(correct))}<div id="sfb"></div></div>`;
  let answered = false;
  $$('#gamebox .opt').forEach(b => b.onclick = () => {
    if (answered) return; answered = true;
    const ok = b.dataset.v === correct; if (ok) G.score++;
    $$('#gamebox .opt').forEach(x => { if (x.dataset.v === correct) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
    $('#sfb').innerHTML = `<div class="${ok ? 'okbox' : 'badbox'}"><b>${ok ? 'Brawo!' : `To: ${esc(correct)}`}</b>${q.kind === 'song' ? `<div>Tłumaczenie: <i>${esc(q.tr)}</i></div><div class="muted">${esc(q.who)}</div>` : ''}<div>${esc(q.fact)}</div></div><button class="btn block" id="sNext" style="margin-top:10px">Dalej</button>`;
    $('#sNext').onclick = () => { G.i++; drawSong(); };
    if (q.kind === 'song' && audioOK() && S.autoVoice) speak(q.line);
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
function startFF() {
  const qs = shuffle(FRIENDS).slice(0, 10).map(([bg, look, real]) => {
    const isFalse = look !== real, claimLook = isFalse && Math.random() < 0.6;
    return {bg, real, claim: claimLook ? look : real, truth: !claimLook, isFalse};
  });
  G = {type:'ff', qs, i:0, score:0}; drawFF();
}
function drawFF() {
  const box = $('#gamebox'); if (!box) return;
  if (G.i >= G.qs.length) {
    const rec = finishBest('ff', G.score); addXP(G.score); save(); renderHud();
    box.innerHTML = `<div class="card stack" style="text-align:center"><b style="font-family:var(--f-display);font-size:22px">${G.score} / 10${rec ? ' · rekord!' : ''}</b><span class="muted">Pełna lista pułapek jest w zakładce Gramatyka → Fałszywi przyjaciele.</span><button class="btn" id="gAgain">Jeszcze raz</button></div>`;
    $('#gAgain').onclick = startFF; return;
  }
  const q = G.qs[G.i];
  box.innerHTML = `<div class="card stack" style="text-align:center"><div class="row" style="justify-content:space-between"><span class="eyebrow">${G.i + 1}/10</span><span class="qcount">Wynik: ${G.score}</span></div>
    <div class="prompt">Bułgarskie <span lang="bg">${esc(q.bg)}</span> znaczy „${esc(q.claim)}”.</div>
    <div class="foot-btns"><button class="btn ok" data-a="1">Prawda</button><button class="btn bad" data-a="0">Fałsz</button></div><div id="ffb"></div></div>`;
  let done = false;
  $$('#gamebox [data-a]').forEach(b => b.onclick = () => {
    if (done) return; done = true;
    const ok = (b.dataset.a === '1') === q.truth; if (ok) G.score++;
    $('#ffb').innerHTML = `<div class="${ok ? 'okbox' : 'badbox'}"><b>${ok ? 'Dobrze!' : 'Pudło!'}</b> <span lang="bg">${esc(q.bg)}</span> = ${esc(q.real)}.${q.isFalse ? ' Uważaj na to słowo!' : ' Tu polski i bułgarski są zgodne.'}</div>${spkBtn(q.bg)}<button class="btn block" id="fNext" style="margin-top:10px">Dalej</button>`;
    $('#fNext').onclick = () => { G.i++; drawFF(); };
    if (audioOK() && S.autoVoice) speak(q.bg);
  });
}

/* ===== START ===== */
route();
initSpeech();
initCloud();
