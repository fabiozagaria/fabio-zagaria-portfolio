---
name: Fabio Zagaria Portfolio
description: Portfolio tecnico minimale antracite e teal
colors:
  primary: "#82dfbd"
  primary-hover: "#a6ecd1"
  ground: "#101917"
  surface: "#192622"
  ink: "#edf2ea"
  muted: "#b4c8bc"
  button-ink: "#10291f"
  light-ground: "#f4f6f3"
  light-primary: "#006e5a"
typography:
  display:
    fontFamily: "Space Grotesk, Segoe UI, sans-serif"
    fontSize: "clamp(3.4rem, 7vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Space Grotesk, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  sm: "0.25rem"
  md: "0.75rem"
spacing:
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.sm}"
    padding: "0.875rem 1.5rem"
---
# Design System: Fabio Zagaria

## Overview
Portfolio tecnico minimale e raffinato, come richiesto e confermato in chat. Nome, ruolo e lavoro reale hanno priorità. La descrizione del sistema deriva dal CSS implementato.

## Colors
Accento teal su fondo antracite con tinta verde. Il tema chiaro usa fondo chiaro e teal scuro. Le variabili autorevoli e tutte le varianti sono in portfolio-angular/src/styles.css.

## Typography
Space Grotesk locale WOFF2 con font-display swap, condivisa da titoli e corpo. Corpo 17px, informazioni secondarie almeno 14px. Monospace soltanto per codice letterale. Titoli bilanciati, tracking non inferiore a -0.04em.

## Layout
Container massimo 1248px e padding clamp(1.25rem, 4vw, 4rem). Header 5rem. Breakpoint 60em, 48em e 30em. Le colonne diventano singole su smartphone. Identità iniziale, prova del progetto e elenco dei backend hanno composizioni distinte.

## Elevation & Depth
Superfici piatte e separazione tonale; nessun bagliore o ombra decorativa a riposo.

## Shapes
Azioni con raggio 4px; superfici di lettura con raggio 12px. Nessun bordo laterale decorativo.

## Components
Pulsanti alti almeno 48px. Navigazione e toggle almeno 44px; focus con outline teal di 3px e offset 5px. Menu mobile disclosure nello stesso ordine del DOM, Escape ripristina il focus, scorrimento interno nei viewport bassi. Schede con titolo prima di focus e stato. Transizioni route 120/220ms, disattivate con reduced motion.

## Do's and Don'ts
Conservare contenuti reali, stato dei progetti, gerarchia semantica, focus e contrasto. Evitare eyebrow decorative, gradienti, icone senza etichetta, animazioni continue e competenze inventate. Non aggiungere immagini o video solo per soddisfare un detector stilistico.
