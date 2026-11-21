# CV da rigenerare — prossimo passo urgente

Aggiornato: 21 novembre 2026.

**Il PDF pubblicato è fermo al 5 novembre 2026 e non rispecchia più il portfolio.** Rigenerarlo è il prossimo passo urgente: va fatto sul PC di Fabio, perché Career Ops non è disponibile negli ambienti cloud.

## Cosa c'è di sbagliato o mancante nel PDF attuale
- Cita MySQL come database di Expense Tracker e delle competenze principali: oggi è PostgreSQL (Neon) con Flyway.
- Non cita Testcontainers, GitHub Actions, rotazione dei refresh token e rate limiting di Expense Tracker.
- Mancano JobFlow e MedTransit tra i progetti.
- «Studio autonomo» dice PostgreSQL applicato solo in AccessDesk.

Il payload `portfolio-angular/scripts/cv-career-ops.json` è già aggiornato su tutti questi punti (PR #80 e #81): il lavoro che resta è generare il PDF.

## Passi
1. Aprire il repository sul PC, aggiornare `master` e leggere i passi 1–6 della sezione «Curriculum PDF — Career Ops» di `AGENTS.md` (installazione di Career Ops, template locale `scripts/cv-career-ops-template.html`, controlli ATS).
2. Generare il PDF A4 a una pagina con `--format=a4 --max-pages=1 --strict-pages`. Se quattro progetti non ci stanno, accorciare le descrizioni nel payload. Non togliere l'etichetta «In progettazione, nessun codice» di MedTransit e non sostituire «Previsti» con tecnologie presentate come usate.
3. Controllare il rendering e il testo estratto: nessun contenuto tagliato, dati fedeli alle fonti, link corretti, testo selezionabile.
4. Copiare il PDF in `portfolio-angular/src/assets/documents/CV.pdf`.
5. Registrare la versione: `npm run cv:meta -- AAAA-MM-GG` (la data in cui sono cambiati i contenuti; di solito oggi). `npm run test:ci` fallisce se PDF e `cv.data.ts` non coincidono.
6. **Repository del curriculum** (`curriculum-vitae-fabio-zagaria`): copiare lo stesso PDF in `Fabio_Zagaria_CV.pdf`, lanciare `scripts/archivia-cv.sh AAAA-MM-GG "nota"`, aggiungere la riga al `CHANGELOG.md`, committare e creare il tag `cv-AAAA-MM-GG`. I tag storici si creano con `scripts/crea-tag-cv.sh`.
7. Chiedere all'assistente di inviare il PDF come file da scaricare (per caricarlo, per esempio, su Drive) e di controllarlo.
8. Togliere dai documenti l'avviso «prossimo passo urgente» (README, `docs/CONTEXT.md`, `PRODUCT.md`, `AGENTS.md`, scheda Notion) e aggiornare la nota «Il PDF cita ancora MySQL».

## Regola fissa: quando si aggiorna il CV
Il CV si aggiorna ogni volta che cambia qualcosa di importante e visibile:
- nuova tecnologia, framework, linguaggio, specifica o strumento studiato davvero e dimostrabile (per esempio testing nuovo, un nuovo database, messaging);
- nuova funzionalità particolare o cambiamento importante in un progetto in evidenza;
- progetto nuovo, concluso o che cambia stato;
- correzione di un'informazione sbagliata.

Non serve per ritocchi minori. Le competenze solo pianificate restano fuori o marcate «Previsti».

Ogni volta che si modifica il portfolio per uno di questi motivi, l'assistente deve proporre: **«Vuoi aggiornare anche il CV?»**. Se la risposta è sì, nella stessa PR si aggiorna il payload e poi il PDF si rigenera come sopra. Nuovi fatti (titoli, date, livelli) vanno confermati dal proprietario. Ogni versione va sempre registrata anche nel repository del curriculum.
