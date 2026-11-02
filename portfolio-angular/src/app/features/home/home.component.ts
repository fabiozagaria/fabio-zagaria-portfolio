import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS, type PortfolioProject } from '../../data/projects.data';

const FOLLOW_EASING = 0.14;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly mainProject: PortfolioProject = PROJECTS[0];
  readonly featuredProjects: readonly PortfolioProject[] = PROJECTS.filter((project) =>
    ['jobflow', 'accessdesk'].includes(project.id),
  );

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.followPointerOnGrid());
  }

  /**
   * Lights up the hero grid around the cursor. The position eases toward the
   * pointer in a requestAnimationFrame loop that sleeps once it has caught up.
   * Skipped for touch input and reduced motion.
   */
  private followPointerOnGrid(): void {
    const hero = this.host.nativeElement.querySelector<HTMLElement>('.c-hero');
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calmMotion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hero || !finePointer || !calmMotion) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const render = (): void => {
      x += (targetX - x) * FOLLOW_EASING;
      y += (targetY - y) * FOLLOW_EASING;
      hero.style.setProperty('--mx', `${x.toFixed(1)}px`);
      hero.style.setProperty('--my', `${y.toFixed(1)}px`);
      const settled = Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent): void => {
      const box = hero.getBoundingClientRect();
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      if (!hero.classList.contains('is-tracking')) {
        x = targetX;
        y = targetY;
        hero.classList.add('is-tracking');
      }
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = (): void => hero.classList.remove('is-tracking');

    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', onLeave);
    this.destroyRef.onDestroy(() => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    });
  }
}
