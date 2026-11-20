import { type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { KitLoader } from '../shared/sky/kit-loader.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';

const PAGES: [string, Type<unknown>, string][] = [
  ['About', AboutComponent, 'Chi sono'],
  ['Experience', ExperienceComponent, 'Esperienza e formazione'],
  ['Projects', ProjectsComponent, 'Progetti'],
  ['Contact', ContactComponent, 'CONTATTI'],
];

describe('Sky band on the inner pages', () => {
  for (const [name, page, title] of PAGES) {
    it(`${name} shows the sky band behind the page title`, async () => {
      await TestBed.configureTestingModule({
        imports: [page],
        providers: [
          provideRouter([]),
          {
            provide: KitLoader,
            useValue: {
              mountSky: vi.fn().mockRejectedValue(new Error('no kit in tests')),
              loadMoments: vi.fn(),
            },
          },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(page);
      fixture.detectChanges();
      const element = fixture.nativeElement as HTMLElement;
      const section = element.querySelector('section.o-section')!;
      const band = section.querySelector('app-sky');
      const heading = section.querySelector('h1')!;

      expect(band).not.toBeNull();
      expect(band!.classList.contains('c-sky--band')).toBe(true);
      expect(
        band!.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      expect(heading.textContent?.trim()).toBe(title);
    });
  }
});
