# Rigenerare il CV

Aggiornato: 21 novembre 2026.

Il CV si rigenera con Career Ops a partire dal payload `portfolio-angular/scripts/cv-career-ops.json`. Si può fare sul PC di Fabio o in un ambiente cloud, anche con il PC spento. Il 21 novembre 2026 il PDF è stato rigenerato nel cloud (`cv.data.ts`: 2026-11-21, sha256 `8915cc58`).

## Regola fissa: quando si aggiorna il CV
Il CV si aggiorna ogni volta che cambia qualcosa di importante e visibile:
- nuova tecnologia, framework, linguaggio, specifica o strumento studiato davvero e dimostrabile (per esempio testing nuovo, un nuovo database, messaging);
- nuova funzionalità particolare o cambiamento importante in un progetto in evidenza;
- progetto nuovo, concluso o che cambia stato;
- correzione di un'informazione sbagliata.

Non serve per ritocchi minori. Le competenze solo pianificate restano fuori o marcate «Previsti». Ogni volta che si modifica il portfolio per uno di questi motivi, l'assistente deve proporre: **«Vuoi aggiornare anche il CV?»**. Nuovi fatti (titoli, date, livelli) vanno confermati dal proprietario. Ogni versione va registrata anche nel repository del curriculum.

## Procedura nel cloud (verificata il 21 novembre 2026)
Servono Node 22.13 o superiore, git e un Chromium. Tutto in una cartella **fuori dal repository**.

```bash
W=/tmp/career-ops-cv && mkdir -p $W/career-ops && cd $W/career-ops
git init -q && git remote add origin https://github.com/career-ops-hq/career-ops.git
git fetch -q --depth=1 origin dee72e073c26ff67b4cc946e7f0e3ef030b79de5   # versione 1.40.0 verificata
git checkout -q FETCH_HEAD && npm install --silent
export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium     # il Chromium già presente
P=<repo>/portfolio-angular/scripts
node build-cv-html.mjs $P/cv-career-ops.json output/CV.html $P/cv-career-ops-template.html
node verify-ats.mjs output/CV.html
node generate-pdf.mjs output/CV.html output/CV.pdf --format=a4 --max-pages=1 --strict-pages
```

- Il commit è fissato perché `npx @santifer/career-ops init` clona la versione più recente (qui «main, unreleased»): un aggiornamento di Career Ops potrebbe cambiare il rendering. Cambiare commit solo dopo aver ripetuto il confronto sotto.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` serve perché Playwright cerca una versione di Chromium diversa da quella installata. È la variabile prevista da Career Ops.
- `--strict-pages` rifiuta il PDF se supera una pagina e scrive la bozza rifiutata in `output/CV.overflow.pdf`.
- Il controllo dei fatti di Career Ops non gira: richiede un `cv.md` che nel cloud non esiste. I fatti si controllano contro il portfolio e i repository, e la revisione resta a Fabio.
- **Verifica di equivalenza del 21 novembre 2026:** rigenerando il payload precedente (commit `d8721dc`) il PDF cloud aveva lo stesso testo e **0 pixel diversi** rispetto al PDF pubblicato (render a 100 dpi). Ripetere il confronto quando si cambia Career Ops o il Chromium.
- Punteggio ATS di `verify-ats.mjs`: 86/100, uguale al CV precedente (avvisi: elemento posizionato in modo assoluto, il QR, e testo nascosto).

## Dopo la generazione
1. Copiare il PDF in `portfolio-angular/src/assets/documents/CV.pdf`.
2. `npm run cv:meta -- AAAA-MM-GG` (la data in cui sono cambiati i contenuti). `npm run test:ci` fallisce se PDF e `cv.data.ts` non coincidono.
3. Dopo `npm run build`, verificare che `/assets/documents/CV.pdf` e `/downloads/CV.pdf` siano identici al sorgente, poi ripristinare `dist/` (`git checkout -- portfolio-angular/dist; git clean -fd portfolio-angular/dist`).
4. **Repository del curriculum:** copiare lo stesso PDF in `Fabio_Zagaria_CV.pdf`, lanciare `scripts/archivia-cv.sh AAAA-MM-GG "nota"`, aggiungere la riga al `CHANGELOG.md`, creare il tag `cv-AAAA-MM-GG` (dal cloud i tag non si pubblicano: li crea Fabio).
5. Consegnare il PDF a Fabio come file da scaricare.
6. Aggiornare README, `docs/CONTEXT.md`, la scheda Notion e, se serve, le altre schede.
