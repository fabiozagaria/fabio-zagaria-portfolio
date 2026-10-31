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
  readonly label: string;
  readonly tag: string;
}

export interface PortfolioLatestUpdate {
  readonly dateLabel: string;
  readonly datetime: string;
  readonly version?: string;
  readonly summary: string;
  readonly sources: readonly PortfolioUpdateSource[];
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
  readonly liveLink?: string;
  readonly liveLabel?: string;
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
      { label: 'Frontend', tag: 'v1.0.2' },
      { label: 'API', tag: 'v1.0.2' },
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
      dateLabel: '31 ottobre 2026',
      datetime: '2026-10-31',
      version: 'frontend 1.0.2 · API 1.0.2',
      summary:
        'API 1.0.2: mapping MapStruct di request, entity e response. Frontend 1.0.2: dashboard con letture paginate, controllo mostra/nascondi password e correzioni del tema scuro.',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/b02566352384cccb32c698328fe12e9a48bf1bef',
        },
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/bc04ed326a90a5549bcefe4aefa83e07cb5d8c86',
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
    liveLink: 'https://gestionale-spese.vercel.app/',
    liveLabel: 'Demo full stack',
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
    versionTags: [{ label: 'Tag', tag: 'v0.1.0-alpha.1' }],
    description:
      'Backend per creare e consultare job tramite API REST, con validazione e persistenza JPA su MySQL. Il lavoro associato descrive una futura generazione di PDF.',
    highlights: [
      'Dominio Job con stati CREATED, PROCESSING, COMPLETED e FAILED',
      'POST /jobs con DTO validato, risposta 201 Created e header Location; GET /jobs/{id} per la consultazione',
      'Persistenza JPA/MySQL di Job e GeneratePdfWork con cascade PERSIST',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'REST API',
      'Spring Data JPA',
      'MySQL',
      'Bean Validation',
    ],
    status: 'In sviluppo',
    statusDetail:
      'Creazione e persistenza verificate manualmente con Postman e MySQL. GET /jobs/{id} è implementato e da verificare a runtime; worker, esecuzione asincrona e generazione PDF restano da completare.',
    latestUpdate: {
      dateLabel: '31 ottobre 2026',
      datetime: '2026-10-31',
      version: '0.1.0-alpha.1',
      summary:
        'Prima prerelease del backend: creazione e persistenza dei job sono presenti; worker, esecuzione asincrona e generazione PDF restano da completare.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/a58c3622a2cc74e0d787736a05e4915825a8ea22',
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
    title: 'Access Desk',
    category: 'Backend',
    icon: 'fas fa-user-shield',
    focus: 'Backend · sicurezza e autorizzazione',
    versionTags: [{ label: 'Tag', tag: 'v0.1.0-alpha.1' }],
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
    status: 'In sviluppo',
    statusDetail:
      'Prova autonoma ancora da completare. Login JWT, filtro e autorizzazioni sono presenti nel codice; PostgreSQL è il database predefinito, con MySQL alternativo. Restano verifiche del flusso JWT, test automatici e chiusura della consegna.',
    latestUpdate: {
      dateLabel: '31 ottobre 2026',
      datetime: '2026-10-31',
      version: '0.1.0-alpha.1',
      summary:
        'Prima prerelease: JWT Bearer, autorizzazioni e PostgreSQL predefinito sono documentati; verifiche del flusso JWT e chiusura della consegna restano aperte.',
      sources: [
        {
          label: 'JWT',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/c6984ef4f3e7cf8dc8bad072606026f0a259fd55',
        },
        {
          label: 'PostgreSQL',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/a4609198c9b74695a11f7d2f0d88651c8f3ced79',
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
      'Progetto realizzato durante il percorso LabForWeb / Nerd Academy per consolidare DOM, eventi e rendering in JavaScript vanilla. Demo frontend in manutenzione; la demo online è attualmente non disponibile.',
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
    liveLink: 'https://fakeflix-lemon-six.vercel.app/',
    liveLabel: 'Demo non disponibile',
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
    liveLink: 'https://fabio-zagaria-portfolio.vercel.app/',
    liveLabel: 'Demo online',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/fabio-zagaria-portfolio' },
    ],
  },
] as const satisfies readonly PortfolioProject[];
