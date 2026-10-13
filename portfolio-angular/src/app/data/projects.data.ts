export type ProjectStatus = 'Concluso' | 'In sviluppo' | 'Sospeso' | 'Laboratorio attivo';

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
    focus: 'Progetto full stack · demo pubblica in consolidamento',
    description:
      'Applicazione full stack per registrare entrate e spese personali, con autenticazione e dashboard di riepilogo.',
    highlights: [
      'Angular 21 con PrimeNG/Aura, Signals, Reactive Forms e test di componenti e servizi',
      'CRUD spese, creazione e lettura entrate e dashboard con DTO e persistenza JPA/MySQL',
      'JWT, refresh token HttpOnly e controllo del proprietario; verifica email disponibile in locale',
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'PrimeNG',
      'Aura',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'MySQL',
      'REST API',
    ],
    status: 'In sviluppo',
    statusDetail:
      'Versione 0.3.0 in consolidamento: frontend Vercel collegato al backend Render con MySQL. La demo usa un account condiviso e dati fittizi; login, sessione, dashboard e CRUD spese sono verificati nel browser secondo la documentazione del progetto. La registrazione online è disabilitata in attesa del servizio email HTTPS. Registrazione locale con Mailpit e creazione di entrate nel database condiviso restano da verificare nel flusso completo.',
    decision: {
      problem: 'Garantire che ogni utente possa consultare e modificare soltanto le proprie spese.',
      solution:
        'API protette da JWT e controllo del proprietario sul backend, con refresh token in cookie HttpOnly.',
      tradeoff:
        'La demo usa un account condiviso: le modifiche sono visibili agli altri visitatori. Usare solo dati fittizi; il backend Render può richiedere 2–3 minuti per riattivarsi.',
    },
    liveLink: 'https://gestionale-spese.vercel.app/',
    liveLabel: 'Prova la demo',
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
    id: 'spring-scaffold-cli',
    title: 'Spring Scaffold CLI',
    icon: 'fas fa-terminal',
    focus: 'Tooling Java · MVP DTO disponibile',
    description:
      'CLI Java 17 per generare record DTO vuoti, leggibili e modificabili, con tipo e directory di output selezionabili.',
    highlights: [
      'Sottocomandi e opzioni CLI con Picocli',
      'Validazione del naming e controllo dei file di destinazione già esistenti',
      'Parsing dei comandi separato dal generatore, con test JUnit dedicati',
    ],
    decision: {
      problem:
        'Ridurre il lavoro ripetitivo sui DTO senza perdere il controllo del codice prodotto.',
      solution:
        'La CLI genera record Java leggibili e rifiuta la sovrascrittura di file esistenti.',
      tradeoff:
        'Il MVP genera record vuoti e non garantisce scritture atomiche concorrenti. Campi e risorse Spring complete sono fuori dallo scope attuale.',
    },
    example: {
      command: 'java -jar target/spring-scaffold-cli-0.1.0-SNAPSHOT.jar generate dto Expense',
      output:
        'ExpenseRequest.java\npublic record ExpenseRequest() {\n}\n\nExpenseResponse.java\npublic record ExpenseResponse() {\n}',
    },
    technologies: ['Java 17', 'Maven', 'Picocli', 'CLI', 'Code generation'],
    status: 'Sospeso',
    statusDetail:
      'MVP DTO disponibile con test del generatore: genera DTO simple, request, response o entrambi. Le nuove funzionalità sono sospese; campi configurabili e generazione di entity, repository, service e controller non sono implementati né attività correnti.',
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
      'GET /jobs/{id} con JobResponse e gestione del job assente nel service',
      'Persistenza JPA/MySQL di Job e GeneratePdfWork con cascade PERSIST',
    ],
    technologies: [
      'Java 21',
      'Spring Boot',
      'REST API',
      'Spring Data JPA',
      'MySQL',
      'Bean Validation',
    ],
    status: 'In sviluppo',
    statusDetail:
      'Creazione e persistenza verificate manualmente con Postman e MySQL secondo il README. GET /jobs/{id} è implementato: risposte 200, 404 e formato dell’errore restano da verificare a runtime. JobWorker non esegue ancora lavori; processor PDF, Executor e gestione di successo/fallimento sono i prossimi passi della v0.1. GeneratedPDFResult è un modello persistente, non un PDF già generato.',
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
    focus: 'Integrazione API esterna · release frontend 1.0.0',
    description:
      'Applicazione Angular per esplorare film, cast e titoli simili dalla TMDB API, con ricerca locale per titolo sul catalogo caricato.',
    highlights: [
      'Catalogo dinamico con HttpClient, RxJS e modelli TypeScript',
      'Routing parametrico per il dettaglio, con cast, regista e film simili',
      'Stati di caricamento ed errore gestiti nei flussi asincroni',
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'TMDB API', 'Bootstrap'],
    status: 'Concluso',
    statusDetail:
      'Release frontend 1.0.0 conclusa; demo disponibile e manutenzione mirata. Catalogo, ricerca locale e dettaglio sono nello scope attuale; login dimostrativo, senza autenticazione reale o persistenza utente. Un’eventuale evoluzione con backend e profili sarebbe una fase separata LabTV 2.x.',
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
      'Refresh token opaco con hash SHA-256 persistito, rotazione e revoca tramite logout',
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
      'È un esercizio guidato di apprendimento, non un prodotto ideato autonomamente. Refresh, rotazione e logout sono presenti; il refresh viaggia nel JSON, senza cookie HttpOnly. La rotazione concorrente e il flusso CSRF delle operazioni mutative richiedono verifiche mirate. La suite include il test del contesto, senza copertura comportamentale completa.',
    repositories: [
      {
        label: 'Repository laboratorio',
        url: 'https://github.com/fabiozagaria/task-manager-api-jpa-security',
      },
    ],
  },
  {
    id: 'transport-tickets',
    title: 'Transport Tickets',
    icon: 'fas fa-route',
    focus: 'Laboratorio di studio · dati e concorrenza',
    description:
      'Backend di studio ispirato ai flussi dei trasporti ospedalieri, con regole di dominio, storico e accesso alle risorse.',
    highlights: [
      'Dominio separato dalle entità JPA, con ticket e storico degli eventi in MySQL',
      'Migrazioni Flyway, transazioni e lock sul ticket; cache Redis opzionale con fallback',
      'Spring Security con sessioni, CSRF, ruoli e controlli di accesso al singolo ticket',
    ],
    technologies: [
      'Java 17',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'MySQL',
      'Flyway',
      'Redis',
    ],
    status: 'Laboratorio attivo',
    statusDetail:
      'Backend di studio nel branch study/backend-jpa-snapshot, sviluppato anche con strumenti AI. Persistenza, storico, transazioni, lock, cache e autorizzazione sono presenti con test dedicati; il traguardo corrente è consolidarne comprensione e verifiche. Main conserva la demo HTTP Java in memoria. Non è presente un frontend; usare solo dati fittizi.',
    repositories: [
      {
        label: 'Branch backend di studio',
        url: 'https://github.com/fabiozagaria/transport-tickets/tree/study/backend-jpa-snapshot',
      },
    ],
  },
] as const satisfies readonly PortfolioProject[];
