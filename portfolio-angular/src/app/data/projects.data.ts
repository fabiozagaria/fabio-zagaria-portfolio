export type ProjectStatus = 'In sviluppo' | 'Demo funzionante';

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
    title: 'Gestionale Spese',
    icon: 'fas fa-wallet',
    focus: 'Progetto principale · full stack',
    description:
      'Applicazione full stack in evoluzione per registrare e gestire entrate e uscite personali.',
    highlights: [
      'Frontend Angular con Signals, Reactive Forms e test di componenti e servizi',
      'CRUD REST con DTO dedicati e persistenza JPA/MySQL',
      'Contratto HTTP separato tra interfaccia, stato applicativo e backend',
    ],
    technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'REST API'],
    status: 'In sviluppo',
    statusDetail:
      "La demo pubblica mostra l'interfaccia. Il backend espone il CRUD delle spese nel repository; deployment dell'API, integrazione completa e autenticazione sono ancora in evoluzione.",
    liveLink: 'https://gestionale-spese.vercel.app/',
    liveLabel: 'Demo UI',
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
    status: 'Demo funzionante',
    statusDetail:
      'La demo e il flusso catalogo-dettaglio sono funzionanti. Lo sviluppo è temporaneamente sospeso e non include autenticazione o persistenza utente.',
    liveLink: 'https://lab-tv.vercel.app/',
    liveLabel: 'Demo online',
    repositories: [
      {
        label: 'Repository',
        url: 'https://github.com/fabiozagaria/labtv-angular',
      },
    ],
  },
] as const satisfies readonly PortfolioProject[];
