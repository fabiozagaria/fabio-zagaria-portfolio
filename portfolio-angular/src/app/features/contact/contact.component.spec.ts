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

  it('links to the public X profile securely', async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const xLink = element.querySelector<HTMLAnchorElement>(
      'a[href="https://x.com/fabiozagariadev"]',
    );

    expect(xLink).not.toBeNull();
    expect(xLink?.getAttribute('target')).toBe('_blank');
    expect(xLink?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(xLink?.textContent?.trim()).toBe('X · fabiozagariadev');
  });

  it('links to the public Instagram profile securely', async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const instagramLink = element.querySelector<HTMLAnchorElement>(
      'a[href="https://www.instagram.com/zagariafabio.dev/"]',
    );

    expect(instagramLink).not.toBeNull();
    expect(instagramLink?.getAttribute('target')).toBe('_blank');
    expect(instagramLink?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(instagramLink?.textContent?.trim()).toBe('Instagram · zagariafabio.dev');
  });
});
