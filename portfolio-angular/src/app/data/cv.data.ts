/**
 * Versione del CV distribuito dal sito.
 *
 * - `updatedAt` è la data in cui sono cambiati i CONTENUTI del CV: non la data della build né quella
 *   della copia nel repository del curriculum. Se il CV non cambia, la data resta quella.
 * - `sha256` è l'impronta del file `src/assets/documents/CV.pdf`.
 *
 * Si aggiornano insieme, dopo ogni rigenerazione con Career Ops, con
 * `npm run cv:meta -- AAAA-MM-GG`. Il test `cv.data.spec.ts` fallisce se il PDF cambia senza che
 * data e impronta siano stati aggiornati: nessun CV nuovo passa inosservato.
 */
export const CV = {
  updatedAt: '2026-11-05',
  sha256: '8db4d3002ebccea6a43bd2c24774ead36e6102f8460b4a1fe51a5a11e8deae9e',
} as const;

/** Prime otto cifre dell'impronta: cambia a ogni nuovo CV, così il browser non serve una copia vecchia. */
export const CV_VERSION = CV.sha256.slice(0, 8);
export const CV_VIEW_URL = `/assets/documents/CV.pdf?v=${CV_VERSION}`;
export const CV_DOWNLOAD_URL = `/downloads/CV.pdf?v=${CV_VERSION}`;
export const CV_DOWNLOAD_NAME = 'CV_Fabio_Zagaria.pdf';

/** «5 novembre 2026». La data è un giorno di calendario: si legge in UTC per non scivolare di giorno. */
export function cvUpdatedLabel(): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${CV.updatedAt}T00:00:00Z`));
}
