# Contesto tecnico — Portfolio

Aggiornato: 2026-10-13

## Obiettivo

Presentare in modo professionale e verificabile il profilo di Fabio Zagaria come Junior Backend Developer con visione full stack, mantenendo allineati portfolio, progetti, CV e stato tecnico reale.

## Stato osservato

- Portfolio Angular 21 / TypeScript 5.9.
- Deploy su Vercel.
- CI GitHub Actions con controlli di formato, test e build.
- Struttura con componenti standalone, routing lazy, dati tipizzati, attenzione a SEO, accessibilità e performance.
- Expense Tracker 0.3.0 è in consolidamento: Angular 21 con PrimeNG/Aura, Signals e Reactive Forms; backend Spring Boot con JWT, refresh HttpOnly e persistenza JPA/MySQL. La demo Vercel usa un proxy verso Render e un account condiviso con dati fittizi. La registrazione online è disabilitata in attesa del servizio email HTTPS; in locale è presente con Mailpit. Il README frontend riporta login demo, sessione, dashboard e CRUD spese verificati nel browser; registrazione locale e creazione entrate nel database condiviso restano verifiche separate. Le entrate espongono creazione e lettura, senza update/delete.
- LabTV 1.0.0 è una release frontend conclusa basata sulla TMDB API, con ricerca locale sul catalogo caricato e manutenzione mirata. Il login è dimostrativo; autenticazione reale e persistenza utente non fanno parte della release. Un'eventuale 2.x sarebbe una fase separata.
- Expense Tracker è in primo piano nella home; Spring Scaffold CLI, JobFlow e LabTV completano la selezione. Task Manager e Transport Tickets sono presentati nei laboratori compatti a fondo pagina progetti.
- JobFlow implementa dominio Job, stati, GeneratePdfWork, POST /jobs e GET /jobs/{id} con DTO, validazione e persistenza JPA/MySQL. Creazione/persistenza sono documentate come verificate manualmente; risposta 200, 404 e formato dell'errore del GET restano da verificare a runtime. JobWorker non esegue lavori; Processor PDF, Executor, lifecycle e risultato non sono operativi. GeneratedPDFResult è un modello persistente e non dimostra generazione PDF già funzionante.

- Spring Scaffold CLI: MVP Java 17/Picocli disponibile; nuove funzionalità sospese. Genera record DTO vuoti simple/request/response/both, valida il naming e controlla i file già esistenti. Non garantisce atomicità concorrente e non genera risorse Spring complete.
- Task Manager resta un laboratorio guidato: JWT, hash SHA-256 dei refresh token, rotazione e logout sono presenti. Il refresh viaggia nel JSON, senza cookie HttpOnly; la rotazione non è delimitata da una singola transazione di service. Concorrenza e CSRF delle operazioni mutative richiedono verifiche mirate; la suite include il test del contesto.
- Transport Tickets è un backend di studio nel branch study/backend-jpa-snapshot, sviluppato anche con strumenti AI: dominio separato dalle entità JPA, storico, transazioni, lock, Flyway, cache Redis opzionale con fallback, sessioni e CSRF. Sono presenti test dedicati; consolidare comprensione e verifiche è il traguardo corrente. Main conserva la demo HTTP Java in memoria; non è presente un frontend.

## Fonti del confronto

README e codice dei repository collegati sono stati confrontati il 13 ottobre 2026.
Gli esiti runtime citati provengono dalla documentazione dei singoli progetti;
non equivalgono a nuove esecuzioni delle loro suite durante l'aggiornamento del portfolio.

| Repository               | Revisione consultata                                                                                                                    | Evidenza principale                                                                                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expense Tracker frontend | [9789784](https://github.com/fabiozagaria/expense-tracker-angular/tree/9789784ea27badc5ee02ac31e00728c60a71ff75)                        | README, docs/DEPLOYMENT.md, package.json, vercel.json, configurazione Aura, form di registrazione e servizi auth/entrate/dashboard.                                                                                             |
| Expense Tracker backend  | [2ee4d7b](https://github.com/fabiozagaria/expense-tracker-api/tree/2ee4d7becdbe001670dcd0866b5c5b6cc0575195)                            | README, docs/DEPLOYMENT.md, DemoController e AuthController: account demo, blocco registrazione e cookie refresh. Le note iniziali del README sul deploy sono arretrate rispetto alle note di verifica pubblica del 12 ottobre. |
| Spring Scaffold CLI      | [b6e31a0](https://github.com/fabiozagaria/spring-scaffold-cli/tree/b6e31a095fb61833335de31247ccc4f8f2bdd5c0)                            | README, DtoGenerator e GenerateDtoCommand: record vuoti, naming, destinazioni e tipi.                                                                                                                                           |
| JobFlow                  | [34a161e](https://github.com/fabiozagaria/job-flow/tree/34a161ef6e5220dedf1a5d0a1481be3fa97d50bc)                                       | README, JobController, JobService e JobWorker: creazione/lettura presenti, worker ancora privo di esecuzione.                                                                                                                   |
| LabTV                    | [ced103c](https://github.com/fabiozagaria/labtv-angular/tree/ced103c01b7edf4cd4ae740e6b8a8a5608dddcff)                                  | README, package.json, MovieService e Ricerca: release 1.0.0, integrazione TMDB e filtro locale.                                                                                                                                 |
| Task Manager             | [fa79641](https://github.com/fabiozagaria/task-manager-api-jpa-security/tree/fa796415b3154c49b11a3ed18c0a3ec158e7699b)                  | README, AuthController, RefreshTokenService e SecurityConfig: refresh nel body, rotazione e CSRF.                                                                                                                               |
| Transport Tickets        | [9b09960](https://github.com/fabiozagaria/transport-tickets/tree/9b099602a44d3a1573b0bb2c40074f28c389e14e) · study/backend-jpa-snapshot | README, JpaTicketRepository, RedisTicketCache e SecurityConfiguration: transazioni, cache opzionale e sessioni/CSRF.                                                                                                            |

## Regole di mantenimento

- Aggiornare il portfolio solo quando una competenza o un progetto è realmente dimostrabile.
- Mantenere allineati README, contenuti del sito e CV.
- Il generatore del CV nel portfolio è la sorgente autorevole del curriculum.
- Non riportare qui voti, ripassi o cronologia didattica: restano in Notion.

## Curriculum pubblico

- `portfolio-angular/src/assets/documents/CV.pdf` è l'unico curriculum distribuito dal sito.
- Il layout è a colonna singola, testuale, leggibile e compatibile con i sistemi ATS.
- Il generatore `portfolio-angular/scripts/generate_cv.py` resta la sorgente autorevole; le copie da colloquio modificabili restano fuori dal repository pubblico.

## Punto di attenzione

Quando cambiano versione, stato o focus di un progetto pubblico collegato, verificare se il portfolio necessita di sincronizzazione.

## Tema UI — 2026-10-02

Pulsante sole/luna accessibile nell’intestazione, tema coerente con i colori esistenti e scelta ricordata nel browser.
