import { Injectable } from '@angular/core';

/**
 * The sky ("Cielo stellato"): a 2D canvas that is a starry night in the dark
 * theme (stars, two galaxies, a ringed planet and a moon, rare shooting stars,
 * constellations that follow the pointer) and a day with the sun and soft
 * clouds in the light theme. Changing theme blends the two skies.
 */

export type SkyVariant = 'hero' | 'band';

export interface SkyEngineOptions {
  variant: SkyVariant;
  dark: boolean;
  reduced: boolean;
}

export interface SkyEngine {
  /** Night (true) or day; `animate` blends the two skies over about 2.5 s. */
  setDark(dark: boolean, animate: boolean): void;
  /** Pointer or finger position, in CSS pixels relative to the canvas. */
  aim(x: number, y: number): void;
  release(): void;
  pause(): void;
  resume(): void;
  destroy(): void;
}

export interface Star {
  x: number;
  y: number;
  depth: number;
  r: number;
  base: number;
  speed: number;
  phase: number;
  warm: boolean;
  glow: number;
}

const MIX_TIME = 650; // ms; the blend settles in about 2.5 s
const MAX_STARS = 520;

/** Moves the night (0) to day (1) mix toward its target, frame by frame. */
export function stepMix(mix: number, target: number, dt: number): number {
  const next = mix + (target - mix) * (1 - Math.exp(-dt / MIX_TIME));
  return Math.abs(target - next) < 0.002 ? target : next;
}

/** While the sky only drifts, drawing at about 30 frames per second is enough and halves the cost. */
export function shouldDraw(now: number, lastDraw: number, busy: boolean): boolean {
  return busy || now - lastDraw >= 30;
}

/** Ease in and out (smoothstep). */
export function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

/** Small seeded generator, so every visit shows the same sky. */
function random(seed: number): () => number {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

export function buildStars(width: number, height: number, variant: SkyVariant): Star[] {
  const rnd = random(variant === 'hero' ? 20261120 : 20261121);
  const count = Math.round(Math.min(MAX_STARS, (width * height) / 2600));
  return Array.from({ length: count }, () => {
    const depth = rnd();
    return {
      x: rnd() * width,
      y: rnd() * height,
      depth,
      r: 0.5 + depth * depth * 1.9,
      base: 0.35 + depth * 0.6,
      speed: 0.25 + rnd() * 0.6,
      phase: rnd() * Math.PI * 2,
      warm: rnd() < 0.12,
      glow: 0,
    };
  });
}

interface Sprite {
  canvas: HTMLCanvasElement;
  w: number;
  h: number;
}
interface Galaxy extends Sprite {
  x: number;
  y: number;
  tilt: number;
  squash: number;
  spin: number;
  depth: number;
}
interface Cloud extends Sprite {
  x: number;
  y: number;
  v: number;
  depth: number;
}
interface PlanetLook {
  bands: string[];
  ring: string | null;
  atmo: string;
}

const PLANET: PlanetLook = {
  bands: ['#d9ecdf', '#b4dccb', '#cfe0ec', '#9fcbbd', '#7fb5a8', '#a9c3d6'],
  ring: '190,214,228',
  atmo: '166,219,214',
};
const MOON: PlanetLook = {
  bands: ['#eef4f2', '#c9d6d3', '#a9b9b6'],
  ring: null,
  atmo: '228,239,237',
};

class CanvasSky implements SkyEngine {
  private readonly main: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private stars: Star[] = [];
  private galaxies: Galaxy[] = [];
  private clouds: Cloud[] = [];
  private backdrops: { night?: HTMLCanvasElement; day?: HTMLCanvasElement } = {};
  private layers: { night?: HTMLCanvasElement; day?: HTMLCanvasElement } = {};
  private readonly pointer = { x: 0, y: 0, tx: 0, ty: 0, on: 0, target: 0 };
  private mix: number;
  private mixTarget: number;
  private time = 0;
  private frame = 0;
  private lastDraw = 0;
  private planetSprites: { planet?: Sprite; moon?: Sprite } = {};
  private halos: { cool?: HTMLCanvasElement; warm?: HTMLCanvasElement } = {};
  private paused = false;
  private visible = true;
  private meteor: { x: number; y: number; life: number } | null = null;
  private nextMeteor = 6000;
  private readonly rnd = random(4242);
  private readonly resizeObserver: ResizeObserver | null;
  private readonly intersection: IntersectionObserver | null;
  private readonly onVisibility = () => this.wake();

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly options: SkyEngineOptions,
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('This browser cannot draw the sky.');
    this.main = this.ctx = ctx;
    this.mix = this.mixTarget = options.dark ? 0 : 1;
    this.resizeObserver =
      typeof ResizeObserver === 'function' ? new ResizeObserver(() => this.resize()) : null;
    this.resizeObserver?.observe(canvas);
    this.intersection =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(([entry]) => {
            this.visible = entry.isIntersecting;
            this.wake();
          })
        : null;
    this.intersection?.observe(canvas);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.resize();
  }

  setDark(dark: boolean, animate: boolean): void {
    this.mixTarget = dark ? 0 : 1;
    if (!animate || this.options.reduced) this.mix = this.mixTarget;
    this.wake(true);
  }

  aim(x: number, y: number): void {
    this.pointer.tx = x;
    this.pointer.ty = y;
    this.pointer.target = 1;
    if (!this.options.reduced) this.wake(true);
  }

  release(): void {
    this.pointer.target = 0;
    if (!this.options.reduced) this.wake(true);
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
    this.wake();
  }

  destroy(): void {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.resizeObserver?.disconnect();
    this.intersection?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  // ---- lifecycle -----------------------------------------------------------

  /** Schedules frames while something should move; a single frame otherwise. */
  private wake(once = false): void {
    if (this.frame) return;
    if (this.options.reduced) {
      this.draw(0);
      return;
    }
    const run = (now: number) => {
      const blending = this.mix !== this.mixTarget;
      const settling = Math.abs(this.pointer.target - this.pointer.on) > 0.01;
      const live = !this.paused && this.visible && !document.hidden;
      const busy = blending || settling || once;
      if ((live || busy) && shouldDraw(now, this.lastDraw, busy)) {
        const dt = this.lastDraw ? Math.min(50, now - this.lastDraw) : 16;
        this.lastDraw = now;
        this.draw(dt);
      }
      once = false;
      this.frame = live || blending || settling ? requestAnimationFrame(run) : 0;
      if (!this.frame) this.lastDraw = 0;
    };
    this.frame = requestAnimationFrame(run);
  }

  private resize(): void {
    const box = this.canvas.getBoundingClientRect();
    if (!box.width || !box.height) return;
    this.dpr = Math.min(globalThis.devicePixelRatio || 1, 1.75);
    this.width = box.width;
    this.height = box.height;
    this.canvas.width = Math.round(box.width * this.dpr);
    this.canvas.height = Math.round(box.height * this.dpr);
    this.stars = buildStars(this.width, this.height, this.options.variant);
    if (!this.pointer.tx) {
      this.pointer.x = this.pointer.tx = this.width * 0.72;
      this.pointer.y = this.pointer.ty = this.height * 0.3;
    }
    this.backdrops = { night: this.makeBackdrop(true), day: this.makeBackdrop(false) };
    this.layers = { night: this.makeCanvas(), day: this.makeCanvas() };
    this.galaxies = this.makeGalaxies();
    this.makeSprites();
    this.clouds = this.makeClouds();
    this.draw(0);
    this.wake();
  }

  // ---- frame ---------------------------------------------------------------

  private draw(dt: number): void {
    if (!this.width || !this.layers.night || !this.layers.day) return;
    this.time += dt;
    const p = this.pointer;
    p.x += (p.tx - p.x) * 0.08;
    p.y += (p.ty - p.y) * 0.08;
    p.on += (p.target - p.on) * 0.06;
    this.mix = this.options.reduced ? this.mixTarget : stepMix(this.mix, this.mixTarget, dt);
    const day = smooth(this.mix);
    const m = this.main;
    // Settled on night or on day: paint straight on the canvas, no intermediate copy.
    if (day === 0 || day === 1) {
      this.paintScene(m, day === 0, dt);
      return;
    }
    m.setTransform(1, 0, 0, 1, 0, 0);
    m.globalAlpha = 1;
    m.drawImage(this.paintLayer(true, dt), 0, 0);
    m.globalAlpha = day;
    m.drawImage(this.paintLayer(false, dt), 0, 0);
    m.globalAlpha = 1;
  }

  private paintScene(target: CanvasRenderingContext2D, night: boolean, dt: number): void {
    this.ctx = target;
    target.setTransform(1, 0, 0, 1, 0, 0);
    target.globalAlpha = 1;
    target.drawImage(night ? this.backdrops.night! : this.backdrops.day!, 0, 0);
    target.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (night) this.drawNight(dt);
    else this.drawDay(dt);
    this.ctx = this.main;
  }

  private paintLayer(night: boolean, dt: number): HTMLCanvasElement {
    const layer = night ? this.layers.night! : this.layers.day!;
    this.paintScene(layer.getContext('2d')!, night, dt);
    return layer;
  }

  private drawNight(dt: number): void {
    const { ctx, width: W, height: H, pointer: p } = this;
    const reduced = this.options.reduced;
    this.drawGalaxies();

    const lr = Math.min(W, H) * 0.45;
    const light = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, lr);
    light.addColorStop(0, `rgba(166,219,214,${0.1 + 0.1 * p.on})`);
    light.addColorStop(1, 'rgba(166,219,214,0)');
    ctx.fillStyle = light;
    ctx.fillRect(p.x - lr, p.y - lr, lr * 2, lr * 2);

    const reach = Math.min(240, Math.max(140, W * 0.16));
    const drift = reduced ? 0 : this.time * 0.000004; // the sky turns slowly, like the Earth
    const near: { x: number; y: number; k: number }[] = [];
    for (const s of this.stars) {
      const ang = drift * (0.4 + s.depth);
      const x = ((s.x + ang * 900 * s.depth) % (W + 20)) - 10;
      const y = s.y + Math.sin(ang * 3) * 4 * s.depth;
      const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(this.time * 0.001 * s.speed + s.phase);
      const close = Math.max(0, 1 - Math.hypot(x - p.x, y - p.y) / reach) * p.on;
      s.glow += (close - s.glow) * 0.08;
      if (close > 0.15) near.push({ x, y, k: close });
      const a = Math.min(1, s.base * twinkle + s.glow * 0.8);
      const r = s.r * (1 + s.glow * 0.9);
      const rgb = s.warm ? '206,224,246' : '236,246,244';
      const halo = s.warm ? this.halos.warm : this.halos.cool;
      if (r > 1.2 && halo) {
        ctx.globalAlpha = a;
        ctx.drawImage(halo, x - r * 4, y - r * 4, r * 8, r * 8);
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = `rgba(${rgb},${a})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    this.drawPlanets();

    // Constellation: each lit star joins its two nearest lit neighbours.
    const points = near.sort((a, b) => b.k - a.k).slice(0, 14);
    ctx.lineWidth = 1;
    for (const point of points) {
      const others = points
        .filter((q) => q !== point)
        .map((q) => [q, Math.hypot(q.x - point.x, q.y - point.y)] as const)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 2);
      for (const [q, dist] of others) {
        if (dist > reach * 0.9) continue;
        ctx.strokeStyle = `rgba(166,219,214,${Math.min(point.k, q.k) * 0.55})`;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }

    if (!reduced) this.drawMeteor(dt);
  }

  private drawMeteor(dt: number): void {
    const { ctx, width: W, height: H } = this;
    this.nextMeteor -= dt;
    if (!this.meteor && this.nextMeteor <= 0) {
      this.meteor = {
        x: W * (0.35 + this.rnd() * 0.5),
        y: H * (0.05 + this.rnd() * 0.25),
        life: 0,
      };
      this.nextMeteor = 9000 + this.rnd() * 9000;
    }
    if (!this.meteor) return;
    this.meteor.life += dt;
    const t = this.meteor.life / 1600;
    const ease = 1 - Math.pow(1 - t, 3);
    const len = Math.min(W, 700) * 0.28;
    const hx = this.meteor.x - ease * len * 1.4;
    const hy = this.meteor.y + ease * len * 0.55;
    const fade = Math.sin(Math.PI * Math.min(1, t));
    const tail = ctx.createLinearGradient(hx, hy, hx + len * 0.6, hy - len * 0.24);
    tail.addColorStop(0, `rgba(244,250,248,${0.85 * fade})`);
    tail.addColorStop(1, 'rgba(244,250,248,0)');
    ctx.strokeStyle = tail;
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(hx + len * 0.6, hy - len * 0.24);
    ctx.stroke();
    if (t >= 1) this.meteor = null;
  }

  private drawGalaxies(): void {
    const { ctx, width: W, height: H, pointer: p } = this;
    const px = p.x - W / 2;
    const py = p.y - H / 2;
    for (const g of this.galaxies) {
      ctx.save();
      ctx.translate(g.x * W - px * 0.015 * g.depth, g.y * H - py * 0.015 * g.depth);
      ctx.rotate(g.tilt);
      ctx.scale(1, g.squash);
      ctx.rotate(this.options.reduced ? 0 : this.time * g.spin);
      ctx.drawImage(g.canvas, -g.w / 2, -g.h / 2, g.w, g.h);
      ctx.restore();
    }
  }

  private drawPlanets(): void {
    const { width: W, height: H, pointer: p, ctx } = this;
    const px = p.x - W / 2;
    const py = p.y - H / 2;
    const m = Math.min(W, H);
    const sink = smooth(this.mix) * H * 0.55; // in the morning the planets set
    const bob = this.options.reduced ? 0 : Math.sin(this.time * 0.0004) * m * 0.004;
    const put = (sprite: Sprite | undefined, cx: number, cy: number) => {
      if (sprite)
        ctx.drawImage(sprite.canvas, cx - sprite.w / 2, cy - sprite.h / 2, sprite.w, sprite.h);
    };
    put(this.planetSprites.planet, W * 0.86 - px * 0.04, H * 0.2 - py * 0.04 + bob + sink);
    put(this.planetSprites.moon, W * 0.66 - px * 0.025, H * 0.47 - py * 0.025 - bob + sink);
  }

  /** The planets and the star halos never change: they are drawn once per size. */
  private makeSprites(): void {
    const m = Math.min(this.width, this.height);
    const planet = (r: number, look: PlanetLook): Sprite => {
      const size = r * 4.4;
      const c = this.makeCanvas(size * this.dpr, size * this.dpr);
      const g = c.getContext('2d')!;
      g.scale(this.dpr, this.dpr);
      this.drawPlanet(g, size / 2, size / 2, r, look);
      return { canvas: c, w: size, h: size };
    };
    this.planetSprites = { planet: planet(m * 0.065, PLANET), moon: planet(m * 0.014, MOON) };
    const halo = (rgb: string): HTMLCanvasElement => {
      const c = this.makeCanvas(64, 64);
      const g = c.getContext('2d')!;
      const glow = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      glow.addColorStop(0, `rgba(${rgb},0.35)`);
      glow.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = glow;
      g.fillRect(0, 0, 64, 64);
      return c;
    };
    this.halos = { cool: halo('236,246,244'), warm: halo('206,224,246') };
  }

  private drawPlanet(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    look: PlanetLook,
  ): void {
    const tilt = -0.38;
    const ring = (from: number, to: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.scale(1, 0.24);
      // concentric rings with a dark gap, like Saturn's Cassini division
      for (const [rr, w, a] of [
        [1.32, 0.08, 0.2],
        [1.45, 0.16, 0.42],
        [1.62, 0.14, 0.55],
        [1.86, 0.12, 0.34],
        [2.02, 0.08, 0.18],
      ]) {
        ctx.strokeStyle = `rgba(${look.ring},${a})`;
        ctx.lineWidth = r * w;
        ctx.beginPath();
        ctx.arc(0, 0, r * rr, from, to);
        ctx.stroke();
      }
      ctx.restore();
    };
    if (look.ring) ring(Math.PI, Math.PI * 2);
    const atmosphere = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.35);
    atmosphere.addColorStop(0, `rgba(${look.atmo},0.35)`);
    atmosphere.addColorStop(1, `rgba(${look.atmo},0)`);
    ctx.fillStyle = atmosphere;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    const body = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
    look.bands.forEach((c, i) => body.addColorStop(i / (look.bands.length - 1), c));
    ctx.fillStyle = body;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    for (const [k, h, a] of [
      [-0.55, 0.1, 0.1],
      [-0.2, 0.16, 0.12],
      [0.18, 0.07, 0.1],
      [0.42, 0.13, 0.08],
    ]) {
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath();
      ctx.ellipse(0, k * r, r * 1.1, h * r, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.rotate(-tilt);
    ctx.translate(-cx, -cy);
    const shade = ctx.createLinearGradient(
      cx - r * 0.7,
      cy - r * 0.7,
      cx + r * 0.75,
      cy + r * 0.75,
    );
    shade.addColorStop(0, 'rgba(255,255,255,0.12)');
    shade.addColorStop(0.45, 'rgba(4,12,14,0)');
    shade.addColorStop(0.8, 'rgba(4,12,14,0.55)');
    shade.addColorStop(1, 'rgba(4,12,14,0.85)');
    ctx.fillStyle = shade;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    if (look.ring) {
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.scale(1, 0.24);
      ctx.strokeStyle = 'rgba(4,12,14,0.16)';
      ctx.lineWidth = r * 0.3;
      ctx.beginPath();
      ctx.arc(0, r * 0.9, r * 1.5, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
    }
    ctx.restore();
    if (look.ring) ring(0, Math.PI);
  }

  private drawDay(dt: number): void {
    const { ctx, width: W, height: H, pointer: p } = this;
    const m = Math.min(W, H);
    const px = p.x - W / 2;
    const py = p.y - H / 2;
    const rise = 1 - smooth(this.mix); // the sun rises as the day comes
    const sx = W * 0.8 - px * 0.01;
    const sy = H * 0.22 - py * 0.01 + rise * H * 0.55;
    const sr = m * 0.06;
    const pulse = this.options.reduced ? 0 : Math.sin(this.time * 0.0006) * 0.04;
    const halo = ctx.createRadialGradient(sx, sy, sr * 0.6, sx, sy, sr * 7);
    halo.addColorStop(0, `rgba(255,236,196,${0.55 + pulse})`);
    halo.addColorStop(0.35, 'rgba(255,240,214,0.22)');
    halo.addColorStop(1, 'rgba(255,244,226,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(sx - sr * 7, sy - sr * 7, sr * 14, sr * 14);
    const disc = ctx.createRadialGradient(sx - sr * 0.2, sy - sr * 0.2, 0, sx, sy, sr);
    disc.addColorStop(0, '#fffdf6');
    disc.addColorStop(0.8, '#fff3d9');
    disc.addColorStop(1, 'rgba(255,236,196,0.9)');
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
    for (const c of this.clouds) {
      if (!this.options.reduced) c.x += c.v * dt * (0.6 + c.depth);
      if (c.x > W + 20) c.x = -c.w - 20;
      ctx.drawImage(c.canvas, c.x - px * 0.03 * c.depth, c.y - py * 0.02 * c.depth, c.w, c.h);
    }
  }

  // ---- static pictures, made once per size -------------------------------------

  private makeCanvas(width = this.canvas.width, height = this.canvas.height): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.ceil(width));
    c.height = Math.max(1, Math.ceil(height));
    return c;
  }

  private makeBackdrop(night: boolean): HTMLCanvasElement {
    const c = this.makeCanvas();
    const b = c.getContext('2d')!;
    const { width: W, height: H } = this;
    b.scale(this.dpr, this.dpr);
    const sky = b.createLinearGradient(0, 0, 0, H);
    const stops = night
      ? ['#060d10', '#0c1a1e', '#13292c']
      : ['#c9e0ea', '#e4eff0', '#eaf1f2', '#eef3ee'];
    stops.forEach((colour, i) => sky.addColorStop(i / (stops.length - 1), colour));
    b.fillStyle = sky;
    b.fillRect(0, 0, W, H);
    const glows: [number, number, number, string][] = night
      ? [
          [0.78, 0.28, 0.42, '124,196,192,0.20'],
          [0.62, 0.42, 0.3, '159,210,180,0.12'],
          [0.88, 0.12, 0.22, '150,170,214,0.10'],
          [0.2, 0.75, 0.35, '124,196,192,0.07'],
        ]
      : [[0.8, 0.22, 0.5, '246,250,250,0.55']];
    for (const [cx, cy, rr, rgba] of glows) {
      const rgb = rgba.split(',').slice(0, 3).join(',');
      const radius = rr * Math.max(W, H);
      const glow = b.createRadialGradient(cx * W, cy * H, 0, cx * W, cy * H, radius);
      glow.addColorStop(0, `rgba(${rgba})`);
      glow.addColorStop(1, `rgba(${rgb},0)`);
      b.fillStyle = glow;
      b.fillRect(0, 0, W, H);
    }
    return c;
  }

  private makeGalaxies(): Galaxy[] {
    const m = Math.min(this.width, this.height);
    const make = (R: number, arms: number, points: number, core: string) => {
      const c = this.makeCanvas(R * 2 * this.dpr, R * 2 * this.dpr);
      const g = c.getContext('2d')!;
      g.scale(this.dpr, this.dpr);
      g.translate(R, R);
      const glow = g.createRadialGradient(0, 0, 0, 0, 0, R * 0.55);
      glow.addColorStop(0, `rgba(${core},0.55)`);
      glow.addColorStop(0.3, `rgba(${core},0.18)`);
      glow.addColorStop(1, `rgba(${core},0)`);
      g.fillStyle = glow;
      g.beginPath();
      g.arc(0, 0, R, 0, Math.PI * 2);
      g.fill();
      for (let i = 0; i < points; i++) {
        const t = Math.pow(this.rnd(), 0.7);
        const arm = (i % arms) * ((Math.PI * 2) / arms);
        const a = arm + t * Math.PI * 3.1 + (this.rnd() - 0.5) * (0.9 - t * 0.5);
        const r = t * R * 0.95 + (this.rnd() - 0.5) * R * 0.06;
        g.fillStyle =
          t < 0.25
            ? `rgba(206,224,246,${0.55 - t})`
            : `rgba(${t > 0.6 ? '166,219,214' : '214,236,232'},${0.5 * (1 - t) + 0.08})`;
        const size = this.rnd() < 0.04 ? 1.4 : 0.7;
        g.fillRect(Math.cos(a) * r, Math.sin(a) * r, size, size);
      }
      return { canvas: c, w: R * 2, h: R * 2 };
    };
    return [
      {
        ...make(m * 0.24, 2, 2600, '226,236,244'),
        x: 0.27,
        y: 0.2,
        tilt: -0.5,
        squash: 0.42,
        spin: 0.000012,
        depth: 0.5,
      },
      {
        ...make(m * 0.08, 3, 500, '214,236,232'),
        x: 0.56,
        y: 0.1,
        tilt: 0.6,
        squash: 0.55,
        spin: -0.00002,
        depth: 0.25,
      },
    ];
  }

  private makeClouds(): Cloud[] {
    const span = Math.max(this.width, 600);
    const make = (w: number): Sprite => {
      const h = w * 0.42;
      const c = this.makeCanvas(w * this.dpr, h * this.dpr);
      const g = c.getContext('2d')!;
      g.scale(this.dpr, this.dpr);
      const puffs = 9 + Math.floor(this.rnd() * 6);
      for (let i = 0; i < puffs; i++) {
        const t = i / (puffs - 1);
        const x = w * (0.14 + t * 0.72) + (this.rnd() - 0.5) * w * 0.06;
        const r = h * (0.22 + Math.sin(t * Math.PI) * 0.26 + this.rnd() * 0.06);
        const y = h * 0.66 - Math.sin(t * Math.PI) * h * 0.18 + (this.rnd() - 0.5) * h * 0.05;
        const puff = g.createRadialGradient(x, y - r * 0.25, r * 0.1, x, y, r);
        puff.addColorStop(0, 'rgba(246,250,250,0.8)');
        puff.addColorStop(0.6, 'rgba(238,244,245,0.6)');
        puff.addColorStop(1, 'rgba(240,246,247,0)');
        g.fillStyle = puff;
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      }
      const underside = g.createLinearGradient(0, h * 0.5, 0, h);
      underside.addColorStop(0, 'rgba(91,116,120,0)');
      underside.addColorStop(1, 'rgba(91,116,120,0.12)');
      g.globalCompositeOperation = 'source-atop';
      g.fillStyle = underside;
      g.fillRect(0, 0, w, h);
      return { canvas: c, w, h };
    };
    const layout: [number, number, number, number, number][] = [
      [0.05, 0.16, 0.34, 0.006, 0.3],
      [0.45, 0.08, 0.24, 0.004, 0.2],
      [0.7, 0.36, 0.3, 0.008, 0.45],
      [0.25, 0.5, 0.2, 0.005, 0.25],
      [0.9, 0.58, 0.38, 0.01, 0.55],
    ];
    return layout.map(([x, y, size, v, depth]) => ({
      ...make(span * size * (this.options.variant === 'band' ? 0.6 : 1)),
      x: x * this.width,
      y: y * this.height,
      v,
      depth,
    }));
  }
}

/** Creates the sky on a canvas; throws if the browser cannot draw 2D. */
@Injectable({ providedIn: 'root' })
export class SkyEngineFactory {
  create(canvas: HTMLCanvasElement, options: SkyEngineOptions): SkyEngine {
    return new CanvasSky(canvas, options);
  }
}
