export type ProjectStatus =
  | 'Concluso'
  | 'In sviluppo'
  | 'In progettazione'
  | 'Laboratorio attivo'
  | 'Demo frontend';
export type ProjectCategory = 'Full stack' | 'Backend' | 'Frontend';

export interface PortfolioRepository {
  readonly label: string;
  readonly url: string;
}

export interface PortfolioUpdateSource {
  readonly label: string;
  readonly url: string;
}

export interface PortfolioVersionTag {
  /** Testo del segmento colorato: «Frontend», «API», «Tag», «Versione». */
  readonly label: string;
  /** Tag Git o versione, per esempio «v1.0.2». */
  readonly tag: string;
  /** Colore del tag, lo stesso dei chip dell'ultimo aggiornamento. */
  readonly kind?: PortfolioUpdateKind;
  /** Link al codice di quella versione su GitHub. */
  readonly url?: string;
}

export type PortfolioUpdateKind = 'API' | 'Frontend' | 'Backend' | 'Plugin';

/** Ultimo commit reale di un repository, mostrato come riga con chip colorato. */
export interface PortfolioUpdateItem {
  readonly kind: PortfolioUpdateKind;
  /** Tag o versione del repository, per esempio «v1.0.2». */
  readonly version?: string;
  /** Hash abbreviato del commit. */
  readonly hash: string;
  /** Prima riga del messaggio del commit, così com'è su GitHub. */
  readonly message: string;
  readonly dateLabel: string;
  /** Una frase in italiano su ciò che il commit porta. */
  readonly note?: string;
  /** Link al commit con l'hash completo. */
  readonly url: string;
}

export interface PortfolioLatestUpdate {
  readonly dateLabel: string;
  readonly datetime: string;
  readonly version?: string;
  /** Formato libero, per le card che non usano ancora `items`. */
  readonly summary?: string;
  readonly sources?: readonly PortfolioUpdateSource[];
  /** Un elemento per repository: nei progetti full stack prima l'API, poi il frontend. */
  readonly items?: readonly PortfolioUpdateItem[];
}

export interface PortfolioScreenshot {
  readonly src: string;
  /** Percorso della pagina fotografata, mostrato dopo il dominio nella barra della cornice. */
  readonly path?: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface PortfolioFlowStep {
  readonly label: string;
  readonly detail: string;
  /** Passaggio non ancora realizzato: viene disegnato tratteggiato. */
  readonly pending?: boolean;
}

/** Schema del flusso, per i progetti senza interfaccia da fotografare. */
export interface PortfolioFlow {
  readonly title: string;
  readonly steps: readonly PortfolioFlowStep[];
  readonly note: string;
}

/** Stato reale di un progetto: com'è oggi e cosa manca. La cronologia sta in project-history.data.ts. */
export interface PortfolioStatusDetail {
  /** Una o due frasi sullo stato attuale, solo fatti verificati. */
  readonly summary: string;
  /** Cosa manca o non è ancora verificato, una voce per punto. */
  readonly pending?: readonly string[];
}

export interface PortfolioProject {
  readonly id: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly icon: string;
  readonly focus: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly status: ProjectStatus;
  readonly statusDetail: PortfolioStatusDetail;
  readonly latestUpdate?: PortfolioLatestUpdate;
  readonly versionTags?: readonly PortfolioVersionTag[];
  readonly decision?: {
    readonly problem: string;
    readonly solution: string;
    readonly tradeoff: string;
  };
  readonly example?: {
    readonly command: string;
    readonly output: string;
  };
  readonly screenshots?: readonly PortfolioScreenshot[];
  readonly flow?: PortfolioFlow;
  readonly liveLink?: string;
  readonly liveLabel?: string;
  /** Documentazione interattiva dell'API (Swagger UI), distinta dai link GitHub. */
  readonly apiDocsLink?: string;
  readonly repositories?: readonly PortfolioRepository[];
}

export const PROJECTS = [
  {
    id: 'gestionale-spese',
    title: 'Expense Tracker',
    category: 'Full stack',
    icon: 'fas fa-wallet',
    focus: 'Full stack · frontend 1.2.0 · API 1.3.0',
    versionTags: [
      {
        label: 'Frontend',
        tag: 'v1.2.0',
        kind: 'Frontend',
        url: 'https://github.com/fabiozagaria/expense-tracker-angular/releases/tag/v1.2.0',
      },
      {
        label: 'API',
        tag: 'v1.3.0',
        kind: 'API',
        url: 'https://github.com/fabiozagaria/expense-tracker-api/releases/tag/v1.3.0',
      },
    ],
    description:
      'Applicazione full stack per registrare entrate e spese personali, con autenticazione e dashboard di riepilogo.',
    highlights: [
      'Frontend Angular con Signals, Reactive Forms, ricerca, filtro mensile e liste paginate',
      'CRUD completo di spese ed entrate, dashboard e grafici con persistenza JPA/PostgreSQL',
      'Registrazione online con verifica email tramite API Brevo HTTPS, JWT e refresh token HttpOnly',
      'Cache Redis delle liste e della ricerca spese, separata per utente e invalidata dopo le scritture',
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'Refresh token',
      'Spring Data JPA',
      'PostgreSQL',
      'Redis',
      'REST API',
    ],
    status: 'Concluso',
    statusDetail: {
      summary:
        'Frontend 1.2.0 (release v1.2.0) con pagina Impostazioni e API 1.3.0 (release v1.3.0) con GET /api/me; il proprietario ha confermato il cambio password dal sito pubblico. Dal 19 novembre 2026 l’API usa PostgreSQL e, secondo il README del backend, la demo online usa il database Neon con il profilo neon: schema creato da Flyway e un login demo sul backend pubblico ha scritto il refresh token nel database, quindi i dati restano dopo un riavvio.',
      pending: [
        'Configurare la cache Redis remota prima di attivarla nel deploy',
        'Controllo visivo sistematico desktop e mobile nei due temi',
        'Percorso completo in locale con Mailpit',
      ],
    },
    latestUpdate: {
      dateLabel: '19 novembre 2026',
      datetime: '2026-11-19',
      items: [
        {
          kind: 'API',
          version: 'v1.3.0',
          hash: 'c53be2c',
          message: 'Merge pull request #33 from fabiozagaria/ccr-086f78e2-uorltc',
          dateLabel: '19 novembre 2026',
          note: 'Porta la versione nel pom a 1.3.0 (database PostgreSQL con profilo neon, contratto REST invariato) e aggiorna la documentazione: la demo online usa il database Neon, verificato con lo schema creato da Flyway e un login demo che scrive il refresh token. Su questo commit sono pubblicati il tag e la release v1.3.0.',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/c53be2c391acd4991f7db85e345972e58e4429d8',
        },
        {
          kind: 'Frontend',
          version: 'v1.2.0',
          hash: '74b574f',
          message: 'Documentazione: backend migrato a PostgreSQL (Neon) (#40)',
          dateLabel: '19 novembre 2026',
          note: 'Aggiorna README, CONTEXT.md e DEPLOYMENT.md al passaggio del backend a PostgreSQL; nessuna modifica al codice e contratto REST invariato. Il 19 novembre 2026 è pubblicata la release v1.2.0 (pagina Impostazioni), con il tag sul commit del 10 novembre in cui package.json passa alla 1.2.0.',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/74b574f3d3684ae7f364fb23096029ca57a5aa09',
        },
      ],
    },
    decision: {
      problem: 'Garantire che ogni utente possa accedere soltanto ai propri movimenti.',
      solution:
        'API protette da JWT e controllo del proprietario sul backend, con refresh token in cookie HttpOnly.',
      tradeoff:
        'Cookie, CORS e proxy devono essere coerenti tra frontend e API; il piano gratuito del backend può richiedere attesa al primo accesso.',
    },
    screenshots: [
      {
        src: '/assets/img/project-expense-tracker.webp',
        path: '/dashboard',
        alt: 'Dashboard di Expense Tracker: saldo disponibile 1197,00 €, entrate totali 1200,00 € e spese totali 3,00 €, con il riepilogo dei movimenti e la tabella degli ultimi movimenti.',
        width: 1400,
        height: 640,
      },
      {
        src: '/assets/img/project-expense-tracker-home.webp',
        path: '/',
        alt: 'Home di Expense Tracker nel tema scuro: titolo «Le tue finanze, al posto giusto.», pulsanti Accedi al tuo spazio e Registrati e riquadro con entrate, spese e saldo.',
        width: 1400,
        height: 640,
      },
      {
        src: '/assets/img/project-expense-tracker-login-scuro.webp',
        path: '/login',
        alt: 'Pagina di accesso di Expense Tracker nel tema scuro, con il pulsante Prova la demo, l’avviso sul primo avvio del server e il grafico a barre delle finanze.',
        width: 1400,
        height: 652,
      },
      {
        src: '/assets/img/project-expense-tracker-login-chiaro.webp',
        path: '/login',
        alt: 'Pagina di accesso di Expense Tracker nel tema chiaro, con il pulsante Prova la demo, l’avviso sul primo avvio del server e il grafico a barre delle finanze.',
        width: 1400,
        height: 652,
      },
    ],
    liveLink: 'https://gestionale-spese.vercel.app/',
    liveLabel: 'Demo full stack',
    apiDocsLink: 'https://expense-tracker-api-demo-plb9.onrender.com/swagger-ui.html',
    repositories: [
      {
        label: 'Frontend',
        url: 'https://github.com/fabiozagaria/expense-tracker-angular',
      },
      {
        label: 'Backend',
        url: 'https://github.com/fabiozagaria/expense-tracker-api',
      },
    ],
  },
  {
    id: 'jobflow',
    title: 'JobFlow',
    category: 'Backend',
    icon: 'fas fa-diagram-project',
    focus: 'Backend · API e persistenza dei job',
    versionTags: [
      {
        label: 'Tag',
        tag: 'v0.1.0-alpha.1',
        kind: 'Backend',
        url: 'https://github.com/fabiozagaria/job-flow/releases/tag/v0.1.0-alpha.1',
      },
    ],
    description:
      'Backend per creare e consultare job tramite API REST, con validazione e persistenza JPA su PostgreSQL. Il lavoro associato descrive una futura generazione di PDF.',
    highlights: [
      'Dominio Job con stati CREATED, PROCESSING, COMPLETED e FAILED',
      'POST /jobs con DTO validato, risposta 201 Created e header Location; GET /jobs/{id} per la consultazione',
      'Persistenza JPA/PostgreSQL di Job e GeneratePdfWork con cascade PERSIST; schema versionato con Flyway e Hibernate in validate',
      'JobCreatedEvent pubblicato dopo il salvataggio e JobWorker asincrono (@Async con @TransactionalEventListener) che porta il job da CREATED a PROCESSING',
      'Immagine Docker pubblicata su Render con documentazione Swagger UI',
      'Mapping con MapStruct e test unitari di JobService e JobController',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'REST API',
      'Spring Data JPA',
      'PostgreSQL',
      'Flyway',
      'Docker',
      'Bean Validation',
      'MapStruct',
    ],
    flow: {
      title: 'Dal POST al worker',
      steps: [
        { label: 'POST /jobs', detail: 'DTO validato, 201 Created' },
        { label: 'Job CREATED', detail: 'Persistenza JPA/PostgreSQL' },
        { label: 'JobCreatedEvent', detail: 'Pubblicato dopo il salvataggio' },
        { label: 'JobWorker', detail: '@Async con @TransactionalEventListener' },
        { label: 'PROCESSING', detail: 'Verificato a runtime' },
        { label: 'COMPLETED · FAILED', detail: 'Da realizzare', pending: true },
      ],
      note: 'Schema ricavato dal codice. Il passaggio a PROCESSING è verificato a runtime; COMPLETED e FAILED restano da realizzare.',
    },
    status: 'In sviluppo',
    statusDetail: {
      summary:
        'Pubblicato su Render con Swagger UI (piano gratuito: il primo accesso può richiedere attesa), su PostgreSQL con migrazioni Flyway. In locale sono verificati POST /jobs (201), GET /jobs/{id} (200 e 404) e il passaggio asincrono da CREATED a PROCESSING; online sono verificati Swagger UI e la risposta 404 di GET /jobs/{id}.',
      pending: [
        'Verificare la connessione al database PostgreSQL su Neon e il deploy su Render con il profilo neon, scelto il 19 novembre 2026 al posto del PostgreSQL Free di Render che scadeva dopo 30 giorni',
        'Completamento dei job fino a COMPLETED o FAILED',
        'ProcessorRegistry e generazione PDF',
      ],
    },
    latestUpdate: {
      dateLabel: '19 novembre 2026',
      datetime: '2026-11-19',
      items: [
        {
          kind: 'Backend',
          version: 'v0.1.0-alpha.1',
          hash: '7d4e50e',
          message: 'Database di produzione su Neon al posto del PostgreSQL Free di Render (#8)',
          dateLabel: '19 novembre 2026',
          note: 'Sposta il database di produzione su Neon: profilo neon con TLS verificato e pool ridotto, docker-entrypoint.sh che ricava le credenziali da DATABASE_URL e rifiuta un URL JDBC, render.yaml senza il database di Render, neon.ts per la CLI Neon. La versione nel pom resta 0.1.0-alpha.1 e non ci sono nuovi tag.',
          url: 'https://github.com/fabiozagaria/job-flow/commit/7d4e50ec001f2c3f001fbb701fb62584433a3cb0',
        },
      ],
    },
    decision: {
      problem:
        'Salvare un nuovo job insieme al lavoro che descrive, mantenendo distinte le responsabilità.',
      solution: 'Job possiede GeneratePdfWork; cascade PERSIST salva il nuovo Work insieme al Job.',
      tradeoff:
        'Il cascade è limitato alla creazione: aggiornamenti e rimozioni richiedono una gestione esplicita.',
    },
    apiDocsLink: 'https://jobflow-dbnm.onrender.com/swagger-ui.html',
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/job-flow' }],
  },
  {
    id: 'medtransit',
    title: 'MedTransit',
    category: 'Backend',
    icon: 'fas fa-truck-medical',
    focus: 'Backend · microservizi ed eventi con Kafka',
    description:
      'Sistema a microservizi per le richieste di trasporto interno in un ospedale, con dati fittizi: un reparto chiede un trasporto, il sistema lo assegna a un operatore per priorità e turno e avvisa tutti a ogni cambio di stato. Il progetto è in fase di progettazione: il design è approvato, il codice non c’è ancora.',
    highlights: [
      'Design approvato: tre servizi indipendenti (richieste, assegnazione, notifiche), un database per servizio e nessun codice condiviso',
      'Eventi previsti: richiesta creata, assegnata, presa in carico e completata, con una chiave per richiesta per mantenere l’ordine',
      'Da dimostrare: outbox pattern, consumer idempotenti, dead-letter topic e tracciamento di una richiesta con correlationId',
      'Test previsti su evento duplicato, consumer che si ferma e riparte, messaggio in dead-letter e assegnazione concorrente',
    ],
    technologies: [
      'Java (previsto)',
      'Spring Boot (previsto)',
      'Kafka (previsto)',
      'PostgreSQL (previsto)',
      'Docker (previsto)',
    ],
    flow: {
      title: 'Dalla richiesta al completamento',
      steps: [
        {
          label: 'richiesta.creata',
          detail: 'request-service, lato reparto',
          pending: true,
        },
        {
          label: 'richiesta.assegnata',
          detail: 'dispatch-service: operatore libero e in turno, altrimenti coda per priorità',
          pending: true,
        },
        {
          label: 'richiesta.presa-in-carico',
          detail: 'L’operatore agisce su dispatch-service',
          pending: true,
        },
        {
          label: 'richiesta.completata',
          detail: 'Lo stato torna a request-service',
          pending: true,
        },
        {
          label: 'Notifiche',
          detail: 'notification-service consuma gli eventi (simulate)',
          pending: true,
        },
      ],
      note: 'Schema ricavato dal design doc del repository. Nessun passaggio è ancora realizzato.',
    },
    status: 'In progettazione',
    statusDetail: {
      summary:
        'Dal 17 novembre 2026 il design è approvato e documentato nel repository. Non c’è ancora codice né test: l’implementazione parte dopo JobFlow. Autenticazione, interfaccia grafica e notifiche reali restano fuori dalla prima versione.',
    },
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/med-transit-msa' }],
  },
  {
    id: 'accessdesk',
    title: 'AccessDesk',
    category: 'Backend',
    icon: 'fas fa-user-shield',
    focus: 'Backend · sicurezza e autorizzazione',
    versionTags: [
      {
        label: 'Tag',
        tag: 'v0.1.0-alpha.1',
        kind: 'Backend',
        url: 'https://github.com/fabiozagaria/accessdesk-api/releases/tag/v0.1.0-alpha.1',
      },
    ],
    description:
      'API REST per richieste di accesso software: i dipendenti creano e consultano le proprie richieste, i manager le approvano o le rifiutano. I dati sono salvati in PostgreSQL con migrazioni Flyway.',
    highlights: [
      'Login con JWT HS256 e filtro personalizzato OncePerRequestFilter per il Bearer token',
      'Spring Security stateless, ruoli e permessi, autorizzazione con @PreAuthorize',
      'Errori del filtro delegati a HandlerExceptionResolver e gestione globale delle eccezioni',
      'JPA/Hibernate, MapStruct, transazioni, locking ottimistico e paginazione Page/Pageable',
    ],
    technologies: [
      'Java 21',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'PostgreSQL',
      'Spring Data JPA',
      'MapStruct',
      'Flyway',
    ],
    flow: {
      title: 'Dal login ai dati',
      steps: [
        { label: 'Login', detail: 'JWT HS256' },
        { label: 'OncePerRequestFilter', detail: 'Bearer token' },
        { label: 'Spring Security', detail: 'Stateless, ruoli e permessi' },
        { label: '@PreAuthorize', detail: 'Autorizzazione per metodo' },
        { label: 'JPA · PostgreSQL', detail: 'Schema gestito da Flyway' },
      ],
      note: 'Schema ricavato dal codice. Registrazione e login verificati sullo stack Docker. I controlli sugli endpoint protetti restano da completare.',
    },
    status: 'In sviluppo',
    statusDetail: {
      summary:
        'Login JWT, filtro e autorizzazioni sono presenti nel codice. PostgreSQL è l’unico database, con schema gestito da migrazioni Flyway e avvio con Docker Compose (PostgreSQL 18 e API). Secondo il README, sullo stack Docker sono verificati build, migrazione V1, avvio, registrazione e login.',
      pending: [
        'Verifica del flusso JWT e degli altri endpoint',
        'Estendere i test automatici agli endpoint protetti',
        'Verificare la connessione al database PostgreSQL su Neon e il deploy su Render con il profilo neon',
        'Chiusura della consegna: la prova autonoma è ancora da completare',
      ],
    },
    latestUpdate: {
      dateLabel: '19 novembre 2026',
      datetime: '2026-11-19',
      items: [
        {
          kind: 'Backend',
          version: 'v0.1.0-alpha.1',
          hash: '961b920',
          message: 'Progetto Neon collegato (neon.ts) (#9)',
          dateLabel: '19 novembre 2026',
          note: 'Il 19 novembre 2026 il progetto resta solo su PostgreSQL (rimossi profilo, driver e migrazioni MySQL) e aggiunge il profilo neon per una demo persistente, con DemoDataSeeder idempotente e un nuovo test; l’ultimo commit collega il progetto Neon con neon.ts. La versione nel pom resta 0.1.0-alpha.1 e non ci sono nuovi tag.',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/961b920f66524b4b93870b586f31f885b45734a5',
        },
      ],
    },
    decision: {
      problem:
        'Gestire gli errori del token nel filtro, prima che la richiesta raggiunga Spring MVC.',
      solution:
        'Il filtro pulisce il SecurityContext e delega le eccezioni a HandlerExceptionResolver per riutilizzare la gestione globale.',
      tradeoff:
        'Il filtro deve interrompere il flusso dopo un errore; autenticazione e autorizzazione richiedono verifiche dedicate.',
    },
    apiDocsLink: 'https://access-desk-api.onrender.com/swagger-ui.html',
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/accessdesk-api' }],
  },
  {
    id: 'labtv',
    title: 'LabTV',
    category: 'Frontend',
    icon: 'fas fa-film',
    focus: 'Frontend · progetto del corso LabForWeb',
    description:
      'Applicazione Angular per esplorare film, cast e titoli simili attraverso i dati della TMDB API.',
    highlights: [
      'Catalogo dinamico con HttpClient, RxJS e modelli TypeScript',
      'Routing parametrico per dettaglio, cast, regista e film simili',
      'Stati di caricamento ed errore gestiti nei flussi asincroni',
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'TMDB API', 'Bootstrap'],
    status: 'Concluso',
    statusDetail: {
      summary:
        'Release frontend conclusa, realizzata durante il percorso LabForWeb: applicazione Angular che integra la TMDB API per catalogo e dettaglio.',
    },
    latestUpdate: {
      dateLabel: '2 ottobre 2026',
      datetime: '2026-10-02',
      summary:
        'Aggiunto un selettore accessibile per il tema chiaro e scuro, con preferenza salvata nel browser.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/labtv-angular/commit/ced103c01b7edf4cd4ae740e6b8a8a5608dddcff',
        },
      ],
    },
    decision: {
      problem:
        'Integrare catalogo e dettagli TMDB senza distribuire le chiamate HTTP nei componenti.',
      solution:
        'MovieService centralizza le richieste e restituisce Observable con modelli TypeScript.',
      tradeoff:
        'La SPA dipende dalla API esterna; credenziali riservate richiederebbero un backend dedicato.',
    },
    screenshots: [
      {
        src: '/assets/img/project-labtv.webp',
        path: '/catalogo',
        alt: 'Catalogo film di LabTV con la navigazione Home, Catalogo, Ricerca e Contatti e una griglia di locandine, tra cui The Dark Knight, Wildwood, Hope e Spider-Man: Brand New Day.',
        width: 1400,
        height: 640,
      },
      {
        src: '/assets/img/project-labtv-home.webp',
        path: '/',
        alt: 'Home di LabTV: logo, titolo Benvenuto su LabTV, pulsante Vai al catalogo e riquadro Film, dettagli e ricerca.',
        width: 1400,
        height: 640,
      },
      {
        src: '/assets/img/project-labtv-ricerca.webp',
        path: '/ricerca',
        alt: 'Ricerca di LabTV: digitando «spi» nel campo di ricerca compare tra i risultati la locandina di Spider-Man: Brand New Day.',
        width: 1400,
        height: 640,
      },
    ],
    liveLink: 'https://lab-tv.vercel.app/',
    liveLabel: 'Demo online',
    repositories: [
      {
        label: 'Repository',
        url: 'https://github.com/fabiozagaria/labtv-angular',
      },
    ],
  },
  {
    id: 'fakeflix',
    title: 'Fakeflix',
    category: 'Frontend',
    icon: 'fas fa-film',
    focus: 'Frontend · progetto del corso LabForWeb / Nerd Academy',
    description:
      'Landing page responsive dedicata a Stranger Things, realizzata con HTML, CSS e JavaScript vanilla. Include schede dinamiche di episodi e trailer e validazione del form email.',
    highlights: [
      'Manipolazione del DOM ed eventi con JavaScript nativo',
      'Schede dinamiche per episodi, trailer e piani',
      'Validazione email e modale trailer riutilizzabile',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'DOM API'],
    status: 'Demo frontend',
    statusDetail: {
      summary:
        'Progetto realizzato durante il percorso LabForWeb / Nerd Academy per consolidare DOM, eventi e rendering in JavaScript vanilla.',
    },
    latestUpdate: {
      dateLabel: '2 ottobre 2026',
      datetime: '2026-10-02',
      summary:
        'Aggiunto un selettore accessibile per il tema chiaro e scuro, con preferenza salvata nel browser.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/fakeflix-vanilla-js/commit/4a305ca7eba361f56d666dd5d79e0fb0b12bbb0a',
        },
      ],
    },
    screenshots: [
      {
        src: '/assets/img/project-fakeflix.webp',
        path: '/',
        alt: 'Pagina di Fakeflix dedicata a Stranger Things: titolo della serie su uno sfondo di foresta scura, descrizione, campo email con il pulsante Inizia a guardare e menu con Info, Trailer, Episodi, Potrebbe piacerti e Piani.',
        width: 1400,
        height: 640,
      },
      {
        src: '/assets/img/project-fakeflix-pagina.webp',
        path: '/',
        alt: 'Fakeflix, sezioni Potrebbe piacerti e Scegli il tuo piano: carosello di serie con Dark, IT, Locke & Key e IT: Capitolo 2, e piani Base, Standard e Premium.',
        width: 1400,
        height: 639,
      },
    ],
    liveLink: 'https://fakeflix-vanilla-js.vercel.app/',
    liveLabel: 'Demo online',
    repositories: [
      {
        label: 'Repository',
        url: 'https://github.com/fabiozagaria/fakeflix-vanilla-js',
      },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    category: 'Frontend',
    icon: 'fas fa-code',
    focus: 'Frontend · progetto del corso',
    description:
      'Portfolio Angular con componenti standalone, routing lazy e contenuti tipizzati, con attenzione ad accessibilità e SEO.',
    highlights: [
      'Componenti standalone e routing lazy',
      'Metadati specifici per route e dati tipizzati',
    ],
    technologies: ['Angular 21', 'TypeScript 5.9', 'HTML', 'CSS', 'Vercel'],
    status: 'Demo frontend',
    statusDetail: {
      summary: 'Progetto frontend del corso, evoluto nel portfolio professionale attuale.',
    },
    screenshots: [
      {
        src: '/assets/img/project-portfolio.webp',
        alt: 'Home del portfolio nel tema chiaro: nome su un cielo con il sole e nuvole, scheda con stack, sede e formazione.',
        width: 1120,
        height: 708,
      },
    ],
    liveLink: 'https://fabio-zagaria-portfolio.vercel.app/',
    liveLabel: 'Demo online',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/fabio-zagaria-portfolio' },
    ],
  },
] as const satisfies readonly PortfolioProject[];
