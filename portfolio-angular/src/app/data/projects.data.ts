export type ProjectStatus = 'Concluso' | 'In sviluppo' | 'Laboratorio attivo';

export interface PortfolioRepository {
  readonly label: string;
  readonly url: string;
}

export interface PortfolioProject {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly focus: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly status: ProjectStatus;
  readonly statusDetail: string;
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
    icon: 'fas fa-wallet',
    focus: 'Progetto full stack · versione base conclusa',
    description:
      'Applicazione full stack per registrare entrate e spese personali, con autenticazione e dashboard di riepilogo.',
    highlights: [
      'Frontend Angular con Signals, Reactive Forms e test di componenti e servizi',
      'CRUD spese, inserimento e lettura entrate, dashboard e persistenza JPA/MySQL',
      'Registrazione online con verifica email tramite API Brevo HTTPS, JWT e refresh token HttpOnly',
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'MySQL',
      'REST API',
    ],
    status: 'Concluso',
    statusDetail:
      'Versione base conclusa e online: registrazione con verifica email, sessione, CRUD spese, inserimento e lettura entrate e dashboard. Frontend Vercel, API Render e database MySQL Aiven. CRUD completo delle entrate e filtri sono ampliamenti in lavorazione.',
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
    id: 'accessdesk',
    title: 'AccessDesk',
    icon: 'fas fa-user-shield',
    focus: 'Progetto autonomo · sicurezza e autorizzazione backend',
    description:
      'API REST per richieste di accesso software: i dipendenti creano e consultano le proprie richieste, i manager le approvano o le rifiutano.',
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
      'Spring Data JPA',
      'PostgreSQL',
      'MapStruct',
    ],
    status: 'In sviluppo',
    statusDetail:
      'Prova autonoma ancora da completare. Login JWT, filtro e autorizzazioni sono presenti nel codice; PostgreSQL è il database predefinito, con MySQL alternativo. Restano verifiche del flusso JWT, test automatici e chiusura della consegna.',
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
    id: 'spring-scaffold-cli',
    title: 'Spring Scaffold CLI',
    icon: 'fas fa-terminal',
    focus: 'Tooling Java · code generation',
    description:
      'CLI Java per generare boilerplate Spring Boot leggibile e modificabile, partendo da DTO request/response.',
    highlights: [
      'Sottocomandi e opzioni CLI con Picocli',
      'Generazione sicura di DTO con validazione del naming e protezione dalla sovrascrittura',
      'Architettura separata tra parsing dei comandi, generator e template',
    ],
    decision: {
      problem:
        'Ridurre il lavoro ripetitivo sui DTO senza perdere il controllo del codice prodotto.',
      solution:
        'La CLI genera record Java leggibili e rifiuta la sovrascrittura di file esistenti.',
      tradeoff:
        'Il primo MVP genera record vuoti: campi e risorse Spring complete restano da implementare.',
    },
    example: {
      command: 'java -jar target/spring-scaffold-cli-0.1.0-SNAPSHOT.jar generate dto Expense',
      output:
        'ExpenseRequest.java\npublic record ExpenseRequest() {\n}\n\nExpenseResponse.java\npublic record ExpenseResponse() {\n}',
    },
    technologies: ['Java 17', 'Maven', 'Picocli', 'CLI', 'Code generation'],
    status: 'In sviluppo',
    statusDetail:
      'MVP disponibile con test del generatore: genera record DTO vuoti simple, request, response o entrambi. Nuove funzionalità sospese; non genera risorse Spring complete.',
    repositories: [
      {
        label: 'Repository',
        url: 'https://github.com/fabiozagaria/spring-scaffold-cli',
      },
    ],
  },
  {
    id: 'jobflow',
    title: 'JobFlow',
    icon: 'fas fa-diagram-project',
    focus: 'Backend in evoluzione · modellazione dei job',
    description:
      'Backend per un sistema di job asincroni: il primo slice crea e persiste un job per la futura generazione di un documento PDF.',
    highlights: [
      'Dominio Job con stati CREATED, PROCESSING, COMPLETED e FAILED',
      'POST /jobs con DTO validato, risposta 201 Created e header Location',
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
    id: 'labtv',
    title: 'LabTV',
    icon: 'fas fa-film',
    focus: 'Integrazione API esterna',
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
      'Release frontend conclusa: applicazione Angular che integra la TMDB API per catalogo e dettaglio. Non sono previsti backend proprietario, autenticazione o persistenza utente.',
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
    id: 'task-manager-security-lab',
    title: 'Task Manager Security Lab',
    icon: 'fas fa-shield-halved',
    focus: 'Laboratorio guidato · backend',
    description:
      'Laboratorio di studio usato per sperimentare autenticazione e persistenza in una semplice API CRUD di task.',
    highlights: [
      'Registrazione e login con password BCrypt e access token JWT',
      "CRUD dei task limitato all'utente autenticato tramite Spring Security",
      'Refresh token opaco salvato come hash, rotazione one-time e revoca tramite logout',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'MySQL',
      'JWT',
    ],
    status: 'Laboratorio attivo',
    statusDetail:
      'È un esercizio guidato di apprendimento, non un prodotto ideato autonomamente. Lo uso per comprendere Spring Security, JPA e Hibernate; refresh, rotazione e logout sono implementati. Documentazione, test comportamentali e cookie HttpOnly/Secure restano da completare.',
    repositories: [
      {
        label: 'Repository laboratorio',
        url: 'https://github.com/fabiozagaria/task-manager-api-jpa-security',
      },
    ],
  },
] as const satisfies readonly PortfolioProject[];
