# Portfolio Redesign Implementation Plan

**Goal:** Presentare Fabio come Junior Java / Full Stack Developer con prove tecniche reali e un percorso chiaro verso progetti, CV e contatti.
**Architecture:** Conservare Angular 21 standalone, OnPush, route lazy e dati tipizzati. Centralizzare i token nel CSS esistente e limitare la logica alla navigazione.
**Spec:** Brief utente e PRODUCT.md; direzione antracite/teal confermata in chat.

## Vincoli
Nessuna nuova dipendenza applicativa, nessun upgrade, nessun commit/push/deploy. Identificatori inglesi e testi italiani. Non promuovere obiettivi futuri a funzionalità implementate.

## Priorità e verifica
- [ ] P1: sistema visivo coerente, headline breve, progetto reale leggibile. File: styles.css, motion.css, home.component.html/css. Verifica screenshot desktop/tablet/mobile e leggibilità a 320px.
- [ ] P1: menu mobile come disclosure, ordine di tabulazione, Escape e ritorno focus, rimozione scroll lock. File: core/app.ts/html/spec.ts. Verifica test e tastiera in browser.
- [ ] P2: font locale, rimozione dipendenza esterna dalle icone, titoli e focus nelle route. File: index.html, angular.json, app.config.ts e template pertinenti. Verifica richieste browser e deep link ai progetti.
- [ ] P2: CV fedele ai documenti presenti, chiaro per recruiter, PDF testuale a una colonna con link cliccabili; modificare generatore e rigenerare PDF. Verifica estrazione testo, numero pagine e rendering.
- [ ] P3: review del diff, advisory npm, format check, test e build; riportare limiti OCR e misure locali senza attribuire Core Web Vitals reali.

## Rischi da controllare
Menu aperto durante resize o cambio route; email e titoli lunghi; tema chiaro e scuro; reduced motion; link e download; metadati e canonical per tutte le route. Gli advisory delle dipendenze richiedono un intervento distinto e verificato.
