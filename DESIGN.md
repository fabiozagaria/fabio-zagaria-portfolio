---
name: Fabio Zagaria Portfolio
description: Portfolio «Cielo dipinto», calmo e tenue, con palette Calm acqua e salvia
colors:
  page: "#f2f6f5"
  surface: "#ffffff"
  ink: "#1f3a3d"
  body: "#46605f"
  muted: "#5b7478"
  accent: "#2f7d84"
  accent-strong: "#22616a"
  on-accent: "#ffffff"
  dark-page: "#0f1a1c"
  dark-surface: "#162427"
  dark-ink: "#e4efed"
  dark-accent: "#7cc4c0"
typography:
  display:
    fontFamily: "Nunito Variable, Nunito, system-ui, sans-serif"
    fontSize: "clamp(3.6rem, 12vw, 9.5rem)"
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Nunito Variable, Nunito, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  sm: "11px"
  md: "14px"
  lg: "18px"
  card: "28px"
  pill: "999px"
spacing:
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.6rem"
---
# Design System: Fabio Zagaria — «Cielo dipinto»

## Overview
Stile scelto dal proprietario il 20 novembre 2026: usare il sito deve dare la sensazione di toccare delle nuvole, qualcosa di morbido, calmo e rilassante, con molto movimento ma mai nervoso. Contenuti, sezioni, schede e route sono quelli di prima: è cambiato solo lo stile. Design approvato in `docs/superpowers/specs/2026-11-20-cielo-dipinto-redesign-design.md`. La descrizione deriva dal CSS implementato.

## Colors
Token `--calm-*` del Calm theme (repository `fabiozagaria/turni-elisa`, `docs/calm-theme/calm-theme.css`, commit `02d4ba1`), tema chiaro e scuro, in `portfolio-angular/src/styles.css`. I token storici del portfolio (`--clr-*`, `--card`, `--ff-*`, `--radius-*`) mantengono il nome e puntano ai `--calm-*`: per cambiare un colore si cambia il token Calm. Il testo colorato usa `--calm-accent-strong`, perché `--calm-accent` sul fondo chiaro non raggiunge il contrasto AA; `--calm-accent` resta per i pulsanti con `--calm-on-accent`.

## Typography
Solo Nunito variabile, servito in locale da `@fontsource-variable/nunito`. Titoli h1/h2 in peso 300 con tracking negativo, h3/h4 in 650, corpo a 400. Il nome nell'hero diventa lentamente più corposo al passaggio del mouse. Niente testo trasformato in maiuscolo; monospace solo per codice e versioni.

## Layout
Container massimo 1248px e padding clamp(1.25rem, 4vw, 4rem). Navigazione sospesa a pillola, staccata dai bordi, semitrasparente con sfocatura. Breakpoint 60em, 48em, 30em e 860px per l'hero. La griglia dei progetti usa `minmax(0, 1fr)`. Smartphone e desktop hanno gli stessi effetti; cambia solo la disposizione.

## Elevation & Depth
Profondità data da ombre ampie e trasparenti (`--calm-shadow-sm` a riposo, `--calm-shadow-md` sollevate), non da bordi. Schede, pannello dell'hero e navigazione sono superfici chiare sopra il fondo; nessun filetto decorativo.

## Shapes
Raggi Calm 11/14/18px per controlli e superfici interne, 28px per schede, pannello dell'hero e navigazione, pillola per pulsanti, chip e badge.

## Motion
- **Cielo** (`SkyComponent`, effetto `painterly-landscape` del kit Taste Skill): sfondo vivo e lentissimo dell'hero, fascia più tenue dietro il titolo delle altre pagine; pulsante «Ferma il cielo»; fermo fuori schermo; immagine ferma con reduced motion; immagine di riserva senza WebGL.
- **Luce** (`SkyLightDirective`): segue mouse e dito sull'hero con un ritardo morbido e torna a riposo; non blocca lo scroll.
- **Frase che si illumina** (`word-highlight`): un solo paragrafo della home, dal grigio all'inchiostro mentre si scorre.
- **Una volta al caricamento**: entrata dell'hero (circa 1,1 s) e salita dei titoli di pagina.
- **Risposta a un'azione**: schede che si sollevano di 4px e si abbassano al tocco, pulsanti che si premono (scale 0,97), sottolineature che si disegnano, screenshot con zoom 1,02, «Implementazioni importanti» che si apre con altezza animata, badge «Novità» che respira per tre cicli, cambio tema graduale.
- **Cambio pagina**: View Transitions 240/480ms; la scheda di Expense Tracker si trasforma tra Home e Progetti.
- Easing `--calm-ease` (cubic-bezier(.23, 1, .32, 1)), risposte 160–500ms, movimenti di sfondo con cicli di decine di secondi. Hover solo con `(hover: hover) and (pointer: fine)`.

## Components
Pulsanti alti almeno 48px, a pillola. Navigazione e toggle almeno 44px; focus con outline di 3px nel colore `--calm-focus`. Menu mobile disclosure nello stesso ordine del DOM, Escape ripristina il focus. Schede con titolo prima di focus e stato. «Stato reale» mostra una sintesi breve e l'elenco «Cosa manca». «Implementazioni importanti» è un elemento details/summary alto almeno 44px.

## Do's and Don'ts
Conservare contenuti reali, stato dei progetti, gerarchia semantica, focus e contrasto AA. Ammessi: movimento d'ambiente lento con pausa, risposte morbide a ogni azione, gradienti tenui nel cielo. Vietati: testo che si muove con lo scroll, parallasse, reveal che nascondono contenuti finché non si scorre, scroll dirottato o ammorbidito via script, rimbalzi, lampeggi, movimento oltre 5 secondi senza pausa. Non modificare i file del kit in `src/assets/vendor/taste-skill/`: si sostituiscono con una nuova versione.
