# Istruzioni per assistenti AI

## Scopo
Questo repository contiene il portfolio professionale di Fabio Zagaria. È un progetto pubblico e deve riflettere soltanto competenze, progetti e informazioni realmente verificabili.

## Regole operative
- Il progetto full stack di gestione spese e il relativo sito/servizio si chiamano **Expense Tracker**. Usare sempre questa denominazione nei contenuti e nelle etichette; conservare gli URL e gli identificatori tecnici esistenti.
- Leggere `README.md` e `docs/CONTEXT.md` prima di modifiche ampie.
- Non inventare competenze, risultati, versioni, disponibilità o stato dei progetti.
- Preferire modifiche piccole, verificabili e coerenti con il design e l'architettura esistenti.
- Prima di dichiarare completata una modifica tecnica, verificare build/test pertinenti quando disponibili.
- Non trasformare il portfolio in un laboratorio: gli esperimenti vanno nei repository dedicati.
- **Il portfolio è concluso dal 21 novembre 2026.** Per scelta di Fabio, stile, sezioni e animazioni sono definitivi e non si ritoccano più. Non proporre redesign, nuovi effetti o rifiniture non richieste: intervenire solo per cambiamenti importanti chiesti da lui (per esempio un nuovo progetto, un dato che cambia, un errore reale). La scheda «Portfolio» nei dati dei progetti non ha storico dei commit né «ultimo aggiornamento», perché il portfolio non è un progetto con cronologia di rilasci.
- **Documentazione sempre allineata.** Ogni modifica a dati, schede, struttura o stile aggiorna nella stessa PR tutti i documenti che la riguardano: `README.md`, `docs/CONTEXT.md`, `structure-repo.md`, `PRODUCT.md`, `DESIGN.md`, questo file e la scheda Notion del portfolio. Se cambia una scheda di progetto, verificare anche README e contesto di quel progetto. Prima di dichiarare finito un lavoro, passare in rassegna l'elenco e dire per ciascun documento se è stato aggiornato o perché non serve.

- **Regola fissa: il CV segue il portfolio.** Dopo ogni modifica importante e visibile (nuova tecnologia, framework, linguaggio, specifica o strumento studiato e dimostrabile, testing nuovo, nuovo progetto o cambio di stato, funzionalità o cambiamento importante, correzione di un dato) chiedere sempre a Fabio: «Vuoi aggiornare anche il CV?». Se sì: aggiornare il payload nella stessa PR, far rigenerare il PDF con Career Ops (sul PC di Fabio), registrare la versione con `npm run cv:meta`, archiviarla nel repository `curriculum-vitae-fabio-zagaria` e consegnare il PDF come file da scaricare. Non serve per ritocchi minori. Dettagli in `docs/CV-DA-RIGENERARE.md`.

## Fonti di verità
- Il codice e la configurazione del repository sono la verità tecnica del portfolio.
- `README.md` è la presentazione pubblica.
- `docs/CONTEXT.md` riassume stato e priorità tecniche correnti.
- La roadmap didattica, i voti e i ripassi appartengono a Notion e non vanno duplicati qui.

## Sicurezza e privacy
Non inserire password, token, chiavi, credenziali, dati personali non necessari o informazioni private di studio.

## Curriculum PDF — Career Ops
Per creare, modificare o rigenerare il CV, usare la skill `career-ops` e il suo flusso `pdf`. Leggere il relativo `SKILL.md`, le istruzioni dell'installazione e gli script prima di eseguirli.

1. Individuare un'installazione completa di Career Ops: deve contenere `AGENTS.md`, `modes/`, `build-cv-html.mjs` e `generate-pdf.mjs`. La sola skill `SKILL.md` non include il generatore.
2. Se manca, spiegare che l'installazione scarica software e dipendenze e ottenere autorizzazione. In una cartella di lavoro esterna al repository eseguire `npx @santifer/career-ops init`; seguire le istruzioni della versione installata. **In un ambiente cloud** (senza il PC di Fabio) usare l'installazione fissata e la variabile del browser descritte in `docs/CV-DA-RIGENERARE.md`. Usare Node.js compatibile con il suo `package.json`. Non aggiungere Career Ops o le sue dipendenze all'app Angular.
3. Partire dai contenuti verificati in `portfolio-angular/scripts/cv-career-ops.json`, dal CV corrente e dalle fonti del progetto. Preparare le fonti e il profilo richiesti dalla skill. Per una candidatura specifica usare l'annuncio reale; per il CV generale mantenere il focus Junior Java Backend Developer. Conservare titoli, date e livelli linguistici; confermare eventuali nuovi fatti con il proprietario.
4. Usare come base il template risultante da `node cv-templates.mjs resolve cv`. Per questo CV, applicare l'estensione locale in `portfolio-angular/scripts/cv-career-ops-template.html` (template Career Ops originale con QR cliccabile al portfolio); passare quel file a `build-cv-html.mjs`. Eseguire i controlli di titoli, struttura e fatti previsti dalla modalità `pdf`, poi `verify-ats.mjs`; dichiarare i limiti dei controlli automatici, soprattutto per i testi italiani.
5. Generare il PDF con `generate-pdf.mjs` nella directory consentita da Career Ops, usando A4 e una pagina (`--format=a4 --max-pages=1 --strict-pages`). Ispezionare il rendering ed estrarre il testo: nessun contenuto tagliato, dati fedeli alle fonti, link corretti e testo selezionabile.
6. Copiare il PDF verificato in `portfolio-angular/src/assets/documents/CV.pdf` e aggiornare payload JSON e template locale quando cambiano contenuti o presentazione. La build Angular distribuisce questo file sia in `/assets/documents/CV.pdf` sia in `/downloads/CV.pdf`: verificarne l'identità con il PDF sorgente dopo la build.

7. Dopo la copia: eseguire `npm run cv:meta -- AAAA-MM-GG` (data in cui sono cambiati i contenuti; aggiorna `src/app/data/cv.data.ts`) e copiare lo stesso PDF nel repository `curriculum-vitae-fabio-zagaria` secondo le sue regole (archivio datato, CHANGELOG, tag). **Regola fondamentale: ogni aggiornamento del CV va sempre registrato in quel repository.** `npm run test:ci` fallisce se PDF e `cv.data.ts` non coincidono.

Il generatore Python precedente è stato rimosso. Non ricreare un generatore alternativo: il percorso di generazione del CV è Career Ops. Mantenere fuori dal repository installazione del tool, cache, tracker delle candidature e documenti privati. Commit, push e pubblicazione seguono le autorizzazioni esplicite dell'utente.
