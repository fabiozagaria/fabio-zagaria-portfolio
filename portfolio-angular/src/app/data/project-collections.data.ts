import type {
  PortfolioLatestUpdate,
  PortfolioRepository,
  PortfolioVersionTag,
} from './projects.data';

export interface PortfolioCollectionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly note?: string;
  readonly versionTags?: readonly PortfolioVersionTag[];
  readonly latestUpdate?: PortfolioLatestUpdate;
  readonly skills?: readonly { name: string; purpose: string }[];
  readonly liveLink?: string;
  readonly repositories: readonly PortfolioRepository[];
}

export const AI_PLUGINS = [
  {
    id: 'learning-ledger',
    title: 'learning-ledger',
    versionTags: [
      {
        label: 'Versione',
        tag: '1.0.0',
        kind: 'Plugin',
        url: 'https://github.com/fabiozagaria/learning-ledger/blob/main/plugins/learning-ledger/.claude-plugin/plugin.json',
      },
    ],
    latestUpdate: {
      dateLabel: '17 novembre 2026',
      datetime: '2026-11-17',
      items: [
        {
          kind: 'Plugin',
          version: '1.0.0',
          hash: '0c733aa',
          message: 'Add documentation-sync rule and CLAUDE.md (#2)',
          dateLabel: '17 novembre 2026',
          note: 'Il manifest passa da 0.2.2 a 1.0.0: nuove skill explain e pair, pacchetto di argomenti per Spring Security (78 argomenti in totale) e, dal README, formati del registro stabili secondo il versionamento semantico. L’ultimo tag Git resta v0.2.2: per la 1.0.0 non c’è un tag. Il 17 novembre l’ultimo commit aggiunge ad AGENTS.md la regola di allineamento della documentazione e CLAUDE.md, senza modifiche al codice.',
          url: 'https://github.com/fabiozagaria/learning-ledger/commit/0c733aa9b0629aed7456b7973d6513400a4ed593',
        },
      ],
    },
    description:
      'Plugin per Claude Code che tiene un registro locale delle prove di apprendimento. Uno script Python senza dipendenze applica le regole sui livelli, così il giudizio del modello non può gonfiarli, e pianifica i ripassi nei giorni lavorativi.',
    skills: [
      { name: 'study-today', purpose: 'Suggerisce cosa studiare oggi in base al registro.' },
      { name: 'quiz', purpose: 'Pone una domanda alla volta e valuta la risposta in trentesimi.' },
      { name: 'practice', purpose: 'Propone un esercizio e rivede il codice scritto.' },
      {
        name: 'explain',
        purpose: 'Spiega le scelte nel codice e chiede di raccontarle a propria volta.',
      },
      { name: 'pair', purpose: 'Affianca chi scrive il codice con domande e revisioni.' },
      {
        name: 'log-session',
        purpose: 'Mostra come cambiano livello e ripasso. Salva dopo la conferma.',
      },
      {
        name: 'weekly-report',
        purpose: 'Riassume sessioni, progressi e ripassi degli ultimi sette giorni.',
      },
    ],
    technologies: ['Python 3', 'Claude Code plugin', 'JSON', 'GitHub Actions'],
    note: 'Test automatici e CI su Python 3.11–3.13 definiti nel repository; la loro esecuzione non è stata verificata qui. Progetto di tooling per lo studio, non un progetto del corso.',
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/learning-ledger' }],
  },
  {
    id: 'spring-security-advisor',
    title: 'spring-security-advisor',
    versionTags: [
      {
        label: 'Versione',
        tag: '1.0.0',
        kind: 'Plugin',
        url: 'https://github.com/fabiozagaria/spring-security-advisor/blob/main/plugins/spring-security-advisor/.claude-plugin/plugin.json',
      },
    ],
    latestUpdate: {
      dateLabel: '17 novembre 2026',
      datetime: '2026-11-17',
      items: [
        {
          kind: 'Plugin',
          version: '1.0.0',
          hash: 'ea7ed69',
          message: 'Add documentation-sync rule and CLAUDE.md (#2)',
          dateLabel: '17 novembre 2026',
          note: 'Il manifest passa da 0.2.0 a 1.0.0: nuova skill audit con checklist di 31 voci e punteggio da 0 a 100 calcolato da script, 23 regole dello scanner (erano 7) e segnali sui meccanismi presenti nel codice. L’ultimo tag Git resta v0.2.0: per la 1.0.0 non c’è un tag. Il 17 novembre l’ultimo commit aggiunge ad AGENTS.md la regola di allineamento della documentazione e CLAUDE.md, senza modifiche al codice.',
          url: 'https://github.com/fabiozagaria/spring-security-advisor/commit/ea7ed695c42e1c3b8befc9172653cdffe2afd720',
        },
      ],
    },
    description:
      'Plugin per Claude Code che esegue un audit di sicurezza su un progetto Spring Boot e dà un punteggio da 0 a 100 da seguire nel tempo. Uno scanner Python senza dipendenze applica 23 regole su errori noti, per esempio regole di accesso irraggiungibili, CSRF disattivato o chiavi JWT troppo corte. Il modello legge il codice segnalato e risponde a una checklist di 31 voci con evidenze file:line; uno script le convalida e calcola il punteggio, così il modello non può alzarlo con le parole.',
    skills: [
      {
        name: 'audit',
        purpose: 'Combina scanner e checklist e calcola il punteggio dalle evidenze nel codice.',
      },
      {
        name: 'review',
        purpose: 'Esegue le regole dello scanner e verifica le segnalazioni nel codice.',
      },
      {
        name: 'map',
        purpose: 'Ricostruisce filtri, provider e regole attraversati da una richiesta.',
      },
    ],
    technologies: ['Python 3', 'Claude Code plugin', 'Spring Security', 'GitHub Actions'],
    note: 'Copre solo lo stack servlet, non è stata ancora provata su progetti reali e non dimostra che un progetto sia sicuro. Il punteggio misura solo ciò che è stato controllato: con meno del 70% della checklist valutata è provvisorio. CI su Python 3.11–3.13 definita nel repository, esecuzione non verificata qui. Le skill advise e apply sono pianificate. Realizzato con assistenza AI (Claude Code); scelte di progetto e rilascio decise dal proprietario.',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/spring-security-advisor' },
    ],
  },
  {
    id: 'project-lifecycle-skill',
    title: 'project-lifecycle-skill',
    latestUpdate: {
      dateLabel: '25 novembre 2026',
      datetime: '2026-11-25',
      items: [
        {
          kind: 'Plugin',
          version: 'v0.2.0',
          hash: '0c3aca8',
          message: 'Add mandatory context integrity protocol v0.2.0',
          dateLabel: '25 novembre 2026',
          note: 'Aggiunge il protocollo di integrità del contesto, la mappa documentale e la Definition of Done, con i relativi riferimenti, template e criteri di verifica. Non ci sono tag Git né un manifest di plugin: la versione v0.2.0 è quella dichiarata in README e CHANGELOG.',
          url: 'https://github.com/fabiozagaria/project-lifecycle-skill/commit/0c3aca86fc50c821b173f9b455ac696642bf93ad',
        },
      ],
    },
    description:
      'Skill per assistenti AI che governa la documentazione e la continuità di lavoro di un progetto: inizializza o riprende un repository, ne verifica lo stato, controlla le istruzioni per gli agenti, registra le decisioni e lascia un passaggio di consegne a fine sessione, senza sovrascrivere il lavoro esistente. Il metodo sta nella skill, il contesto nel repository di destinazione.',
    skills: [
      {
        name: 'project-lifecycle',
        purpose:
          'Operazioni di bootstrap, resume, handoff, audit, sync, migrate, status, plan e decision.',
      },
    ],
    technologies: ['Markdown', 'Skill per Claude Code', 'Codex'],
    note: 'Prototipo documentale, solo istruzioni Markdown senza CLI né dipendenze. Installazione nativa e test di integrazione non ancora verificati; la licenza è da decidere.',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/project-lifecycle-skill' },
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
