/* ===== TREŚCI KURSU =====
   w: [polski, bułgarski (warianty po |), notatka]
   s: [polski, bułgarski (warianty po |)]
   g: {s: zdanie z ___ | q: pytanie, o: [poprawna, ...błędne], pl: tłumaczenie, why: wyjaśnienie}
*/
const UNITS = [
/* ---------------- TRASA: NA CO DZIEŃ ---------------- */
{ id:'d0', track:'day', cefr:'A0', bt:'Първи стъпки', t:'Pierwsze kroki', levels:[
 { id:'d0-1', t:'Cyrylica w praktyce', bt:'Кирилица',
   tip:`<p>Bułgarska cyrylica ma 30 liter. Większość czyta się prawie jak po polsku. Uważaj na te:</p>
   <table class="mini"><tr><td lang="bg">ж</td><td>ż</td><td lang="bg">ч</td><td>cz</td><td lang="bg">ш</td><td>sz</td></tr>
   <tr><td lang="bg">щ</td><td>szt</td><td lang="bg">ц</td><td>c</td><td lang="bg">х</td><td>ch</td></tr>
   <tr><td lang="bg">я</td><td>ja</td><td lang="bg">ю</td><td>ju</td><td lang="bg">й</td><td>j</td></tr>
   <tr><td lang="bg">ъ</td><td>ă</td><td lang="bg">в</td><td>w</td><td lang="bg">и</td><td>i</td></tr></table>
   <p><b lang="bg">ъ</b> to krótka, „nijaka” samogłoska, jak <i>a</i> w angielskim <i>about</i>. W transkrypcji zapisujemy ją jako <b>ă</b>.</p>`,
   w:[['kawa','кафе'],['taksówka','такси'],['hotel','хотел'],['bank','банка'],['pilot','пилот'],['radio','радио'],['telefon','телефон'],['apteka','аптека'],['restauracja','ресторант'],['paszport','паспорт']],
   s:[['To jest hotel.','Това е хотел.'],['To jest kawa.','Това е кафе.'],['Gdzie jest bank?','Къде е банката?'],['Gdzie jest apteka?','Къде е аптеката?'],['To jest mój paszport.','Това е моят паспорт.|Това е паспортът ми.']],
   g:[{s:'Това ___ хотел.',o:['е','са','съм'],pl:'To jest hotel.',why:'„е” = jest (on, ona, ono, to).'},
      {q:'Jak czyta się literę „щ”?',o:['szt','sz','cz'],why:'щ = szt, np. <span lang="bg">още</span> (oszte) – jeszcze.'},
      {q:'Jak czyta się literę „ж”?',o:['ż','z','dż'],why:'ж = ż, np. <span lang="bg">жена</span> – kobieta.'},
      {q:'Litera „ъ” to…',o:['krótka samogłoska jak „a” w ang. about','znak niemy','dźwięk „u”'],why:'W bułgarskim ъ jest pełnoprawną samogłoską: <span lang="bg">България</span> (Bălgarija).'}]},
 { id:'d0-2', t:'Powitania', bt:'Поздрави',
   tip:`<p>Formy czasownika <b lang="bg">съм</b> (być) przydadzą się w każdym zdaniu:</p>
   <table class="mini"><tr><td lang="bg">аз съм</td><td>jestem</td><td lang="bg">ние сме</td><td>jesteśmy</td></tr>
   <tr><td lang="bg">ти си</td><td>jesteś</td><td lang="bg">вие сте</td><td>jesteście / Pan(i) jest</td></tr>
   <tr><td lang="bg">той/тя/то е</td><td>jest</td><td lang="bg">те са</td><td>są</td></tr></table>
   <p><b>Uwaga kulturowa:</b> Bułgarzy często kiwają głową na boki na „tak”, a w górę i w dół na „nie”. Słuchaj słów, nie gestów.</p>`,
   w:[['cześć','здравей'],['dzień dobry','добър ден|здравейте'],['dzień dobry (rano)','добро утро'],['dobry wieczór','добър вечер'],['dobranoc','лека нощ'],['do widzenia','довиждане'],['dziękuję','благодаря|мерси'],['proszę','моля'],['przepraszam','извинете|извинявай'],['tak','да'],['nie','не']],
   s:[['Jak się masz?','Как си?'],['Dobrze, dziękuję.','Добре съм, благодаря.'],['Nazywam się Anna.','Казвам се Анна.'],['Jak się nazywasz?','Как се казваш?'],['Miło mi.','Приятно ми е.'],['Jestem z Polski.','Аз съм от Полша.|От Полша съм.']],
   g:[{s:'Аз ___ от Полша.',o:['съм','е','са'],pl:'Jestem z Polski.'},
      {s:'Ние ___ пилоти.',o:['сме','сте','са'],pl:'Jesteśmy pilotami.'},
      {s:'Как ___ казваш?',o:['се','си','ли'],pl:'Jak się nazywasz?',why:'<span lang="bg">казвам се</span> = nazywam się; „се” = się.'},
      {s:'Те ___ от Варна.',o:['са','сме','е'],pl:'Oni są z Warny.'}]}
]},
{ id:'d1', track:'day', cefr:'A1', bt:'Време и числа', t:'Czas i liczby', levels:[
 { id:'d1-1', t:'Liczby', bt:'Числа',
   tip:`<p>„Jeden” i „dwa” zmieniają się z rodzajem: <b lang="bg">един самолет</b>, <b lang="bg">една кола</b>, <b lang="bg">едно кафе</b>; <b lang="bg">два самолета</b>, ale <b lang="bg">две кафета</b>.</p>
   <p>Po liczebniku rzeczownik męski dostaje końcówkę <b>-а</b>: <span lang="bg">два билета, три часа</span>.</p>
   <p>Liczby 11–19 i dziesiątki mają formy długie i krótkie: <span lang="bg">единадесет = единайсет</span>, <span lang="bg">двадесет = двайсет</span>. W mowie częściej słyszysz krótkie.</p>`,
   w:[['jeden','едно|един|една'],['dwa','две|два'],['trzy','три'],['cztery','четири'],['pięć','пет'],['sześć','шест'],['siedem','седем'],['osiem','осем'],['dziewięć','девет'],['dziesięć','десет'],['dwadzieścia','двайсет|двадесет'],['sto','сто']],
   s:[['Mam dwa bilety.','Имам два билета.'],['Dwie kawy, proszę.','Две кафета, моля.'],['To kosztuje pięć euro.','Това струва пет евро.'],['Mam trzydzieści lat.','На трийсет години съм.|На тридесет години съм.'],['Potrzebuję trzech biletów.','Трябват ми три билета.']],
   g:[{s:'Имам ___ билета.',o:['два','две','една'],pl:'Mam dwa bilety.',why:'Rodzaj męski: два; żeński i nijaki: две.'},
      {s:'___ кафета, моля.',o:['Две','Два','Едно'],pl:'Dwie kawy, proszę.',why:'<span lang="bg">кафе</span> jest rodzaju nijakiego → две.'},
      {s:'Един самолет, два ___.',o:['самолета','самолети','самолетът'],pl:'Jeden samolot, dwa samoloty.',why:'Po liczebniku: forma na -а.'},
      {q:'„двайсет” to…',o:['20','12','200'],why:'<span lang="bg">двайсет</span> (= двадесет) to 20.'}]},
 { id:'d1-2', t:'Która godzina?', bt:'Колко е часът?',
   tip:`<p><b>Pułapka:</b> <b lang="bg">час</b> to „godzina”, a <b lang="bg">време</b> to „czas” (i „pogoda”).</p>
   <p>Godziny: <span lang="bg">Часът е осем.</span> – Jest ósma. <span lang="bg">Осем и петнайсет.</span> – 8:15. <span lang="bg">Осем и половина.</span> – 8:30. <span lang="bg">Девет без четвърт.</span> – 8:45.</p>
   <p><b lang="bg">рано</b> znaczy „wcześnie”, a „rano” to <b lang="bg">сутрин</b>.</p>`,
   w:[['godzina (zegarowa)','час','Pułapka: час ≠ czas'],['minuta','минута'],['połowa / wpół','половина'],['kwadrans','четвърт'],['rano','сутрин'],['wieczorem','вечер'],['teraz','сега'],['wcześnie','рано','Pułapka: рано = wcześnie'],['późno','късно'],['czas','време','време = czas i pogoda']],
   s:[['Która godzina?','Колко е часът?'],['Jest ósma.','Часът е осем.|Осем е.'],['Jest wpół do dziewiątej.','Осем и половина е.|Часът е осем и половина.'],['O której jest lot?','В колко часа е полетът?'],['O dziesiątej.','В десет часа.|В десет.'],['Spóźniam się.','Закъснявам.'],['Nie mam czasu.','Нямам време.']],
   g:[{s:'Колко е ___?',o:['часът','часа','време'],pl:'Która godzina?'},
      {s:'___ колко часа е полетът?',o:['В','На','С'],pl:'O której jest lot?'},
      {q:'„Единайсет без четвърт” to…',o:['10:45','11:15','11:45'],why:'Без четвърт = za kwadrans.'},
      {q:'Bułgarskie „рано” znaczy…',o:['wcześnie','rano','późno'],why:'„rano” po bułgarsku to <span lang="bg">сутрин</span>.'}]},
 { id:'d1-3', t:'Dni tygodnia', bt:'Дни от седмицата',
   tip:`<p>Dni tygodnia są podobne do polskich: <span lang="bg">понеделник, вторник, сряда, четвъртък, петък, събота, неделя</span>.</p>
   <p>„W poniedziałek” = <b lang="bg">в понеделник</b>. Przyimek <b lang="bg">в</b> zmienia się w <b lang="bg">във</b> przed słowem zaczynającym się na в lub ф: <span lang="bg">във вторник</span>.</p>`,
   w:[['poniedziałek','понеделник'],['wtorek','вторник'],['środa','сряда'],['czwartek','четвъртък'],['piątek','петък'],['sobota','събота'],['niedziela','неделя'],['tydzień','седмица'],['dzisiaj','днес'],['jutro','утре'],['wczoraj','вчера']],
   s:[['Dzisiaj jest piątek.','Днес е петък.'],['Jutro jest sobota.','Утре е събота.'],['W poniedziałek pracuję.','В понеделник работя.|Работя в понеделник.'],['Do zobaczenia jutro!','До утре!|Ще се видим утре!'],['W tym tygodniu latam.','Тази седмица летя.|Летя тази седмица.']],
   g:[{s:'___ понеделник работя.',o:['В','На','До'],pl:'W poniedziałek pracuję.'},
      {s:'Вчера ___ неделя.',o:['беше','е','бях'],pl:'Wczoraj była niedziela.',why:'Czas przeszły od „е” to „беше”.'},
      {s:'___ вторник летя.',o:['Във','В','На'],pl:'We wtorek latam.',why:'Przed в/ф mówimy <span lang="bg">във</span>.'},
      {q:'„сряда” to…',o:['środa','sobota','czwartek'],why:'<span lang="bg">сряда</span> = środa.'}]}
]},
{ id:'d2', track:'day', cefr:'A1', bt:'Пазаруване и храна', t:'Zakupy i jedzenie', levels:[
 { id:'d2-1', t:'Produkty', bt:'Продукти',
   tip:`<p>Pytanie tworzysz słówkiem <b lang="bg">ли</b>, które stawiasz po wyrazie, o który pytasz: <span lang="bg">Имате ли хляб?</span> – Macie chleb?</p>
   <p><b>Pułapki:</b> <span lang="bg">сирене</span> to biały ser (jak feta), a żółty ser to <span lang="bg">кашкавал</span>. <span lang="bg">масло</span> to masło i… olej.</p>`,
   w:[['mleko','мляко'],['chleb','хляб'],['woda','вода'],['ser biały','сирене','Pułapka: to nie „syrena”'],['ser żółty','кашкавал'],['jajka','яйца'],['masło / olej','масло','масло = masło i olej'],['mięso','месо'],['owoce','плодове'],['warzywa','зеленчуци'],['jogurt','кисело мляко'],['herbata','чай'],['piwo','бира'],['wino','вино']],
   s:[['Gdzie znajdę mleko?','Къде мога да намеря мляко?|Къде да намеря мляко?|Къде има мляко?'],['Macie chleb?','Имате ли хляб?'],['Wodę, proszę.','Вода, моля.|Една вода, моля.'],['Nie jem mięsa.','Не ям месо.'],['Lubię biały ser.','Обичам сирене.|Харесвам сирене.'],['Gdzie jest jogurt?','Къде е киселото мляко?']],
   g:[{s:'Имате ___ хляб?',o:['ли','се','да'],pl:'Macie chleb?',why:'„ли” tworzy pytanie.'},
      {s:'Къде мога ___ намеря мляко?',o:['да','за','ли'],pl:'Gdzie mogę znaleźć mleko?',why:'Bułgarski nie ma bezokolicznika: мога да намеря = mogę znaleźć.'},
      {s:'Не ___ месо.',o:['ям','яде','яж'],pl:'Nie jem mięsa.'},
      {q:'Liczba mnoga od „яйце” to…',o:['яйца','яйцета','яйци'],why:'Rzeczowniki nijakie na -е/-о mają zwykle -а/-я.'}]},
 { id:'d2-2', t:'W sklepie', bt:'В магазина',
   tip:`<p>Od 2026 roku Bułgaria płaci w <b lang="bg">евро</b> (wcześniej <span lang="bg">лев</span>; to słowo wciąż usłyszysz w rozmowach).</p>
   <p>Rodzajnik określony dokleja się na końcu: <span lang="bg">магазин → магазинът</span> (ten sklep), <span lang="bg">каса → касата</span> (ta kasa).</p>`,
   w:[['sklep','магазин'],['kasa','каса'],['cena','цена'],['pieniądze','пари'],['karta','карта'],['reklamówka','торбичка'],['tanio','евтино'],['drogo','скъпо'],['paragon','касова бележка'],['reszta (pieniędzy)','ресто'],['otwarte','отворено'],['zamknięte','затворено']],
   s:[['Ile to kosztuje?','Колко струва това?'],['Czy mogę zapłacić kartą?','Може ли да платя с карта?|Мога ли да платя с карта?'],['To jest bardzo drogie.','Това е много скъпо.'],['Gdzie jest kasa?','Къде е касата?'],['Potrzebuję reklamówki.','Трябва ми торбичка.'],['Sklep jest zamknięty.','Магазинът е затворен.']],
   g:[{s:'Колко ___ това?',o:['струва','струват','струвам'],pl:'Ile to kosztuje?'},
      {s:'Може ли да платя ___ карта?',o:['с','в','на'],pl:'Czy mogę zapłacić kartą?'},
      {q:'„ten sklep” (podmiot): магазин → …',o:['магазинът','магазинта','магазинто'],why:'Rodzaj męski: -ът.'},
      {q:'„ta kasa”: каса → …',o:['касата','касът','касато'],why:'Rodzaj żeński: -та.'}]},
 { id:'d2-3', t:'Restauracja', bt:'В ресторанта',
   tip:`<p><b>Pułapki:</b> <span lang="bg">маса</span> = stół, <span lang="bg">стол</span> = krzesło, <span lang="bg">закуска</span> = śniadanie.</p>
   <p>„Chciałabym” to <b lang="bg">бих искала</b> (mężczyzna: <span lang="bg">бих искал</span>). Prościej: <span lang="bg">Искам едно кафе, моля.</span></p>`,
   w:[['restauracja','ресторант'],['menu','меню'],['rachunek','сметка'],['kelner','сервитьор'],['stół','маса','Pułapka: маса = stół'],['krzesło','стол','Pułapka: стол = krzesło'],['szklanka','чаша'],['śniadanie','закуска','Pułapka: закуска = śniadanie'],['obiad','обяд'],['kolacja','вечеря'],['smacznego','добър апетит'],['na zdrowie','наздраве']],
   s:[['Rachunek, proszę.','Сметката, моля.'],['Stolik dla dwojga, proszę.','Маса за двама, моля.'],['Co pan poleca?','Какво препоръчвате?'],['Chciałabym kawę.','Бих искала кафе.|Искам кафе.|Искам едно кафе.'],['Smacznego!','Добър апетит!'],['Było bardzo smaczne.','Беше много вкусно.']],
   g:[{s:'___ искала кафе.',o:['Бих','Би','Ще'],pl:'Chciałabym kawę.',why:'бих искала = chciałabym (mężczyzna: бих искал).'},
      {s:'Маса ___ двама, моля.',o:['за','на','с'],pl:'Stolik dla dwojga, proszę.'},
      {q:'Bułgarskie „маса” znaczy…',o:['stół','masa','miska']},
      {q:'Bułgarskie „закуска” to…',o:['śniadanie','przekąska','deser']}]}
]},
{ id:'d3', track:'day', cefr:'A1', bt:'Град и посоки', t:'Miasto i kierunki', levels:[
 { id:'d3-1', t:'Miejsca w mieście', bt:'Места в града',
   tip:`<p>Stopniowanie jest łatwe: <b lang="bg">по-</b> = bardziej, <b lang="bg">най-</b> = najbardziej. <span lang="bg">близо → по-близо → най-близо</span>.</p>
   <p>Przymiotnik też przyjmuje rodzajnik: <span lang="bg">най-близката аптека</span> – najbliższa apteka.</p>`,
   w:[['ulica','улица'],['przystanek','спирка'],['dworzec kolejowy','гара'],['dworzec autobusowy','автогара'],['szpital','болница'],['toaleta','тоалетна'],['centrum','център'],['plac','площад'],['most','мост'],['poczta','поща'],['policja','полиция'],['lekarz','лекар']],
   s:[['Gdzie jest toaleta?','Къде е тоалетната?'],['Gdzie jest najbliższa apteka?','Къде е най-близката аптека?'],['Szukam dworca.','Търся гарата.'],['Potrzebuję lekarza.','Трябва ми лекар.'],['Gdzie jest przystanek?','Къде е спирката?']],
   g:[{q:'„ten dworzec”: гара → …',o:['гарата','гарът','гарато']},
      {s:'Къде е най-___ аптека?',o:['близката','близкият','близкото'],pl:'Gdzie jest najbliższa apteka?',why:'<span lang="bg">аптека</span> jest rodzaju żeńskiego → близката.'},
      {q:'Stopień najwyższy tworzymy przedrostkiem…',o:['най-','по-','пре-']},
      {q:'Stopień wyższy (bliżej, szybciej) tworzymy przedrostkiem…',o:['по-','най-','за-']}]},
 { id:'d3-2', t:'Gdzie mam iść?', bt:'Накъде?',
   tip:`<p><b>Największa pułapka dla Polaka:</b> <b lang="bg">направо</b> znaczy <b>prosto</b>, a nie „na prawo”. W prawo to <b lang="bg">надясно</b>, w lewo – <b lang="bg">наляво</b>.</p>
   <p>Prośby grzeczne kończą się na <b>-йте/-ете</b>: <span lang="bg">Завийте надясно.</span> – Proszę skręcić w prawo.</p>`,
   w:[['w lewo','наляво'],['w prawo','надясно'],['prosto','направо','Pułapka: направо = prosto!'],['blisko','близо'],['daleko','далече|далеч'],['tutaj','тук'],['tam','там'],['naprzeciwko','срещу'],['za','зад'],['przed','пред'],['obok','до'],['skręcać','завивам']],
   s:[['Gdzie mam iść?','Къде трябва да отида?|Накъде да вървя?'],['Jak dojść do dworca?','Как да стигна до гарата?'],['Proszę skręcić w prawo.','Завийте надясно.'],['Proszę iść prosto.','Вървете направо.'],['Czy to daleko?','Далече ли е?|Далеч ли е?'],['Nie, to blisko.','Не, близо е.'],['Zgubiłam się.','Изгубих се.']],
   g:[{q:'Bułgarskie „направо” znaczy…',o:['prosto','w prawo','natychmiast']},
      {s:'Далече ___ е?',o:['ли','се','да'],pl:'Czy to daleko?'},
      {s:'Как да ___ до гарата?',o:['стигна','стигам','стигнах'],pl:'Jak dojść do dworca?'},
      {s:'___ надясно.',o:['Завийте','Завиваме','Завих'],pl:'Proszę skręcić w prawo.',why:'Forma grzeczna rozkaźnika: -йте.'}]},
 { id:'d3-3', t:'Transport', bt:'Транспорт',
   tip:`<p>Jednosylabowe rzeczowniki męskie mają w liczbie mnogiej zwykle <b>-ове</b>: <span lang="bg">влак → влакове</span>, <span lang="bg">мост → мостове</span>.</p>
   <p>„Do” w sensie kierunku: <b lang="bg">до</b>: <span lang="bg">билет до София</span>.</p>`,
   w:[['autobus','автобус'],['pociąg','влак'],['samochód','кола'],['bilet','билет'],['peron','перон'],['odjazd','тръгване'],['przyjazd','пристигане'],['rozkład jazdy','разписание'],['lotnisko','летище'],['samochód na wynajem','кола под наем']],
   s:[['Jeden bilet do Sofii, proszę.','Един билет до София, моля.'],['Kiedy odjeżdża pociąg?','Кога тръгва влакът?'],['Czy ten autobus jedzie do centrum?','Този автобус ходи ли до центъра?|Този автобус отива ли до центъра?'],['Na lotnisko, proszę.','До летището, моля.'],['Ile kosztuje bilet?','Колко струва билетът?']],
   g:[{s:'Един билет ___ София.',o:['до','в','на'],pl:'Jeden bilet do Sofii.'},
      {s:'Кога тръгва ___?',o:['влакът','влак','влаковете'],pl:'Kiedy odjeżdża pociąg?',why:'Podmiot męski: pełny rodzajnik -ът.'},
      {q:'Liczba mnoga od „влак” to…',o:['влакове','влаки','влака']},
      {q:'„кола” to…',o:['samochód','koło','kolej']}]}
]},
{ id:'d4', track:'day', cefr:'A2', bt:'Граматика в действие', t:'Gramatyka w akcji', levels:[
 { id:'d4-1', t:'Czasowniki i „да”', bt:'Глаголи',
   tip:`<p>Bułgarski <b>nie ma bezokolicznika</b>. Zamiast „chcę pić” mówisz <b lang="bg">искам да пия</b> – dosłownie „chcę, żebym pił”.</p>
   <table class="mini"><tr><td></td><td lang="bg">говоря</td><td lang="bg">чета</td><td lang="bg">имам</td></tr>
   <tr><td>ja</td><td lang="bg">говоря</td><td lang="bg">чета</td><td lang="bg">имам</td></tr>
   <tr><td>ty</td><td lang="bg">говориш</td><td lang="bg">четеш</td><td lang="bg">имаш</td></tr>
   <tr><td>on</td><td lang="bg">говори</td><td lang="bg">чете</td><td lang="bg">има</td></tr>
   <tr><td>my</td><td lang="bg">говорим</td><td lang="bg">четем</td><td lang="bg">имаме</td></tr>
   <tr><td>wy</td><td lang="bg">говорите</td><td lang="bg">четете</td><td lang="bg">имате</td></tr>
   <tr><td>oni</td><td lang="bg">говорят</td><td lang="bg">четат</td><td lang="bg">имат</td></tr></table>`,
   w:[['chcieć','искам'],['móc','мога'],['mówić','говоря'],['rozumieć','разбирам'],['mieszkać','живея'],['pracować','работя'],['jeść','ям'],['pić','пия'],['wiedzieć','знам'],['lubić','обичам|харесвам'],['trzeba / muszę','трябва']],
   s:[['Chcę pić kawę.','Искам да пия кафе.'],['Mówię trochę po bułgarsku.','Говоря малко български.'],['Nie rozumiem.','Не разбирам.'],['Czy możesz mówić wolniej?','Можеш ли да говориш по-бавно?'],['Muszę iść.','Трябва да тръгвам.|Трябва да вървя.'],['Mieszkam w Polsce.','Живея в Полша.']],
   g:[{s:'Искам ___ пия кафе.',o:['да','за','и'],pl:'Chcę pić kawę.',why:'Zamiast bezokolicznika: да + czasownik.'},
      {s:'Ти ___ ли английски?',o:['говориш','говоря','говори'],pl:'Mówisz po angielsku?'},
      {s:'Ние ___ в Полша.',o:['живеем','живея','живеят'],pl:'Mieszkamy w Polsce.'},
      {s:'Те ___ в София.',o:['работят','работим','работи'],pl:'Oni pracują w Sofii.'},
      {s:'Аз не ___.',o:['разбирам','разбира','разбираш'],pl:'Nie rozumiem.'}]},
 { id:'d4-2', t:'Przyszłość z „ще”', bt:'Бъдеще време',
   tip:`<p>Czas przyszły: <b lang="bg">ще</b> + czasownik w czasie teraźniejszym. <span lang="bg">Ще летя.</span> – Polecę / Będę latać.</p>
   <p>Przeczenie: <b lang="bg">няма да</b> + czasownik. <span lang="bg">Няма да летя.</span> – Nie polecę.</p>`,
   w:[['polecę','ще летя'],['nie polecę','няма да летя'],['później','по-късно|после'],['wkrótce','скоро'],['w przyszłym tygodniu','следващата седмица'],['plan','план'],['podróż','пътуване'],['spotkanie','среща'],['zadzwonię','ще се обадя'],['zobaczymy się','ще се видим']],
   s:[['Jutro polecę.','Утре ще летя.|Ще летя утре.'],['Nie będę pracować w sobotę.','Няма да работя в събота.|В събота няма да работя.'],['Pójdę do sklepu.','Ще отида до магазина.|Ще отида в магазина.'],['Co będziesz robić jutro?','Какво ще правиш утре?'],['Zadzwonię później.','Ще се обадя по-късно.']],
   g:[{s:'Утре ___ летя.',o:['ще','да','бях'],pl:'Jutro polecę.'},
      {s:'___ да работя в събота.',o:['Няма','Не','Ще не'],pl:'Nie będę pracować w sobotę.',why:'Przeczenie przyszłości: няма да.'},
      {s:'Какво ___ правиш утре?',o:['ще','ли','се'],pl:'Co będziesz robić jutro?'},
      {s:'Ще се ___ по-късно.',o:['обадя','обадих','обаждах'],pl:'Zadzwonię później.'}]},
 { id:'d4-3', t:'Przeszłość', bt:'Минало време',
   tip:`<p>Najczęstszy czas przeszły (aoryst) opisuje zakończone zdarzenia:</p>
   <table class="mini"><tr><td></td><td lang="bg">съм</td><td lang="bg">летя</td></tr>
   <tr><td>ja</td><td lang="bg">бях</td><td lang="bg">летях</td></tr>
   <tr><td>ty / on</td><td lang="bg">беше</td><td lang="bg">летя</td></tr>
   <tr><td>my</td><td lang="bg">бяхме</td><td lang="bg">летяхме</td></tr>
   <tr><td>wy</td><td lang="bg">бяхте</td><td lang="bg">летяхте</td></tr>
   <tr><td>oni</td><td lang="bg">бяха</td><td lang="bg">летяха</td></tr></table>`,
   w:[['byłam','бях'],['miałam','имах'],['poszłam','отидох'],['widziałam','видях'],['kupiłam','купих'],['jadłam','ядох'],['piłam','пих'],['leciałam','летях'],['już','вече'],['jeszcze nie','още не'],['rok temu','преди година']],
   s:[['Wczoraj byłam na lotnisku.','Вчера бях на летището.|Бях на летището вчера.'],['Kupiłam mleko.','Купих мляко.'],['Widziałam samolot.','Видях самолет.|Видях самолета.'],['Już jadłam.','Вече ядох.'],['Gdzie byłaś?','Къде беше?'],['Leciałam do Warny.','Летях до Варна.']],
   g:[{s:'Вчера ___ на летището.',o:['бях','съм','ще съм'],pl:'Wczoraj byłam na lotnisku.'},
      {s:'Ти къде ___?',o:['беше','бях','бяха'],pl:'Gdzie byłaś?'},
      {s:'Ние ___ до Варна.',o:['летяхме','летях','летим'],pl:'Lecieliśmy do Warny.'},
      {s:'Вчера ___ мляко.',o:['купих','купувам','ще купя'],pl:'Wczoraj kupiłam mleko.'}]},
 { id:'d4-4', t:'Rodzajnik określony', bt:'Членуване',
   tip:`<p>Polski nie ma rodzajników, bułgarski ma – na końcu słowa:</p>
   <table class="mini"><tr><td>męski (podmiot)</td><td lang="bg">самолетът</td><td>-ът / -ят</td></tr>
   <tr><td>męski (dopełnienie)</td><td lang="bg">самолета</td><td>-а / -я</td></tr>
   <tr><td>żeński</td><td lang="bg">пистата</td><td>-та</td></tr>
   <tr><td>nijaki</td><td lang="bg">летището</td><td>-то</td></tr>
   <tr><td>l. mnoga</td><td lang="bg">пилотите, крилата</td><td>-те / -та</td></tr></table>
   <p>Rodzaj zwykle widać po końcówce: spółgłoska → męski, -а/-я → żeński, -о/-е → nijaki.</p>`,
   w:[['ten samolot','самолетът'],['ten pas startowy','пистата'],['to mleko','млякото'],['to lotnisko','летището'],['te skrzydła','крилата'],['ci piloci','пилотите'],['ten wiatr','вятърът'],['ta noc','нощта'],['ten dzień','денят'],['ten silnik','двигателят']],
   s:[['Samolot jest nowy.','Самолетът е нов.'],['Pas startowy jest wolny.','Пистата е свободна.'],['Widzę samolot.','Виждам самолета.'],['Pilot jest tutaj.','Пилотът е тук.'],['Lotnisko jest małe.','Летището е малко.']],
   g:[{s:'___ е нов.',o:['Самолетът','Самолета','Самолетта'],pl:'Samolot jest nowy.',why:'Podmiot męski: pełny rodzajnik -ът.'},
      {s:'Виждам ___.',o:['самолета','самолетът','самолетто'],pl:'Widzę samolot.',why:'Dopełnienie: krótki rodzajnik -а.'},
      {q:'мляко + rodzajnik =',o:['млякото','млякота','млякът']},
      {q:'нощ + rodzajnik =',o:['нощта','нощът','нощто'],why:'<span lang="bg">нощ</span> jest wyjątkowo rodzaju żeńskiego.'},
      {q:'пилоти + rodzajnik =',o:['пилотите','пилотита','пилотето']}]}
]},
/* ---------------- TRASA: LOTNICTWO ---------------- */
{ id:'a0', track:'air', cefr:'A1', bt:'Летище и самолет', t:'Lotnisko i samolot', levels:[
 { id:'a0-1', t:'Na lotnisku', bt:'На летището',
   tip:`<p>Dwa najważniejsze czasowniki pilota: <b lang="bg">излитам</b> – startuję i <b lang="bg">кацам</b> – ląduję. Rzeczowniki: <span lang="bg">излитане</span> (start), <span lang="bg">кацане</span> (lądowanie).</p>
   <p>Uwaga: „pas startowy” to <b lang="bg">писта</b> – rodzaju żeńskiego, więc <span lang="bg">пистата</span>.</p>`,
   w:[['lotnisko','летище'],['samolot','самолет'],['lot','полет'],['pilot / pilotka','пилот','Kobieta pilot to też пилот; пилотка to czapka!'],['pas startowy','писта'],['hangar','хангар'],['start','излитане'],['lądowanie','кацане'],['bagaż','багаж'],['wyjście (gate)','изход'],['opóźnienie','закъснение'],['odprawa','регистрация']],
   s:[['Lot jest opóźniony.','Полетът закъснява.|Полетът има закъснение.'],['Gdzie jest hangar?','Къде е хангарът?'],['Samolot startuje.','Самолетът излита.'],['Samolot ląduje.','Самолетът каца.'],['Jestem pilotką.','Аз съм пилот.|Пилот съм.'],['Gdzie jest odprawa?','Къде е регистрацията?']],
   g:[{s:'Самолетът ___.',o:['излита','излитам','излитат'],pl:'Samolot startuje.'},
      {s:'Самолетите ___.',o:['кацат','каца','кацаме'],pl:'Samoloty lądują.'},
      {q:'„кацане” znaczy…',o:['lądowanie','kołowanie','start']},
      {s:'Къде е ___?',o:['хангарът','хангарта','хангарто'],pl:'Gdzie jest hangar?'}]},
 { id:'a0-2', t:'Budowa samolotu', bt:'Части на самолета',
   tip:`<p>Rozkaźnik do jednej osoby („ty”): <b lang="bg">провери!</b> – sprawdź! Grzecznie lub do wielu osób: <b lang="bg">проверете!</b></p>
   <p><span lang="bg">витло</span> – śmigło; <span lang="bg">колесник</span> – podwozie; <span lang="bg">гориво</span> – paliwo.</p>`,
   w:[['skrzydło','крило'],['ogon','опашка'],['silnik','двигател'],['śmigło','витло'],['podwozie','колесник'],['kabina','кабина'],['hamulec','спирачка'],['paliwo','гориво'],['zbiornik','резервоар'],['kadłub','фюзелаж|корпус'],['koło','колело'],['drzwi','врата']],
   s:[['Silnik pracuje.','Двигателят работи.'],['Skrzydło jest uszkodzone.','Крилото е повредено.'],['Potrzebujemy paliwa.','Трябва ни гориво.|Имаме нужда от гориво.'],['Śmigło się kręci.','Витлото се върти.'],['Sprawdź hamulce.','Провери спирачките.']],
   g:[{q:'Liczba mnoga od „крило”',o:['крила','крили','крилове']},
      {s:'Витлото ___ върти.',o:['се','си','е'],pl:'Śmigło się kręci.'},
      {s:'___ спирачките!',o:['Провери','Проверявам','Проверих'],pl:'Sprawdź hamulce!'},
      {q:'„гориво” znaczy…',o:['paliwo','gorąco','olej']}]},
 { id:'a0-3', t:'Przyrządy w kabinie', bt:'Уреди в кабината',
   tip:`<p>Wysokość w lotnictwie podaje się w stopach: <span lang="bg">хиляда фута</span> – tysiąc stóp. „Więcej” = <b lang="bg">повече</b>.</p>
   <p><span lang="bg">масло</span> w kabinie to <b>olej</b> silnikowy: <span lang="bg">налягане на маслото</span> – ciśnienie oleju.</p>`,
   w:[['wysokościomierz','висотомер'],['prędkościomierz','скоростомер'],['kompas','компас'],['radiostacja','радиостанция|радио'],['słuchawki','слушалки'],['przepustnica (gaz)','газ|лост за газта'],['drążek sterowy','ръчка за управление|лост за управление'],['pedały','педали'],['przełącznik','превключвател'],['ciśnienie','налягане'],['temperatura','температура'],['obroty','обороти']],
   s:[['Wysokość wynosi dwa tysiące stóp.','Височината е две хиляди фута.'],['Daj więcej gazu.','Дай повече газ.'],['Radio nie działa.','Радиото не работи.'],['Sprawdź ciśnienie oleju.','Провери налягането на маслото.'],['Obroty są w normie.','Оборотите са нормални.']],
   g:[{s:'Радиото не ___.',o:['работи','работя','работят'],pl:'Radio nie działa.'},
      {s:'Дай ___ газ.',o:['повече','най-много','по-'],pl:'Daj więcej gazu.'},
      {q:'„масло” w kabinie to…',o:['olej','masło','smar'],why:'масло = masło i olej, także silnikowy.'},
      {s:'Височината ___ две хиляди фута.',o:['е','са','съм'],pl:'Wysokość wynosi 2000 stóp.'}]}
]},
{ id:'a1', track:'air', cefr:'A2', bt:'Автожир', t:'Wiatrakowiec', levels:[
 { id:'a1-1', t:'Budowa wiatrakowca', bt:'Части на автожира',
   tip:`<p>Wiatrakowiec to po bułgarsku <b lang="bg">автожир</b> (rzadziej <span lang="bg">жирокоптер</span>). Wirnik nie jest napędzany w locie – kręci go opływające powietrze (<span lang="bg">авторотация</span>). Dlatego przed startem włączasz <span lang="bg">предварителното завъртане на ротора</span> – wstępne rozkręcenie wirnika.</p>`,
   w:[['wiatrakowiec','автожир|жирокоптер'],['wirnik nośny','носещ ротор|ротор'],['łopata wirnika','лопата|лопатка'],['maszt','мачта'],['śmigło pchające','тласкащо витло'],['statecznik','стабилизатор'],['ster kierunku','кормило за направление'],['piasta','главина'],['wstępne rozkręcenie wirnika','предварително завъртане на ротора'],['hamulec wirnika','спирачка на ротора'],['z tyłu','отзад'],['z przodu','отпред']],
   s:[['Wiatrakowiec ma wirnik i śmigło.','Автожирът има ротор и витло.'],['Wirnik obraca się swobodnie.','Роторът се върти свободно.'],['Śmigło jest z tyłu.','Витлото е отзад.'],['Sprawdź łopaty wirnika.','Провери лопатите на ротора.'],['Włącz wstępne rozkręcenie.','Включи предварителното завъртане.']],
   g:[{s:'Автожирът ___ ротор и витло.',o:['има','имам','имат'],pl:'Wiatrakowiec ma wirnik i śmigło.'},
      {s:'Роторът се ___ свободно.',o:['върти','въртя','въртят'],pl:'Wirnik obraca się swobodnie.'},
      {q:'„отзад” znaczy…',o:['z tyłu','z przodu','z boku']},
      {q:'„автожир” z rodzajnikiem (podmiot):',o:['автожирът','автожирта','автожирто']}]},
 { id:'a1-2', t:'W powietrzu', bt:'Във въздуха',
   tip:`<p>Ruch w pionie: <b lang="bg">набирам височина</b> – nabieram wysokości, <b lang="bg">снижавам се</b> – zniżam się.</p>
   <p>Wiatr: <span lang="bg">срещу вятъра</span> – pod wiatr, <span lang="bg">страничен вятър</span> – wiatr boczny, <span lang="bg">порив</span> – poryw.</p>`,
   w:[['autorotacja','авторотация'],['nabierać wysokości','набирам височина'],['zniżać się','снижавам се'],['zakręt','завой'],['wiatr','вятър'],['pod wiatr','срещу вятъра'],['wiatr boczny','страничен вятър'],['poryw','порив'],['turbulencja','турбуленция'],['prędkość','скорост'],['wysokość','височина'],['lecieć','летя']],
   s:[['Nabieramy wysokości.','Набираме височина.'],['Zniżamy się do lądowania.','Снижаваме се за кацане.'],['Startujemy pod wiatr.','Излитаме срещу вятъра.'],['Jest silny wiatr boczny.','Има силен страничен вятър.'],['Skręcam w lewo.','Завивам наляво.'],['Prędkość jest za mała.','Скоростта е твърде малка.']],
   g:[{s:'Ние ___ височина.',o:['набираме','набирам','набират'],pl:'Nabieramy wysokości.'},
      {s:'Излитаме ___ вятъра.',o:['срещу','до','с'],pl:'Startujemy pod wiatr.'},
      {s:'Скоростта е ___ малка.',o:['твърде','най','по'],pl:'Prędkość jest za mała.'},
      {s:'___ наляво.',o:['Завивам','Завиваш','Завиват'],pl:'Skręcam w lewo.'}]},
 { id:'a1-3', t:'Przed lotem i awarie', bt:'Преди полета',
   tip:`<p><b lang="bg">си</b> to „sobie”: <span lang="bg">Сложи си каската.</span> – Załóż (sobie) kask.</p>
   <p><span lang="bg">отказ на двигателя</span> to awaria silnika (dosłownie „odmowa silnika”). <span lang="bg">курсант</span> – uczeń-pilot.</p>`,
   w:[['przegląd przedlotowy','предполетен оглед'],['lista kontrolna','контролен лист|чеклист'],['pas bezpieczeństwa','колан'],['kask','каска'],['olej','масло'],['awaria silnika','отказ на двигателя'],['lądowanie awaryjne','аварийно кацане|принудително кацане'],['lądowisko','площадка за кацане'],['pole','поле'],['instruktor','инструктор'],['uczeń-pilot','курсант'],['godzina lotu','летателен час']],
   s:[['Zapnij pas.','Затегни колана.|Сложи си колана.'],['Załóż kask.','Сложи си каската.'],['Robimy przegląd przedlotowy.','Правим предполетен оглед.'],['Mamy awarię silnika.','Имаме отказ на двигателя.'],['Wylądujemy na tym polu.','Ще кацнем на това поле.'],['Instruktor sprawdza wiatrakowiec.','Инструкторът проверява автожира.']],
   g:[{s:'Сложи ___ каската.',o:['си','се','ми'],pl:'Załóż kask.',why:'си = sobie.'},
      {s:'Ще ___ на това поле.',o:['кацнем','кацнахме','кацахме'],pl:'Wylądujemy na tym polu.'},
      {s:'Инструкторът проверява ___.',o:['автожира','автожирът','автожири'],pl:'Instruktor sprawdza wiatrakowiec.',why:'Dopełnienie: krótki rodzajnik -а.'},
      {q:'„отказ на двигателя” to…',o:['awaria silnika','odmowa pilota','wyłączenie radia']}]}
]},
{ id:'a2', track:'air', cefr:'A2', bt:'Време и радио', t:'Pogoda i radio', levels:[
 { id:'a2-1', t:'Pogoda', bt:'Времето',
   tip:`<p><b lang="bg">времето</b> to i pogoda, i czas: <span lang="bg">Какво е времето?</span> – Jaka jest pogoda?</p>
   <p>„Pada” to <b lang="bg">вали</b>. „Bo / ponieważ” – <b lang="bg">защото</b>.</p>`,
   w:[['pogoda','времето'],['chmura','облак'],['pochmurno','облачно'],['słonecznie','слънчево'],['deszcz','дъжд'],['pada','вали'],['mgła','мъгла'],['widoczność','видимост'],['burza','буря|гръмотевична буря'],['zimno','студено'],['ciepło','топло'],['poryw wiatru','порив на вятъра']],
   s:[['Jaka jest pogoda?','Какво е времето?|Как е времето?'],['Pada deszcz.','Вали дъжд.|Вали.'],['Jest mgła.','Има мъгла.'],['Widoczność jest słaba.','Видимостта е лоша.|Видимостта е слаба.'],['Jutro będzie słonecznie.','Утре ще е слънчево.|Утре ще бъде слънчево.'],['Nie lecimy, bo jest burza.','Не летим, защото има буря.']],
   g:[{s:'Утре ___ е слънчево.',o:['ще','да','беше'],pl:'Jutro będzie słonecznie.'},
      {s:'Не летим, ___ има буря.',o:['защото','но','ако'],pl:'Nie lecimy, bo jest burza.'},
      {q:'„вали” znaczy…',o:['pada','wieje','grzmi']},
      {q:'„времето” może znaczyć…',o:['pogodę i czas','tylko czas','tylko pogodę']}]},
 { id:'a2-2', t:'Łączność radiowa', bt:'Радиовръзка',
   tip:`<p>Kontrola ruchu w Bułgarii mówi głównie po angielsku, ale z instruktorem, na lądowisku i w aeroklubie przydaje się bułgarski.</p>
   <p>Przymiotnik zgadza się z rodzajem: <span lang="bg">кацането е разрешено</span> (nijaki), <span lang="bg">пистата е свободна</span> (żeński).</p>`,
   w:[['wieża kontroli','кула|контролна кула'],['zezwolenie','разрешение'],['potwierdzam','потвърждавам'],['zrozumiałem','разбрах'],['powtórz','повтори|повторете'],['gotowa / gotowy','готова|готов'],['podejście','подход'],['kołowanie','рулиране'],['czekać','чакам'],['częstotliwość','честота'],['znak wywoławczy','позивна'],['pozycja','позиция']],
   s:[['Gotowa do startu.','Готова съм за излитане.|Готова за излитане.|Готов за излитане.|Готов съм за излитане.'],['Proszę powtórzyć.','Повторете, моля.'],['Zrozumiałem.','Разбрах.'],['Pas startowy jest wolny.','Пистата е свободна.'],['Lądowanie dozwolone.','Кацането е разрешено.'],['Proszę czekać.','Чакайте, моля.']],
   g:[{s:'Готова съм ___ излитане.',o:['за','на','до'],pl:'Gotowa do startu.'},
      {s:'___, моля.',o:['Повторете','Повтарям','Повторих'],pl:'Proszę powtórzyć.'},
      {s:'Кацането е ___.',o:['разрешено','разрешена','разрешен'],pl:'Lądowanie dozwolone.',why:'<span lang="bg">кацане</span> jest nijakie → разрешено.'},
      {s:'Пистата е ___.',o:['свободна','свободен','свободно'],pl:'Pas startowy jest wolny.'}]}
]}
];

/* ---------------- ROZMÓWKI ---------------- */
const PHRASES = [
 {n:'Podstawy', items:[['Dzień dobry (formalnie).','Здравейте.'],['Jak się masz?','Как си?'],['Nie rozumiem.','Не разбирам.'],['Czy mówi pan po angielsku?','Говорите ли английски?'],['Czy może pan mówić wolniej?','Можете ли да говорите по-бавно?'],['Jak się mówi … po bułgarsku?','Как се казва … на български?'],['Co to znaczy?','Какво означава това?'],['Przepraszam.','Извинете.'],['Dziękuję bardzo.','Благодаря много.'],['Nie ma za co.','Няма защо.']]},
 {n:'Gdzie mam iść?', items:[['Gdzie mam iść?','Къде трябва да отида?'],['Jak dojść do …?','Как да стигна до …?'],['Gdzie jest toaleta?','Къде е тоалетната?'],['Czy to daleko?','Далече ли е?'],['W lewo / w prawo / prosto','Наляво / надясно / направо'],['Czy może mi pan pokazać na mapie?','Можете ли да ми покажете на картата?'],['Zgubiłam się.','Изгубих се.'],['Gdzie jest przystanek?','Къде е спирката?']]},
 {n:'Zakupy', items:[['Gdzie znajdę mleko?','Къде мога да намеря мляко?'],['Ile to kosztuje?','Колко струва това?'],['Czy mogę zapłacić kartą?','Може ли да платя с карта?'],['Macie …?','Имате ли …?'],['Tylko się rozglądam, dziękuję.','Само разглеждам, благодаря.'],['Poproszę to.','Дайте ми това, моля.'],['Potrzebuję reklamówki.','Трябва ми торбичка.']]},
 {n:'Czas', items:[['Która godzina?','Колко е часът?'],['O której otwieracie?','В колко часа отваряте?'],['Do której jest otwarte?','До колко часа работите?'],['Kiedy?','Кога?'],['Dzisiaj / jutro / wczoraj','Днес / утре / вчера'],['Mam mało czasu.','Имам малко време.'],['Spóźnię się dziesięć minut.','Ще закъснея десет минути.']]},
 {n:'Restauracja', items:[['Stolik dla dwojga, proszę.','Маса за двама, моля.'],['Menu, proszę.','Менюто, моля.'],['Co pan poleca?','Какво препоръчвате?'],['Bez mięsa, proszę.','Без месо, моля.'],['Rachunek, proszę.','Сметката, моля.'],['Smacznego!','Добър апетит!'],['Na zdrowie!','Наздраве!']]},
 {n:'Nagłe sytuacje', items:[['Pomocy!','Помощ!'],['Potrzebuję lekarza.','Трябва ми лекар.'],['Proszę zadzwonić na 112.','Обадете се на 112.'],['Zgubiłam paszport.','Загубих си паспорта.'],['Gdzie jest policja?','Къде е полицията?'],['Boli mnie tutaj.','Боли ме тук.']]},
 {n:'Rozmowa', items:[['Skąd jesteś?','Откъде си?'],['Jestem z Polski.','Аз съм от Полша.'],['Czym się zajmujesz?','С какво се занимаваш?'],['Jestem pilotką.','Аз съм пилот.'],['Uczę się bułgarskiego.','Уча български.'],['Miło mi.','Приятно ми е.']]},
 {n:'Lotnisko i aeroklub', items:[['Gdzie jest hangar?','Къде е хангарът?'],['Ile mamy paliwa?','Колко гориво имаме?'],['Wiatr jest za silny.','Вятърът е твърде силен.'],['Kiedy polecimy?','Кога ще летим?'],['Czy mogę polecieć z instruktorem?','Може ли да летя с инструктор?'],['Ile kosztuje godzina lotu?','Колко струва един летателен час?'],['Gotowa do startu.','Готова съм за излитане.'],['Sprawdź wirnik przed lotem.','Провери ротора преди полета.']]}
];

/* ---------------- GRAMATYKA (ściąga) ---------------- */
const GRAMMAR = [
 {t:'Wymowa i alfabet', h:`<p>30 liter, czyta się tak, jak się pisze. Akcent jest ruchomy – osłuchuj się z lektorem.</p><table class="mini"><tr><td lang="bg">ж ч ш щ</td><td>ż cz sz szt</td></tr><tr><td lang="bg">я ю й</td><td>ja ju j</td></tr><tr><td lang="bg">ъ</td><td>ă (jak „a” w ang. about)</td></tr><tr><td lang="bg">ь</td><td>tylko przed о: <span lang="bg">ьо</span> = jo</td></tr><tr><td lang="bg">х, ц, в</td><td>ch, c, w</td></tr></table>`},
 {t:'Być – съм', h:`<table class="mini"><tr><td>teraz</td><td lang="bg">съм, си, е, сме, сте, са</td></tr><tr><td>przeszłość</td><td lang="bg">бях, беше, беше, бяхме, бяхте, бяха</td></tr><tr><td>przyszłość</td><td lang="bg">ще съм / ще бъда</td></tr></table><p>Forma <span lang="bg">съм</span> nie może zaczynać zdania: <span lang="bg">Аз съм пилот</span> albo <span lang="bg">Пилот съм</span>.</p>`},
 {t:'Rodzajnik określony', h:`<table class="mini"><tr><td>męski</td><td lang="bg">самолетът / самолета</td><td>-ът podmiot, -а dopełnienie</td></tr><tr><td>żeński</td><td lang="bg">пистата</td><td>-та</td></tr><tr><td>nijaki</td><td lang="bg">летището</td><td>-то</td></tr><tr><td>mnoga</td><td lang="bg">пилотите, крилата</td><td>-те, -та (po -а)</td></tr></table><p>Na <span lang="bg">-й</span>, <span lang="bg">-тел</span> i kilka innych: <span lang="bg">-ят / -я</span>: <span lang="bg">денят, двигателят</span>.</p>`},
 {t:'Liczba mnoga', h:`<table class="mini"><tr><td>męski wielosylabowy</td><td lang="bg">самолет → самолети</td></tr><tr><td>męski jednosylabowy</td><td lang="bg">влак → влакове</td></tr><tr><td>żeński</td><td lang="bg">писта → писти</td></tr><tr><td>nijaki -о/-е</td><td lang="bg">крило → крила, летище → летища</td></tr><tr><td>nijaki obcy</td><td lang="bg">кафе → кафета, меню → менюта</td></tr></table><p>Po liczebniku męski ma formę <b>-а</b>: <span lang="bg">два самолета</span>.</p>`},
 {t:'Czas teraźniejszy', h:`<p>Trzy wzory odmiany:</p><table class="mini"><tr><td></td><td lang="bg">чета</td><td lang="bg">говоря</td><td lang="bg">имам</td></tr><tr><td>ja</td><td lang="bg">чета</td><td lang="bg">говоря</td><td lang="bg">имам</td></tr><tr><td>ty</td><td lang="bg">четеш</td><td lang="bg">говориш</td><td lang="bg">имаш</td></tr><tr><td>on</td><td lang="bg">чете</td><td lang="bg">говори</td><td lang="bg">има</td></tr><tr><td>my</td><td lang="bg">четем</td><td lang="bg">говорим</td><td lang="bg">имаме</td></tr><tr><td>wy</td><td lang="bg">четете</td><td lang="bg">говорите</td><td lang="bg">имате</td></tr><tr><td>oni</td><td lang="bg">четат</td><td lang="bg">говорят</td><td lang="bg">имат</td></tr></table>`},
 {t:'„да” zamiast bezokolicznika', h:`<p>Bułgarski nie ma bezokolicznika. Drugi czasownik odmieniasz i poprzedzasz <b lang="bg">да</b>:</p><p><span lang="bg">Искам да летя.</span> – Chcę latać. <span lang="bg">Искаш ли да летиш?</span> – Chcesz latać? <span lang="bg">Трябва да тръгвам.</span> – Muszę iść.</p>`},
 {t:'Przyszłość: ще / няма да', h:`<p><b lang="bg">ще</b> + czas teraźniejszy: <span lang="bg">ще летя, ще летиш, ще лети…</span></p><p>Przeczenie: <b lang="bg">няма да</b>: <span lang="bg">Няма да летя днес.</span> – Nie polecę dzisiaj.</p>`},
 {t:'Przeszłość (aoryst)', h:`<p>Zakończone czynności. Końcówki: <span lang="bg">-х, -, -, -хме, -хте, -ха</span>.</p><table class="mini"><tr><td lang="bg">летя</td><td lang="bg">летях, летя, летя, летяхме, летяхте, летяха</td></tr><tr><td lang="bg">купя</td><td lang="bg">купих, купи, купи, купихме, купихте, купиха</td></tr><tr><td lang="bg">отида</td><td lang="bg">отидох, отиде, отиде, отидохме, отидохте, отидоха</td></tr></table>`},
 {t:'Pytania', h:`<p>Pytania tak/nie tworzy słówko <b lang="bg">ли</b> po wyrazie, o który pytasz: <span lang="bg">Говориш ли български?</span> <span lang="bg">Далече ли е?</span></p><table class="mini"><tr><td lang="bg">къде</td><td>gdzie</td><td lang="bg">кога</td><td>kiedy</td></tr><tr><td lang="bg">какво</td><td>co</td><td lang="bg">колко</td><td>ile</td></tr><tr><td lang="bg">как</td><td>jak</td><td lang="bg">защо</td><td>dlaczego</td></tr><tr><td lang="bg">кой</td><td>kto</td><td lang="bg">накъде</td><td>dokąd</td></tr></table>`},
 {t:'Krótkie zaimki i szyk', h:`<p>Krótkie formy (<span lang="bg">ми, ти, му, ѝ, ни, ви, им</span> = mi, ci…; <span lang="bg">ме, те, го, я</span> = mnie, cię, go, ją; <span lang="bg">се, си</span>) <b>nie mogą stać na początku zdania</b>.</p><p><span lang="bg">Казвам се Анна.</span> ✓ &nbsp; <span lang="bg">Се казвам Анна.</span> ✗</p><p><span lang="bg">Харесва ми.</span> – Podoba mi się. <span lang="bg">Не го виждам.</span> – Nie widzę go.</p>`},
 {t:'Fałszywi przyjaciele', h:`<table class="mini"><tr><td lang="bg">направо</td><td>prosto (nie „w prawo”)</td></tr><tr><td lang="bg">час</td><td>godzina</td></tr><tr><td lang="bg">рано</td><td>wcześnie</td></tr><tr><td lang="bg">маса</td><td>stół</td></tr><tr><td lang="bg">стол</td><td>krzesło</td></tr><tr><td lang="bg">закуска</td><td>śniadanie</td></tr><tr><td lang="bg">сирене</td><td>biały ser</td></tr><tr><td lang="bg">гора</td><td>las (góra to <span lang="bg">планина</span>)</td></tr><tr><td lang="bg">булка</td><td>panna młoda</td></tr><tr><td lang="bg">ягода</td><td>truskawka</td></tr><tr><td lang="bg">дума</td><td>słowo</td></tr><tr><td lang="bg">кола</td><td>samochód</td></tr></table>`}
];

/* ---------------- TEST WSTĘPNY ---------------- */
const PLACEMENT = [
 {tier:0, sk:'voc', q:'Jak jest „dziękuję”?', o:['благодаря','моля','извинете']},
 {tier:0, sk:'read', q:'Przeczytaj i wybierz znaczenie: <b lang="bg">летище</b>', o:['lotnisko','lato','latarnia']},
 {tier:0, sk:'gram', q:'<span lang="bg">Аз ___ от Полша.</span>', o:['съм','е','са']},
 {tier:1, sk:'read', q:'„<span lang="bg">Колко е часът?</span>” znaczy…', o:['Która godzina?','Ile to kosztuje?','Kiedy jest lot?']},
 {tier:1, sk:'read', q:'„<span lang="bg">Колко струва това?</span>” znaczy…', o:['Ile to kosztuje?','Co to jest?','Gdzie to jest?']},
 {tier:1, sk:'voc', q:'<b lang="bg">сирене</b> to…', o:['biały ser','syrena','sernik']},
 {tier:1, sk:'gram', q:'<span lang="bg">Имате ___ хляб?</span>', o:['ли','се','да']},
 {tier:2, sk:'voc', q:'<b lang="bg">направо</b> znaczy…', o:['prosto','w prawo','w lewo']},
 {tier:2, sk:'read', q:'„<span lang="bg">Как да стигна до гарата?</span>” znaczy…', o:['Jak dojść do dworca?','Gdzie jest garaż?','Kiedy odjeżdża pociąg?']},
 {tier:2, sk:'voc', q:'„Zgubiłam się.” po bułgarsku to…', o:['Изгубих се.','Загубих паспорта.','Търся гарата.']},
 {tier:3, sk:'gram', q:'<span lang="bg">Искам ___ пия кафе.</span>', o:['да','за','че']},
 {tier:3, sk:'gram', q:'<span lang="bg">Утре ___ летя.</span>', o:['ще','бях','да']},
 {tier:3, sk:'gram', q:'<span lang="bg">Вчера ___ на летището.</span>', o:['бях','съм','ще съм']},
 {tier:3, sk:'gram', q:'Wybierz poprawne zdanie:', o:['Казвам се Петър.','Се казвам Петър.','Казвам Петър се.']},
 {tier:3, sk:'gram', q:'„ten samolot” (podmiot) to…', o:['самолетът','самолетта','самолетто']},
 {tier:4, sk:'air', q:'<b lang="bg">писта</b> to…', o:['pas startowy','hangar','wieża']},
 {tier:4, sk:'air', q:'<b lang="bg">витло</b> to…', o:['śmigło','skrzydło','wirnik']},
 {tier:4, sk:'air', q:'<b lang="bg">кацане</b> to…', o:['lądowanie','start','kołowanie']},
 {tier:4, sk:'air', q:'<b lang="bg">видимост</b> to…', o:['widoczność','wysokość','prędkość']},
 {tier:4, sk:'air', q:'<b lang="bg">срещу вятъра</b> to…', o:['pod wiatr','z wiatrem','bez wiatru']}
];

/* ---------------- MIASTA NA PLANSZY ---------------- */
const CITIES = [
 {bg:'София',pl:'Sofia',icao:'LBSF',f:'Мотото на София е „Расте, но не старее”.',fpl:'Motto Sofii brzmi: „Rośnie, ale się nie starzeje”.'},
 {bg:'Пловдив',pl:'Płowdiw',icao:'LBPD',f:'Пловдив е един от най-старите градове в Европа.',fpl:'Płowdiw to jedno z najstarszych miast Europy.'},
 {bg:'Казанлък',pl:'Kazanłyk',f:'Казанлък е в Розовата долина.',fpl:'Kazanłyk leży w Dolinie Róż.'},
 {bg:'Стара Загора',pl:'Stara Zagora',f:'Стара Загора е градът на липите.',fpl:'Stara Zagora to miasto lip.'},
 {bg:'Бургас',pl:'Burgas',icao:'LBBG',f:'Бургас е голям град на Черно море.',fpl:'Burgas to duże miasto nad Morzem Czarnym.'},
 {bg:'Несебър',pl:'Nesebyr',f:'Старият Несебър е в списъка на ЮНЕСКО.',fpl:'Stary Nesebyr jest na liście UNESCO.'},
 {bg:'Варна',pl:'Warna',icao:'LBWN',f:'Варна е морската столица на България.',fpl:'Warna to morska stolica Bułgarii.'},
 {bg:'Шумен',pl:'Szumen',f:'Близо до Шумен е Мадарският конник.',fpl:'Niedaleko Szumena jest Jeździec z Madary.'},
 {bg:'Русе',pl:'Ruse',f:'Русе е на Дунав и го наричат „Малката Виена”.',fpl:'Ruse leży nad Dunajem i nazywają je „Małym Wiedniem”.'},
 {bg:'Велико Търново',pl:'Wielkie Tyrnowo',f:'Велико Търново е била столица на България.',fpl:'Wielkie Tyrnowo było kiedyś stolicą Bułgarii.'},
 {bg:'Габрово',pl:'Gabrowo',f:'Габрово е столицата на хумора.',fpl:'Gabrowo to stolica humoru.'},
 {bg:'Плевен',pl:'Plewen',f:'В Плевен има панорама на битката от 1877 година.',fpl:'W Plewenie jest panorama bitwy z 1877 roku.'},
 {bg:'Видин',pl:'Widyń',f:'Във Видин е крепостта Баба Вида.',fpl:'W Widyniu stoi twierdza Baba Wida.'},
 {bg:'Белоградчик',pl:'Biełogradczik',f:'Белоградчишките скали са чудо на природата.',fpl:'Skały Biełogradczika to cud natury.'},
 {bg:'Рила',pl:'Riła',f:'Рилският манастир е най-големият в България.',fpl:'Monastyr Rylski jest największy w Bułgarii.'},
 {bg:'Банско',pl:'Bansko',f:'Банско е в подножието на Пирин.',fpl:'Bansko leży u stóp Pirinu.'},
 {bg:'Мелник',pl:'Mielnik',f:'Мелник е най-малкият град в България.',fpl:'Mielnik to najmniejsze miasto Bułgarii.'}
];

/* ---------------- ZWROTY: KIEDY SIĘ ODBLOKOWUJĄ ---------------- */
const PH_UNLOCK = {'Podstawy':'d0-1','Rozmowa':'d0-2','Czas':'d1-2','Zakupy':'d2-1','Restauracja':'d2-3','Nagłe sytuacje':'d3-1','Gdzie mam iść?':'d3-2','Lotnisko i aeroklub':'a0-1'};

/* ---------------- RZECZOWNIKI: rodzaj i forma z rodzajnikiem ----------------
   [bg, pl, rodzaj m/f/n, forma określona (podmiot), level, uwaga] */
const NOUNS = [
 ['кафе','kawa','n','кафето','d0-1','Rodzaj nijaki, choć po polsku „kawa” jest żeńska.'],['такси','taksówka','n','таксито','d0-1','Słowa obce na -и/-у/-ю są nijakie.'],['хотел','hotel','m','хотелът','d0-1'],['банка','bank','f','банката','d0-1','Po polsku męski, po bułgarsku żeński.'],['пилот','pilot','m','пилотът','d0-1'],['радио','radio','n','радиото','d0-1'],['телефон','telefon','m','телефонът','d0-1'],['аптека','apteka','f','аптеката','d0-1'],['ресторант','restauracja','m','ресторантът','d0-1','Po polsku żeńska, po bułgarsku męski.'],['паспорт','paszport','m','паспортът','d0-1'],
 ['час','godzina','m','часът','d1-2'],['минута','minuta','f','минутата','d1-2'],['време','czas / pogoda','n','времето','d1-2'],['седмица','tydzień','f','седмицата','d1-3'],['понеделник','poniedziałek','m','понеделникът','d1-3'],
 ['мляко','mleko','n','млякото','d2-1'],['хляб','chleb','m','хлябът','d2-1'],['вода','woda','f','водата','d2-1'],['сирене','ser biały','n','сиренето','d2-1'],['масло','masło / olej','n','маслото','d2-1'],['чай','herbata','m','чаят','d2-1','Męski na -й: rodzajnik -ят.'],['бира','piwo','f','бирата','d2-1'],['вино','wino','n','виното','d2-1'],
 ['магазин','sklep','m','магазинът','d2-2'],['каса','kasa','f','касата','d2-2'],['цена','cena','f','цената','d2-2'],['карта','karta','f','картата','d2-2'],
 ['меню','menu','n','менюто','d2-3'],['сметка','rachunek','f','сметката','d2-3'],['маса','stół','f','масата','d2-3'],['стол','krzesło','m','столът','d2-3'],['чаша','szklanka','f','чашата','d2-3'],['обяд','obiad','m','обядът','d2-3'],
 ['улица','ulica','f','улицата','d3-1'],['спирка','przystanek','f','спирката','d3-1'],['гара','dworzec','f','гарата','d3-1'],['център','centrum','m','центърът','d3-1'],['мост','most','m','мостът','d3-1'],['лекар','lekarz','m','лекарят','d3-1','Wyjątek: лекар → лекарят.'],
 ['автобус','autobus','m','автобусът','d3-3'],['влак','pociąg','m','влакът','d3-3'],['кола','samochód','f','колата','d3-3'],['билет','bilet','m','билетът','d3-3'],['летище','lotnisko','n','летището','d3-3'],
 ['самолет','samolot','m','самолетът','d4-4'],['писта','pas startowy','f','пистата','d4-4'],['крило','skrzydło','n','крилото','d4-4'],['нощ','noc','f','нощта','d4-4','Wyjątek: kończy się spółgłoską, a jest żeńska.'],['ден','dzień','m','денят','d4-4','Wyjątek: ден → денят.'],['двигател','silnik','m','двигателят','d4-4','Na -тел: rodzajnik -ят.'],['вятър','wiatr','m','вятърът','d4-4'],
 ['полет','lot','m','полетът','a0-1'],['хангар','hangar','m','хангарът','a0-1'],['кацане','lądowanie','n','кацането','a0-1','Rzeczowniki odczasownikowe na -не są nijakie.'],['излитане','start','n','излитането','a0-1'],
 ['опашка','ogon','f','опашката','a0-2'],['витло','śmigło','n','витлото','a0-2'],['кабина','kabina','f','кабината','a0-2'],['спирачка','hamulec','f','спирачката','a0-2'],['гориво','paliwo','n','горивото','a0-2'],['колело','koło','n','колелото','a0-2'],
 ['компас','kompas','m','компасът','a0-3'],['налягане','ciśnienie','n','налягането','a0-3'],['температура','temperatura','f','температурата','a0-3'],
 ['автожир','wiatrakowiec','m','автожирът','a1-1'],['ротор','wirnik','m','роторът','a1-1'],['мачта','maszt','f','мачтата','a1-1'],
 ['завой','zakręt','m','завоят','a1-2','Męski na -й: -ят.'],['скорост','prędkość','f','скоростта','a1-2','Na -ост: żeńskie, rodzajnik -та.'],['височина','wysokość','f','височината','a1-2'],
 ['колан','pas','m','коланът','a1-3'],['каска','kask','f','каската','a1-3'],['поле','pole','n','полето','a1-3'],
 ['облак','chmura','m','облакът','a2-1','Po polsku żeńska, po bułgarsku męski.'],['дъжд','deszcz','m','дъждът','a2-1'],['мъгла','mgła','f','мъглата','a2-1'],['видимост','widoczność','f','видимостта','a2-1','Na -ост: żeńskie, rodzajnik -та.'],
 ['кула','wieża','f','кулата','a2-2'],['разрешение','zezwolenie','n','разрешението','a2-2']
];

/* ---------------- GRY: PIOSENKI I WIERSZE ----------------
   Cytaty tylko z utworów sprzed 1929 r. (domena publiczna). Współczesne hity – pytania o tytuł i wykonawcę, bez tekstów. */
const SONGS = [
 {line:'Горда Стара планина, до ней Дунава синей', tr:'Dumna Stara Płanina, a obok niej błękitnieje Dunaj', o:['Мила Родино','Шуми Марица','Тих бял Дунав'], who:'Cwetan Radosławow, 1885', fact:'Od 1964 r. hymn Bułgarii. Napisał go student, który tęsknił za domem.'},
 {line:'Мила Родино, ти си земен рай', tr:'Miła Ojczyzno, jesteś rajem na ziemi', o:['Мила Родино','Хубава си, моя горо','Шуми Марица'], who:'refren hymnu Bułgarii', fact:'„Родина” to ojczyzna; forma „Родино” to wołacz – zwracamy się do niej.'},
 {line:'Шуми Марица окървавена', tr:'Szumi Marica, zakrwawiona', o:['Шуми Марица','Мила Родино','Тих бял Дунав'], who:'dawny hymn Bułgarii', fact:'Marica to rzeka płynąca przez Płowdiw. Pieśń była hymnem przed „Мила Родино”.'},
 {line:'Тих бял Дунав се вълнува', tr:'Cichy biały Dunaj faluje', o:['Радецки','Мила Родино','Излел е Дельо хайдутин'], who:'wiersz Iwana Wazowa, 1876', fact:'Pieśń o statku Radetzky, którym powstańcy Christo Botewa przepłynęli Dunaj.'},
 {line:'Хубава си, моя горо', tr:'Piękny jesteś, mój lesie', o:['Хубава си, моя горо','Шуми Марица','Радецки'], who:'wiersz Lubena Karawełowa', fact:'Pułapka: „гора” to LAS, nie góra. „горо” to wołacz od „гора”.'},
 {line:'Жив е той, жив е!', tr:'Żyje on, żyje!', o:['Хаджи Димитър','Радецки','Мила Родино'], who:'wiersz Christo Botewa, 1873', fact:'Najsłynniejszy bułgarski wiersz o powstańcu, który nie umiera w pamięci ludzi.'},
 {line:'Излел е Дельо хайдутин', tr:'Wyruszył Delo, hajduk', o:['Валя Балканска','Лили Иванова','Емил Димитров'], q:'Kto zaśpiewał tę pieśń ludową z Rodopów?', who:'pieśń ludowa, śpiew: Wala Bałkanska', fact:'Nagranie poleciało w kosmos na Złotej Płycie sond Voyager (1977).'}
];
const TRIVIA = [
 {q:'Kto śpiewa „Моя страна, моя България”?', o:['Емил Димитров','Лили Иванова','Щурците'], fact:'Emil Dimitrow nagrał ją w 1970 r.; tytuł znaczy „Mój kraj, moja Bułgaria”.'},
 {q:'Kto skomponował „Арлекино”, z którym Ałła Pugaczowa wygrała Złotego Orfeusza w 1975 r.?', o:['Емил Димитров','Васил Найденов','Валя Балканска'], fact:'Złoty Orfeusz to festiwal piosenki nad Morzem Czarnym, w Słonecznym Brzegu.'},
 {q:'Jak nazywa się legendarny bułgarski zespół rockowy, założony w 1967 r.?', o:['Щурците','ФСБ','Сигнал'], fact:'„Щурците” znaczy „Świerszcze”. Jeden z ich hitów to „Клетва” – „Przysięga”.'},
 {q:'Która piosenka jest jednym z wielkich przebojów Lili Iwanowej?', o:['Камино','Клетва','Вода'], fact:'Lili Iwanowa śpiewa od lat 60. i jest nazywana primadonną bułgarskiej estrady.'},
 {q:'Który utwór dał Bułgarii najlepszy wynik na Eurowizji – 2. miejsce w 2017 r.?', o:['Beautiful Mess','If Love Was a Crime','Вода'], fact:'Zaśpiewał go Kristian Kostow, miał wtedy 17 lat.'},
 {q:'Jak nazywał się bułgarski utwór z Eurowizji 2007 (5. miejsce) z bębnami i śpiewem ludowym?', o:['Вода','Камино','Арлекино'], fact:'„Вода” znaczy „woda”. Wykonali go Elica Todorowa i Stojan Jankułow.'}
];
/* fałszywi i prawdziwi przyjaciele: [bg, polski „podobny”, prawdziwe znaczenie] */
const FRIENDS = [
 ['маса','masa','stół'],['стол','stół','krzesło'],['направо','w prawo','prosto'],['час','czas','godzina'],['рано','rano','wcześnie'],['закуска','zakąska','śniadanie'],
 ['гора','góra','las'],['булка','bułka','panna młoda'],['ягода','jagoda','truskawka'],['дума','duma','słowo'],['кола','koło','samochód'],['сирене','syrena','biały ser'],
 ['лук','łuk','cebula'],['живот','brzuch','życie'],
 ['мляко','mleko','mleko'],['вода','woda','woda'],['хляб','chleb','chleb'],['майка','matka','matka'],['брат','brat','brat'],['питам','pytam','pytam'],['пилот','pilot','pilot'],['сестра','siostra','siostra']
];
