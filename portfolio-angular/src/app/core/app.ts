import { ViewportScroller } from '@angular/common';
import { ThemeService } from './theme.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  HostListener,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { getAvailabilityStatus } from './availability-status';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly theme = inject(ThemeService);
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  private readonly navigation = viewChild<ElementRef<HTMLElement>>('navigation');
  isMenuOpen = false;
  readonly currentYear = new Date().getFullYear();
  readonly availabilityStatus = getAvailabilityStatus();

  constructor() {
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
