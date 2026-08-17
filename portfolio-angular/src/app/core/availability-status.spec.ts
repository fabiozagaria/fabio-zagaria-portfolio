import { describe, expect, it } from 'vitest';
import { getAvailabilityStatus } from './availability-status';

const atNoonUtc = (date: string): Date => new Date(`${date}T12:00:00Z`);

describe('getAvailabilityStatus', () => {
  it('stays hidden before the announcement window', () => {
    expect(getAvailabilityStatus(atNoonUtc('2026-08-16'))).toBeNull();
  });

  it('announces the planned pause before it begins', () => {
    expect(getAvailabilityStatus(atNoonUtc('2026-08-17'))?.state).toBe('scheduled');
    expect(getAvailabilityStatus(atNoonUtc('2026-08-28'))?.title).toBe('Pausa programmata');
  });

  it('switches to away status for the complete holiday window', () => {
    expect(getAvailabilityStatus(atNoonUtc('2026-08-29'))?.state).toBe('away');
    expect(getAvailabilityStatus(atNoonUtc('2026-09-06'))?.state).toBe('away');
  });

  it('hides itself automatically after the return date', () => {
    expect(getAvailabilityStatus(atNoonUtc('2026-09-07'))).toBeNull();
  });
});
