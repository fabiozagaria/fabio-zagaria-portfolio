<p align="center">
  <img src="./portfolio-angular/src/assets/img/logo-nav.webp" width="96" height="96" alt="Logo FZ" />
</p>

<h1 align="center">Fabio Zagaria · Portfolio</h1>

<p align="center">
  <strong>Junior Backend Developer con visione full stack</strong><br />
  Java · Spring Boot · REST API · MySQL · Angular · TypeScript
</p>

<p align="center">
  <a href="https://fabio-zagaria-portfolio.vercel.app/"><strong>Portfolio live</strong></a>
  ·
  <a href="./portfolio-angular/src/assets/documents/CV.pdf">Curriculum PDF</a>
  ·
  <a href="./portfolio-angular/src/assets/documents/Attestato_LabForWeb_Fabio_Zagaria.pdf">Attestato LabForWeb</a>
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
| **Focus backend**          | Java · Spring Boot · Spring Security · Spring Data JPA · REST API · MySQL                                                                         |
| **PostgreSQL**             | Studio autodidatta come alternativa a MySQL, applicato in AccessDesk                                                                              |
| **Competenze frontend**    | Angular · TypeScript · JavaScript · HTML · CSS                                                                                                    |
| **Formazione recente**     | Percorso Full Stack Web LabForWeb di 650 ore, concluso il 7 agosto 2026                                                                           |
| **Apprendimento continuo** | Metodo CARAC: richiamo attivo, esercizi autonomi e progetti reali                                                                                 |
| **Progetti principali**    | Expense Tracker come prodotto full stack; AccessDesk come prova autonoma su sicurezza e PostgreSQL; JobFlow come backend asincrono in costruzione |
| **Disponibilità**          | Roma · modalità ibrida · remoto in Italia                                                                                                         |

## Progetti in evidenza

| Progetto                                                                                                                                                                                             | Stato                                         | Cosa dimostra                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expense Tracker: [demo](https://gestionale-spese.vercel.app/) · [frontend](https://github.com/fabiozagaria/expense-tracker-angular) · [backend](https://github.com/fabiozagaria/expense-tracker-api) | Scope attuale concluso                        | Angular 21, PrimeNG/Aura, Spring Boot, JWT/refresh token, JPA/MySQL, CRUD spese/entrate, dashboard, ricerca, filtri e paginazione                                   |
| AccessDesk: [repository](https://github.com/fabiozagaria/accessdesk-api)                                                                                                                             | In sviluppo — prova autonoma                  | JWT, filtro personalizzato, Spring Security, autorizzazioni, JPA, MapStruct e PostgreSQL                                                                            |
| Spring Scaffold CLI: [repository](https://github.com/fabiozagaria/spring-scaffold-cli)                                                                                                               | MVP DTO presente — nuove funzionalità sospese | CLI Java 17 con Picocli, record DTO vuoti, validazione del naming e controllo dei file esistenti.                                                                   |
| JobFlow: [repository](https://github.com/fabiozagaria/job-flow)                                                                                                                                      | Backend in costruzione — v0.1 delimitata      | `POST /jobs` e `GET /jobs/{id}`, dominio e persistenza JPA/MySQL presenti; verifica runtime del GET, processor, worker e successo/fallimento restano da completare. |
| Transport Tickets: [repository](https://github.com/fabiozagaria/transport-tickets)                                                                                                                   | Backend sperimentale in studio                | Spring Boot, JPA/MySQL, Flyway, Redis opzionale, transazioni con lock e autenticazione a sessione con CSRF. Backend integrato su `main`.                            |
| LabTV `1.0.0`: [demo](https://lab-tv.vercel.app/) · [repository](https://github.com/fabiozagaria/labtv-angular)                                                                                      | Concluso                                      | Applicazione Angular frontend con integrazione TMDB API, HttpClient, RxJS, modelli tipizzati e routing parametrico                                                  |

Lo scope funzionale attuale di Expense Tracker è concluso: CRUD completo di spese ed entrate, dashboard e grafici, ricerca, filtro mensile, ordinamento e liste paginate. Registrazione pubblica e verifica email tramite API Brevo HTTPS sono operative. Il frontend è su Vercel, il backend su Render e MySQL su Aiven. Gli ultimi ampliamenti sono integrati su `master`; collaudo del deploy e regressioni restano distinti dal completamento funzionale.

AccessDesk è il secondo progetto in evidenza: una prova autonoma backend ancora in sviluppo con login JWT, filtro personalizzato `OncePerRequestFilter`, ruoli/permessi e `@PreAuthorize`. Gli errori del filtro vengono delegati a `HandlerExceptionResolver`. Usa JPA/Hibernate, MapStruct, paginazione e PostgreSQL predefinito; test e chiusura della consegna restano aperti.

Student Management API, Fakeflix e gli esercizi formativi restano consultabili dal
[profilo GitHub](https://github.com/fabiozagaria?tab=repositories), ma non sono presentati
come progetti principali. Task Manager con JPA e Spring Security resta un laboratorio: rinnovo,
rotazione e revoca esplicita/logout dei refresh token sono implementati; cookie HttpOnly/Secure,
test comportamentali e documentazione restano da completare prima di un'eventuale promozione.

## Ruolo dei repository

La classificazione corrente, i repository esclusi e le indicazioni per mantenerla aggiornata sono raccolti in [structure-repo.md](./structure-repo.md).

Expense Tracker consolida il prodotto full stack; Transport Tickets affronta dati, concorrenza e accesso alle risorse; JobFlow introduce l'elaborazione asincrona. I CRUD didattici e i laboratori Security restano consultabili senza essere tutti promossi a prodotti paralleli.

Questa descrizione documenta i repository collegati. Le schede del sito sono contenuti separati e possono richiedere un aggiornamento dedicato; una modifica al README non aggiorna automaticamente UI o PDF del CV.

## Come lavoro

Parto da vertical slice piccoli e verificabili, separo le responsabilità e uso test,
debugging e revisione del codice per consolidare le scelte. Le schede dei progetti
mostrano problema, soluzione, compromesso e stato reale; gli obiettivi futuri restano
distinti dalle funzionalità implementate. Il laboratorio guidato ha uno spazio
secondario rispetto ai progetti.

## Cosa dimostra questa repository

| Area                     | Implementazione                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Architettura Angular** | Componenti standalone, route caricate in modo lazy e dati dei progetti centralizzati e tipizzati                                          |
| **Qualità del codice**   | TypeScript strict, `ChangeDetectionStrategy.OnPush`, Prettier e test Vitest                                                               |
| **Accessibilità**        | HTML semantico, gerarchia dei titoli, focus visibile, skip link e menu mobile accessibile da tastiera                                     |
| **Performance**          | Immagini WebP, copia selettiva degli asset e bundle iniziale stimato in circa 71 kB trasferiti (JS/CSS iniziali; font e immagini esclusi) |
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
- `portfolio-angular/src/assets`: documenti e immagini ottimizzate.
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

- Email: [fabiozagaria@proton.me](mailto:fabiozagaria@proton.me)
- LinkedIn: [linkedin.com/in/fabiozagaria](https://www.linkedin.com/in/fabiozagaria)
- GitHub: [github.com/fabiozagaria](https://github.com/fabiozagaria)

## Tema della pagina

Il pulsante sole/luna nella navigazione alterna tema chiaro e scuro. Al primo accesso segue il dispositivo; la scelta manuale viene ricordata nel browser.

## Curriculum aggiornato — 29 ottobre 2026

CV a pagina singola allineato a Expense Tracker, AccessDesk e studio autodidatta di PostgreSQL. La versione pubblicata è generata con il template nativo Career Ops dal payload `portfolio-angular/scripts/cv-career-ops.json`. Il flusso di installazione, generazione e verifica è documentato in `AGENTS.md`. La copia nel repository curriculum richiede una sincronizzazione separata.
