<p align="center">
  <img src="./portfolio-angular/src/assets/img/logo-nav.webp" width="96" height="96" alt="Logo FZ" />
</p>

<h1 align="center">Fabio Zagaria · Portfolio</h1>

<p align="center">
  <strong>Junior Backend Developer con visione full stack</strong><br />
  Java · Spring Boot · REST API · PostgreSQL · Angular · TypeScript
</p>

<p align="center">
  <a href="https://fabio-zagaria-portfolio.vercel.app/"><strong>Portfolio live</strong></a>
  ·
  <a href="./portfolio-angular/src/assets/documents/CV.pdf">Curriculum PDF</a>
  ·
  <a href="./portfolio-angular/src/assets/documents/Attestato_LabForWeb_Fabio_Zagaria.pdf">Attestato LabForWeb</a>
  ·
  <a href="./portfolio-angular/src/assets/documents/Attestato_PCAcademy_Fabio_Zagaria.pdf">Attestato P.C. Academy</a>
  ·
  <a href="https://www.linkedin.com/in/fabiozagaria">LinkedIn</a>
</p>

<p align="center">
  <a href="https://github.com/fabiozagaria/fabio-zagaria-portfolio/actions/workflows/ci.yml">
    <img src="https://github.com/fabiozagaria/fabio-zagaria-portfolio/actions/workflows/ci.yml/badge.svg" alt="Stato CI" />
  </a>
  <img src="https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white" alt="Angular 21" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white" alt="Deploy Vercel" />
</p>

Questo repository contiene il codice sorgente del mio portfolio professionale. È anche un esempio concreto del mio modo di organizzare un progetto Angular: componenti standalone, routing lazy, dati tipizzati, test automatici e attenzione ad accessibilità, SEO e performance.

## Profilo in 30 secondi

|                            |                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ruoli di interesse**     | Junior Backend Developer · Junior Full Stack Developer                                                                                            |
| **Focus backend**          | Java · Spring Boot · Spring Security · Spring Data JPA · REST API · PostgreSQL (MySQL dal percorso formativo)                                     |
| **PostgreSQL**             | Studio autodidatta, applicato con migrazioni Flyway in Expense Tracker, AccessDesk e JobFlow                                                      |
| **Altri studi autonomi**   | Utilizzo dell'AI nello sviluppo e architettura software; prossimo approfondimento: C++                                                            |
| **Competenze frontend**    | Angular · TypeScript · JavaScript · HTML · CSS                                                                                                    |
| **Formazione recente**     | Percorso Full Stack Web LabForWeb di 650 ore, concluso il 7 agosto 2026                                                                           |
| **Apprendimento continuo** | Metodo CARAC: richiamo attivo, esercizi autonomi e progetti reali                                                                                 |
| **Progetti principali**    | Expense Tracker come prodotto full stack; AccessDesk come prova autonoma su sicurezza e PostgreSQL; JobFlow come backend asincrono in costruzione |
| **Disponibilità**          | Roma · modalità ibrida · remoto in Italia                                                                                                         |

## Progetti in evidenza

| Progetto                                                                                                                                                                                             | Stato                                              | Cosa dimostra                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expense Tracker: [demo](https://gestionale-spese.vercel.app/) · [frontend](https://github.com/fabiozagaria/expense-tracker-angular) · [backend](https://github.com/fabiozagaria/expense-tracker-api) | Scope attuale concluso                             | Angular 21, PrimeNG/Aura, Spring Boot, JWT/refresh token, JPA/PostgreSQL, CRUD spese/entrate, dashboard, ricerca, filtri e paginazione                                                          |
| AccessDesk: [repository](https://github.com/fabiozagaria/accessdesk-api)                                                                                                                             | In sviluppo — prova autonoma                       | JWT, filtro personalizzato, Spring Security, autorizzazioni, JPA, MapStruct e PostgreSQL                                                                                                        |
| Spring Scaffold CLI: [repository](https://github.com/fabiozagaria/spring-scaffold-cli)                                                                                                               | MVP DTO presente — nuove funzionalità sospese      | CLI Java 17 con Picocli, record DTO vuoti, validazione del naming e controllo dei file esistenti.                                                                                               |
| JobFlow: [Swagger UI](https://jobflow-dbnm.onrender.com/swagger-ui.html) · [repository](https://github.com/fabiozagaria/job-flow)                                                                    | Backend in costruzione — v0.1 delimitata           | `POST /jobs` e `GET /jobs/{id}`, worker asincrono fino a PROCESSING, JPA/PostgreSQL con Flyway, Docker su Render; processor e successo/fallimento da completare.                                |
| MedTransit: [repository](https://github.com/fabiozagaria/med-transit-msa)                                                                                                                            | In progettazione — design approvato, nessun codice | Design di un sistema a microservizi con Kafka per le richieste di trasporto interno in ospedale: tre servizi, outbox, consumer idempotenti e dead-letter. L'implementazione parte dopo JobFlow. |
| LabTV `1.0.0`: [demo](https://lab-tv.vercel.app/) · [repository](https://github.com/fabiozagaria/labtv-angular)                                                                                      | Concluso                                           | Applicazione Angular frontend con integrazione TMDB API, HttpClient, RxJS, modelli tipizzati e routing parametrico                                                                              |

Lo scope funzionale attuale di Expense Tracker è concluso: CRUD completo di spese ed entrate, dashboard e grafici, ricerca, filtro mensile, ordinamento e liste paginate. Registrazione pubblica e verifica email tramite API Brevo HTTPS sono operative. Il frontend è su Vercel, il backend su Render e PostgreSQL su Neon. Gli ultimi ampliamenti sono integrati su `master`; collaudo del deploy e regressioni restano distinti dal completamento funzionale.

AccessDesk è il secondo progetto in evidenza: una prova autonoma backend ancora in sviluppo con login JWT, filtro personalizzato `OncePerRequestFilter`, ruoli/permessi e `@PreAuthorize`. Gli errori del filtro vengono delegati a `HandlerExceptionResolver`. Usa JPA/Hibernate, MapStruct, paginazione e PostgreSQL predefinito; test e chiusura della consegna restano aperti.

Student Management API, Fakeflix e gli esercizi formativi restano consultabili dal
[profilo GitHub](https://github.com/fabiozagaria?tab=repositories), ma non sono presentati
come progetti principali. Task Manager con JPA e Spring Security resta un laboratorio: rinnovo,
rotazione e revoca esplicita/logout dei refresh token sono implementati; cookie HttpOnly/Secure,
test comportamentali e documentazione restano da completare prima di un'eventuale promozione.

## Ruolo dei repository

La classificazione corrente, i repository esclusi e le indicazioni per mantenerla aggiornata sono raccolti in [structure-repo.md](./structure-repo.md).

Expense Tracker consolida il prodotto full stack; JobFlow introduce l'elaborazione asincrona; MedTransit, in fase di progettazione, estenderà il percorso ai microservizi con Kafka. I CRUD didattici e i laboratori Security restano consultabili senza essere tutti promossi a prodotti paralleli.

Questa descrizione documenta i repository collegati. Le schede del sito sono contenuti separati e possono richiedere un aggiornamento dedicato; una modifica al README non aggiorna automaticamente UI o PDF del CV.

## Come lavoro

Parto da vertical slice piccoli e verificabili, separo le responsabilità e uso test,
debugging e revisione del codice per consolidare le scelte. Le schede dei progetti
mostrano problema, soluzione, compromesso e stato reale; gli obiettivi futuri restano
distinti dalle funzionalità implementate. Il laboratorio guidato ha uno spazio
secondario rispetto ai progetti.

Uso agenti AI come **Claude Code e Codex**, con skill, plugin e integrazioni MCP, per
**generare e verificare codice** quando lavoro su concetti già acquisiti.
Quando apprendo un nuovo concetto, un’architettura o una specifica, non delego agli
agenti la generazione e la verifica del codice: le svolgo in prima persona per
costruire comprensione e autonomia.

## Cosa dimostra questa repository

| Area                     | Implementazione                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Architettura Angular** | Componenti standalone, route caricate in modo lazy e dati dei progetti centralizzati e tipizzati                                          |
| **Qualità del codice**   | TypeScript strict, `ChangeDetectionStrategy.OnPush`, Prettier e test Vitest                                                               |
| **Accessibilità**        | HTML semantico, gerarchia dei titoli, focus visibile, skip link e menu mobile accessibile da tastiera                                     |
| **Performance**          | Immagini WebP, copia selettiva degli asset e bundle iniziale stimato in circa 83 kB trasferiti (JS/CSS iniziali; font e immagini esclusi) |
| **SEO**                  | Metadati e canonical specifici per route, Open Graph e dati strutturati Schema.org                                                        |
| **Delivery**             | CI su GitHub Actions e deploy automatico su Vercel                                                                                        |

## Scelte tecniche principali

- Le pagine sono caricate solo quando vengono visitate, riducendo il JavaScript iniziale.
- I dati dei progetti sono separati dai componenti e verificati tramite tipi TypeScript.
- I componenti statici usano `OnPush` per evitare controlli non necessari.
- Il CV pubblico usa un unico PDF a colonna singola, leggibile e compatibile con i sistemi ATS; gli
  asset sorgente non necessari vengono esclusi dalla build.
- La navigazione mantiene titoli di pagina specifici e ripristina la posizione di scroll tra le route.

## Stack

| Categoria      | Tecnologie                              |
| -------------- | --------------------------------------- |
| Frontend       | Angular 21, TypeScript 5.9, HTML5, CSS3 |
| Test e qualità | Vitest, Angular TestBed, Prettier       |
| Tooling        | Angular CLI, npm, Git, GitHub Actions   |
| Hosting        | Vercel                                  |

## Struttura essenziale

- `portfolio-angular/src/app/core`: shell applicativa, navigazione e routing.
- `portfolio-angular/src/app/data`: modelli e contenuti tipizzati dei progetti.
- `portfolio-angular/src/app/features`: pagine standalone del portfolio.
- `portfolio-angular/src/assets`: documenti, immagini ottimizzate (compresa l'infografica del flusso API di Expense Tracker) e il video di Expense Tracker (`video/`).
- `portfolio-angular/scripts/cv-career-ops.json`: contenuti del curriculum pubblicato, impaginato con Career Ops.
- `.github/workflows/ci.yml`: controlli automatici di qualità, test e build.

## Avvio locale

Requisiti: Node.js `20.19+`, `22.12+` oppure `24+` e npm.

```bash
git clone https://github.com/fabiozagaria/fabio-zagaria-portfolio.git
cd fabio-zagaria-portfolio/portfolio-angular
npm ci
npm start
```

L'applicazione sarà disponibile su `http://localhost:4200`.

## Verifiche

```bash
npm run format:check
npm run test:ci
npm run build
```

La stessa sequenza viene eseguita automaticamente sulle pull request e sui push verso `master`.

## Contatti

- Email: [zagariafabio1999@gmail.com](mailto:zagariafabio1999@gmail.com)
- LinkedIn: [linkedin.com/in/fabiozagaria](https://www.linkedin.com/in/fabiozagaria)
- GitHub: [github.com/fabiozagaria](https://github.com/fabiozagaria)

## Tema della pagina

Il pulsante sole/luna nella navigazione alterna tema chiaro e scuro. Al primo accesso segue il dispositivo; la scelta manuale viene ricordata nel browser.

Lo stile è il «Cielo dipinto»: palette Calm acqua e salvia, font Nunito e un cielo vero dietro l'hero e i titoli. Col tema scuro è una notte stellata, con galassie, un pianeta con gli anelli e costellazioni che si accendono sotto il puntatore o il dito; col tema chiaro c'è il sole tra le nuvole. Cambiando tema i due cieli si sfumano uno nell'altro. Il cielo ha il pulsante «Ferma il cielo» e, con la riduzione del movimento attiva nel sistema, resta fermo.

## Versione del CV

La pagina Home e la pagina Contatti mostrano «CV aggiornato il …». La data è quella dell'ultima **modifica dei contenuti** del CV, non quella di un rebuild del sito. Dati in un solo file, `portfolio-angular/src/app/data/cv.data.ts` (data e SHA-256 del PDF); l'indirizzo con `?v=` è derivato dall'impronta, quindi il browser non serve mai un PDF vecchio.

Dopo aver rigenerato il PDF con Career Ops: copiarlo in `portfolio-angular/src/assets/documents/CV.pdf`, eseguire `npm run cv:meta -- AAAA-MM-GG` (data in cui sono cambiati i contenuti) e copiare lo stesso PDF nel repository [curriculum-vitae-fabio-zagaria](https://github.com/fabiozagaria/curriculum-vitae-fabio-zagaria), che conserva l'archivio datato. `npm run test:ci` fallisce se il PDF cambia senza aggiornare data e impronta (`npm run cv:check`).

## Progetti nel CV — 21 novembre 2026

Il CV elenca Expense Tracker, JobFlow, AccessDesk e MedTransit (quest'ultimo dichiarato «In progettazione, nessun codice»), solo progetti full stack e backend, e cita PostgreSQL con Flyway, Testcontainers e GitHub Actions. Il PDF del 21 novembre 2026 è generato con Career Ops in un ambiente cloud (procedura in [docs/CV-DA-RIGENERARE.md](./docs/CV-DA-RIGENERARE.md)).

## Stato del portfolio

Il portfolio è **concluso dal 21 novembre 2026**: stile, sezioni e animazioni sono definitivi, per scelta del proprietario. Si modifica soltanto per cambiamenti importanti, come un nuovo progetto o un dato che cambia. La sua scheda nella pagina Progetti riporta lo stato «Concluso» e, a differenza dei progetti principali, non ha storico dei commit. Dal 25 novembre 2026 il menu ha anche la voce «Intelligenza Umana», una pagina dedicata al laboratorio tecnologico indipendente Intelligenza Umana, orientato a software, ricerca applicata e collaborazione, con un collegamento al suo sito (https://intelligenza-umana-web.vercel.app/). Il rilascio pubblico del portale aggiornato è da verificare.

## Curriculum aggiornato — 29 ottobre 2026

CV a pagina singola allineato a Expense Tracker, AccessDesk e studio autodidatta di PostgreSQL. La versione pubblicata è generata con il template nativo Career Ops dal payload `portfolio-angular/scripts/cv-career-ops.json`. Il flusso di installazione, generazione e verifica è documentato in `AGENTS.md`. La copia nel repository curriculum richiede una sincronizzazione separata.

Navigazione: Home, Profilo professionale, Percorso professionale, Progetti software, Intelligenza Umana e Contatti. Gli URL esistenti restano invariati.
