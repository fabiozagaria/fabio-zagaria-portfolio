# Contesto tecnico — Portfolio

Aggiornato: 2026-10-25

## Obiettivo
Presentare in modo professionale e verificabile il profilo di Fabio Zagaria come Junior Backend Developer con visione full stack, mantenendo allineati portfolio, progetti, CV e stato tecnico reale.

## Stato osservato
- Portfolio Angular 21 / TypeScript 5.9.
- Deploy su Vercel.
- CI GitHub Actions con controlli di formato, test e build.
- Struttura con componenti standalone, routing lazy, dati tipizzati, attenzione a SEO, accessibilità e performance.
- Expense Tracker: scope funzionale attuale concluso per decisione del proprietario. CRUD entrate completo, ricerca, filtro mensile, ordinamento e paginazione ora presenti su master (backend verificato al commit 4753d9d5958d65a9dc737a38af9d125aad5df033). Registrazione e verifica email Brevo HTTPS operative. Non dichiarare conclusi collaudo del deploy e regressioni degli ultimi ampliamenti.
- AccessDesk è il secondo progetto in evidenza, ancora in sviluppo. Sorgenti verificati: login JWT HS256, filtro OncePerRequestFilter, HandlerExceptionResolver, ruoli/permessi e @PreAuthorize. PostgreSQL predefinito, MySQL alternativo, MapStruct e JPA. README ancora parzialmente fermo a HTTP Basic; non considerarlo aggiornato sul JWT.
- PostgreSQL è indicato come studio autodidatta in corso, alternativa a MySQL applicata in AccessDesk; non come competenza del corso LabForWeb.
- Home: Expense Tracker nel blocco principale; AccessDesk, JobFlow e LabTV nelle tre schede successive. Spring Scaffold CLI resta nella pagina progetti. Task Manager è nel laboratorio separato.
- LabTV: release frontend conclusa con TMDB API.
- JobFlow: POST e GET dei job presenti; creazione/persistenza verificate manualmente, GET da verificare a runtime. Worker ed esecuzione asincrona non completati.
- Transport Tickets: backend sperimentale Spring Boot/JPA integrato su `main` con il merge `e74e8c2eed01216534912c8a4b56a7216fc168d8`. MySQL, Flyway, Redis come cache opzionale, transazioni con lock e autenticazione a sessione con ruoli/CSRF. Corretto il difetto delle liste JPA con ticket non visibili; verificati 10 test JUnit, storage MySQL/Redis e flusso HTTP. Resta nella categoria Sperimentale con AI.
- Spring Scaffold CLI: MVP per record DTO vuoti; nuove funzionalità sospese.
- Task Manager: laboratorio guidato; refresh, rotazione e logout implementati, test comportamentali e cookie HttpOnly/Secure da completare.
- Aggiornati anche generatore e PDF del CV: Expense Tracker, AccessDesk, PostgreSQL autodidatta; formato a pagina singola. Copia identica da sincronizzare nel repository curriculum.

## Regole di mantenimento
- Aggiornare il portfolio solo quando una competenza o un progetto è realmente dimostrabile.
- Mantenere allineati README, contenuti del sito e CV.
- Il payload `portfolio-angular/scripts/cv-career-ops.json` contiene i dati del CV corrente; il PDF è generato con Career Ops.
- Non riportare qui voti, ripassi o cronologia didattica: restano in Notion.

## Curriculum pubblico
- `portfolio-angular/src/assets/documents/CV.pdf` è l'unico curriculum distribuito dal sito.
- Il layout è a colonna singola, testuale, leggibile e compatibile con i sistemi ATS.
- Dal 29 ottobre 2026 il PDF pubblico usa il template nativo Career Ops. Dati: `portfolio-angular/scripts/cv-career-ops.json`. `generate_cv.py` conserva il layout precedente e non va eseguito per rigenerare il CV attuale.

## Punto di attenzione
Quando cambiano versione, stato o focus di un progetto pubblico collegato, verificare se il portfolio necessita di sincronizzazione.


## Tema UI — 2026-10-02
Pulsante sole/luna accessibile nell’intestazione, tema coerente con i colori esistenti e scelta ricordata nel browser.
