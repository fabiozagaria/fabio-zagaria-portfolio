# Pagina del gioco (stile retro) — design

Data: 2026-11-28. Stato: **bozza in attesa di approvazione di Fabio**. Nessun codice scritto.

## Intenzione
Fabio sta costruendo un gioco idle per Android sul ciclo di vita di una stella. Vuole una rotta del portfolio che lo racconti: perché lo fa, come funziona, come lo costruisce. Non è una pagina per provarlo: non c'è né un APK né una demo, e il gioco non è ancora in alfa. Nasce dalla sua passione per l'astronomia e dalla semplicità dei giochi idle; vuole «un gioco tutto suo».

## Obiettivi
- Nuova rotta con voce nel menu, solo per il gioco, in italiano e inglese.
- Stile 8/16 bit **solo in questa rotta**. Il resto del sito resta identico.
- Contenuti precisi e verificati sul codice reale del gioco, con lo stato dichiarato con onestà.

## Non obiettivi e anti-obiettivi
- **Nessun riferimento al repository del gioco** (è privato): né link, né nome del repository, né percorsi di file.
- Niente download, demo, lista d'attesa, date di uscita, Play Store o monetizzazione.
- Non presentare come esistenti le funzioni solo pianificate nel gioco, e non rivelare quelle che Fabio tiene segrete: restano nel suo HANDOFF privato e non vanno nominate in questo repository pubblico.
- Nessuna immagine spacciata per schermata del gioco. La stella in pixel art della pagina è un'illustrazione e lo dichiara. Se Fabio fornisce screenshot reali, si aggiungono dopo.
- Nessun redesign del resto del portfolio, nessun cambio alla shell (header, piè di pagina, tema globale).

## Vincoli
- `AGENTS.md`: portfolio concluso; questa è un'eccezione richiesta da Fabio il 28 novembre 2026, da registrare lì. Lingua IT/EN con cataloghi in `core/locales`. Documentazione allineata nella stessa PR. Niente commit, push o merge senza il suo OK: prima gli mostro il risultato.
- Il cielo è un componente che ogni pagina importa (`SkyComponent`): la pagina del gioco non lo importa e ha il suo sfondo.
- Accessibilità: un solo `h1`, contrasto sufficiente, focus visibile, `prefers-reduced-motion` rispettato, testi lunghi in font leggibile.

## Approcci considerati
- **A. Retro nel corpo della pagina, shell invariata. Scelto da Fabio.** Poco rischio, header e piè di pagina restano quelli del portfolio.
- B. Retro a tutto schermo (anche header e piè di pagina): più immersivo, ma tocca la shell e può rompere le altre pagine.
- C. Pagina HTML statica separata: perde menu, lingue e SEO.

## Design

**Rotta e menu (mie scelte)**
- Rotta `/gioco`: un indirizzo che non dipende dal nome provvisorio e non esiste ancora nel sito. Titolo della scheda: «Il mio gioco | Fabio Zagaria».
- Voce nel menu tra «Intelligenza Umana» e «Contatti», **con il nome del gioco**: «Idle Project Blackhole» (scelta di Fabio, 28 novembre), con accanto un piccolo segno «nome provvisorio» / «provisional name» in stile retro. Il segno deve restare leggibile nel menu mobile e non allungare la riga oltre lo schermo. Il menu passa a sette voci: da controllare sul telefono.
- Titolo della scheda del browser: «Idle Project Blackhole (nome provvisorio) | Fabio Zagaria».
- Dentro la pagina il titolo è «Idle Project Blackhole» con l'etichetta «Nome provvisorio». Scrittura del nome come nel gioco («Idle», non «Idol»).
- Non viene aggiunta una scheda in `PROJECTS`: non è uno dei progetti curati e la pagina Progetti non cambia.

**Aspetto**
- Prototipo approvato da Fabio come direzione. Palette predefinita **viola e oro** (mia scelta, perché è la più vicina al tema del gioco; le altre due provate, CRT verde e Game Boy, non entrano nel sito).
- Tavolozza fissa e propria della pagina: non segue il tema chiaro/scuro del sistema. Sfondo scuro con stelline che lampeggiano a scatti, bordi spessi, ombre dure, movimento a gradini (`steps()`), tutto spento con movimento ridotto.
- Font pixel (`Press Start 2P`) solo per titoli ed etichette; `VT323` per i paragrafi. Installati in locale come Nunito, nessun servizio esterno (mia scelta: pacchetti `@fontsource/*`, da verificare che la licenza sia OFL). Dimensioni e leggibilità da controllare davvero a 320 px.
- Stile isolato nel componente: tavolozza e font definiti solo lì, nessuna variabile `--calm-*` toccata.

**Contenuto (sezioni)**
1. **Hero:** titolo, «In costruzione», frase di sintesi, stella in pixel art (illustrazione dichiarata come tale).
2. **Perché l'ho fatto:** con parole di Fabio: astronomia fin da bambino, semplicità degli idle, gioco tutto suo. Il testo lo rivede Fabio.
3. **Il ciclo di una stella:** nebulosa, protostella, sequenza principale, gigante rossa, e i tre finali per massa: nana bianca, supernova, buco nero. Rinascita con la polvere stellare. Fonte: dati del gioco.
4. **Come lo costruisco** (nuova, richiesta da Fabio), solo fatti presenti nel codice:
   - Godot 4.7 con GDScript, renderer Compatibility, pensato per Android, viewport verticale 540×960.
   - Stella 3D con shader (corpo, alone, disco, cielo), zoom col pizzico e rotazione col dito.
   - Fasi, finali, economia, potenziamenti, eventi e missioni sono **dati JSON**, non codice: le regole si cambiano senza toccare la logica.
   - Economia tarata con un simulatore che stima la durata delle run per massa.
   - Test automatici in modalità headless; salvataggio firmato con migrazioni di versione, copia di sicurezza e progresso offline.
   - Audio e grafica generati dal codice; italiano e inglese; opzioni di accessibilità (effetti ridotti, modalità risparmio per schermi OLED).
   - Numeri (es. «267 controlli automatici») solo con la data di verifica (23 novembre 2026), per non farli invecchiare in silenzio.
5. **Come sta andando:** in sviluppo, non ancora in alfa, non provabile. Punti aperti dichiarati: prova su telefono reale, prestazioni sui telefoni economici. Nessuna data.

**Verifiche prima della consegna**
- Build e test del portfolio; nuovo spec della pagina sul modello di `intelligenza-umana.component.spec.ts`; `app.spec.ts` aggiornato per la nuova voce.
- Rotta, titolo, descrizione SEO e `sitemap.xml`.
- Anteprima con Playwright a 1280, 720 e 320 px, tema chiaro e scuro del sito (la pagina deve restare uguale), controllo scroll orizzontale e menu a sette voci.
- Allineamento della lingua: cataloghi IT/EN in sincronia.

**Documentazione da allineare** (con l'esito dichiarato per ciascuno a fine lavoro): `README.md`, `docs/CONTEXT.md`, `structure-repo.md`, `PRODUCT.md`, `DESIGN.md`, `AGENTS.md` (eccezione del 28 novembre), `HANDOFF.md`, `docs/ASSET-SOURCES.md` (font), scheda Notion del portfolio (solo con il tuo via libera, perché scrive su un servizio esterno). Alla fine chiedo: «Vuoi aggiornare anche il CV?».

**Consegna (aggiornata il 28 novembre):** lavoro sul ramo `ccr-96cddc99-arnada`. Fabio vuole vedere una **preview online** (Vercel o Netlify) prima del merge: quindi, a lavoro finito e verificato, push del solo ramo (mai di `main`) per far partire la preview, PR in bozza, e link alla preview a Fabio. **Il merge lo fa Fabio** dopo aver visto la preview; io non faccio merge. Se la preview non parte da sola sul ramo, lo dico e propongo l'alternativa.

## Cosa lascio al costruttore
Struttura precisa dei componenti, nomi delle classi CSS, disegno dei pixel della stella e delle quattro icone di fase, frasi definitive (da far rivedere a Fabio), scelta tra pacchetto `@fontsource` e file locali per i font, eventuale soluzione per la voce del menu a sette elementi su schermi stretti.

## Aperto, di Fabio
- Conferma della palette viola e oro (ha detto «va bene» senza sceglierne una).
- Eventuali screenshot reali del gioco, da aggiungere in seguito.

## Revisione del 28 novembre (richiesta di Fabio dopo la prima versione)
- Racconto più basico: il tema (nascita, vita e morte di una stella), «diversi finali» senza numero né elenco, nessun dettaglio sulle fasi, nessun numero di test.
- Come lo costruisce: Godot e GDScript, sempre con il sostegno dell'intelligenza artificiale.
- Stato: contenuti che potrebbero cambiare anche completamente; non provabile, nessuna app; uscita per ora soltanto su Android, senza data; nessuna versione iOS prevista perché non potrebbe provarla.
- Immagini di Godot e Android in pixel art (fornite da Fabio, rielaborate dai loghi ufficiali), con attribuzioni CC BY 4.0 (Godot) e CC BY 3.0 più nota sul marchio (Android). Questa revisione sostituisce le sezioni «Il ciclo di una stella» e «Come lo costruisco» descritte sopra.

## Seconda revisione del 28 novembre (richiesta di Fabio dopo la preview)
- Testi più elaborati: paragrafi discorsivi e ordinati invece di frasi corte e staccate.
- Nuova sezione «Come funziona»: spiega nel dettaglio il ciclo di vita, l'energia anche a gioco chiuso, le particelle, gli eventi rari, i potenziamenti, le missioni e la rinascita con la polvere stellare, usando solo meccaniche già presenti nel gioco. I finali restano mai nominati né contati («diversi finali»).
- Spazi: nessun elemento attaccato a un altro; almeno 24 px tra gli elementi di un riquadro, 12 px tra i tag, 48 px tra le sezioni.
- Grafica e palette confermate da Fabio («va bene come grafica»).

## Correzione del 28 novembre (dopo la prova su telefono)
- Voce di menu con il solo nome del gioco: il segno «nome provvisorio» è stato tolto dal menu e resta nella pagina e nel titolo della scheda. Questa correzione sostituisce la scelta iniziale di mostrarlo nel menu.
- Tag della pagina con testo scuro su rosa e giallo, perché il testo chiaro non si leggeva.
