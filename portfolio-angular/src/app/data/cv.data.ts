import type { PortfolioLanguage } from '../core/language.service';

/** Data dei contenuti e SHA-256 dei PDF, registrati da `npm run cv:meta`. */
export const CV = {
  updatedAt: '2026-11-26',
  sha256: '7ad2e54a54ead95120f5b955e68cf6ba407c2edde681027fce17804c73f8fab9',
} as const;

export const CV_EN = {
  updatedAt: '2026-11-26',
  sha256: '6bd3b3839f4ab5224a292e79a86f822fd8339c67cd61f55bb27b20afaf8b7cc2',
} as const;

const italianDate = new Intl.DateTimeFormat('it-IT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Il fuso UTC mantiene la data del documento anche cambiando fuso orario. */
export function cvUpdatedLabel(updatedAt: string = CV.updatedAt): string {
  return italianDate.format(new Date(`${updatedAt}T00:00:00Z`));
}

function documentLinks(
  language: PortfolioLanguage,
  filename: string,
  downloadName: string,
  metadata: { readonly updatedAt: string; readonly sha256: string },
) {
  const version = metadata.sha256.slice(0, 8);
  return {
    language,
    version,
    view: `/assets/documents/${filename}?v=${version}`,
    download: `/downloads/${filename}?v=${version}`,
    downloadName,
    updatedAt: metadata.updatedAt,
    updatedLabel: cvUpdatedLabel(metadata.updatedAt),
  } as const;
}

export const CV_DOCUMENTS = {
  it: documentLinks('it', 'CV.pdf', 'CV_Fabio_Zagaria.pdf', CV),
  en: documentLinks('en', 'CV-en.pdf', 'CV_Fabio_Zagaria_EN.pdf', CV_EN),
};

export const CV_VERSION = CV_DOCUMENTS.it.version;
export const CV_VIEW_URL = CV_DOCUMENTS.it.view;
export const CV_DOWNLOAD_URL = CV_DOCUMENTS.it.download;
export const CV_DOWNLOAD_NAME = CV_DOCUMENTS.it.downloadName;
