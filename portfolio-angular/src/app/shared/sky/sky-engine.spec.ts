import { buildStars, smooth, stepMix } from './sky-engine';

describe('sky engine helpers', () => {
  it('moves the night-day mix toward its target and lands on it', () => {
    let mix = 0;
    mix = stepMix(mix, 1, 16);
    expect(mix).toBeGreaterThan(0);
    expect(mix).toBeLessThan(0.1);
    for (let i = 0; i < 400; i++) mix = stepMix(mix, 1, 16);
    expect(mix).toBe(1);
  });

  it('takes about two and a half seconds to finish the transition', () => {
    let mix = 0;
    let elapsed = 0;
    while (mix < 1 && elapsed < 10000) {
      mix = stepMix(mix, 1, 16);
      elapsed += 16;
    }
    expect(elapsed).toBeGreaterThan(1800);
    expect(elapsed).toBeLessThan(4500);
  });

  it('eases in and out', () => {
    expect(smooth(0)).toBe(0);
    expect(smooth(1)).toBe(1);
    expect(smooth(0.5)).toBeCloseTo(0.5);
    expect(smooth(0.1)).toBeLessThan(0.1);
  });

  it('draws the same sky every time, with more stars on larger screens', () => {
    const a = buildStars(1440, 900, 'hero');
    const b = buildStars(1440, 900, 'hero');
    expect(a).toEqual(b);
    expect(buildStars(390, 844, 'hero').length).toBeLessThan(a.length);
    expect(a.length).toBeLessThanOrEqual(520);
  });
});
