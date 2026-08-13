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

  it('shows the GitHub activity snapshot', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('GitHub nel 2026');
    expect(element.textContent).toContain('40');
    expect(element.textContent).toContain('Commit nel periodo');
  });

  it('filters the activity by month without counting weekend days as weekdays', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.selectMonthValue('2026-08');
    fixture.detectChanges();

    expect(fixture.componentInstance.periodStats()).toEqual({
      commits: 21,
      activeDays: 4,
      activeWeekdays: 2,
    });
  });
});
