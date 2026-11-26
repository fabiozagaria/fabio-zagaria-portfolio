# Handoff — 2026-11-25
Portfolio professionale concluso dal 21 novembre, salvo aggiornamenti significativi richiesti dal proprietario. Angular 21, routing lazy, Vitest, CI e deploy Vercel documentati. Rotte verificate nel sorgente: /, /about, /experience, /projects, /intelligenza-umana, /contact; alias /home. La pagina IU è già presente. Nessuna modifica applicativa in questa sessione.
## Handoff conversazione — 2026-11-26

### Stato del lavoro

- Pagina Progetti: mostra quattro sezioni curate, in ordine fisso. Plugin e skill trasferiti in Intelligenza Umana e raccolte di esercizi sono stati tolti dai contenuti e dai dati della pagina. Home ridotta alle aree Backend e Progetti del corso.
- Repository: allowlist ordinata in `portfolio-angular/src/app/data/portfolio-repositories.json`, con GET individuale dei 10 repository mostrati. Il workflow GitHub Actions è settimanale e avviabile manualmente. Il pulsante finale apre tutte le repository pubbliche su GitHub.
- Navigazione Progetti: link dell’indice e ritorno all’indice usano fragment Angular con ID reali sulle sezioni.
- Pagina Intelligenza Umana: foundation e quattro repository di strumenti pubblici MIT ora trasferiti in `Intelligenza-Umana`: Learning Ledger, Spring Security Advisor, Project Lifecycle Skill v0.3.0 e IU Model Router v0.1.0. Collegamenti della pagina aggiornati ai nuovi owner. Il repository del sito resta privato e non è collegato. Installazione e compatibilità degli strumenti restano da verificare; il progetto principale è ancora da scegliere.

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

2026-11-26: Aggiornata la pagina Intelligenza Umana con fonti della foundation e dell’organizzazione pubblica `Intelligenza-Umana`: quattro repository canonici pubblici MIT, Project Lifecycle Skill v0.3.0, IU Model Router v0.1.0, link a foundation, organizzazione, profilo e registro. In seguito i repository risultano trasferiti nell’organizzazione; vedi la nota «Aggiornamento — trasferimento repository IU» sopra. Notion riallineato con una voce datata. Test Angular non eseguiti.

2026-11-26: Rimossi dalla pagina Progetti i plugin e le skill spostati in Intelligenza Umana, insieme alle schede e ai dati degli esercizi. Home aggiornata a due aree; allowlist e JSON commit ridotti ai repository mostrati. Indice ridotto a quattro sezioni; documentazione e test aggiornati.
Integrato metodo di integrità documentale in AGENTS, mappa, definition of done e registro decisioni; CLAUDE importa AGENTS e resta invariato. README, CONTEXT, PRODUCT, DESIGN e structure-repo non richiedono cambi di contenuto applicativo per questa integrazione; verifiche complete di PRODUCT, DESIGN e structure-repo ancora da effettuare prima di interventi pertinenti. Nessuna copia integrale della skill privata. Nessun test software eseguito. Prossimo passo facoltativo: concordare etichette di navigazione, preservando URL, design e contenuti. Nessuna modifica CV.

## Navigazione
Aggiornate solo le tre etichette del menu; URL, titoli SEO, CSS, contenuti e CV invariati. Aggiunto test di regressione per etichette e destinazioni, non eseguito. PRODUCT e DESIGN consultati: vincoli preservati, da verificare resa responsive con etichette più lunghe. structure-repo invariato (classificazione progetti immutata). README e CONTEXT aggiornati con distinzione etichette/route. Sincronizzazione Notion non effettuata; da verificare CI e deploy.

## Aggiornamento — 2026-11-26
La pagina Intelligenza Umana e la descrizione SEO sono state allineate alla foundation v0.2.0, senza modificare layout, route o animazioni. La pubblicazione delle modifiche deve essere verificata. Build e suite `npm run test:ci` eseguite; la foundation è aperta ai contributi e le verifiche dei prodotti restano aperte. Il sito collegato potrebbe mostrare ancora la pagina precedente fino al rilascio del nuovo portale.

2026-11-26: Aggiornato il numero e l’elenco dei progetti Intelligenza Umana per includere IU Model Router. Test della pagina eseguito; il CV non è stato modificato.

2026-11-26: Aggiunto aggiornamento GitHub Actions dei commit per i repository classificati nelle schede Progetti, con JSON servito come asset Angular e workflow giornaliero/manuale che committa solo le variazioni per attivare Vercel. Esercizi, portfolio e repository esclusi restano fuori. Verificati sintassi Node e configurazione; rete GitHub non disponibile in locale e dipendenze Angular non installate, quindi generazione live e build non verificate. Notion non sincronizzato.

2026-11-26: Aggiunto indice delle sei sezioni alla pagina Progetti e collegamento fisso per ritornare all’indice, con scroll margin sui titoli. Nessuna libreria aggiunta. Diff CSS verificato; build e controlli visuali non eseguiti perché le dipendenze Angular non sono installate. Notion non sincronizzato.

2026-11-26: Revisione del catalogo Progetti richiesta da Fabio. Allowlist JSON ordinata per aggiornamento commit tramite GET per singolo repository; la UI usa commit aggiornati per le schede curate. Rimossa la sezione Esercizi e rinominato il link finale «Altri repository su GitHub». Indice e ritorno usano RouterLink con fragment `/projects`; gli ID sono assegnati ai gruppi di sezione, così gli anchor hanno un target reale. Workflow impostato settimanale e manuale. Verifiche Angular da eseguire dopo installazione dipendenze.
