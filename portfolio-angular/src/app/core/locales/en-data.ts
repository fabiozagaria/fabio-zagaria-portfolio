export const enData: Readonly<Record<string, string>> = {
  '{b}Applicazione full stack{/b} per registrare entrate e spese personali, con {b}autenticazione{/b} e {i}dashboard di riepilogo{/i}.':
    'A {b}full-stack application{/b} for tracking personal income and expenses, with {b}authentication{/b} and a {i}summary dashboard{/i}.',
  'Il backend spiegato in video': 'The backend explained on video',
  'In poco più di un minuto il video percorre i livelli dell’API di Expense Tracker: dove stanno i dati, come si velocizzano le letture, come ci si protegge dagli abusi e come funziona l’autenticazione.':
    'In just over a minute, the video walks through the Expense Tracker API: where data lives, how reads are accelerated, how abuse is prevented, and how authentication works.',
  'Dati su {b}PostgreSQL serverless di Neon{/b}, con lo schema versionato da Flyway':
    'Data on {b}Neon serverless PostgreSQL{/b}, with schema versioning through Flyway',
  '{b}Cache Redis{/b} separata per utente, con scadenza di 2 minuti':
    'Per-user {b}Redis cache{/b} with a two-minute expiry',
  '{b}Limite di richieste{/b} per indirizzo IP con Bucket4j, contro brute force e spam':
    '{b}Per-IP rate limiting{/b} with Bucket4j to deter brute-force attempts and spam',
  '{b}Access token JWT{/b} da 15 minuti e refresh token in un cookie HttpOnly da 7 giorni':
    '15-minute {b}JWT access token{/b} and a refresh token in a seven-day HttpOnly cookie',
  '1 minuto e 15 secondi': '1 minute and 15 seconds',
  'Mappa del flusso API': 'API request flow',
  'Infografica a cinque tappe sul ciclo di vita di una richiesta all’API di Expense Tracker: 1. login su /auth/login, con token JWT da 15 minuti e refresh token da 7 giorni; 2. filtro di Spring Security che valida il token Bearer e applica il limite di richieste con Bucket4j; 3. controller REST con validazione dei DTO ed estrazione dell’identità dell’utente; 4. controllo della cache Redis, con scadenza di 2 minuti, sui dati dell’utente; 5. persistenza su PostgreSQL con Spring Data JPA e schema gestito da Flyway.':
    'Five-step infographic tracing an Expense Tracker API request: 1. login at /auth/login with a 15-minute JWT and a seven-day refresh token; 2. Spring Security filter validates the Bearer token and Bucket4j limits requests; 3. REST controller validates DTOs and extracts the user identity; 4. Redis cache checks per-user data with a two-minute expiry; 5. Spring Data JPA persists to PostgreSQL with a Flyway-managed schema.',
  'Il percorso di una richiesta dall’accesso fino al database, in cinque tappe: autenticazione, filtri di sicurezza, controller, cache e persistenza.':
    'The path from login to the database in five steps: authentication, security filters, controller, caching, and persistence.',
  '{b}Autenticazione:{/b} il login su /auth/login restituisce un token JWT da 15 minuti e un refresh token da 7 giorni':
    '{b}Authentication:{/b} login at /auth/login returns a 15-minute JWT and a seven-day refresh token',
  '{b}Sicurezza:{/b} Spring Security valida il token Bearer e Bucket4j applica il limite di richieste':
    '{b}Security:{/b} Spring Security validates the Bearer token and Bucket4j enforces rate limits',
  '{b}Controller:{/b} l’endpoint REST valida i dati in ingresso con i DTO ed estrae l’identità dell’utente':
    '{b}Controller:{/b} the REST endpoint validates inputs with DTOs and extracts the user identity',
  '{b}Cache:{/b} prima del database si controlla la cache Redis, con scadenza di 2 minuti':
    '{b}Cache:{/b} Redis is checked before the database. Cache entries expire after two minutes',
  '{b}Persistenza:{/b} Spring Data JPA salva i dati su PostgreSQL, con lo schema gestito da Flyway':
    '{b}Persistence:{/b} Spring Data JPA stores data in PostgreSQL, with Flyway managing the schema',
  '{b}Frontend Angular{/b} con Signals, Reactive Forms, ricerca, filtro mensile e liste paginate':
    '{b}Angular frontend{/b} with Signals, Reactive Forms, search, monthly filtering, and paginated lists',
  '{b}CRUD completo{/b} di spese ed entrate, dashboard e grafici con persistenza JPA/PostgreSQL':
    '{b}Full CRUD{/b} for expenses and income, a dashboard and charts, with JPA/PostgreSQL persistence',
  '{b}Registrazione online{/b} con verifica email tramite API Brevo HTTPS, JWT e refresh token HttpOnly':
    '{b}Online registration{/b} with email verification via the Brevo HTTPS API, JWT, and an HttpOnly refresh token',
  '{b}Cache Redis{/b} delle liste e della ricerca spese, separata per utente e invalidata dopo le scritture':
    'Per-user {b}Redis caching{/b} for expense lists and searches, invalidated after writes',
  Concluso: 'Completed',
  'Frontend 1.2.0 (release v1.2.0) con pagina Impostazioni e API 1.3.0 (release v1.3.0) con GET /api/me; il proprietario ha confermato il cambio password dal sito pubblico. Dal 19 novembre 2026 l’API usa PostgreSQL e, secondo il README del backend, la demo online usa il database Neon con il profilo neon: schema creato da Flyway e un login demo sul backend pubblico ha scritto il refresh token nel database, quindi i dati restano dopo un riavvio.':
    'Frontend 1.2.0 (release v1.2.0) has a Settings page, and API 1.3.0 (release v1.3.0) includes GET /api/me. The owner confirmed that password changes work on the public site. The API has used PostgreSQL since November 19, 2026. According to the backend README, the live demo uses Neon with the neon profile. Flyway created the schema, and a demo login on the public backend wrote a refresh token to the database, so data persists across restarts.',
  'Configurare la cache Redis remota prima di attivarla nel deploy':
    'Configure the remote Redis cache before enabling it in deployment',
  'Controllo visivo sistematico desktop e mobile nei due temi':
    'Systematic visual checks on desktop and mobile in both themes',
  'Percorso completo in locale con Mailpit': 'Run the full flow locally with Mailpit',
  'Rinomina il package Java in io.github.fabiozagaria.expensetracker (128 file modificati); versione 1.3.0 e contratto REST invariati. Il tag e la release v1.3.0 restano sul commit del 19 novembre.':
    'Renames the Java package to io.github.fabiozagaria.expensetracker (128 files changed). Version 1.3.0 and the REST contract are unchanged. The v1.3.0 tag and release still point to the November 19 commit.',
  'Allinea README, FUTURE.md, CONTEXT.md e DEPLOYMENT.md alla release v1.2.0 e al backend 1.3.0 su Neon; nessuna modifica al codice. Il tag e la release v1.2.0 restano invariati.':
    'Aligns README, FUTURE.md, CONTEXT.md, and DEPLOYMENT.md with release v1.2.0 and backend 1.3.0 on Neon. The code, tag, and release are unchanged.',
  'Garantire che ogni utente possa accedere soltanto ai propri movimenti.':
    'Ensure each user can access only their own transactions.',
  'API protette da JWT e controllo del proprietario sul backend, con refresh token in cookie HttpOnly.':
    'JWT protects the API, the backend checks ownership, and the refresh token is stored in an HttpOnly cookie.',
  'Cookie, CORS e proxy devono essere coerenti tra frontend e API; il piano gratuito del backend può richiedere attesa al primo accesso.':
    "Cookies, CORS, and the proxy must agree across the frontend and API. The backend's free tier may take time to start on first use.",
  'Dashboard di Expense Tracker: saldo disponibile 1197,00 €, entrate totali 1200,00 € e spese totali 3,00 €, con il riepilogo dei movimenti e la tabella degli ultimi movimenti.':
    'Expense Tracker dashboard showing a €1,197.00 balance, €1,200.00 in income, and €3.00 in expenses, alongside a transaction summary and recent transactions.',
  'Home di Expense Tracker nel tema scuro: titolo «Le tue finanze, al posto giusto.», pulsanti Accedi al tuo spazio e Registrati e riquadro con entrate, spese e saldo.':
    'Expense Tracker home in dark mode, with a headline, sign-in and registration buttons, and a panel showing income, expenses, and balance.',
  'Pagina di accesso di Expense Tracker nel tema scuro, con il pulsante Prova la demo, l’avviso sul primo avvio del server e il grafico a barre delle finanze.':
    "Expense Tracker sign-in in dark mode, with a Try the demo button, a notice about the server's initial startup, and a finance bar chart.",
  'Pagina di accesso di Expense Tracker nel tema chiaro, con il pulsante Prova la demo, l’avviso sul primo avvio del server e il grafico a barre delle finanze.':
    "Expense Tracker sign-in in light mode, with a Try the demo button, a notice about the server's initial startup, and a finance bar chart.",
  'Demo full stack': 'Full-stack demo',
  'Backend · API e persistenza dei job': 'Backend · job API and persistence',
  '{b}Backend{/b} per creare e consultare job tramite {b}API REST{/b}, con validazione e persistenza {b}JPA{/b} su {b}PostgreSQL{/b}. Il lavoro associato descrive {i}una futura generazione di PDF{/i}.':
    '{b}Backend{/b} for creating and retrieving jobs through a {b}REST API{/b}, with validation and {b}JPA{/b} persistence on {b}PostgreSQL{/b}. The associated work describes {i}future PDF generation{/i}.',
  '{b}Dominio Job{/b} con stati CREATED, PROCESSING, COMPLETED e FAILED':
    '{b}Job domain{/b} with CREATED, PROCESSING, COMPLETED, and FAILED states',
  '{b}POST /jobs{/b} con DTO validato, risposta 201 Created e header Location; GET /jobs/{id} per la consultazione':
    '{b}POST /jobs{/b} with a validated DTO, a 201 Created response, and a Location header. GET /jobs/{id} retrieves jobs',
  '{b}Persistenza JPA/PostgreSQL{/b} di Job e GeneratePdfWork con cascade PERSIST; schema versionato con Flyway e Hibernate in validate':
    '{b}JPA/PostgreSQL persistence{/b} for Job and GeneratePdfWork with cascade PERSIST, schema versioning via Flyway, and Hibernate in validate mode',
  '{b}JobCreatedEvent{/b} pubblicato dopo il salvataggio e JobWorker asincrono (@Async con @TransactionalEventListener) che porta il job da CREATED a PROCESSING':
    '{b}JobCreatedEvent{/b} is published after saving. An asynchronous JobWorker (@Async with @TransactionalEventListener) moves the job from CREATED to PROCESSING',
  '{b}Immagine Docker{/b} pubblicata su Render con documentazione Swagger UI':
    '{b}Docker image{/b} deployed to Render with Swagger UI documentation',
  '{b}Mapping{/b} con MapStruct e test unitari di JobService e JobController':
    '{b}Mapping{/b} with MapStruct and unit tests for JobService and JobController',
  'Dal POST al worker': 'From POST to the worker',
  'DTO validato, 201 Created': 'Validated DTO, 201 Created',
  'Persistenza JPA/PostgreSQL': 'JPA/PostgreSQL persistence',
  'Pubblicato dopo il salvataggio': 'Published after saving',
  'Verificato a runtime': 'Verified at runtime',
  'Da realizzare': 'Planned',
  'Schema ricavato dal codice. Il passaggio a PROCESSING è verificato a runtime; COMPLETED e FAILED restano da realizzare.':
    'Diagram based on the code. The transition to PROCESSING is verified at runtime. COMPLETED and FAILED are still to be implemented.',
  'In sviluppo': 'In development',
  'Pubblicato su Render con Swagger UI (piano gratuito: il primo accesso può richiedere attesa), su PostgreSQL con migrazioni Flyway. In locale sono verificati POST /jobs (201), GET /jobs/{id} (200 e 404) e il passaggio asincrono da CREATED a PROCESSING; online sono verificati Swagger UI e la risposta 404 di GET /jobs/{id}.':
    'Deployed to Render with Swagger UI (the free tier may take time to start) and PostgreSQL with Flyway migrations. Local checks cover POST /jobs (201), GET /jobs/{id} (200 and 404), and the asynchronous transition from CREATED to PROCESSING. Swagger UI and the 404 response from GET /jobs/{id} have been verified online.',
  'Verificare la connessione al database PostgreSQL su Neon e il deploy su Render con il profilo neon, scelto il 19 novembre 2026 al posto del PostgreSQL Free di Render che scadeva dopo 30 giorni':
    'Verify the connection to PostgreSQL on Neon and the Render deployment using the neon profile, chosen on November 19, 2026 to replace Render Free PostgreSQL, which expired after 30 days',
  'Completamento dei job fino a COMPLETED o FAILED': 'Take jobs through to COMPLETED or FAILED',
  'ProcessorRegistry e generazione PDF': 'ProcessorRegistry and PDF generation',
  'Sposta il database di produzione su Neon: profilo neon con TLS verificato e pool ridotto, docker-entrypoint.sh che ricava le credenziali da DATABASE_URL e rifiuta un URL JDBC, render.yaml senza il database di Render, neon.ts per la CLI Neon. La versione nel pom resta 0.1.0-alpha.1 e non ci sono nuovi tag.':
    'Moves the production database to Neon: neon profile with verified TLS and a smaller pool, docker-entrypoint.sh reading credentials from DATABASE_URL and rejecting JDBC URLs, render.yaml without the Render database, and neon.ts for the Neon CLI. The POM stays at 0.1.0-alpha.1 and there are no new tags.',
  'Salvare un nuovo job insieme al lavoro che descrive, mantenendo distinte le responsabilità.':
    'Save a new job with the work it describes while keeping responsibilities separate.',
  'Job possiede GeneratePdfWork; cascade PERSIST salva il nuovo Work insieme al Job.':
    'Job owns GeneratePdfWork, and cascade PERSIST saves the new work with the job.',
  'Il cascade è limitato alla creazione: aggiornamenti e rimozioni richiedono una gestione esplicita.':
    'The cascade applies only on creation. Updates and deletions require explicit handling.',
  'Backend · microservizi ed eventi con Kafka': 'Backend · microservices and Kafka events',
  '{b}Sistema a microservizi{/b} per le richieste di trasporto interno in un ospedale, con {i}dati fittizi{/i}: un reparto chiede un trasporto, il sistema lo assegna a un operatore per priorità e turno e avvisa tutti a ogni cambio di stato. Il progetto è in fase di progettazione: il design è approvato, il codice non c’è ancora.':
    'A {b}microservices system{/b} for internal hospital transport requests, using {i}fictional data{/i}. A department requests transport, the system assigns it by priority and staff shift, and everyone is notified when its status changes. The design is approved. Implementation has yet to start.',
  '{b}Design approvato:{/b} tre servizi indipendenti (richieste, assegnazione, notifiche), un database per servizio e nessun codice condiviso':
    '{b}Approved design:{/b} three independent services (requests, dispatch, and notifications), one database per service, and no shared code',
  '{b}Eventi previsti:{/b} richiesta creata, assegnata, presa in carico e completata, con una chiave per richiesta per mantenere l’ordine':
    '{b}Planned events:{/b} request created, assigned, accepted, and completed, keyed by request to preserve ordering',
  '{i}Da dimostrare:{/i} outbox pattern, consumer idempotenti, dead-letter topic e tracciamento di una richiesta con correlationId':
    '{i}Still to demonstrate:{/i} the outbox pattern, idempotent consumers, a dead-letter topic, and request tracing with correlationId',
  '{i}Test previsti{/i} su evento duplicato, consumer che si ferma e riparte, messaggio in dead-letter e assegnazione concorrente':
    '{i}Planned tests{/i} for a duplicate event, consumer restart, dead-letter message, and concurrent assignment',
  'Java (previsto)': 'Java (planned)',
  'Spring Boot (previsto)': 'Spring Boot (planned)',
  'Kafka (previsto)': 'Kafka (planned)',
  'PostgreSQL (previsto)': 'PostgreSQL (planned)',
  'Docker (previsto)': 'Docker (planned)',
  'Dalla richiesta al completamento': 'From request to completion',
  'request-service, lato reparto': 'request-service, on the department side',
  'dispatch-service: operatore libero e in turno, altrimenti coda per priorità':
    'dispatch-service assigns available on-shift staff or queues by priority',
  'L’operatore agisce su dispatch-service': 'The staff member acts through dispatch-service',
  'Lo stato torna a request-service': 'The status returns to request-service',
  Notifiche: 'Notifications',
  'notification-service consuma gli eventi (simulate)':
    'notification-service consumes events for simulated notifications',
  'Schema ricavato dal design doc del repository. Nessun passaggio è ancora realizzato.':
    "Diagram based on the repository's design document. Implementation has yet to start.",
  'In progettazione': 'In design',
  'Dal 17 novembre 2026 il design è approvato e documentato nel repository. Non c’è ancora codice né test: l’implementazione parte dopo JobFlow. Autenticazione, interfaccia grafica e notifiche reali restano fuori dalla prima versione.':
    'The design was approved on November 17, 2026 and is documented in the repository. Code and tests are still pending, with implementation planned after JobFlow. Authentication, a graphical interface, and real notifications are outside the first release.',
  'Backend · sicurezza e autorizzazione': 'Backend · security and authorization',
  '{b}API REST{/b} per richieste di accesso software: i dipendenti creano e consultano le proprie richieste, i manager le approvano o le rifiutano. I dati sono salvati in {b}PostgreSQL{/b} con migrazioni {b}Flyway{/b}.':
    'A {b}REST API{/b} for software access requests. Employees create and view their own requests, and managers approve or reject them. Data is stored in {b}PostgreSQL{/b} with {b}Flyway{/b} migrations.',
  '{b}Login con JWT HS256{/b} e filtro personalizzato OncePerRequestFilter per il Bearer token':
    '{b}JWT HS256 sign-in{/b} and a custom OncePerRequestFilter for the Bearer token',
  '{b}Spring Security stateless{/b}, ruoli e permessi, autorizzazione con @PreAuthorize':
    '{b}Stateless Spring Security{/b}, roles and permissions, and @PreAuthorize authorization',
  'Errori del filtro delegati a HandlerExceptionResolver e gestione globale delle eccezioni':
    'Filter errors delegated to HandlerExceptionResolver, with global exception handling',
  '{b}JPA/Hibernate{/b}, MapStruct, transazioni, locking ottimistico e paginazione Page/Pageable':
    '{b}JPA/Hibernate{/b}, MapStruct, transactions, optimistic locking, and Page/Pageable pagination',
  'Dal login ai dati': 'From sign-in to persistence',
  'Stateless, ruoli e permessi': 'Stateless, with roles and permissions',
  'Autorizzazione per metodo': 'Method-level authorization',
  'Schema gestito da Flyway': 'Flyway-managed schema',
  'Schema ricavato dal codice. Registrazione e login verificati sullo stack Docker. I controlli sugli endpoint protetti restano da completare.':
    'Diagram based on the code. Registration and sign-in are verified on the Docker stack. Protected endpoint checks are still pending.',
  'Login JWT, filtro e autorizzazioni sono presenti nel codice. PostgreSQL è l’unico database, con schema gestito da migrazioni Flyway e avvio con Docker Compose (PostgreSQL 18 e API). Secondo il README, sullo stack Docker sono verificati build, migrazione V1, avvio, registrazione e login.':
    'JWT sign-in, the filter, and authorization are implemented. PostgreSQL is the only database, with Flyway migrations and startup via Docker Compose (PostgreSQL 18 and the API). According to the README, the build, V1 migration, startup, registration, and sign-in have been verified on Docker.',
  'Verifica del flusso JWT e degli altri endpoint': 'Verify the JWT flow and remaining endpoints',
  'Estendere i test automatici agli endpoint protetti':
    'Extend automated tests to protected endpoints',
  'Verificare la connessione al database PostgreSQL su Neon e il deploy su Render con il profilo neon':
    'Verify the PostgreSQL connection on Neon and deployment to Render with the neon profile',
  'Chiusura della consegna: la prova autonoma è ancora da completare':
    'Complete the independent assessment to close out the submission',
  'Il 19 novembre 2026 il progetto resta solo su PostgreSQL (rimossi profilo, driver e migrazioni MySQL) e aggiunge il profilo neon per una demo persistente, con DemoDataSeeder idempotente e un nuovo test; l’ultimo commit collega il progetto Neon con neon.ts. La versione nel pom resta 0.1.0-alpha.1 e non ci sono nuovi tag.':
    'On November 19, 2026, PostgreSQL became the sole database after the MySQL profile, driver, and migrations were removed. The neon profile adds a persistent demo with an idempotent DemoDataSeeder and a new test. The latest commit connects the Neon project through neon.ts. The POM stays at 0.1.0-alpha.1 and there are no new tags.',
  'Gestire gli errori del token nel filtro, prima che la richiesta raggiunga Spring MVC.':
    'Handle token errors in the filter before the request reaches Spring MVC.',
  'Il filtro pulisce il SecurityContext e delega le eccezioni a HandlerExceptionResolver per riutilizzare la gestione globale.':
    'The filter clears SecurityContext and passes exceptions to HandlerExceptionResolver to reuse global handling.',
  'Il filtro deve interrompere il flusso dopo un errore; autenticazione e autorizzazione richiedono verifiche dedicate.':
    'The filter must stop the request after an error. Authentication and authorization need dedicated checks.',
  'Frontend · progetto del corso LabForWeb': 'Frontend · LabForWeb course project',
  '{b}Applicazione Angular{/b} per esplorare film, cast e titoli simili attraverso i dati della {b}TMDB API{/b}.':
    'An {b}Angular application{/b} for exploring films, casts, and similar titles with data from the {b}TMDB API{/b}.',
  '{b}Catalogo dinamico{/b} con HttpClient, RxJS e modelli TypeScript':
    '{b}Dynamic catalog{/b} with HttpClient, RxJS, and TypeScript models',
  '{b}Routing parametrico{/b} per dettaglio, cast, regista e film simili':
    '{b}Parameterized routing{/b} for details, cast, directors, and similar films',
  '{b}Stati di caricamento ed errore{/b} gestiti nei flussi asincroni':
    '{b}Loading and error states{/b} for asynchronous flows',
  'Release frontend conclusa, realizzata durante il percorso LabForWeb: applicazione Angular che integra la TMDB API per catalogo e dettaglio.':
    'Completed frontend release from the LabForWeb program. The Angular application integrates the TMDB API for the catalog and detail pages.',
  'Aggiunto un selettore accessibile per il tema chiaro e scuro, con preferenza salvata nel browser.':
    'Added an accessible light/dark theme switch and stored the preference in the browser.',
  'Integrare catalogo e dettagli TMDB senza distribuire le chiamate HTTP nei componenti.':
    'Integrate the TMDB catalog and details without scattering HTTP calls across components.',
  'MovieService centralizza le richieste e restituisce Observable con modelli TypeScript.':
    'MovieService centralizes requests and returns Observables with TypeScript models.',
  'La SPA dipende dalla API esterna; credenziali riservate richiederebbero un backend dedicato.':
    'The SPA depends on the external API. Keeping credentials secret would require a dedicated backend.',
  'Catalogo film di LabTV con la navigazione Home, Catalogo, Ricerca e Contatti e una griglia di locandine, tra cui The Dark Knight, Wildwood, Hope e Spider-Man: Brand New Day.':
    'LabTV film catalog with Home, Catalog, Search, and Contact navigation, and a poster grid including The Dark Knight, Wildwood, Hope, and Spider-Man: Brand New Day.',
  'Home di LabTV: logo, titolo Benvenuto su LabTV, pulsante Vai al catalogo e riquadro Film, dettagli e ricerca.':
    'LabTV home with the logo, a welcome heading, a button to open the catalog, and a panel for films, details, and search.',
  'Ricerca di LabTV: digitando «spi» nel campo di ricerca compare tra i risultati la locandina di Spider-Man: Brand New Day.':
    'LabTV search results show the poster for Spider-Man: Brand New Day after entering “spi”.',
  'Demo online': 'Live demo',
  'Frontend · progetto del corso LabForWeb / Nerd Academy':
    'Frontend · LabForWeb / Nerd Academy course project',
  '{b}Landing page responsive{/b} dedicata a {i}Stranger Things{/i}, realizzata con HTML, CSS e {b}JavaScript vanilla{/b}. Include schede dinamiche di episodi e trailer e validazione del form email.':
    'A {b}responsive landing page{/b} about {i}Stranger Things{/i} built with HTML, CSS, and {b}vanilla JavaScript{/b}. It includes dynamic episode and trailer cards and email form validation.',
  '{b}Manipolazione del DOM ed eventi{/b} con JavaScript nativo':
    '{b}DOM manipulation and events{/b} in native JavaScript',
  '{b}Schede dinamiche{/b} per episodi, trailer e piani':
    '{b}Dynamic cards{/b} for episodes, trailers, and plans',
  '{b}Validazione email{/b} e modale trailer riutilizzabile':
    '{b}Email validation{/b} and reusable trailer modal',
  'Demo frontend': 'Frontend demo',
  'Progetto realizzato durante il percorso LabForWeb / Nerd Academy per consolidare DOM, eventi e rendering in JavaScript vanilla.':
    'Built during the LabForWeb / Nerd Academy program to practice DOM manipulation, events, and rendering in vanilla JavaScript.',
  'Pagina di Fakeflix dedicata a Stranger Things: titolo della serie su uno sfondo di foresta scura, descrizione, campo email con il pulsante Inizia a guardare e menu con Info, Trailer, Episodi, Potrebbe piacerti e Piani.':
    'Fakeflix page about Stranger Things with the series title over a dark forest, a description, an email field with a Start watching button, and navigation for information, trailers, episodes, recommendations, and plans.',
  'Fakeflix, sezioni Potrebbe piacerti e Scegli il tuo piano: carosello di serie con Dark, IT, Locke & Key e IT: Capitolo 2, e piani Base, Standard e Premium.':
    'Fakeflix recommendations and plan selection: a carousel with Dark, IT, Locke & Key, and IT: Chapter Two, and Basic, Standard, and Premium plans.',
  'Frontend · progetto del corso': 'Frontend · course project',
  '{b}Portfolio Angular{/b} con componenti standalone, routing lazy e contenuti tipizzati, con attenzione ad {b}accessibilità{/b} e {b}SEO{/b}.':
    'An {b}Angular portfolio{/b} with standalone components, lazy routing, and typed content, with attention to {b}accessibility{/b} and {b}SEO{/b}.',
  'Componenti standalone e routing lazy': 'Standalone components and lazy routing',
  '{b}Metadati specifici per route{/b} e dati tipizzati':
    '{b}Route-specific metadata{/b} and typed data',
  '{b}Cielo disegnato su canvas 2D:{/b} notte stellata col tema scuro, giorno con sole e nuvole col tema chiaro, con pulsante di pausa e movimento ridotto rispettato':
    '{b}Sky drawn on a 2D canvas:{/b} a starry night in dark mode, sunshine and clouds in light mode, with a pause button and support for reduced motion',
  '{b}Accessibilità controllata{/b} con axe-core su cinque pagine, due temi e due larghezze, senza violazioni':
    '{b}Accessibility checked{/b} with axe-core across five pages, two themes, and two viewport widths, with no violations',
  'Progetto frontend del corso, evoluto nel portfolio professionale attuale. Concluso dal 21 novembre 2026, per scelta del proprietario: stile, sezioni e animazioni sono definitivi e si modificano soltanto per cambiamenti importanti.':
    'A frontend course project that evolved into the current professional portfolio. The owner marked it complete on November 21, 2026. Style, sections, and motion are settled, with changes reserved for significant updates.',
  'Controllo su telefoni reali, con screen reader e con Lighthouse dopo il redesign, non eseguito':
    'Checks on physical phones, with a screen reader, and with Lighthouse after the redesign are still pending',
  'Home del portfolio nel tema chiaro: nome su un cielo con il sole e nuvole, scheda con stack, sede e formazione.':
    'Portfolio home in light mode: the name against a sunny, cloudy sky, alongside a panel with the tech stack, location, and training.',
  'Database di produzione su Neon': 'Production database on Neon',
  'Il database di produzione passa dal PostgreSQL Free di Render, che scadeva dopo 30 giorni, a PostgreSQL su Neon: profilo neon con TLS verify-full e al massimo 3 connessioni, docker-entrypoint.sh che ricava le credenziali da DATABASE_URL e ferma l’avvio con un URL JDBC. Connessione al database Neon reale e deploy su Render non ancora verificati.':
    'The production database moves from Render Free PostgreSQL, which expired after 30 days, to PostgreSQL on Neon. The neon profile uses TLS verify-full and at most three connections. docker-entrypoint.sh reads credentials from DATABASE_URL and stops startup if given a JDBC URL. The connection to the live Neon database and deployment to Render have yet to be verified.',
  'Swagger UI descritta e header del proxy': 'Swagger UI documentation and proxy headers',
  'OpenAPI con titolo, descrizione del ciclo di vita e licenza; server.forward-headers-strategy=framework fa usare https all’header Location dietro il proxy di Render.':
    'OpenAPI includes a title, lifecycle description, and license. server.forward-headers-strategy=framework makes the Location header use HTTPS behind the Render proxy.',
  'PostgreSQL con Flyway, Swagger UI e deploy su Render':
    'PostgreSQL with Flyway, Swagger UI, and Render deployment',
  'Passaggio da MySQL a PostgreSQL con migrazione Flyway V1 e Hibernate in validate; springdoc per Swagger UI; Dockerfile multi-stage, docker-compose e render.yaml con database PostgreSQL gestito.':
    'Switched from MySQL to PostgreSQL with a Flyway V1 migration and Hibernate in validate mode. Added Swagger UI via springdoc, a multi-stage Dockerfile, Docker Compose, and render.yaml with managed PostgreSQL.',
  'JobWorker asincrono e passaggio a PROCESSING':
    'Asynchronous JobWorker and transition to PROCESSING',
  'Il worker ascolta JobCreatedEvent dopo il commit, su un thread separato (@Async con @TransactionalEventListener), e porta il job da CREATED a PROCESSING tramite JobService.markAsProcessing, con test unitario.':
    'After commit, the worker listens for JobCreatedEvent on a separate thread (@Async with @TransactionalEventListener) and uses JobService.markAsProcessing to move the job from CREATED to PROCESSING. A unit test covers the transition.',
  'Evento JobCreatedEvent dopo il salvataggio': 'JobCreatedEvent after saving',
  'JobService pubblica JobCreatedEvent con l’id del job dentro la transazione di creazione; aggiunto il test unitario.':
    'JobService publishes JobCreatedEvent with the job ID inside the creation transaction. A unit test was added.',
  'MapStruct JobMapper e test di service e controller':
    'MapStruct JobMapper and service and controller tests',
  'Mapping da Job a JobResponse con MapStruct e test unitari di JobService e JobController.':
    'MapStruct maps Job to JobResponse, with unit tests for JobService and JobController.',
  'Prima prerelease v0.1.0-alpha.1': 'First v0.1.0-alpha.1 prerelease',
  'Versione impostata e documentata: creazione e persistenza dei job presenti.':
    'The version is set and documented, with job creation and persistence implemented.',
  'Endpoint GET /jobs/{id} documentato come implementato':
    'GET /jobs/{id} endpoint documented as implemented',
  'Lettura di un job tramite id; la verifica a runtime resta da fare.':
    'Retrieves a job by ID. Runtime verification is still pending.',
  'Persistenza di Job e GeneratePdfWork verificata': 'Verified Job and GeneratePdfWork persistence',
  'Job e GeneratePdfWork salvati insieme con cascade PERSIST, verificati su MySQL.':
    'Job and GeneratePdfWork are saved together using cascade PERSIST, verified on MySQL.',
  'Primo codice del progetto': 'First project code',
  'Primo commit di codice dopo la definizione dell’architettura iniziale.':
    'First code commit after the initial architecture was defined.',
  'Solo PostgreSQL e profilo per la demo su Neon': 'PostgreSQL only and a Neon demo profile',
  'Rimossi profilo, driver, flyway-mysql e migrazioni MySQL, mai eseguite su un server reale; nuovo profilo neon per una demo persistente su PostgreSQL Neon e DemoDataSeeder idempotente, con un nuovo test. Connessione al database Neon reale e deploy su Render non ancora verificati.':
    'Removed the MySQL profile, driver, flyway-mysql, and migrations, which had never run on a live server. Added a neon profile for a persistent PostgreSQL demo on Neon and an idempotent DemoDataSeeder with a new test. The live Neon connection and Render deployment have yet to be verified.',
  'Swagger UI, demo pubblica e claim dei ruoli nel JWT':
    'Swagger UI, public demo, and JWT roles claim',
  'Aggiunti Swagger UI (springdoc-openapi con schema Bearer JWT) e un profilo demo con database H2 in memoria, utenti e richieste di esempio e render.yaml per il deploy; il README riporta il link alla demo online. Il token JWT include inoltre un claim «roles» con i soli ruoli ROLE_*, a titolo informativo per i client: i permessi restano sul server.':
    'Added Swagger UI (springdoc-openapi with a Bearer JWT scheme), a demo profile with an in-memory H2 database, sample users and requests, and render.yaml for deployment. The README links to the live demo. The JWT includes an informational “roles” claim containing only ROLE_* values. Permission checks remain on the server.',
  'Swagger UI e demo': 'Swagger UI and demo',
  'Migrazioni Flyway e avvio con Docker': 'Flyway migrations and Docker startup',
  'Lo schema passa a migrazioni Flyway V1 separate per PostgreSQL e MySQL e Hibernate valida invece di aggiornare; Dockerfile multi-stage e docker-compose avviano PostgreSQL 18 e l’API. Secondo il README lo stack Docker è verificato fino a registrazione e login; migrazione MySQL e test automatici non sono verificati.':
    'The schema uses separate Flyway V1 migrations for PostgreSQL and MySQL, and Hibernate validates the schema. A multi-stage Dockerfile and Docker Compose start PostgreSQL 18 and the API. According to the README, the Docker stack is verified through registration and sign-in. The MySQL migration and automated tests have yet to be verified.',
  'Versione impostata e documentata.': 'Version set and documented.',
  'PostgreSQL come database predefinito': 'PostgreSQL as the default database',
  'PostgreSQL diventa il database predefinito e il profilo MySQL resta disponibile.':
    'PostgreSQL becomes the default database, with the MySQL profile still available.',
  'Autenticazione JWT': 'JWT authentication',
  'Login con JWT HS256 e filtro OncePerRequestFilter per il token Bearer presenti nel codice; verifiche del flusso e test automatici restano da completare.':
    'JWT HS256 sign-in and OncePerRequestFilter for Bearer tokens are implemented. Flow verification and automated tests remain to be completed.',
  'Avvio dell’integrazione JWT': 'Started JWT integration',
  'Primo commit dedicato all’autenticazione JWT.': 'First commit dedicated to JWT authentication.',
  'Sicurezza e service layer': 'Security and service layer',
  'Serie di commit su sicurezza e service layer, dal 16 al 23 ottobre.':
    'A series of commits on security and the service layer from October 16 to 23.',
  'Primo codice: entity Request': 'First code: Request entity',
  'Prime entity del dominio, a partire da Request.':
    'First domain entities, beginning with Request.',
  'Documentazione di partenza': 'Initial documentation',
  'Brief, requisiti, contratto API, criteri di accettazione, consegna e decision log.':
    'Brief, requirements, API contract, acceptance criteria, submission, and decision log.',
  'Frontend: tag e release v1.2.0': 'Frontend: v1.2.0 tag and release',
  'Pubblicata la release v1.2.0 del frontend: pagina Impostazioni con i dati dell’account e il link per cambiare la password. Richiede il backend 1.2.0 o successivo. Il tag è sul commit del 10 novembre 2026 in cui package.json passa alla 1.2.0.':
    'Frontend v1.2.0 adds a Settings page with account information and a password change link. It requires backend 1.2.0 or later. The tag points to the November 10, 2026 commit that updates package.json to 1.2.0.',
  'Commit del tag': 'Tag commit',
  'API: tag e release v1.3.0, demo su Neon': 'API: v1.3.0 tag and release, demo on Neon',
  'Pubblicata la release v1.3.0 dell’API: database da MySQL a PostgreSQL su Neon, contratto REST invariato, frontend compatibile 1.2.0. Secondo il README la demo online usa il profilo neon: schema creato da Flyway e login demo che scrive il refresh token nel database Neon.':
    'API v1.3.0 moves the database from MySQL to PostgreSQL on Neon and preserves the REST contract and frontend 1.2.0 compatibility. According to the README, the live demo uses the neon profile: Flyway created the schema and a demo sign-in writes the refresh token to Neon.',
  'API: migrazione da MySQL a PostgreSQL': 'API: migration from MySQL to PostgreSQL',
  'Driver, Flyway, Docker Compose e Testcontainers passano a PostgreSQL; le migrazioni MySQL diventano un’unica V1 PostgreSQL. Username ed email restano unici senza distinguere maiuscole e minuscole tramite indici su lower(). Il profilo neon sostituisce aiven.':
    'The driver, Flyway, Docker Compose, and Testcontainers move to PostgreSQL. The MySQL migrations become a single PostgreSQL V1. Username and email uniqueness stays case-insensitive through indexes on lower(). The neon profile replaces aiven.',
  'Frontend: skeleton e spinner negli stati di caricamento':
    'Frontend: skeletons and spinners for loading states',
  'Il frontend integra skeleton e spinner negli stati di caricamento, centra lo spinner, uniforma il nome Expense Tracker e mostra lo spinner durante accesso, registrazione e risveglio della demo. Nessun nuovo tag: l’ultimo del frontend resta v1.1.0.':
    'The frontend adds skeletons and centered spinners, standardizes the Expense Tracker name, and displays a spinner during sign-in, registration, and demo startup. The latest frontend tag remains v1.1.0.',
  'API: tag e release v1.2.0': 'API: v1.2.0 tag and release',
  'Pubblicata la release v1.2.0 dell’API, retrocompatibile: GET /api/me e demo su database H2 in memoria. Il frontend 1.2.0 non ha ancora un tag.':
    'The backward-compatible API v1.2.0 adds GET /api/me and an in-memory H2 demo. Frontend 1.2.0 was still untagged at this point.',
  'Demo riaperta su database H2 in memoria': 'Demo restored on an in-memory H2 database',
  'Il profilo demo dell’API usa H2 in memoria al posto del MySQL Aiven non più disponibile: account condiviso e dati di esempio vengono ricreati a ogni avvio e la registrazione resta chiusa. Il frontend spegne la modalità manutenzione e spiega sulla pagina di registrazione che sulla demo non ci si può registrare.':
    'The API demo profile uses in-memory H2 in place of the unavailable Aiven MySQL database. The shared account and sample data are recreated on startup, with registration closed. The frontend disables maintenance mode and explains the registration restriction on the sign-up page.',
  'Frontend: modalità manutenzione per la demo sospesa':
    'Frontend: maintenance mode for the paused demo',
  'Il database MySQL Aiven della demo non è più disponibile. Con environment.maintenance attivo in produzione il sito mostra un avviso fisso, disattiva «Prova la demo», accesso, registrazione e gli altri form che usano il database, e le richieste di risveglio del server falliscono subito.':
    "The demo's Aiven MySQL database became unavailable. With environment.maintenance enabled in production, the site shows a fixed notice, disables the demo, sign-in, sign-up, and other database forms, and fails server wake requests immediately.",
  Avviso: 'Notice',
  'Form disattivati': 'Disabled forms',
  'Frontend 1.2.0: pagina Impostazioni': 'Frontend 1.2.0: Settings page',
  'L’utente loggato vede i dati dell’account e riceve il link per cambiare la password tramite GET /api/me; dopo l’invio il pulsante torna disponibile come «Invia di nuovo» al termine dell’attesa di 60 secondi e il focus passa alla conferma.':
    'Signed-in users see account details and can request a password change link through GET /api/me. After sending, the button becomes available again as “Send again” after 60 seconds and focus moves to the confirmation.',
  Correzione: 'Fix',
  'Versione retrocompatibile: nuovo endpoint con username ed email dell’utente autenticato, usato dalla pagina Impostazioni del frontend per inviare il link di cambio password senza riscrivere l’email.':
    "Backward-compatible release with a new endpoint returning the authenticated user's username and email. The frontend Settings page uses it to send a password change link without asking for the email again.",
  'Frontend 1.1.0: client allineato al contratto REST':
    'Frontend 1.1.0: client aligned with the REST contract',
  'Il frontend recupera la password, reinvia il link di verifica email, mostra il dettaglio delle entrate, applica i limiti della password del server e gestisce i messaggi sul limite di richieste.':
    'The frontend supports password recovery and resending email verification, shows income details, enforces server password limits, and handles rate-limit messages.',
  'API 1.1.0: reset password, rate limiting e Swagger UI':
    'API 1.1.0: password reset, rate limiting, and Swagger UI',
  'Versione retrocompatibile: reinvio della verifica email e reset password, rate limiting per IP sugli endpoint pubblici, reuse detection dei refresh token, schema gestito da Flyway, Swagger UI e CI su GitHub Actions.':
    'Backward-compatible release with email verification resend and password reset, per-IP rate limits on public endpoints, refresh-token reuse detection, a Flyway-managed schema, Swagger UI, and GitHub Actions CI.',
  'API: Swagger UI utilizzabile dalla demo pubblica': 'API: Swagger UI usable from the public demo',
  'L’URL pubblico dell’API è accettato come Origin per POST /auth/* e aggiunto ai CORS, così «Try it out» su /auth/demo funziona dalla pagina Swagger del backend.':
    "The public API URL is allowed as a CORS origin for POST /auth/* so “Try it out” on /auth/demo works from the backend's Swagger page.",
  'API: rate limit sugli endpoint di autenticazione':
    'API: rate limiting on authentication endpoints',
  'Token bucket in memoria per IP su POST /auth/*; i rifiuti rispondono 429 con Retry-After e corpo APIError.':
    'An in-memory per-IP token bucket covers POST /auth/*. Rejections return 429 with Retry-After and an APIError body.',
  'API: documentazione OpenAPI con Swagger UI': 'API: OpenAPI documentation with Swagger UI',
  'Aggiunta la specifica OpenAPI con Swagger UI pubblica; SWAGGER_ENABLED=false la disattiva.':
    'Added an OpenAPI specification and public Swagger UI. SWAGGER_ENABLED=false disables it.',
  'API: rilevamento del riuso del refresh token': 'API: refresh-token reuse detection',
  'Il riuso di un refresh token già ruotato viene rilevato; i token scaduti vengono ripuliti.':
    'Detects reuse of an already rotated refresh token and removes expired tokens.',
  'Frontend: README allineato alle versioni': 'Frontend: README updated with version compatibility',
  'Il README del frontend riporta la versione backend compatibile (1.0.2).':
    'The frontend README lists the compatible backend version (1.0.2).',
  'API: rotazione atomica del refresh token': 'API: atomic refresh-token rotation',
  'Il refresh token viene ruotato in modo atomico per impedire il riutilizzo concorrente; il commit aggiunge test di concorrenza.':
    'Refresh tokens are rotated atomically to prevent concurrent reuse. The commit adds concurrency tests.',
  'API: controllo della lunghezza della chiave JWT': 'API: JWT key length check',
  'L’avvio dell’API fallisce subito se SECRET_KEY è più corta di 32 byte.':
    'The API fails immediately on startup if SECRET_KEY is shorter than 32 bytes.',
  'Mapper MapStruct per spese ed entrate nell’API.':
    'MapStruct mappers for expenses and income in the API.',
  'Frontend 1.0.2: password visibile e tema scuro':
    'Frontend 1.0.2: password visibility and dark mode',
  'Controllo mostra/nascondi password in login e registrazione e correzioni del tema scuro.':
    'Password visibility controls for sign-in and sign-up, and dark mode fixes.',
  'Release 1.0.1: cache Redis e letture paginate':
    'Release 1.0.1: Redis caching and paginated reads',
  'L’API mette in cache Redis le risposte delle spese per proprietario; il frontend usa letture paginate.':
    'The API caches expense responses by owner in Redis. The frontend uses paginated reads.',
  'Versione 1.0.0': 'Version 1.0.0',
  'Progetto contrassegnato come concluso nella versione 1.0.0, con README allineato.':
    'Project marked complete in version 1.0.0 and the README updated to match.',
  'CRUD entrate, ricerca e liste paginate': 'Income CRUD, search, and paginated lists',
  'API con CRUD completo delle entrate e ricerca paginata dei movimenti; frontend con liste modificabili e paginate.':
    'The API supports full income CRUD and paginated transaction search. The frontend has editable, paginated lists.',
  'Registrazione online con verifica email': 'Online registration with email verification',
  'Invio delle email di verifica tramite API Brevo HTTPS e form di registrazione online nel frontend.':
    'Verification emails via the Brevo HTTPS API and a frontend sign-up form.',
  'Interfaccia migrata a PrimeNG': 'Interface migrated to PrimeNG',
  'Tutte le pagine migrate a PrimeNG e Bootstrap rimosso.':
    'All pages moved to PrimeNG, and Bootstrap was removed.',
  'Autenticazione e spese personali integrate': 'Integrated authentication and personal expenses',
  'Integrazione di autenticazione e spese personali tra API e frontend.':
    'Authentication and personal expense flows integrated across API and frontend.',
  'Sistema di refresh token nell’API.': 'Refresh-token system in the API.',
  'Sicurezza con JWT': 'Security with JWT',
  'Configurazione di Spring Security con JWT nell’API.':
    'Spring Security configuration with JWT in the API.',
  'CRUD REST delle spese': 'REST CRUD for expenses',
  'Controller e service per il CRUD completo delle spese.':
    'Controller and service for full expense CRUD.',
  '{b}CLI Java{/b} per generare record DTO vuoti simple, request e response, con validazione del naming e controllo dei file già esistenti.':
    'A {b}Java CLI{/b} that generates empty simple, request, and response DTO records, validates naming, and checks for existing files.',
  '{b}MVP disponibile{/b} con test del generatore. {i}Nuove funzionalità sospese;{/i} la generazione di risorse Spring complete resta da implementare.':
    'An {b}MVP is available{/b} with generator tests. {i}Feature development is paused.{/i} Generation of complete Spring resources is still pending.',
  '{b}Applicazione{/b} per trasformare persone e momenti in {b}patch notes{/b}, con editor, anteprima ed esportazione delle immagini. I dati sono conservati nel browser.':
    'An {b}application{/b} that turns people and moments into {b}patch notes{/b}, with an editor, preview, and image export. Data stays in the browser.',
  '{b}Versione 1.0.0 stabile{/b}, realizzata con assistenza AI per progettazione, codice, revisione, contenuti e immagini.':
    '{b}Stable version 1.0.0{/b}, built with AI assistance for design, code, review, content, and images.',
  'Aggiunta la sezione Studio offline Java/Spring con 67 argomenti, 268 quiz e tentativi salvati con Room.':
    'Added an offline Java/Spring study section with 67 topics, 268 quizzes, and attempts stored in Room.',
  'Applicazione Android per pianificare lo studio, gestire sessioni Pomodoro e organizzare il ripasso con dati locali.':
    'Android application for planning study time, running Pomodoro sessions, and organizing review using local data.',
  'Esperimento mobile con persistenza locale e valutazione manuale del ripasso.':
    'Mobile experiment with local persistence and manual review assessment.',
  'Aggiornamento sui progetti principali (Expense Tracker, AccessDesk, JobFlow) e sul portfolio':
    'Update on the main projects (Expense Tracker, AccessDesk, JobFlow) and the portfolio',
  'Portfolio di Fabio Zagaria, Junior Backend Developer: progetti con Java, Spring Boot, PostgreSQL, Angular e TypeScript.':
    "Fabio Zagaria's portfolio. Junior Backend Developer working with Java, Spring Boot, PostgreSQL, Angular, and TypeScript.",
  'Chi sono | Fabio Zagaria': 'About me | Fabio Zagaria',
  'Percorso, competenze e obiettivi professionali di Fabio Zagaria, Junior Backend Developer con visione full stack.':
    'Background, skills, and career goals of Fabio Zagaria, a Junior Backend Developer with a full-stack perspective.',
  'Esperienza e formazione | Fabio Zagaria': 'Experience and education | Fabio Zagaria',
  'Esperienza professionale e formazione Full Stack Web di Fabio Zagaria, con focus su Java, Spring Boot e sviluppo backend.':
    "Fabio Zagaria's work experience and Full Stack Web training, with a focus on Java, Spring Boot, and backend development.",
  'Progetti | Fabio Zagaria': 'Projects | Fabio Zagaria',
  'Intelligenza Umana: laboratorio tecnologico indipendente di Fabio Zagaria, orientato a software affidabile, ricerca applicata e collaborazione open source.':
    "Intelligenza Umana is Fabio Zagaria's independent technology lab for reliable software, applied research, and open-source collaboration.",
  'Contatti | Fabio Zagaria': 'Contact | Fabio Zagaria',
  'Contatta Fabio Zagaria per opportunità Junior Backend o Full Stack a Roma, ibride o da remoto in Italia.':
    'Contact Fabio Zagaria for junior backend or full-stack opportunities in Rome, hybrid, or remote in Italy.',
  'Pausa programmata': 'Scheduled time off',
  'Attualmente in ferie': 'Currently away',
  'API REST con persistenza e sicurezza, con Java e Spring Boot.':
    'REST APIs with persistence and security, built with Java and Spring Boot.',
  'Progetti del corso': 'Course projects',
  'Progetti frontend realizzati durante il corso, con demo online dove disponibile.':
    'Frontend projects built during the course, with live demos where available.',
  'Sperimentale con AI': 'AI experiments',
  'Progetti esplorativi e strumenti di studio con il supporto dell’AI.':
    'Exploratory projects and study tools built with AI assistance.',
};
