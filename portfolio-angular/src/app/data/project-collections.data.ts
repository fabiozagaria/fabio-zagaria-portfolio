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
    id: 'filo-di-casa',
    title: 'Filo di casa',
    description:
      'Sito vetrina per creazioni artigianali, con galleria filtrabile e schede di dettaglio.',
    technologies: ['React', 'Vite', 'CSS', 'Radix UI'],
    note: 'Bozza v0.1.0 con contenuti provvisori e immagini generate con AI.',
    liveLink: 'https://filo-di-casa.fabiozagaria.chatgpt.site/',
    repositories: [{ label: 'Repository', url: 'https://github.com/fabiozagaria/mamy-site' }],
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
] as const satisfies readonly PortfolioCollectionItem[];
