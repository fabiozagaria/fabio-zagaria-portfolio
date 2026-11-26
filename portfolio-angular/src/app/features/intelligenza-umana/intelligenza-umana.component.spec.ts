import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SkyEngineFactory } from '../../shared/sky/sky-engine';
import { IntelligenzaUmanaComponent } from './intelligenza-umana.component';

describe('IntelligenzaUmanaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntelligenzaUmanaComponent],
      providers: [
        provideRouter([]),
        {
          provide: SkyEngineFactory,
          useValue: {
            create: () => {
              throw new Error('no canvas in tests');
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('presents the project on its own page with the horizontal logo and a single external link to its site', () => {
    const fixture = TestBed.createComponent(IntelligenzaUmanaComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const logo = element.querySelector<HTMLImageElement>('.c-iu__logo img');

    expect(element.querySelector('h1')?.textContent).toContain('Intelligenza Umana');
    expect(logo?.getAttribute('alt')).toContain('Intelligenza Umana');
    expect(element.textContent).toContain('laboratorio tecnologico indipendente');
    expect(element.textContent).not.toContain('Lancio editoriale');
    expect(
      Array.from(element.querySelectorAll('h2'), (title) => title.textContent?.trim()),
    ).toEqual([
      'Che cos’è',
      'A cosa serve',
      'Perché esiste',
      'Come funziona',
      'A che punto è',
      'Perché ha una pagina sua',
    ]);
    const externalLinks = Array.from(element.querySelectorAll('a')).filter((link) =>
      /^https?:/.test(link.getAttribute('href') ?? ''),
    );

    expect(externalLinks.length).toBe(1);
    expect(externalLinks[0].getAttribute('href')).toBe(
      'https://intelligenza-umana-web.vercel.app/',
    );
    expect(externalLinks[0].getAttribute('target')).toBe('_blank');
    expect(externalLinks[0].getAttribute('rel')).toContain('noopener');
  });
});
