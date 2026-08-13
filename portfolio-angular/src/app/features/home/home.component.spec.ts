import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('uses the dedicated CV download URL', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const downloadLink = element.querySelector<HTMLAnchorElement>('a[download]');

    expect(downloadLink?.getAttribute('href')).toBe('/downloads/CV.pdf');
    expect(downloadLink?.getAttribute('download')).toBe('CV_Fabio_Zagaria.pdf');
  });

  it('shows only the selected recruiter-facing projects', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('Student Management API');
    expect(element.textContent).toContain('Gestionale Spese');
    expect(element.textContent).not.toContain('GitHub nel 2026');
    expect(element.textContent).not.toContain('Fakeflix');
  });
});
