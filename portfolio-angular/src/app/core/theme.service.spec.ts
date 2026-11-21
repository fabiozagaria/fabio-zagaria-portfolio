import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService browser colour', () => {
  let document: Document;
  let metas: HTMLMetaElement[];

  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));
    document = TestBed.inject(DOCUMENT);
    metas = ['(prefers-color-scheme: light)', '(prefers-color-scheme: dark)'].map((media) => {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.setAttribute('media', media);
      meta.content = media.includes('dark') ? '#0f1a1c' : '#f2f6f5';
      document.head.appendChild(meta);
      return meta;
    });
  });

  afterEach(() => {
    metas.forEach((meta) => meta.remove());
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('colours the browser bar for the theme the visitor chose, whatever the system says', () => {
    const theme = TestBed.inject(ThemeService);
    theme.toggle(); // light system, visitor picks dark

    const colours = metas.map((meta) => meta.content);
    expect(colours).toEqual(['#0f1a1c', '#0f1a1c']);
    expect(metas.every((meta) => !meta.hasAttribute('media'))).toBe(true);

    theme.toggle();
    expect(metas.map((meta) => meta.content)).toEqual(['#f2f6f5', '#f2f6f5']);
  });

  it('leaves the colour to the system while the visitor has not chosen', () => {
    TestBed.inject(ThemeService);
    expect(metas.map((meta) => meta.getAttribute('media'))).toEqual([
      '(prefers-color-scheme: light)',
      '(prefers-color-scheme: dark)',
    ]);
  });
});
