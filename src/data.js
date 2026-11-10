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
]},
/* ================= KONTYNUACJA KURSU (3 miesiące: A2 → B1) ================= */
/* ---------------- NA CO DZIEŃ: A2 ---------------- */
{ id:'d5', track:'day', cefr:'A2', bt:'За мен и семейството', t:'O sobie i rodzinie', levels:[
 { id:'d5-1', t:'Rodzina', bt:'Семейство',
   tip:`<p>„Mój, twój, jego” najczęściej wyrażasz <b>krótkim zaimkiem po rzeczowniku</b>: <span lang="bg">майка ми</span> (moja mama), <span lang="bg">брат ти</span> (twój brat), <span lang="bg">баща му</span> (jego tata), <span lang="bg">сестра ѝ</span> (jej siostra), <span lang="bg">децата ни / ви / им</span> (nasze / wasze / ich dzieci).</p>
   <p>Przy członkach rodziny w liczbie pojedynczej nie ma rodzajnika (<span lang="bg">майка ми</span>), ale przy <span lang="bg">съпруг, мъж</span> i w liczbie mnogiej jest: <span lang="bg">съпругът ми, родителите ми</span>.</p>`,
   w:[['matka','майка'],['ojciec','баща'],['brat','брат'],['siostra','сестра'],['syn','син'],['córka','дъщеря'],['mąż','съпруг|мъж'],['żona','съпруга|жена'],['babcia','баба'],['dziadek','дядо'],['dzieci','деца'],['rodzice','родители']],
   s:[['Moja mama jest lekarką.','Майка ми е лекарка.'],['Mam brata i siostrę.','Имам брат и сестра.'],['Mój mąż jest pilotem.','Съпругът ми е пилот.|Мъжът ми е пилот.'],['Jak ma na imię twoja córka?','Как се казва дъщеря ти?'],['Moi rodzice mieszkają w Krakowie.','Родителите ми живеят в Краков.'],['Mamy dwoje dzieci.','Имаме две деца.']],
   g:[{s:'Майка ___ е лекарка.',o:['ми','мой','мене'],pl:'Moja mama jest lekarką.',why:'Krótki zaimek dzierżawczy stoi po rzeczowniku: майка ми.'},
      {s:'Съпругът ___ е пилот.',o:['ми','ме','аз'],pl:'Mój mąż jest pilotem.',why:'Przy <span lang="bg">съпруг</span> jest rodzajnik: съпругът ми.'},
      {s:'Как се казва сестра ___?',o:['ѝ','я','тя'],pl:'Jak ma na imię jej siostra?',why:'ѝ = jej, му = jego, им = ich.'},
      {s:'Имаме две ___.',o:['деца','дете','децата'],pl:'Mamy dwoje dzieci.'}]},
 { id:'d5-2', t:'Wygląd i charakter', bt:'Външност и характер',
   tip:`<p>Przymiotnik zgadza się z rzeczownikiem: <span lang="bg">висок мъж, висока жена, високо дете, високи хора</span>. Końcówki: męski – spółgłoska, żeński <b>-а</b>, nijaki <b>-о</b>, mnoga <b>-и</b>.</p>
   <p>Gdy mówisz o sobie, używasz formy żeńskiej: <span lang="bg">уморена съм, щастлива съм</span>.</p>`,
   w:[['wysoki','висок|висока'],['niski','нисък|ниска'],['młody','млад|млада'],['stary','стар|стара'],['ładny','хубав|красив|хубава|красива'],['miły','мил|приятен|мила|приятна'],['mądry','умен|умна'],['wesoły','весел|весела'],['spokojny','спокоен|спокойна'],['zmęczona','уморена|уморен'],['włosy','коса','коса = włosy na głowie'],['oczy','очи']],
   s:[['Mój brat jest wysoki.','Брат ми е висок.'],['Moja siostra jest bardzo miła.','Сестра ми е много мила.'],['Jestem zmęczona.','Уморена съм.|Аз съм уморена.'],['Ona ma długie włosy.','Тя има дълга коса.'],['Dzieci są wesołe.','Децата са весели.'],['On ma niebieskie oczy.','Той има сини очи.']],
   g:[{s:'Сестра ми е ___.',o:['висока','висок','високи'],pl:'Moja siostra jest wysoka.'},
      {s:'Децата са ___.',o:['весели','весел','весела'],pl:'Dzieci są wesołe.',why:'Liczba mnoga: -и.'},
      {s:'Аз съм ___.',o:['уморена','уморен','уморено'],pl:'Jestem zmęczona.',why:'Kobieta mówi o sobie w rodzaju żeńskim.'},
      {q:'Bułgarskie „коса” (na głowie) to…',o:['włosy','warkocz','broda']}]},
 { id:'d5-3', t:'Zawody', bt:'Професии',
   tip:`<p>Wiele zawodów ma formę żeńską: <span lang="bg">учител → учителка, лекар → лекарка, студент → студентка, продавач → продавачка</span>. Przy <span lang="bg">пилот, инженер</span> forma jest wspólna.</p>
   <p>„Jako” = <b lang="bg">като</b>: <span lang="bg">Работя като инженер.</span> Pytanie o pracę: <span lang="bg">Какво работиш?</span></p>`,
   w:[['nauczycielka','учителка'],['lekarka','лекарка'],['inżynier','инженер'],['pielęgniarka','медицинска сестра'],['kierowca','шофьор'],['sprzedawczyni','продавачка'],['programistka','програмистка'],['studentka','студентка'],['firma','фирма'],['biuro','офис'],['praca','работа'],['pensja','заплата']],
   s:[['Czym się zajmujesz?','Какво работиш?'],['Jestem studentką.','Студентка съм.|Аз съм студентка.'],['Pracuję w biurze.','Работя в офис.'],['Moja siostra jest nauczycielką.','Сестра ми е учителка.'],['Szukam pracy.','Търся работа.'],['Pracuję jako inżynier.','Работя като инженер.']],
   g:[{s:'Работя ___ инженер.',o:['като','за','как'],pl:'Pracuję jako inżynier.'},
      {q:'Forma żeńska od „учител” to…',o:['учителка','учителица','учителя']},
      {s:'Какво ___?',o:['работиш','работа','работен'],pl:'Czym się zajmujesz?'},
      {q:'„заплата” to…',o:['pensja','kara','podatek']}]},
 { id:'d5-4', t:'Duże liczby i wiek', bt:'Големи числа',
   tip:`<p>Setki: <span lang="bg">сто, двеста, триста, четиристотин, петстотин, шестстотин…</span> Tysiące: <span lang="bg">хиляда, две хиляди, три хиляди</span>.</p>
   <p>Wiek: <span lang="bg">На колко години си?</span> – <span lang="bg">На трийсет години съм.</span> (dosł. „Na trzydzieści lat jestem”).</p>`,
   w:[['dwieście','двеста'],['trzysta','триста'],['czterysta','четиристотин'],['pięćset','петстотин'],['tysiąc','хиляда'],['dwa tysiące','две хиляди'],['milion','милион'],['rok','година'],['wiek (lat)','възраст'],['urodziny','рожден ден'],['pierwszy','първи|първа'],['ostatni','последен|последна']],
   s:[['Ile masz lat?','На колко години си?'],['Mam dwadzieścia pięć lat.','На двайсет и пет години съм.|На двадесет и пет години съм.'],['Kiedy masz urodziny?','Кога ти е рожденият ден?'],['Mam urodziny w maju.','Рожденият ми ден е през май.|Рожденият ми ден е в май.'],['To kosztuje trzysta euro.','Това струва триста евро.'],['Lotnisko jest dwieście kilometrów stąd.','Летището е на двеста километра оттук.']],
   g:[{q:'500 to…',o:['петстотин','петсто','пет хиляди']},
      {q:'200 to…',o:['двеста','двесто','двестотин']},
      {s:'На колко ___ си?',o:['години','година','годината'],pl:'Ile masz lat?'},
      {q:'2000 to…',o:['две хиляди','два хиляди','двеста']}]},
 { id:'d5-5', t:'Poznajmy się', bt:'Да се запознаем',
   tip:`<p>Słowa pytające: <span lang="bg">кой</span> (kto), <span lang="bg">какво</span> (co), <span lang="bg">къде</span> (gdzie), <span lang="bg">откъде</span> (skąd), <span lang="bg">кога</span> (kiedy), <span lang="bg">защо</span> (dlaczego), <span lang="bg">как</span> (jak), <span lang="bg">колко</span> (ile).</p>
   <p>„Który/kto” zmienia się z rodzajem: <span lang="bg">кой</span> (m), <span lang="bg">коя</span> (ż), <span lang="bg">кое</span> (n), <span lang="bg">кои</span> (l.mn.).</p>`,
   w:[['kto','кой|коя'],['co','какво'],['gdzie','къде'],['skąd','откъде'],['kiedy','кога'],['dlaczego','защо'],['jak','как'],['ile','колко'],['język','език'],['kraj','страна|държава'],['hobby','хоби'],['przyjaciółka','приятелка']],
   s:[['Skąd jesteś?','Откъде си?'],['Dlaczego uczysz się bułgarskiego?','Защо учиш български?'],['Uczę się bułgarskiego, bo lubię Bułgarię.','Уча български, защото обичам България.'],['Moim hobby jest latanie.','Хобито ми е летенето.'],['Kto to jest?','Кой е това?'],['Która to twoja siostra?','Коя е сестра ти?']],
   g:[{s:'___ си? – От Полша.',o:['Откъде','Къде','Кога'],pl:'Skąd jesteś? – Z Polski.'},
      {s:'___ е сестра ти?',o:['Коя','Кой','Кое'],pl:'Która to twoja siostra?',why:'Rodzaj żeński: коя.'},
      {s:'___ учиш български?',o:['Защо','Колко','Откъде'],pl:'Dlaczego uczysz się bułgarskiego?'},
      {s:'Хобито ___ е летенето.',o:['ми','ме','мой'],pl:'Moim hobby jest latanie.'}]}
]},
{ id:'d6', track:'day', cefr:'A2', bt:'Дом и ежедневие', t:'Dom i codzienność', levels:[
 { id:'d6-1', t:'Mieszkanie', bt:'Жилище',
   tip:`<p>„Jest / są” w sensie „istnieje” to <b lang="bg">има</b>, a „nie ma” – <b lang="bg">няма</b> (nigdy „не има”): <span lang="bg">Има ли асансьор? – Няма.</span></p>
   <p>Po przyimku rzeczownik męski ma krótki rodzajnik: <span lang="bg">на третия етаж</span>.</p>`,
   w:[['mieszkanie','апартамент'],['dom','къща'],['pokój','стая'],['kuchnia','кухня'],['łazienka','баня'],['sypialnia','спалня'],['balkon','балкон|тераса'],['piętro','етаж'],['winda','асансьор'],['klucz','ключ'],['okno','прозорец'],['łóżko','легло']],
   s:[['Mieszkam w małym mieszkaniu.','Живея в малък апартамент.'],['Mieszkanie ma dwa pokoje.','Апартаментът има две стаи.'],['Czy jest winda?','Има ли асансьор?'],['Nie ma windy.','Няма асансьор.'],['Mieszkam na trzecim piętrze.','Живея на третия етаж.'],['Zgubiłam klucz.','Изгубих ключа.|Загубих ключа.']],
   g:[{s:'___ ли асансьор?',o:['Има','Е','Са'],pl:'Czy jest winda?'},
      {s:'___ асансьор.',o:['Няма','Не има','Не е'],pl:'Nie ma windy.',why:'„nie ma” = няма.'},
      {s:'Живея на ___ етаж.',o:['третия','трети','третият'],pl:'Mieszkam na trzecim piętrze.',why:'Po przyimku: krótki rodzajnik.'},
      {q:'Liczba mnoga od „стая” to…',o:['стаи','стайове','стаета']}]},
 { id:'d6-2', t:'Mój dzień', bt:'Моят ден',
   tip:`<p>Czasowniki zwrotne mają <b lang="bg">се</b> (się) albo <b lang="bg">си</b> (sobie): <span lang="bg">събуждам се, обличам се, лягам си</span>.</p>
   <p><span lang="bg">се</span> nie może stać na początku zdania: <span lang="bg">Събуждам се.</span> albo <span lang="bg">Аз се събуждам.</span></p>`,
   w:[['budzić się','събуждам се'],['wstawać','ставам'],['myć się','мия се'],['ubierać się','обличам се'],['jeść śniadanie','закусвам'],['wracać do domu','прибирам се'],['gotować','готвя'],['sprzątać','чистя'],['spać','спя'],['kłaść się spać','лягам си'],['zawsze','винаги'],['czasami','понякога']],
   s:[['Budzę się o siódmej.','Събуждам се в седем.'],['Najpierw piję kawę.','Първо пия кафе.'],['Wracam do domu wieczorem.','Прибирам се вечер.|Прибирам се вечерта.'],['Zawsze jem śniadanie.','Винаги закусвам.'],['Czasami gotuję obiad.','Понякога готвя обяд.'],['Kładę się spać o jedenastej.','Лягам си в единайсет.|Лягам си в единадесет.']],
   g:[{s:'Събуждам ___ в седем.',o:['се','си','ме'],pl:'Budzę się o siódmej.'},
      {s:'Лягам ___ в единайсет.',o:['си','се','ми'],pl:'Kładę się spać o jedenastej.',why:'лягам си = kładę się (spać).'},
      {s:'Аз ___ закусвам.',o:['винаги','никъде','кога'],pl:'Zawsze jem śniadanie.'},
      {s:'Децата ___ в осем.',o:['стават','ставам','става'],pl:'Dzieci wstają o ósmej.'}]},
 { id:'d6-3', t:'Jak często?', bt:'Колко често?',
   tip:`<p>Częstotliwość: <span lang="bg">всеки ден, два пъти седмично, често, рядко, никога</span>. Jak w polskim: podwójne przeczenie – <span lang="bg">Никога не летя нощем.</span></p>
   <p><span lang="bg">си</span> może znaczyć „swój”: <span lang="bg">в свободното си време</span> – w swoim wolnym czasie.</p>`,
   w:[['codziennie','всеки ден'],['raz','веднъж'],['dwa razy','два пъти'],['tygodniowo','седмично|на седмица'],['rzadko','рядко'],['często','често'],['nigdy','никога'],['zwykle','обикновено'],['weekend','уикенд'],['wolny czas','свободно време'],['trenować','тренирам'],['spacerować','разхождам се']],
   s:[['Latam dwa razy w tygodniu.','Летя два пъти седмично.|Летя два пъти на седмица.'],['Nigdy nie latam w nocy.','Никога не летя нощем.|Никога не летя през нощта.'],['Zwykle pracuję do piątej.','Обикновено работя до пет.'],['Co robisz w wolnym czasie?','Какво правиш в свободното си време?'],['Rzadko oglądam telewizję.','Рядко гледам телевизия.'],['W weekend spaceruję w parku.','През уикенда се разхождам в парка.']],
   g:[{s:'Никога ___ летя нощем.',o:['не','ни','няма'],pl:'Nigdy nie latam w nocy.',why:'Jak w polskim: никога не.'},
      {s:'Летя два ___ седмично.',o:['пъти','път','пътя'],pl:'Latam dwa razy w tygodniu.'},
      {s:'Какво правиш в свободното ___ време?',o:['си','се','са'],pl:'Co robisz w wolnym czasie?',why:'си = swój.'},
      {s:'През уикенда ___ разхождам в парка.',o:['се','си','ме'],pl:'W weekend spaceruję w parku.'}]},
 { id:'d6-4', t:'Robić czy zrobić?', bt:'Вид на глагола',
   tip:`<p>Jak w polskim są pary: niedokonany <span lang="bg">купувам</span> (kupuję) i dokonany <span lang="bg">купя</span> (kupię).</p>
   <p>Formy dokonanej używasz po <b lang="bg">да</b> i <b lang="bg">ще</b>: <span lang="bg">Искам да купя хляб. Ще купя хляб.</span> To, co dzieje się teraz, mówisz formą niedokonaną: <span lang="bg">Сега купувам хляб.</span></p>`,
   w:[['kupować','купувам'],['kupić','купя'],['pisać','пиша'],['napisać','напиша'],['robić','правя'],['zrobić','направя'],['dzwonić','обаждам се'],['zadzwonić','обадя се'],['otwierać','отварям'],['otworzyć','отворя'],['zamykać','затварям'],['zamknąć','затворя']],
   s:[['Chcę kupić chleb.','Искам да купя хляб.'],['Teraz piszę list.','Сега пиша писмо.'],['Napiszę jutro.','Ще напиша утре.|Утре ще напиша.'],['Możesz otworzyć okno?','Можеш ли да отвориш прозореца?'],['Zamykamy o szóstej.','Затваряме в шест.'],['Zadzwonię do ciebie.','Ще ти се обадя.']],
   g:[{s:'Искам да ___ хляб.',o:['купя','купих','купуваше'],pl:'Chcę kupić chleb.',why:'Po да o jednej czynności: forma dokonana.'},
      {s:'Сега ___ писмо.',o:['пиша','напиша','написах'],pl:'Teraz piszę list.',why:'To, co dzieje się teraz: forma niedokonana.'},
      {s:'Можеш ли да ___ прозореца?',o:['отвориш','отворих','отваряше'],pl:'Możesz otworzyć okno?'},
      {s:'Ще ти се ___.',o:['обадя','обадих','обаждах'],pl:'Zadzwonię do ciebie.'}]},
 { id:'d6-5', t:'Pory roku i daty', bt:'Сезони и дати',
   tip:`<p>Miesiące są podobne do łacińskich: <span lang="bg">януари, февруари, март, април, май, юни, юли, август, септември, октомври, ноември, декември</span>.</p>
   <p>„Latem” = <b lang="bg">през лятото</b>. Data: <span lang="bg">Днес е десети ноември.</span> (liczebnik porządkowy, miesiąc bez zmian). <span lang="bg">пролет</span> i <span lang="bg">есен</span> są rodzaju żeńskiego: <span lang="bg">пролетта, есента</span>.</p>`,
   w:[['wiosna','пролет'],['lato','лято'],['jesień','есен'],['zima','зима'],['styczeń','януари'],['marzec','март'],['lipiec','юли'],['październik','октомври'],['grudzień','декември'],['śnieg','сняг'],['gorąco','горещо'],['święta','празници']],
   s:[['Latem jest bardzo gorąco.','През лятото е много горещо.'],['Zimą pada śnieg.','През зимата вали сняг.'],['Lubię wiosnę.','Обичам пролетта.'],['Przyjadę w październiku.','Ще дойда през октомври.|Ще дойда в октомври.'],['Którego jest dzisiaj?','Коя дата е днес?'],['Dzisiaj jest dziesiąty listopada.','Днес е десети ноември.']],
   g:[{s:'___ лятото е много горещо.',o:['През','На','До'],pl:'Latem jest bardzo gorąco.'},
      {s:'Обичам ___.',o:['пролетта','пролетът','пролетто'],pl:'Lubię wiosnę.',why:'пролет – rodzaj żeński → пролетта.'},
      {s:'Днес е ___ ноември.',o:['десети','десет','десетия'],pl:'Dzisiaj jest dziesiąty listopada.'},
      {q:'„есен” to…',o:['jesień','wiosna','zima']}]}
]},
{ id:'d7', track:'day', cefr:'A2', bt:'Здраве', t:'Zdrowie', levels:[
 { id:'d7-1', t:'Ciało', bt:'Тялото',
   tip:`<p>Kilka części ciała ma nieregularną liczbę mnogą: <span lang="bg">око → очи, ухо → уши, ръка → ръце, крак → крака</span>.</p>
   <p>Gdy mówisz o własnym ciele, często dodajesz <b lang="bg">си</b>: <span lang="bg">Измий си ръцете.</span> – Umyj (sobie) ręce.</p>`,
   w:[['głowa','глава'],['ręka','ръка'],['noga','крак'],['oko','око'],['ucho','ухо'],['brzuch','корем'],['plecy','гръб'],['gardło','гърло'],['ząb','зъб'],['serce','сърце'],['ręce','ръце'],['uszy','уши']],
   s:[['Mam zimne ręce.','Ръцете ми са студени.'],['To jest moja prawa ręka.','Това е дясната ми ръка.'],['Umyj ręce.','Измий си ръцете.'],['Zamknij oczy.','Затвори очи.|Затвори си очите.'],['Serce bije szybko.','Сърцето бие бързо.'],['Załóż słuchawki na uszy.','Сложи слушалките на ушите.|Сложи си слушалките.']],
   g:[{q:'Liczba mnoga od „око”',o:['очи','ока','окове']},
      {q:'Liczba mnoga od „ръка”',o:['ръце','ръки','ръкове']},
      {s:'Измий си ___.',o:['ръцете','ръцето','ръкът'],pl:'Umyj ręce.'},
      {s:'Сърцето ___ бързо.',o:['бие','бия','бият'],pl:'Serce bije szybko.'}]},
 { id:'d7-2', t:'Co cię boli?', bt:'Какво те боли?',
   tip:`<p>„Boli mnie głowa” = <b lang="bg">Боли ме главата.</b> Krótki zaimek w bierniku: <span lang="bg">ме</span> (mnie), <span lang="bg">те</span> (ciebie), <span lang="bg">го</span> (jego), <span lang="bg">я</span> (ją).</p>
   <p>Gdy boli kilka rzeczy, czasownik jest w liczbie mnogiej: <span lang="bg">Болят ме краката.</span></p>`,
   w:[['boli','боли'],['gorączka','температура'],['kaszel','кашлица'],['katar','хрема'],['przeziębienie','настинка'],['chora','болна|болен'],['zdrowa','здрава|здрав'],['ból','болка'],['alergia','алергия'],['zawroty głowy','световъртеж'],['mdłości','гадене'],['czuć się','чувствам се']],
   s:[['Boli mnie głowa.','Боли ме главата.|Боли ме глава.'],['Bolą mnie nogi.','Болят ме краката.'],['Mam gorączkę.','Имам температура.'],['Jestem chora.','Болна съм.|Аз съм болна.'],['Źle się czuję.','Чувствам се зле.|Не се чувствам добре.'],['Co cię boli?','Какво те боли?']],
   g:[{s:'Боли ___ главата.',o:['ме','ми','аз'],pl:'Boli mnie głowa.'},
      {s:'___ ме краката.',o:['Болят','Боли','Болим'],pl:'Bolą mnie nogi.',why:'Bolą nogi (l. mnoga) → болят.'},
      {s:'Аз съм ___.',o:['болна','болен','болно'],pl:'Jestem chora.'},
      {s:'Чувствам ___ зле.',o:['се','си','ме'],pl:'Źle się czuję.'}]},
 { id:'d7-3', t:'U lekarza', bt:'При лекаря',
   tip:`<p>Lekarz mówi formą grzeczną (<b>-йте / -ете</b>): <span lang="bg">Седнете. Отворете уста. Дишайте дълбоко.</span></p>
   <p>„Wizyta” to <b lang="bg">час</b>: <span lang="bg">Имам час при лекар.</span> „U” (u kogoś) = <b lang="bg">при</b>.</p>`,
   w:[['wizyta (umówiona)','час'],['recepta','рецепта'],['lekarstwo','лекарство'],['tabletka','хапче|таблетка'],['badanie','преглед'],['pogotowie','бърза помощ'],['ubezpieczenie','осигуровка|застраховка'],['dentysta','зъболекар'],['ciśnienie krwi','кръвно налягане|кръвно'],['zastrzyk','инжекция'],['oddychać','дишам'],['połykać','гълтам']],
   s:[['Mam wizytę u lekarza.','Имам час при лекар.|Имам час при лекаря.'],['Proszę głęboko oddychać.','Дишайте дълбоко.'],['Proszę brać jedną tabletkę trzy razy dziennie.','Пийте по едно хапче три пъти на ден.'],['Proszę wezwać pogotowie!','Извикайте бърза помощ!'],['Potrzebuję recepty.','Трябва ми рецепта.'],['Boli mnie, kiedy połykam.','Боли ме, когато гълтам.']],
   g:[{s:'Имам час ___ лекаря.',o:['при','на','за'],pl:'Mam wizytę u lekarza.'},
      {s:'___ дълбоко.',o:['Дишайте','Дишах','Дишаха'],pl:'Proszę głęboko oddychać.'},
      {s:'Пийте по едно хапче три ___ на ден.',o:['пъти','път','часа'],pl:'Proszę brać jedną tabletkę trzy razy dziennie.'},
      {q:'„бърза помощ” to…',o:['pogotowie','szybka obsługa','straż pożarna']}]},
 { id:'d7-4', t:'W aptece', bt:'В аптеката',
   tip:`<p>„Coś na kaszel” = <b lang="bg">нещо против кашлица</b> (dosł. przeciw kaszlowi).</p>
   <p>Pytanie tworzysz słówkiem <b lang="bg">ли</b> po wyrazie, o który pytasz: <span lang="bg">Това без рецепта ли е?</span> – Czy to jest bez recepty?</p>`,
   w:[['coś na…','нещо против'],['plaster','лепенка|пластир'],['bandaż','бинт'],['krople','капки'],['syrop','сироп'],['maść','мехлем'],['środek przeciwbólowy','обезболяващо'],['bez recepty','без рецепта'],['dawka','доза'],['przed jedzeniem','преди ядене'],['po jedzeniu','след ядене'],['krem z filtrem','слънцезащитен крем']],
   s:[['Ma pani coś na kaszel?','Имате ли нещо против кашлица?'],['Potrzebuję czegoś przeciwbólowego.','Трябва ми нещо обезболяващо.'],['Czy to jest bez recepty?','Това без рецепта ли е?'],['Proszę brać po jedzeniu.','Пийте го след ядене.|Вземайте го след ядене.'],['Poproszę plastry.','Лепенки, моля.|Дайте ми лепенки, моля.']],
   g:[{s:'Имате ли нещо ___ кашлица?',o:['против','през','над'],pl:'Ma pani coś na kaszel?'},
      {s:'Пийте го ___ ядене.',o:['след','през','между'],pl:'Proszę brać po jedzeniu.'},
      {s:'Това без рецепта ___ е?',o:['ли','се','да'],pl:'Czy to jest bez recepty?'},
      {q:'„мехлем” to…',o:['maść','miód','syrop']}]},
 { id:'d7-5', t:'Nagłe wypadki', bt:'Спешни случаи',
   tip:`<p>Numer alarmowy w Bułgarii to <b>112</b>. „Zadzwońcie!” = <span lang="bg">Обадете се!</span></p>
   <p>„Był / była (jakiś)” = <b lang="bg">имаше</b>: <span lang="bg">Имаше катастрофа.</span> – Był wypadek. Wypadek drogowy to <span lang="bg">катастрофа</span>, inny – <span lang="bg">злополука</span>.</p>`,
   w:[['pomoc','помощ'],['wypadek (drogowy)','катастрофа'],['wypadek','злополука|инцидент'],['ranny','ранен|ранена'],['krew','кръв'],['pożar','пожар'],['straż pożarna','пожарна'],['złamać','счупя'],['skręcić (kostkę)','навехна'],['upaść','падна'],['niebezpieczny','опасен|опасна|опасно'],['przytomny','в съзнание']],
   s:[['Pomocy!','Помощ!'],['Proszę zadzwonić pod 112!','Обадете се на 112!'],['Upadłam i skręciłam nogę.','Паднах и си навехнах крака.'],['Chyba złamałam rękę.','Мисля, че си счупих ръката.'],['On jest przytomny.','Той е в съзнание.'],['Był wypadek na drodze.','Имаше катастрофа на пътя.']],
   g:[{s:'Паднах и си ___ крака.',o:['навехнах','навяхвам','ще навехна'],pl:'Upadłam i skręciłam nogę.'},
      {s:'___ се на 112!',o:['Обадете','Обаждам','Обадих'],pl:'Proszę zadzwonić pod 112!'},
      {s:'___ катастрофа на пътя.',o:['Имаше','Имах','Имаме'],pl:'Był wypadek na drodze.',why:'„był (jakiś)” = имаше.'},
      {q:'„пожар” to…',o:['pożar','pożądanie','burza']}]}
]},
{ id:'d8', track:'day', cefr:'A2', bt:'Пътуване и нощувка', t:'Podróże i nocleg', levels:[
 { id:'d8-1', t:'Rezerwacja', bt:'Резервация',
   tip:`<p>„Chciałabym zarezerwować” = <b lang="bg">Бих искала да резервирам</b>. „Na dwie noce” – <span lang="bg">за две нощувки</span>.</p>
   <p>„Na nazwisko” = <b lang="bg">на името</b>: <span lang="bg">резервация на името Ковалска</span>.</p>`,
   w:[['rezerwacja','резервация'],['pokój jednoosobowy','единична стая'],['pokój dwuosobowy','двойна стая'],['nocleg','нощувка'],['ze śniadaniem','със закуска'],['wolny pokój','свободна стая'],['recepcja','рецепция'],['zameldować się','настаня се'],['wymeldować się','напусна'],['cena za noc','цена за нощувка'],['potwierdzenie','потвърждение'],['zaliczka','депозит|капаро']],
   s:[['Chciałabym zarezerwować pokój.','Бих искала да резервирам стая.|Искам да резервирам стая.'],['Na dwie noce.','За две нощувки.|За две нощи.'],['Czy macie wolny pokój?','Имате ли свободна стая?'],['Czy śniadanie jest wliczone?','Закуската включена ли е?'],['Mam rezerwację na nazwisko Kowalska.','Имам резервация на името Ковалска.'],['O której muszę zwolnić pokój?','В колко часа трябва да напусна стаята?']],
   g:[{s:'Бих искала да ___ стая.',o:['резервирам','резервирах','резервираш'],pl:'Chciałabym zarezerwować pokój.'},
      {s:'Имам резервация ___ името Ковалска.',o:['на','за','от'],pl:'Mam rezerwację na nazwisko Kowalska.'},
      {s:'Закуската включена ___ е?',o:['ли','да','се'],pl:'Czy śniadanie jest wliczone?'},
      {q:'„двойна стая” to…',o:['pokój dwuosobowy','podwójna cena','dwa pokoje']}]},
 { id:'d8-2', t:'W hotelu', bt:'В хотела',
   tip:`<p>Bardzo grzeczna prośba: <b lang="bg">Бихте ли…?</b> (Czy mógłby pan / mogłaby pani…?) <span lang="bg">Бихте ли ми дали още една кърпа?</span></p>
   <p>Zgłaszanie problemów: <span lang="bg">… не работи, няма …, … е счупен</span>.</p>`,
   w:[['ręcznik','кърпа|хавлия'],['poduszka','възглавница'],['koc','одеяло'],['klimatyzacja','климатик'],['ciepła woda','топла вода'],['hasło','парола'],['zepsuty','счупен|развален'],['hałas','шум'],['głośny','шумен|шумна'],['czysty','чист|чиста'],['brudny','мръсен|мръсна'],['sprzątanie','почистване']],
   s:[['Klimatyzacja nie działa.','Климатикът не работи.'],['Nie ma ciepłej wody.','Няма топла вода.'],['Czy mógłby pan dać mi jeszcze jeden ręcznik?','Бихте ли ми дали още една кърпа?'],['Jakie jest hasło do wifi?','Каква е паролата за уайфая?|Каква е паролата за интернета?'],['Pokój jest bardzo głośny.','Стаята е много шумна.'],['Czy mogę zostawić bagaż?','Може ли да оставя багажа си?']],
   g:[{s:'Климатикът не ___.',o:['работи','работа','работят'],pl:'Klimatyzacja nie działa.'},
      {s:'Бихте ли ___ дали още една кърпа?',o:['ми','ме','аз'],pl:'Czy mógłby pan dać mi jeszcze jeden ręcznik?',why:'Komu? – ми.'},
      {s:'Стаята е много ___.',o:['шумна','шумен','шумно'],pl:'Pokój jest bardzo głośny.',why:'стая – rodzaj żeński.'},
      {s:'Може ли да ___ багажа си?',o:['оставя','оставих','оставиха'],pl:'Czy mogę zostawić bagaż?'}]},
 { id:'d8-3', t:'Wycieczka', bt:'Екскурзия',
   tip:`<p>Warunek realny: <b lang="bg">Ако</b> + czas teraźniejszy, <b lang="bg">ще</b> + czasownik: <span lang="bg">Ако имам време, ще отида на море.</span> Po <span lang="bg">ако</span> nie dajesz <span lang="bg">ще</span>!</p>
   <p>„Nad morze / w góry” = <span lang="bg">на море / на планина</span>.</p>`,
   w:[['wycieczka','екскурзия'],['zwiedzać','разглеждам'],['muzeum','музей'],['klasztor','манастир'],['twierdza','крепост'],['góry','планина'],['morze','море'],['plaża','плаж'],['przewodnik (osoba)','екскурзовод'],['mapa','карта'],['zabytek','забележителност'],['bilet wstępu','входен билет']],
   s:[['Chciałabym zobaczyć Monastyr Rylski.','Бих искала да видя Рилския манастир.'],['Jeśli będę mieć czas, pojadę nad morze.','Ако имам време, ще отида на море.'],['Ile kosztuje bilet wstępu?','Колко струва входният билет?'],['Czy jest przewodnik po polsku?','Има ли екскурзовод на полски?'],['Jakie zabytki warto zobaczyć?','Кои забележителности си струва да се видят?'],['Idziemy w góry.','Отиваме на планина.']],
   g:[{s:'Ако имам време, ___ отида на море.',o:['ще','бих','бях'],pl:'Jeśli będę mieć czas, pojadę nad morze.'},
      {s:'Бих искала да видя ___ манастир.',o:['Рилския','Рилският','Рилска'],pl:'Chciałabym zobaczyć Monastyr Rylski.',why:'Dopełnienie męskie: krótki rodzajnik -я.'},
      {s:'Колко струва ___ билет?',o:['входният','входния','входна'],pl:'Ile kosztuje bilet wstępu?',why:'Podmiot męski: pełny rodzajnik -ят.'},
      {q:'„отивам на море” znaczy…',o:['jadę nad morze','płynę po morzu','kąpię się w morzu']}]},
 { id:'d8-4', t:'Na drodze', bt:'На пътя',
   tip:`<p>Na stacji: <span lang="bg">Пълен резервоар, моля.</span> – Do pełna, proszę. Na bułgarskich drogach potrzebna jest <span lang="bg">винетка</span> (elektroniczna).</p>
   <p><b>Pułapka:</b> <span lang="bg">гума</span> w samochodzie to opona.</p>`,
   w:[['droga','път'],['autostrada','магистрала'],['stacja benzynowa','бензиностанция'],['benzyna','бензин'],['parking','паркинг'],['prawo jazdy','шофьорска книжка'],['winieta','винетка'],['korek (na drodze)','задръстване'],['skrzyżowanie','кръстовище'],['sygnalizacja świetlna','светофар'],['mandat','глоба'],['opona','гума','Pułapka: гума = opona']],
   s:[['Gdzie jest najbliższa stacja benzynowa?','Къде е най-близката бензиностанция?'],['Do pełna, proszę.','Пълен резервоар, моля.|До пълно, моля.'],['Czy mogę tu zaparkować?','Може ли да паркирам тук?'],['Złapaliśmy gumę.','Спукахме гума.'],['Na autostradzie jest korek.','На магистралата има задръстване.'],['Potrzebuję winiety.','Трябва ми винетка.']],
   g:[{s:'Може ли да ___ тук?',o:['паркирам','паркирах','паркираха'],pl:'Czy mogę tu zaparkować?'},
      {s:'На ___ има задръстване.',o:['магистралата','магистралът','магистралато'],pl:'Na autostradzie jest korek.'},
      {q:'„гума” w samochodzie to…',o:['opona','kierownica','bagażnik']},
      {q:'„светофар” to…',o:['sygnalizacja świetlna','latarnia morska','reflektor']}]},
 { id:'d8-5', t:'Pasażerka', bt:'Пътничка',
   tip:`<p>Wsiadać / wysiadać: <span lang="bg">качвам се / слизам</span>. Przesiadka: <span lang="bg">прекачване</span>.</p>
   <p>„Opóźniony o godzinę” = <span lang="bg">закъснява с един час</span> – różnicę podajesz przyimkiem <b lang="bg">с</b>.</p>`,
   w:[['pasażerka','пътничка'],['wsiadać','качвам се'],['wysiadać','слизам'],['przesiadka','прекачване'],['miejsce przy oknie','място до прозореца'],['bagaż podręczny','ръчен багаж'],['kontrola bezpieczeństwa','проверка за сигурност'],['karta pokładowa','бордна карта'],['walizka','куфар'],['zagubiony bagaż','изгубен багаж'],['następny','следващ|следваща'],['przylecieć / przyjechać','пристигна']],
   s:[['Gdzie mam się przesiąść?','Къде трябва да се прекача?'],['Poproszę miejsce przy oknie.','Място до прозореца, моля.'],['Moja walizka zginęła.','Куфарът ми се изгуби.'],['Lot jest opóźniony o godzinę.','Полетът закъснява с един час.|Полетът закъснява с час.'],['Wysiadam na następnym przystanku.','Слизам на следващата спирка.'],['Przylecę o ósmej.','Ще пристигна в осем.']],
   g:[{s:'Полетът закъснява ___ час.',o:['с','за','на'],pl:'Lot jest opóźniony o godzinę.'},
      {s:'Куфарът ___ се изгуби.',o:['ми','ме','мой'],pl:'Moja walizka zginęła.'},
      {s:'Слизам на ___ спирка.',o:['следващата','следващия','следващото'],pl:'Wysiadam na następnym przystanku.'},
      {s:'Къде трябва да се ___?',o:['прекача','прекачих','прекачваше'],pl:'Gdzie mam się przesiąść?'}]}
]},
/* ---------------- NA CO DZIEŃ: B1 ---------------- */
{ id:'d9', track:'day', cefr:'B1', bt:'Местоимения', t:'Zaimki w praktyce', levels:[
 { id:'d9-1', t:'Go, ją, ich', bt:'Кратки местоимения',
   tip:`<p>Krótkie zaimki w bierniku: <span lang="bg">ме, те, го, я, ни, ви, ги</span> (mnie, cię, go, ją, nas, was, ich).</p>
   <p>Stoją <b>przed czasownikiem</b>, ale nigdy na początku zdania: <span lang="bg">Аз го виждам. Не го виждам.</span>, ale <span lang="bg">Виждам го.</span></p>`,
   w:[['widzę go','виждам го'],['znam ją','познавам я'],['słyszę cię','чувам те'],['szukam ich','търся ги'],['zapraszam was','каня ви'],['pamiętam to','помня го'],['czekam na ciebie','чакам те'],['kocham cię','обичам те'],['zapytaj go','питай го'],['nie widzę go','не го виждам']],
   s:[['Znam ją dobrze.','Познавам я добре.'],['Nie słyszę cię.','Не те чувам.'],['Czekam na was na lotnisku.','Чакам ви на летището.'],['Nie mogę ich znaleźć.','Не мога да ги намеря.'],['Zapraszam cię na kawę.','Каня те на кафе.'],['Zapytaj go.','Питай го.']],
   g:[{s:'Не ___ чувам.',o:['те','ти','теб'],pl:'Nie słyszę cię.'},
      {s:'Познавам ___ добре.',o:['я','ѝ','тя'],pl:'Znam ją dobrze.',why:'я = ją (biernik), ѝ = jej (celownik).'},
      {s:'Не мога да ___ намеря.',o:['ги','им','те са'],pl:'Nie mogę ich znaleźć.'},
      {q:'Dlaczego mówimy „Виждам го”, a nie „Го виждам”?',o:['zaimek krótki nie może zaczynać zdania','„го” zawsze stoi na końcu zdania','to forma pytająca']}]},
 { id:'d9-2', t:'Mi, ci, mu', bt:'Дателни местоимения',
   tip:`<p>Celownik (komu?): <span lang="bg">ми, ти, му, ѝ, ни, ви, им</span> (mi, ci, mu, jej, nam, wam, im).</p>
   <p>Tak samo jak po polsku: <span lang="bg">Харесва ми.</span> – Podoba mi się. <span lang="bg">Студено ми е.</span> – Zimno mi.</p>`,
   w:[['dawać','давам'],['mówić (komuś)','казвам'],['pokazywać','показвам'],['pomagać','помагам'],['wysyłać','изпращам|пращам'],['podoba mi się','харесва ми'],['przykro mi','съжалявам'],['zimno mi','студено ми е'],['gorąco mi','горещо ми е'],['wszystko mi jedno','все ми е едно']],
   s:[['Podoba mi się Sofia.','Харесва ми София.|София ми харесва.'],['Powiedz mu prawdę.','Кажи му истината.'],['Napisałam jej wiadomość.','Написах ѝ съобщение.|Пратих ѝ съобщение.'],['Zimno mi.','Студено ми е.'],['Pokaż mi mapę.','Покажи ми картата.'],['Pomożesz nam?','Ще ни помогнеш ли?']],
   g:[{s:'Харесва ___ София.',o:['ми','ме','аз'],pl:'Podoba mi się Sofia.'},
      {s:'Кажи ___ истината.',o:['му','го','той'],pl:'Powiedz mu prawdę.',why:'Komu? → му.'},
      {s:'Студено ___ е.',o:['ми','ме','съм'],pl:'Zimno mi.'},
      {s:'Ще ___ помогнеш ли?',o:['ни','нас','ние'],pl:'Pomożesz nam?'}]},
 { id:'d9-3', t:'Który, która', bt:'Който, която',
   tip:`<p>Zaimki względne: <b lang="bg">който</b> (m), <b lang="bg">която</b> (ż), <b lang="bg">което</b> (n), <b lang="bg">които</b> (l.mn.): <span lang="bg">Жената, която стои там…</span></p>
   <p>„Ktoś, nikt, coś, nic”: <span lang="bg">някой, никой, нещо, нищо</span>. Jak w polskim: <span lang="bg">Никой не знае.</span></p>`,
   w:[['który','който'],['która','която'],['które (n)','което'],['którzy / które','които'],['ktoś','някой'],['coś','нещо'],['nikt','никой'],['nic','нищо'],['każdy','всеки'],['wszystko','всичко'],['gdzieś','някъде'],['nigdzie','никъде']],
   s:[['To jest pilot, który mnie uczy.','Това е пилотът, който ме учи.'],['Kobieta, która tam stoi, jest instruktorką.','Жената, която стои там, е инструкторка.'],['Nikt nie wie.','Никой не знае.'],['Nic nie widzę.','Нищо не виждам.|Не виждам нищо.'],['Czy ktoś mówi po polsku?','Някой говори ли полски?'],['Wszystko jest w porządku.','Всичко е наред.']],
   g:[{s:'Жената, ___ стои там, е инструкторка.',o:['която','който','което'],pl:'Kobieta, która tam stoi, jest instruktorką.'},
      {s:'Самолетите, ___ виждаш, са нови.',o:['които','който','която'],pl:'Samoloty, które widzisz, są nowe.'},
      {s:'Никой ___ знае.',o:['не','ни','няма'],pl:'Nikt nie wie.'},
      {s:'Всичко е ___.',o:['наред','ред','редно'],pl:'Wszystko jest w porządku.'}]},
 { id:'d9-4', t:'Czyje to?', bt:'Чие е това?',
   tip:`<p>Długie zaimki dzierżawcze mają rodzaj i rodzajnik: <span lang="bg">моят / моята / моето / моите</span>, <span lang="bg">нейният</span> (jej), <span lang="bg">нашата</span> (nasza). Krótkie (<span lang="bg">колата ми</span>) są częstsze w mowie.</p>
   <p>„Czyj?” – <span lang="bg">чий</span> (m), <span lang="bg">чия</span> (ż), <span lang="bg">чие</span> (n), <span lang="bg">чии</span> (l.mn.).</p>`,
   w:[['czyj','чий'],['czyja','чия'],['czyje','чие'],['jego','негов'],['jej','неин'],['nasz','наш'],['wasz','ваш'],['ich','техен'],['swój','свой'],['własny','собствен|собствена'],['właścicielka','собственичка'],['torba','чанта']],
   s:[['Czyj to samolot?','Чий е този самолет?'],['To jest jej wiatrakowiec.','Това е нейният автожир.|Това е автожирът ѝ.'],['Nasz dom jest blisko.','Нашата къща е близо.|Къщата ни е близо.'],['Gdzie jest twoja torba?','Къде е твоята чанта?|Къде е чантата ти?|Къде ти е чантата?'],['Mam własny samochód.','Имам собствена кола.']],
   g:[{s:'___ е този самолет?',o:['Чий','Чия','Чие'],pl:'Czyj to samolot?'},
      {s:'Това е ___ автожир.',o:['нейният','нейната','нейното'],pl:'To jest jej wiatrakowiec.'},
      {s:'___ къща е близо.',o:['Нашата','Нашият','Нашето'],pl:'Nasz dom jest blisko.',why:'къща – rodzaj żeński.'},
      {s:'___ е тази чанта?',o:['Чия','Чий','Чии'],pl:'Czyja to torba?'}]},
 { id:'d9-5', t:'Podwojenie dopełnienia', bt:'Удвояване',
   tip:`<p>Gdy dopełnienie stoi na początku zdania, Bułgarzy powtarzają je zaimkiem: <span lang="bg">Филма го гледах.</span> (Ten film – oglądałam go.) <span lang="bg">Книгата ще я върна утре.</span></p>
   <p>Podobnie z celownikiem: <span lang="bg">На мен ми харесва.</span> – Mnie się podoba.</p>`,
   w:[['film','филм'],['książka','книга'],['wiadomość (news)','новина'],['list','писмо'],['prezent','подарък'],['oglądać','гледам'],['czytać','чета'],['przynieść','донеса'],['zapomnieć','забравя'],['znaleźć','намеря'],['oddać','върна'],['przeszkadzać','преча']],
   s:[['Ten film już widziałam.','Този филм вече съм го гледала.|Филма вече го гледах.'],['Mnie się to podoba.','На мен ми харесва.'],['Klucze zgubiłam wczoraj.','Ключовете ги изгубих вчера.'],['Książkę oddam jutro.','Книгата ще я върна утре.'],['Jemu to nie przeszkadza.','На него не му пречи.']],
   g:[{s:'Ключовете ___ изгубих вчера.',o:['ги','им','го'],pl:'Klucze zgubiłam wczoraj.'},
      {s:'На мен ___ харесва.',o:['ми','ме','аз'],pl:'Mnie się to podoba.'},
      {s:'Книгата ще ___ върна утре.',o:['я','го','ѝ'],pl:'Książkę oddam jutro.',why:'книга (ż) → я.'},
      {s:'На него не ___ пречи.',o:['му','го','той'],pl:'Jemu to nie przeszkadza.'}]}
]},
{ id:'d10', track:'day', cefr:'B1', bt:'Минали времена', t:'Czasy przeszłe', levels:[
 { id:'d10-1', t:'Już tam byłam', bt:'Минало неопределено',
   tip:`<p>Czas przeszły nieokreślony = <b lang="bg">съм + forma na -л</b>. Mówi o doświadczeniu, bez konkretnej daty: <span lang="bg">Била съм в София.</span> – Byłam (kiedyś) w Sofii.</p>
   <p>Kobieta: <span lang="bg">била, летяла, яла</span>; mężczyzna: <span lang="bg">бил, летял, ял</span>.</p>`,
   w:[['byłam (kiedyś)','била съм'],['jeździłam / chodziłam','ходила съм'],['widziałam (kiedyś)','виждала съм'],['jadłam (kiedyś)','яла съм'],['próbowałam','опитвала съм'],['latałam (kiedyś)','летяла съм'],['mieszkałam (kiedyś)','живяла съм'],['kiedykolwiek','някога'],['doświadczenie','опит'],['jeszcze nigdy','никога досега']],
   s:[['Byłam już w Bułgarii.','Вече съм била в България.'],['Nigdy nie latałam w nocy.','Никога не съм летяла нощем.|Никога не съм летяла през нощта.'],['Czy byłaś kiedyś w Warnie?','Била ли си някога във Варна?'],['Próbowałam banicy.','Опитвала съм баница.'],['Mieszkałam rok w Sofii.','Живяла съм една година в София.']],
   g:[{s:'Вече ___ била в България.',o:['съм','бях','е'],pl:'Byłam już w Bułgarii.'},
      {s:'Никога не съм ___ нощем.',o:['летяла','летял','летяло'],pl:'Nigdy nie latałam w nocy.',why:'Mówi kobieta: летяла.'},
      {s:'___ ли си някога във Варна?',o:['Била','Бил','Бяла'],pl:'Czy byłaś kiedyś w Warnie?'},
      {q:'Forma „била съм” mówi o…',o:['doświadczeniu bez konkretnej daty','czynności w tej chwili','planach na przyszłość']}]},
 { id:'d10-2', t:'Kiedy byłam dzieckiem', bt:'Минало несвършено',
   tip:`<p>Czas przeszły niedokonany (imperfekt) opisuje tło i zwyczaje w przeszłości: <span lang="bg">Когато бях дете, живеех на село.</span></p>
   <p>Końcówki: <span lang="bg">живеех, живееше, живееше, живеехме, живеехте, живееха</span>.</p>`,
   w:[['mieszkałam (wtedy)','живеех'],['chodziłam (często)','ходех'],['bawiłam się','играех'],['lubiłam','обичах'],['miałam','имах'],['wieś','село'],['dzieciństwo','детство'],['szkoła','училище'],['wakacje','ваканция'],['kiedy (gdy)','когато'],['dawniej','едно време|преди'],['pieszo','пеша']],
   s:[['Kiedy byłam dzieckiem, mieszkałam na wsi.','Когато бях дете, живеех на село.'],['Codziennie chodziłam do szkoły pieszo.','Всеки ден ходех пеша на училище.'],['Latem bawiłyśmy się nad rzeką.','Лятото играехме край реката.'],['Mój dziadek miał samolot.','Дядо ми имаше самолет.'],['Dawniej nie było internetu.','Едно време нямаше интернет.']],
   g:[{s:'Когато бях дете, ___ на село.',o:['живеех','живея','ще живея'],pl:'Kiedy byłam dzieckiem, mieszkałam na wsi.',why:'Tło w przeszłości: imperfekt.'},
      {s:'Дядо ми ___ самолет.',o:['имаше','имах','има ще'],pl:'Mój dziadek miał samolot.'},
      {s:'Едно време ___ интернет.',o:['нямаше','няма','немаше'],pl:'Dawniej nie było internetu.'},
      {q:'„село” to…',o:['wieś','miasto','pole']}]},
 { id:'d10-3', t:'Opowiadanie', bt:'Разказ',
   tip:`<p>W opowiadaniu tło idzie w imperfekcie (<span lang="bg">валеше</span> – padało), a zdarzenia w aoryście (<span lang="bg">кацнахме</span> – wylądowaliśmy): <span lang="bg">Валеше, когато кацнахме.</span></p>
   <p>Kolejność: <span lang="bg">първо… после… накрая…</span></p>`,
   w:[['padało','валеше'],['wiało','духаше'],['wylądowaliśmy','кацнахме'],['wystartowaliśmy','излетяхме'],['nagle','изведнъж'],['potem','после|след това'],['na końcu','накрая'],['najpierw','първо|отначало'],['zdarzyło się','случи се'],['opowiadać','разказвам'],['historia (opowieść)','история'],['zatrzymać się','спря']],
   s:[['Padało, kiedy wylądowaliśmy.','Валеше, когато кацнахме.'],['Nagle silnik się zatrzymał.','Изведнъж двигателят спря.'],['Najpierw sprawdziłam paliwo.','Първо проверих горивото.'],['Co się stało?','Какво се случи?|Какво стана?'],['Na końcu wszystko było dobrze.','Накрая всичко беше наред.'],['Wiało, ale wystartowałyśmy.','Духаше, но излетяхме.']],
   g:[{s:'___, когато кацнахме.',o:['Валеше','Ще вали','Вали'],pl:'Padało, kiedy wylądowaliśmy.',why:'Tło: imperfekt.'},
      {s:'Изведнъж двигателят ___.',o:['спря','спира','ще спре'],pl:'Nagle silnik się zatrzymał.',why:'Jednorazowe zdarzenie: aoryst.'},
      {s:'Какво се ___?',o:['случи','случих','случиш'],pl:'Co się stało?'},
      {s:'Накрая всичко ___ наред.',o:['беше','бях','бяха'],pl:'Na końcu wszystko było dobrze.'}]},
 { id:'d10-4', t:'Co robiłaś w weekend?', bt:'Какво прави през уикенда?',
   tip:`<p>W aoryście wiele czasowników zmienia temat: <span lang="bg">дойда → дойдох</span> (przyszłam), <span lang="bg">взема → взех</span> (wzięłam), <span lang="bg">дам → дадох</span> (dałam), <span lang="bg">кажа → казах</span> (powiedziałam), <span lang="bg">прочета → прочетох</span> (przeczytałam).</p>
   <p>2. i 3. osoba często są takie same: <span lang="bg">Какво прави?</span> – Co robiłaś? / Co robił?</p>`,
   w:[['przyszłam','дойдох'],['wzięłam','взех'],['dałam','дадох'],['powiedziałam','казах'],['przeczytałam','прочетох'],['napisałam','написах'],['spotkałam','срещнах'],['spałam','спах'],['zostałam','останах'],['wróciłam','върнах се|прибрах се'],['zrobiłam','направих'],['odpoczywałam','почивах си']],
   s:[['Co robiłaś w weekend?','Какво прави през уикенда?'],['W sobotę spotkałam przyjaciółkę.','В събота срещнах приятелка.|В събота се видях с приятелка.'],['Wzięłam taksówkę.','Взех такси.'],['Przeczytałam całą książkę.','Прочетох цялата книга.'],['Zostałam w domu.','Останах вкъщи.'],['Wróciłam późno.','Върнах се късно.|Прибрах се късно.']],
   g:[{s:'Вчера ___ такси.',o:['взех','взема','вземам'],pl:'Wczoraj wzięłam taksówkę.'},
      {s:'Какво ___ той?',o:['каза','казах','казаха'],pl:'Co on powiedział?'},
      {s:'Ние ___ късно.',o:['дойдохме','дойдох','дойдоха'],pl:'Przyszliśmy późno.'},
      {s:'Аз ___ вкъщи.',o:['останах','остана','останаха'],pl:'Zostałam w domu.'}]},
 { id:'d10-5', t:'Zanim i po tym, jak', bt:'Преди да, след като',
   tip:`<p>„Zanim” = <b lang="bg">преди да</b> + czasownik: <span lang="bg">Преди да излетя, проверявам времето.</span></p>
   <p>„Po tym, jak” = <b lang="bg">след като</b>: <span lang="bg">След като кацнахме, пихме кафе.</span> „Podczas gdy” = <span lang="bg">докато</span>.</p>`,
   w:[['zanim','преди да'],['po tym, jak','след като'],['podczas gdy','докато'],['od tamtej pory','оттогава'],['wspomnienie','спомен'],['zapomniałam','забравих'],['pierwszy raz','за първи път'],['ostatni raz','за последен път'],['dawno','отдавна'],['niedawno','наскоро'],['wtedy','тогава'],['przedtem','преди това']],
   s:[['Zanim wystartuję, sprawdzam pogodę.','Преди да излетя, проверявам времето.'],['Po tym, jak wylądowaliśmy, piliśmy kawę.','След като кацнахме, пихме кафе.'],['Pierwszy raz leciałam wiatrakowcem w maju.','За първи път летях с автожир през май.'],['Niedawno byłam w Płowdiwie.','Наскоро бях в Пловдив.'],['Dawno cię nie widziałam!','Отдавна не съм те виждала!']],
   g:[{s:'Преди ___ излетя, проверявам времето.',o:['да','че','като'],pl:'Zanim wystartuję, sprawdzam pogodę.'},
      {s:'След ___ кацнахме, пихме кафе.',o:['като','да','че'],pl:'Po tym, jak wylądowaliśmy, piliśmy kawę.'},
      {s:'За ___ път летях с автожир.',o:['първи','първия','първа'],pl:'Pierwszy raz leciałam wiatrakowcem.'},
      {s:'Отдавна не съм те ___!',o:['виждала','виждах','виждам'],pl:'Dawno cię nie widziałam!'}]}
]},
{ id:'d11', track:'day', cefr:'B1', bt:'Планове и условия', t:'Plany i warunki', levels:[
 { id:'d11-1', t:'Umawianie się', bt:'Уговорки',
   tip:`<p>Propozycja: <b lang="bg">Да отидем ли…?</b> (Pójdziemy…?) albo <b lang="bg">Хайде да…</b> (Chodźmy…).</p>
   <p>Odpowiedzi: <span lang="bg">Става!</span> (Pasuje! / Dobra!), <span lang="bg">С удоволствие!</span>, <span lang="bg">За съжаление не мога.</span></p>`,
   w:[['pasuje!','става'],['może (być może)','може би'],['chętnie','с удоволствие'],['niestety','за съжаление'],['zajęta','заета|зает'],['wolna (mam czas)','свободна|свободен'],['zaproszenie','покана'],['impreza','купон|парти'],['odwołać','отменя'],['przełożyć','отложа'],['umówić się','уговоря се|разберем се'],['wygodnie (pasuje mi)','удобно']],
   s:[['Pójdziemy jutro na kawę?','Да отидем ли утре на кафе?'],['Chętnie!','С удоволствие!'],['Niestety jestem zajęta.','За съжаление съм заета.'],['Pasuje ci o szóstej?','Удобно ли ти е в шест?|Става ли в шест?'],['Muszę przełożyć spotkanie.','Трябва да отложа срещата.'],['Chodźmy!','Хайде да вървим!|Хайде!']],
   g:[{s:'___ отидем ли утре на кафе?',o:['Да','Ще','Ли'],pl:'Pójdziemy jutro na kawę?'},
      {s:'За съжаление съм ___.',o:['заета','зает','заети'],pl:'Niestety jestem zajęta.'},
      {s:'Трябва да ___ срещата.',o:['отложа','отложих','отлагаше'],pl:'Muszę przełożyć spotkanie.'},
      {q:'„Става!” w rozmowie znaczy…',o:['Pasuje! / Dobra!','Wstaje!','Stało się!']}]},
 { id:'d11-2', t:'Przez telefon', bt:'По телефона',
   tip:`<p>Rozmowa: <span lang="bg">Ало? – Кой се обажда?</span> (Kto mówi?) <span lang="bg">Може ли да говоря с…?</span> <span lang="bg">Момент, свързвам ви.</span></p>
   <p>„Za pięć minut” = <b lang="bg">след пет минути</b> (<span lang="bg">за пет минути</span> znaczy „na pięć minut”).</p>`,
   w:[['odebrać (telefon)','вдигна'],['rozłączyć się','затворя'],['wiadomość (SMS)','съобщение'],['numer','номер'],['bateria','батерия'],['ładowarka','зарядно'],['zasięg','обхват'],['poczta głosowa','гласова поща'],['zajęte','заето'],['połączyć','свържа'],['chwileczkę','момент'],['oddzwonić','звънна пак|обадя се пак']],
   s:[['Halo, kto mówi?','Ало, кой се обажда?'],['Czy mogę rozmawiać z Iwanem?','Може ли да говоря с Иван?'],['Chwileczkę, łączę.','Момент, свързвам ви.'],['Nie mam zasięgu.','Нямам обхват.'],['Oddzwonię za pięć minut.','Ще ти се обадя след пет минути.|Ще звънна след пет минути.'],['Rozładowała mi się bateria.','Батерията ми свърши.|Батерията ми падна.']],
   g:[{s:'Кой се ___?',o:['обажда','обаждаш','обаждат'],pl:'Kto mówi?'},
      {s:'Може ли да говоря ___ Иван?',o:['с','на','за'],pl:'Czy mogę rozmawiać z Iwanem?'},
      {s:'Ще ти се обадя ___ пет минути.',o:['след','за','преди'],pl:'Oddzwonię za pięć minut.',why:'„za (5 minut)” = след.'},
      {q:'„обхват” w telefonie to…',o:['zasięg','obwód','abonament']}]},
 { id:'d11-3', t:'Jeśli…', bt:'Ако',
   tip:`<p>Warunek realny: <b lang="bg">Ако</b> + czas teraźniejszy, potem <b lang="bg">ще</b>: <span lang="bg">Ако вали, няма да летим.</span> Po <span lang="bg">ако</span> nie ma <span lang="bg">ще</span>!</p>
   <p>„Inaczej” = <span lang="bg">иначе</span>, „to zależy od” = <span lang="bg">зависи от</span>.</p>`,
   w:[['jeśli','ако'],['chyba że','освен ако'],['w takim razie','тогава|в такъв случай'],['na wszelki wypadek','за всеки случай'],['inaczej','иначе'],['pod warunkiem, że','при условие че'],['możliwe','възможно'],['pewnie','сигурно'],['na pewno','със сигурност'],['to zależy','зависи'],['decyzja','решение'],['zdecydować','реша']],
   s:[['Jeśli będzie padać, nie polecimy.','Ако вали, няма да летим.'],['Jeśli będziesz mieć czas, zadzwoń.','Ако имаш време, обади се.'],['To zależy od pogody.','Зависи от времето.'],['Weź kurtkę na wszelki wypadek.','Вземи яке за всеки случай.'],['Pospiesz się, inaczej się spóźnimy.','Побързай, иначе ще закъснеем.']],
   g:[{s:'Ако ___, няма да летим.',o:['вали','ще вали','валя'],pl:'Jeśli będzie padać, nie polecimy.',why:'Po ако bez ще.'},
      {s:'Зависи ___ времето.',o:['от','на','за'],pl:'To zależy od pogody.'},
      {s:'Побързай, ___ ще закъснеем.',o:['иначе','ако','защото'],pl:'Pospiesz się, inaczej się spóźnimy.'},
      {s:'Ако имаш време, ___ се.',o:['обади','обаждаш','обадих'],pl:'Jeśli będziesz mieć czas, zadzwoń.'}]},
 { id:'d11-4', t:'Gdybym…', bt:'Ако бях…',
   tip:`<p>Warunek nierealny: <span lang="bg">Ако имах време, щях да летя всеки ден.</span> – Gdybym miała czas, latałabym codziennie. Wzór: <b lang="bg">щях / щеше / щяхме… да</b> + czasownik.</p>
   <p>Grzecznie: <b lang="bg">бих</b> + forma na -л: <span lang="bg">бих предпочела</span> (wolałabym), <span lang="bg">бих могла</span> (mogłabym).</p>`,
   w:[['latałabym','щях да летя|бих летяла'],['przyszłabym','бих дошла|щях да дойда'],['wolałabym','бих предпочела'],['mogłabym','бих могла'],['szkoda','жалко'],['marzenie','мечта'],['marzyć','мечтая'],['szczęście (los)','късмет'],['wygrać','спечеля'],['świat','свят'],['podróżować','пътувам'],['gdyby nie…','ако не беше…']],
   s:[['Gdybym miała czas, latałabym codziennie.','Ако имах време, щях да летя всеки ден.'],['Wolałabym herbatę.','Бих предпочела чай.'],['Mogłabym ci pomóc.','Бих могла да ти помогна.'],['Marzę o własnym wiatrakowcu.','Мечтая за собствен автожир.'],['Szkoda, że nie możesz przyjść.','Жалко, че не можеш да дойдеш.']],
   g:[{s:'Ако имах време, ___ да летя всеки ден.',o:['щях','ще','бих'],pl:'Gdybym miała czas, latałabym codziennie.'},
      {s:'Бих ___ чай.',o:['предпочела','предпочел','предпочитам'],pl:'Wolałabym herbatę.',why:'Mówi kobieta: -ла.'},
      {s:'Мечтая ___ собствен автожир.',o:['за','на','от'],pl:'Marzę o własnym wiatrakowcu.'},
      {s:'Жалко, ___ не можеш да дойдеш.',o:['че','да','ако'],pl:'Szkoda, że nie możesz przyjść.'}]},
 { id:'d11-5', t:'Plany na przyszłość', bt:'Бъдещи планове',
   tip:`<p>Zamiar: <b lang="bg">смятам да</b> / <b lang="bg">възнамерявам да</b> (zamierzam). „W przyszłym roku” – <span lang="bg">догодина</span>, „za rok” – <span lang="bg">след година</span>.</p>
   <p>„Zdać egzamin” – <span lang="bg">взема изпита</span> albo <span lang="bg">издържа изпита</span>.</p>`,
   w:[['zamierzać','смятам да|възнамерявам да'],['w przyszłym roku','догодина'],['za rok','след година'],['licencja','лиценз|свидетелство'],['egzamin','изпит'],['zdać (egzamin)','взема|издържа'],['cel','цел'],['kurs','курс'],['przygotowywać się','подготвям се'],['ćwiczyć','упражнявам се'],['osiągnąć','постигна'],['krok po kroku','стъпка по стъпка']],
   s:[['Zamierzam zrobić licencję pilota.','Смятам да изкарам лиценз за пилот.'],['W przyszłym roku pojadę do Bułgarii.','Догодина ще отида в България.'],['Przygotowuję się do egzaminu.','Подготвям се за изпита.'],['Mam nadzieję, że zdam.','Надявам се да издържа.|Надявам се да го взема.'],['Uczę się krok po kroku.','Уча стъпка по стъпка.']],
   g:[{s:'Смятам ___ изкарам лиценз.',o:['да','че','за'],pl:'Zamierzam zrobić licencję.'},
      {s:'___ ще отида в България.',o:['Догодина','Миналата година','Вчера'],pl:'W przyszłym roku pojadę do Bułgarii.'},
      {s:'Подготвям се ___ изпита.',o:['за','на','до'],pl:'Przygotowuję się do egzaminu.'},
      {s:'Надявам се ___ издържа.',o:['да','ли','се'],pl:'Mam nadzieję, że zdam.'}]}
]},
{ id:'d12', track:'day', cefr:'B1', bt:'Мнения и работа', t:'Opinie i praca', levels:[
 { id:'d12-1', t:'Moim zdaniem', bt:'Според мен',
   tip:`<p>Opinie: <span lang="bg">Според мен…</span> (moim zdaniem), <span lang="bg">Мисля, че…</span>, <span lang="bg">Не съм сигурна.</span>, <span lang="bg">Съгласна съм.</span> (kobieta: <b>съгласна, сигурна</b>).</p>
   <p>„Niż” przed rzeczownikiem = <b lang="bg">от</b>: <span lang="bg">по-добре от вчера</span>.</p>`,
   w:[['moim zdaniem','според мен'],['myślę, że','мисля, че'],['zgadzam się','съгласна съм|съгласен съм'],['nie zgadzam się','не съм съгласна|не съм съгласен'],['pewna','сигурна|сигурен'],['masz rację','права си|прав си'],['opinia','мнение'],['ważny','важен|важна'],['ciekawy','интересен|интересна'],['nudny','скучен|скучна'],['lepiej','по-добре'],['gorzej','по-зле']],
   s:[['Moim zdaniem to dobry pomysł.','Според мен това е добра идея.'],['Myślę, że masz rację.','Мисля, че си права.|Мисля, че си прав.'],['Nie jestem pewna.','Не съм сигурна.'],['Zgadzam się z tobą.','Съгласна съм с теб.'],['Co o tym myślisz?','Какво мислиш за това?'],['Dzisiaj jest lepiej niż wczoraj.','Днес е по-добре от вчера.']],
   g:[{s:'___ мен това е добра идея.',o:['Според','Към','Без'],pl:'Moim zdaniem to dobry pomysł.'},
      {s:'Не съм ___.',o:['сигурна','сигурен','сигурно'],pl:'Nie jestem pewna.'},
      {s:'Мисля, ___ си права.',o:['че','да','ли'],pl:'Myślę, że masz rację.'},
      {s:'Днес е по-добре ___ вчера.',o:['от','на','за'],pl:'Dzisiaj jest lepiej niż wczoraj.',why:'„niż” = от.'}]},
 { id:'d12-2', t:'Zdania złożone', bt:'Сложни изречения',
   tip:`<p>Spójniki: <span lang="bg">въпреки че</span> (chociaż), <span lang="bg">затова</span> (dlatego), <span lang="bg">обаче</span> (jednak), <span lang="bg">освен това</span> (poza tym), <span lang="bg">така че</span> (więc), <span lang="bg">нито… нито</span> (ani… ani).</p>
   <p>„Bać się czegoś” = <span lang="bg">страхувам се от</span>.</p>`,
   w:[['chociaż','въпреки че|макар че'],['dlatego','затова'],['jednak','обаче'],['poza tym','освен това'],['więc','така че'],['ponieważ','понеже|защото'],['mimo','въпреки'],['zamiast','вместо'],['oprócz','освен'],['albo','или'],['ani… ani','нито… нито'],['bać się','страхувам се|боя се']],
   s:[['Chociaż padało, latałyśmy.','Въпреки че валеше, летяхме.'],['Jestem zmęczona, dlatego zostanę w domu.','Уморена съм, затова ще остана вкъщи.'],['Lubię latać, jednak boję się burz.','Обичам да летя, обаче се страхувам от бури.'],['Ani kawy, ani herbaty, dziękuję.','Нито кафе, нито чай, благодаря.'],['Zamiast autobusu weźmy taksówkę.','Вместо автобус да вземем такси.']],
   g:[{s:'___ че валеше, летяхме.',o:['Въпреки','Затова','Обаче'],pl:'Chociaż padało, latałyśmy.'},
      {s:'Уморена съм, ___ ще остана вкъщи.',o:['затова','въпреки','докато'],pl:'Jestem zmęczona, dlatego zostanę w domu.'},
      {s:'___ кафе, нито чай.',o:['Нито','Ни','Не'],pl:'Ani kawy, ani herbaty.'},
      {s:'Страхувам се ___ бури.',o:['от','за','с'],pl:'Boję się burz.'}]},
 { id:'d12-3', t:'W pracy', bt:'В работата',
   tip:`<p>Bardzo grzecznie w pracy: <span lang="bg">Бихте ли могли да…?</span> (Czy mógłby pan / mogłaby pani…?)</p>
   <p>„Termin mija” – <span lang="bg">срокът изтича</span>. „Brać urlop” – <span lang="bg">излизам в отпуска</span>. <span lang="bg">болничен</span> to zwolnienie lekarskie.</p>`,
   w:[['koleżanka z pracy','колежка'],['kolega z pracy','колега'],['szefowa','шефка|началничка'],['zebranie','среща|събрание'],['zadanie','задача'],['termin (deadline)','срок'],['urlop','отпуска|отпуск'],['zwolnienie lekarskie','болничен'],['umowa','договор'],['doświadczenie (zawodowe)','опит'],['klient','клиент'],['raport','доклад']],
   s:[['Mam dziś zebranie o dziesiątej.','Днес имам среща в десет.'],['Termin mija w piątek.','Срокът изтича в петък.'],['Biorę urlop w sierpniu.','Излизам в отпуска през август.'],['Wyślę pani raport jutro.','Ще ви изпратя доклада утре.'],['Czy mogłaby pani to sprawdzić?','Бихте ли могли да проверите това?'],['Mam duże doświadczenie.','Имам голям опит.|Имам много опит.']],
   g:[{s:'Срокът ___ в петък.',o:['изтича','изтичам','изтичаме'],pl:'Termin mija w piątek.'},
      {s:'Ще ___ изпратя доклада утре.',o:['ви','вие','вас'],pl:'Wyślę pani raport jutro.'},
      {s:'Бихте ли ___ да проверите това?',o:['могли','могла','можеш'],pl:'Czy mogłaby pani to sprawdzić?',why:'Forma grzeczna (вие) → могли.'},
      {q:'„болничен” to…',o:['zwolnienie lekarskie','szpital','pacjent']}]},
 { id:'d12-4', t:'Oficjalny e-mail', bt:'Официално писмо',
   tip:`<p>Początek: <span lang="bg">Уважаеми господин Петров,</span> / <span lang="bg">Уважаема госпожо Петрова,</span> (w zwrocie do kogoś: <b lang="bg">госпожо</b>). Koniec: <span lang="bg">С уважение,</span> albo luźniej <span lang="bg">Поздрави,</span>.</p>
   <p>„Dziękuję za…” = <span lang="bg">Благодаря за…</span></p>`,
   w:[['szanowny','уважаеми'],['szanowna','уважаема'],['pan','господин'],['pani','госпожа'],['z poważaniem','с уважение'],['pozdrawiam','поздрави'],['załącznik','прикачен файл'],['formularz','формуляр|бланка'],['podpis','подпис'],['wniosek','молба|заявление'],['dokument','документ'],['odpowiedź','отговор']],
   s:[['Dziękuję za szybką odpowiedź.','Благодаря за бързия отговор.'],['W załączniku przesyłam dokumenty.','Изпращам документите в прикачения файл.|Прилагам документите.'],['Proszę podpisać formularz.','Моля, подпишете формуляра.'],['Czekam na odpowiedź.','Очаквам отговор.|Очаквам вашия отговор.'],['Z poważaniem, Anna.','С уважение, Анна.']],
   g:[{s:'Уважаема ___ Петрова,',o:['госпожо','госпожа','господин'],pl:'Szanowna pani Petrowa,',why:'W zwrocie do kogoś: wołacz госпожо.'},
      {s:'Благодаря ___ бързия отговор.',o:['за','на','от'],pl:'Dziękuję za szybką odpowiedź.'},
      {s:'Моля, ___ формуляра.',o:['подпишете','подписвам','подписах'],pl:'Proszę podpisać formularz.'},
      {s:'___ уважение, Анна.',o:['С','За','От'],pl:'Z poważaniem, Anna.'}]},
 { id:'d12-5', t:'Pieniądze i bank', bt:'Пари и банка',
   tip:`<p><b>Pułapka:</b> <span lang="bg">сметка</span> to i konto w banku, i rachunek w restauracji.</p>
   <p>„Gotówką” = <b lang="bg">в брой</b>. „Wypłacić z bankomatu” – <span lang="bg">изтегля пари</span>.</p>`,
   w:[['konto','сметка'],['przelew','превод'],['bankomat','банкомат'],['wypłacić','изтегля'],['wpłacić','внеса'],['opłata','такса'],['gotówką','в брой'],['podatek','данък'],['oszczędzać','спестявам'],['wydawać (pieniądze)','харча'],['kurs wymiany','курс'],['portfel','портфейл']],
   s:[['Gdzie jest bankomat?','Къде има банкомат?|Къде е банкоматът?'],['Chcę wypłacić pieniądze.','Искам да изтегля пари.'],['Czy mogę zapłacić gotówką?','Може ли да платя в брой?'],['Przelew przyjdzie jutro.','Преводът ще пристигне утре.'],['Wydałam za dużo.','Похарчих твърде много.'],['Jaka jest opłata?','Каква е таксата?']],
   g:[{s:'Искам да ___ пари.',o:['изтегля','изтеглих','изтегляше'],pl:'Chcę wypłacić pieniądze.'},
      {s:'Може ли да платя ___ брой?',o:['в','на','с'],pl:'Czy mogę zapłacić gotówką?'},
      {s:'Каква е ___?',o:['таксата','таксът','таксато'],pl:'Jaka jest opłata?'},
      {q:'„сметка” może znaczyć…',o:['konto i rachunek','tylko rachunek','tylko podatek']}]}
]},
{ id:'d13', track:'day', cefr:'B1', bt:'България и култура', t:'Bułgaria i kultura', levels:[
 { id:'d13-1', t:'Święta i życzenia', bt:'Празници',
   tip:`<p>1 marca to <b lang="bg">Баба Марта</b>: wręcza się <span lang="bg">мартеници</span> – biało-czerwone ozdoby – i mówi <span lang="bg">Честита Баба Марта!</span></p>
   <p>Życzenia zaczynają się od <b lang="bg">Честит / Честита / Честито</b> (zgodnie z rodzajem): <span lang="bg">Честит рожден ден! Честита Нова година!</span> Imieniny są w Bułgarii bardzo ważne: <span lang="bg">Честит имен ден!</span></p>`,
   w:[['święto','празник'],['imieniny','имен ден'],['Boże Narodzenie','Коледа'],['Wielkanoc','Великден'],['Nowy Rok','Нова година'],['marcówka','мартеница'],['życzenia','пожелания'],['gratulacje','поздравления|честито'],['prezent','подарък'],['świętować','празнувам'],['tradycja','традиция'],['pisanka','шарено яйце|боядисано яйце']],
   s:[['Wszystkiego najlepszego z okazji urodzin!','Честит рожден ден!'],['Wesołych Świąt!','Весела Коледа!|Весели празници!'],['Szczęśliwego Nowego Roku!','Честита Нова година!'],['Wszystkiego najlepszego z okazji imienin!','Честит имен ден!'],['Dostałam marcówkę.','Получих мартеница.'],['Jak świętujecie Wielkanoc?','Как празнувате Великден?']],
   g:[{s:'___ рожден ден!',o:['Честит','Честита','Честито'],pl:'Wszystkiego najlepszego z okazji urodzin!',why:'ден – rodzaj męski.'},
      {s:'___ Нова година!',o:['Честита','Честит','Честито'],pl:'Szczęśliwego Nowego Roku!'},
      {q:'„мартеница” to…',o:['biało-czerwona ozdoba noszona w marcu','marcowe ciasto','wiosenna piosenka']},
      {s:'Как ___ Великден?',o:['празнувате','празнувам','празнуваш'],pl:'Jak świętujecie Wielkanoc?'}]},
 { id:'d13-2', t:'Kuchnia bułgarska', bt:'Българска кухня',
   tip:`<p>Pikantny = <b lang="bg">лют</b>, a <span lang="bg">остър</span> to ostry jak nóż. <span lang="bg">кисело мляко</span> (dosł. „kwaśne mleko”) to jogurt.</p>
   <p><span lang="bg">таратор</span> – zimna zupa z jogurtu, ogórka, czosnku i koperku. <span lang="bg">кебапче</span> (l.mn. <span lang="bg">кебапчета</span>) – grillowany wałeczek z mielonego mięsa.</p>`,
   w:[['banica','баница'],['sałatka szopska','шопска салата'],['zupa','супа'],['tarator','таратор'],['kebabcze','кебапче'],['kotlet mielony','кюфте'],['przyprawa','подправка'],['ostry (pikantny)','лют|люта|люто'],['słodki','сладък|сладка'],['słony','солен|солена'],['kwaśny','кисел|кисела'],['przepis (kulinarny)','рецепта']],
   s:[['Banica jest bardzo smaczna.','Баницата е много вкусна.'],['Poproszę sałatkę szopską i dwa kebabcze.','Една шопска салата и две кебапчета, моля.'],['Czy to jest ostre?','Люто ли е?|Лютиво ли е?'],['Tarator to zimna zupa.','Тараторът е студена супа.'],['Dasz mi przepis?','Ще ми дадеш ли рецептата?']],
   g:[{s:'Люто ___ е?',o:['ли','се','да'],pl:'Czy to jest ostre?'},
      {q:'„Pikantny” to po bułgarsku…',o:['лют','остър','кисел'],why:'остър = ostry jak nóż.'},
      {q:'Liczba mnoga od „кебапче”',o:['кебапчета','кебапчи','кебапчове']},
      {s:'Тараторът е ___ супа.',o:['студена','студен','студено'],pl:'Tarator to zimna zupa.'}]},
 { id:'d13-3', t:'Przyroda', bt:'Природа',
   tip:`<p><b>Pułapka:</b> <span lang="bg">гора</span> to <b>las</b>! Góry to <span lang="bg">планина</span>, a szczyt – <span lang="bg">връх</span>.</p>
   <p><span lang="bg">Мусала</span> (2925 m) to najwyższy szczyt Półwyspu Bałkańskiego. <span lang="bg">хижа</span> – schronisko górskie.</p>`,
   w:[['szczyt','връх'],['las','гора','Pułapka: гора = las'],['rzeka','река'],['jezioro','езеро'],['dolina','долина'],['jaskinia','пещера'],['wodospad','водопад'],['szlak, ścieżka','пътека'],['schronisko','хижа'],['wybrzeże','крайбрежие'],['wyspa','остров'],['słońce','слънце']],
   s:[['Idziemy szlakiem do schroniska.','Вървим по пътеката към хижата.'],['Las jest bardzo stary.','Гората е много стара.'],['Musała jest najwyższym szczytem w Bułgarii.','Мусала е най-високият връх в България.'],['Widzę wodospad.','Виждам водопад.'],['Chciałabym zobaczyć Siedem Jezior Rylskich.','Бих искала да видя Седемте рилски езера.']],
   g:[{q:'„гора” to…',o:['las','góra','jaskinia'],why:'góra = планина, szczyt = връх.'},
      {s:'Мусала е най-___ връх в България.',o:['високият','високата','високото'],pl:'Musała jest najwyższym szczytem w Bułgarii.'},
      {s:'Гората е много ___.',o:['стара','стар','старо'],pl:'Las jest bardzo stary.',why:'гора – rodzaj żeński.'},
      {s:'Вървим по пътеката ___ хижата.',o:['към','при','над'],pl:'Idziemy szlakiem do schroniska.'}]},
 { id:'d13-4', t:'Podobno…', bt:'Преизказване',
   tip:`<p>Gdy powtarzasz cudze słowa, Bułgarzy w 3. osobie opuszczają <span lang="bg">е</span>: <span lang="bg">Той бил болен.</span> – (Mówią, że) był chory. Tak zaczynają się bajki: <span lang="bg">Имало едно време…</span> – Dawno, dawno temu…</p>
   <p>Prościej: <span lang="bg">Казват, че…</span> (Mówią, że…), <span lang="bg">Чух, че…</span> (Słyszałam, że…).</p>`,
   w:[['podobno','уж|май'],['mówią, że','казват, че'],['słyszałam, że','чух, че'],['dawno, dawno temu','имало едно време'],['bajka','приказка'],['plotka','клюка'],['wiadomości (TV)','новини'],['prawda','истина'],['kłamstwo','лъжа'],['król / car','цар'],['królowa','царица'],['wierzyć','вярвам']],
   s:[['Mówią, że jutro będzie padać.','Казват, че утре ще вали.'],['Podobno był chory.','Той бил болен.|Уж бил болен.'],['Dawno, dawno temu żył sobie car.','Имало едно време един цар.'],['Słyszałam, że lotnisko jest zamknięte.','Чух, че летището е затворено.'],['To nie jest prawda.','Това не е истина.']],
   g:[{s:'Имало едно ___ един цар.',o:['време','година','ден'],pl:'Dawno, dawno temu żył sobie car.'},
      {s:'Казват, ___ утре ще вали.',o:['че','да','ли'],pl:'Mówią, że jutro będzie padać.'},
      {q:'„Той бил болен.” znaczy…',o:['Podobno był chory.','Był chory (widziałam to).','Będzie chory.'],why:'Brak „е” pokazuje, że powtarzasz cudze słowa.'},
      {s:'Чух, че летището е ___.',o:['затворено','затворен','затворена'],pl:'Słyszałam, że lotnisko jest zamknięte.',why:'летище – nijakie.'}]},
 { id:'d13-5', t:'Historia i alfabet', bt:'История и азбука',
   tip:`<p>Strona bierna: <b lang="bg">е + imiesłów</b> zgodny z rodzajem: <span lang="bg">църквата е построена</span>, <span lang="bg">градът е основан</span>. Bezosobowo z <b lang="bg">се</b>: <span lang="bg">Тук се говори български.</span></p>
   <p>24 maja Bułgarzy świętują Dzień Pisma Słowiańskiego i Kultury – na cześć Cyryla i Metodego.</p>`,
   w:[['historia','история'],['wiek (stulecie)','век'],['carstwo','царство'],['alfabet','азбука'],['zbudowany','построен|построена'],['założony','основан|основана'],['stolica','столица'],['naród','народ'],['wolność','свобода'],['pomnik','паметник'],['cerkiew','църква'],['oświata','просвета']],
   s:[['Sofia jest stolicą Bułgarii.','София е столицата на България.'],['Cerkiew została zbudowana w dziewiętnastym wieku.','Църквата е построена през деветнайсети век.|Църквата е построена през деветнадесети век.'],['Tutaj mówi się po bułgarsku.','Тук се говори български.'],['Bułgaria ma długą historię.','България има дълга история.'],['Dwudziestego czwartego maja świętujemy alfabet.','На двайсет и четвърти май празнуваме азбуката.']],
   g:[{s:'София е ___ на България.',o:['столицата','столицато','столицът'],pl:'Sofia jest stolicą Bułgarii.'},
      {s:'Църквата е ___ през XIX век.',o:['построена','построен','построено'],pl:'Cerkiew została zbudowana w XIX wieku.'},
      {s:'Тук ___ говори български.',o:['се','си','е'],pl:'Tutaj mówi się po bułgarsku.'},
      {q:'24 maja w Bułgarii to…',o:['Dzień Pisma Słowiańskiego i Kultury','Dzień Niepodległości','Dzień Lotnictwa']}]}
]},
/* ---------------- LOTNICTWO: A2 → B1 ---------------- */
{ id:'a3', track:'air', cefr:'A2', bt:'Аероклуб', t:'W aeroklubie', levels:[
 { id:'a3-1', t:'Aeroklub', bt:'В аероклуба',
   tip:`<p>Instruktor mówi do kursantki per „ty”: <span lang="bg">Готова ли си?</span> – <span lang="bg">Да, готова съм.</span></p>
   <p><span lang="bg">учебен полет</span> – lot szkolny, <span lang="bg">самостоятелен полет</span> – lot samodzielny. Rękaw wiatrowy to <span lang="bg">ръкав</span>.</p>`,
   w:[['aeroklub','аероклуб'],['lot szkolny','учебен полет'],['lot samodzielny','самостоятелен полет'],['instruktorka','инструкторка'],['kursantka','курсантка'],['dziennik lotów','летателна книжка'],['odprawa przedlotowa','предполетен инструктаж'],['grafik','график'],['lot zapoznawczy','опознавателен полет'],['pas trawiasty','тревна писта'],['rękaw wiatrowy','ръкав|ветропоказател'],['członkini','членка']],
   s:[['Dziś mam lot szkolny.','Днес имам учебен полет.'],['Jesteś gotowa?','Готова ли си?'],['Tak, jestem gotowa.','Да, готова съм.'],['Wpisz lot do dziennika.','Запиши полета в летателната книжка.'],['Pas jest trawiasty.','Пистата е тревна.'],['Rękaw pokazuje wiatr z zachodu.','Ръкавът показва вятър от запад.']],
   g:[{s:'Готова ___ си?',o:['ли','се','да'],pl:'Jesteś gotowa?'},
      {s:'Днес имам ___ полет.',o:['учебен','учебна','учебно'],pl:'Dziś mam lot szkolny.'},
      {s:'Пистата е ___.',o:['тревна','тревен','тревно'],pl:'Pas jest trawiasty.'},
      {q:'„самостоятелен полет” to…',o:['lot samodzielny','lot samolotem','lot stały']}]},
 { id:'a3-2', t:'Na ziemi: kołowanie', bt:'На земята: рулиране',
   tip:`<p>Polecenia w rozkaźniku dokonanym: <span lang="bg">запали, спри, изчакай</span>. Zakaz – z formą niedokonaną: <span lang="bg">Не бързай!</span> (Nie spiesz się!)</p>
   <p>„Do” punktu = <span lang="bg">до</span>, „przed” = <span lang="bg">пред</span>.</p>`,
   w:[['kołować','рулирам'],['płyta postojowa','перон|стоянка'],['droga kołowania','пътека за рулиране'],['punkt oczekiwania','точка на изчакване'],['uruchomić silnik','запаля двигателя'],['wyłączyć silnik','изгася двигателя|спра двигателя'],['hamować','спирам'],['powoli','бавно'],['zatrzymać się','спра'],['poczekać','изчакам'],['za mną','след мен'],['ostrożnie','внимателно']],
   s:[['Uruchom silnik.','Запали двигателя.'],['Kołuj powoli do punktu oczekiwania.','Рулирай бавно до точката на изчакване.'],['Zatrzymaj się przed pasem.','Спри пред пистата.'],['Nie spiesz się!','Не бързай!'],['Wyłącz silnik.','Изгаси двигателя.|Спри двигателя.']],
   g:[{s:'___ двигателя.',o:['Запали','Запалва','Запалих'],pl:'Uruchom silnik.'},
      {s:'Не ___!',o:['бързай','бързаш','побързай'],pl:'Nie spiesz się!',why:'Zakaz: не + rozkaźnik niedokonany.'},
      {s:'Спри ___ пистата.',o:['пред','над','през'],pl:'Zatrzymaj się przed pasem.'},
      {s:'Рулирай бавно ___ точката на изчакване.',o:['до','от','при'],pl:'Kołuj powoli do punktu oczekiwania.'}]},
 { id:'a3-3', t:'Tankowanie i obsługa', bt:'Зареждане и обслужване',
   tip:`<p>Po liczebniku rzeczownik męski ma końcówkę <b>-а</b>: <span lang="bg">трийсет литра, два болта</span>.</p>
   <p><span lang="bg">теч</span> – wyciek: <span lang="bg">теч на масло</span>. „Naprawić” – <span lang="bg">поправя</span>.</p>`,
   w:[['tankować','зареждам'],['benzyna lotnicza','авиационен бензин'],['poziom oleju','нивото на маслото'],['dolewać','доливам'],['wyciek','теч'],['mechanik','механик'],['przegląd techniczny','технически преглед'],['śruba','болт|винт'],['klucz (narzędzie)','гаечен ключ'],['ciśnienie w oponach','налягане в гумите'],['naprawić','поправя'],['część zamienna','резервна част']],
   s:[['Zatankuj trzydzieści litrów.','Зареди трийсет литра.|Зареди тридесет литра.'],['Sprawdź poziom oleju.','Провери нивото на маслото.'],['Jest wyciek oleju.','Има теч на масло.'],['Mechanik musi to naprawić.','Механикът трябва да го поправи.'],['Potrzebujemy części zamiennej.','Трябва ни резервна част.']],
   g:[{s:'Зареди трийсет ___.',o:['литра','литри','литър'],pl:'Zatankuj trzydzieści litrów.',why:'Po liczebniku rzeczownik męski: -а.'},
      {s:'Провери ___ на маслото.',o:['нивото','нивата','нивото е'],pl:'Sprawdź poziom oleju.'},
      {s:'Механикът трябва да ___ поправи.',o:['го','му','той'],pl:'Mechanik musi to naprawić.'},
      {q:'„теч” to…',o:['wyciek','prąd','rzeka']}]},
 { id:'a3-4', t:'Dokumenty pilota', bt:'Документите на пилота',
   tip:`<p>Przymiotnik w orzeczeniu zgadza się z podmiotem: <span lang="bg">лицензът е валиден</span>, <span lang="bg">застраховката е валидна</span>, <span lang="bg">свидетелството е валидно</span>.</p>
   <p>„Do kiedy?” – <span lang="bg">До кога?</span></p>`,
   w:[['licencja','лиценз|свидетелство'],['orzeczenie lotniczo-lekarskie','медицинско свидетелство'],['ubezpieczenie','застраховка'],['rejestracja','регистрация'],['znak rejestracyjny','регистрационен знак'],['ważny (dokument)','валиден|валидна|валидно'],['nieważny','невалиден|невалидна|невалидно'],['termin ważności','срок на валидност'],['egzaminator','изпитващ'],['nalot (godziny)','летателни часове'],['wpis','вписване'],['pokazać','покажа']],
   s:[['Moja licencja jest ważna do maja.','Лицензът ми е валиден до май.'],['Pokaż dokumenty.','Покажи документите.'],['Mam trzydzieści godzin nalotu.','Имам трийсет летателни часа.'],['Orzeczenie lekarskie jest nieważne.','Медицинското свидетелство е невалидно.'],['Do kiedy jest ważne ubezpieczenie?','До кога е валидна застраховката?']],
   g:[{s:'Лицензът ми е ___ до май.',o:['валиден','валидна','валидно'],pl:'Moja licencja jest ważna do maja.'},
      {s:'До кога е ___ застраховката?',o:['валидна','валиден','валидни'],pl:'Do kiedy jest ważne ubezpieczenie?'},
      {s:'Имам трийсет летателни ___.',o:['часа','час','часът'],pl:'Mam trzydzieści godzin nalotu.'},
      {q:'„невалидно” znaczy…',o:['nieważne','niewidoczne','niezdrowe']}]}
]},
{ id:'a4', track:'air', cefr:'A2', bt:'Навигация', t:'Nawigacja', levels:[
 { id:'a4-1', t:'Strony świata', bt:'Посоки на света',
   tip:`<p><span lang="bg">север, юг, изток, запад</span>. „Na północ od…” = <b lang="bg">северно от</b>: <span lang="bg">северно от София</span>.</p>
   <p>Wiatr podajesz „skąd wieje”: <span lang="bg">вятър от запад</span>. „O dziesięć stopni” = <span lang="bg">с десет градуса</span>.</p>`,
   w:[['północ','север'],['południe','юг'],['wschód','изток'],['zachód','запад'],['północno-wschodni','североизточен'],['kurs','курс'],['kierunek','посока'],['stopień','градус'],['na północ od','северно от'],['na południe od','южно от'],['róża wiatrów','роза на ветровете'],['wiać','духа']],
   s:[['Lecimy na wschód.','Летим на изток.'],['Lotnisko jest na północ od miasta.','Летището е северно от града.'],['Weź kurs dwieście siedemdziesiąt.','Поеми курс двеста и седемдесет.'],['Wiatr wieje z zachodu.','Вятърът духа от запад.'],['Skręć w prawo o dziesięć stopni.','Завий надясно с десет градуса.']],
   g:[{s:'Летището е ___ от града.',o:['северно','север','северен'],pl:'Lotnisko jest na północ od miasta.'},
      {s:'Вятърът духа ___ запад.',o:['от','на','към'],pl:'Wiatr wieje z zachodu.'},
      {s:'Завий надясно ___ десет градуса.',o:['с','на','за'],pl:'Skręć w prawo o dziesięć stopni.'},
      {q:'„изток” to…',o:['wschód','wyjście','zachód']}]},
 { id:'a4-2', t:'Mapa i orientacja', bt:'Карта и ориентири',
   tip:`<p>Gdzie? – <b lang="bg">отляво / отдясно</b> (po lewej / po prawej). Dokąd? – <b lang="bg">наляво / надясно</b> (w lewo / w prawo).</p>
   <p>„Wzdłuż rzeki” – <span lang="bg">покрай реката</span>. <span lang="bg">язовир</span> – zbiornik zaporowy (w Bułgarii świetny punkt orientacyjny).</p>`,
   w:[['punkt orientacyjny','ориентир'],['mapa lotnicza','аеронавигационна карта|карта'],['linia kolejowa','железопътна линия'],['zbiornik zaporowy','язовир'],['wzgórze','хълм'],['skala','мащаб'],['odległość','разстояние'],['mila morska','морска миля'],['po lewej','отляво'],['po prawej','отдясно'],['pod nami','под нас'],['wzdłuż','покрай']],
   s:[['Widzę zalew po lewej stronie.','Виждам язовира отляво.'],['Pod nami jest linia kolejowa.','Под нас е железопътната линия.|Под нас има железопътна линия.'],['Jesteśmy dziesięć mil od lotniska.','На десет мили от летището сме.'],['Leć wzdłuż rzeki.','Лети покрай реката.'],['Gdzie jesteśmy na mapie?','Къде сме на картата?']],
   g:[{s:'___ десет мили от летището сме.',o:['На','В','С'],pl:'Jesteśmy dziesięć mil od lotniska.'},
      {s:'Лети ___ реката.',o:['покрай','през','под'],pl:'Leć wzdłuż rzeki.'},
      {s:'Виждам язовира ___.',o:['отляво','наляво','ляво'],pl:'Widzę zalew po lewej stronie.',why:'отляво = gdzie? po lewej; наляво = dokąd? w lewo.'},
      {q:'„язовир” to…',o:['zbiornik zaporowy','jaskinia','dolina']}]},
 { id:'a4-3', t:'Wysokość i jednostki', bt:'Височина и мерки',
   tip:`<p>Po liczebniku: <span lang="bg">хиляда фута, осемдесет възела, шестстотин метра</span> (forma na -а).</p>
   <p>„Utrzymuj” – <span lang="bg">поддържай</span>. „Zniżaj się do…” – <span lang="bg">снижи се до…</span>.</p>`,
   w:[['stopa','фут'],['metr','метър'],['węzeł','възел'],['mila','миля'],['nad poziomem morza','над морското равнище'],['nad ziemią','над земята'],['wznoszenie','набиране на височина'],['zniżanie','снижаване'],['prędkość pionowa','вертикална скорост'],['utrzymywać','поддържам'],['poziom lotu','полетно ниво'],['wysokościomierz','висотомер']],
   s:[['Utrzymuj tysiąc pięćset stóp.','Поддържай хиляда и петстотин фута.'],['Prędkość osiemdziesiąt węzłów.','Скорост осемдесет възела.'],['Lotnisko leży sześćset metrów nad poziomem morza.','Летището е на шестстотин метра над морското равнище.'],['Wznosimy się powoli.','Набираме височина бавно.'],['Zniżaj się do tysiąca stóp.','Снижи се до хиляда фута.']],
   g:[{s:'Поддържай хиляда ___.',o:['фута','футове','фут'],pl:'Utrzymuj tysiąc stóp.'},
      {s:'Скорост осемдесет ___.',o:['възела','възли','възел'],pl:'Prędkość osiemdziesiąt węzłów.'},
      {s:'Снижи се ___ хиляда фута.',o:['до','на','към'],pl:'Zniżaj się do tysiąca stóp.'},
      {q:'„над морското равнище” znaczy…',o:['nad poziomem morza','nad morzem','nad równiną']}]},
 { id:'a4-4', t:'Przestrzeń powietrzna', bt:'Въздушно пространство',
   tip:`<p>Ruch podaje się „na godzinie”: <span lang="bg">Трафик на два часа.</span> – Ruch na godzinie drugiej.</p>
   <p>„Uważaj na…” = <b lang="bg">внимавай за…</b>. Zakaz: <span lang="bg">Не влизай в зоната!</span></p>`,
   w:[['przestrzeń powietrzna','въздушно пространство'],['strefa','зона'],['strefa zakazana','забранена зона'],['strefa kontrolowana','контролирана зона'],['granica','граница'],['wlecieć (wejść)','вляза'],['opuścić','напусна'],['unikać','избягвам'],['ruch (lotniczy)','трафик'],['drugi samolot','друг самолет'],['zderzenie','сблъсък'],['uwaga!','внимание!']],
   s:[['Nie wlatuj do strefy zakazanej.','Не влизай в забранената зона.'],['Ruch na godzinie drugiej.','Трафик на два часа.'],['Widzę ten drugi samolot.','Виждам другия самолет.'],['Opuszczamy strefę.','Напускаме зоната.'],['Uważaj na granicę strefy.','Внимавай за границата на зоната.']],
   g:[{s:'Не ___ в забранената зона.',o:['влизай','влез','влизам'],pl:'Nie wlatuj do strefy zakazanej.',why:'Zakaz: не + rozkaźnik niedokonany.'},
      {s:'Трафик ___ два часа.',o:['на','в','за'],pl:'Ruch na godzinie drugiej.'},
      {s:'Виждам ___ самолет.',o:['другия','другият','другата'],pl:'Widzę ten drugi samolot.'},
      {s:'Внимавай ___ границата.',o:['за','на','от'],pl:'Uważaj na granicę.'}]},
 { id:'a4-5', t:'Plan lotu', bt:'План на полета',
   tip:`<p>Strona bierna: <span lang="bg">планът е подаден</span> (złożony), <span lang="bg">маршрутът е одобрен</span> (zatwierdzony).</p>
   <p>Wiatr: <span lang="bg">насрещен</span> – czołowy, <span lang="bg">попътен</span> – w ogon, <span lang="bg">страничен</span> – boczny.</p>`,
   w:[['plan lotu','план на полета'],['trasa','маршрут'],['punkt kontrolny','контролна точка'],['czas lotu','време на полета'],['zapas paliwa','резерв гориво'],['lotnisko zapasowe','резервно летище'],['odcinek','отсечка|участък'],['wiatr czołowy','насрещен вятър'],['wiatr w ogon','попътен вятър'],['zużycie paliwa','разход на гориво'],['obliczyć','изчисля'],['zatwierdzony','одобрен|одобрена|одобрено']],
   s:[['Plan lotu jest złożony.','Планът на полета е подаден.'],['Lot potrwa godzinę.','Полетът ще продължи един час.|Полетът ще трае един час.'],['Mamy wiatr czołowy.','Имаме насрещен вятър.'],['Lotniskiem zapasowym jest Płowdiw.','Резервното летище е Пловдив.'],['Oblicz zużycie paliwa.','Изчисли разхода на гориво.']],
   g:[{s:'Планът на полета е ___.',o:['подаден','подадена','подадено'],pl:'Plan lotu jest złożony.'},
      {s:'Имаме ___ вятър.',o:['насрещен','насрещна','насрещно'],pl:'Mamy wiatr czołowy.'},
      {s:'Изчисли ___ на гориво.',o:['разхода','разходът','разходи'],pl:'Oblicz zużycie paliwa.',why:'Dopełnienie męskie: krótki rodzajnik.'},
      {q:'„попътен вятър” to…',o:['wiatr w ogon','wiatr boczny','wiatr czołowy']}]}
]},
{ id:'a5', track:'air', cefr:'B1', bt:'Метеорология', t:'Meteo dla pilota', levels:[
 { id:'a5-1', t:'Wiatr', bt:'Вятърът',
   tip:`<p>Meldunek o wietrze: <span lang="bg">Вятър двеста и седемдесет градуса, десет възела, пориви до двайсет.</span></p>
   <p>Za wzgórzami uważaj na <span lang="bg">низходящи течения</span> (prądy zstępujące) i <span lang="bg">турбуленция</span>.</p>`,
   w:[['kierunek wiatru','посока на вятъра'],['siła wiatru','сила на вятъра'],['słaby wiatr','слаб вятър'],['silny wiatr','силен вятър'],['porywisty','поривист'],['zmienny','променлив'],['cisza (brak wiatru)','безветрие|тихо'],['uskok wiatru','срязване на вятъра'],['termika','термика|възходящо течение'],['prąd zstępujący','низходящо течение'],['zawirowanie','завихряне'],['zza wzgórza','иззад хълма']],
   s:[['Wiatr dwieście siedemdziesiąt stopni, dziesięć węzłów.','Вятър двеста и седемдесет градуса, десет възела.'],['Porywy do dwudziestu węzłów.','Пориви до двайсет възела.|Пориви до двадесет възела.'],['Wiatr jest zmienny.','Вятърът е променлив.'],['Uwaga na uskok wiatru.','Внимание, срязване на вятъра.'],['Za wzgórzem są prądy zstępujące.','Зад хълма има низходящи течения.']],
   g:[{s:'Пориви ___ двайсет възела.',o:['до','на','от'],pl:'Porywy do dwudziestu węzłów.'},
      {s:'Вятърът е ___.',o:['променлив','променлива','променливо'],pl:'Wiatr jest zmienny.'},
      {s:'Зад хълма има ___ течения.',o:['низходящи','низходящ','низходяща'],pl:'Za wzgórzem są prądy zstępujące.'},
      {q:'„безветрие” to…',o:['cisza, brak wiatru','burza','wiatr boczny']}]},
 { id:'a5-2', t:'Chmury i opady', bt:'Облаци и валежи',
   tip:`<p><b>Pułapka:</b> <span lang="bg">град</span> to i miasto, i grad (częściej mówi się <span lang="bg">градушка</span>).</p>
   <p>Podstawa chmur: <span lang="bg">базата на облаците</span> albo <span lang="bg">долната граница на облачността</span>. Chmura burzowa – <span lang="bg">купесто-дъждовен облак</span>.</p>`,
   w:[['zachmurzenie','облачност'],['podstawa chmur','база на облаците|долна граница на облачността'],['chmura kłębiasta','купест облак'],['chmura burzowa','купесто-дъждовен облак|гръмотевичен облак'],['warstwa','слой'],['przejaśnienie','разкъсване|прояснение'],['zamglenie','омара|мараня'],['oblodzenie','заледяване'],['opad','валеж'],['grad','градушка|град'],['mżawka','ръмеж'],['grzmot','гръмотевица']],
   s:[['Podstawa chmur jest na tysiąc pięćset stóp.','Базата на облаците е на хиляда и петстотин фута.'],['Zachmurzenie rośnie.','Облачността се увеличава.'],['Widzę chmurę burzową na zachodzie.','Виждам купесто-дъждовен облак на запад.|Виждам гръмотевичен облак на запад.'],['Nie wlatujemy w chmury.','Не влизаме в облаците.'],['Pada grad.','Пада градушка.|Вали град.']],
   g:[{s:'Облачността се ___.',o:['увеличава','увеличавам','увеличават'],pl:'Zachmurzenie rośnie.'},
      {s:'Базата на облаците е ___ хиляда фута.',o:['на','до','в'],pl:'Podstawa chmur jest na tysiącu stóp.'},
      {q:'„град” może znaczyć…',o:['miasto i grad','tylko miasto','ogród']},
      {q:'„ръмеж” to…',o:['mżawka','grzmot','mróz']}]},
 { id:'a5-3', t:'Ciśnienie i fronty', bt:'Налягане и фронтове',
   tip:`<p>Zmiana: <span lang="bg">налягането спада / се покачва</span> (spada / rośnie). Bezosobowo: <span lang="bg">Застудява.</span> (Robi się zimno.) <span lang="bg">Затопля се.</span> (Ociepla się.)</p>
   <p>„Pogoda się poprawi” – <span lang="bg">времето ще се оправи</span>.</p>`,
   w:[['niż','циклон|ниско налягане'],['wyż','антициклон|високо налягане'],['front ciepły','топъл фронт'],['front chłodny','студен фронт'],['hektopaskal','хектопаскал'],['spadać','спада'],['rosnąć','се покачва|расте'],['wilgotność','влажност'],['punkt rosy','точка на оросяване'],['inwersja','инверсия'],['prognoza','прогноза'],['robi się zimno','застудява']],
   s:[['Ciśnienie spada.','Налягането спада.'],['Zbliża się front chłodny.','Наближава студен фронт.|Приближава студен фронт.'],['Robi się zimno.','Застудява.'],['Wilgotność jest wysoka.','Влажността е висока.'],['Po przejściu frontu pogoda się poprawi.','След фронта времето ще се оправи.|След фронта времето ще се подобри.']],
   g:[{s:'Налягането ___.',o:['спада','спадам','спадат'],pl:'Ciśnienie spada.'},
      {s:'Наближава ___ фронт.',o:['студен','студена','студено'],pl:'Zbliża się front chłodny.'},
      {s:'Влажността е ___.',o:['висока','висок','високо'],pl:'Wilgotność jest wysoka.'},
      {s:'След фронта времето ще се ___.',o:['оправи','оправих','оправиха'],pl:'Po przejściu frontu pogoda się poprawi.'}]},
 { id:'a5-4', t:'Lecimy czy nie?', bt:'Решение за полет',
   tip:`<p>Rozważanie: <span lang="bg">По-добре да изчакаме.</span> – Lepiej poczekajmy. <span lang="bg">Ако времето се влоши, ще се върнем.</span></p>
   <p><span lang="bg">преценя</span> – ocenić (sytuację). <span lang="bg">твърде рисковано</span> – za ryzykowne.</p>`,
   w:[['warunki','условия'],['minimum pogodowe','метеорологичен минимум|минимум'],['bezpieczny','безопасен|безопасна|безопасно'],['ryzyko','риск'],['odwołać lot','отменя полета'],['opóźnić','забавя'],['poprawić się','подобри се|оправи се'],['pogorszyć się','влоши се'],['ograniczony','ограничен|ограничена|ограничено'],['ocenić (sytuację)','преценя'],['za ryzykowne','твърде рисковано'],['wrócić','върна се']],
   s:[['Warunki są poniżej minimum.','Условията са под минимума.'],['Lepiej poczekajmy godzinę.','По-добре да изчакаме един час.'],['Odwołuję lot.','Отменям полета.'],['Jeśli pogoda się pogorszy, wrócimy.','Ако времето се влоши, ще се върнем.'],['To jest zbyt ryzykowne.','Това е твърде рисковано.']],
   g:[{s:'По-добре ___ изчакаме.',o:['да','ще','че'],pl:'Lepiej poczekajmy.'},
      {s:'Условията са ___ минимума.',o:['под','над','при'],pl:'Warunki są poniżej minimum.'},
      {s:'Ако времето се ___, ще се върнем.',o:['влоши','влоших','влошихме'],pl:'Jeśli pogoda się pogorszy, wrócimy.'},
      {q:'„преценя” znaczy…',o:['ocenić (sytuację)','przecenić towar','przeczytać']}]}
]},
{ id:'a6', track:'air', cefr:'B1', bt:'Радио и процедури', t:'Radio i procedury', levels:[
 { id:'a6-1', t:'Krąg nadlotniskowy', bt:'Кръг над летището',
   tip:`<p>Liczebniki porządkowe: <span lang="bg">първи, втори, трети, четвърти</span> – <span lang="bg">четвърти завой</span>. Prosta do lądowania – <span lang="bg">последна права</span>.</p>
   <p>Odejście na drugi krąg: <span lang="bg">Минавам на втори кръг.</span></p>`,
   w:[['krąg','кръг'],['pierwszy zakręt','първи завой'],['trzeci zakręt','трети завой'],['czwarty zakręt','четвърти завой'],['prosta do lądowania','последна права'],['z wiatrem (pozycja)','по вятъра'],['trawers','траверс'],['przyziemienie','докосване'],['odejście na drugi krąg','минаване на втори кръг'],['dotyk i start','докосване и излитане'],['lewy krąg','ляв кръг'],['prawy krąg','десен кръг']],
   s:[['Jestem z wiatrem.','По вятъра съм.'],['Czwarty zakręt, do lądowania.','Четвърти завой, за кацане.'],['Odchodzę na drugi krąg.','Минавам на втори кръг.'],['Krąg jest lewy.','Кръгът е ляв.'],['Wykonam dotyk i start.','Ще направя докосване и излитане.']],
   g:[{s:'Минавам ___ втори кръг.',o:['на','в','за'],pl:'Odchodzę na drugi krąg.'},
      {s:'___ завой, за кацане.',o:['Четвърти','Четири','Четвърта'],pl:'Czwarty zakręt, do lądowania.'},
      {s:'Кръгът е ___.',o:['ляв','лява','ляво'],pl:'Krąg jest lewy.'},
      {q:'„последна права” to…',o:['prosta do lądowania','ostatnia prawda','ostatni zakręt']}]},
 { id:'a6-2', t:'Meldunki', bt:'Доклади',
   tip:`<p>Meldunki w 1. osobie: <span lang="bg">Наближавам летището.</span> (Zbliżam się do lotniska.) <span lang="bg">Прелитам над язовира.</span> (Przelatuję nad zalewem.)</p>
   <p>„W rejonie” – <span lang="bg">в района на</span>. „Za 5 minut” – <span lang="bg">след пет минути</span>.</p>`,
   w:[['meldunek','доклад'],['zgłoś (zamelduj)','докладвай'],['przelatywać nad','прелитам над'],['zbliżać się','наближавам'],['w rejonie','в района на'],['opuściłam','напуснах'],['na wysokości','на височина'],['na nasłuchu','на слушане'],['most','мост'],['miasto','град'],['za pięć minut','след пет минути'],['pozycja','позиция']],
   s:[['Przelatuję nad zalewem.','Прелитам над язовира.'],['Zbliżam się do lotniska.','Наближавам летището.'],['Zgłoś przelot nad mostem.','Докладвай при прелитане над моста.'],['Jestem w rejonie miasta, tysiąc stóp.','В района на града съм, хиляда фута.'],['Będę nad lotniskiem za pięć minut.','Ще бъда над летището след пет минути.']],
   g:[{s:'Прелитам ___ язовира.',o:['над','под','при'],pl:'Przelatuję nad zalewem.'},
      {s:'___ летището.',o:['Наближавам','Наближи','Наближават'],pl:'Zbliżam się do lotniska.'},
      {s:'Ще бъда над летището ___ пет минути.',o:['след','за','преди'],pl:'Będę nad lotniskiem za pięć minut.'},
      {s:'___ при прелитане над моста.',o:['Докладвай','Докладвам','Доклад'],pl:'Zgłoś przelot nad mostem.'}]},
 { id:'a6-3', t:'Zezwolenia', bt:'Разрешения',
   tip:`<p><span lang="bg">излитане, кацане, рулиране</span> są nijakie, więc: <span lang="bg">Излитането е разрешено.</span></p>
   <p>Polecenia: <span lang="bg">заеми</span> (zajmij), <span lang="bg">освободи</span> (zwolnij), <span lang="bg">продължи</span> (kontynuuj), <span lang="bg">потвърди</span> (potwierdź).</p>`,
   w:[['zezwalać','разрешавам'],['start dozwolony','излитането е разрешено'],['kołowanie dozwolone','рулирането е разрешено'],['zajmij pas','заеми пистата'],['zwolnij pas','освободи пистата'],['czekaj przed pasem','изчакай пред пистата'],['kontynuuj','продължи'],['przyjęłam','прието'],['potwierdź','потвърди'],['pas w użyciu','активна писта'],['zezwolenie','разрешение'],['odmowa','отказ']],
   s:[['Start dozwolony.','Излитането е разрешено.'],['Zajmij pas i czekaj.','Заеми пистата и чакай.|Заеми пистата и изчакай.'],['Zwolnij pas w lewo.','Освободи пистата наляво.'],['Kontynuuj podejście.','Продължи подхода.'],['Potwierdź, proszę.','Потвърди, моля.|Потвърдете, моля.']],
   g:[{s:'Излитането е ___.',o:['разрешено','разрешен','разрешена'],pl:'Start dozwolony.'},
      {s:'___ пистата и чакай.',o:['Заеми','Заемам','Заема'],pl:'Zajmij pas i czekaj.'},
      {s:'Продължи ___.',o:['подхода','подходът','подходи'],pl:'Kontynuuj podejście.'},
      {s:'Освободи пистата ___.',o:['наляво','отляво','ляво'],pl:'Zwolnij pas w lewo.',why:'Dokąd? → наляво.'}]},
 { id:'a6-4', t:'Słyszalność i transponder', bt:'Чуваемост и транспондер',
   tip:`<p>Kod transpondera mówisz cyframi: <span lang="bg">седем, нула, нула, нула</span>.</p>
   <p>Słyszalność: <span lang="bg">Чувам те силно и ясно.</span> – Słyszę cię głośno i wyraźnie. <span lang="bg">прекъсва</span> – przerywa.</p>`,
   w:[['zero','нула'],['kanał','канал'],['głośno i wyraźnie','силно и ясно'],['słabo słyszę','чувам слабо'],['przerywa','прекъсва'],['nadajnik','предавател'],['odbiornik','приемник'],['przełączyć','превключа'],['transponder','транспондер'],['kod','код'],['ustaw','задай'],['trzeszczy','пращи']],
   s:[['Słyszę cię głośno i wyraźnie.','Чувам те силно и ясно.'],['Słabo cię słyszę, przerywa.','Чувам те слабо, прекъсва.'],['Ustaw kod siedem zero zero zero.','Задай код седем нула нула нула.'],['Przejdź na kanał drugi.','Премини на канал две.'],['Radio trzeszczy.','Радиото пращи.']],
   g:[{s:'Чувам ___ силно и ясно.',o:['те','ти','теб'],pl:'Słyszę cię głośno i wyraźnie.'},
      {s:'Премини ___ канал две.',o:['на','в','към'],pl:'Przejdź na kanał drugi.'},
      {q:'„прекъсва” w radiu znaczy…',o:['przerywa','przekracza','przełącza']},
      {s:'___ код седем нула нула нула.',o:['Задай','Задавам','Зададох'],pl:'Ustaw kod 7000.'}]},
 { id:'a6-5', t:'Nieporozumienia', bt:'Недоразумения',
   tip:`<p>W łączności zamiast „tak / nie”: <span lang="bg">утвърдително / отрицателно</span>. Poprawka: <span lang="bg">Поправка: курс двеста.</span></p>
   <p>Grzecznie: <span lang="bg">Извинете, не разбрах.</span> „Wolniej” – <span lang="bg">по-бавно</span>.</p>`,
   w:[['nie zrozumiałam','не разбрах'],['powtórz wolniej','повтори по-бавно'],['co powiedziałeś?','какво каза?'],['pomyłka','грешка'],['poprawka','поправка'],['afirmatyw (tak)','утвърдително'],['negatyw (nie)','отрицателно'],['czy mnie słyszysz?','чуваш ли ме?'],['źle (błędnie)','погрешно'],['dokładnie','точно'],['jeszcze raz','още веднъж'],['litera po literze','буква по буква']],
   s:[['Przepraszam, nie zrozumiałam.','Извинете, не разбрах.'],['Powtórz wolniej, proszę.','Повтори по-бавно, моля.'],['Czy mnie słyszysz?','Чуваш ли ме?'],['Poprawka: kurs dwieście.','Поправка: курс двеста.'],['Negatyw, nie jestem gotowa.','Отрицателно, не съм готова.']],
   g:[{s:'Извинете, не ___.',o:['разбрах','разбера','разбирай'],pl:'Przepraszam, nie zrozumiałam.'},
      {s:'Чуваш ли ___?',o:['ме','ми','аз'],pl:'Czy mnie słyszysz?'},
      {s:'Повтори по-___, моля.',o:['бавно','бавен','бавна'],pl:'Powtórz wolniej, proszę.'},
      {q:'„утвърдително” w łączności znaczy…',o:['tak (potwierdzam)','nie','powtórz']}]}
]},
{ id:'a7', track:'air', cefr:'B1', bt:'Аварии и техника', t:'Awarie i technika', levels:[
 { id:'a7-1', t:'Awarie w locie', bt:'Аварии в полет',
   tip:`<p>Opis problemu: <span lang="bg">Имам силни вибрации.</span> <span lang="bg">Усещам мирис на изгоряло.</span> (Czuję zapach spalenizny.)</p>
   <p>Hasła PAN-PAN i MAYDAY są międzynarodowe. Najważniejsze: <span lang="bg">Запази спокойствие.</span></p>`,
   w:[['dym','дим'],['zapach spalenizny','мирис на изгоряло'],['wibracje','вибрации'],['spadek obrotów','спадане на оборотите'],['przegrzanie','прегряване'],['usterka','неизправност'],['ostrzeżenie','предупреждение'],['lampka ostrzegawcza','предупредителна лампа'],['zgłosić awarię','обявя авария'],['zachować spokój','запазя спокойствие'],['przegrzewać się','прегрява'],['świecić się','свети']],
   s:[['Czuję zapach spalenizny.','Усещам мирис на изгоряло.'],['Mam silne wibracje.','Имам силни вибрации.'],['Świeci się lampka ostrzegawcza.','Свети предупредителната лампа.|Свети предупредителна лампа.'],['Silnik się przegrzewa.','Двигателят прегрява.'],['Zachowaj spokój.','Запази спокойствие.']],
   g:[{s:'Усещам мирис ___ изгоряло.',o:['на','от','за'],pl:'Czuję zapach spalenizny.'},
      {s:'Двигателят ___.',o:['прегрява','прегрявам','прегряват'],pl:'Silnik się przegrzewa.'},
      {s:'Имам ___ вибрации.',o:['силни','силна','силен'],pl:'Mam silne wibracje.'},
      {s:'___ спокойствие.',o:['Запази','Запазва','Запазих'],pl:'Zachowaj spokój.'}]},
 { id:'a7-2', t:'Lądowanie w terenie', bt:'Кацане в полето',
   tip:`<p>Wiatrakowiec ląduje na bardzo krótkim odcinku, ale największym zagrożeniem są <span lang="bg">електропроводите</span> – linie energetyczne.</p>
   <p>Zaimek wskazujący: <span lang="bg">този</span> (m), <span lang="bg">тази</span> (ż), <span lang="bg">това</span> (n), <span lang="bg">тези</span> (l.mn.).</p>`,
   w:[['wybrać','избера'],['przeszkoda','препятствие'],['linie energetyczne','електропроводи'],['drzewa','дървета'],['zbocze','склон'],['łąka','ливада'],['zboże','жито|посеви'],['długość','дължина'],['nachylenie','наклон'],['twardy grunt','твърда почва'],['miękki grunt','мека почва'],['zwierzęta','животни']],
   s:[['Wybieram tę łąkę.','Избирам тази ливада.'],['Uważaj na linie energetyczne.','Внимавай за електропроводите.'],['Pole jest za krótkie.','Полето е твърде късо.'],['Lądujemy pod wiatr.','Кацаме срещу вятъра.'],['Na końcu pola są drzewa.','В края на полето има дървета.']],
   g:[{s:'Избирам ___ ливада.',o:['тази','този','това'],pl:'Wybieram tę łąkę.'},
      {s:'Полето е твърде ___.',o:['късо','къс','къса'],pl:'Pole jest za krótkie.',why:'поле – nijakie.'},
      {s:'___ края на полето има дървета.',o:['В','На','До'],pl:'Na końcu pola są drzewa.'},
      {q:'„електропроводи” to…',o:['linie energetyczne','przewody w kabinie','elektrownie']}]},
 { id:'a7-3', t:'Technika pilotażu', bt:'Техника на пилотиране',
   tip:`<p>W wiatrakowcu nie wolno doprowadzić do stanu nieważkości – wirnik traci obroty. „Nie wolno” = <b lang="bg">не бива</b>.</p>
   <p>Jak? – przysłówek na <b>-о</b>: <span lang="bg">плавно</span> (płynnie), <span lang="bg">рязко</span> (gwałtownie).</p>`,
   w:[['przeciążenie','претоварване'],['nieważkość','безтегловност'],['obroty wirnika','обороти на ротора'],['płynnie','плавно'],['gwałtownie','рязко'],['drążek','лост|ръчка'],['nie wolno','не бива'],['przechylenie','крен|наклон'],['pochylenie','тангаж'],['utrzymać','задържа'],['wyrównać','изравня'],['pchać','бутам']],
   s:[['Ruszaj drążkiem płynnie.','Движи лоста плавно.'],['Nie wolno gwałtownie pchać drążka.','Не бива да буташ рязко лоста.'],['Obroty wirnika spadają.','Оборотите на ротора спадат.'],['Wyrównaj przed przyziemieniem.','Изравни преди докосването.'],['Utrzymaj prędkość.','Задръж скоростта.']],
   g:[{s:'Движи лоста ___.',o:['плавно','плавен','плавна'],pl:'Ruszaj drążkiem płynnie.',why:'Jak? → przysłówek na -о.'},
      {s:'Не ___ да буташ рязко лоста.',o:['бива','бие','била'],pl:'Nie wolno gwałtownie pchać drążka.'},
      {s:'Оборотите на ротора ___.',o:['спадат','спада','спадам'],pl:'Obroty wirnika spadają.'},
      {s:'Изравни ___ докосването.',o:['преди','след','при'],pl:'Wyrównaj przed przyziemieniem.'}]},
 { id:'a7-4', t:'Po locie', bt:'След полета',
   tip:`<p>Omówienie lotu to <span lang="bg">разбор на полета</span>. Pochwała instruktora: <span lang="bg">Справи се добре!</span> – Poradziłaś sobie dobrze!</p>
   <p>Przed <b>с / з</b> przyimek <span lang="bg">с</span> zmienia się w <b lang="bg">със</b>: <span lang="bg">горда съм със себе си</span>.</p>`,
   w:[['omówienie lotu','разбор на полета'],['poradzić sobie','справя се'],['postęp','напредък'],['następnym razem','следващия път'],['poprawić','подобря'],['zapamiętać','запомня'],['pochwała','похвала'],['zmęczenie','умора'],['zadowolona','доволна|доволен'],['dumna','горда|горд'],['świetnie','отлично|чудесно'],['ćwiczenie','упражнение']],
   s:[['Poradziłaś sobie dobrze!','Справи се добре!'],['Następnym razem popraw lądowanie.','Следващия път подобри кацането.'],['Robisz duże postępy.','Имаш голям напредък.'],['Jestem z siebie dumna.','Горда съм със себе си.'],['Jestem zmęczona, ale zadowolona.','Уморена съм, но съм доволна.']],
   g:[{s:'Справи ___ добре!',o:['се','си','те'],pl:'Poradziłaś sobie dobrze!'},
      {s:'___ път подобри кацането.',o:['Следващия','Следващият','Следващата'],pl:'Następnym razem popraw lądowanie.'},
      {s:'Горда съм ___ себе си.',o:['със','с','от'],pl:'Jestem z siebie dumna.',why:'Przed с/з mówimy със.'},
      {s:'Уморена съм, но съм ___.',o:['доволна','доволен','доволно'],pl:'Jestem zmęczona, ale zadowolona.'}]}
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

/* ---------------- ODMIANA CZASOWNIKÓW ----------------
   [polski, bułgarski (hasło), czas teraźniejszy: аз ти той ние вие те, czas przeszły (aoryst): to samo, uwaga?, dokonany?, zwrotny (се)?]
   Dla par niedokonany/dokonany teraźniejszy jest od niedokonanego, przeszły od dokonanego. pf:true = czasownik dokonany (teraźniejszy tylko po „да” / „ще”). */
const VERBS = [
 ['być','съм','съм си е сме сте са','бях беше беше бяхме бяхте бяха','W przeszłości zwykle mówi się „беше” (on/ty był).'],
 ['mieć','имам','имам имаш има имаме имате имат','имах имаше имаше имахме имахте имаха'],
 ['chcieć','искам','искам искаш иска искаме искате искат','исках иска иска искахме искахте искаха'],
 ['mówić','говоря','говоря говориш говори говорим говорите говорят','говорих говори говори говорихме говорихте говориха'],
 ['latać / lecieć','летя','летя летиш лети летим летите летят','летях летя летя летяхме летяхте летяха'],
 ['czytać','чета','чета четеш чете четем четете четат','четох чете чете четохме четохте четоха'],
 ['pisać','пиша','пиша пишеш пише пишем пишете пишат','писах писа писа писахме писахте писаха'],
 ['mieszkać / żyć','живея','живея живееш живее живеем живеете живеят','живях живя живя живяхме живяхте живяха'],
 ['pić','пия','пия пиеш пие пием пиете пият','пих пи пи пихме пихте пиха'],
 ['jeść','ям','ям ядеш яде ядем ядете ядат','ядох яде яде ядохме ядохте ядоха'],
 ['móc','мога','мога можеш може можем можете могат','можах можа можа можахме можахте можаха'],
 ['robić','правя','правя правиш прави правим правите правят','правих прави прави правихме правихте правиха'],
 ['pracować','работя','работя работиш работи работим работите работят','работих работи работи работихме работихте работиха'],
 ['uczyć się','уча','уча учиш учи учим учите учат','учих учи учи учихме учихте учиха'],
 ['chodzić','ходя','ходя ходиш ходи ходим ходите ходят','ходих ходи ходи ходихме ходихте ходиха'],
 ['spać','спя','спя спиш спи спим спите спят','спах спа спа спахме спахте спаха'],
 ['stać','стоя','стоя стоиш стои стоим стоите стоят','стоях стоя стоя стояхме стояхте стояха'],
 ['śpiewać','пея','пея пееш пее пеем пеете пеят','пях пя пя пяхме пяхте пяха'],
 ['kochać / lubić','обичам','обичам обичаш обича обичаме обичате обичат','обичах обича обича обичахме обичахте обичаха'],
 ['czekać','чакам','чакам чакаш чака чакаме чакате чакат','чаках чака чака чакахме чакахте чакаха'],
 ['widzieć','виждам / видя','виждам виждаш вижда виждаме виждате виждат','видях видя видя видяхме видяхте видяха'],
 ['dawać / dać','давам / дам','давам даваш дава даваме давате дават','дадох даде даде дадохме дадохте дадоха'],
 ['mówić / powiedzieć','казвам / кажа','казвам казваш казва казваме казвате казват','казах каза каза казахме казахте казаха'],
 ['kupować / kupić','купувам / купя','купувам купуваш купува купуваме купувате купуват','купих купи купи купихме купихте купиха'],
 ['brać / wziąć','вземам / взема','вземам вземаш взема вземаме вземате вземат','взех взе взе взехме взехте взеха'],
 ['rozumieć / zrozumieć','разбирам / разбера','разбирам разбираш разбира разбираме разбирате разбират','разбрах разбра разбра разбрахме разбрахте разбраха'],
 ['lądować / wylądować','кацам / кацна','кацам кацаш каца кацаме кацате кацат','кацнах кацна кацна кацнахме кацнахте кацнаха'],
 ['startować / wystartować','излитам / излетя','излитам излиташ излита излитаме излитате излитат','излетях излетя излетя излетяхме излетяхте излетяха'],
 ['płacić / zapłacić','плащам / платя','плащам плащаш плаща плащаме плащате плащат','платих плати плати платихме платихте платиха'],
 ['pomagać / pomóc','помагам / помогна','помагам помагаш помага помагаме помагате помагат','помогнах помогна помогна помогнахме помогнахте помогнаха'],
 ['pójść','отида','отида отидеш отиде отидем отидете отидат','отидох отиде отиде отидохме отидохте отидоха','Czasownik dokonany: teraźniejszy tylko po „да” i „ще”.',true],
 ['przyjść','дойда','дойда дойдеш дойде дойдем дойдете дойдат','дойдох дойде дойде дойдохме дойдохте дойдоха','Czasownik dokonany: teraźniejszy tylko po „да” i „ще”.',true],
 ['wrócić','върна се','върна върнеш върне върнем върнете върнат','върнах върна върна върнахме върнахте върнаха','Czasownik dokonany i zwrotny: „се” stoi przed nim, gdy coś jest wcześniej – „ще се върна”, „вчера се върнах”.',true,true]
];

/* ---------------- GRY: PIOSENKI Z LUKĄ ----------------
   Tylko utwory sprzed 1929 r. (pieśni ludowe, hymny i wiersze śpiewane jako pieśni – domena publiczna).
   Współczesnych tekstów nie cytujemy (prawa autorskie). gaps: [słowo z tekstu, 3 błędne odpowiedzi] */
const LYRICS = [
 {song:'Мила Родино', who:'hymn Bułgarii, sł. Cwetan Radosławow (1885)', text:'Горда Стара планина, до ней Дунава синей', tr:'Dumna Stara Płanina, obok niej błękitnieje Dunaj', gaps:[['Горда',['Мила','Бяла','Тиха']],['планина',['река','гора','страна']],['Дунава',['Марица','Искъра','Янтра']],['синей',['шуми','тече','пее']]]},
 {song:'Мила Родино', who:'hymn Bułgarii', text:'слънце Тракия огрява, над Пирина пламеней', tr:'słońce oświetla Trację, nad Pirinem płonie zorza', gaps:[['слънце',['луна','звезда','вятър']],['Тракия',['Добруджа','Родопа','Варна']],['Пирина',['Балкана','Дунава','Витоша']]]},
 {song:'Мила Родино', who:'refren hymnu Bułgarii', text:'Мила Родино, ти си земен рай', tr:'Miła Ojczyzno, jesteś rajem na ziemi', gaps:[['Родино',['Марийо','горо','майко']],['земен',['морски','горски','вечен']],['рай',['край','дом','град']]]},
 {song:'Мила Родино', who:'refren hymnu Bułgarii', text:'твойта хубост, твойта прелест, ах, те нямат край', tr:'twoje piękno, twój urok – ach, nie mają końca', gaps:[['хубост',['младост','радост','сила']],['прелест',['песен','слава','мъка']],['край',['рай','брой','ден']]]},
 {song:'Мила Родино', who:'hymn Bułgarii, 2. zwrotka', text:'Паднаха борци безчет за народа наш любим', tr:'Polegli niezliczeni bojownicy za nasz ukochany naród', gaps:[['борци',['деца','птици','майки']],['народа',['града','царя','морето']],['любим',['далечен','малък','стар']]]},
 {song:'Мила Родино', who:'hymn Bułgarii, 2. zwrotka', text:'майко, дай ни мъжка сила пътя им да продължим', tr:'matko, daj nam męską siłę, byśmy kontynuowali ich drogę', gaps:[['сила',['вяра','радост','песен']],['пътя',['песента','войната','града']],['продължим',['забравим','изгубим','спрем']]]},
 {song:'Шуми Марица', who:'dawny hymn Bułgarii, sł. Nikoła Żiwkow (1876)', text:'Шуми Марица окървавена, плаче вдовица люто ранена', tr:'Szumi Marica zakrwawiona, płacze wdowa ciężko zraniona', gaps:[['Шуми',['Пее','Спи','Мълчи']],['Марица',['Янтра','Искър','Тунджа']],['плаче',['пее','шета','спи']],['вдовица',['девица','майка','сестра']]]},
 {song:'Шуми Марица', who:'refren dawnego hymnu', text:'Марш, марш, с генерала наш! Раз, два, три, марш, войници!', tr:'Marsz, marsz z naszym generałem! Raz, dwa, trzy – marsz, żołnierze!', gaps:[['генерала',['войника','капитана','народа']],['войници',['деца','юнаци','моми']]]},
 {song:'Тих бял Дунав (Радецки)', who:'sł. Iwan Wazow (1876)', text:'Тих бял Дунав се вълнува, весело шуми', tr:'Cichy biały Dunaj faluje, wesoło szumi', gaps:[['бял',['син','стар','мил']],['вълнува',['усмихва','събужда','връща']],['весело',['тъжно','тихо','силно']],['шуми',['пее','плаче','спи']]]},
 {song:'Тих бял Дунав (Радецки)', who:'sł. Iwan Wazow (1876)', text:'и Радецки гордо плува над златни вълни', tr:'a Radetzky dumnie płynie po złotych falach', gaps:[['гордо',['тихо','бавно','тъжно']],['плува',['лети','тича','спи']],['златни',['сини','бели','сребърни']],['вълни',['поля','гори','планини']]]},
 {song:'Аз съм българче', who:'wiersz Iwana Wazowa – śpiewany przez dzieci', text:'Аз съм българче и обичам наште планини зелени', tr:'Jestem małym Bułgarem i kocham nasze zielone góry', gaps:[['българче',['полякиня','пилот','юначе']],['обичам',['виждам','помня','питам']],['планини',['градове','реки','поля']],['зелени',['високи','сини','бели']]]},
 {song:'Аз съм българче', who:'wiersz Iwana Wazowa', text:'българин да се наричам – първа радост е за мене', tr:'nazywać się Bułgarem – to dla mnie pierwsza radość', gaps:[['наричам',['срещам','обаждам','връщам']],['първа',['втора','последна','голяма']],['радост',['мъка','обич','слава']]]},
 {song:'Върви, народе възродени', who:'hymn Cyryla i Metodego, sł. Stojan Michajłowski (1892)', text:'Върви, народе възродени, към светла бъднина върви', tr:'Idź, narodzie odrodzony, ku jasnej przyszłości idź', gaps:[['народе',['юнако','майко','горо']],['възродени',['свободни','велики','любими']],['светла',['тъмна','стара','далечна']],['бъднина',['планина','родина','вечност']]]},
 {song:'Върви, народе възродени', who:'śpiewany 24 maja', text:'с книжовността, таз сила нова, съдбините си ти поднови', tr:'piśmiennictwem, tą nową siłą, odnów swój los', gaps:[['сила',['песен','вяра','дума']],['нова',['стара','тиха','вечна']],['поднови',['забрави','изгуби','продаде']]]},
 {song:'Хаджи Димитър', who:'Christo Botew (1873) – śpiewany jako pieśń', text:'Жив е той, жив е! Там на Балкана', tr:'On żyje, żyje! Tam, na Bałkanie', gaps:[['Жив',['Млад','Тих','Сам']],['Балкана',['Дунава','полето','морето']]]},
 {song:'Хаджи Димитър', who:'Christo Botew (1873)', text:'потънал в кърви, лежи и пъшка юнак със дълбока на гърди рана', tr:'zalany krwią, leży i jęczy junak z głęboką raną na piersi', gaps:[['кърви',['сълзи','рози','мъгли']],['лежи',['пее','стои','тича']],['юнак',['старец','овчар','момък']],['рана',['песен','кърпа','звезда']]]},
 {song:'Хаджи Димитър', who:'Christo Botew (1873)', text:'юнак във младост и в сила мъжка', tr:'junak w młodości i w męskiej sile', gaps:[['младост',['старост','радост','слава']],['сила',['мъка','песен','вяра']]]},
 {song:'Хаджи Димитър', who:'Christo Botew (1873)', text:'Тоз, който падне в бой за свобода, той не умира', tr:'Ten, kto padnie w boju o wolność, nie umiera', gaps:[['падне',['пее','стои','бяга']],['свобода',['пари','слава','любов']],['умира',['забравя','плаче','спи']]]},
 {song:'Хаджи Димитър', who:'Christo Botew (1873)', text:'него жалеят земя и небо, звяр и природа', tr:'opłakują go ziemia i niebo, zwierz i przyroda', gaps:[['земя',['море','гора','град']],['небо',['слънце','река','поле']],['звяр',['човек','цар','кон']]]},
 {song:'Хаджи Димитър', who:'Christo Botew (1873)', text:'и певци песни за него пеят', tr:'a śpiewacy pieśni o nim śpiewają', gaps:[['певци',['деца','майки','войници']],['песни',['приказки','молитви','думи']]]},
 {song:'Хаджи Димитър', who:'Christo Botew (1873)', text:'Настане вечер – месец изгрее, звезди обсипят сводът небесен', tr:'Zapada wieczór – wschodzi księżyc, gwiazdy obsypują niebieskie sklepienie', gaps:[['вечер',['утро','лято','зима']],['месец',['слънце','вятър','облак']],['звезди',['птици','листа','капки']],['небесен',['морски','горски','земен']]]},
 {song:'Обесването на Васил Левски', who:'Christo Botew (1876)', text:'О, майко моя, родино мила, защо тъй жално, тъй милно плачеш?', tr:'O, matko moja, ojczyzno miła, czemu tak żałośnie, tak rzewnie płaczesz?', gaps:[['майко',['горо','сестро','Марийо']],['родино',['планино','свобода','Тодоро']],['мила',['стара','бяла','тиха']],['плачеш',['пееш','шумиш','спиш']]]},
 {song:'На прощаване', who:'Christo Botew (1868)', text:'Не плачи, майко, не тъжи, че станах ази хайдутин', tr:'Nie płacz, matko, nie smuć się, że zostałem hajdukiem', gaps:[['плачи',['пей','спи','питай']],['тъжи',['бързай','мълчи','чакай']],['хайдутин',['учител','овчар','войник']]]},
 {song:'Моята молитва', who:'Christo Botew (1873)', text:'О, мой боже, правий боже! Не ти, що си в небесата', tr:'O, mój Boże, sprawiedliwy Boże! Nie ty, który jesteś w niebiosach', gaps:[['правий',['мили','стари','далечни']],['небесата',['горите','водите','градовете']]]},
 {song:'Българският език', who:'Iwan Wazow (1883)', text:'Език свещен на моите деди', tr:'Święty języku moich przodków', gaps:[['свещен',['забравен','чужд','нов']],['деди',['деца','приятели','съседи']]]},
 {song:'Българският език', who:'Iwan Wazow (1883)', text:'език на мъки, стонове вековни', tr:'języku mąk, wiekowych jęków', gaps:[['мъки',['песни','радост','приказки']],['вековни',['весели','нови','тихи']]]},
 {song:'Отечество любезно', who:'Iwan Wazow – wiersz śpiewany w szkołach', text:'Отечество любезно, как хубаво си ти!', tr:'Ojczyzno umiłowana, jakaż jesteś piękna!', gaps:[['любезно',['далечно','малко','студено']],['хубаво',['тъжно','тихо','старо']]]},
 {song:'Отечество любезно', who:'Iwan Wazow', text:'Как чудно се синее небето ти безкрай!', tr:'Jak cudnie błękitnieje twoje niebo bez końca!', gaps:[['синее',['смее','пее','мръщи']],['небето',['морето','полето','реката']]]},
 {song:'Стани, стани, юнак балкански', who:'Dobri Czintułow (ok. 1860)', text:'Стани, стани, юнак балкански, от сън дълбок се събуди', tr:'Wstań, wstań, bałkański junaku, z głębokiego snu się zbudź', gaps:[['Стани',['Седни','Легни','Мълчи']],['балкански',['морски','горски','дунавски']],['сън',['мрак','път','град']],['събуди',['скрий','спри','върни']]]},
 {song:'Излел е Дельо хайдутин', who:'pieśń ludowa z Rodopów – nagranie poleciało w kosmos na sondzie Voyager', text:'Излел е Дельо хайдутин', tr:'Wyszedł Delo, hajduk', gaps:[['Дельо',['Стоян','Марко','Иван']],['хайдутин',['овчар','свирач','търговец']]]},
 {song:'Полегнала е Тодора', who:'pieśń ludowa', text:'Полегнала е Тодора', tr:'Położyła się (do snu) Todora', gaps:[['Тодора',['Марийка','Радка','Яна']],['Полегнала',['Заплакала','Запяла','Тръгнала']]]},
 {song:'Хубава си, моя горо', who:'sł. Luben Karawełow – pieśń znana z Bałkanów', text:'Хубава си, моя горо', tr:'Piękny jesteś, mój lesie', gaps:[['горо',['майко','Родино','моме']],['Хубава',['Тъжна','Стара','Тиха']]]},
 {song:'Две хубави очи', who:'Pejo Jaworow (1907) – wiersz śpiewany jako romans', text:'Две хубави очи. Душата на дете в две хубави очи', tr:'Dwoje pięknych oczu. Dusza dziecka w dwojgu pięknych oczach', gaps:[['хубави',['тъжни','сини','стари']],['Душата',['Сърцето','Песента','Мечтата']],['дете',['майка','птица','мома']]]},
 {song:'Да се завърнеш…', who:'Dimczo Debelanow (1915)', text:'Да се завърнеш в бащината къща', tr:'Wrócić do ojcowskiego domu', gaps:[['завърнеш',['изгубиш','скриеш','разплачеш']],['бащината',['майчината','старата','новата']],['къща',['градина','църква','нива']]]},
 {song:'Помниш ли, помниш ли…', who:'Dimczo Debelanow', text:'Помниш ли, помниш ли тихия двор', tr:'Pamiętasz, pamiętasz to ciche podwórze', gaps:[['тихия',['шумния','стария','малкия']],['двор',['град','път','мост']]]}
];
