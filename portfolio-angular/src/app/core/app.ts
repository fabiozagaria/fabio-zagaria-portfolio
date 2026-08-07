import { ChangeDetectionStrategy, Component, HostListener, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnDestroy {
  isMenuOpen = false;
  readonly currentYear = new Date().getFullYear();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updatePageScrollLock();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.updatePageScrollLock();
  }

  ngOnDestroy(): void {
    document.body.style.removeProperty('overflow');
  }

  private updatePageScrollLock(): void {
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.removeProperty('overflow');
  }
}
