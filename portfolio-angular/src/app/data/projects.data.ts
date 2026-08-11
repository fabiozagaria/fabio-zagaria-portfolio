export type ProjectStatus = 'Completato' | 'In corso' | 'In sviluppo';

export interface PortfolioProject {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly status: ProjectStatus;
  readonly liveLink?: string;
  readonly githubLink?: string;
}

export const PROJECTS = [
  {
    id: 'backend-studenti',
    title: 'Backend Studenti',
    icon: 'fas fa-server',
    description:
      'API REST completa per la gestione persistente degli studenti, sviluppata con Java e Spring Boot.',
    highlights: [
      'CRUD completo e risposte HTTP coerenti',
      'Architettura a layer con controller, service e repository',
      'Validazione, transazioni e gestione centralizzata degli errori',
    ],
    technologies: ['Java', 'Spring Boot', 'Spring JDBC', 'MySQL', 'REST API'],
    status: 'Completato',
    githubLink: 'https://github.com/fabiozagaria/student-management-api',
  },
  {
    id: 'gestionale-spese',
    title: 'Gestionale Spese',
    icon: 'fas fa-wallet',
    description:
      'Applicazione full stack in evoluzione per registrare e gestire entrate e uscite personali.',
    highlights: [
      'Stato reattivo con Angular Signals',
      'Form reattivi, validazione e client HTTP dedicato',
      'Integrazione CRUD con backend Spring Boot',
    ],
    technologies: ['Angular', 'TypeScript', 'Signals', 'Reactive Forms', 'REST API'],
    status: 'In sviluppo',
    liveLink: 'https://gestionale-spese.vercel.app/',
    githubLink: 'https://github.com/fabiozagaria/expense-tracker-angular',
  },
  {
    id: 'lab-tv',
    title: 'LabTV',
    icon: 'fas fa-tv',
    description:
      'Catalogo cinematografico Angular che integra TMDB per ricerca, dettagli, cast e titoli simili.',
    highlights: [
      'Integrazione di una REST API esterna con HttpClient e RxJS',
      'Routing dinamico e modelli TypeScript tipizzati',
      'Gestione degli stati di caricamento ed errore',
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'TMDB API'],
    status: 'Completato',
    liveLink: 'https://lab-tv.vercel.app/',
    githubLink: 'https://github.com/fabiozagaria/labtv-angular',
  },
  {
    id: 'fakeflix',
    title: 'Fakeflix',
    icon: 'fas fa-film',
    description:
      'Landing page responsive ispirata a una piattaforma streaming, sviluppata senza framework.',
    highlights: [
      'Rendering dinamico e gestione centralizzata dello stato',
      'Modale riutilizzabile, caroselli e selezione degli episodi',
      'Validazione dei form e interazioni con il DOM',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Completato',
    liveLink: 'https://fakeflix-lemon-six.vercel.app/',
    githubLink: 'https://github.com/fabiozagaria/fakeflix-vanilla-js',
  },
] as const satisfies readonly PortfolioProject[];
