import { LanguageService } from './language.service';
import { TranslatePipe } from './translate.pipe';
import { LoadingSpinnerComponent } from '../shared/loading/loading-spinner.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewportScroller } from '@angular/common';
import { ThemeService } from './theme.service';
import { SoftDescendService } from './soft-descend.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  HostListener,
  viewChild,
  signal,
} from '@angular/core';
import {
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { getAvailabilityStatus } from './availability-status';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslatePipe, LoadingSpinnerComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly router = inject(Router);
  readonly navigationError = signal(false);
  readonly language = inject(LanguageService);
  readonly theme = inject(ThemeService);
  private readonly softDescend = inject(SoftDescendService);
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  private readonly navigation = viewChild<ElementRef<HTMLElement>>('navigation');
  isMenuOpen = false;
  readonly currentYear = new Date().getFullYear();
  readonly availabilityStatus = getAvailabilityStatus();

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) this.navigationError.set(false);
      if (event instanceof NavigationError) this.navigationError.set(true);
    });
    inject(ViewportScroller).setOffset(() => [
      0,
      (this.navigation()?.nativeElement.getBoundingClientRect().height ?? 80) + 16,
    ]);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.isMenuOpen) return;
    this.closeMenu();
    this.menuToggle()?.nativeElement.focus();
  }

  onNavFocusOut(event: FocusEvent): void {
    const nav = event.currentTarget as HTMLElement;
    if (!nav.contains(event.relatedTarget as Node | null)) this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    if (this.isMenuOpen) this.menuToggle()?.nativeElement.focus();
    this.isMenuOpen = false;
  }
}
