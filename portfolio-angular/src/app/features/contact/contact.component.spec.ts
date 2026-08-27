import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  it('uses dedicated download URLs for the professional documents', async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[download]'));

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/downloads/CV.pdf',
      '/downloads/Attestato_LabForWeb_Fabio_Zagaria.pdf',
    ]);
  });

  it('keeps the contact path focused on professional channels', async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const externalLinks = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    );

    expect(element.textContent).toContain('GitHub · fabiozagaria');
    expect(element.textContent).toContain('LinkedIn · fabiozagaria');
    expect(element.textContent).not.toContain('X ·');
    expect(element.textContent).not.toContain('Instagram ·');
    expect(externalLinks.every((link) => link.rel === 'noopener noreferrer')).toBe(true);
  });
});
