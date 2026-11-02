# Contesto tecnico — Portfolio

Aggiornato: 2026-11-02

## Obiettivo
Presentare in modo professionale e verificabile il profilo di Fabio Zagaria come Junior Backend Developer con visione full stack, mantenendo allineati portfolio, progetti, CV e stato tecnico reale.

## Stato osservato
- Portfolio Angular 21 / TypeScript 5.9.
- Deploy su Vercel.
- CI GitHub Actions con controlli di formato, test e build.
- Struttura con componenti standalone, routing lazy, dati tipizzati, attenzione a SEO, accessibilità e performance.
- Expense Tracker: scope funzionale attuale concluso per decisione del proprietario. CRUD entrate completo, ricerca, filtro mensile, ordinamento e paginazione ora presenti su master (backend verificato al commit 4753d9d5958d65a9dc737a38af9d125aad5df033). Registrazione e verifica email Brevo HTTPS operative. Non dichiarare conclusi collaudo del deploy e regressioni degli ultimi ampliamenti.
- AccessDesk è il secondo progetto in evidenza, ancora in sviluppo. Sorgenti verificati: login JWT HS256, filtro OncePerRequestFilter, HandlerExceptionResolver, ruoli/permessi e @PreAuthorize. PostgreSQL predefinito, MySQL alternativo, MapStruct e JPA. README ancora parzialmente fermo a HTTP Basic; non considerarlo aggiornato sul JWT.
- PostgreSQL è indicato come studio autodidatta in corso, alternativa a MySQL applicata in AccessDesk; non come competenza del corso LabForWeb.
- Home: Expense Tracker nel blocco principale; JobFlow e AccessDesk nelle due schede successive; LabTV è nella pagina Progetti. Spring Scaffold CLI resta nella pagina progetti. Task Manager è nel laboratorio separato.
- LabTV: release frontend conclusa con TMDB API.
- JobFlow: POST e GET dei job presenti; creazione/persistenza verificate manualmente, GET coperto da test ma da provare a runtime. Dal 1 novembre 2026 JobCreatedEvent e JobWorker asincrono portano il job da CREATED a PROCESSING (verificato a runtime); restano da fare COMPLETED/FAILED, ProcessorRegistry e generazione PDF.
- Transport Tickets: backend sperimentale Spring Boot/JPA integrato su `main` con il merge `e74e8c2eed01216534912c8a4b56a7216fc168d8`. MySQL, Flyway, Redis come cache opzionale, transazioni con lock e autenticazione a sessione con ruoli/CSRF. Corretto il difetto delle liste JPA con ticket non visibili; verificati 10 test JUnit, storage MySQL/Redis e flusso HTTP. Resta nella categoria Sperimentale con AI.
- Spring Scaffold CLI: MVP per record DTO vuoti; nuove funzionalità sospese.
- Task Manager: laboratorio guidato; refresh, rotazione e logout implementati, test comportamentali e cookie HttpOnly/Secure da completare.
- Aggiornati anche generatore e PDF del CV: Expense Tracker, AccessDesk, PostgreSQL autodidatta; formato a pagina singola. Copia identica da sincronizzare nel repository curriculum.

## Regole di mantenimento
- Aggiornare il portfolio solo quando una competenza o un progetto è realmente dimostrabile.
- Mantenere allineati README, contenuti del sito e CV.
- Il payload `portfolio-angular/scripts/cv-career-ops.json` contiene i dati del CV corrente; il PDF è generato con Career Ops.
- Non riportare qui voti, ripassi o cronologia didattica: restano in Notion.

## Curriculum pubblico
- `portfolio-angular/src/assets/documents/CV.pdf` è l'unico curriculum distribuito dal sito.
- Il layout è a colonna singola, testuale, leggibile e compatibile con i sistemi ATS.
- Dal 29 ottobre 2026 il PDF pubblico usa il template nativo Career Ops. Dati: `portfolio-angular/scripts/cv-career-ops.json`. Il generatore Python precedente è stato rimosso; seguire il flusso Career Ops descritto in `AGENTS.md`.

## Punto di attenzione
Quando cambiano versione, stato o focus di un progetto pubblico collegato, verificare se il portfolio necessita di sincronizzazione.


## Storico aggiornamenti e badge Novità — 2026-11-02
Le card dei tre progetti principali hanno il pulsante "Implementazioni importanti" (dati in `src/app/data/project-history.data.ts`, ogni voce con data, ora e commit reali, dalla più recente) e il badge "Novità", che resta visibile 7 giorni dopo la data di `latestUpdate`. L'animazione del badge è breve (3 pulsazioni) e disattivata con reduced motion.

## Interfaccia e animazioni — 2026-11-02
Il tema chiaro/scuro (pulsante sole/luna accessibile nell’intestazione, scelta ricordata nel browser) usa dal 2 novembre 2026 l’identità «foglio di disegno tecnico»: solo template e stile, testi, link e route invariati.

- **Palette**: cobalto come inchiostro e ambra come segno (pulsanti, linea attiva, badge Novità), con token per tema chiaro e scuro in `portfolio-angular/src/styles.css`. L’hero ha lo stesso cobalto in entrambi i temi.
- **Tipografia**: titoli h1/h2 in Bricolage Grotesque (variabile, asse larghezza), self-hosted in `src/assets/fonts/` con licenza OFL; il preload in `index.html` vale solo con `media="(min-width: 861px)"`, perché su mobile (Lighthouse con rete lenta simulata) il font da 78 KB competeva con CSS e JS e costava circa 4 punti; corpo del testo in Space Grotesk.
- **Hero della home**: nome grande, linea di quota con lo stack, cartiglio con dati presi dal README, ingresso orchestrato, parallax allo scroll e griglia che si illumina attorno al puntatore (solo puntatore preciso).
- **Scena 3D** (`features/home/hero-scene`): quattro lastre isometriche a fil di ferro, una per livello di Expense Tracker, con una richiesta che le attraversa. Usa three.js 0.184, caricato in un chunk differito (circa 153 kB gzip) dopo l’idle del browser, quindi il caricamento iniziale non cambia. Si ferma fuori schermo e a tab nascosta, mostra un solo fotogramma con reduced motion, non viene caricata su schermi stretti (sotto 861 px), con risparmio dati o su dispositivi con poca memoria o CPU, ed è nascosta ad assistive technology; senza WebGL l’hero resta statico.
- **Animazioni di sezione** (`src/motion.css`): titoli che salgono da una maschera, reveal allo scroll con scroll-driven animations CSS, filetti che si disegnano, hover solo con mouse. Disattivate con `prefers-reduced-motion` e in stampa; nei browser senza supporto le pagine restano statiche e complete. I reveal muovono soltanto i blocchi (mai l’opacità del testo), così contenuto, stampa e strumenti automatici lo vedono sempre; il footer non si anima.
- **Footer**: foglio cobalto con bordo ambra, link sottolineati in ambra e, su ogni pagina, la nota di attribuzione TMDB (vedi i limiti noti).
- **Budget**: `anyComponentStyle` `maximumWarning` alzato da 4 kB a 6 kB in `angular.json`, perché il CSS del componente home supera i 4 kB.

- **Immagini dei progetti** (pagina Progetti): ogni scheda con interfaccia ha una galleria di miniature in una cornice a finestra del browser. Il campo opzionale `screenshots` di `PortfolioProject` (`src`, `path`, `alt`, `width`, `height`) vive in `src/app/data/projects.data.ts`; la cornice mostra il dominio di `liveLink` seguito dal `path` della pagina e ogni miniatura apre l’immagine intera in una nuova scheda. Oggi: Expense Tracker 4, LabTV 3, Fakeflix 2, Portfolio 1. Le immagini sono WebP in `src/assets/img/` (solo file nella cartella principale: `angular.json` copia `*.webp` senza sottocartelle), ritagliate sul solo contenuto della pagina, senza barre del browser, preferiti o altre schede. Le schermate di login sono tagliate sopra i campi Username e Password, per non pubblicare il nome utente digitato né la lunghezza della password. Ogni `alt` descrive solo ciò che è visibile.
- **Schemi di flusso**: JobFlow e AccessDesk non hanno interfaccia, quindi usano il campo `flow` (passaggi, nota) al posto delle immagini. I passaggi vengono dai punti già verificati nelle schede; quelli non realizzati hanno `pending: true` e sono tratteggiati, e la nota dichiara che è uno schema e cosa resta da verificare. Se lo stato di un passaggio cambia, aggiornare lo schema insieme a `statusDetail`.
- **Animazioni delle immagini**: ogni finestra pubblica una timeline con nome (`view-timeline: --shot` più `timeline-scope`), perché il riquadro con `overflow: hidden` impedisce a una `view()` semplice di agganciarsi alla pagina. L’immagine si assesta nella finestra e i passaggi dello schema si disegnano uno dopo l’altro; il testo non viene mai nascosto.
- **Fakeflix**: la demo online è `https://fakeflix-vanilla-js.vercel.app/` (indicata dal proprietario; l’ambiente di sviluppo non raggiunge i domini `vercel.app`, quindi non è stata aperta). Gli screenshot sono stati catturati da un’anteprima di sviluppo su Vercel.
- **Nome e contatti**: il progetto si chiama «AccessDesk» ovunque. L’email pubblica (pagina Contatti e README) è la stessa del CV, `zagariafabio1999@gmail.com`.
- **Prestazioni misurate** (Lighthouse in locale, GPU software e throttling simulato, quindi valori pessimistici): desktop 96–100 e mobile 76–77 su prestazioni, accessibilità 100, CLS 0; axe senza violazioni su tutte le route in chiaro e scuro, desktop e mobile. La versione precedente al redesign faceva 78 su mobile.

Da fare e limiti noti:
- Lighthouse sul sito in produzione, prove su telefoni reali e con screen reader (VoiceOver, NVDA) non sono state fatte.
- TMDB: il footer del portfolio mostra la nota di attribuzione richiesta dai termini d’uso (frase ufficiale in inglese, con link a themoviedb.org), che copre LabTV e le locandine nelle immagini della pagina Progetti. Il logo TMDB non è stato aggiunto. Resta da controllare che l’app LabTV mostri la stessa nota.
- Le schede di «Sperimentale con AI» ed «Esercizi» non hanno immagini.
- I link esterni (demo, repository, commit) non sono verificati automaticamente: l’ambiente di sviluppo non li raggiunge.
