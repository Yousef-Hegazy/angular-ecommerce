import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-gallery-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <header class="sticky top-0 z-50 backdrop-blur-md bg-paper/85 border-b border-border transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Brand & Spec Identity -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-sm bg-accent text-accent-contrast flex items-center justify-center font-serif text-lg font-semibold shadow-subtle">
              A
            </span>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-serif text-2xl tracking-tight text-ink font-semibold">Atelier</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-surface-container text-ink-muted border border-border">
                  v20 M3 + TW4
                </span>
              </div>
              <p class="text-xs text-ink-muted font-sans hidden sm:block">
                Luxury Editorial Design System for Angular Material
              </p>
            </div>
          </div>
        </div>

        <!-- Hallmark Spec Badges & Quick Stats -->
        <div class="hidden md:flex items-center gap-6 text-xs text-ink-muted font-mono">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span>Genre: Editorial</span>
          </div>
          <div class="h-4 w-px bg-border"></div>
          <div>WCAG AAA · 13.8:1</div>
          <div class="h-4 w-px bg-border"></div>
          <div>8-State Matrix</div>
        </div>

        <!-- Action Bar: Theme Mode & Live Indicator -->
        <div class="flex items-center gap-3">
          <button 
            type="button"
            (click)="themeService.toggleMode()"
            class="px-3.5 py-1.5 rounded-sm border border-border hover:border-ink-muted bg-surface hover:bg-surface-container text-ink text-xs font-medium flex items-center gap-2 transition-all cursor-pointer shadow-subtle"
            [attr.aria-label]="themeService.mode() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <span class="material-symbols-outlined text-[18px]">
              {{ themeService.mode() === 'dark' ? 'light_mode' : 'dark_mode' }}
            </span>
            <span class="font-sans capitalize">{{ themeService.mode() }} Mode</span>
          </button>
        </div>

      </div>
    </header>
  `,
})
export class GalleryHeaderComponent {
  readonly themeService = inject(ThemeService);
}
