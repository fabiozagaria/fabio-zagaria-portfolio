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

|                            |                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Ruoli di interesse**     | Junior Backend Developer · Junior Full Stack Developer                                                           |
| **Focus backend**          | Java · Spring Boot · Spring Security · Spring Data JPA · REST API · MySQL                                        |
| **Competenze frontend**    | Angular · TypeScript · JavaScript · HTML · CSS                                                                   |
| **Formazione recente**     | Percorso Full Stack Web LabForWeb di 650 ore, concluso il 7 agosto 2026                                          |
| **Apprendimento continuo** | Metodo CARAC: richiamo attivo, esercizi autonomi e progetti reali                                                |
| **Progetti principali**    | Expense Tracker, Spring Scaffold CLI, JobFlow e LabTV; Task Manager e Transport Tickets nei laboratori di studio |
| **Disponibilità**          | Roma · modalità ibrida · remoto in Italia                                                                        |

## Progetti in evidenza

| Progetto                                                                                                                                                                                                     | Stato                                         | Cosa dimostra                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expense Tracker `0.3.0`: [demo](https://gestionale-spese.vercel.app/) · [frontend](https://github.com/fabiozagaria/expense-tracker-angular) · [backend](https://github.com/fabiozagaria/expense-tracker-api) | In sviluppo — demo pubblica in consolidamento | Angular 21, PrimeNG/Aura, Spring Boot, JWT/refresh HttpOnly, JPA/MySQL, CRUD spese, creazione e lettura entrate e dashboard.                                            |
| Spring Scaffold CLI: [repository](https://github.com/fabiozagaria/spring-scaffold-cli)                                                                                                                       | Sospeso — MVP DTO disponibile                 | CLI Java 17 con Picocli, record DTO vuoti, naming e controllo dei file esistenti. Nuove funzionalità sospese.                                                           |
| JobFlow: [repository](https://github.com/fabiozagaria/job-flow)                                                                                                                                              | In sviluppo — v0.1 delimitata                 | `POST /jobs` e `GET /jobs/{id}`, dominio e persistenza JPA/MySQL presenti; verifica runtime del GET, processor PDF, worker e successo/fallimento restano da completare. |
| LabTV `1.0.0`: [demo](https://lab-tv.vercel.app/) · [repository](https://github.com/fabiozagaria/labtv-angular)                                                                                              | Concluso — manutenzione mirata                | SPA Angular con TMDB API, ricerca locale sul catalogo caricato, HttpClient, RxJS, modelli tipizzati e dettaglio con routing parametrico.                                |

La demo di Expense Tracker collega il frontend Vercel al backend Render e a MySQL.
**Prova la demo** apre un account condiviso: le modifiche sono visibili agli altri
visitatori e vanno usati solo dati fittizi. Il backend può richiedere 2–3 minuti
per riattivarsi. La [documentazione del progetto](https://github.com/fabiozagaria/expense-tracker-angular/blob/master/README.md)
riporta verifiche nel browser per login demo, sessione, dashboard e CRUD spese.
La registrazione online è disabilitata in attesa del servizio email HTTPS;
registrazione locale con Mailpit e creazione di entrate nel database condiviso
restano da verificare nel percorso completo.

LabTV è una release frontend: il login è dimostrativo e non è presente persistenza
utente. Un'eventuale evoluzione con backend e profili sarebbe una fase separata 2.x.

## Laboratori di studio

| Progetto                                                                                                               | Stato                                   | Cosa è presente e cosa resta da verificare                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task Manager Security Lab: [repository](https://github.com/fabiozagaria/task-manager-api-jpa-security)                 | Laboratorio attivo — esercizio guidato  | CRUD per proprietario, JWT, hash dei refresh token, rotazione e logout. Refresh nel JSON, senza cookie HttpOnly; concorrenza nella rotazione, CSRF e test comportamentali richiedono verifiche mirate.                                                    |
| Transport Tickets: [branch backend](https://github.com/fabiozagaria/transport-tickets/tree/study/backend-jpa-snapshot) | Laboratorio attivo — dati e concorrenza | JPA/MySQL, storico, transazioni, lock, Flyway, cache Redis opzionale, sessioni e CSRF, con test dedicati. Codice sviluppato anche con strumenti AI; comprensione e verifiche restano il traguardo corrente. `main` conserva la demo HTTP Java in memoria. |

Student Management API, Fakeflix e gli esercizi formativi restano consultabili dal
[profilo GitHub](https://github.com/fabiozagaria?tab=repositories), ma non sono presentati
come progetti principali.

## Ruolo dei repository

Expense Tracker consolida il prodotto full stack; Spring Scaffold CLI documenta il MVP di tooling Java; JobFlow costruisce le basi per l'elaborazione asincrona, ancora da implementare; LabTV dimostra l'integrazione di una API esterna. Task Manager e Transport Tickets approfondiscono sicurezza, dati, concorrenza e accesso alle risorse nella sezione dei laboratori.

Le schede del sito sono centralizzate in `portfolio-angular/src/app/data/projects.data.ts`.
README, home e CV riflettono lo stesso stato dei progetti; le fonti consultate sono
riportate in [docs/CONTEXT.md](docs/CONTEXT.md). Le verifiche documentate dai progetti
collegati sono distinte dai controlli eseguiti sul portfolio.

## Come lavoro

Parto da vertical slice piccoli e verificabili, separo le responsabilità e uso test,
debugging e revisione del codice per consolidare le scelte. Le schede dei progetti
mostrano problema, soluzione, compromesso e stato reale; gli obiettivi futuri restano
distinti dalle funzionalità implementate. I laboratori di studio hanno uno spazio
secondario rispetto ai progetti.

## Cosa dimostra questa repository

| Area                     | Implementazione                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Architettura Angular** | Componenti standalone, route caricate in modo lazy e dati dei progetti centralizzati e tipizzati      |
| **Qualità del codice**   | TypeScript strict, `ChangeDetectionStrategy.OnPush`, Prettier e test Vitest                           |
| **Accessibilità**        | HTML semantico, gerarchia dei titoli, focus visibile, skip link e menu mobile accessibile da tastiera |
| **Performance**          | Immagini WebP, copia selettiva degli asset e bundle iniziale stimato in circa 73 kB trasferiti        |
| **SEO**                  | Metadati e canonical specifici per route, Open Graph e dati strutturati Schema.org                    |
| **Delivery**             | CI su GitHub Actions e deploy automatico su Vercel                                                    |

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
- `portfolio-angular/scripts/generate_cv.py`: sorgente autorevole e generazione riproducibile del curriculum.
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
