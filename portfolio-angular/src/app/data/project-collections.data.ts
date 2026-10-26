import type { PortfolioRepository } from './projects.data';

export interface PortfolioCollectionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly note?: string;
  readonly liveLink?: string;
  readonly repositories: readonly PortfolioRepository[];
}

export const EXPERIMENTAL_PROJECTS = [
  {
    id: 'spring-scaffold-cli',
    title: 'Spring Scaffold CLI',
    description:
      'CLI Java per generare record DTO vuoti simple, request e response, con validazione del naming e controllo dei file già esistenti.',
    technologies: ['Java 17', 'Maven', 'Picocli', 'CLI', 'Code generation'],
    note: 'MVP disponibile con test del generatore. Nuove funzionalità sospese; la generazione di risorse Spring complete resta da implementare.',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/spring-scaffold-cli' },
    ],
  },
  {
    id: 'patchme',
    title: 'PatchMe',
    description:
      'Applicazione per trasformare persone e momenti in patch notes, con editor, anteprima ed esportazione delle immagini. I dati sono conservati nel browser.',
    technologies: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS'],
    note: 'Versione 1.0.0 stabile, realizzata con assistenza AI per progettazione, codice, revisione, contenuti e immagini.',
    liveLink: 'https://patchme-fabiozagariadev.vercel.app/',
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/patchme-game' }],
  },
  {
    id: 'studyflow-android',
    title: 'StudyFlow Android',
    description:
      'Applicazione Android per pianificare lo studio, gestire sessioni Pomodoro e organizzare il ripasso con dati locali.',
    technologies: ['Android', 'Java', 'Kotlin', 'XML', 'Jetpack Compose', 'Room/SQLite'],
    note: 'Esperimento mobile con persistenza locale e valutazione manuale del ripasso.',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/study-flow-android' },
    ],
  },
  {
    id: 'transport-tickets',
    title: 'Transport Tickets',
    description:
      'Backend per gestire trasporti, assegnazioni e storico. Spring Boot con autenticazione a sessione, ruoli e CSRF; persistenza JPA/MySQL e cache Redis opzionale.',
    technologies: [
      'Java 17',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'MySQL',
      'Flyway',
      'Redis (opzionale)',
      'Docker',
    ],
    note: 'Backend sperimentale in studio, sviluppato anche con strumenti AI. Il ramo Spring Boot/JPA è integrato in main, con migrazioni Flyway e transazioni con lock sui ticket.',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/transport-tickets' },
    ],
  },
] as const satisfies readonly PortfolioCollectionItem[];

export const EXERCISE_COLLECTIONS = [
  {
    id: 'esercizi-cpp',
    title: 'C++ — esercizi e memoria',
    description:
      'Teoria, esempi, esercizi e soluzioni su funzioni, riferimenti, contenitori e classi. Esempi dedicati a durata degli oggetti, RAII e smart pointer.',
    technologies: ['C++17', 'RAII', 'Smart pointer'],
    repositories: [
      { label: 'Esercizi C++', url: 'https://github.com/fabiozagaria/cpp-exercises' },
      { label: 'Memoria e RAII', url: 'https://github.com/fabiozagaria/cpp-memoria' },
    ],
  },
  {
    id: 'esercizi-java-streams',
    title: 'Java Collections e Stream API',
    description:
      'Esercizi del corso su collezioni, filtri, trasformazioni, ordinamento e ricerca con Stream API, lambda e Optional.',
    technologies: ['Java', 'Collections', 'Stream API'],
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/java-streams-exercises' },
    ],
  },
  {
    id: 'esercizi-labforweb',
    title: 'Archivio LabForWeb',
    description:
      'Raccolta storica degli esercizi del corso: HTML, CSS, JavaScript, TypeScript e Angular, con pratica su DOM, form, routing, service e Signals.',
    technologies: ['HTML/CSS', 'JavaScript', 'TypeScript', 'Angular'],
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/labforweb-coursework' },
    ],
  },
  {
    id: 'task-manager-security-lab',
    title: 'Task Manager Security Lab',
    description:
      'Laboratorio guidato su autenticazione e persistenza in una API CRUD di task, con accesso limitato ai dati del proprio utente.',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate', 'MySQL', 'JWT'],
    note: 'Laboratorio guidato: refresh token con hash, rotazione e logout implementati. Test comportamentali, documentazione e cookie HttpOnly/Secure restano da completare.',
    repositories: [
      {
        label: 'Repository laboratorio',
        url: 'https://github.com/fabiozagaria/task-manager-api-jpa-security',
      },
    ],
  },
  {
    id: 'student-management-api',
    title: 'Student Management API',
    description:
      'Esercizio REST per gestire studenti con JdbcTemplate, query SQL parametrizzate, validazione e persistenza MySQL.',
    technologies: ['Java 21', 'Spring Boot', 'JdbcTemplate', 'MySQL', 'Bean Validation'],
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/student-management-api' },
    ],
  },
  {
    id: 'book-catalog-api',
    title: 'Book Catalog API',
    description:
      'Esercizio REST con catalogo libri in memoria, ricerca per ID, inserimento e controllo degli ISBN duplicati.',
    technologies: ['Java 21', 'Spring Boot', 'Web MVC', 'Bean Validation'],
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/book-catalog-api' },
    ],
  },
  {
    id: 'game-backlog-api',
    title: 'Game Backlog API',
    description:
      'Esercizio MVC per gestire un backlog di videogiochi in memoria, con DTO, validazione, regole su stato e voto e aggiornamenti parziali.',
    technologies: ['Java 21', 'Spring Boot', 'Web MVC', 'Bean Validation'],
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/game-backlog-api' },
    ],
  },
] as const satisfies readonly PortfolioCollectionItem[];
