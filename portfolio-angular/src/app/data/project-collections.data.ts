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
  readonly liveLink?: string;
  readonly repositories: readonly PortfolioRepository[];
}

export const EXPERIMENTAL_PROJECTS = [
  {
    id: 'spring-scaffold-cli',
    title: 'Spring Scaffold CLI',
    description:
      '{b}CLI Java{/b} per generare record DTO vuoti simple, request e response, con validazione del naming e controllo dei file già esistenti.',
    technologies: ['Java 17', 'Maven', 'Picocli', 'CLI', 'Code generation'],
    note: '{b}MVP disponibile{/b} con test del generatore. {i}Nuove funzionalità sospese;{/i} la generazione di risorse Spring complete resta da implementare.',
    repositories: [
      { label: 'Repository', url: 'https://github.com/fabiozagaria/spring-scaffold-cli' },
    ],
  },
  {
    id: 'patchme',
    title: 'PatchMe',
    description:
      '{b}Applicazione{/b} per trasformare persone e momenti in {b}patch notes{/b}, con editor, anteprima ed esportazione delle immagini. I dati sono conservati nel browser.',
    technologies: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS'],
    note: '{b}Versione 1.0.0 stabile{/b}, realizzata con assistenza AI per progettazione, codice, revisione, contenuti e immagini.',
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
