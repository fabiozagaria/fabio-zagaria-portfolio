import { CV, CV_DOWNLOAD_URL, CV_VERSION, CV_VIEW_URL, cvUpdatedLabel } from './cv.data';

describe('CV data', () => {
  it('records a calendar date for the last change of the contents, not in the future', () => {
    expect(CV.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const tomorrow = new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10);
    expect(CV.updatedAt <= tomorrow).toBe(true);
    expect(Number.isNaN(Date.parse(`${CV.updatedAt}T00:00:00Z`))).toBe(false);
  });

  it('records the full SHA-256 of the PDF, and derives the cache-busting version from it', () => {
    expect(CV.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(CV_VERSION).toBe(CV.sha256.slice(0, 8));
    expect(CV_VIEW_URL).toBe(`/assets/documents/CV.pdf?v=${CV_VERSION}`);
    expect(CV_DOWNLOAD_URL).toBe(`/downloads/CV.pdf?v=${CV_VERSION}`);
  });

  it('writes the date as a calendar day in Italian, whatever the time zone', () => {
    // Il giorno non scivola mai: la data si legge in UTC.
    expect(cvUpdatedLabel()).toMatch(/^\d{1,2} [a-zà]+ \d{4}$/);
    expect(cvUpdatedLabel()).toBe(
      new Intl.DateTimeFormat('it-IT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(`${CV.updatedAt}T00:00:00Z`)),
    );
  });
});
