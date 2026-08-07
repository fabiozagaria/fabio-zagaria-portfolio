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
});
