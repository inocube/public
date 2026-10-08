# Website copy (SK), approved

Source: owner's document "Inocube – ponuka služieb a prípadové štúdie" (2026-10-07). Clients are anonymised
on purpose; no prices, quotes or numbers beyond what is written here.

## Hero
- **Nadpis:** AI a dáta napojené na vaše existujúce systémy
- **Podnadpis:** Navrhujeme a vyvíjame AI agentov, dátové riešenia a aplikácie na mieru pre firmy a finančné
  inštitúcie na Slovensku a v Česku. Bezpečne, s napojením na SAP, .NET a SQL a v súlade s AI Act.
- **Výzva k akcii:** Dohodnite si 30-minútovú konzultáciu zdarma

## Prečo Inocube (tri body pod hlavičkou)
- AI v produkcii, nie len prezentácie: náš AI agent beží vo finančnej inštitúcii v ČR.
- Rozumieme podnikovým systémom: SAP HANA, .NET, SQL, JIRA, bankové prostredie.
- Malý senior tím: hovoríte priamo s tým, kto riešenie navrhuje aj programuje.

## Balíček 1: AI agent pre vašu firmu
**Pre koho:** firmy, kde ľudia trávia hodiny hľadaním v dokumentoch, prepisovaním údajov medzi systémami
alebo odpovedaním na stále rovnaké otázky klientov a kolegov.

**Čo dostanete:**
- AI asistenta nad vašimi dokumentmi a dátami (smernice, zmluvy, produktové podmienky), v slovenčine aj
  češtine.
- Napojenie na vaše systémy (API, SAP, .NET backend, SQL, JIRA), takže agent nielen odpovedá, ale aj vykoná
  úlohu: overí stav, založí požiadavku, pripraví dokument.
- Bezpečnosť v základe: riadenie prístupov, audit log každej akcie, hosting v EÚ, transparentnosť podľa
  AI Act.

**Ako prebieha spolupráca:**
1. Workshop (1 až 2 dni): vyberieme proces s najväčším prínosom a určíme merateľný cieľ.
2. Proof of Concept (4 až 6 týždňov): agent na vašich reálnych dátach.
3. Produkčné nasadenie a integrácie.
4. Prevádzka a ďalší rozvoj za mesačný paušál.

**Referencia:** AI agent pre stavebnú sporiteľňu v ČR.

## Balíček 2: Dáta a reporting
**Pre koho:** firmy, ktoré majú dáta rozhádzané v niekoľkých systémoch a mesačné reporty skladajú ručne
v Exceli.

**Čo dostanete:**
- Prepojenie zdrojov dát (ERP alebo SAP, SQL databázy, Excel) do jedného dátového modelu.
- Dashboardy a automatické reporty pre vedenie, obchod a financie.
- Ako ďalší krok AI nad dátami: otázky v bežnej reči („aké boli tržby podľa regiónu za Q3?“), upozornenia na
  odchýlky, jednoduché predikcie.

**Ako prebieha spolupráca:** dátový audit (1 týždeň), prvý funkčný dashboard do 4 týždňov, potom postupné
rozširovanie.

**Referencia:** integrácia na SAP HANA pri nástupe zamestnancov v banke, SQL riešenia pre bankové interné
aplikácie.

## Balíček 3: Aplikácie na mieru a modernizácia
**Pre koho:** firmy, ktorým štandardný softvér nesedí, alebo ktoré prevádzkujú starý interný systém, ktorý už
nikto nechce udržiavať.

**Čo dostanete:**
- Webové aplikácie a interné portály (Angular, .NET, SQL).
- Modernizáciu starých systémov po častiach, bez veľkého „big bang“ prepisu.
- Integrácie na existujúce systémy a vývoj nad low-code platformami.

**Ako prebieha spolupráca:** analýza a návrh, vývoj v dvojtýždňových iteráciách s ukážkou funkčnej verzie,
nasadenie a podpora.

**Referencie:** systém správy obsahu pre banku, digitálny nástup zamestnancov pre banku, low-code platforma
Solvedio.

## Prípadové štúdie
Každá štúdia: výzva, riešenie, technológie, výsledok. Klienti sú anonymizovaní podľa odvetvia a krajiny.

### 1. AI agent pre finančnú inštitúciu v ČR
- **Výzva:** používatelia firemných systémov potrebujú prístup cez AWS a Azure subscription. Ich zadávanie,
  každoročná obnova, kontrola a sledovanie rozpočtu pre jednotlivé skupiny používateľov boli ručné
  a roztrieštené medzi viaceré miesta.
- **Riešenie:** AI agent, s ktorým používatelia a správcovia komunikujú v prirodzenom jazyku. Cez napojenie na
  backendové služby klienta prevezme údaje nového používateľa a vyžiada mu novú subscription, stráži
  a spravuje ročné obnovy, kontroluje existujúce subscription a sleduje čerpanie rozpočtu podľa skupín
  používateľov.
- **Technológie:** Python, AWS, DynamoDB, integrácia na backend služby.
- **Výsledok:** správa cloudových prístupov a nákladov na jednom mieste, s agentom, ktorý sa riadi pravidlami
  klienta a pracuje s jeho reálnymi údajmi v regulovanom finančnom prostredí. Ide o prepojenie AI s FinOps,
  teda riadením nákladov na cloud.

### 2. Systém správy obsahu pre banku
- **Výzva:** banka potrebovala internú aplikáciu na správu obsahu, ktorá spĺňa jej bezpečnostné pravidlá
  a zapadá do jej IT prostredia, čo hotové riešenia nesplnili.
- **Riešenie:** CMS na mieru s rolami, schvaľovacím procesom a bezpečnostnými požiadavkami bankového
  prostredia.
- **Technológie:** Angular, C#, SQL.
- **Výsledok:** interná aplikácia na mieru, ktorú si banka spravuje sama a ktorá prešla jej bezpečnostnými
  požiadavkami.

### 3. Digitálny nástup nového zamestnanca v banke
- **Výzva:** pri nástupe nového zamestnanca bolo treba získať jeho osobné údaje (meno, adresa, rodinný stav,
  uplatnenie nezdaniteľnej časti základu dane a ďalšie), založiť ho v internom systéme SAP HANA a informovať
  personalistu. Ručné prepisovanie medzi formulármi a systémami je pomalé a náchylné na chyby.
- **Riešenie:** webová aplikácia, v ktorej nový zamestnanec sám vyplní svoje údaje. Systém ho potom
  automaticky založí v SAP HANA a vytvorí JIRA tiket pre HR personalistu so základnými údajmi o novom
  zamestnancovi, takže personalista hneď vie, že údaje sú vyplnené a zamestnanec je založený.
- **Technológie:** Angular, JIRA, SAP HANA, jtoken.
- **Výsledok:** jeden súvislý proces namiesto troch ručných krokov. Údaje zadáva ten, kto ich pozná, do SAP sa
  dostanú bez prepisovania a HR má prehľad v nástroji, ktorý už používa.

### 4. Low-code platforma Solvedio
- **Výzva:** [Solvedio](https://solvedio.com/) je platforma na rýchlu digitalizáciu firemných procesov (zber
  dát, prepojenie tímov a nástrojov, prehľad pre vedenie), používaná najmä vo výrobe a automotive. Produkt
  potrebuje stabilný a rýchly vývoj rozhrania pre rôzne roly používateľov.
- **Riešenie:** dlhodobý vývoj produktu ako súčasť tímu výrobcu platformy, od nových funkcií po opravy
  a automatizované testy.
- **Technológie:** Angular, automatizované testy (Robot Framework).
- **Výsledok:** platformu podľa jej webu používajú firmy ako Continental, Kaufland, Schaeffler či Jaguar Land
  Rover a výrobca uvádza až 10-krát rýchlejšie nasadenie oproti iným riešeniam. Tieto čísla sú o platforme,
  nie o podiele Inocube; na webe ich tak treba aj prezentovať.

## Kontakt a firemné údaje
- **Firma:** InoCube, Nešporova 1007/7, 927 01 Šaľa 1
- **IČO:** 56282893 · **DIČ:** 2122282272 · **IČ DPH:** SK2122282272
- **E-mail:** inocube@varga.slmail.me
- **Telefón:** +421 910 579 485
- **Slogan:** Innovation inside the Cube
- LinkedIn a fotka vlastníka zatiaľ nie sú k dispozícii; na webe sa neuvádzajú (žiadne zástupné odkazy ani
  obrázky).
