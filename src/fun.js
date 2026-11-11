
/* ===== TREŚCI DOPASOWANE DO POSTĘPU ===== */
const reachedLevels = () => { const r = LEVELS.filter(l => isOpen(l)); return r.length ? r : [LEVELS[0]]; };
const reachedNouns = () => { const ids = new Set(reachedLevels().map(l => l.id)); let idx = NOUNS.map((n, i) => ids.has(n[4]) ? i : -1).filter(i => i >= 0); if (idx.length < 8) idx = [...new Set([...idx, ...NOUNS.map((_, i) => i).slice(0, 10)])]; return idx; };
const catUnlocked = name => name === 'Podstawy' || (PH_UNLOCK[name] && LV[PH_UNLOCK[name]] && isOpen(LV[PH_UNLOCK[name]]));
function myPhrases(filter = 'all') {
  const out = [];
  if (filter === 'all' || filter !== 'lv') PHRASES.forEach((c, ci) => { if (!catUnlocked(c.n) || (filter !== 'all' && filter !== c.n)) return; const lv = LV['ph' + ci]; lv.s.forEach((x, i) => out.push({pl:x[0], bg:x[1], lv, i, src:c.n})); });
  if (filter === 'all' || filter === 'lv') reachedLevels().forEach(lv => lv.s.forEach((x, i) => out.push({pl:x[0], bg:x[1], lv, i, src:lv.t})));
  if (filter === 'all' || filter === 'my') (S.my || []).forEach((x, i) => out.push({pl:x.pl, bg:x.bg, lv:null, i, src:'Mój słowniczek'}));
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
  if (phFilter !== 'all' && phFilter !== 'lv' && phFilter !== 'my' && !cats.includes(phFilter)) phFilter = 'all';
  if (phMode !== 'dialogi') DG = null;
  const n = myPhrases(phFilter).length;
  $('#view').innerHTML = `<h2 class="view">Zwroty</h2><p class="muted" style="margin-top:0">Twoja talia rośnie z każdym levelem: nowe kategorie zwrotów i zdania z odblokowanych lekcji. Teraz masz ${myPhrases().length} zwrotów.</p>
   <div class="seg modes" role="group" aria-label="Tryb">${[['fiszki','Fiszki'],['dopasuj','Dopasuj pary'],['dialogi','Dialogi'],['lista','Lista'],['tlumacz','Tłumacz'],['moje','Mój słowniczek ★']].map(([k, t]) => `<button data-m="${k}" aria-pressed="${phMode === k}">${t}</button>`).join('')}</div>
   ${phMode === 'fiszki' || phMode === 'dopasuj' ? `<div class="chips" style="margin:12px 0">${[['all','Wszystkie moje'], ['lv','Z leveli'], ...((S.my || []).length ? [['my','Mój słowniczek']] : []), ...cats.map(c => [c, c])].map(([k, t]) => `<button class="chip" data-f="${esc(k)}" aria-pressed="${phFilter === k}">${esc(t)}</button>`).join('')}</div>` : ''}
   <div id="phbox"></div>`;
  $$('[data-m]').forEach(b => b.onclick = () => { phMode = b.dataset.m; viewPhrases(); });
  $$('[data-f]').forEach(b => b.onclick = () => { phFilter = b.dataset.f; FC = null; MG = null; viewPhrases(); });
  if (phMode === 'fiszki') drawFlash(); else if (phMode === 'dopasuj') drawMatchGame(); else if (phMode === 'tlumacz') drawTranslator(); else if (phMode === 'dialogi') drawDialogs(); else if (phMode === 'moje') drawMy(); else drawPhraseList();
}
/* ===== TŁUMACZ (maszynowy, przez internet – serwis MyMemory) ===== */
let trDir = 'pl|bg', trText = '';
async function translateText(text, pair) {
  const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(pair)}`);
  if (!r.ok) throw new Error('net');
  const j = await r.json(), out = j && j.responseData && j.responseData.translatedText;
  if (!out || +j.responseStatus !== 200 || /MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(out)) throw new Error(/WARNING/i.test(out || '') ? 'limit' : 'api');
  const ta = document.createElement('textarea'); ta.innerHTML = out; return ta.value.replace(/(^|\s)(най|по|Най|По) - /g, '$1$2-');
}
function drawTranslator() {
  const toBg = trDir === 'pl|bg', hist = (S.tr || []).slice(0, 12);
  const gt = () => `https://translate.google.com/?sl=${toBg ? 'pl' : 'bg'}&tl=${toBg ? 'bg' : 'pl'}&op=translate`;
  $('#phbox').innerHTML = `<section class="card stack" style="margin-top:12px">
    <div class="row" style="justify-content:space-between"><b style="font-family:var(--f-display);font-size:20px">${toBg ? 'polski → български' : 'български → polski'}</b><button class="chip" id="trSwap">Zamień kierunek ⇄</button></div>
    <textarea class="answer" id="trIn" rows="3" maxlength="300" ${toBg ? '' : 'lang="bg"'} placeholder="${toBg ? 'Wpisz zdanie po polsku…' : 'Напиши изречение на български…'}">${esc(trText)}</textarea>
    <div class="row"><button class="btn" id="trGo">Przetłumacz</button><a class="btn ghost" href="${gt()}" target="_blank" rel="noopener">Tłumacz Google ↗</a></div>
    <div id="trOut" aria-live="polite"></div>
    <p class="muted" style="margin:0;font-size:13px">Tłumaczenie maszynowe – potrzebny internet, do 300 znaków. Wpisany tekst jest wysyłany do darmowego serwisu MyMemory, więc nie wpisuj tu danych osobistych. Zdarzają się błędy; zwroty z lekcji są sprawdzone.</p></section>
    ${hist.length ? `<div class="eyebrow" style="margin:18px 0 8px">Ostatnie tłumaczenia</div><div class="plist">${hist.map((h, i) => `<div class="prow"><div class="txt"><div class="bg" lang="bg">${esc(h.bg)}</div><div class="tr">${esc(translit(h.bg))}</div><div class="pl">${esc(h.pl)}</div></div>${spkBtn(h.bg)}<button class="xbtn" data-trdel="${i}" aria-label="Usuń">${ICON.x}</button></div>`).join('')}</div>` : ''}`;
  const inp = $('#trIn'); inp.oninput = () => { trText = inp.value; };
  $('#trSwap').onclick = () => { trDir = toBg ? 'bg|pl' : 'pl|bg'; trText = ''; drawTranslator(); };
  $$('[data-trdel]').forEach(b => b.onclick = () => { S.tr.splice(+b.dataset.trdel, 1); save(); drawTranslator(); });
  const go = async () => {
    const text = inp.value.trim(), out = $('#trOut'); if (!text) { inp.focus(); return; }
    if (!navigator.onLine) { out.innerHTML = '<div class="badbox"><b>Brak internetu</b><span>Tłumacz działa tylko online.</span></div>'; return; }
    $('#trGo').disabled = true; out.innerHTML = '<span class="muted">Tłumaczę…</span>';
    try {
      const res = await translateText(text, trDir), bg = toBg ? res : text, pl = toBg ? text : res;
      out.innerHTML = `<div class="okbox"><div class="row" style="gap:10px;flex-wrap:nowrap;align-items:flex-start">${toBg ? spkBtn(bg) : ''}<div style="flex:1;min-width:0"><div class="lline" ${toBg ? 'lang="bg"' : ''}>${esc(res)}</div>${toBg ? `<div class="tr-line" style="text-align:left">${esc(translit(res))}</div>` : ''}</div></div>
        <div class="row" style="margin-top:6px"><button class="btn soft" id="trCopy" style="min-height:38px;padding:6px 16px">Kopiuj</button><button class="btn soft" data-addmy="${esc(JSON.stringify([pl, bg]))}" style="min-height:38px;padding:6px 16px">★ Do słowniczka</button></div></div>`;
      $('#trCopy').onclick = async () => { try { await navigator.clipboard.writeText(res); toast('Skopiowano.'); } catch (e) { toast('Nie udało się skopiować.'); } };
      S.tr = [{pl, bg}, ...(S.tr || []).filter(h => h.pl !== pl)].slice(0, 12); save();
      if (toBg && audioOK() && S.autoVoice) speak(bg);
    } catch (e) {
      out.innerHTML = `<div class="badbox"><b>${e.message === 'limit' ? 'Dzienny limit darmowego tłumacza został wyczerpany' : 'Nie udało się przetłumaczyć'}</b><span>Spróbuj później albo użyj przycisku „Tłumacz Google”.</span></div>`;
    }
    const b = $('#trGo'); if (b) b.disabled = false;
  };
  $('#trGo').onclick = go;
  inp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); go(); } };
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
    ${[['clouds','☁','Lot przez chmury','Wiatrakowiec leci, a Ty łapiesz chmurę z dobrym tłumaczeniem, zanim odleci. Trzy pomyłki kończą lot.', S.best.clouds || 0],
       ['hang','_ а _','Wisielec','Zgaduj bułgarskie słowo litera po literze, zanim skończy się paliwo. Dobre na pisownię.', (S.best.hang || 0) + '/5'],
       ['scr','б а в','Rozsypanka','Ułóż słowo z pomieszanych liter.', (S.best.scr || 0) + '/8'],
       ['dict','🔊','Dyktando 90 s','Lektor mówi słowo, Ty je wpisujesz. Ile zdążysz w półtorej minuty?', S.best.dict || 0],
       ['tower','✈','Wieża kontroli','Słyszysz komendę przez radio. Co ma zrobić pilotka?', (S.best.tower || 0) + '/10'],
       ['tf','✓ ✗','Prawda czy fałsz','Słowo i tłumaczenie – masz 4 sekundy, żeby zdecydować, czy się zgadza.', (S.best.tf || 0) + '/15'],
       ['listen','👂','Słuchanie ze zrozumieniem','Krótki tekst czytany przez lektora – prognoza, ogłoszenie, komunikat dla pilotów – i trzy pytania.', (S.best.listen || 0) + '/3']
      ].map(([k, ic, t, d, rec]) => `<button class="gamecard" data-game="${k}"><span class="gicon"><span class="glyph" lang="bg">${ic}</span></span><b>${t}</b><span class="muted">${d}</span><span class="qcount">Rekord: ${rec}</span></button>`).join('')}
   </div><div id="gamebox" style="margin-top:18px"></div>`;
  gStop();
  $$('[data-game]').forEach(b => b.onclick = () => { if (blitzT) { clearInterval(blitzT); blitzT = null; } gStop();
    ({songs:startSongs, blitz:startBlitz, memo:startMemo, clouds:startClouds, hang:startHang, scr:startScr, dict:startDict, tower:startTower, tf:startTF, listen:startListen})[b.dataset.game]();
    setTimeout(() => $('#gamebox').scrollIntoView({behavior:'smooth', block:'start'}), 30); });
}
/* ===== SZEŚĆ DODATKOWYCH GIER ===== */
let gT = null;
function gStop() { if (gT) { clearTimeout(gT); clearInterval(gT); gT = null; } }
const gAlive = type => !!$('#gamebox') && G && G.type === type;
const gWords = () => shuffle(reachedLevels().flatMap(l => l.w.map((_, i) => W(l, i))));
const oneWord = it => { const b = first(it.w[1]).toLowerCase(); return /^[а-я]{4,9}$/.test(b) && !/[ыэё]/.test(b) ? b : null; };
const gOneWords = n => { const seen = new Set(), out = []; for (const it of gWords()) { const w = oneWord(it); if (!w || seen.has(w)) continue; seen.add(w); out.push({it, w}); if (out.length >= n) break; } return out; };
const gHead = (t, right) => `<div class="row" style="justify-content:space-between"><span class="eyebrow">${t}</span><span class="qcount">${right}</span></div>`;
function gEnd(key, score, line, again, xp) {
  gStop(); const rec = finishBest(key, score); addXP(xp == null ? Math.min(20, score) : xp); save(); renderHud();
  $('#gamebox').innerHTML = `<div class="card stack" style="text-align:center"><span class="eyebrow">Koniec gry</span><b style="font-family:var(--f-display);font-size:26px">${esc(line)}${rec ? ' · rekord!' : ''}</b><span class="muted">Najlepszy wynik: ${S.best[key] || 0}</span><button class="btn" id="gAgain">Jeszcze raz</button></div>`;
  $('#gAgain').onclick = again; if (rec && score > 0) confetti();
}
const gKb = (used, word) => `<div class="kb" id="gkb" aria-label="Klawiatura bułgarska">${KB.map((r, i) => `<div class="krow">${r.split(' ').map(k => `<button type="button" data-k="${k}" ${used && used.has(k) ? `disabled class="${word.includes(k) ? 'hit' : 'nohit'}"` : ''}>${k}</button>`).join('')}${!used && i === 2 ? '<button type="button" class="wide" data-k="⌫" aria-label="Usuń">⌫</button>' : ''}</div>`).join('')}</div>`;

/* --- 1. Lot przez chmury --- */
function startClouds() { gStop(); G = {type:'clouds', pool:gWords(), k:0, score:0, lives:3}; drawClouds(); }
function drawClouds() {
  const box = $('#gamebox'); if (!box) return; gStop();
  if (G.lives <= 0) return gEnd('clouds', G.score, `${G.score} chmur`, startClouds);
  const it = G.pool[G.k % G.pool.length], bg = first(it.w[1]);
  const opts = shuffle([bg, ...distractWords(it, 2, 'bg')]), secs = Math.max(3.5, 8 - G.score * 0.25);
  box.innerHTML = `<div class="card stack">${gHead('Lot przez chmury', `${'♥'.repeat(G.lives)}${'♡'.repeat(3 - G.lives)} · Punkty: ${G.score}`)}
    <div class="prompt" style="text-align:center;margin:0">${esc(it.w[0])}</div>
    <div class="skyfly"><div class="skyhero">${heroSVG()}</div>${opts.map((o, i) => `<button class="cloudbtn" lang="bg" data-v="${esc(o)}" style="top:${[10, 39, 68][i]}%;animation-duration:${secs}s;animation-delay:${(i * 0.3).toFixed(1)}s">${esc(o)}</button>`).join('')}</div>
    <p class="muted" style="margin:0;font-size:14px">Dotknij chmury z dobrym tłumaczeniem, zanim odleci.</p></div>`;
  let done = false;
  const next = ok => {
    if (done) return; done = true; gStop(); if (ok) G.score++; else G.lives--; G.k++;
    $$('#gamebox .cloudbtn').forEach(x => { x.style.animationPlayState = 'paused'; if (x.dataset.v === bg) x.classList.add('right'); });
    gT = setTimeout(() => { if (gAlive('clouds')) drawClouds(); }, ok ? 450 : 1200);
  };
  $$('#gamebox .cloudbtn').forEach(b => b.onclick = () => { if (done) return; const ok = b.dataset.v === bg; if (!ok) b.classList.add('wrong'); buzz(ok ? 15 : [40, 60, 40]); next(ok); });
  gT = setTimeout(() => { if (gAlive('clouds')) next(false); }, (secs + 0.8) * 1000);
}

/* --- 2. Wisielec (paliwo zamiast szubienicy) --- */
function startHang() { gStop(); G = {type:'hang', words:gOneWords(5), i:0, score:0, used:new Set(), miss:0}; drawHang(); }
function drawHang() {
  const box = $('#gamebox'); if (!box) return;
  if (G.i >= G.words.length) return gEnd('hang', G.score, `${G.score} / ${G.words.length} słów`, startHang, G.score * 3);
  const {it, w} = G.words[G.i], letters = [...w];
  const won = letters.every(ch => G.used.has(ch)), over = won || G.miss >= 6;
  box.innerHTML = `<div class="card stack">${gHead(`Wisielec · słowo ${G.i + 1}/${G.words.length}`, `Paliwo: ${'●'.repeat(6 - G.miss)}${'○'.repeat(G.miss)}`)}
    <div class="muted" style="text-align:center">Po polsku: <b>${esc(it.w[0])}</b></div>
    <div class="hangword" lang="bg">${letters.map(ch => `<span class="${over && !G.used.has(ch) ? 'miss' : ''}">${G.used.has(ch) || over ? esc(ch) : ''}</span>`).join('')}</div>
    ${over ? `<div class="${won ? 'okbox' : 'badbox'}"><b>${won ? 'Brawo!' : 'Zabrakło paliwa'}</b><div class="row" style="gap:10px;flex-wrap:nowrap">${spkBtn(w)}<span><b lang="bg">${esc(w)}</b> · ${esc(translit(w))} · ${esc(it.w[0])}</span></div></div><button class="btn block" id="hNext">Dalej</button>` : gKb(G.used, w)}</div>`;
  if (over) { $('#hNext').onclick = () => { G.i++; G.used = new Set(); G.miss = 0; drawHang(); }; return; }
  $('#gkb').onclick = e => {
    const b = e.target.closest('[data-k]'); if (!b || b.disabled) return; const k = b.dataset.k; G.used.add(k);
    if (!w.includes(k)) { G.miss++; buzz(40); }
    else if (letters.every(ch => G.used.has(ch))) { G.score++; buzz(15); if (audioOK() && S.autoVoice) speak(w); }
    drawHang();
  };
}

/* --- 3. Rozsypanka --- */
function startScr() { gStop(); G = {type:'scr', words:gOneWords(8), i:0, score:0}; newScr(); }
function newScr() {
  if (G.i >= G.words.length) return gEnd('scr', G.score, `${G.score} / ${G.words.length} słów`, startScr, G.score * 2);
  const w = G.words[G.i].w; let sh = shuffle([...w]); if (sh.join('') === w) sh = sh.reverse();
  G.bank = sh.map((ch, id) => ({ch, id})); G.pick = []; G.hint = false; G.solved = false; drawScr();
}
function drawScr() {
  const box = $('#gamebox'); if (!box) return; const {it, w} = G.words[G.i];
  box.innerHTML = `<div class="card stack">${gHead(`Rozsypanka · ${G.i + 1}/${G.words.length}`, `Punkty: ${G.score}`)}
    <div class="muted" style="text-align:center">Po polsku: <b>${esc(it.w[0])}</b>${G.hint ? ` · podpowiedź: <span class="mono">${esc(translit(w))}</span>` : ''}</div>
    <div class="tiles" id="scrPick" lang="bg" style="justify-content:center">${G.pick.map(id => `<button class="tile" data-un="${id}">${esc(G.bank[id].ch)}</button>`).join('')}</div>
    <div class="tiles bank" lang="bg" style="justify-content:center">${G.bank.map(t => `<button class="tile ${G.pick.includes(t.id) ? 'used' : ''}" data-pk="${t.id}">${esc(t.ch)}</button>`).join('')}</div>
    ${G.solved ? `<div class="okbox"><b>Brawo!</b><div class="row" style="gap:10px;flex-wrap:nowrap">${spkBtn(w)}<span><b lang="bg">${esc(w)}</b> · ${esc(translit(w))}</span></div></div><button class="btn block" id="scNext">Dalej</button>`
      : `<div class="row"><button class="btn soft" id="scHint" ${G.hint ? 'disabled' : ''}>Podpowiedź</button><button class="btn ghost" id="scSkip">Pomiń</button></div>`}</div>`;
  if (G.solved) { $('#scNext').onclick = () => { G.i++; newScr(); }; return; }
  $$('#gamebox [data-pk]').forEach(b => b.onclick = () => {
    G.pick.push(+b.dataset.pk);
    if (G.pick.length === G.bank.length) {
      if (G.pick.map(id => G.bank[id].ch).join('') === w) { G.solved = true; if (!G.hint) G.score++; buzz(15); if (audioOK() && S.autoVoice) speak(w); }
      else { buzz([40, 60, 40]); toast('Jeszcze nie – spróbuj inaczej.'); G.pick = []; }
    }
    drawScr();
  });
  $$('#gamebox [data-un]').forEach(b => b.onclick = () => { G.pick = G.pick.filter(id => id !== +b.dataset.un); drawScr(); });
  $('#scHint').onclick = () => { G.hint = true; drawScr(); };
  $('#scSkip').onclick = () => { toast(`To było: ${w}`); G.i++; newScr(); };
}

/* --- 4. Dyktando na czas --- */
function gTyping(inp) {
  inp.addEventListener('input', e => {
    if (!S.translit || e.inputType !== 'insertText' || !e.data || e.data.length !== 1) return;
    const lo = e.data.toLowerCase(), rep = LAT[lo]; if (!rep) return;
    const pos = inp.selectionStart, before = inp.value.slice(0, pos - 1), after = inp.value.slice(pos), key = before.slice(-1).toLowerCase() + lo;
    const nb = DI[key] ? before.slice(0, -1) + DI[key] : before + rep;
    inp.value = nb + after; inp.setSelectionRange(nb.length, nb.length);
  });
}
function startDict() {
  gStop(); const box = $('#gamebox');
  if (!audioOK()) { G = {type:'none'}; box.innerHTML = `<div class="card stack"><b>Ta gra potrzebuje lektora</b><span class="muted">Telefon nie ma jeszcze bułgarskiego głosu.</span><a class="btn soft" href="#pomoc">Zobacz, jak włączyć głos</a></div>`; return; }
  G = {type:'dict', words:gOneWords(60), k:0, score:0, end:Date.now() + 90000};
  gT = setInterval(() => {
    if (!gAlive('dict')) { gStop(); return; }
    const left = Math.max(0, G.end - Date.now()), bar = $('#dcBar'), tt = $('#dcT');
    if (bar) bar.style.width = `${left / 900}%`; if (tt) tt.textContent = Math.ceil(left / 1000) + ' s';
    if (left <= 0) gEnd('dict', G.score, `${G.score} słów`, startDict);
  }, 250);
  drawDict();
}
function drawDict() {
  const box = $('#gamebox'); if (!box) return; const {it, w} = G.words[G.k % G.words.length];
  box.innerHTML = `<div class="card stack">${gHead('Dyktando', `<span id="dcT">${Math.ceil(Math.max(0, G.end - Date.now()) / 1000)} s</span> · Punkty: ${G.score}`)}
    <div class="bar"><i id="dcBar" style="width:${Math.max(0, G.end - Date.now()) / 900}%"></i></div>
    <div style="text-align:center">${spkBtn(w, 'big')}<div class="muted" style="font-size:14px;margin-top:4px">Posłuchaj i wpisz słowo. Dotknij głośnika, żeby usłyszeć jeszcze raz.</div></div>
    <input class="answer" id="gin" lang="bg" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Wpisz po bułgarsku" aria-label="Twoja odpowiedź">
    ${gKb(null, '')}
    <div class="row"><button class="btn" id="dcOk">Sprawdź</button><button class="btn ghost" id="dcSkip">Pomiń</button></div></div>`;
  const inp = $('#gin'); gTyping(inp);
  $('#gkb').onclick = e => { const b = e.target.closest('[data-k]'); if (!b) return; inp.value = b.dataset.k === '⌫' ? inp.value.slice(0, -1) : inp.value + b.dataset.k; };
  const check = () => {
    if (norm(inp.value) === w) { G.score++; G.k++; buzz(15); drawDict(); }
    else { buzz([40, 60, 40]); inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); speak(w, true); }
  };
  $('#dcOk').onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); check(); } };
  $('#dcSkip').onclick = () => { toast(`To było: ${w} (${it.w[0]})`); G.k++; drawDict(); };
  speak(w);
}

/* --- 5. Wieża kontroli --- */
function startTower() { gStop(); G = {type:'tower', qs:shuffle(TOWER).slice(0, 10), i:0, score:0}; drawTower(); }
function drawTower() {
  const box = $('#gamebox'); if (!box) return;
  if (G.i >= G.qs.length) return gEnd('tower', G.score, `${G.score} / ${G.qs.length}`, startTower);
  const q = G.qs[G.i], [bg, pl] = q, hear = audioOK();
  const opts = shuffle([pl, ...shuffle(TOWER.filter(x => x !== q).map(x => x[1])).slice(0, 3)]);
  box.innerHTML = `<div class="card stack">${gHead(`Wieża kontroli · ${G.i + 1}/${G.qs.length}`, `Wynik: ${G.score}`)}
    ${hear ? `<div class="row" style="gap:12px;flex-wrap:nowrap">${spkBtn(bg, 'big')}<div><b>Wieża nadaje…</b><div class="muted" style="font-size:14px">Posłuchaj komendy.</div><button class="chip" id="twShow" style="margin-top:6px">Pokaż tekst</button><div class="lline" id="twTxt" lang="bg" hidden>${esc(bg)}</div></div></div>`
      : `<div class="lline" lang="bg">„${esc(bg)}”</div><div class="tr-line" style="text-align:left">${esc(translit(bg))}</div>`}
    <b>Co masz zrobić?</b>${optsHTML(opts, false, true)}<div id="twFb"></div></div>`;
  const sh = $('#twShow'); if (sh) sh.onclick = () => { $('#twTxt').hidden = false; sh.hidden = true; };
  let done = false;
  $$('#gamebox .opt').forEach(b => b.onclick = () => {
    if (done) return; done = true; const ok = b.dataset.v === pl; if (ok) G.score++; buzz(ok ? 15 : [40, 60, 40]);
    $$('#gamebox .opt').forEach(x => { if (x.dataset.v === pl) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
    $('#twFb').innerHTML = `<div class="${ok ? 'okbox' : 'badbox'}"><b>${ok ? 'Zrozumiałaś!' : 'Nie tym razem'}</b><div lang="bg">${esc(bg)}</div><div class="tr-line" style="text-align:left">${esc(translit(bg))}</div><div>${esc(pl)}</div></div><button class="btn block" id="twNext" style="margin-top:10px">Dalej</button>`;
    $('#twNext').onclick = () => { G.i++; drawTower(); };
  });
  if (hear) speak(bg);
}

/* --- 6. Prawda czy fałsz na czas --- */
function startTF() {
  gStop(); const pool = gWords().slice(0, 15);
  const qs = pool.map(it => { const truth = Math.random() < 0.5; return {bg:first(it.w[1]), real:it.w[0], claim: truth ? it.w[0] : distractWords(it, 1, 'pl')[0], truth}; });
  G = {type:'tf', qs, i:0, score:0}; drawTF();
}
function drawTF() {
  const box = $('#gamebox'); if (!box) return; gStop();
  if (G.i >= G.qs.length) return gEnd('tf', G.score, `${G.score} / ${G.qs.length}`, startTF);
  const q = G.qs[G.i];
  box.innerHTML = `<div class="card stack" style="text-align:center">${gHead(`Prawda czy fałsz · ${G.i + 1}/${G.qs.length}`, `Wynik: ${G.score}`)}
    <div class="bar"><i id="tfBar" style="width:100%;transition:width 4s linear"></i></div>
    <div class="fbg" lang="bg">${esc(q.bg)}</div><div class="prompt" style="margin:0">= ${esc(q.claim)}?</div>
    <div class="foot-btns"><button class="btn ok" data-a="1">Prawda</button><button class="btn bad" data-a="0">Fałsz</button></div><div id="tfFb" style="min-height:26px"></div></div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => { const b = $('#tfBar'); if (b) b.style.width = '0%'; }));
  let done = false;
  const answer = a => {
    if (done) return; done = true; gStop(); const ok = a !== null && a === q.truth; if (ok) G.score++; buzz(ok ? 15 : [40, 60, 40]);
    const b = $('#tfBar'); if (b) { b.style.transition = 'none'; b.style.width = getComputedStyle(b).width; }
    $('#tfFb').innerHTML = `<b style="color:var(--${ok ? 'ok' : 'bad'})">${ok ? 'Dobrze!' : a === null ? 'Za wolno!' : 'Pudło!'}</b> <span lang="bg">${esc(q.bg)}</span> = ${esc(q.real)}`;
    $$('#gamebox [data-a]').forEach(x => x.disabled = true);
    gT = setTimeout(() => { if (gAlive('tf')) { G.i++; drawTF(); } }, ok ? 650 : 1500);
  };
  $$('#gamebox [data-a]').forEach(b => b.onclick = () => answer(b.dataset.a === '1'));
  gT = setTimeout(() => { if (gAlive('tf')) answer(null); }, 4000);
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

/* ===== MÓJ SŁOWNICZEK ===== */
function addMy(pl, bg) {
  pl = String(pl || '').trim(); bg = String(bg || '').trim(); if (!pl || !bg) return false;
  if (!S.my) S.my = [];
  if (S.my.some(x => x.bg === bg && x.pl === pl)) { toast('To już jest w słowniczku.'); return false; }
  S.my.unshift({pl, bg}); save(); toast('Dodano do słowniczka ★'); return true;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-addmy]'); if (!b) return; e.preventDefault();
  let p; try { p = JSON.parse(b.dataset.addmy); } catch (err) { return; }
  if (addMy(p[0], p[1])) b.disabled = true;
});
const starBtn = (pl, bg) => `<button class="starbtn" data-addmy="${esc(JSON.stringify([pl, bg]))}" aria-label="Dodaj do słowniczka" title="Dodaj do słowniczka">★</button>`;
function drawMy() {
  const my = S.my || [];
  $('#phbox').innerHTML = `<section class="card stack" style="margin-top:12px"><div><b style="font-family:var(--f-display);font-size:20px">Mój słowniczek (${my.length})</b>
    <div class="muted" style="font-size:14px">Własne słówka i zdania. Dodajesz je gwiazdką ★ w Tłumaczu, dialogach i czytankach albo ręcznie tutaj.</div></div>
    <input class="search" id="myPl" placeholder="po polsku" aria-label="Po polsku"><input class="search" id="myBg" lang="bg" placeholder="по български" aria-label="Po bułgarsku">
    <div class="row"><button class="btn" id="myAdd">Dodaj</button>${my.length >= 2 ? '<button class="btn soft" id="myFlash">Ćwicz jako fiszki</button>' : ''}</div></section>
    ${my.length ? `<div class="plist" style="margin-top:14px">${my.map((x, i) => `<div class="prow"><div class="txt"><div class="bg" lang="bg">${esc(x.bg)}</div><div class="tr">${esc(translit(x.bg))}</div><div class="pl">${esc(x.pl)}</div></div>${spkBtn(x.bg)}<button class="xbtn" data-mydel="${i}" aria-label="Usuń">${ICON.x}</button></div>`).join('')}</div>` : ''}`;
  $('#myAdd').onclick = () => { if (addMy($('#myPl').value, $('#myBg').value)) drawMy(); else if (!$('#myPl').value.trim() || !$('#myBg').value.trim()) toast('Wpisz słowo po polsku i po bułgarsku.'); };
  const fl = $('#myFlash'); if (fl) fl.onclick = () => { phMode = 'fiszki'; phFilter = 'my'; FC = null; viewPhrases(); };
  $$('[data-mydel]').forEach(b => b.onclick = () => { S.my.splice(+b.dataset.mydel, 1); save(); drawMy(); });
}

/* ===== DIALOGI ===== */
let DG = null;
function drawDialogs() {
  if (DG) return drawDialogStep();
  $('#phbox').innerHTML = `<p class="muted" style="margin:12px 0">Rozmowa krok po kroku. Rozmówcę czyta lektor, a Ty wybierasz swoją kwestię.</p>
    <div class="gamegrid">${DIALOGS.map((d, i) => `<button class="gamecard" data-dlg="${i}"><span class="eyebrow">${d.lv} · <i class="th ${d.track}">${THEME_PL[d.track]}</i></span><b>${esc(d.t)}</b><span class="muted" lang="bg">${esc(d.bt)}</span><span class="qcount">${S.dlg && S.dlg[d.id] ? `Najlepiej: ${S.dlg[d.id]}%` : 'Jeszcze nie grane'}</span></button>`).join('')}</div>`;
  $$('[data-dlg]').forEach(b => b.onclick = () => { const d = DIALOGS[+b.dataset.dlg]; DG = {d, i:0, score:0, miss:false, shown:[], n:d.lines.filter(l => l[0] === 'T').length}; drawDialogStep(); });
}
function drawDialogStep() {
  const d = DG.d, box = $('#phbox'); if (!box) return;
  let said = null;
  while (DG.i < d.lines.length && d.lines[DG.i][0] === 'A') { said = d.lines[DG.i]; DG.shown.push(said); DG.i++; }
  const bubbles = DG.shown.map(([who, bg, pl]) => `<div class="bub ${who === 'T' ? 't' : 'a'}"><div class="row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start">${spkBtn(bg)}<div style="flex:1;min-width:0"><div lang="bg"><b>${esc(bg)}</b></div><div class="pl">${esc(pl)}</div></div>${starBtn(pl, bg)}</div></div>`).join('');
  const head = `<div class="row" style="justify-content:space-between;margin:12px 0 8px"><b style="font-family:var(--f-display);font-size:20px">${esc(d.t)} · <span lang="bg">${esc(d.bt)}</span></b><button class="chip" id="dgBack">← Lista</button></div>`;
  if (DG.i >= d.lines.length) {
    const pc = Math.round(100 * DG.score / DG.n);
    if (!S.dlg) S.dlg = {}; if (pc > (S.dlg[d.id] || 0)) S.dlg[d.id] = pc; addXP(DG.score * 2); save(); renderHud();
    box.innerHTML = `${head}<div class="chat">${bubbles}</div><div class="card stack" style="text-align:center;margin-top:12px"><b style="font-family:var(--f-display);font-size:22px">${DG.score} / ${DG.n} za pierwszym razem</b><span class="muted">+${DG.score * 2} XP. Odsłuchaj rozmowę jeszcze raz głośnikami i powtarzaj na głos.</span><div class="row" style="justify-content:center"><button class="btn" id="dgAgain">Jeszcze raz</button></div></div>`;
    $('#dgAgain').onclick = () => { DG = {d, i:0, score:0, miss:false, shown:[], n:DG.n}; drawDialogStep(); };
  } else {
    const [, bg, pl] = d.lines[DG.i];
    const others = shuffle(DIALOGS.flatMap(x => x.lines.filter(l => l[0] === 'T').map(l => l[1])).filter(x => x !== bg)).slice(0, 2);
    box.innerHTML = `${head}<div class="chat">${bubbles}</div><div class="card stack" style="margin-top:12px"><span class="eyebrow">Twoja kolej</span><b>${esc(pl)}</b>${optsHTML(shuffle([bg, ...others]), true, true)}</div>`;
    $$('#phbox .opt').forEach(b => b.onclick = () => {
      if (b.dataset.v !== bg) { b.classList.add('wrong'); b.disabled = true; DG.miss = true; buzz([40, 60, 40]); return; }
      if (!DG.miss) DG.score++; DG.miss = false; buzz(15); DG.shown.push(d.lines[DG.i]); DG.i++;
      if (audioOK() && S.autoVoice) speak(bg); drawDialogStep();
    });
    if (said && audioOK() && S.autoVoice) speak(said[1]);
  }
  $('#dgBack').onclick = () => { DG = null; drawDialogs(); };
  const last = box.querySelector('.card:last-child'); if (last && DG && DG.shown.length > 2) last.scrollIntoView({block:'nearest'});
}

/* ===== SŁUCHANIE ZE ZROZUMIENIEM (gra) ===== */
function startListen() {
  gStop(); let k; do { k = Math.floor(Math.random() * LISTEN.length); } while (LISTEN.length > 1 && G && G.type === 'listen' && k === G.k);
  G = {type:'listen', k, q:0, score:0}; drawListen();
}
function drawListen() {
  const box = $('#gamebox'); if (!box) return; const it = LISTEN[G.k], hear = audioOK(), done = G.q >= it.qs.length;
  const player = hear ? `<div class="row" style="gap:10px;flex-wrap:nowrap">${spkBtn(it.bg, 'big')}<button class="spk" data-say="${esc(it.bg)}" data-slow="1" aria-label="Posłuchaj wolniej">${ICON.slow}</button><span class="muted" style="font-size:14px">Posłuchaj (możesz kilka razy). Żółw czyta wolniej.</span></div>` : '';
  const text = `<div class="tipbox"><div lang="bg" style="font-weight:600">${esc(it.bg)}</div><p class="muted">${esc(it.pl)}</p></div>`;
  if (done) {
    const rec = finishBest('listen', G.score); addXP(G.score * 3); save(); renderHud();
    box.innerHTML = `<div class="card stack">${gHead(`Słuchanie · ${esc(it.t)}`, `${G.score} / ${it.qs.length}${rec ? ' · rekord!' : ''}`)}${player}${text}<button class="btn block" id="lsNext">Następny tekst</button></div>`;
    $('#lsNext').onclick = startListen; return;
  }
  const [q, ok, ...bad] = it.qs[G.q];
  box.innerHTML = `<div class="card stack">${gHead(`Słuchanie · ${esc(it.t)}`, `Pytanie ${G.q + 1}/${it.qs.length}`)}${player}${hear ? '' : text}
    <b>${esc(q)}</b>${optsHTML(shuffle([ok, ...bad]), false, true)}<div id="lsFb"></div></div>`;
  let ans = false;
  $$('#gamebox .opt').forEach(b => b.onclick = () => {
    if (ans) return; ans = true; const good = b.dataset.v === ok; if (good) G.score++; buzz(good ? 15 : [40, 60, 40]);
    $$('#gamebox .opt').forEach(x => { if (x.dataset.v === ok) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
    $('#lsFb').innerHTML = `<button class="btn block" id="lsGo">Dalej</button>`; $('#lsGo').onclick = () => { G.q++; drawListen(); };
  });
  if (hear && G.q === 0) speak(it.bg);
}

/* ===== CZYTANKI O MIASTACH ===== */
function openReading(ci) {
  const c = CITIES[ci], r = READS[ci]; if (!c || !r) return;
  const el = $('#lesson'); el.hidden = false; document.body.style.overflow = 'hidden';
  el.innerHTML = `<div class="wrap lesson-top"><button class="xbtn" id="lx" aria-label="Zamknij">${ICON.x}</button><span class="eyebrow" style="flex:1">Czytanka · ${esc(c.pl)}</span></div>
   <div class="lesson-body"><div class="wrap brief stack">
    <div><h2 class="view" lang="bg">${esc(c.bg)}</h2><div class="muted">Przeczytaj na głos. Dotknij zdania, żeby zobaczyć tłumaczenie.</div></div>
    <div class="plist">${[[c.f, c.fpl], ...r.s].map(([bg, pl]) => `<div class="prow rd" tabindex="0">${spkBtn(bg)}<div class="txt"><div class="bg" lang="bg">${esc(bg)}</div><div class="tr">${esc(translit(bg))}</div><div class="pl" hidden>${esc(pl)}</div></div></div>`).join('')}</div>
    <div><div class="eyebrow" style="margin-bottom:8px">Słówka z tekstu</div><div class="plist">${r.g.map(([bg, pl]) => `<div class="prow">${spkBtn(bg)}<div class="txt"><b lang="bg">${esc(bg)}</b> <span class="muted">– ${esc(pl)}</span></div>${starBtn(pl, bg)}</div>`).join('')}</div></div>
   </div></div>
   <div class="lesson-foot"><div class="wrap foot-in"><button class="btn block" id="rdClose">Zamknij</button></div></div>`;
  $('#lx').onclick = closeLesson; $('#rdClose').onclick = closeLesson;
  $$('#lesson .rd').forEach(row => row.onclick = e => { if (e.target.closest('.spk')) return; const p = row.querySelector('.pl'); p.hidden = !p.hidden; });
}

/* ===== SKRZYNIA PO LĄDOWANIU I NOTATNIK PILOTA ===== */
function nextFact() {
  if (!S.facts) S.facts = [];
  const i = FACTS.findIndex((_, k) => !S.facts.includes(k)); if (i < 0) return null;
  S.facts.push(i); save(); return i;
}
const factHTML = i => { const f = FACTS[i]; return `<p style="margin:6px 0">${esc(f[1])}</p><div class="row" style="gap:8px;flex-wrap:nowrap">${spkBtn(f[2])}<span class="muted">Po bułgarsku: <b lang="bg">${esc(f[2])}</b> – ${esc(f[3])}</span>${starBtn(f[3], f[2])}</div>`; };
function chestHTML(i) {
  return `<div class="card chest" style="text-align:left"><button class="btn block" id="chestOpen">🎁 Otwórz skrzynię z nagrodą</button>
    <div id="chestIn" hidden><span class="eyebrow">Notatnik pilota · karta ${S.facts.length}/${FACTS.length}</span><b style="display:block;font-family:var(--f-display);font-size:21px;margin-top:2px">${esc(FACTS[i][0])}</b>${factHTML(i)}</div></div>`;
}
function notebookHTML() {
  const got = (S.facts || []).filter(i => FACTS[i]);
  return `<section class="card stack"><div><div class="eyebrow">Notatnik pilota</div><h3 style="margin:2px 0 0;font-family:var(--f-display);font-size:22px">Ciekawostki techniczne · ${got.length}/${FACTS.length}</h3>
    <p class="muted" style="margin:4px 0 0">Po każdym lądowaniu otwierasz skrzynię z nową kartą: aerodynamika wirnika, silniki, technika pilotażu.</p></div>
    ${got.length ? `<div class="stack" style="gap:6px">${got.map(i => `<details class="vb"><summary><b>${esc(FACTS[i][0])}</b></summary>${factHTML(i)}</details>`).join('')}</div>` : '<span class="muted">Pierwsza karta czeka po najbliższym lądowaniu.</span>'}</section>`;
}

/* ===== KALENDARZ NAUKI I STATYSTYKI ===== */
const dkey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
function calendarHTML() {
  const days = S.days || {}, now = new Date(); now.setHours(12, 0, 0, 0);
  const dow = (now.getDay() + 6) % 7, start = new Date(now); start.setDate(now.getDate() - (11 * 7 + dow));
  let cells = '';
  for (let k = 0; k < 84; k++) { const d = new Date(start); d.setDate(start.getDate() + k); const key = dkey(d), xp = days[key] || 0, fut = d > now;
    cells += `<i class="${fut ? 'fut' : 'l' + (xp >= 50 ? 3 : xp >= 20 ? 2 : xp > 0 ? 1 : 0)}${key === dkey(now) ? ' now' : ''}" title="${key}: ${xp} XP"></i>`; }
  const last7 = [...Array(7)].map((_, k) => { const d = new Date(now); d.setDate(now.getDate() - (6 - k)); return {d, xp:days[dkey(d)] || 0}; });
  const mx = Math.max(30, ...last7.map(x => x.xp)), DN = ['nd','pn','wt','śr','cz','pt','sb'];
  const active = Object.values(days).filter(v => v > 0).length, best = Math.max(0, ...Object.values(days)), week = last7.reduce((a, x) => a + x.xp, 0);
  const weak = {}; Object.entries(S.mistakes || {}).forEach(([ref, c]) => { const lv = LV[ref.split(':')[0]]; if (lv && lv.unit && c > 0) weak[lv.unit.t] = (weak[lv.unit.t] || 0) + c; });
  const weakTop = Object.entries(weak).sort((a, b) => b[1] - a[1]).slice(0, 3);
  return `<section class="card stack"><div><div class="eyebrow">Kalendarz nauki</div><h3 style="margin:2px 0 0;font-family:var(--f-display);font-size:22px">Ostatnie 12 tygodni</h3></div>
    <div class="calwrap"><div class="cal" role="img" aria-label="Dni z nauką w ostatnich 12 tygodniach">${cells}</div></div>
    <div class="row muted" style="font-size:13px;gap:6px"><span>mniej</span><span class="cal mini"><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i></span><span>więcej XP</span></div>
    <div class="kpis" style="margin:0"><div class="kpi"><b>${active}</b><span>dni z nauką</span></div><div class="kpi"><b>${week}</b><span>XP w 7 dni</span></div><div class="kpi"><b>${best}</b><span>rekord dnia</span></div></div>
    <div><div class="eyebrow" style="margin-bottom:6px">Ostatnie 7 dni</div><div class="bars">${last7.map(x => `<div><span style="height:${Math.max(3, Math.round(100 * x.xp / mx))}%" class="${x.xp ? 'on' : ''}"></span><small>${DN[x.d.getDay()]}</small></div>`).join('')}</div></div>
    ${weakTop.length ? `<div><div class="eyebrow" style="margin-bottom:6px">Najwięcej błędów</div>${weakTop.map(([t, c]) => `<div class="row" style="justify-content:space-between"><span>${esc(t)}</span><span class="qcount">${c}</span></div>`).join('')}<a class="btn soft" href="#powtorki" style="margin-top:8px">Powtórz błędy</a></div>` : ''}</section>`;
}

/* ===== SPRAWDZIANY DZIAŁÓW I EGZAMIN PILOTA ===== */
const unitDone = u => u.levels.every(l => isDone(l.id));
function examItems(levels, nMc, nGram, nOrder, nWrite) {
  const Ws = shuffle(levels.flatMap(l => l.w.map((_, i) => W(l, i)))), Ss = shuffle(levels.flatMap(l => l.s.map((_, i) => SN(l, i)))), Gs = shuffle(levels.flatMap(l => l.g.map((_, i) => GR(l, i))));
  const out = [];
  for (let k = 0; k < nMc && k < Ws.length; k++) out.push({t:'mc', dir:k % 2 ? 'bg2pl' : 'pl2bg', it:Ws[k]});
  for (let k = 0; k < nGram && k < Gs.length; k++) out.push({t:'gram', it:Gs[k]});
  for (let k = 0; k < nOrder && k < Ss.length; k++) out.push({t:'order', it:Ss[k]});
  for (let k = 0; k < nWrite && nMc + k < Ws.length; k++) out.push({t:'write', it:Ws[nMc + k]});
  return shuffle(out);
}
function startUnitTest(uid) {
  const u = UNITS.find(x => x.id === uid); if (!u) return;
  startPractice(null, examItems(u.levels, 5, 3, 2, 2), `Sprawdzian: ${u.t}`, () => startUnitTest(uid)); L.exam = uid;
}
function startPilotExam() {
  const ls = LEVELS.filter(l => isDone(l.id)); if (ls.length < 10) { toast('Egzamin próbny otworzy się po 10 ukończonych levelach.'); return; }
  startPractice(null, examItems(ls, 12, 8, 5, 5), 'Egzamin pilota', startPilotExam); L.exam = 'pilot';
}
function examCardHTML() {
  const done = LEVELS.filter(l => isDone(l.id)).length, all = done >= LEVELS.length, best = (S.exams || {}).pilot || 0;
  return `<div class="card stack" style="margin-bottom:16px"><div><div class="eyebrow">Egzamin pilota</div><b style="font-family:var(--f-display);font-size:20px">${all ? 'Egzamin końcowy z dyplomem' : 'Egzamin próbny'}</b>
    <div class="muted" style="font-size:14px">30 zadań z ukończonych leveli. ${all ? 'Wynik od 80% daje dyplom do pobrania.' : `Dyplom będzie dostępny po ukończeniu wszystkich leveli (${done}/${LEVELS.length}).`}${best ? ` Najlepszy wynik: ${best}%.` : ''}</div></div>
    <div class="row"><button class="btn ${done >= 10 ? '' : 'ghost'}" id="pilotExam">${done >= 10 ? 'Zacznij egzamin' : 'Dostępny po 10 levelach'}</button>${all && best >= 80 ? '<button class="btn soft" id="dipBtn">Pobierz dyplom</button>' : ''}</div></div>`;
}
function diplomaBoxHTML() {
  return `<div class="card stack" style="text-align:left"><b style="font-family:var(--f-display);font-size:20px">Dyplom gotowy do pobrania</b>
    <input class="search" id="dipName" placeholder="Imię i nazwisko na dyplomie" value="${esc(S.name || '')}" aria-label="Imię i nazwisko"><button class="btn" id="dipGo">Pobierz dyplom (PNG)</button></div>`;
}
function wireDiploma(score) {
  const go = $('#dipGo'); if (!go) return;
  go.onclick = () => { const n = $('#dipName').value.trim(); if (!n) { toast('Wpisz imię i nazwisko.'); return; } S.name = n; save(); makeDiploma(n, score); };
}
function makeDiploma(name, score) {
  const cs = getComputedStyle(document.documentElement), col = v => cs.getPropertyValue(v).trim();
  const c = document.createElement('canvas'); c.width = 1400; c.height = 990; const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 990); g.addColorStop(0, '#9FD0F7'); g.addColorStop(.55, '#EAF5FE'); g.addColorStop(1, '#FFFFFF'); x.fillStyle = g; x.fillRect(0, 0, 1400, 990);
  x.fillStyle = '#FFFFFF'; [[230, 190, 70], [320, 170, 95], [420, 195, 65], [1010, 250, 60], [1100, 230, 85], [1190, 255, 60]].forEach(([a, b, r]) => { x.beginPath(); x.ellipse(a, b, r * 1.5, r * .8, 0, 0, 7); x.fill(); });
  x.strokeStyle = '#1767BD'; x.lineWidth = 8; x.strokeRect(40, 40, 1320, 910); x.lineWidth = 2; x.strokeRect(58, 58, 1284, 874);
  x.textAlign = 'center'; x.fillStyle = '#12305A';
  x.font = '800 96px "Sofia Sans Condensed","Sofia Sans",Arial,sans-serif'; x.fillText('ДИПЛОМА', 700, 330);
  x.font = '500 34px "Sofia Sans",Arial,sans-serif'; x.fillStyle = '#4F6B8C'; x.fillText('Dyplom ukończenia kursu „Bułgarski za sterami”', 700, 390);
  x.fillStyle = '#1767BD'; x.font = '800 78px "Sofia Sans Condensed","Sofia Sans",Arial,sans-serif'; x.fillText(name, 700, 520, 1200);
  x.strokeStyle = '#E7A60F'; x.lineWidth = 4; x.beginPath(); x.moveTo(350, 548); x.lineTo(1050, 548); x.stroke();
  x.fillStyle = '#12305A'; x.font = '500 36px "Sofia Sans",Arial,sans-serif';
  x.fillText('ukończyła kurs języka bułgarskiego na poziomie A2–B1', 700, 620);
  x.fillText(`z modułem lotniczym i zdała egzamin pilota z wynikiem ${score}%.`, 700, 670);
  x.font = '800 44px "Sofia Sans Condensed","Sofia Sans",Arial,sans-serif'; x.fillStyle = '#D9601A'; x.fillText('Честито! Успешни полети!', 700, 770);
  x.font = '500 28px "Sofia Sans",Arial,sans-serif'; x.fillStyle = '#4F6B8C'; x.fillText(`${today()} · ${LEVELS.length} leveli · ${S.xp} XP`, 700, 860);
  c.toBlob(b => { if (!b) { toast('Nie udało się utworzyć dyplomu.'); return; } const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'dyplom-bulgarski-za-sterami.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000); toast('Dyplom zapisany w Pobranych.'); }, 'image/png');
}

/* ===== START ===== */
route();
initSpeech();
initCloud();
