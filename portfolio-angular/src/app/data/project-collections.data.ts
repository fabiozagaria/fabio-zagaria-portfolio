import type { PortfolioFlow, PortfolioLatestUpdate, PortfolioRepository } from './projects.data';

export interface PortfolioCollectionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly note?: string;
  readonly latestUpdate?: PortfolioLatestUpdate;
  readonly flow?: PortfolioFlow;
  readonly liveLink?: string;
  readonly repositories: readonly PortfolioRepository[];
}

export const AI_PLUGINS = [
  {
    id: 'learning-ledger',
    title: 'learning-ledger',
    latestUpdate: {
      dateLabel: '4 novembre 2026',
      datetime: '2026-11-04',
      items: [
        {
          kind: 'Plugin',
          version: '0.2.0',
          hash: '1ebc09c',
          message: 'v0.2.0: report command, weekly-report skill, topic packs, CI and docs',
          dateLabel: '4 novembre 2026',
          note: 'Aggiunti il comando report, la skill weekly-report, i pacchetti di argomenti (Java/Spring, Python, SQL, system design, DevOps), la CI e la documentazione.',
          url: 'https://github.com/fabiozagaria/learning-ledger/commit/1ebc09c7ea6ee7f221f903e2a55263f534a7a795',
        },
      ],
    },
    description:
      'Plugin per Claude Code che tiene un registro locale delle prove di apprendimento. Claude conduce quiz ed esercizi; uno script Python senza dipendenze applica le regole sui livelli, così il giudizio del modello non può gonfiarli, e pianifica i ripassi nei giorni lavorativi.',
    flow: {
      title: 'Dalla sessione al registro',
      steps: [
        {
          label: 'Quiz o esercizio',
          detail: 'Claude conduce la sessione con le skill quiz e practice',
        },
        { label: 'log-session', detail: 'Raccoglie prove e livello di aiuto ricevuto' },
        { label: 'ledger.py', detail: 'Applica le regole: con aiuti non si arriva ad autonomous' },
        {
          label: 'Simulazione',
          detail: 'Mostra prima e dopo, motivi dei limiti, prossimo ripasso',
        },
        {
          label: 'Conferma',
          detail: 'Il registro viene scritto solo dopo la conferma dell’utente',
        },
        { label: 'File locali', detail: 'topics.json, sessions.jsonl e config.json' },
      ],
      note: 'Schema ricavato da README e skill del repository. Il registro resta in locale, senza account né rete.',
    },
    technologies: ['Python 3', 'Claude Code plugin', 'JSON', 'GitHub Actions'],
    note: 'Versione 0.2.0 con test automatici e CI su Python 3.11–3.13 definiti nel repository; la loro esecuzione non è stata verificata qui. Progetto di tooling per lo studio, non un progetto del corso.',
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/learning-ledger' }],
  },
  {
    id: 'spring-security-advisor',
    title: 'spring-security-advisor',
    latestUpdate: {
      dateLabel: '4 novembre 2026',
      datetime: '2026-11-04',
      items: [
        {
          kind: 'Plugin',
          version: '0.1.0',
          hash: 'f599534',
          message: 'spring-security-advisor 0.1.0: scanner, review and map skills',
          dateLabel: '4 novembre 2026',
          note: 'Prima versione: scanner con sei regole verificate sulla documentazione di Spring Security 7.0, skill review e map, fixture di prova e 19 test passati in locale.',
          url: 'https://github.com/fabiozagaria/spring-security-advisor/commit/f59953410e9cc027790dab02c337b55255298a87',
        },
      ],
    },
    description:
      'Plugin per Claude Code che rivede la configurazione di Spring Security. Uno scanner Python senza dipendenze trova errori noti, per esempio regole di accesso irraggiungibili, CSRF disattivato o annotazioni @PreAuthorize senza method security. Le skill leggono il codice segnalato, scartano i falsi positivi e spiegano ogni rischio con correzione e fonte ufficiale; la skill map descrive filtri, provider e regole realmente presenti.',
    flow: {
      title: 'Dal progetto al report',
      steps: [
        { label: 'Progetto Spring', detail: 'Sorgenti Java, pom.xml o build.gradle' },
        { label: 'scan.py', detail: 'Sei regole verificate sulla documentazione ufficiale' },
        {
          label: 'Verifica nel codice',
          detail: 'Claude legge il codice segnalato e scarta i falsi positivi',
        },
        { label: 'Report', detail: 'Rischio, correzione, fonte, tipo di problema e confidenza' },
        {
          label: 'advise e apply',
          detail: 'Guida alla scelta e modifiche con conferma',
          pending: true,
        },
      ],
      note: 'Schema ricavato da README e skill del repository. advise e apply sono pianificati, non realizzati.',
    },
    technologies: ['Python 3', 'Claude Code plugin', 'Spring Security', 'GitHub Actions'],
    note: 'Versione 0.1.0 iniziale: copre solo lo stack servlet, non è stata ancora provata su progetti reali e non dimostra che un progetto sia sicuro. CI su Python 3.11–3.13 definita nel repository, esecuzione non verificata qui. Realizzato con assistenza AI (Claude Code); scelte di progetto e rilascio decise dal proprietario.',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/spring-security-advisor' },
    ],
  },
] as const satisfies readonly PortfolioCollectionItem[];

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
    latestUpdate: {
      dateLabel: '10 ottobre 2026',
      datetime: '2026-10-10',
      summary:
        'Aggiunta la sezione Studio offline Java/Spring con 67 argomenti, 268 quiz e tentativi salvati con Room.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/study-flow-android/commit/823bc3331c1a3a86e70e4d546ca9b2e03fb5bd2a',
        },
      ],
    },
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
    latestUpdate: {
      dateLabel: '25 ottobre 2026',
      datetime: '2026-10-25',
      summary:
        'Integrato in main il backend Spring Boot/JPA con Flyway, sessioni e CSRF, Redis opzionale e transazioni con lock.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/transport-tickets/commit/e74e8c2eed01216534912c8a4b56a7216fc168d8',
        },
      ],
    },
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
