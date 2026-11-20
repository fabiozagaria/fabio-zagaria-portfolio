# Redesign "Cielo dipinto" — documento di design

Data: 20 novembre 2026. Stato: approvato dal proprietario il 20 novembre 2026.

## Perché

Fabio vuole che il portfolio faccia bella figura dal punto di vista grafico e trasmetta una
sensazione precisa: usarlo deve sembrare "toccare delle nuvole", qualcosa di morbido, calmo e
rilassante, con molto movimento ma mai nervoso. Lo stile attuale (antracite e teal, Space
Grotesk, superfici piatte, animazioni discrete) è considerato corretto ma troppo statico.
Il prototipo usa e getta della direzione A (https://claude.ai/artifact/W8z2kR4jzAAwbawnTe5VZ2)
è piaciuto: è il riferimento visivo di questo documento.

## Obiettivi

- Nuovo stile grafico calmo e tenue: palette acqua e salvia, Nunito, forme morbide, ombre ampie
  e leggere, nessun bordo netto.
- Molte animazioni e molti effetti, tutti lenti e morbidi: lo sfondo vivo nell'hero, la luce che
  segue il puntatore, risposte morbide a ogni tocco e passaggio, transizioni fluide tra le pagine.
- Esperienza quasi identica tra smartphone e desktop: stessi effetti, stesso aspetto, adattati
  solo nelle dimensioni.

## Non obiettivi

- Nessuna modifica a contenuti, testi, dati, route, sezioni, schede, link o documenti. Restano
  tutte le parti attuali, comprese "Implementazioni importanti", "Stato reale" con "Cosa manca",
  il badge "Novità", le anteprime dei plugin, lo storico e le pagine About, Experience, Projects,
  Contact.
- Nessun cambio di architettura Angular (componenti standalone, routing lazy, dati tipizzati).
- Nessuna regola di Taste Skill sulla struttura: niente "una sezione per schermata", niente foto
  obbligatorie, niente controllo `gate.mjs` sul sito.

## Anti-obiettivi (fallimento anche se "funziona")

- Movimento che stanca o dà mal di mare: testo che si muove con lo scroll, parallasse sul testo,
  scroll dirottato o ammorbidito via script, rimbalzi, lampeggi.
- Contenuti nascosti finché non compare un'animazione: ogni testo è leggibile a pagina ferma.
- Un sito lento o che scalda il telefono.
- Una versione mobile impoverita rispetto al desktop.
- Perdita di accessibilità: contrasto WCAG AA, tastiera, focus visibile, movimento ridotto.

## Approcci considerati

1. **Pezzi del kit Taste Skill dentro Angular (scelto).** I file statici del kit che servono
   vengono copiati nel progetto e collegati da piccoli componenti Angular; lo stile si rifà in
   `styles.css`, `motion.css` e nei CSS dei componenti, senza toccare i template se non per
   agganciare gli effetti. Scelto perché lascia intatte pagine e dati, usa effetti già collaudati
   (tema, movimento ridotto, pausa fuori schermo, ripiego senza WebGL) e non aggiunge librerie
   applicative.
2. **Pipeline completa di Taste Skill.** Scartato: imporrebbe di cambiare sezioni e layout.
3. **Tutto da zero, senza kit.** Scartato per ora: molto più lavoro per arrivare allo stesso
   punto. Resta il piano B se il risultato dell'approccio 1 non convince Fabio.

## Decisioni del proprietario

- Direzione A "Cielo dipinto", approccio 1.
- Struttura e contenuti invariati; cambia solo lo stile.
- Tanti effetti e animazioni calmi, oltre il limite di Taste Skill.
- Mobile e desktop devono cambiare il meno possibile.
- Il cielo compare anche nelle altre pagine, come fascia più tenue in testata.

## Il design

### Base visiva

- **Font:** Nunito variabile, installato in locale con `@fontsource-variable/nunito`, al posto di
  Space Grotesk (i file WOFF2 di Space Grotesk vengono rimossi). Titoli in peso leggero (300),
  testo a 400, enfasi a 600–700. Niente maiuscolo nei testi né frecce nei link.
- **Palette:** i token `--calm-*` del Calm theme, copiati da `fabiozagaria/turni-elisa`,
  `docs/calm-theme/calm-theme.css` (commit `02d4ba1`), con tema chiaro e scuro che segue il sistema
  e il pulsante attuale. Valori principali: chiaro pagina `#f2f6f5`, superficie `#ffffff`,
  inchiostro `#1f3a3d`, testo `#46605f`, secondario `#5b7478`, accento `#2f7d84`; scuro pagina
  `#0f1a1c`, superficie `#162427`, inchiostro `#e4efed`, testo `#bdd0cd`, secondario `#95aeaa`,
  accento `#7cc4c0`. Ombre (`--calm-shadow-sm/md`) ed easing (`--calm-ease`) arrivano dallo stesso
  file. I token del kit (`--p-*`) e quelli del portfolio vengono mappati sui `--calm-*`.
- **Forme:** raggi del Calm theme (18, 14, 11px) per controlli e superfici interne; per schede
  progetto, finestra dell'hero e barra di navigazione un raggio più ampio (circa 28px) e pulsanti
  a pillola, come nel prototipo (scelta di chi scrive il design, da confermare a vista), ombre larghe e trasparenti al posto
  dei bordi, barra di navigazione sospesa e arrotondata con sfondo semitrasparente.

### Effetti e animazioni

Tutti rispettano `prefers-reduced-motion` (fermi, contenuto finito e visibile), si fermano fuori
schermo e con la scheda nascosta, e hanno lo stesso comportamento su mobile e desktop salvo dove
indicato.

| Dove | Effetto | Note |
|---|---|---|
| Hero (home) | `painterly-landscape` del kit come sfondo vivo, in colori Calm | Sostituisce la scena Three.js attuale. Pulsante "Ferma il cielo" (oltre 5 s di movimento). Su mobile identico, con risoluzione limitata dal kit. |
| Testata delle altre pagine (About, Experience, Projects, Contact) | Fascia di cielo con lo stesso effetto, più tenue e più bassa dell'hero, dietro il titolo della pagina | Un solo effetto vivo per pagina. Stesso pulsante di pausa, stesso comportamento su mobile. Decisione di Fabio del 20 novembre 2026. |
| Hero (home) | `cursor-spotlight` senza griglia: luce bianca morbida che segue il puntatore | Su touch segue il dito durante il trascinamento e torna a riposo. |
| Hero (home) | Entrata una sola volta al caricamento: nome, ruolo e azioni salgono e appaiono in sequenza (circa 1,1 s) | Il nome resta leggibile anche se lo script tarda. |
| Una frase nella home | `word-highlight`: le parole passano dal grigio all'inchiostro mentre si scorre | Usa un testo già presente nella home; nessun testo nuovo senza approvazione. |
| Schede, pulsanti, link | Risposte morbide: schede che si sollevano di 2–4px, pulsanti che si abbassano al click, sottolineature che si disegnano, immagini con zoom 1,02 nella cornice | Su touch: solo la risposta alla pressione, perché l'hover non esiste. |
| `details` (Implementazioni importanti) | Apertura e chiusura con altezza animata | Con `interpolate-size` dove supportato, altrimenti apertura istantanea. |
| Cambio pagina | View Transitions già attive, rese più lente e morbide (dissolvenza con leggero spostamento) | Dove possibile, la scheda progetto si trasforma nella sua sezione di destinazione. |
| Badge "Novità" | Pulsazione morbida, numero di cicli finito come oggi | |
| Tema chiaro/scuro | Passaggio di colore graduale | |

Durate: risposte a un'azione 200–500 ms con uscita morbida (`cubic-bezier(.22,1,.36,1)`), nessun
rimbalzo; movimenti di sfondo con cicli di decine di secondi.

### Integrazione tecnica

- I file del kit usati (`effects/fx.js`, `effects/painterly-landscape/`, `moments/moments.js`,
  `moments/lib.js`, `moments/cursor-spotlight/`, `moments/word-highlight/`, le parti necessarie di
  `motion/`) vanno in `portfolio-angular/src/assets/vendor/taste-skill/`, con la licenza MIT e un
  README che indica versione (2.5.1) e provenienza.
- Un componente `app-sky` (al posto di `app-hero-scene`, con una variante per le testate delle
  altre pagine) monta l'effetto, gestisce la pausa e lo
  smonta alla distruzione; i momenti si agganciano con attributi `data-moment` nei template.
- Three.js e `hero-scene` vengono rimossi se nessun'altra parte li usa.
- Il kit legge i colori dalle sue variabili `--p-*`/`--bg`/`--ink`: si mappano sui token del
  portfolio, così un solo punto controlla la palette.

### Documentazione da aggiornare nella stessa PR

`DESIGN.md` (riscritto per il nuovo sistema, comprese le regole "nessun gradiente" e "nessuna
animazione continua" da cambiare), `PRODUCT.md` ("animazioni discrete" e "nessuna nuova
libreria"), `README.md`, `docs/CONTEXT.md`, `structure-repo.md`, `AGENTS.md` se cambia una regola,
e la scheda Notion del portfolio. Anche la scheda "Portfolio" nei dati dei progetti, se descrive lo
stile o Three.js.

## Verifica

- Build, test e controllo formato esistenti (`npm run build`, `npm run test:ci`,
  `npm run format:check`).
- Screenshot a 1440, 1024, 768 e 390px, tema chiaro e scuro, con e senza movimento ridotto:
  nessun contenuto tagliato, sovrapposto o nascosto, nessuno scorrimento orizzontale.
- Contrasto AA di ogni coppia di colori; navigazione da tastiera e focus visibile.
- Prestazioni: peso del bundle prima e dopo, fluidità dello sfondo su un profilo mobile emulato.

## Lasciato a chi costruisce

- Valori precisi di ombre, raggi intermedi, spaziature e parametri dell'effetto, purché coerenti
  con il prototipo.
- Quale frase della home ospita `word-highlight`.
- Come animare `details` sui browser senza `interpolate-size`.

## Punti aperti

Nessuno. Documento approvato da Fabio il 20 novembre 2026.
