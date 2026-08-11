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
  <a href="./portfolio-angular/src/assets/documents/CV.pdf">Curriculum</a>
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

|                                 |                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| **Ruoli di interesse**          | Junior Backend Developer · Junior Full Stack Developer                              |
| **Focus backend**               | Java · Spring Boot · Spring JDBC · REST API · MySQL                                 |
| **Competenze frontend**         | Angular · TypeScript · JavaScript · HTML · CSS                                      |
| **Formazione recente**          | Percorso Full Stack Web LabForWeb di 650 ore, concluso il 7 agosto 2026             |
| **Progetto backend principale** | Student Management API: CRUD completo, validazione, transazioni e persistenza MySQL |
| **Disponibilità**               | Roma · modalità ibrida · remoto in Italia                                           |

## Progetti in evidenza

| Progetto                                                                                                                                              | Stato       | Cosa dimostra                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------- |
| [Student Management API](https://github.com/fabiozagaria/student-management-api)                                                                      | Completato  | Spring Boot, JDBC Template, MySQL, REST e architettura a layer |
| [LabTV](https://github.com/fabiozagaria/labtv-angular)                                                                                                | Sospeso     | Riprenderà dopo il completamento del Gestionale Spese          |
| Expense Tracker: [frontend](https://github.com/fabiozagaria/expense-tracker-angular) · [backend](https://github.com/fabiozagaria/expense-tracker-api) | In sviluppo | Angular Signals, Spring Boot, JPA, MySQL e integrazione REST   |
| [Fakeflix](https://github.com/fabiozagaria/fakeflix-vanilla-js)                                                                                       | Completato  | JavaScript vanilla, DOM, stato e interfaccia responsive        |

## Cosa dimostra questa repository

| Area                     | Implementazione                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Architettura Angular** | Componenti standalone, route caricate in modo lazy e dati dei progetti centralizzati e tipizzati      |
| **Qualità del codice**   | TypeScript strict, `ChangeDetectionStrategy.OnPush`, Prettier e test Vitest                           |
| **Accessibilità**        | HTML semantico, gerarchia dei titoli, focus visibile, skip link e menu mobile accessibile da tastiera |
| **Performance**          | Immagini WebP, copia selettiva degli asset e bundle iniziale stimato in circa 69 kB trasferiti        |
| **SEO**                  | Metadati Open Graph, canonical URL e dati strutturati Schema.org                                      |
| **Delivery**             | CI su GitHub Actions e deploy automatico su Vercel                                                    |

## Scelte tecniche principali

- Le pagine sono caricate solo quando vengono visitate, riducendo il JavaScript iniziale.
- I dati dei progetti sono separati dai componenti e verificati tramite tipi TypeScript.
- I componenti statici usano `OnPush` per evitare controlli non necessari.
- CV e attestato vengono distribuiti come documenti professionali, mentre gli asset sorgente non necessari vengono esclusi dalla build.
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
- `portfolio-angular/scripts`: generazione riproducibile del curriculum.
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
