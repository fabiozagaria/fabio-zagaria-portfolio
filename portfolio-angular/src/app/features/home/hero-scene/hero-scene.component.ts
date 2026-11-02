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
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styleUrl: './hero-scene.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSceneComponent {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

    const slabGeometry = track(new THREE.BoxGeometry(3.2, 0.34, 3.2));
    const slabEdges = track(new THREE.EdgesGeometry(slabGeometry));
    const gridTop = new THREE.GridHelper(3.2, 8, INK, INK);
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

    const resize = (): void => {
      const { width, height } = this.host.nativeElement.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      const view = 11;
      const aspect = width / height;
      camera.left = (-view * aspect) / 2;
      camera.right = (view * aspect) / 2;
      camera.top = view / 2;
      camera.bottom = -view / 2;
      camera.updateProjectionMatrix();
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
      const loop = (): void => {
        frame = requestAnimationFrame(loop);
        draw(clock.getElapsedTime());
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
