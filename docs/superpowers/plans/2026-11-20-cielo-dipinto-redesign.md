# Redesign "Cielo dipinto" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Angular portfolio in the calm "Cielo dipinto" look (Calm palette, Nunito, soft shapes, a living painted sky and many slow animations) without changing any content, route, section or card.

**Architecture:** The global tokens in `src/styles.css` are remapped to the Calm theme values, so existing components restyle through the variables they already use. A small set of Taste Skill kit files is shipped as static assets under `/assets/vendor/taste-skill/` and loaded at runtime by one Angular service; a `SkyComponent` mounts the painted sky (hero on Home, a softer band on the other pages), and two directives add the pointer light and the word-highlight moment. The existing Three.js hero scene is removed.

**Tech Stack:** Angular 21 (standalone components, signals), TypeScript 5.9, Vitest via `@angular/build:unit-test`, plain CSS, `@fontsource-variable/nunito`, Taste Skill 2.5.1 kit files (MIT).

**Spec:** `docs/superpowers/specs/2026-11-20-cielo-dipinto-redesign-design.md`

## Global Constraints

- No change to content, copy, data files' values, routes, links, documents, sections or cards. Templates change only to add sky, light and moment hooks and to drop `app-hero-scene`.
- Mobile and desktop behave the same: the sky runs on phones too, the pointer light follows a finger, the word-highlight runs on phones. Only hover is absent on touch, replaced by press feedback.
- Every animation respects `prefers-reduced-motion: reduce`: nothing moves, all content is visible in its final state.
- Anything that moves for more than 5 s has a visible pause control.
- Forbidden: text moving with scroll, parallax on text, scroll hijacking or script-smoothed scroll, bounces, blinking, reveal-on-scroll that hides content until an observer fires.
- Response animations 200–500 ms with `--calm-ease: cubic-bezier(.23, 1, .32, 1)`; ambient motion in cycles of tens of seconds.
- Palette: the `--calm-*` tokens copied verbatim from `fabiozagaria/turni-elisa` `docs/calm-theme/calm-theme.css` at commit `02d4ba1` (light and dark blocks). Contrast WCAG AA for every text/background pair.
- Font: Nunito variable via `@fontsource-variable/nunito`, family `"Nunito Variable"`. No uppercase-transformed text, no arrows appended to links.
- Radii: Calm `--calm-radius-lg/md/sm` (18/14/11px) for controls and inner surfaces; about 28px for project cards, the hero window and the floating nav; buttons as pills.
- No new runtime npm library besides `@fontsource-variable/nunito`; kit files are copied, never edited (keep the kit's MIT licence beside them).
- Docs in the same PR: `DESIGN.md`, `PRODUCT.md`, `README.md`, `docs/CONTEXT.md`, `structure-repo.md`, `AGENTS.md` (only if a rule changes), Notion portfolio card, and the "Portfolio" project card in `projects.data.ts` if it describes style or Three.js.
- Checks before claiming done: `npm run format:check`, `npm run test:ci`, `npm run build` from `portfolio-angular/`.

## Review Focus

- **No WebGL or a lost context** (old phone, blocked GPU): the sky shows the kit's CSS fallback and the page stays readable; no console error breaks the page. Test in Task 3.
- **Theme toggled while the sky runs:** the sky takes the new palette at once, without reload. Test in Task 3.
- **Navigating between routes many times:** each sky and moment is destroyed on leave; the number of live canvases never grows. Test in Task 3 (destroy) and checked in Task 8.
- **Reduced motion:** the sky is one still frame, the pause button is hidden, the light stays at rest, every word of the highlight is full ink. Tests in Tasks 3, 5, 6.
- **Touch scrolling over the hero:** the light follows the finger but never blocks vertical scroll (passive listeners, no `preventDefault`). Test in Task 5.

---

### Task 1: Ship the kit files and the Nunito font

**Files:**
- Create: `portfolio-angular/src/assets/vendor/taste-skill/` with `effects/fx.js`, `effects/painterly-landscape/effect.js`, `effects/painterly-landscape/meta.json`, `moments/moments.js`, `moments/lib.js`, `moments/word-highlight/moment.js`, `moments/word-highlight/moment.css`, `moments/word-highlight/meta.json`, `LICENSE` (kit's MIT text), `README.md` (source repo `Leonxlnx/taste-skill`, version 2.5.1, list of files, "do not edit")
- Modify: `portfolio-angular/angular.json` (assets array: add `{ "glob": "**/*", "input": "src/assets/vendor", "output": "/assets/vendor" }`)
- Modify: `portfolio-angular/package.json` (dependency `@fontsource-variable/nunito`)
- Modify: `portfolio-angular/src/styles.css:1-22` (replace the three `@font-face` blocks with `@import '@fontsource-variable/nunito';`)
- Delete: `src/assets/fonts/space-grotesk-latin.woff2`, `bricolage-grotesque-latin-wdth.woff2`, `instrument-serif-latin-400-italic.woff2` and their `OFL*.txt`; the Bricolage `<link rel="preload">` in `src/index.html`

**Interfaces:**
- Produces: runtime URLs `/assets/vendor/taste-skill/effects/fx.js` and `/assets/vendor/taste-skill/moments/moments.js`; font family `"Nunito Variable"`.

- [ ] **Step 1:** Record the baseline: run `npm run build` and note the initial and lazy chunk sizes from the output (needed in Task 8).
- [ ] **Step 2:** Copy the files listed above from the kit (`~/.claude/skills/design-taste-frontend/assets/` or a fresh clone of `Leonxlnx/taste-skill` at v2.5.1, folder `skills/taste-skill/assets/`), add the asset entry, install the font, swap the `@font-face` blocks, delete the old fonts and the preload.
- [ ] **Step 3:** Run `npm run build`. Expected: success, and `dist/portfolio-angular/browser/assets/vendor/taste-skill/effects/fx.js` exists; no file under `dist/**/assets/fonts/` named space-grotesk, bricolage or instrument-serif.
- [ ] **Step 4:** Run `grep -rn "Space Grotesk\|Bricolage\|Instrument Serif" src` . Expected: matches only in `styles.css` token values that Task 2 replaces (list them for Task 2).
- [ ] **Step 5:** Commit: `git commit -m "Kit Taste Skill come asset statici e font Nunito"`

### Task 2: Calm tokens and global restyle

**Files:**
- Modify: `portfolio-angular/src/styles.css` (`:root`, `html[data-theme='dark']`, base element rules, `.c-nav*`, `.c-btn*`, `.c-section-title*`, `.c-card*`, `.c-projects__group-title`, `details`/`summary` rules, links)
- Modify: `portfolio-angular/src/app/core/app.css` and component CSS files only where they hard-code a color, font or radius

**Interfaces:**
- Produces: every `--calm-*` token on `:root` and under `html[data-theme='dark']`; existing tokens (`--clr-*`, `--card`, `--ff-*`, `--radius-*`, `--transition-*`) keep their names and now resolve to Calm values; new tokens `--radius-card: 28px`, `--radius-pill: 999px`, `--shadow-soft: var(--calm-shadow-sm)`, `--shadow-lift: var(--calm-shadow-md)`.

- [ ] **Step 1:** Copy the light `--calm-*` block into `:root` and the dark block into `html[data-theme='dark']` (the app sets `data-theme` itself, so the media-query copy of the dark block is not needed).
- [ ] **Step 2:** Remap the old tokens: `--clr-black`→`--calm-page`, `--clr-black-soft`→`--calm-surface-soft`, `--clr-black-lighter`→`--calm-surface-hover`, `--clr-black-lightest`→`--calm-line-strong`, `--clr-white`→`--calm-ink`, `--clr-white-dim`→`--calm-body`, `--clr-white-subtle`/`--clr-white-faint`→`--calm-muted`, `--clr-cyber-green*`→`--calm-accent` / `--calm-accent-strong` / `--calm-accent-soft`, `--clr-accent-yellow`→`--calm-attention`, `--clr-accent-red`→`--calm-danger`, `--button-ink`→`--calm-on-accent`, `--card`→`--calm-surface`, `--grid-line`→`--calm-line-soft`, `--kind-*` to `--calm-tint-1-ink` / `--calm-tint-3-ink` / `--calm-tint-2-ink`, `--ff-primary` and `--ff-secondary`→`var(--calm-font)`, `--radius-sm/md/lg`→`--calm-radius-sm/md/lg`, `--transition-fast`→`200ms var(--calm-ease)`, `--transition-base`→`320ms var(--calm-ease)`. Remove `--mark` and `--sheet` if nothing uses them after Task 4.
- [ ] **Step 3:** Restyle by role: headings weight 300–400 with display sizes unchanged; `.c-nav` becomes a floating pill (`position: fixed`, inset 16px, `--radius-pill`, semi-transparent `--calm-surface` with `backdrop-filter: blur(14px)`, `--shadow-soft`); `.c-btn` pills, primary on `--calm-ink`/`--calm-page` in light and `--calm-accent` in dark; cards `--radius-card`, no border, `--shadow-soft`; `.c-projects__group-title` drops Instrument Serif and italic for Nunito 300; remove any `text-transform: uppercase`.
- [ ] **Step 4:** Run `npm run test:ci`. Expected: all existing tests pass (they test content, not style).
- [ ] **Step 5:** Check contrast: for each pair (`--calm-ink`, `--calm-body`, `--calm-muted`, `--calm-accent` on `--calm-page`, `--calm-surface`, `--calm-surface-soft`; `--calm-on-accent` on `--calm-accent`) in both themes compute the WCAG ratio with a short Node script in the scratchpad. Expected: ≥ 4.5 for text, ≥ 3 for large text and UI. Report any pair below and fix by using the next stronger Calm token, never a new color.
- [ ] **Step 6:** Screenshot `/`, `/projects`, `/about` at 1440 and 390 in light and dark (Playwright, scratchpad script). Expected: no clipped or overlapping text, no horizontal scroll, nav does not cover the page title (`scroll-padding-top` and top padding adjusted to the floating nav).
- [ ] **Step 7:** Commit: `git commit -m "Token e stile globale del Calm theme"`

### Task 3: Kit loader and `SkyComponent`

**Files:**
- Create: `portfolio-angular/src/app/shared/sky/kit-loader.service.ts`
- Create: `portfolio-angular/src/app/shared/sky/sky.component.ts`, `sky.component.css`
- Test: `portfolio-angular/src/app/shared/sky/sky.component.spec.ts`

**Interfaces:**
- Produces:
  - `export interface SkyController { pause(): void; resume(): void; setPalette(p: SkyPalette): void; destroy(): void; }`
  - `export interface SkyPalette { bg: string; surface: string; ink: string; muted: string; accent: string; accentInk: string; }`
  - `@Injectable({ providedIn: 'root' }) export class KitLoader { mountSky(el: HTMLElement, opts: { seed: number; palette: SkyPalette; params: Record<string, number> }): Promise<SkyController>; loadMoments(): Promise<{ mount(el: HTMLElement): Promise<{ destroy?(): void } | null> }>; }` — dynamic `import(/* @vite-ignore */ '/assets/vendor/taste-skill/effects/fx.js')`, then `fx.mount(el, 'painterly-landscape', opts)`; `loadMoments` imports `moments/moments.js` the same way. Browser only (guard with `isPlatformBrowser`).
  - `@Component({ selector: 'app-sky' }) export class SkyComponent { variant = input<'hero' | 'band'>('hero'); }` — host element is `position: absolute; inset: 0; z-index: -1` inside its positioned parent; template holds the effect target `div` and a `<button type="button" class="c-sky__pause" [attr.aria-pressed]="paused()">` with text "Ferma il cielo" / "Fai muovere il cielo".
- Consumes: `ThemeService.dark` (signal) from `src/app/core/theme.service.ts`.

Behaviour fixed by the spec: palette read from the computed `--calm-*` tokens of `document.documentElement`; hero params `{ drift: 0.05, blur: 0.85, brush: 0.45, grain: 0.015, calm: 0.55, calmX: 0.3, calmY: 0.4 }`, seed 7; band params the same plus `horizon: 0.62` and the host at `opacity: 0.55`, height `clamp(220px, 34vh, 340px)`, seed 11. Pause button hidden under reduced motion.

- [ ] **Step 1: Write the failing tests** (provide a fake `KitLoader` whose `mountSky` resolves a spy `SkyController`):
  - `it('mounts the painted sky with the hero params')`: `mountSky` called once with `seed: 7` and `params.drift === 0.05`.
  - `it('toggles pause and resume and the button label')`: click → `pause` called, `aria-pressed="true"`, text "Fai muovere il cielo"; click again → `resume`, `aria-pressed="false"`, "Ferma il cielo".
  - `it('repaints when the theme changes')`: set `ThemeService.dark` to `true` → `setPalette` called once with a palette object.
  - `it('destroys the effect when the component is destroyed')`: `fixture.destroy()` → `destroy` called.
  - `it('hides the pause button under reduced motion')`: stub `matchMedia('(prefers-reduced-motion: reduce)').matches = true` → no `.c-sky__pause` in the DOM.
  - `it('keeps the page usable when the sky fails to mount')`: `mountSky` rejects → no throw, host gets class `c-sky--fallback`, pause button hidden.
  - `it('uses the band params for variant band')`: `variant = 'band'` → `seed: 11`, `params.horizon === 0.62`.
- [ ] **Step 2:** Run `npm run test:ci -- --include src/app/shared/sky`. Expected: FAIL (component not defined).
- [ ] **Step 3:** Implement `KitLoader` and `SkyComponent` as specified; mount in `afterNextRender`, react to `ThemeService.dark` with an `effect`, clean up through `DestroyRef`.
- [ ] **Step 4:** Run the same command. Expected: PASS (7 tests).
- [ ] **Step 5:** Commit: `git commit -m "SkyComponent e caricamento del kit"`

### Task 4: Home hero with the sky; remove Three.js

**Files:**
- Modify: `portfolio-angular/src/app/features/home/home.component.html:1-3` (`<app-hero-scene />` and `.c-hero__glow` → `<app-sky variant="hero" />`), `home.component.ts` (imports), `home.component.css` (hero layout over the sky, Expense Tracker screenshot is not added: content unchanged)
- Modify: `portfolio-angular/src/motion.css:28-60` (hero entrance: keep the one-time rise, retime to `1100ms var(--calm-ease)` total with 110 ms steps)
- Delete: `portfolio-angular/src/app/features/home/hero-scene/` and the `three` and `@types/three` entries in `package.json`
- Test: `portfolio-angular/src/app/features/home/home.component.spec.ts`

**Interfaces:**
- Consumes: `SkyComponent` (`variant` input) from Task 3.

- [ ] **Step 1: Write the failing test** `it('renders the sky behind the hero instead of the 3D scene')`: `app-sky` present inside `#home`, `app-hero-scene` absent. Provide a fake `KitLoader`.
- [ ] **Step 2:** Run `npm run test:ci -- --include src/app/features/home`. Expected: FAIL.
- [ ] **Step 3:** Make the template, import and CSS changes; delete the scene and the dependency (`npm uninstall three @types/three`); `grep -rn "three" src` must return no import.
- [ ] **Step 4:** Run the home tests, then `npm run build`. Expected: PASS; the deferred three.js chunk (about 153 kB gzip) is gone from the build output.
- [ ] **Step 5:** Commit: `git commit -m "Cielo dipinto nell'hero al posto della scena Three.js"`

### Task 5: Pointer light directive (desktop and touch)

**Files:**
- Create: `portfolio-angular/src/app/shared/sky/sky-light.directive.ts`
- Test: `portfolio-angular/src/app/shared/sky/sky-light.directive.spec.ts`
- Modify: `portfolio-angular/src/styles.css` (`.c-sky-light` layer rules) and `home.component.html` (apply on the hero content wrapper)

**Interfaces:**
- Produces: `@Directive({ selector: '[appSkyLight]' }) export class SkyLightDirective { rest = input<[number, number]>([0.78, 0.22]); radius = input<number>(520); }` — adds class `c-sky-light`, sets `--light-x`, `--light-y` (percent) and `--light-r` (px) on the host; CSS draws `radial-gradient(var(--light-r) circle at var(--light-x) var(--light-y), color-mix(in oklab, #fff 70%, transparent), transparent 72%)` in light theme and `color-mix(in oklab, var(--calm-accent-strong) 22%, transparent)` in dark.

Behaviour: listens to `pointermove` (mouse, pen and touch) with `{ passive: true }`; eases toward the target with factor 0.08 per frame via `requestAnimationFrame`; on `pointerleave`/`pointercancel`/`pointerup` from touch eases back to `rest`; no listeners and the light fixed at `rest` under reduced motion; stops the frame loop when settled and on destroy.

- [ ] **Step 1: Write the failing tests** (fake timers / manual `requestAnimationFrame` flush):
  - `it('starts at the rest position')`: `--light-x` is `78%`, `--light-y` `22%`.
  - `it('moves toward the pointer')`: dispatch `pointermove` at 25%/50% of the host rect, flush frames → `--light-x` strictly between 25% and 78%, approaching 25%.
  - `it('follows a finger too')`: same with `pointerType: 'touch'`.
  - `it('never blocks scrolling')`: the dispatched `pointermove` and `touchmove` events have `defaultPrevented === false`.
  - `it('returns to rest when the pointer leaves')`: `pointerleave`, flush → back within 1% of 78%/22%.
  - `it('stays still under reduced motion')`: reduced motion stubbed → `pointermove` leaves `--light-x` at `78%`.
- [ ] **Step 2:** Run `npm run test:ci -- --include src/app/shared/sky`. Expected: the 6 new tests FAIL.
- [ ] **Step 3:** Implement the directive and CSS; apply it in the hero.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Luce che segue puntatore e dito nell'hero"`

### Task 6: Word-highlight moment and sky bands on the other pages

**Files:**
- Create: `portfolio-angular/src/app/shared/sky/moment.directive.ts`
- Test: `portfolio-angular/src/app/shared/sky/moment.directive.spec.ts`
- Modify: `home.component.html` (the paragraph under "Il resto dei progetti", text unchanged, gets `appMoment="word-highlight"` on its section and the kit class `mo-wh__text` on the paragraph)
- Modify: `about.component.html`, `experience.component.html`, `projects.component.html`, `contact.component.html` (first child of the top `o-section`: `<app-sky variant="band" />`; section made `position: relative; isolation: isolate`)
- Test: one spec per page touched, or extend existing specs

**Interfaces:**
- Consumes: `KitLoader.loadMoments()` from Task 3; `SkyComponent` band variant.
- Produces: `@Directive({ selector: '[appMoment]' }) export class MomentDirective { appMoment = input.required<string>(); }` — sets `data-moment` on the host, calls `moments.mount(host)` after render, calls the returned api's `destroy` (if any) on destroy.

Choice made by the plan: the word-highlight goes on the "Il resto dei progetti" paragraph ("Nella pagina Progetti trovi tutto il lavoro… quali verifiche mancano."), because it states what the portfolio is about; no new copy.

- [ ] **Step 1: Write the failing tests:**
  - `it('mounts the named moment on its host')`: fake loader → `mount` called with the host, host has `data-moment="word-highlight"`.
  - `it('destroys the moment with the view')`: api `destroy` spy called on `fixture.destroy()`.
  - `it('keeps the full text when the moment fails')`: `mount` rejects → paragraph text unchanged and visible (no `opacity: 0` class added).
  - For each of About, Experience, Projects, Contact: `it('shows the sky band behind the page title')`: `app-sky[variant="band"]` exists before the `h1`, and the `h1` text is unchanged.
- [ ] **Step 2:** Run `npm run test:ci`. Expected: new tests FAIL.
- [ ] **Step 3:** Implement the directive, apply it, add the bands and their CSS (band sits behind the title, fades into `--calm-page` with a mask, does not push content down).
- [ ] **Step 4:** Run `npm run test:ci`. Expected: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Frase che si illumina e fascia di cielo nelle altre pagine"`

### Task 7: Soft responses everywhere

**Files:**
- Modify: `portfolio-angular/src/motion.css` (all rules below, each with its reduced-motion counterpart), `src/styles.css` only for the `details` height rule

**Interfaces:** none new; CSS only, applied to existing classes `.c-btn`, `.c-card`, `.c-nav__link`, `.c-explore__item`, running-text links, `img` inside linked frames, `details` in project cards, `app-recent-badge`, `html` color transition.

Values fixed by the spec:
- Cards: hover `translateY(-4px)` and `--shadow-lift`, 500 ms `--calm-ease`; press `translateY(-1px) scale(.99)`. Hover only inside `@media (hover: hover) and (pointer: fine)`; press everywhere.
- Buttons: press `scale(.97)` 160 ms; hover background change 200 ms `ease`.
- Links in text: underline drawn from left with `background-size` 0→100%, 320 ms.
- Images inside links: `scale(1.02)` inside an `overflow: hidden` frame, 600 ms.
- `details`: `interpolate-size: allow-keywords` on `:root` and `transition: height 400ms var(--calm-ease)` on `details::details-content` (with `content-visibility` transition) where supported; elsewhere instant.
- "Novità" badge: keep 3 cycles, 1.6 s each, softened to opacity/scale 1→1.04.
- Theme switch: `background-color` and `color` transitions of 400 ms on `body` and cards.
- Route change: `::view-transition-old(root)` fade out 240 ms; `::view-transition-new(root)` fade in with `translateY(8px)` → 0 over 480 ms, both `--calm-ease`.
- Card into page: `view-transition-name: card-expense-tracker` on the Expense Tracker card in the Home showcase and on the same card in `/projects`, so following "Scheda completa di Expense Tracker" morphs one into the other (480 ms `--calm-ease`); the name is set only on that one card per page.

- [ ] **Step 1:** Write the rules and the reduced-motion block (`transition: none; animation: none;` for each, no `!important`).
- [ ] **Step 2:** Run `npm run test:ci` and `npm run format:check`. Expected: PASS.
- [ ] **Step 3:** Playwright check in the scratchpad: hover a project card at 1440 → its bounding box top is 4px higher after 600 ms; with `reducedMotion: 'reduce'` the same hover leaves it unchanged; open "Implementazioni importanti" → content visible.
- [ ] **Step 4:** Commit: `git commit -m "Risposte morbide al tocco e transizioni tra pagine"`

### Task 8: Verification and documentation

**Files:**
- Modify: `DESIGN.md`, `PRODUCT.md`, `README.md`, `docs/CONTEXT.md` (sections "Tipografia" and "Scena 3D" rewritten), `structure-repo.md`, `AGENTS.md` only if a rule changes, `portfolio-angular/src/app/data/projects.data.ts` "Portfolio" card only if it mentions the old style or Three.js
- External: Notion portfolio card (via the Notion connector; ask Fabio if it is not reachable)

- [ ] **Step 1:** Run `npm run format:check`, `npm run test:ci`, `npm run build`. Expected: all pass. Compare chunk sizes with the Task 1 baseline and report the difference.
- [ ] **Step 2:** Playwright screenshots of `/`, `/about`, `/experience`, `/projects`, `/contact` at 1440, 1024, 768, 390 in light and dark, plus `/` and `/projects` with `reducedMotion: 'reduce'`. Expected: no clipped, overlapping or hidden content; `document.documentElement.scrollWidth === innerWidth`; sky visible on every page; under reduced motion no pause button and highlight text fully inked.
- [ ] **Step 3:** Navigation stress: visit `/` → `/projects` → `/about` → `/` ten times; count `canvas` elements after each hop. Expected: never more than 1.
- [ ] **Step 4:** Playwright with `--disable-gpu --disable-webgl`: `/` loads, hero text visible, no uncaught error.
- [ ] **Step 5:** Emulated phone (Playwright `devices['Pixel 7']`): touch-drag over the hero moves the light and the page still scrolls.
- [ ] **Step 6:** Rewrite `DESIGN.md` from the implemented CSS (palette Calm, Nunito, radii, shadows, motion inventory, reduced motion, "allowed: slow ambient sky with pause; forbidden: scroll-linked text motion"); update `PRODUCT.md` brand commitments ("animazioni calme e continue") and the library rule (font package and vendored kit allowed); update the other documents listed above. Go through the list and state for each whether it changed or why not.
- [ ] **Step 7:** Commit: `git commit -m "Documentazione allineata al redesign Cielo dipinto"` and push the branch.

---

## Addendum, 20 novembre 2026: cielo stellato

Dopo il primo giro della PR #76 il design è stato rivisto (sezione «Revisione del 20 novembre 2026: cielo stellato» della spec). Implementazione sulla stessa PR: motore `src/app/shared/sky/sky-engine.ts` (canvas 2D, test delle funzioni pure in `sky-engine.spec.ts`), `SkyComponent` riscritto sul motore (test in `sky.component.spec.ts`), `WordHighlightDirective` al posto di `MomentDirective`, rimossi `KitLoader`, `SkyLightDirective`, i file del kit in `src/assets/vendor/` e la loro voce in `angular.json`.
