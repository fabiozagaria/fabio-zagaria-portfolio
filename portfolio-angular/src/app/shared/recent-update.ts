import type { PortfolioLatestUpdate } from '../data/projects.data';

const DAY_MS = 24 * 60 * 60 * 1000;
/** Il badge "Novità" resta visibile per 3 giorni dopo la data dell'aggiornamento. */
export const NEW_UPDATE_WINDOW_DAYS = 3;

/** Vero se la data dell'ultimo aggiornamento è entro la finestra del badge "Novità". */
export function isRecentUpdate(update: PortfolioLatestUpdate | undefined, now: number): boolean {
  if (!update) {
    return false;
  }
  const updatedAt = Date.parse(update.datetime);
  if (Number.isNaN(updatedAt)) {
    return false;
  }
  return now - updatedAt < (NEW_UPDATE_WINDOW_DAYS + 1) * DAY_MS;
}
