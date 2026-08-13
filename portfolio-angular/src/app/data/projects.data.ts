export type ProjectStatus = 'MVP completato' | 'In sviluppo';

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
    id: 'student-management-api',
    title: 'Student Management API',
    icon: 'fas fa-server',
    focus: 'Progetto backend principale',
    description:
      "MVP di un'API REST per la gestione persistente degli studenti, sviluppata con Java e Spring Boot.",
    highlights: [
      'CRUD completo e risposte HTTP coerenti',
      'Architettura a layer con controller, service e repository',
      'Validazione, transazioni e gestione centralizzata degli errori',
    ],
    technologies: ['Java', 'Spring Boot', 'Spring JDBC', 'MySQL', 'REST API'],
    status: 'MVP completato',
    statusDetail:
      'Le funzionalità CRUD core sono concluse. Test automatici, OpenAPI e Security sono evoluzioni pianificate.',
    repositories: [
      {
        label: 'Repository API',
        url: 'https://github.com/fabiozagaria/student-management-api',
      },
    ],
  },
  {
    id: 'gestionale-spese',
    title: 'Gestionale Spese',
    icon: 'fas fa-wallet',
    focus: 'Prodotto full stack',
    description:
      'Applicazione full stack in evoluzione per registrare e gestire entrate e uscite personali.',
    highlights: [
      'Stato reattivo con Angular Signals',
      'Form reattivi, validazione e client HTTP dedicato',
      'Integrazione CRUD con backend Spring Boot',
    ],
    technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'REST API'],
    status: 'In sviluppo',
    statusDetail:
      'La demo frontend è navigabile con dati dimostrativi; persistenza completa e autenticazione sono in evoluzione.',
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
] as const satisfies readonly PortfolioProject[];
