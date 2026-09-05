import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../core/services/theme.service';
import { TokenDefinition } from '../../core/models/component-state.model';

@Component({
  selector: 'app-token-inspector',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="bg-surface border border-border rounded-md p-6 shadow-subtle transition-colors duration-200">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono tracking-widest uppercase text-accent font-semibold">01 / Foundation</span>
            <span class="text-xs font-mono text-ink-muted">· Hallmark Token Bridge</span>
          </div>
          <h2 class="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
            Design Tokens & Variables
          </h2>
          <p class="text-sm text-ink-muted mt-1 font-sans">
            Centralized tokens shared dynamically across Angular Material 3 and Tailwind CSS v4.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded bg-surface-container border border-border text-xs font-mono text-ink">
            Active Mode: <strong class="text-accent uppercase">{{ themeService.mode() }}</strong>
          </span>
        </div>
      </div>

      <!-- Token Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        @for (token of tokens(); track token.variable) {
          <div class="p-4 rounded-sm border border-border bg-paper hover:border-border-strong transition-all duration-200 group">
            
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-3">
                <!-- Swatch for Colors -->
                @if (token.category === 'color') {
                  <span 
                    class="w-6 h-6 rounded-sm border border-border/80 shadow-subtle flex-shrink-0"
                    [style.background-color]="themeService.mode() === 'dark' ? token.darkValue : token.lightValue">
                  </span>
                } @else {
                  <span class="w-6 h-6 rounded-sm bg-surface-container border border-border flex items-center justify-center text-xs font-mono text-ink-muted">
                    {{ token.category === 'typography' ? 'Aa' : '§' }}
                  </span>
                }
                
                <div>
                  <div class="text-xs font-mono font-semibold text-ink group-hover:text-accent transition-colors">
                    {{ token.variable }}
                  </div>
                  <div class="text-[11px] text-ink-faint font-mono">
                    {{ token.name }}
                  </div>
                </div>
              </div>

              <!-- Copy Token Button -->
              <button 
                type="button"
                (click)="copyToken(token.variable)"
                class="opacity-0 group-hover:opacity-100 p-1 text-ink-faint hover:text-ink hover:bg-surface-container rounded transition-all"
                title="Copy token">
                <span class="material-symbols-outlined text-[16px]">
                  {{ copiedToken() === token.variable ? 'check' : 'content_copy' }}
                </span>
              </button>
            </div>

            <div class="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono">
              <span class="text-ink-muted text-[11px]">{{ token.description }}</span>
              <span class="px-1.5 py-0.5 rounded bg-surface-container text-ink font-semibold text-[11px]">
                {{ themeService.mode() === 'dark' ? token.darkValue : token.lightValue }}
              </span>
            </div>

          </div>
        }
      </div>

    </div>
  `,
})
export class TokenInspectorComponent {
  readonly themeService = inject(ThemeService);
  readonly copiedToken = signal<string | null>(null);

  readonly tokens = signal<TokenDefinition[]>([
    {
      name: 'Paper Canvas',
      variable: '--color-paper',
      lightValue: '#FBF9F5',
      darkValue: '#121110',
      category: 'color',
      description: 'Primary background canvas',
    },
    {
      name: 'Surface Level 1',
      variable: '--color-surface',
      lightValue: '#F4EFEB',
      darkValue: '#1A1816',
      category: 'color',
      description: 'Cards, containers, sheets',
    },
    {
      name: 'Surface High',
      variable: '--color-surface-container',
      lightValue: '#ECE5DE',
      darkValue: '#23201C',
      category: 'color',
      description: 'Chips, secondary buttons',
    },
    {
      name: 'Ink / Typography',
      variable: '--color-ink',
      lightValue: '#1C1917',
      darkValue: '#EDE6DD',
      category: 'color',
      description: 'High-contrast headings and body',
    },
    {
      name: 'Terracotta Accent',
      variable: '--color-accent',
      lightValue: '#C25E3E',
      darkValue: '#E07A5F',
      category: 'color',
      description: 'CTA buttons, focus, highlights',
    },
    {
      name: 'Warm Bronze',
      variable: '--color-secondary',
      lightValue: '#8C6D46',
      darkValue: '#BCA37F',
      category: 'color',
      description: 'Metadata, badges, sub-actions',
    },
    {
      name: 'Subtle Border',
      variable: '--color-border',
      lightValue: '#E2D9CE',
      darkValue: '#2C2823',
      category: 'color',
      description: 'Fine 1px tactile dividers',
    },
    {
      name: 'Display Typography',
      variable: '--font-display',
      lightValue: 'Cormorant Garamond',
      darkValue: 'Cormorant Garamond',
      category: 'typography',
      description: 'Editorial serif headlines',
    },
    {
      name: 'UI Body Typography',
      variable: '--font-body',
      lightValue: 'Plus Jakarta Sans',
      darkValue: 'Plus Jakarta Sans',
      category: 'typography',
      description: 'Clean modern sans interface text',
    },
  ]);

  copyToken(varName: string): void {
    navigator.clipboard.writeText(`var(${varName})`);
    this.copiedToken.set(varName);
    setTimeout(() => this.copiedToken.set(null), 1800);
  }
}
