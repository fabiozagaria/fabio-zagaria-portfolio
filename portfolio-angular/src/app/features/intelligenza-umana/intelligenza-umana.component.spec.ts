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

  it('presents the project on its own page with the horizontal logo and no external links', () => {
    const fixture = TestBed.createComponent(IntelligenzaUmanaComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const logo = element.querySelector<HTMLImageElement>('.c-iu__logo img');

    expect(element.querySelector('h1')?.textContent).toContain('Intelligenza Umana');
    expect(logo?.getAttribute('alt')).toContain('Intelligenza Umana');
    expect(element.textContent).toContain('in costruzione');
    for (const link of Array.from(element.querySelectorAll('a'))) {
      expect(link.getAttribute('href') ?? '').not.toMatch(/^https?:/);
    }
  });
});
