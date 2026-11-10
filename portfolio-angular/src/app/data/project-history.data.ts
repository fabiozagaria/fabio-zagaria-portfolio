import { PortfolioUpdateSource } from './projects.data';

export interface PortfolioHistoryEntry {
  readonly datetime: string;
  readonly dateLabel: string;
  readonly title: string;
  readonly summary: string;
  readonly version?: string;
  readonly sources: readonly PortfolioUpdateSource[];
}

/**
 * Implementazioni importanti dei tre progetti principali, dalla più recente.
 * Ogni voce rimanda ai commit reali; data e ora sono nel fuso Europe/Rome.
 */
export const PROJECT_HISTORY: Readonly<Record<string, readonly PortfolioHistoryEntry[]>> = {
  jobflow: [
    {
      datetime: '2026-11-01T23:22:53+01:00',
      dateLabel: '1 novembre 2026, 23:22',
      title: 'JobWorker asincrono e passaggio a PROCESSING',
      summary:
        'Il worker ascolta JobCreatedEvent dopo il commit, su un thread separato (@Async con @TransactionalEventListener), e porta il job da CREATED a PROCESSING tramite JobService.markAsProcessing, con test unitario.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/44a2527a70cc8020bdb948266445f7b7fd85dfbb',
        },
      ],
    },
    {
      datetime: '2026-11-01T22:19:54+01:00',
      dateLabel: '1 novembre 2026, 22:19',
      title: 'Evento JobCreatedEvent dopo il salvataggio',
      summary:
        'JobService pubblica JobCreatedEvent con l’id del job dentro la transazione di creazione; aggiunto il test unitario.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/5e0ddc3914893d74975b836f52cf857997bcf4b9',
        },
      ],
    },
    {
      datetime: '2026-11-01T21:35:18+01:00',
      dateLabel: '1 novembre 2026, 21:35',
      title: 'MapStruct JobMapper e test di service e controller',
      summary:
        'Mapping da Job a JobResponse con MapStruct e test unitari di JobService e JobController.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/ffb251cb5e13478c66e8cbd656842206d0a7e273',
        },
      ],
    },
    {
      datetime: '2026-10-31T09:17:34+01:00',
      dateLabel: '31 ottobre 2026, 09:17',
      title: 'Prima prerelease v0.1.0-alpha.1',
      summary: 'Versione impostata e documentata: creazione e persistenza dei job presenti.',
      version: 'v0.1.0-alpha.1',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/a58c3622a2cc74e0d787736a05e4915825a8ea22',
        },
      ],
    },
    {
      datetime: '2026-10-08T12:15:57+02:00',
      dateLabel: '8 ottobre 2026, 12:15',
      title: 'Endpoint GET /jobs/{id} documentato come implementato',
      summary: 'Lettura di un job tramite id; la verifica a runtime resta da fare.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/766432d4dcd77853c2bc39d0d2d57d158a521feb',
        },
      ],
    },
    {
      datetime: '2026-09-28T12:51:15+02:00',
      dateLabel: '28 settembre 2026, 12:51',
      title: 'Persistenza di Job e GeneratePdfWork verificata',
      summary: 'Job e GeneratePdfWork salvati insieme con cascade PERSIST, verificati su MySQL.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/71c4e5f52e31d024a0d4a1f3aa6f49bb369d027f',
        },
      ],
    },
    {
      datetime: '2026-09-22T18:57:59+02:00',
      dateLabel: '22 settembre 2026, 18:57',
      title: 'Primo codice del progetto',
      summary: 'Primo commit di codice dopo la definizione dell’architettura iniziale.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/job-flow/commit/cfc335fa0df84ba6cf0ea52ed6d005d9a81de003',
        },
      ],
    },
  ],
  accessdesk: [
    {
      datetime: '2026-10-31T09:17:38+01:00',
      dateLabel: '31 ottobre 2026, 09:17',
      title: 'Prima prerelease v0.1.0-alpha.1',
      summary: 'Versione impostata e documentata.',
      version: 'v0.1.0-alpha.1',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/a4609198c9b74695a11f7d2f0d88651c8f3ced79',
        },
      ],
    },
    {
      datetime: '2026-10-25T15:40:26+01:00',
      dateLabel: '25 ottobre 2026, 15:40',
      title: 'PostgreSQL come database predefinito',
      summary: 'PostgreSQL diventa il database predefinito e il profilo MySQL resta disponibile.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/6a1fbdb692b22ef1a16e6114304ab7585555f90a',
        },
      ],
    },
    {
      datetime: '2026-10-25T13:13:25+01:00',
      dateLabel: '25 ottobre 2026, 13:13',
      title: 'Autenticazione JWT',
      summary:
        'Login con JWT HS256 e filtro OncePerRequestFilter per il token Bearer presenti nel codice; verifiche del flusso e test automatici restano da completare.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/c6984ef4f3e7cf8dc8bad072606026f0a259fd55',
        },
      ],
    },
    {
      datetime: '2026-10-24T16:16:45+02:00',
      dateLabel: '24 ottobre 2026, 16:16',
      title: 'Avvio dell’integrazione JWT',
      summary: 'Primo commit dedicato all’autenticazione JWT.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/bbcd54ecb7e10637806ff1bd366b7b76ed7fa10e',
        },
      ],
    },
    {
      datetime: '2026-10-23T18:10:59+02:00',
      dateLabel: '23 ottobre 2026, 18:10',
      title: 'Sicurezza e service layer',
      summary: 'Serie di commit su sicurezza e service layer, dal 16 al 23 ottobre.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/53d3b0efbc91f70d761a2d03537f64b1ce8454de',
        },
      ],
    },
    {
      datetime: '2026-10-14T18:31:10+02:00',
      dateLabel: '14 ottobre 2026, 18:31',
      title: 'Primo codice: entity Request',
      summary: 'Prime entity del dominio, a partire da Request.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/3f8a132521582c4eff6357f6c11795e512bb8357',
        },
      ],
    },
    {
      datetime: '2026-10-14T08:33:37+02:00',
      dateLabel: '14 ottobre 2026, 08:33',
      title: 'Documentazione di partenza',
      summary: 'Brief, requisiti, contratto API, criteri di accettazione, consegna e decision log.',
      sources: [
        {
          label: 'Commit',
          url: 'https://github.com/fabiozagaria/accessdesk-api/commit/95baa1ff4a5b7df6d2c33ce2f963c0724636c5ab',
        },
      ],
    },
  ],
  'gestionale-spese': [
    {
      datetime: '2026-11-10T11:39:56+01:00',
      dateLabel: '10 novembre 2026, 11:39',
      title: 'API: Swagger UI utilizzabile dalla demo pubblica',
      summary:
        'L’URL pubblico dell’API è accettato come Origin per POST /auth/* e aggiunto ai CORS, così «Try it out» su /auth/demo funziona dalla pagina Swagger del backend.',
      sources: [
        {
          label: 'API',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/3be1df247e946a94fa5396bed3828ce087d46523',
        },
      ],
    },
    {
      datetime: '2026-11-10T11:25:35+01:00',
      dateLabel: '10 novembre 2026, 11:25',
      title: 'API: rate limit sugli endpoint di autenticazione',
      summary:
        'Token bucket in memoria per IP su POST /auth/*; i rifiuti rispondono 429 con Retry-After e corpo APIError.',
      sources: [
        {
          label: 'API',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/1338e65bf88fd0acbdd3e7dbe47eaab779036360',
        },
      ],
    },
    {
      datetime: '2026-11-10T11:25:09+01:00',
      dateLabel: '10 novembre 2026, 11:25',
      title: 'API: documentazione OpenAPI con Swagger UI',
      summary:
        'Aggiunta la specifica OpenAPI con Swagger UI pubblica; SWAGGER_ENABLED=false la disattiva.',
      sources: [
        {
          label: 'API',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/0961f42992be1ff0e2ecaee4a0d3f57e4f574ce7',
        },
      ],
    },
    {
      datetime: '2026-11-10T11:10:53+01:00',
      dateLabel: '10 novembre 2026, 11:10',
      title: 'API: rilevamento del riuso del refresh token',
      summary:
        'Il riuso di un refresh token già ruotato viene rilevato; i token scaduti vengono ripuliti.',
      sources: [
        {
          label: 'API',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/14d38a98e3c9b0197c64b12fb85f71a1274e75e3',
        },
      ],
    },
    {
      datetime: '2026-11-03T00:30:21+01:00',
      dateLabel: '3 novembre 2026, 00:30',
      title: 'Frontend: README allineato alle versioni',
      summary: 'Il README del frontend riporta la versione backend compatibile (1.0.2).',
      version: 'frontend v1.0.2',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/560279611c1ea8c7ed02c11646f3ef563275e458',
        },
      ],
    },
    {
      datetime: '2026-11-02T18:31:10+01:00',
      dateLabel: '2 novembre 2026, 18:31',
      title: 'API: rotazione atomica del refresh token',
      summary:
        'Il refresh token viene ruotato in modo atomico per impedire il riutilizzo concorrente; il commit aggiunge test di concorrenza.',
      sources: [
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/62598723af506071029495f3672c9b58f8fd4945',
        },
      ],
    },
    {
      datetime: '2026-11-02T18:26:07+01:00',
      dateLabel: '2 novembre 2026, 18:26',
      title: 'API: controllo della lunghezza della chiave JWT',
      summary: 'L’avvio dell’API fallisce subito se SECRET_KEY è più corta di 32 byte.',
      sources: [
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/04fe79a4bd9cad8afe8d1b7817910ed20f4c973f',
        },
      ],
    },
    {
      datetime: '2026-10-31T09:09:19+01:00',
      dateLabel: '31 ottobre 2026, 09:09',
      title: 'API 1.0.2: mapping MapStruct',
      summary: 'Mapper MapStruct per spese ed entrate nell’API.',
      version: 'API v1.0.2',
      sources: [
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/d22fc6fc19a4e3d9b57dcd308a4059939da3cddd',
        },
      ],
    },
    {
      datetime: '2026-10-30T22:46:12+01:00',
      dateLabel: '30 ottobre 2026, 22:46',
      title: 'Frontend 1.0.2: password visibile e tema scuro',
      summary:
        'Controllo mostra/nascondi password in login e registrazione e correzioni del tema scuro.',
      version: 'frontend v1.0.2',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/b02566352384cccb32c698328fe12e9a48bf1bef',
        },
      ],
    },
    {
      datetime: '2026-10-30T12:06:32+01:00',
      dateLabel: '30 ottobre 2026, 12:06',
      title: 'Release 1.0.1: cache Redis e letture paginate',
      summary:
        'L’API mette in cache Redis le risposte delle spese per proprietario; il frontend usa letture paginate.',
      version: 'v1.0.1',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/8d22f0143fd86591c248085b6d71ca122e909de0',
        },
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/507d4d8a998d2fa844472a08d608a254e7f473c8',
        },
      ],
    },
    {
      datetime: '2026-10-25T17:32:24+01:00',
      dateLabel: '25 ottobre 2026, 17:32',
      title: 'Versione 1.0.0',
      summary: 'Progetto contrassegnato come concluso nella versione 1.0.0, con README allineato.',
      version: 'v1.0.0',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/33211655ab82d303ad113b52da10710a883805d2',
        },
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/35c33acdc6f0b65845c0f17475cdbc7af2c37191',
        },
      ],
    },
    {
      datetime: '2026-10-25T17:05:30+01:00',
      dateLabel: '25 ottobre 2026, 17:05',
      title: 'CRUD entrate, ricerca e liste paginate',
      summary:
        'API con CRUD completo delle entrate e ricerca paginata dei movimenti; frontend con liste modificabili e paginate.',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/59b4fa0131180daf929ffac075e03bdb42c79b8d',
        },
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/95bf5a5f9ebd74cfead8c71f6dcdf28a9944e872',
        },
      ],
    },
    {
      datetime: '2026-10-25T15:56:09+01:00',
      dateLabel: '25 ottobre 2026, 15:56',
      title: 'Registrazione online con verifica email',
      summary:
        'Invio delle email di verifica tramite API Brevo HTTPS e form di registrazione online nel frontend.',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/cb95d16fbc382efbbd371b592e47087b811d4d5d',
        },
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/93bdc9af35199d458c1f36a3b54314713edebd8a',
        },
      ],
    },
    {
      datetime: '2026-10-12T20:54:42+02:00',
      dateLabel: '12 ottobre 2026, 20:54',
      title: 'Interfaccia migrata a PrimeNG',
      summary: 'Tutte le pagine migrate a PrimeNG e Bootstrap rimosso.',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/81de6e07a222afcf4b13c8e18ff74ba3cac6f563',
        },
      ],
    },
    {
      datetime: '2026-09-21T13:11:50+02:00',
      dateLabel: '21 settembre 2026, 13:11',
      title: 'Autenticazione e spese personali integrate',
      summary: 'Integrazione di autenticazione e spese personali tra API e frontend.',
      sources: [
        {
          label: 'Frontend',
          url: 'https://github.com/fabiozagaria/expense-tracker-angular/commit/ef492db4cd5c3b63a679c4ca8c16b65948d534ae',
        },
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/87c48773a4a2af50faea684631ba08739f14e175',
        },
      ],
    },
    {
      datetime: '2026-09-13T01:34:50+02:00',
      dateLabel: '13 settembre 2026, 01:34',
      title: 'Refresh token',
      summary: 'Sistema di refresh token nell’API.',
      sources: [
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/2a25bc13f48fcfeafeb3775b97d3572fc89957fd',
        },
      ],
    },
    {
      datetime: '2026-09-11T22:25:46+02:00',
      dateLabel: '11 settembre 2026, 22:25',
      title: 'Sicurezza con JWT',
      summary: 'Configurazione di Spring Security con JWT nell’API.',
      sources: [
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/25c63656b0630f760ffeffabfccf56987302ed77',
        },
      ],
    },
    {
      datetime: '2026-08-24T13:34:41+02:00',
      dateLabel: '24 agosto 2026, 13:34',
      title: 'CRUD REST delle spese',
      summary: 'Controller e service per il CRUD completo delle spese.',
      sources: [
        {
          label: 'Backend',
          url: 'https://github.com/fabiozagaria/expense-tracker-api/commit/cd21f4957b3d1d82a94edfe873b79156738bcb62',
        },
      ],
    },
  ],
};
