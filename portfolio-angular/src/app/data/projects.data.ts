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
    focus: 'Progetto full stack · integrazione in verifica',
    description:
      'Applicazione full stack per registrare entrate e spese personali, con autenticazione e dashboard di riepilogo.',
    highlights: [
      'Frontend Angular con Signals, Reactive Forms e test di componenti e servizi',
      'CRUD REST, entrate e dashboard con DTO dedicati e persistenza JPA/MySQL',
      'Autenticazione JWT con verifica email, refresh token HttpOnly e dati isolati per utente',
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
    status: 'In sviluppo',
    statusDetail:
      'Autenticazione e spese personali sono implementate; entrate e dashboard sono presenti nel codice, ma la verifica end-to-end completa resta aperta. La demo pubblica è frontend: le operazioni persistenti richiedono il backend locale.',
    decision: {
      problem: 'Garantire che ogni utente possa consultare e modificare soltanto le proprie spese.',
      solution:
        'API protette da JWT e controllo del proprietario sul backend, con refresh token in cookie HttpOnly.',
      tradeoff:
        'La sessione richiede configurazione coerente di cookie, CORS e URL; la demo frontend non sostituisce il backend locale.',
    },
    liveLink: 'https://gestionale-spese.vercel.app/',
    liveLabel: 'Demo frontend',
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
      'MVP disponibile con test del generator: genera DTO simple, request, response o entrambi. Campi configurabili e generazione di una risorsa Spring completa sono i prossimi sviluppi.',
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
      'Creazione e persistenza verificate manualmente con Postman e MySQL. Lettura del job, worker e generazione PDF sono i prossimi passi; esecuzione asincrona, realtime, retry, messaging e AI restano obiettivi futuri.',
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
