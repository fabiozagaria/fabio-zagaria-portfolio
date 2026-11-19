import type { PortfolioLatestUpdate } from '../data/projects.data';

const DAY_MS = 24 * 60 * 60 * 1000;
/** Il badge «Commit recente» resta visibile per 3 giorni dopo la data dell'aggiornamento. */
export const NEW_UPDATE_WINDOW_DAYS = 3;

const romeDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' });

/**
 * Quanto tempo fa è l'ultimo aggiornamento («oggi», «ieri», «2 giorni fa»), contando i
 * giorni di calendario a Roma; `null` se è fuori dalla finestra del badge o la data non è valida.
 */
export function recentUpdateAge(
  update: PortfolioLatestUpdate | undefined,
  now: number,
): string | null {
  if (!update) {
    return null;
  }
  const updatedAt = Date.parse(update.datetime);
  if (Number.isNaN(updatedAt)) {
    return null;
  }
  const days = Math.round((Date.parse(romeDay.format(now)) - updatedAt) / DAY_MS);
  if (days < 0 || days > NEW_UPDATE_WINDOW_DAYS) {
    return null;
  }
  if (days === 0) {
    return 'oggi';
  }
  return days === 1 ? 'ieri' : `${days} giorni fa`;
}
