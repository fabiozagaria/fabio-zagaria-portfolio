# Handoff — 2026-11-25
Portfolio professionale concluso dal 21 novembre, salvo aggiornamenti significativi richiesti dal proprietario. Angular 21, routing lazy, Vitest, CI e deploy Vercel documentati. Rotte verificate nel sorgente: /, /about, /experience, /projects, /intelligenza-umana, /contact; alias /home. La pagina IU è già presente. Nessuna modifica applicativa in questa sessione.
## Handoff conversazione — 2026-11-26

### Stato del lavoro

- Pagina Progetti: mostra quattro sezioni curate, in ordine fisso. Plugin e skill trasferiti in Intelligenza Umana e raccolte di esercizi sono stati tolti dai contenuti e dai dati della pagina. Home ridotta alle aree Backend e Progetti del corso.
- Repository: allowlist ordinata in `portfolio-angular/src/app/data/portfolio-repositories.json`, con GET individuale dei 10 repository mostrati. Il workflow GitHub Actions è settimanale e avviabile manualmente. Il pulsante finale apre tutte le repository pubbliche su GitHub.
- Navigazione Progetti: link dell’indice e ritorno all’indice usano fragment Angular con ID reali sulle sezioni.
- Pagina Intelligenza Umana: foundation pubblica e MIT; organizzazione GitHub `Intelligenza-Umana` con profilo pubblico e modelli condivisi per issue e pull request. Quattro strumenti pubblici MIT collegati ai repository canonici: Learning Ledger, Spring Security Advisor, Project Lifecycle Skill v0.3.0 e IU Model Router v0.1.0. I repository dei prodotti non sono stati trasferiti nell’organizzazione. Installazione e compatibilità degli strumenti restano da verificare; il progetto principale è ancora da scegliere.

### Fonti aggiornate

- Foundation: [fabiozagaria/intelligenza-umana](https://github.com/fabiozagaria/intelligenza-umana), README, `docs/PROJECT_REGISTRY.md` e licenza.
- Organizzazione: [Intelligenza-Umana](https://github.com/Intelligenza-Umana), con profilo pubblico in `Intelligenza-Umana/.github/profile/README.md`.
- Scheda Notion «Portfolio personale» aggiornata con il riepilogo e verificata con data 26 novembre 2026.

### Verifiche e prossimi passi

- `git diff --check` passa. Test Angular non eseguiti; Prettier non è installato nell’ambiente.
- Tutte le modifiche restano locali e non committate, non inviate e non pubblicate.
- Resta aperta la domanda se aggiornare anche il CV, secondo la regola di `AGENTS.md`.

2026-11-26: Aggiornata la pagina Intelligenza Umana con fonti attuali della foundation `fabiozagaria/intelligenza-umana` e dell’organizzazione pubblica `Intelligenza-Umana`: quattro repository canonici pubblici MIT, Project Lifecycle Skill v0.3.0, IU Model Router v0.1.0, link a foundation, organizzazione, profilo e registro. Dati verificati nel README/registro e nel profilo GitHub; aggiornati anche i test della pagina e i documenti di progetto. Notion riallineato con una voce datata. Test Angular non eseguiti.

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
