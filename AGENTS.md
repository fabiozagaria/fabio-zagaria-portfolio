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
- **Il portfolio è concluso dal 21 novembre 2026.** Per scelta di Fabio, stile, sezioni e animazioni sono definitivi e non si ritoccano più. Non proporre redesign, nuovi effetti o rifiniture non richieste: intervenire solo per cambiamenti importanti chiesti da lui (per esempio un nuovo progetto, un dato che cambia, un errore reale). La scheda «Portfolio» nei dati dei progetti non ha storico dei commit né «ultimo aggiornamento», perché il portfolio non è un progetto con cronologia di rilasci. Eccezione chiesta da Fabio il 25 novembre 2026: la pagina «Intelligenza Umana», con voce nel menu e rotta `/intelligenza-umana`, presenta solo contenuti del laboratorio e il suo logo; i link esterni sono ai quattro repository pubblici canonici, alla foundation pubblica, al profilo e registro dell’organizzazione GitHub e al sito https://intelligenza-umana-web.vercel.app/. Non collegare repository privati.
- Aggiornamento richiesto da Fabio il 27 novembre 2026: la pagina «Intelligenza Umana» può includere anche il link diretto al server Discord ufficiale https://discord.gg/Zt85ZYEXAA. Usare il simbolo Discord ufficiale non modificato e registrare la fonte in `docs/ASSET-SOURCES.md`.
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
2. Se manca, spiegare che l’installazione scarica software e dipendenze e ottenere autorizzazione. Usare `npm run cv:install` da `portfolio-angular` per la versione fissata nella cartella locale ignorata `.career-ops/`. La procedura cloud e l’opzione per un’installazione esterna sono descritte in `docs/CV-DA-RIGENERARE.md`. Usare Node.js compatibile con il suo `package.json`. Non aggiungere Career Ops o le sue dipendenze all'app Angular.
3. Partire dai contenuti verificati nei payload `portfolio-angular/scripts/cv-career-ops.json` (italiano) e `cv-career-ops.en.json` (inglese), dal CV corrente e dalle fonti del progetto. Preparare le fonti e il profilo richiesti dalla skill. Per una candidatura specifica usare l'annuncio reale; per il CV generale mantenere il focus Junior Java Backend Developer. Conservare titoli, date e livelli linguistici; confermare eventuali nuovi fatti con il proprietario.
4. Usare come base il template risultante da `node cv-templates.mjs resolve cv`. Per questo CV, applicare l'estensione locale in `portfolio-angular/scripts/cv-career-ops-template.html` (template Career Ops originale con QR cliccabile al portfolio); passare quel file a `build-cv-html.mjs`. Eseguire i controlli di titoli, struttura e fatti previsti dalla modalità `pdf`, poi `verify-ats.mjs`; dichiarare i limiti dei controlli automatici, soprattutto per i testi italiani.
5. Generare il PDF con `generate-pdf.mjs` nella directory consentita da Career Ops, usando A4 e una pagina (`--format=a4 --max-pages=1 --strict-pages`). Ispezionare il rendering ed estrarre il testo: nessun contenuto tagliato, dati fedeli alle fonti, link corretti e testo selezionabile.
6. Copiare il PDF verificato in `portfolio-angular/src/assets/documents/CV.pdf` (italiano) o `CV-en.pdf` (inglese). Aggiornare il payload corrispondente e il template quando cambiano contenuti o presentazione. Verificare le copie della build in `/assets/documents/` e `/downloads/`.

7. Dopo la copia: eseguire `npm run cv:meta -- AAAA-MM-GG it` oppure `npm run cv:meta -- AAAA-MM-GG en` (data in cui sono cambiati i contenuti; aggiorna `src/app/data/cv.data.ts`) e copiare lo stesso PDF nel repository `curriculum-vitae-fabio-zagaria` secondo le sue regole (archivio datato, CHANGELOG, tag). **Regola fondamentale: ogni aggiornamento del CV va sempre registrato in quel repository.** `npm run test:ci` fallisce se PDF e `cv.data.ts` non coincidono.

Il generatore Python precedente è stato rimosso. Non ricreare un generatore alternativo: il percorso di generazione del CV è Career Ops. Escludere dai file versionati installazione del tool, cache, tracker delle candidature e documenti privati. Commit, push e pubblicazione seguono le autorizzazioni esplicite dell'utente.

## Project Lifecycle — integrità del contesto
Prima di modificare, inventaria struttura e stato Git, leggi README, HANDOFF, docs/CONTEXT.md e docs/DOCUMENTATION_MAP.md; individua fonti e impatto. Preserva regole locali, verifica codice e documenti, segnala conflitti e blocchi. Aggiorna contestualmente le fonti obsolete e registra quelle invariate; applica docs/DEFINITION_OF_DONE.md. Aggiorna HANDOFF dopo sessioni significative. Nessun redesign implicito, nessuna pubblicazione o push senza autorizzazione. Le regole locali sono autosufficienti.

Eccezione approvata il 25 novembre: aggiornamento delle sole etichette del menu (Profilo professionale, Percorso professionale, Progetti software), senza cambiare URL, stile o contenuti.


Eccezione richiesta da Fabio il 26 novembre 2026. Il portfolio passa a italiano e inglese con bandiere nell’header. Il profilo professionale mostra i marchi dello stack su due righe animate, con pausa e movimento ridotto. Quando si modificano testi o dati visibili, allineare i cataloghi `src/app/core/locales` e conservare la lingua originale dei materiali collegati.

Il 26 novembre 2026 Fabio ha chiesto un pulsante primario dedicato al sito di Intelligenza Umana in «A Che Punto È», maiuscole iniziali nella pagina e il nome visibile «Model Router». Ha verificato i test di Project Lifecycle Skill e ne ha confermato il funzionamento.

Eccezione richiesta da Fabio il 28 novembre 2026. Nuova rotta `/gioco` con la pagina «Idle Project Blackhole» (nome provvisorio, dichiarato anche nella voce di menu), che racconta il gioco idle per Android che Fabio sta costruendo in Godot. Solo questa pagina ha uno stile 8/16 bit con palette e font propri (Press Start 2P e VT323, in locale); il resto del sito non cambia. Il repository del gioco è privato: non va citato né collegato. Raccontare soltanto ciò che esiste nel codice del gioco, con lo stato dichiarato (in sviluppo, non ancora in alfa, non provabile); non rivelare le funzioni segrete e non presentare come esistenti quelle solo pianificate. L'illustrazione della stella non è una schermata del gioco e lo dichiara.
