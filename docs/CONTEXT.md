# Contesto tecnico — Portfolio

Aggiornato: 2026-11-02

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
- JobFlow: POST e GET dei job presenti; creazione/persistenza verificate manualmente, GET coperto da test ma da provare a runtime. Dal 1 novembre 2026 JobCreatedEvent e JobWorker asincrono portano il job da CREATED a PROCESSING (verificato a runtime); restano da fare COMPLETED/FAILED, ProcessorRegistry e generazione PDF.
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
- Dal 29 ottobre 2026 il PDF pubblico usa il template nativo Career Ops. Dati: `portfolio-angular/scripts/cv-career-ops.json`. Il generatore Python precedente è stato rimosso; seguire il flusso Career Ops descritto in `AGENTS.md`.

## Punto di attenzione
Quando cambiano versione, stato o focus di un progetto pubblico collegato, verificare se il portfolio necessita di sincronizzazione.


## Storico aggiornamenti e badge Novità — 2026-11-02
Le card dei tre progetti principali hanno il pulsante "Implementazioni importanti" (dati in `src/app/data/project-history.data.ts`, ogni voce con data, ora e commit reali, dalla più recente) e il badge "Novità", che resta visibile 7 giorni dopo la data di `latestUpdate`. L'animazione del badge è breve (3 pulsazioni) e disattivata con reduced motion.

## Interfaccia e animazioni — 2026-11-02
Il tema chiaro/scuro (pulsante sole/luna accessibile nell’intestazione, scelta ricordata nel browser) usa dal 2 novembre 2026 l’identità «foglio di disegno tecnico»: solo template e stile, testi, link e route invariati.

- **Palette**: cobalto come inchiostro e ambra come segno (pulsanti, linea attiva, badge Novità), con token per tema chiaro e scuro in `portfolio-angular/src/styles.css`. L’hero ha lo stesso cobalto in entrambi i temi.
- **Tipografia**: titoli h1/h2 in Bricolage Grotesque (variabile, asse larghezza), self-hosted in `src/assets/fonts/` con licenza OFL e preload in `index.html`; corpo del testo in Space Grotesk.
- **Hero della home**: nome grande, linea di quota con lo stack, cartiglio con dati presi dal README, ingresso orchestrato, parallax allo scroll e griglia che si illumina attorno al puntatore (solo puntatore preciso).
- **Scena 3D** (`features/home/hero-scene`): quattro lastre isometriche a fil di ferro, una per livello di Expense Tracker, con una richiesta che le attraversa. Usa three.js 0.184, caricato in un chunk differito (circa 153 kB gzip) dopo l’idle del browser, quindi il caricamento iniziale non cambia. Si ferma fuori schermo e a tab nascosta, mostra un solo fotogramma con reduced motion, non viene caricata su schermi stretti (sotto 861 px), con risparmio dati o su dispositivi con poca memoria o CPU, ed è nascosta ad assistive technology; senza WebGL l’hero resta statico.
- **Animazioni di sezione** (`src/motion.css`): titoli che salgono da una maschera, reveal allo scroll con scroll-driven animations CSS, filetti che si disegnano, hover solo con mouse. Disattivate con `prefers-reduced-motion` e in stampa; nei browser senza supporto le pagine restano statiche e complete. I reveal muovono soltanto i blocchi (mai l’opacità del testo), così contenuto, stampa e strumenti automatici lo vedono sempre; il footer non si anima.
- **Budget**: `anyComponentStyle` `maximumWarning` alzato da 4 kB a 6 kB in `angular.json`, perché il CSS del componente home supera i 4 kB.

Da fare e limiti noti:
- Prestazioni su GPU e dispositivi reali e Lighthouse non sono stati misurati.
