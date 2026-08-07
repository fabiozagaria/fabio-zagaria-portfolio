import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('uses the dedicated CV download URL', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const downloadLink = element.querySelector<HTMLAnchorElement>('a[download]');

    expect(downloadLink?.getAttribute('href')).toBe('/downloads/CV.pdf');
    expect(downloadLink?.getAttribute('download')).toBe('CV_Fabio_Zagaria.pdf');
  });
});
