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

  it('uses the hero to explain a real backend flow instead of repeating the stack', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const architectureLink = element.querySelector<HTMLAnchorElement>('.c-backend-map__link');

    expect(element.textContent).toContain('Backend in pratica');
    expect(element.textContent).toContain('Controller');
    expect(element.textContent).toContain('Service');
    expect(element.textContent).toContain('Repository');
    expect(element.textContent).toContain('MySQL');
    expect(element.textContent).not.toContain('whoami --stack');
    expect(architectureLink?.getAttribute('href')).toBe('/projects#student-management-api');
  });
});
