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
      'API REST per la gestione persistente degli studenti, sviluppata con Java e Spring Boot.',
    highlights: [
      'Operazioni CRUD e risposte HTTP coerenti',
      'Architettura controller, service e repository',
      'Validazione, transazioni e gestione centralizzata degli errori',
    ],
    technologies: ['Java', 'Spring Boot', 'Spring JDBC', 'MySQL', 'REST API'],
    status: 'In corso',
  },
  {
    id: 'gestionale-spese',
    title: 'Gestionale Spese',
    icon: 'fas fa-wallet',
    description: 'Applicazione web per registrare e consultare entrate e uscite.',
    highlights: [
      'Form reattivi e validazione dei dati',
      'Filtri e riepilogo dei movimenti',
      'Interfaccia responsive orientata alla semplicità d’uso',
    ],
    technologies: ['Angular', 'TypeScript', 'Reactive Forms', 'Bootstrap'],
    status: 'In sviluppo',
    liveLink: 'https://gestionale-spese.vercel.app/',
    githubLink: 'https://github.com/fabiozagaria/gestionale-spese',
  },
  {
    id: 'avvoca',
    title: 'Avvocà — Studio legale',
    icon: 'fas fa-scale-balanced',
    description: 'Sito web realizzato per un professionista del settore legale.',
    highlights: [
      'Analisi delle esigenze di un cliente reale',
      'Navigazione chiara e design responsive',
      'Ottimizzazione della presenza online dello studio',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Completato',
    liveLink: 'https://www.avvoca.net/',
  },
  {
    id: 'lab-tv',
    title: 'LabTV',
    icon: 'fas fa-tv',
    description: 'Web app dedicata alla presentazione di contenuti video e intrattenimento.',
    highlights: [
      'Interfaccia organizzata per sezioni',
      'Componenti riutilizzabili in Angular',
      'Layout responsive per contenuti multimediali',
    ],
    technologies: ['Angular', 'TypeScript', 'Bootstrap'],
    status: 'In sviluppo',
    liveLink: 'https://lab-tv.vercel.app/',
    githubLink: 'https://github.com/fabiozagaria/LabTV',
  },
  {
    id: 'fakeflix',
    title: 'Fakeflix',
    icon: 'fas fa-film',
    description:
      'Riproduzione responsive di una piattaforma streaming, sviluppata senza framework.',
    highlights: [
      'Layout complessi con Flexbox e Grid',
      'Interazioni e gestione del DOM in JavaScript',
      'Organizzazione modulare degli stili',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Completato',
    githubLink: 'https://github.com/JavaMetalCoder/Fakeflix',
  },
  {
    id: 'labforweb',
    title: 'Percorso LabForWeb',
    icon: 'fas fa-code',
    description:
      'Esercizi e progetti del corso Full Stack Web di 650 ore, concluso il 7 agosto 2026.',
    highlights: [
      'Sviluppo frontend con Angular e TypeScript',
      'Backend Java con Spring Boot e MySQL',
      'Versionamento del codice con Git e GitHub',
    ],
    technologies: ['Angular', 'Java', 'Spring Boot', 'MySQL'],
    status: 'Completato',
    githubLink: 'https://github.com/JavaMetalCoder/LABFORWEB',
  },
] as const satisfies readonly PortfolioProject[];
