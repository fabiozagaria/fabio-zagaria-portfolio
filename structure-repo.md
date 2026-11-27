# Struttura dei repository del portfolio

Aggiornato: 26 novembre 2026.

Il repository `curriculum-vitae-fabio-zagaria` va aggiornato con ogni nuova versione del CV (vedi `docs/CV-DA-RIGENERARE.md`).

Mappa corrente dei repository e della loro collocazione nel portfolio. È un documento di riferimento da mantenere aggiornato insieme ai contenuti del sito.

Le categorie seguono le scelte del proprietario. La presenza di una tecnologia, da sola, non determina la categoria.

## Ordine delle sezioni

1. Full Stack
2. Backend
3. Progetti Frontend del Corso
4. Sperimentale con AI

I tre progetti principali restano, nell’ordine: **Expense Tracker**, **JobFlow**, **AccessDesk**.

## Full Stack

| Progetto        | Repository                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expense Tracker | [expense-tracker-angular](https://github.com/fabiozagaria/expense-tracker-angular) · [expense-tracker-api](https://github.com/fabiozagaria/expense-tracker-api) |

Expense Tracker ha una sola scheda, con collegamenti distinti a frontend e backend.

## Backend

| Progetto   | Repository                                                         |
| ---------- | ------------------------------------------------------------------ |
| JobFlow    | [job-flow](https://github.com/fabiozagaria/job-flow)               |
| MedTransit | [med-transit-msa](https://github.com/fabiozagaria/med-transit-msa) |
| AccessDesk | [accessdesk-api](https://github.com/fabiozagaria/accessdesk-api)   |

## Progetti Frontend del Corso

| Progetto  | Repository                                                                         |
| --------- | ---------------------------------------------------------------------------------- |
| LabTV     | [labtv-angular](https://github.com/fabiozagaria/labtv-angular)                     |
| Fakeflix  | [fakeflix-vanilla-js](https://github.com/fabiozagaria/fakeflix-vanilla-js)         |
| Portfolio | [fabio-zagaria-portfolio](https://github.com/fabiozagaria/fabio-zagaria-portfolio) |

Il portfolio è concluso dal 21 novembre 2026: la sua scheda dichiara lo stato «Concluso» e non ha storico dei commit.

## Intelligenza Umana (fuori dal portfolio)

| Progetto                 | Repository                                                                                          | Stato registrato                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Learning Ledger          | [iu-learning-ledger](https://github.com/Intelligenza-Umana/iu-learning-ledger)                             | Pubblico, MIT; test Python automatizzati                                         |
| Spring Security Advisor  | [iu-spring-security-advisor](https://github.com/Intelligenza-Umana/iu-spring-security-advisor)             | Pubblico, MIT; test Python automatizzati                                         |
| Project Lifecycle Skill  | [iu-project-lifecycle-skill](https://github.com/Intelligenza-Umana/iu-project-lifecycle-skill)             | Pubblico, MIT, v0.3.0. Test e funzionamento confermati da Fabio                           |
| Model Router          | [iu-model-router](https://github.com/Intelligenza-Umana/iu-model-router)                                   | Pubblico, MIT, v0.1.0; comportamento negli host da verificare                    |

La foundation è [pubblica e MIT](https://github.com/Intelligenza-Umana/intelligenza-umana). La foundation e le quattro repository di strumenti sono state trasferite nell’organizzazione GitHub [Intelligenza-Umana](https://github.com/Intelligenza-Umana), che ha un profilo pubblico e modelli condivisi per issue e pull request. La pagina del portfolio include anche il collegamento al [server Discord](https://discord.gg/fMRBCNgHb). Il [registro ufficiale](https://github.com/Intelligenza-Umana/intelligenza-umana/blob/main/docs/PROJECT_REGISTRY.md) e il profilo pubblico riportano ancora link con il vecchio owner `fabiozagaria`; GitHub li reindirizza, ma le fonti vanno riallineate. Il repository del sito è privato e non viene collegato.

## Sperimentale con AI

| Progetto            | Repository                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| Spring Scaffold CLI | [spring-scaffold-cli](https://github.com/fabiozagaria/spring-scaffold-cli) |
| PatchMe             | [patchme-game](https://github.com/fabiozagaria/patchme-game)               |
| StudyFlow Android   | [study-flow-android](https://github.com/fabiozagaria/study-flow-android)   |

La categoria descrive il ruolo sperimentale e il supporto dell’AI nello sviluppo o nello studio. Eventuali funzionalità AI interne alle applicazioni vanno dichiarate soltanto se verificate nel codice.

## Esercizi (fuori dal portfolio)

| Raccolta o esercizio          | Repository                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| C++ — esercizi e memoria      | [cpp-exercises](https://github.com/fabiozagaria/cpp-exercises) · [cpp-memoria](https://github.com/fabiozagaria/cpp-memoria) |
| Java Collections e Stream API | [java-streams-exercises](https://github.com/fabiozagaria/java-streams-exercises)                                            |
| Archivio LabForWeb            | [labforweb-coursework](https://github.com/fabiozagaria/labforweb-coursework)                                                |
| Task Manager Security Lab     | [task-manager-api-jpa-security](https://github.com/fabiozagaria/task-manager-api-jpa-security)                              |
| Student Management API        | [student-management-api](https://github.com/fabiozagaria/student-management-api)                                            |
| Book Catalog API              | [book-catalog-api](https://github.com/fabiozagaria/book-catalog-api)                                                        |
| Game Backlog API              | [game-backlog-api](https://github.com/fabiozagaria/game-backlog-api)                                                        |

I due repository C++ sono raccolti in una sola scheda, con collegamenti distinti.

## Repository esclusi dalle schede

- [mamy-site](https://github.com/fabiozagaria/mamy-site)
- [hiero-sdk-java](https://github.com/fabiozagaria/hiero-sdk-java)
- [curriculum-vitae-fabio-zagaria](https://github.com/fabiozagaria/curriculum-vitae-fabio-zagaria)
- [about-me](https://github.com/fabiozagaria/about-me)

La pagina Progetti mostra **11 repository dichiarati** in **10 schede**. I sette repository di esercizi, i quattro repository di Intelligenza Umana e i quattro repository esclusi non vengono mostrati nelle schede; gli altri repository pubblici restano raggiungibili dal collegamento al profilo GitHub.

## Aggiornamento della struttura

Quando cambia la collocazione o la visibilità di un repository:

1. Concordare con il proprietario la categoria e la visibilità dei nuovi repository o delle riclassificazioni.
2. Aggiornare questa mappa, la data e i conteggi.
3. Allineare i dati dei progetti in [projects.data.ts](./portfolio-angular/src/app/data/projects.data.ts) e quelli delle raccolte in [project-collections.data.ts](./portfolio-angular/src/app/data/project-collections.data.ts).
4. Se cambia l’ordine delle sezioni, aggiornare [projects.component.ts](./portfolio-angular/src/app/features/projects/projects.component.ts). Se cambiano i progetti principali, allineare anche [home.component.ts](./portfolio-angular/src/app/features/home/home.component.ts).
5. Verificare descrizioni, tecnologie, stato e link nei repository collegati; eseguire i controlli pertinenti alle modifiche del sito.

Le descrizioni tecniche e gli stati dei singoli progetti sono mantenuti nei dati del sito e verificati sul codice, sulla configurazione e sui README dei rispettivi repository.

L’elenco esplicito dei repository interrogati da GitHub Actions è `portfolio-angular/src/app/data/portfolio-repositories.json`. Ogni voce identifica un repository e il tipo di chip da mostrare. Il flusso esegue un GET dei commit per ciascuna voce e non scopre automaticamente altri repository del profilo. Un nuovo repository entra solo quando viene aggiunto a questo elenco e ai dati della scheda. Il portfolio, gli esercizi e i repository di Intelligenza Umana restano fuori.

La pagina Progetti include un indice collegato alle quattro sezioni e un pulsante fisso per tornare all’indice. Il comportamento è limitato alla route `/projects`; ogni progetto ha anche la sua pagina `/projects/<id>` (componente `project-detail`, rotte generate da `PROJECTS`); per gli altri repository c’è un link diretto all’elenco GitHub.


I testi inglesi delle schede, a parità di identificatori e percorsi, si trovano in `portfolio-angular/src/app/core/locales/en-data.ts`. Quando si aggiorna un testo presente nella UI, allineare anche il catalogo inglese.
