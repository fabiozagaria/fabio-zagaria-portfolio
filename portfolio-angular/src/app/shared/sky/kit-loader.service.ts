import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Colours the painted sky reads, taken from the Calm theme tokens. */
export interface SkyPalette {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
}

/** What a mounted effect lets the page do (Taste Skill fx.js controller). */
export interface SkyController {
  pause(): void;
  resume(): void;
  setPalette(palette: SkyPalette): void;
  destroy(): void;
}

export interface MomentsApi {
  mount(el: HTMLElement): Promise<{ destroy?(): void } | null>;
}

export interface SkyMountOptions {
  seed: number;
  palette: SkyPalette;
  params: Record<string, number>;
}

/** Served unchanged from src/assets/vendor/taste-skill (see its README). */
const KIT = '/assets/vendor/taste-skill';

/**
 * Loads the Taste Skill kit files at runtime. They stay out of the bundle:
 * the kit resolves its own effect and moment modules by URL.
 */
@Injectable({ providedIn: 'root' })
export class KitLoader {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  async mountSky(el: HTMLElement, options: SkyMountOptions): Promise<SkyController> {
    if (!this.browser) throw new Error('The sky is drawn only in the browser.');
    const module = await import(/* @vite-ignore */ `${KIT}/effects/fx.js`);
    return module.default.mount(el, 'painterly-landscape', options);
  }

  async loadMoments(): Promise<MomentsApi> {
    if (!this.browser) throw new Error('Moments run only in the browser.');
    // Angular mounts each moment through MomentDirective, not the kit's page scan.
    (window as Window & { __momentsManual?: boolean }).__momentsManual = true;
    const module = await import(/* @vite-ignore */ `${KIT}/moments/moments.js`);
    return module.default as MomentsApi;
  }
}
