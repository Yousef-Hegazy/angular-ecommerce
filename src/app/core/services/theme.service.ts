import { Injectable, signal, effect } from '@angular/core';

export type ColorMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ColorMode;
  accentHue: 'terracotta' | 'bronze' | 'olive' | 'indigo';
  borderRadius: 'subtle' | 'rounded' | 'sharp';
  density: 'compact' | 'comfortable' | 'spacious';
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly mode = signal<ColorMode>('light');
  readonly config = signal<ThemeConfig>({
    mode: 'light',
    accentHue: 'terracotta',
    borderRadius: 'subtle',
    density: 'comfortable',
  });

  constructor() {
    // Check saved preference or system preference
    const saved = localStorage.getItem('atelier_theme_mode') as ColorMode | null;
    if (saved) {
      this.setMode(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setMode('dark');
    }

    effect(() => {
      const currentMode = this.mode();
      if (currentMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('atelier_theme_mode', currentMode);
    });
  }

  toggleMode(): void {
    this.mode.update((m) => (m === 'light' ? 'dark' : 'light'));
    this.config.update((c) => ({ ...c, mode: this.mode() }));
  }

  setMode(mode: ColorMode): void {
    this.mode.set(mode);
    this.config.update((c) => ({ ...c, mode }));
  }

  setAccentHue(hue: 'terracotta' | 'bronze' | 'olive' | 'indigo'): void {
    this.config.update((c) => ({ ...c, accentHue: hue }));
  }
}
