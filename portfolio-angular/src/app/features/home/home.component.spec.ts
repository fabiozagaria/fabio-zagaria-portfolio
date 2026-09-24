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

  it('shows the selected projects and labels Task Manager as a lab', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('Gestionale Spese');
    expect(element.textContent).toContain('LabTV');
    expect(element.textContent).toContain('Task Manager Security Lab');
    expect(element.textContent).toContain('Laboratorio guidato');
    expect(element.textContent).not.toContain('Student Management API');
    expect(element.textContent).not.toContain('Fakeflix');
  });

  it('uses the hero to explain the current main project without duplicating it below', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const architectureLink = element.querySelector<HTMLAnchorElement>('.c-backend-map__link');

    expect(element.textContent).toContain('Progetto principale');
    expect(element.textContent).toContain('JobFlow');
    expect(element.textContent).toContain('Dominio del job');
    expect(element.textContent).toContain('Avanzamento realtime');
    expect(element.textContent).toContain('Scalabilità mirata');
    expect(architectureLink?.getAttribute('href')).toBe('/projects#jobflow');
    expect(fixture.componentInstance.featuredProjects.map((project) => project.id)).not.toContain('jobflow');
  });

  it('keeps the home focused on role, projects and contact actions', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).not.toContain('Metodo CARAC');
    expect(element.textContent).not.toContain("Uso dell'AI");
  });
});
