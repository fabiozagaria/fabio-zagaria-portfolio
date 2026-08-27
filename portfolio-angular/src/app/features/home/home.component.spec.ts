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

    expect(element.textContent).toContain('Gestionale Spese');
    expect(element.textContent).toContain('LabTV');
    expect(element.textContent).not.toContain('Student Management API');
    expect(element.textContent).not.toContain('Fakeflix');
  });

  it('uses the hero to explain the full stack flow of the main project', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const architectureLink = element.querySelector<HTMLAnchorElement>('.c-backend-map__link');

    expect(element.textContent).toContain('Full stack in pratica');
    expect(element.textContent).toContain('Angular UI');
    expect(element.textContent).toContain('Client API');
    expect(element.textContent).toContain('Spring Boot');
    expect(element.textContent).toContain('JPA e MySQL');
    expect(architectureLink?.getAttribute('href')).toBe('/projects#gestionale-spese');
  });

  it('keeps the home focused on role, projects and contact actions', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).not.toContain('Metodo CARAC');
    expect(element.textContent).not.toContain("Uso dell'AI");
  });
});
