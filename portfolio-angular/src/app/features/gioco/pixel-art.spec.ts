import { drawPhaseIcon, drawStar, PhaseKind, StarColors } from './pixel-art';

const COLORS: StarColors = { fg: '#f2eaff', accent: '#ffd23f', accent2: '#ff6b9d' };

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A recording stand-in for the canvas context: no DOM canvas is needed. */
function recorder(): { ctx: CanvasRenderingContext2D; rects: Rect[] } {
  const rects: Rect[] = [];
  const ctx = {
    fillStyle: '',
    globalAlpha: 1,
    clearRect: () => undefined,
    fillRect: (x: number, y: number, w: number, h: number) => rects.push({ x, y, w, h }),
  } as unknown as CanvasRenderingContext2D;
  return { ctx, rects };
}

describe('pixel art', () => {
  it('draws the star with many pixels, all inside the 40x40 canvas', () => {
    const { ctx, rects } = recorder();
    drawStar(ctx, COLORS);
    expect(rects.length).toBeGreaterThanOrEqual(200);
    for (const r of rects) {
      expect(r.x).toBeGreaterThanOrEqual(0);
      expect(r.y).toBeGreaterThanOrEqual(0);
      expect(r.x + r.w).toBeLessThanOrEqual(40);
      expect(r.y + r.h).toBeLessThanOrEqual(40);
    }
  });

  it.each<PhaseKind>(['nebula', 'proto', 'main', 'giant'])(
    'draws the %s icon inside the 8x8 canvas',
    (kind) => {
      const { ctx, rects } = recorder();
      drawPhaseIcon(ctx, kind, COLORS);
      expect(rects.length).toBeGreaterThanOrEqual(1);
      for (const r of rects) {
        expect(r.x + r.w).toBeLessThanOrEqual(8);
        expect(r.y + r.h).toBeLessThanOrEqual(8);
      }
    },
  );

  it('draws different shapes for different phases', () => {
    const shapes = (['nebula', 'proto', 'main', 'giant'] as PhaseKind[]).map((kind) => {
      const { ctx, rects } = recorder();
      drawPhaseIcon(ctx, kind, COLORS);
      return rects.length;
    });
    expect(new Set(shapes).size).toBeGreaterThan(1);
  });
});
