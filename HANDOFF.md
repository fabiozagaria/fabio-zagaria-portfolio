## CV inglese e pagina Intelligenza Umana — 2026-11-26

## Pagina del gioco Idle Project Blackhole — 2026-11-28

- Nuova rotta `/gioco`, componente `GiocoComponent`, voce di menu «Idle Project Blackhole» (il «nome provvisorio» è dichiarato nella pagina e nel titolo della scheda, non nel menu), sitemap aggiornata. Stile 8/16 bit isolato nella pagina; italiano e inglese. Il repository del gioco è privato e non è citato. Design: `docs/superpowers/specs/2026-11-28-pagina-gioco-design.md`; piano: `docs/superpowers/plans/2026-11-28-pagina-gioco.md`.
- Verificato: test Angular, build, formato (vedi report di sessione). Non verificato: telefono reale, screen reader, Lighthouse, preview online (da fare prima del merge).
- Revisione del 28 novembre su richiesta di Fabio: racconto più basico (niente fasi né elenco dei finali, solo «diversi finali»), costruzione con il sostegno dell’IA, uscita per ora soltanto su Android senza data, nessuna versione iOS, loghi di Godot e Android in pixel art forniti da lui, con le attribuzioni delle licenze.
- Seconda revisione del 28 novembre su richiesta di Fabio: testi in paragrafi discorsivi e ordinati, nuova sezione «Come funziona» con le meccaniche del gioco già presenti nel codice (nessun finale nominato o contato, nessuna funzione segreta o pianificata), spazi più ampi tra tag, titolo e riquadri.
- Sfondo universo in pixel art (galassie, nebulose, stelle) aggiunto su richiesta di Fabio, generato da `portfolio-angular/scripts/generate-gioco-background.py`; contrasto del testo misurato nel browser (≥5,3:1 nel 99,5% dell'area dietro il testo, qualche stella da un pixel può coprire una lettera). Merge di Fabio dopo aver visto la preview.
- Aperto per Fabio: conferma palette viola e oro, eventuali screenshot reali del gioco, scheda Notion del portfolio non aggiornata, domanda sul CV.


- Career Ops 1.40.0 al commit `dee72e0` installato nel cloud e in `portfolio-angular/.career-ops`. Il comando ripetibile è `npm run cv:install` da `portfolio-angular`. Le dipendenze del tool restano nella sua cartella locale.
- Il CV inglese (`CV-en.pdf`, SHA-256 breve `4a0446d5`) traduce il CV italiano del 21 novembre. Home e Contatti collegano il PDF e la data della lingua attiva. PDF inglese e copia archiviata coincidono nel checkout del repository curriculum.
- CV inglese verificato su una pagina A4 con testo estraibile e link. Career Ops ha dato 90/100 nel controllo ATS. Il confronto con il CV italiano è stato fatto sui contenuti, perché il controllo dei fatti richiede un `cv.md` non disponibile nel cloud.
- In Intelligenza Umana, il sito ufficiale ha un pulsante primario separato. Titoli e descrizioni usano le maiuscole iniziali. Il nome visibile nel portfolio è «Model Router». Fabio ha verificato i test di Project Lifecycle Skill e ne ha confermato il funzionamento.
- Verifiche locali: 127 test Angular, build, formato e Chromium per i due CV e la pagina Intelligenza Umana. Aggiornati README, contesto, struttura, design, prodotto, istruzioni e procedura CV nei repository pertinenti. Il riepilogo resta nel repository. Le modifiche attendono pubblicazione.

## Portfolio bilingue e stack animato — 2026-11-26

- Il selettore delle bandiere cambia la lingua sulla pagina corrente. Italiano al primo accesso, preferenza in `localStorage`, titoli e metadati client aggiornati con la lingua. Le traduzioni vivono in `core/locales`. Il CV, gli attestati, i media dei progetti e i contenuti esterni mantengono la lingua originale.
- Lo stack del profilo professionale scorre su due righe in direzioni opposte, con 29 loghi e la voce testuale REST API. La pausa, la stampa e l’impostazione di movimento ridotto mostrano l’elenco statico. C++ è indicato come studio previsto.
- Verifiche locali superate: build di produzione, Prettier e 126 test. Chromium ha verificato le 13 pagine in inglese, il cambio lingua e la persistenza dopo il ricaricamento, i loghi, la pausa e l’header fino a 320 px. Axe non ha segnalato violazioni sul profilo nelle configurazioni desktop e mobile verificate.
- Aggiornati `README.md`, `docs/CONTEXT.md`, `structure-repo.md`, `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, la mappa documentale e il registro decisioni. Le fonti delle immagini sono in `docs/ASSET-SOURCES.md`. Il riepilogo resta nel repository su scelta di Fabio. Modifiche nella copia di lavoro, in attesa di pubblicazione.

# Handoff — 2026-11-25
Portfolio professionale concluso dal 21 novembre, salvo aggiornamenti significativi richiesti dal proprietario. Angular 21, routing lazy, Vitest, CI e deploy Vercel documentati. Rotte verificate nel sorgente: /, /about, /experience, /projects, /intelligenza-umana, /contact; alias /home. La pagina IU è già presente. Nessuna modifica applicativa in questa sessione.
## Handoff conversazione — 2026-11-26

### Stato del lavoro

- Pagina Progetti: mostra quattro sezioni curate, in ordine fisso. Plugin e skill trasferiti in Intelligenza Umana e raccolte di esercizi sono stati tolti dai contenuti e dai dati della pagina. Home ridotta alle aree Backend e Progetti del corso.
- Repository: allowlist ordinata in `portfolio-angular/src/app/data/portfolio-repositories.json`, con GET individuale dei 10 repository mostrati. Il workflow GitHub Actions è settimanale e avviabile manualmente. Il pulsante finale apre tutte le repository pubbliche su GitHub.
- Navigazione Progetti: link dell’indice e ritorno all’indice usano fragment Angular con ID reali sulle sezioni.
- Pagina Intelligenza Umana: foundation e quattro repository di strumenti pubblici MIT ora trasferiti in `Intelligenza-Umana`: Learning Ledger, Spring Security Advisor, Project Lifecycle Skill v0.3.0 e Model Router v0.1.0. Collegamenti della pagina aggiornati ai nuovi owner. Il repository del sito resta privato e non è collegato. Installazione e compatibilità degli strumenti restano da verificare; il progetto principale è ancora da scegliere.

### Fonti aggiornate

- Foundation trasferita: [Intelligenza-Umana/intelligenza-umana](https://github.com/Intelligenza-Umana/intelligenza-umana), README, `docs/PROJECT_REGISTRY.md` e licenza. Il registro e il profilo pubblico riportano ancora i vecchi URL sotto `fabiozagaria`; GitHub li reindirizza, ma le fonti vanno riallineate.
- Organizzazione: [Intelligenza-Umana](https://github.com/Intelligenza-Umana), con profilo pubblico in `Intelligenza-Umana/.github/profile/README.md`.
- Scheda Notion «Portfolio personale» aggiornata con il riepilogo e verificata con data 26 novembre 2026.

### Verifiche e prossimi passi

- PR #89 e PR #90 sono mergiate in `master`. La CI della PR #90 ha superato formato, test e build.
- I link della pagina IU puntano all’owner `Intelligenza-Umana`. Il branch `chore/update-iu-organization-links` contiene la versione integrata.
- Resta aperta la domanda se aggiornare anche il CV, secondo la regola di `AGENTS.md`.

### Aggiornamento — trasferimento repository IU (2026-11-26)

- L’API GitHub conferma l’owner `Intelligenza-Umana` per la foundation e i quattro strumenti presentati. Sono stati aggiornati la pagina IU, il test dei link e i documenti di contesto e catalogo.
- La repository `intelligenza-umana-web` risulta privata; il portfolio continua a collegare solo il sito pubblico.
- `docs/PROJECT_REGISTRY.md` nella foundation e il profilo `.github` hanno contenuti ancora non riallineati ai trasferimenti. Le modifiche locali non includono quei repository esterni.
- La CI della PR #90 è passata prima del merge.

2026-11-26: Aggiornata la pagina Intelligenza Umana con fonti della foundation e dell’organizzazione pubblica `Intelligenza-Umana`: quattro repository canonici pubblici MIT, Project Lifecycle Skill v0.3.0, Model Router v0.1.0, link a foundation, organizzazione, profilo e registro. In seguito i repository risultano trasferiti nell’organizzazione; vedi la nota «Aggiornamento — trasferimento repository IU» sopra. Notion riallineato con una voce datata. Test Angular non eseguiti.

2026-11-26: Rimossi dalla pagina Progetti i plugin e le skill spostati in Intelligenza Umana, insieme alle schede e ai dati degli esercizi. Home aggiornata a due aree; allowlist e JSON commit ridotti ai repository mostrati. Indice ridotto a quattro sezioni; documentazione e test aggiornati.
Integrato metodo di integrità documentale in AGENTS, mappa, definition of done e registro decisioni; CLAUDE importa AGENTS e resta invariato. README, CONTEXT, PRODUCT, DESIGN e structure-repo non richiedono cambi di contenuto applicativo per questa integrazione; verifiche complete di PRODUCT, DESIGN e structure-repo ancora da effettuare prima di interventi pertinenti. Nessuna copia integrale della skill privata. Nessun test software eseguito. Prossimo passo facoltativo: concordare etichette di navigazione, preservando URL, design e contenuti. Nessuna modifica CV.

## Navigazione
Aggiornate solo le tre etichette del menu; URL, titoli SEO, CSS, contenuti e CV invariati. Aggiunto test di regressione per etichette e destinazioni, non eseguito. PRODUCT e DESIGN consultati: vincoli preservati, da verificare resa responsive con etichette più lunghe. structure-repo invariato (classificazione progetti immutata). README e CONTEXT aggiornati con distinzione etichette/route. Sincronizzazione Notion non effettuata; da verificare CI e deploy.

## Aggiornamento — 2026-11-26
La pagina Intelligenza Umana e la descrizione SEO sono state allineate alla foundation v0.2.0, senza modificare layout, route o animazioni. La pubblicazione delle modifiche deve essere verificata. Build e suite `npm run test:ci` eseguite; la foundation è aperta ai contributi e le verifiche dei prodotti restano aperte. Il sito collegato potrebbe mostrare ancora la pagina precedente fino al rilascio del nuovo portale.

2026-11-26: Aggiornato il numero e l’elenco dei progetti Intelligenza Umana per includere Model Router. Test della pagina eseguito; il CV non è stato modificato.

2026-11-26: Aggiunto aggiornamento GitHub Actions dei commit per i repository classificati nelle schede Progetti, con JSON servito come asset Angular e workflow giornaliero/manuale che committa solo le variazioni per attivare Vercel. Esercizi, portfolio e repository esclusi restano fuori. Verificati sintassi Node e configurazione; rete GitHub non disponibile in locale e dipendenze Angular non installate, quindi generazione live e build non verificate. Notion non sincronizzato.

2026-11-26: Aggiunto indice delle sei sezioni alla pagina Progetti e collegamento fisso per ritornare all’indice, con scroll margin sui titoli. Nessuna libreria aggiunta. Diff CSS verificato; build e controlli visuali non eseguiti perché le dipendenze Angular non sono installate. Notion non sincronizzato.

2026-11-26: Revisione del catalogo Progetti richiesta da Fabio. Allowlist JSON ordinata per aggiornamento commit tramite GET per singolo repository; la UI usa commit aggiornati per le schede curate. Rimossa la sezione Esercizi e rinominato il link finale «Altri repository su GitHub». Indice e ritorno usano RouterLink con fragment `/projects`; gli ID sono assegnati ai gruppi di sezione, così gli anchor hanno un target reale. Workflow impostato settimanale e manuale. Verifiche Angular da eseguire dopo installazione dipendenze.

2026-11-26: Ritmo verticale di Progetti e Intelligenza Umana sistemato, ritratto nell’hero e motivazione (da `docs/MOTIVATION.md`) sotto la presentazione (Home). `npm run test:ci` (112 test) e build eseguiti; verifica visiva su desktop e telefono emulato. CV non modificato.

2026-11-26: Pagina dedicata per ogni progetto (`/projects/<id>`), card brevi in elenco e Home, tag delle tecnologie come pillole tonali, riquadro «Ultimo aggiornamento» ridisegnato, ritratto al posto di «FZ» nell'header. `npm run test:ci` (116 test) e build eseguiti; controllo visivo in tema chiaro/scuro e su telefono emulato. CV non modificato.

2026-11-26: Controllo degli spazi su tutte le pagine (verifica automatica dei blocchi consecutivi e screenshot desktop/telefono): corretti storico «Implementazioni importanti» (spazi, gerarchia, larghezza del testo) e vuoto eccessivo tra descrizione e stato nelle card sperimentali. Altre pagine senza elementi attaccati.

2026-11-26: Discesa morbida degli elementi (all'apertura e allo scroll, rispetta «riduci movimento»), tema chiaro meno luminoso, tema scuro con colori attenuati. `npm run test:ci` (120 test) e build eseguiti; controllo visivo in entrambi i temi. Non verificato: l'effetto su dispositivi reali e con CPU lenta. CV non modificato.

2026-11-26: Leggibilità dei testi (grassetti, corsivi, interlinea, misura), palette senza marroni, discesa su tutto il portfolio, freccia di ritorno nella pagina del progetto e ritratto meno ravvicinato. `npm run test:ci` (124 test) e build eseguiti; verifica visiva in entrambi i temi; scorrimento di tutte le pagine senza elementi bloccati. Non fatto: ritratto e palette del sito di Intelligenza Umana. CV non modificato.

2026-11-26: Nome mostrato «IU Model Router» cambiato in «Model Router» (pagina Intelligenza Umana, test e documenti). Repository e URL `iu-model-router` invariati, come richiesto da Fabio. CV non modificato.

2026-11-27: Added the official Discord server invitation to the Intelligenza Umana page, using Discord's unmodified symbol. Sources and the maintenance exception are recorded in `docs/ASSET-SOURCES.md` and `AGENTS.md`; README, CONTEXT, structure, PRODUCT, DESIGN and the Notion project page were aligned. No CV changes. Tests and build were not run in this session.

2026-11-28: Aggiunto alla pagina Intelligenza Umana il widget Discord ufficiale (iframe `discord.com/widget`, componente `shared/discord-widget`, test aggiunto). Build e `ng test` (146 test) riusciti; verifica visiva nel browser non eseguita. README, CONTEXT, PRODUCT, DESIGN e AGENTS aggiornati; `structure-repo.md` aggiornato; scheda Notion e CV non toccati (il CV non cambia: ritocco minore). Nessun commit o push.
