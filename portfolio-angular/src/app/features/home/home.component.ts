import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSceneComponent } from './hero-scene/hero-scene.component';
import { AI_PLUGINS } from '../../data/project-collections.data';
import { PROJECTS, type PortfolioProject } from '../../data/projects.data';
import { ProjectCardComponent } from '../projects/project-card/project-card.component';

const FOLLOW_EASING = 0.14;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroSceneComponent, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly mainProject: PortfolioProject = PROJECTS[0];
  /** Aree della pagina Progetti, con il numero di schede lette dai dati. */
  readonly areas: readonly { id: string; title: string; text: string; count: number }[] = [
    {
      id: 'backend',
      title: 'Backend',
      text: 'API REST con persistenza e sicurezza, con Java e Spring Boot.',
      count: PROJECTS.filter((project) => project.category === 'Backend').length,
    },
    {
      id: 'plugin-skill-ai',
      title: 'Plugin e Skill AI',
      text: 'Plugin per Claude Code: il modello ragiona e uno script Python verifica.',
      count: AI_PLUGINS.length,
    },
    {
      id: 'frontend',
      title: 'Progetti del corso',
      text: 'Progetti frontend realizzati durante il corso, con demo online dove disponibile.',
      count: PROJECTS.filter((project) => project.category === 'Frontend').length,
    },
  ];

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
