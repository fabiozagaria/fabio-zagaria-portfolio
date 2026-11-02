import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

const INK = 0xb9c8e8;
const MARK = 0xf5b642;
const SLAB_Y = [1.5, 0.5, -0.5, -1.5];
const SLAB_SIZE = 2.8;
const MODEL_HEIGHT_UNITS = 5.1; // slabs, footprint and the request path, in world units
const ISO_VERTICAL = 0.87; // cos of the camera elevation: world Y to screen Y
const CYCLE_SECONDS = 5.2;

/**
 * Isometric wireframe of the four layers of Expense Tracker (interface,
 * authentication, API, database) with a request travelling down through them.
 * Purely decorative: it is hidden from assistive technology, loaded lazily,
 * paused off-screen and drawn once, without motion, for reduced motion.
 */
@Component({
  selector: 'app-hero-scene',
  standalone: true,
  template: `
    <canvas #canvas aria-hidden="true"></canvas>
    <ul #labels class="labels" aria-hidden="true">
      @for (label of layerLabels; track label) {
        <li>{{ label }}</li>
      }
    </ul>
  `,
  styleUrl: './hero-scene.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSceneComponent {
  protected readonly layerLabels = [
    'Interfaccia Angular',
    'Autenticazione',
    'API REST',
    'Persistenza MySQL',
  ];
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly labels = viewChild.required<ElementRef<HTMLElement>>('labels');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (typeof WebGLRenderingContext === 'undefined') return;
      const start = (): void => void this.mount();
      if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
      else setTimeout(start, 300);
    });
  }

  private async mount(): Promise<void> {
    const THREE = await import('three');
    const canvas = this.canvas().nativeElement;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: InstanceType<typeof THREE.WebGLRenderer>;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return; // no WebGL: the hero simply stays flat
    }
    const coarse = matchMedia('(pointer: coarse)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 50);
    camera.position.set(7, 5.6, 7);
    camera.lookAt(0, -2.1, 0);

    const disposables: { dispose(): void }[] = [];
    const track = <T extends { dispose(): void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    const stack = new THREE.Group();
    scene.add(stack);

    const slabGeometry = track(new THREE.BoxGeometry(SLAB_SIZE, 0.34, SLAB_SIZE));
    const slabEdges = track(new THREE.EdgesGeometry(slabGeometry));
    const gridTop = new THREE.GridHelper(SLAB_SIZE, 7, INK, INK);
    gridTop.position.y = 0.171;
    const gridMaterial = gridTop.material as InstanceType<typeof THREE.LineBasicMaterial>;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.22;
    track(gridTop.geometry);
    track(gridMaterial);

    const inkColor = new THREE.Color(INK);
    const markColor = new THREE.Color(MARK);
    const slabMaterials = SLAB_Y.map(() =>
      track(new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.85 })),
    );
    SLAB_Y.forEach((y, index) => {
      const slab = new THREE.LineSegments(slabEdges, slabMaterials[index]);
      slab.position.y = y;
      slab.add(gridTop.clone());
      stack.add(slab);
    });

    // The request path and the packet that follows it.
    const pathGeometry = track(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, SLAB_Y[0] + 0.7, 0),
        new THREE.Vector3(0, SLAB_Y[3] - 0.7, 0),
      ]),
    );
    const pathMaterial = track(
      new THREE.LineBasicMaterial({ color: MARK, transparent: true, opacity: 0.45 }),
    );
    stack.add(new THREE.Line(pathGeometry, pathMaterial));

    const packetEdges = track(new THREE.EdgesGeometry(track(new THREE.BoxGeometry(0.3, 0.3, 0.3))));
    const packetMaterial = track(new THREE.LineBasicMaterial({ color: MARK }));
    const packet = new THREE.LineSegments(packetEdges, packetMaterial);
    stack.add(packet);

    const top = SLAB_Y[0] + 0.7;
    const bottom = SLAB_Y[3] - 0.7;
    const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));
    const easeInOut = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const onPointer = (event: PointerEvent): void => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };

    const labelItems = Array.from(this.labels().nativeElement.children) as HTMLElement[];
    const placement = { centerX: 0, pixelsPerUnit: 1, width: 0, height: 0, labels: false };

    /** Fits the model into the free area above the info panel (or the whole box on mobile). */
    const resize = (): void => {
      const hostBox = this.host.nativeElement.getBoundingClientRect();
      const { width, height } = hostBox;
      if (!width || !height) return;
      renderer.setSize(width, height, false);

      const panel = document.querySelector<HTMLElement>('.c-hero__side');
      const nav = document.querySelector<HTMLElement>('.c-nav');
      const stacked = matchMedia('(max-width: 860px)').matches;
      const freeTop = stacked
        ? 0
        : Math.max(0, (nav?.getBoundingClientRect().bottom ?? 0) - hostBox.top);
      const panelTop = panel ? panel.getBoundingClientRect().top - hostBox.top : height;
      const freeBottom = stacked ? height : Math.min(height, panelTop - 36);
      const freeHeight = Math.max(120, freeBottom - freeTop);

      const pixelsPerUnit = Math.min(60, freeHeight / MODEL_HEIGHT_UNITS);
      const liftPixels = height / 2 - (freeTop + freeHeight / 2);
      camera.left = -width / 2 / pixelsPerUnit;
      camera.right = width / 2 / pixelsPerUnit;
      camera.top = height / 2 / pixelsPerUnit;
      camera.bottom = -height / 2 / pixelsPerUnit;
      camera.position.set(7, 5.6, 7);
      camera.lookAt(0, -liftPixels / pixelsPerUnit / ISO_VERTICAL, 0);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();

      placement.centerX = width / 2;
      placement.pixelsPerUnit = pixelsPerUnit;
      placement.width = width;
      placement.height = height;
      placement.labels = !stacked && width > 480;
    };

    const projected = new THREE.Vector3();
    let activeLabel = -1;
    const placeLabels = (activeIndex: number): void => {
      if (!placement.labels) return;
      const left =
        placement.centerX - (SLAB_SIZE * Math.SQRT1_2 + 0.3) * placement.pixelsPerUnit * 1.1;
      labelItems.forEach((item, index) => {
        projected.set(0, SLAB_Y[index] + stack.position.y, 0).project(camera);
        const y = ((1 - projected.y) / 2) * placement.height;
        item.style.transform = `translate3d(${left.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-100%, -50%)`;
      });
      if (activeIndex !== activeLabel) {
        labelItems.forEach((item, index) =>
          item.classList.toggle('is-active', index === activeIndex),
        );
        activeLabel = activeIndex;
      }
    };

    const draw = (seconds: number): void => {
      const travel = easeInOut(clamp01((seconds % CYCLE_SECONDS) / (CYCLE_SECONDS * 0.8)));
      const packetY = top + (bottom - top) * travel;
      packet.position.y = packetY;
      packet.rotation.y = seconds * 1.6;
      slabMaterials.forEach((material, index) => {
        const near = clamp01(1 - Math.abs(packetY - SLAB_Y[index]) / 0.75);
        material.color.copy(inkColor).lerp(markColor, near);
        material.opacity = 0.85 + near * 0.15;
      });
      pointer.sx += (pointer.x - pointer.sx) * 0.06;
      pointer.sy += (pointer.y - pointer.sy) * 0.06;
      stack.rotation.y = seconds * 0.16 + pointer.sx * 0.9;
      stack.rotation.x = pointer.sy * 0.18;
      stack.position.y = Math.sin(seconds * 0.8) * 0.06;
      renderer.render(scene, camera);
      placeLabels(
        slabMaterials.reduce(
          (best, _m, i) =>
            Math.abs(packetY - SLAB_Y[i]) < Math.abs(packetY - SLAB_Y[best]) ? i : best,
          0,
        ),
      );
    };

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (calm) draw(1.2);
    });
    resizeObserver.observe(this.host.nativeElement);
    canvas.classList.add('is-ready');

    if (calm) {
      draw(1.2); // a single still frame
    } else {
      let frame = 0;
      let visible = true;
      const clock = new THREE.Clock();
      let skip = false;
      const loop = (): void => {
        frame = requestAnimationFrame(loop);
        skip = coarse ? !skip : false; // half the frame rate on touch devices
        if (!skip) draw(clock.getElapsedTime());
      };
      const sync = (): void => {
        const shouldRun = visible && !document.hidden;
        if (shouldRun && !frame) loop();
        if (!shouldRun && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      };
      const visibility = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      });
      visibility.observe(canvas);
      document.addEventListener('visibilitychange', sync);
      window.addEventListener('pointermove', onPointer, { passive: true });
      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        visibility.disconnect();
        document.removeEventListener('visibilitychange', sync);
        window.removeEventListener('pointermove', onPointer);
      });
    }

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    });
  }
}
