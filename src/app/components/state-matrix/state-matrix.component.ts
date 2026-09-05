import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StateItem } from '../../core/models/component-state.model';

@Component({
  selector: 'app-state-matrix',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="bg-surface border border-border rounded-md p-6 shadow-subtle transition-colors duration-200">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono tracking-widest uppercase text-accent font-semibold">02 / Discipline</span>
            <span class="text-xs font-mono text-ink-muted">· Mandatory 8-State Matrix</span>
          </div>
          <h2 class="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
            Complete Interactive State Verification
          </h2>
          <p class="text-sm text-ink-muted mt-1 font-sans">
            Every interactive Angular Material component is styled and verified across all eight essential states.
          </p>
        </div>

        <div class="flex items-center gap-1 bg-surface-container p-1 rounded border border-border">
          <button 
            type="button"
            (click)="selectedCategory.set('buttons')"
            [class]="selectedCategory() === 'buttons' ? 'bg-paper text-ink shadow-subtle font-semibold' : 'text-ink-muted hover:text-ink'"
            class="px-3 py-1 rounded text-xs transition-all cursor-pointer font-sans">
            Buttons
          </button>
          <button 
            type="button"
            (click)="selectedCategory.set('chips')"
            [class]="selectedCategory() === 'chips' ? 'bg-paper text-ink shadow-subtle font-semibold' : 'text-ink-muted hover:text-ink'"
            class="px-3 py-1 rounded text-xs transition-all cursor-pointer font-sans">
            Chips & Pills
          </button>
          <button 
            type="button"
            (click)="selectedCategory.set('inputs')"
            [class]="selectedCategory() === 'inputs' ? 'bg-paper text-ink shadow-subtle font-semibold' : 'text-ink-muted hover:text-ink'"
            class="px-3 py-1 rounded text-xs transition-all cursor-pointer font-sans">
            Form Fields
          </button>
        </div>
      </div>

      <!-- State Matrix Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        @for (state of states(); track state.id) {
          <div class="p-4 rounded-sm border border-border bg-paper flex flex-col justify-between gap-4 min-h-[160px]">
            
            <!-- State Header -->
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                {{ state.label }}
              </span>
              <span class="text-[11px] font-mono text-ink-faint">
                {{ state.cssClass || 'default' }}
              </span>
            </div>

            <!-- Interactive Demo Area based on selected category -->
            <div class="flex items-center justify-center py-2">
              @if (selectedCategory() === 'buttons') {
                @if (state.id === 'default') {
                  <button mat-flat-button class="btn-atelier-primary">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <span>Add to Bag</span>
                  </button>
                } @else if (state.id === 'hover') {
                  <button mat-flat-button class="btn-atelier-primary is-hover">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <span>Add to Bag</span>
                  </button>
                } @else if (state.id === 'focus') {
                  <button mat-flat-button class="btn-atelier-primary is-focus">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <span>Add to Bag</span>
                  </button>
                } @else if (state.id === 'active') {
                  <button mat-flat-button class="btn-atelier-primary is-active">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <span>Add to Bag</span>
                  </button>
                } @else if (state.id === 'disabled') {
                  <button mat-flat-button disabled class="btn-atelier-primary">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <span>Sold Out</span>
                  </button>
                } @else if (state.id === 'loading') {
                  <button mat-flat-button class="btn-atelier-primary is-loading min-w-[136px]">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <span>Add to Bag</span>
                  </button>
                } @else if (state.id === 'error') {
                  <button mat-flat-button class="btn-atelier-primary !bg-error !text-white">
                    <span class="material-symbols-outlined">error_outline</span>
                    <span>Unavailable</span>
                  </button>
                } @else if (state.id === 'success') {
                  <button mat-flat-button class="btn-atelier-primary !bg-success !text-white">
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Added (1)</span>
                  </button>
                }
              }

              @if (selectedCategory() === 'chips') {
                @if (state.id === 'default') {
                  <span class="mat-mdc-standard-chip px-3 py-1 text-xs">
                    Linen & Silk
                  </span>
                } @else if (state.id === 'hover') {
                  <span class="mat-mdc-standard-chip is-hover px-3 py-1 text-xs">
                    Linen & Silk
                  </span>
                } @else if (state.id === 'focus') {
                  <span class="mat-mdc-standard-chip is-focus px-3 py-1 text-xs">
                    Linen & Silk
                  </span>
                } @else if (state.id === 'active') {
                  <span class="mat-mdc-standard-chip is-active is-selected px-3 py-1 text-xs">
                    Linen & Silk
                  </span>
                } @else if (state.id === 'disabled') {
                  <span class="mat-mdc-standard-chip opacity-40 px-3 py-1 text-xs pointer-events-none">
                    Linen & Silk
                  </span>
                } @else if (state.id === 'loading') {
                  <span class="mat-mdc-standard-chip state-box is-loading px-6 py-1 text-xs">
                    Loading
                  </span>
                } @else if (state.id === 'error') {
                  <span class="mat-mdc-standard-chip state-box is-error px-3 py-1 text-xs text-error font-semibold">
                    Out of Stock
                  </span>
                } @else if (state.id === 'success') {
                  <span class="mat-mdc-standard-chip state-box is-success px-3 py-1 text-xs text-success font-semibold">
                    ✓ Selected
                  </span>
                }
              }

              @if (selectedCategory() === 'inputs') {
                <div class="w-full">
                  @if (state.id === 'default') {
                    <input 
                      type="text" 
                      placeholder="e.g. Atelier Coat" 
                      class="w-full h-9 px-3 text-xs bg-surface border border-border rounded-sm text-ink placeholder:text-ink-faint focus:outline-none"
                    />
                  } @else if (state.id === 'hover') {
                    <input 
                      type="text" 
                      placeholder="e.g. Atelier Coat" 
                      class="w-full h-9 px-3 text-xs bg-surface-container border border-border-strong rounded-sm text-ink placeholder:text-ink-faint focus:outline-none"
                    />
                  } @else if (state.id === 'focus') {
                    <input 
                      type="text" 
                      value="Cashmere Overcoat" 
                      class="w-full h-9 px-3 text-xs bg-surface border border-accent ring-2 ring-accent/20 rounded-sm text-ink focus:outline-none"
                    />
                  } @else if (state.id === 'active') {
                    <input 
                      type="text" 
                      value="Cashmere Overcoat" 
                      class="w-full h-9 px-3 text-xs bg-surface-container-high border border-accent rounded-sm text-ink focus:outline-none"
                    />
                  } @else if (state.id === 'disabled') {
                    <input 
                      type="text" 
                      disabled 
                      value="Unavailable field" 
                      class="w-full h-9 px-3 text-xs bg-surface-container border border-border rounded-sm text-ink-faint opacity-50 cursor-not-allowed"
                    />
                  } @else if (state.id === 'loading') {
                    <div class="w-full h-9 bg-surface-container border border-border rounded-sm flex items-center justify-center text-[11px] font-mono text-ink-faint is-loading">
                    </div>
                  } @else if (state.id === 'error') {
                    <input 
                      type="text" 
                      value="Invalid coupon code" 
                      class="w-full h-9 px-3 text-xs bg-error-subtle border border-error rounded-sm text-error focus:outline-none font-medium"
                    />
                  } @else if (state.id === 'success') {
                    <input 
                      type="text" 
                      value="Code ATELIER20 applied" 
                      class="w-full h-9 px-3 text-xs bg-success-subtle border border-success rounded-sm text-success focus:outline-none font-medium"
                    />
                  }
                </div>
              }
            </div>

            <!-- State Description -->
            <p class="text-[11px] text-ink-muted font-sans pt-2 border-t border-border/50">
              {{ state.description }}
            </p>

          </div>
        }
      </div>

    </div>
  `,
})
export class StateMatrixComponent {
  readonly selectedCategory = signal<'buttons' | 'chips' | 'inputs'>('buttons');

  readonly states = signal<StateItem[]>([
    {
      id: 'default',
      label: '1 · Default',
      description: 'Resting state with calm surface contrast and subtle border.',
      cssClass: ':default',
    },
    {
      id: 'hover',
      label: '2 · Hover',
      description: 'Luminous tone lift, -1px Y translation and soft warm shadow.',
      cssClass: ':hover / .is-hover',
    },
    {
      id: 'focus',
      label: '3 · Focus-Visible',
      description: 'Unambiguous 2px focus ring with 2px offset for high accessibility.',
      cssClass: ':focus-visible / .is-focus',
    },
    {
      id: 'active',
      label: '4 · Active (Click)',
      description: 'Tactile +1px press displacement with immediate visual feedback.',
      cssClass: ':active / .is-active',
    },
    {
      id: 'disabled',
      label: '5 · Disabled',
      description: 'Reduced 40% opacity, stripped pointer interactions, muted text.',
      cssClass: '[disabled]',
    },
    {
      id: 'loading',
      label: '6 · Loading',
      description: 'High-contrast white micro-spinner preventing repeated actions.',
      cssClass: '[data-state="loading"]',
    },
    {
      id: 'error',
      label: '7 · Error',
      description: 'High-contrast crimson border and error tint with distinct badge.',
      cssClass: '[data-state="error"]',
    },
    {
      id: 'success',
      label: '8 · Success',
      description: 'Rich forest green confirmation state with icon verification.',
      cssClass: '[data-state="success"]',
    },
  ]);
}
