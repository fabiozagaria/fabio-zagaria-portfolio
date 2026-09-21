export type ProjectStatus = 'Concluso' | 'Laboratorio attivo';

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
  readonly liveLink?: string;
  readonly liveLabel?: string;
  readonly repositories?: readonly PortfolioRepository[];
}

export const PROJECTS = [
  {
    id: 'gestionale-spese',
    title: 'Expense Tracker',
    icon: 'fas fa-wallet',
    focus: 'Progetto full stack · concluso',
    description:
      'Applicazione full stack per registrare entrate e spese personali, con autenticazione e dashboard di riepilogo.',
    highlights: [
      'Frontend Angular con Signals, Reactive Forms e test di componenti e servizi',
      'CRUD REST, entrate e dashboard con DTO dedicati e persistenza JPA/MySQL',
      'Autenticazione JWT con verifica email, refresh token HttpOnly e dati isolati per utente',
    ],
    technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'REST API'],
    status: 'Concluso',
    statusDetail:
      'Scope funzionale concluso. Il backend include autenticazione, spese, entrate e riepilogo; le ultime modifiche Income/Dashboard richiedono ancora una verifica end-to-end completa con backend locale attivo.',
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
      'Refresh token casuale salvato come hash; flusso refresh e revoca ancora da completare',
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
      'È un esercizio guidato di apprendimento, non un prodotto ideato autonomamente. Lo uso per comprendere Spring Security, JPA e Hibernate; documentazione, test e ciclo refresh/revoca sono ancora incompleti.',
    repositories: [
      {
        label: 'Repository laboratorio',
        url: 'https://github.com/fabiozagaria/task-manager-api-jpa-security',
      },
    ],
  },
] as const satisfies readonly PortfolioProject[];
