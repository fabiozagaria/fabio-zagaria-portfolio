---
name: Fabio Zagaria Portfolio
description: Portfolio «Cielo dipinto», calmo e tenue, palette Calm acqua e salvia, cielo stellato di notte e sole di giorno
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
Stile scelto dal proprietario il 20 novembre 2026: usare il sito deve dare la sensazione di toccare delle nuvole, qualcosa di morbido, calmo e rilassante, con molto movimento ma mai nervoso. Contenuti, sezioni, schede e route sono quelli di prima: è cambiato solo lo stile. Design approvato in `docs/superpowers/specs/2026-11-20-cielo-dipinto-redesign-design.md`. Definitivo dal 21 novembre 2026: il portfolio è concluso e lo stile non si cambia, salvo cambiamenti importanti. La descrizione deriva dal CSS implementato.

## Colors
Token `--calm-*` del Calm theme (repository `fabiozagaria/turni-elisa`, `docs/calm-theme/calm-theme.css`, commit `02d4ba1`), tema chiaro e scuro, in `portfolio-angular/src/styles.css`. I token storici del portfolio (`--clr-*`, `--card`, `--ff-*`, `--radius-*`) mantengono il nome e puntano ai `--calm-*`: per cambiare un colore si cambia il token Calm. Il testo colorato usa `--calm-accent-strong`, perché `--calm-accent` sul fondo chiaro non raggiunge il contrasto AA; `--calm-accent` resta per i pulsanti con `--calm-on-accent`.

## Typography
Solo Nunito variabile, servito in locale da `@fontsource-variable/nunito`. Titoli h1/h2 in peso 300 con tracking negativo, h3/h4 in 650, corpo a 400. Il nome nell'hero diventa lentamente più corposo al passaggio del mouse. Niente testo trasformato in maiuscolo; monospace solo per codice e versioni.

## Layout
Container massimo 1248px e padding clamp(1.25rem, 4vw, 4rem). Navigazione sospesa a pillola, staccata dai bordi, semitrasparente con sfocatura. Breakpoint 60em, 56em per il menu, 48em, 30em e 860px per l'hero. La griglia dei progetti usa `minmax(0, 1fr)`. Smartphone e desktop hanno gli stessi effetti; cambia solo la disposizione.

La pagina Progetti offre un indice delle quattro sezioni curate in un pannello flessibile con link a pillola. Un link fisso in basso a destra riporta all’indice; usa i token tema, rispetta l’area sicura dello schermo e compare solo in questa pagina. Gli ancoraggi usano i fragment di Angular e hanno margine rispetto alla navigazione superiore.

## Elevation & Depth
Profondità data da ombre ampie e trasparenti (`--calm-shadow-sm` a riposo, `--calm-shadow-md` sollevate), non da bordi. Schede, pannello dell'hero e navigazione sono superfici chiare sopra il fondo; nessun filetto decorativo.

## Shapes
Raggi Calm 11/14/18px per controlli e superfici interne, 28px per schede, pannello dell'hero e navigazione, pillola per pulsanti, chip e badge.

## Motion
- **Lingua e stack**. Le bandiere Italia e Stati Uniti occupano due pulsanti da 44 px nell’header, accanto al tema. Lo stato premuto evidenzia la lingua corrente. Nel profilo i loghi scorrono in due righe con direzioni opposte. La pausa e `prefers-reduced-motion` dispongono i loghi con i nomi in righe statiche a capo.
- **Cielo** (`SkyComponent` con il motore `sky-engine.ts`, canvas 2D del progetto): di notte, cioè col tema scuro, stelle a più profondità che brillano e ruotano piano, nebulosa tenue, una galassia a spirale e una lontana che ruotano, un pianeta con gli anelli e una luna, stelle cadenti rare; di giorno, col tema chiaro, solo il sole con un alone che respira e nuvole morbide che scorrono. Nell'hero il cielo completo, nelle altre pagine una fascia più bassa dietro il titolo. Pulsante «Ferma il cielo»; fermo fuori schermo e a scheda nascosta, circa 30 fotogrammi al secondo mentre deriva soltanto (60 durante la transizione o dopo un movimento del puntatore); immagine ferma con reduced motion.
- **Costellazioni**: il puntatore o il dito accende le stelle vicine e le unisce con linee sottili; pianeti, galassie, sole e nuvole si spostano appena, a profondità diverse. Ascoltatori passivi: lo scroll non viene mai bloccato.
- **Notte e giorno**: al cambio tema i due cieli si sfumano in circa 2,5 s (il sole sorge e il pianeta tramonta, o il contrario); sfondi della pagina in 2 s, testi in 0,9 s per restare leggibili; istantaneo con reduced motion.
- **Frase che si illumina** (`WordHighlightDirective`): un solo paragrafo della home, dal grigio all'inchiostro mentre si scorre; cambiano solo i colori.
- **Una volta al caricamento**: entrata dell'hero (circa 1,1 s) e salita dei titoli di pagina.
- **Risposta a un'azione**: schede che si sollevano di 4px e si abbassano al tocco, pulsanti che si premono (scale 0,97), sottolineature che si disegnano, screenshot con zoom 1,02, «Implementazioni importanti» che si apre con altezza animata, badge «Novità» che respira per tre cicli, cambio tema graduale.
- **Cambio pagina**: View Transitions 240/480ms; la scheda di Expense Tracker si trasforma tra Home e Progetti.
- Easing `--calm-ease` (cubic-bezier(.23, 1, .32, 1)), risposte 160–500ms, movimenti di sfondo con cicli di decine di secondi. Hover solo con `(hover: hover) and (pointer: fine)`.

## Components
Pulsanti alti almeno 48px, a pillola. Navigazione (compreso il logo), toggle e link accanto ai pulsanti almeno 44px; gli stati hover compaiono solo con puntatore preciso (`@media (hover: hover) and (pointer: fine)`); focus con outline di 3px nel colore `--calm-focus`. Menu mobile disclosure nello stesso ordine del DOM, Escape ripristina il focus. Schede con titolo prima di focus e stato. «Stato reale» mostra una sintesi breve e l'elenco «Cosa manca». «Implementazioni importanti» è un elemento details/summary alto almeno 44px. Il video della scheda di Expense Tracker è verticale (9:16), largo al massimo 17rem, con raggio Calm 18px e ombra `--calm-shadow-md`; mai in riproduzione automatica, con i comandi del browser, e affiancato (o sotto, su schermi stretti) dal testo che lo riassume e dichiara lo strumento con cui è stato creato. Sotto il video, la scheda mostra anche l'infografica del flusso API, alta e stretta, larga al massimo 20rem, con lo stesso raggio e la stessa ombra: si apre intera in una nuova scheda e le sue cinque tappe sono una lista ordinata accanto, che dichiara lo strumento con cui è stata creata. La pagina Contatti va dall'azione al dettaglio: frase di disponibilità, due azioni affiancate (primaria «Scrivimi una email», secondaria «Apri il CV»), indirizzo con «Copia», poi le schede dei profili LinkedIn e GitHub con la stessa superficie delle schede dei documenti (contenuto allineato in alto, titolo piccolo in grigio, ritratto tondo di 5rem solo su LinkedIn) e infine i documenti in tre colonne con pulsanti secondari, per non competere con le azioni principali. Sotto le azioni, in piccolo e in grigio, «CV aggiornato il …» (stessa dicitura sotto «Scarica il CV» nell'hero della Home): un selezionatore vede subito quanto è fresco il documento. Nessun canale compare due volte nella pagina. In fondo, «Post in evidenza»: i post di LinkedIn nel loro riquadro (504px al massimo, raggio Calm, ombra morbida) con il collegamento per aprirli. Contenuti di terze parti non si caricano mai all'apertura della pagina: solo dopo un gesto esplicito del visitatore o quando il contenuto sta per entrare nella finestra.

## Do's and Don'ts
Conservare contenuti reali, stato dei progetti, gerarchia semantica, focus e contrasto AA. Ammessi: movimento d'ambiente lento con pausa, risposte morbide a ogni azione, gradienti tenui nel cielo, il cielo stellato e il sole disegnati nel canvas. Vietati: testo che si muove con lo scroll, parallasse, reveal che nascondono contenuti finché non si scorre, scroll dirottato o ammorbidito via script, rimbalzi, lampeggi, movimento oltre 5 secondi senza pausa.

- **Pagina «Intelligenza Umana» (25 novembre 2026)**: voce nel menu e pagina a parte con intestazione come le altre pagine; il logo orizzontale sta su un riquadro avorio dello stesso colore del suo sfondo, per leggersi in tema chiaro e scuro. I collegamenti ai repository, alla foundation e al profilo GitHub si aprono in una nuova scheda. Il sito ufficiale ha un pulsante primario dedicato in «A Che Punto È»; il link Discord, con il simbolo ufficiale non modificato, è nella stessa fila di collegamenti. Titoli con maiuscole iniziali e schede con descrizioni che iniziano con la maiuscola. Nessuna animazione nuova.

- **Ritmo e leggibilità (26 novembre 2026, su richiesta di Fabio)**: pagina Progetti con stacchi regolari (scala `--space-*`), blocchi interni delle schede separati da filetti sottili, video e infografica allineati (18rem). Pagina «Intelligenza Umana» con i quattro blocchi introduttivi e i quattro strumenti in schede a due colonne (una sola su schermi stretti), link in pillole con spazio tra loro. Home: ritratto tondo nella scheda dell’hero e, sotto la presentazione, la motivazione nella lingua del sito (testo originale inglese da `docs/MOTIVATION.md` di Intelligenza Umana), in Nunito leggero tra virgolette grandi; nessuna animazione nuova.

- **Progetti in due livelli (26 novembre 2026, su richiesta di Fabio)**: l'elenco mostra card brevi (titolo, stato, versioni, una sola anteprima alta al massimo 15rem, descrizione, tecnologie, pulsante «Apri i dettagli»); la scheda completa vive nella pagina `/projects/<id>`, con un solo h1, il collegamento «Tutti i progetti» che riporta alla sezione giusta, video, infografica, scelte tecniche, stato reale, ultimo aggiornamento e storico. Le tecnologie sono pillole tonali (`--calm-accent` all'11%, testo `--calm-ink`, 500, senza maiuscole). «Ultimo aggiornamento» è un pannello morbido con righe separate da filetti: chip tonale per il tipo, versione in grigio, messaggio del commit in Nunito semibold e hash discreto in monospazio. Nell'header il monogramma «FZ» è sostituito dal ritratto (`io-nav-96.webp`, 96×96 ritagliato sul volto).

- **Discesa morbida (26 novembre 2026, su richiesta di Fabio)**: all'apertura di una pagina e quando entrano nello schermo, i blocchi compaiono con dissolvenza e scendono di 14px al loro posto in circa 1,3 secondi (easing `--calm-ease`), uno dopo l'altro a intervalli di 110ms (al massimo sei scaglioni all'apertura, quattro durante lo scroll). È un'animazione CSS (`soft-descend` in `src/motion.css`) che parte da sola, senza lampi al primo disegno; `SoftDescendService` mette in pausa solo i blocchi sotto la parte visibile e li fa ripartire quando entrano. Con «riduci movimento», in stampa o senza `IntersectionObserver` tutto resta fermo e visibile. L'elenco dei blocchi in `motion.css` e `SOFT_DESCEND_SELECTOR` deve restare identico. Cambia la regola precedente «nulla si muove con lo scroll», per scelta di Fabio.
- **Colori (26 novembre 2026, su richiesta di Fabio)**: tema chiaro senza bianco puro (sfondo `#ebf0ee`, superfici `#f6f9f8`, grigio secondario `#52696d` per mantenere il contrasto, nuvole del cielo più morbide). Tema scuro con accento meno acceso (`#66afac`), etichette delle versioni tonali invece di pastelli pieni e passi del diagramma di flusso con angoli morbidi e bordi discreti.

- **Testi più leggibili (26 novembre 2026, su richiesta di Fabio, ispirata in piccolo al portfolio di Vasile Zanogea)**: interlinea 1,7, righe di al massimo 66 caratteri nei testi lunghi, a capo ordinato (`text-wrap: pretty` nei paragrafi e `balance` nei titoli), **grassetto** (700, colore `--calm-accent-strong`) sulle parole chiave (ruolo, tecnologie, esiti) e *corsivo* (Nunito italic, caricato da `@fontsource-variable/nunito/wght-italic.css`) per sfumature, limiti e «cosa manca». Nei dati dei progetti le enfasi si scrivono con `{b}…{/b}` e `{i}…{/i}`: `RichTextPipe` (`shared/rich-text/`) le trasforma dopo aver reso innocuo il resto del testo; `plainText()` le toglie per i metadati SEO. Il carattere resta Nunito, non cambiano titoli né palette.
- **Pagina «Idle Project Blackhole» (28 novembre 2026, su richiesta di Fabio)**: unica eccezione allo stile Calm. Stile 8/16 bit isolato nel componente: sfondo notte viola (`#120a22`), pannelli `#241548`, accento oro `#ffd23f` e rosa `#ff6b9d`, bordi spessi, ombre dure, movimento a gradini (`steps()`), tutto fermo con movimento ridotto. Titoli ed etichette in Press Start 2P, testi in VT323, entrambi in locale. I loghi di Godot e di Android sono disegni in pixel art con sfondo trasparente. La palette è fissa e non segue il tema chiaro/scuro. Header e piè di pagina restano quelli del sito; la voce di menu usa lo stile normale con un piccolo segno «nome provvisorio».
- **Palette senza marroni (26 novembre 2026)**: «attenzione» e le etichette API/Backend sono violetto (`#5b4f9e` in chiaro, `#c2b8f0` in scuro), l'errore è rosa (`#b04a63` / `#eba7b6`); il cielo non ha più bande tan, anello color sabbia, bagliori arancio né fascia beige. Restano l'avorio dietro il logo di Intelligenza Umana (colore del logo) e il giallo pallido del sole.
- **Discesa su tutto il portfolio**: titoli, hero, transizione tra pagine e blocchi di ogni pagina scendono (prima salivano); l'elenco dei blocchi è per pagina, a granularità fine (card, paragrafi, voci), compreso il piede della pagina. Verificato scorrendo ogni pagina a 1280 e 390px: nessun elemento resta nascosto.
- **Pagina del progetto**: freccia verso sinistra accanto a «Tutti i progetti» e «Torna ai progetti» (SVG decorativo, si sposta di 4px al passaggio del puntatore). **Ritratto** meno ravvicinato: lo sfondo è esteso replicando i bordi (`io-640.webp`) e l'avatar dell'header mostra testa e spalle (`io-nav-96.webp`).
