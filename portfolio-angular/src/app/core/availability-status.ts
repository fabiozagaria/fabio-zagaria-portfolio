export type AvailabilityState = 'scheduled' | 'away';

export interface AvailabilityStatus {
  readonly state: AvailabilityState;
  readonly title: string;
  readonly dateRange: string;
  readonly message: string;
}

const ANNOUNCEMENT_START = '2026-08-17';
const TIME_OFF_START = '2026-08-29';
const TIME_OFF_END = '2026-09-06';

const ROME_DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Rome',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function getAvailabilityStatus(now = new Date()): AvailabilityStatus | null {
  const today = getRomeDateKey(now);

  if (today < ANNOUNCEMENT_START || today > TIME_OFF_END) {
    return null;
  }

  if (today < TIME_OFF_START) {
    return {
      state: 'scheduled',
      title: 'Pausa programmata',
      dateRange: '29 agosto - 6 settembre 2026',
      message:
        'In quei giorni non sarò operativo su studio, progetti o nuove collaborazioni. Riprenderò dal 7 settembre.',
    };
  }

  return {
    state: 'away',
    title: 'Attualmente in ferie',
    dateRange: 'Fino al 6 settembre 2026',
    message:
      'In questo periodo non sono operativo su studio, progetti o nuove collaborazioni. Riprenderò dal 7 settembre.',
  };
}

function getRomeDateKey(date: Date): string {
  const parts = Object.fromEntries(
    ROME_DATE_FORMATTER.formatToParts(date).map(({ type, value }) => [type, value]),
  ) as Record<string, string>;

  return `${parts['year']}-${parts['month']}-${parts['day']}`;
}
