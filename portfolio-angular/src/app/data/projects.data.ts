export type ProjectStatus = 'Concluso' | 'In sviluppo' | 'Laboratorio attivo' | 'Demo frontend';
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
  readonly statusDetail: string;
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
    focus: 'Full stack · frontend v1.0.2 · API v1.0.2',
    versionTags: [
      {
        label: 'Frontend',
        tag: 'v1.0.2',
        kind: 'Frontend',
        url: 'https://github.com/fabiozagaria/expense-tracker-angular/tree/v1.0.2',
      },
      {
        label: 'API',
        tag: 'v1.0.2',
        kind: 'API',
        url: 'https://github.com/fabiozagaria/expense-tracker-api/tree/v1.0.2',
      },
    ],
    description:
      'Applicazione full stack per registrare entrate e spese personali, con autenticazione e dashboard di riepilogo.',
    highlights: [
      'Frontend Angular con Signals, Reactive Forms, ricerca, filtro mensile e liste paginate',
      'CRUD completo di spese ed entrate, dashboard e grafici con persistenza JPA/MySQL',
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
      'MySQL',
      'Redis',
      'REST API',
    ],
    status: 'Concluso',
    statusDetail:
      'Versione 1.0.0 conclusa il 25 ottobre 2026; l’API 1.0.2 introduce il mapping MapStruct per spese ed entrate. Il frontend 1.0.2 include letture paginate nella dashboard, controllo mostra/nascondi password e correzioni del tema scuro. La cache Redis remota resta da configurare prima di attivarla nel deploy. Collaudo del deploy e regressioni degli ultimi ampliamenti restano da completare.',
    latestUpdate: {
      dateLabel: '4 novembre 2026',
      datetime: '2026-11-04',
      items: [
        {
          kind: 'API',
          version: 'v1.0.2',
          hash: '568b3a4',
          message: 'Add MIT license (#16)',
          dateLabel: '4 novembre 2026',
          note: 'Aggiunta la licenza MIT al repository; nessuna modifica al codice dell’API.',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/568b3a485fb1cd06cebe81c419350415fb230c98',
        },
        {
          kind: 'Frontend',
          version: 'v1.0.2',
          hash: '06543dc',
          message: 'Add MIT license (#22)',
          dateLabel: '4 novembre 2026',
          note: 'Aggiunta la licenza MIT al repository; nessuna modifica al codice del frontend.',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/06543dcdee8fa1f2f02bee2943c13e93a5c68789',
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
        path: '/dashboard',
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
        url: 'https://github.com/fabiozagaria/job-flow/tree/v0.1.0-alpha.1',
      },
    ],
    description:
      'Backend per creare e consultare job tramite API REST, con validazione e persistenza JPA su MySQL. Il lavoro associato descrive una futura generazione di PDF.',
    highlights: [
      'Dominio Job con stati CREATED, PROCESSING, COMPLETED e FAILED',
      'POST /jobs con DTO validato, risposta 201 Created e header Location; GET /jobs/{id} per la consultazione',
      'Persistenza JPA/MySQL di Job e GeneratePdfWork con cascade PERSIST',
      'JobCreatedEvent pubblicato dopo il salvataggio e JobWorker asincrono (@Async con @TransactionalEventListener) che porta il job da CREATED a PROCESSING',
      'Mapping con MapStruct e test unitari di JobService e JobController',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'REST API',
      'Spring Data JPA',
      'MySQL',
      'Bean Validation',
      'MapStruct',
    ],
    flow: {
      title: 'Dal POST al worker',
      steps: [
        { label: 'POST /jobs', detail: 'DTO validato, 201 Created' },
        { label: 'Job CREATED', detail: 'Persistenza JPA/MySQL' },
        { label: 'JobCreatedEvent', detail: 'Pubblicato dopo il salvataggio' },
        { label: 'JobWorker', detail: '@Async con @TransactionalEventListener' },
        { label: 'PROCESSING', detail: 'Verificato a runtime' },
        { label: 'COMPLETED · FAILED', detail: 'Da realizzare', pending: true },
      ],
      note: 'Schema ricavato dal codice. Il passaggio a PROCESSING è verificato a runtime; COMPLETED e FAILED restano da realizzare.',
    },
    status: 'In sviluppo',
    statusDetail:
      'Creazione e persistenza verificate con Postman e MySQL; il passaggio asincrono da CREATED a PROCESSING è verificato a runtime. GET /jobs/{id} è coperto da test ma resta da provare a runtime. Completamento fino a COMPLETED o FAILED, ProcessorRegistry e generazione PDF restano da fare.',
    latestUpdate: {
      dateLabel: '4 novembre 2026',
      datetime: '2026-11-04',
      items: [
        {
          kind: 'Backend',
          version: 'v0.1.0-alpha.1',
          hash: '0370a82',
          message: 'Add MIT license (#3)',
          dateLabel: '4 novembre 2026',
          note: 'Aggiunta la licenza MIT al repository; nessuna modifica al codice. L’ultima modifica funzionale resta il ramo feat/job-mapper del 1 novembre (JobMapper, JobCreatedEvent, JobWorker).',
          url: 'https://github.com/fabiozagaria/job-flow/commit/0370a82d96a904caa46a44d418df953e2f89723b',
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
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/job-flow' }],
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
        url: 'https://github.com/fabiozagaria/accessdesk-api/tree/v0.1.0-alpha.1',
      },
    ],
    description:
      'API REST per richieste di accesso software: i dipendenti creano e consultano le proprie richieste, i manager le approvano o le rifiutano. PostgreSQL è il database predefinito; MySQL è disponibile come alternativa configurabile.',
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
      'MySQL (alternativa)',
    ],
    flow: {
      title: 'Dal login ai dati',
      steps: [
        { label: 'Login', detail: 'JWT HS256' },
        { label: 'OncePerRequestFilter', detail: 'Bearer token' },
        { label: 'Spring Security', detail: 'Stateless, ruoli e permessi' },
        { label: '@PreAuthorize', detail: 'Autorizzazione per metodo' },
        { label: 'JPA · PostgreSQL', detail: 'Database predefinito' },
      ],
      note: 'Schema ricavato dal codice. Le verifiche del flusso JWT e i test automatici restano da completare.',
    },
    status: 'In sviluppo',
    statusDetail:
      'Prova autonoma ancora da completare. Login JWT, filtro e autorizzazioni sono presenti nel codice; PostgreSQL è il database predefinito, con MySQL alternativo. Restano verifiche del flusso JWT, test automatici e chiusura della consegna.',
    latestUpdate: {
      dateLabel: '4 novembre 2026',
      datetime: '2026-11-04',
      items: [
        {
          kind: 'Backend',
          version: 'v0.1.0-alpha.1',
          hash: '5937436',
          message: 'Add MIT license (#2)',
          dateLabel: '4 novembre 2026',
          note: 'Aggiunta la licenza MIT al repository; nessuna modifica al codice. La prerelease v0.1.0-alpha.1 resta l’ultima versione taggata; verifiche del flusso JWT e chiusura della consegna restano aperte.',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/593743674abbe523771a9ce37716f121ed3a8525',
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
    statusDetail:
      'Release frontend conclusa, realizzata durante il percorso LabForWeb: applicazione Angular che integra la TMDB API per catalogo e dettaglio.',
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
    statusDetail:
      'Progetto realizzato durante il percorso LabForWeb / Nerd Academy per consolidare DOM, eventi e rendering in JavaScript vanilla.',
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
    statusDetail: 'Progetto frontend del corso, evoluto nel portfolio professionale attuale.',
    screenshots: [
      {
        src: '/assets/img/project-portfolio.webp',
        alt: 'Home del portfolio: nome, scena 3D dei quattro livelli di Expense Tracker e cartiglio con stack, sede e formazione.',
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
