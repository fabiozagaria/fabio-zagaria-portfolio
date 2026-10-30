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
    focus: 'Full stack · v1.0.1',
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
      'Versione 1.0.0 conclusa il 25 ottobre 2026; la 1.0.1 aggiunge la cache Redis per le liste e la ricerca delle spese e letture paginate nella dashboard. La cache Redis remota resta da configurare prima di attivarla nel deploy. Collaudo del deploy e regressioni degli ultimi ampliamenti restano da completare.',
    latestUpdate: {
      dateLabel: '30 ottobre 2026',
      datetime: '2026-10-30',
      version: '1.0.1',
      summary:
        'Aggiunta la cache Redis per gli elenchi e la ricerca delle spese; la dashboard usa letture paginate.',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/8d22f0143fd86591c248085b6d71ca122e909de0',
        },
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/507d4d8a998d2fa844472a08d608a254e7f473c8',
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
      dateLabel: '6 ottobre 2026',
      datetime: '2026-10-06',
      summary:
        'Aggiunto GET /jobs/{id} con risposta tipizzata e gestione dell’ID inesistente; la verifica runtime resta aperta.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/a8b2a9104274ff1f8d7f1b46ec2e61c4c42af487',
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
      dateLabel: '25 ottobre 2026',
      datetime: '2026-10-25',
      summary:
        'Implementato il login JWT Bearer HS256 con filtro personalizzato; PostgreSQL è diventato il database predefinito.',
      sources: [
        {
          label: 'JWT',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/c6984ef4f3e7cf8dc8bad072606026f0a259fd55',
        },
        {
          label: 'PostgreSQL',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/6a1fbdb692b22ef1a16e6114304ab7585555f90a',
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
