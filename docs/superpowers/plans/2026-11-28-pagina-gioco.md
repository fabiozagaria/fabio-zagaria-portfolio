# Pagina del gioco (stile retro) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere al portfolio la rotta `/gioco` con la pagina «Idle Project Blackhole», in stile 8/16 bit solo lì, IT/EN, con voce nel menu.

**Architecture:** Nuovo componente standalone lazy `GiocoComponent` in `src/app/features/gioco/`, con CSS e palette propri, senza `SkyComponent`. La shell (header, piè di pagina, tema globale) non cambia, salvo la nuova voce di menu. Stella e icone di fase sono pixel art disegnate su `<canvas>` da una funzione pura.

**Tech Stack:** Angular 21, TypeScript 5.9, Vitest (`ng test`), `@fontsource/press-start-2p` e `@fontsource/vt323`, Playwright (preinstallato) per le anteprime.

**Spec:** `docs/superpowers/specs/2026-11-28-pagina-gioco-design.md` (vedi anche la sezione «Revisione del 28 novembre»: il contenuto della pagina è stato semplificato dopo questo piano)

## Global Constraints

- Lavoro solo sul ramo `ccr-96cddc99-arnada`. Nessun commit, push o merge finché il piano non dice altrimenti (Task 5). Il merge lo fa solo Fabio.
- Nome del gioco: «Idle Project Blackhole» (mai «Idol»); è **provvisorio** e va dichiarato: «nome provvisorio» / «provisional name».
- **Il repository del gioco è privato: nessun link, nome di repository, percorso o URL GitHub** del gioco in codice, test, documenti, commenti, messaggi di commit.
- Funzioni segrete o solo pianificate del gioco: non vanno rivelate né presentate come esistenti, e non vanno nominate neppure in docs, test o commenti di questo repository pubblico. Raccontare solo ciò che il gioco fa oggi.
- Rotta `/gioco`; titolo scheda «Idle Project Blackhole (nome provvisorio) | Fabio Zagaria»; voce di menu tra «Intelligenza Umana» e «Contatti».
- Palette viola e oro fissa nella pagina (non segue tema chiaro/scuro): `--bg #120a22`, `--bg2 #1d1138`, `--panel #241548`, `--fg #f2eaff`, `--muted #b9a8e0`, `--accent #ffd23f`, `--accent2 #ff6b9d`, `--line #5a3fa0`.
- Font pixel `Press Start 2P` solo per titoli ed etichette; `VT323` per i paragrafi; installati in locale, nessun servizio esterno. Non caricarli sulle altre pagine.
- Nessuna immagine presentata come schermata del gioco: la stella è un'illustrazione e lo dice.
- Numeri del gioco solo con data di verifica («267 controlli automatici, al 23 novembre 2026»).
- Testi in italiano con catalogo inglese in `core/locales`; mantenere i due cataloghi allineati. Un solo `h1`, focus visibile, `prefers-reduced-motion` spegne ogni animazione.
- Prettier: `npm run format:check` deve passare.

## Review Focus

- A 320 px la voce di menu «Idle Project Blackhole» + «nome provvisorio» non causa scroll orizzontale né esce dal menu. (Task 1)
- Nessuna stringa del repository privato né parola dei segreti compare nel markup renderizzato, in IT e in EN. (Task 1, 3)
- In jsdom `canvas.getContext()` restituisce `null`: la pagina non deve lanciare. (Task 2)
- Se i font non si caricano, il testo resta leggibile in un monospace di ripiego e non esce dai riquadri. (Task 2)
- Cambiando tema chiaro/scuro del sito la pagina resta identica; le altre pagine restano invariate. (Task 2, 5)
- Passando a inglese, titoli, etichette e testi cambiano e la scelta persiste. (Task 3)

## File Structure

- Create `src/app/features/gioco/gioco.component.{ts,html,css,spec.ts}`: la pagina.
- Create `src/app/features/gioco/pixel-art.ts` (+ `pixel-art.spec.ts`): `drawStar`, `drawPhaseIcon`.
- Modify `src/app/core/app.routes.ts`, `src/app/core/app.html`, `src/app/core/app.css`, `src/app/core/app.spec.ts`: rotta, voce di menu, segno «nome provvisorio».
- Modify `src/app/core/locales/en-ui.ts` (e `it-ui.ts` solo se la convenzione del file lo richiede): testi.
- Modify `src/assets/seo/sitemap.xml`, `package.json` (+ lockfile), docs elencati nel Task 4.

---

### Task 1: Rotta, voce di menu e struttura della pagina

**Files:** Create `features/gioco/gioco.component.ts|html|spec.ts`; Modify `core/app.routes.ts`, `core/app.html`, `core/app.css`, `core/app.spec.ts`, `assets/seo/sitemap.xml`.

**Interfaces:**
- Produces: `export class GiocoComponent` (selector `app-gioco`, `OnPush`, importa `TranslatePipe` e `RouterLink` solo se serve); classi CSS con prefisso `c-gioco`; sezioni nell'ordine: hero, `Perché l’ho fatto`, `Il ciclo di una stella`, `Come lo costruisco`, `Come sta andando`.

- [ ] **Step 1: Test che falliscono.** In `app.spec.ts` aggiorna il test dei link di menu: aggiungi, prima di `'Contatti'`, una voce con `textContent` normalizzato `'Idle Project Blackhole nome provvisorio'` e href `'/gioco'`; il tag è `.c-nav__tag`. In `gioco.component.spec.ts`: `h1` = «Idle Project Blackhole»; contiene «nome provvisorio»; i quattro `h2` = `['Perché l’ho fatto','Il ciclo di una stella','Come lo costruisco','Come sta andando']`; `textContent` contiene «non ancora in alfa»; nessun `a[href]` (la pagina non ha link esterni); `textContent` e `innerHTML` NON contengono `/idle-project-blackhole|github\.com\/fabiozagaria/i`; contiene «267 controlli automatici» e «23 novembre 2026» insieme nello stesso paragrafo.
- [ ] **Step 2:** `npx ng test --watch=false` — Expected: FAIL (componente e voce mancanti).
- [ ] **Step 3:** Crea `GiocoComponent` e il markup con i contenuti della sezione «Design → Contenuto» dello spec (sezioni 1-5), usando solo i fatti elencati lì. Aggiungi la rotta `gioco` in `app.routes.ts` sul modello di `intelligenza-umana` (lazy, `title` come da vincoli, `data.seo` con `path: '/gioco'`, `description` italiana e `englishDescription`). Aggiungi in `app.html` il `<li>` con `routerLink="/gioco"`, testo `Idle Project Blackhole` e `<span class="c-nav__tag">{{ 'nome provvisorio' | translate }}</span>`. In `app.css` stila `.c-nav__tag` come piccola etichetta con font di navigazione (non il font pixel) e verifica che il menu mobile non vada a capo oltre lo schermo. Aggiungi `/gioco` a `sitemap.xml`.
- [ ] **Step 4:** `npx ng test --watch=false` — Expected: PASS.
- [ ] **Step 5:** Nessun commit. Annota nel `HANDOFF.md` (sezione sessione) solo alla fine, Task 4.

### Task 2: Stile retro, font e pixel art

**Files:** Create `features/gioco/pixel-art.ts`, `pixel-art.spec.ts`; Modify `gioco.component.css|html|ts`, `package.json`.

**Interfaces:**
- Produces: `export interface StarColors { fg: string; accent: string; accent2: string }`, `export function drawStar(ctx: CanvasRenderingContext2D, colors: StarColors): void` (canvas 40×40), `export type PhaseKind = 'nebula' | 'proto' | 'main' | 'giant'`, `export function drawPhaseIcon(ctx: CanvasRenderingContext2D, kind: PhaseKind, colors: StarColors): void` (canvas 8×8). Riproduci la logica del prototipo `scratchpad/prototipo-retro.html` (dithering a scacchiera, raggi a croce).

- [ ] **Step 1: Test che falliscono.** `pixel-art.spec.ts` con un `ctx` finto che registra `fillRect`: `drawStar` produce almeno 200 `fillRect` e tutte le coordinate sono in `[0,40)`; `drawPhaseIcon` per ciascun `PhaseKind` produce almeno 1 `fillRect` con coordinate in `[0,8)`. In `gioco.component.spec.ts`: con `HTMLCanvasElement.prototype.getContext` che restituisce `null`, `createComponent` + `detectChanges` non lancia; il canvas della stella ha `role="img"` e un `aria-label`; il testo «illustrazione» compare vicino alla stella; esiste la classe `c-gioco` sul contenitore.
- [ ] **Step 2:** `npx ng test --watch=false` — Expected: FAIL.
- [ ] **Step 3:** Implementa `pixel-art.ts`. Nel componente disegna in `afterNextRender` (solo browser), leggendo i colori con `getComputedStyle` dalle variabili CSS, con i valori dei vincoli come ripiego; se `getContext` è `null`, esci senza errori.
- [ ] **Step 4:** `npm install @fontsource/press-start-2p @fontsource/vt323`; verifica nei `package.json` dei pacchetti che la licenza sia OFL e annotala. Importali dentro `gioco.component.css` (non in `styles.css`). CSS isolato: variabili della palette sul contenitore `.c-gioco`, bordi spessi, ombre dure, animazioni `steps()`, `@media (prefers-reduced-motion: reduce)` che le spegne, font di ripiego monospace, `overflow-wrap` sui testi, nessuna dipendenza da `--calm-*` e dal tema chiaro/scuro.
- [ ] **Step 5:** `npx ng test --watch=false` e `npx ng build` — Expected: PASS; nel build i file `.woff2` dei font pixel compaiono. Ispeziona con Playwright (Task 5) che sulle altre pagine non vengano richiesti.

### Task 3: Inglese

**Files:** Modify `core/locales/en-ui.ts` (e `it-ui.ts` se serve per la convenzione), `gioco.component.spec.ts`.

- [ ] **Step 1: Test che fallisce.** Nello spec della pagina, con `LanguageService` impostato su `'en'` (come in `app.spec.ts`): `h1` invariato; gli `h2` diventano `['Why I made it','The life cycle of a star','How I build it','How it is going']`; il testo contiene «provisional name» e «not yet in alpha»; non contiene più «Perché l’ho fatto». Le stesse regole di esclusione del Task 1 (nessun repository, nessun segreto) valgono anche in inglese. In `app.spec.ts`, con inglese attivo, il tag del menu è «provisional name».
- [ ] **Step 2:** `npx ng test --watch=false` — Expected: FAIL.
- [ ] **Step 3:** Aggiungi in `en-ui.ts` una voce per ogni stringa italiana della pagina e del menu (chiave = testo italiano esatto). Traduzioni fedeli, senza aggiungere affermazioni.
- [ ] **Step 4:** `npx ng test --watch=false` — Expected: PASS.

### Task 4: Documentazione allineata

**Files:** Modify `AGENTS.md`, `README.md`, `docs/CONTEXT.md`, `structure-repo.md`, `PRODUCT.md`, `DESIGN.md`, `HANDOFF.md`, `docs/ASSET-SOURCES.md`.

- [ ] **Step 1:** `AGENTS.md`: aggiungi l'eccezione richiesta da Fabio il 28 novembre 2026 (rotta `/gioco`, stile retro isolato, menu con nome provvisorio, repository privato non citato). `PRODUCT.md`: aggiorna la riga sulle librerie (due font pixel in aggiunta a Nunito). `DESIGN.md`: sezione sulla pagina retro come eccezione isolata alla palette Calm/«Cielo dipinto». `README.md`, `docs/CONTEXT.md`, `structure-repo.md`: rotta, componente, test. `docs/ASSET-SOURCES.md`: i due font, pacchetto npm e licenza OFL verificata. `HANDOFF.md`: riga di sessione con ciò che è verificato e ciò che no.
- [ ] **Step 2:** `rg -n "idle-project-blackhole|github.com/fabiozagaria/idle" ../` (dalla radice) — Expected: nessun risultato nei file del portfolio, tranne le espressioni regolari dei test (`gioco.component.spec.ts`) che lo vietano.
- [ ] **Step 3:** Nel report finale elenca per ogni documento «aggiornato» o «invariato, perché». La scheda Notion non viene toccata senza il via libera di Fabio.

### Task 5: Verifica, preview e consegna

- [ ] **Step 1:** `npm run format:check`, `npm run test:ci`, `npx ng build` (dalla cartella `portfolio-angular`; se mancano le dipendenze, `npm ci`) — Expected: tutto verde. Se qualcosa fallisce, dillo con l'output.
- [ ] **Step 2:** Avvia il sito e fai screenshot con Playwright a 1280, 720 e 320 px di `/gioco`, in italiano e inglese, con tema del sito chiaro e scuro; verifica `document.documentElement.scrollWidth <= innerWidth` a 320 px, menu aperto a 320 px con le sette voci, un solo `h1`, nessuna richiesta di font pixel su `/` e `/projects`. Salva gli screenshot in `docs/superpowers/` non committati o nella scratchpad e mostrali a Fabio.
- [ ] **Step 3: Preview online.** Fabio ha chiesto una preview prima del merge. Solo dopo lo Step 1 verde: commit con i blocchi logici (messaggi con le righe di attribuzione richieste), `git push -u origin ccr-96cddc99-arnada` (mai `main`), PR **in bozza**, poi `subscribe_pr_activity`. Cerca il link della preview Vercel nei check o nei commenti della PR; se non compare, dillo e proponi `mcp__Vercel` (lista deployment del progetto) invece di inventarlo.
- [ ] **Step 4:** Consegna a Fabio: link alla preview, screenshot, elenco dei documenti aggiornati, cosa NON è verificato (telefono reale, Lighthouse, screen reader), e le domande aperte (palette, screenshot reali). Chiedi: «Vuoi aggiornare anche il CV?». **Non fare merge.**
