# Istruzioni per assistenti AI

## Scopo
Questo repository contiene il portfolio professionale di Fabio Zagaria. È un progetto pubblico e deve riflettere soltanto competenze, progetti e informazioni realmente verificabili.

## Regole operative
- Leggere `README.md` e `docs/CONTEXT.md` prima di modifiche ampie.
- Non inventare competenze, risultati, versioni, disponibilità o stato dei progetti.
- Preferire modifiche piccole, verificabili e coerenti con il design e l'architettura esistenti.
- Prima di dichiarare completata una modifica tecnica, verificare build/test pertinenti quando disponibili.
- Non trasformare il portfolio in un laboratorio: gli esperimenti vanno nei repository dedicati.

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
2. Se manca, spiegare che l'installazione scarica software e dipendenze e ottenere autorizzazione. In una cartella di lavoro esterna al repository eseguire `npx @santifer/career-ops init`; seguire le istruzioni della versione installata. Usare Node.js compatibile con il suo `package.json`. Non aggiungere Career Ops o le sue dipendenze all'app Angular.
3. Partire dai contenuti verificati in `portfolio-angular/scripts/cv-career-ops.json`, dal CV corrente e dalle fonti del progetto. Preparare le fonti e il profilo richiesti dalla skill. Per una candidatura specifica usare l'annuncio reale; per il CV generale mantenere il focus Junior Java Backend Developer. Conservare titoli, date e livelli linguistici; confermare eventuali nuovi fatti con il proprietario.
4. Nella cartella di Career Ops risolvere il template con `node cv-templates.mjs resolve cv`. Generare l'HTML dal payload con `build-cv-html.mjs`, poi eseguire i controlli di titoli, struttura e fatti previsti dalla modalità `pdf`. Usare `verify-ats.mjs` per il controllo strutturale; dichiarare i limiti dei controlli automatici, soprattutto per i testi italiani.
5. Generare il PDF con `generate-pdf.mjs` nella directory consentita da Career Ops, usando A4 e una pagina (`--format=a4 --max-pages=1 --strict-pages`). Ispezionare il rendering ed estrarre il testo: nessun contenuto tagliato, dati fedeli alle fonti, link corretti e testo selezionabile.
6. Copiare il PDF verificato in `portfolio-angular/src/assets/documents/CV.pdf` e aggiornare il payload JSON insieme ai contenuti modificati. La build Angular distribuisce questo file sia in `/assets/documents/CV.pdf` sia in `/downloads/CV.pdf`: verificarne l'identità con il PDF sorgente dopo la build.

Il generatore Python precedente è stato rimosso. Non ricreare un generatore alternativo: il percorso di generazione del CV è Career Ops. Mantenere fuori dal repository installazione del tool, cache, tracker delle candidature e documenti privati. Commit, push e pubblicazione seguono le autorizzazioni esplicite dell'utente.
