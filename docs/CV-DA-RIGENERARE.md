# Rigenerare il CV

Aggiornato il 26 novembre 2026.

I CV si rigenerano con Career Ops dai payload italiano e inglese in `portfolio-angular/scripts/`. Si può fare sul PC di Fabio o in un ambiente cloud, anche con il PC spento. Entrambe le edizioni del 26 novembre 2026 sono state rigenerate nel cloud. Le impronte registrate in `cv.data.ts` iniziano con `7ad2e54a` (italiano) e `6bd3b383` (inglese).

## Regola fissa: quando si aggiorna il CV
Il CV si aggiorna ogni volta che cambia qualcosa di importante e visibile:
- nuova tecnologia, framework, linguaggio, specifica o strumento studiato davvero e dimostrabile (per esempio testing nuovo, un nuovo database, messaging);
- nuova funzionalità particolare o cambiamento importante in un progetto in evidenza;
- progetto nuovo, concluso o che cambia stato;
- correzione di un'informazione sbagliata.

Non serve per ritocchi minori. Le competenze solo pianificate restano fuori o marcate «Previsti». Ogni volta che si modifica il portfolio per uno di questi motivi, l'assistente deve proporre: **«Vuoi aggiornare anche il CV?»**. Nuovi fatti (titoli, date, livelli) vanno confermati dal proprietario. Ogni versione va registrata anche nel repository del curriculum.

## Installazione

Da `portfolio-angular` eseguire `npm run cv:install`. Servono Git e Node 22.13+ (oppure 23.4+). Il comando installa Career Ops 1.40.0 al commit `dee72e073c26ff67b4cc946e7f0e3ef030b79de5` in `.career-ops/`, una cartella locale ignorata da Git. Le dipendenze e Chromium Headless Shell di Playwright sono isolati da Angular. Una copia esterna è possibile eseguendo Git alla stessa revisione e installando le dipendenze e il browser con Playwright.

## Generazione

Per l’inglese, da `portfolio-angular` in Bash:

```bash
cd .career-ops
export PLAYWRIGHT_BROWSERS_PATH=0
node cv-templates.mjs resolve cv
node build-cv-html.mjs ../scripts/cv-career-ops.en.json output/CV-en.html ../scripts/cv-career-ops-template.html
node verify-ats.mjs output/CV-en.html
node generate-pdf.mjs output/CV-en.html output/CV-en.pdf --format=a4 --max-pages=1 --strict-pages
```

Per l’italiano usare `../scripts/cv-career-ops.json`, `output/CV.html` e `output/CV.pdf`. Il template con QR è condiviso. Su macchine con un Chromium locale adatto si può impostare `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` anche per l’installazione. In un cloud dove il browser di sistema blocca la lettura di HTML locale, usare il browser installato da Playwright.

- `--strict-pages` rifiuta i PDF oltre una pagina e conserva un’anteprima `.overflow.pdf`.
- Il controllo automatico di struttura e fatti contro `cv.md` richiede una sorgente Career Ops separata. Nel cloud confrontare i contenuti con il payload verificato e con il PDF di riferimento.
- Controllare visivamente il layout, estrarre il testo e verificare i link, il formato A4 e la pagina singola. Il 26 novembre il CV inglese ha ottenuto 90/100 nel controllo ATS. Le segnalazioni riguardano il posizionamento del QR e un controllo euristico sul testo nascosto nel template.

## Dopo la generazione

1. Copiare il PDF verificato in `portfolio-angular/src/assets/documents/CV.pdf` per l’italiano o `CV-en.pdf` per l’inglese.
2. Eseguire `npm run cv:meta -- AAAA-MM-GG it` o `npm run cv:meta -- AAAA-MM-GG en`. La data è quella dei contenuti. `npm run cv:check` controlla entrambe le impronte durante `npm run test:ci`.
3. Eseguire la build, ad esempio `npm run build -- --output-path /tmp/portfolio-cv-check`. Confrontare i PDF copiati in `/assets/documents/` e `/downloads/` con i sorgenti.
4. Nel repository `curriculum-vitae-fabio-zagaria`, copiare lo stesso file in `Fabio_Zagaria_CV.pdf` o `Fabio_Zagaria_CV_EN.pdf`. Eseguire `scripts/archivia-cv.sh AAAA-MM-GG "nota" it` o `scripts/archivia-cv.sh AAAA-MM-GG "nota" en`, aggiornare il CHANGELOG e preparare il tag `cv-AAAA-MM-GG` sul commit che introduce il PDF. Commit, push e pubblicazione seguono le autorizzazioni del proprietario.
5. Consegnare il PDF a Fabio. Aggiornare README, contesto e la scheda Notion se autorizzata.
