# Struttura dei repository del portfolio

Aggiornato: 25 ottobre 2026.

Mappa corrente dei repository e della loro collocazione nel portfolio. È un documento di riferimento da mantenere aggiornato insieme ai contenuti del sito.

Le categorie seguono le scelte del proprietario. La presenza di una tecnologia, da sola, non determina la categoria.

## Ordine delle sezioni

1. Full Stack
2. Backend
3. Progetti Frontend del Corso
4. Sperimentale con AI
5. Esercizi

I tre progetti principali restano, nell’ordine: **Expense Tracker**, **JobFlow**, **Access Desk**.

## Full Stack

| Progetto        | Repository                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expense Tracker | [expense-tracker-angular](https://github.com/fabiozagaria/expense-tracker-angular) · [expense-tracker-api](https://github.com/fabiozagaria/expense-tracker-api) |

Expense Tracker ha una sola scheda, con collegamenti distinti a frontend e backend.

## Backend

| Progetto    | Repository                                                       |
| ----------- | ---------------------------------------------------------------- |
| JobFlow     | [job-flow](https://github.com/fabiozagaria/job-flow)             |
| Access Desk | [accessdesk-api](https://github.com/fabiozagaria/accessdesk-api) |

## Progetti Frontend del Corso

| Progetto  | Repository                                                                         |
| --------- | ---------------------------------------------------------------------------------- |
| LabTV     | [labtv-angular](https://github.com/fabiozagaria/labtv-angular)                     |
| Fakeflix  | [fakeflix-vanilla-js](https://github.com/fabiozagaria/fakeflix-vanilla-js)         |
| Portfolio | [fabio-zagaria-portfolio](https://github.com/fabiozagaria/fabio-zagaria-portfolio) |

## Sperimentale con AI

| Progetto            | Repository                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| Spring Scaffold CLI | [spring-scaffold-cli](https://github.com/fabiozagaria/spring-scaffold-cli) |
| PatchMe             | [patchme-game](https://github.com/fabiozagaria/patchme-game)               |
| StudyFlow Android   | [study-flow-android](https://github.com/fabiozagaria/study-flow-android)   |
| Transport Tickets   | [transport-tickets](https://github.com/fabiozagaria/transport-tickets)     |

La categoria descrive il ruolo sperimentale e il supporto dell’AI nello sviluppo o nello studio. Eventuali funzionalità AI interne alle applicazioni vanno dichiarate soltanto se verificate nel codice.

## Esercizi

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

La mappa comprende **23 repository**: **19 visibili**, raccolti in **17 schede**, e **4 esclusi**.

## Aggiornamento della struttura

Quando cambia la collocazione o la visibilità di un repository:

1. Concordare con il proprietario la categoria e la visibilità dei nuovi repository o delle riclassificazioni.
2. Aggiornare questa mappa, la data e i conteggi.
3. Allineare i dati dei progetti in [projects.data.ts](./portfolio-angular/src/app/data/projects.data.ts) e quelli delle raccolte in [project-collections.data.ts](./portfolio-angular/src/app/data/project-collections.data.ts).
4. Se cambia l’ordine delle sezioni, aggiornare [projects.component.ts](./portfolio-angular/src/app/features/projects/projects.component.ts). Se cambiano i progetti principali, allineare anche [home.component.ts](./portfolio-angular/src/app/features/home/home.component.ts).
5. Verificare descrizioni, tecnologie, stato e link nei repository collegati; eseguire i controlli pertinenti alle modifiche del sito.

Le descrizioni tecniche e gli stati dei singoli progetti sono mantenuti nei dati del sito e verificati sul codice, sulla configurazione e sui README dei rispettivi repository.
