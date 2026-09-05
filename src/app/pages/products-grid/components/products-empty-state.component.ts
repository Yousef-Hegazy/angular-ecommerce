import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-products-empty-state',
  imports: [MatButton],
  template: `
    <div
      class="bg-surface border border-border border-dashed rounded-md p-12 text-center max-w-lg mx-auto space-y-4 my-8"
    >
      <div
        class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto text-ink-faint"
      >
        <span class="material-symbols-outlined text-[24px]">inventory_2</span>
      </div>

      <div class="space-y-1">
        <h3 class="font-display text-2xl text-ink font-normal">
          No Matching Objects Found
        </h3>
        <p class="text-xs text-ink-muted font-sans leading-relaxed">
          @if (searchQuery()) {
            No items match "{{ searchQuery() }}" in the current selection. Try
            resetting your search query or selecting another department.
          } @else {
            No items currently found in this category. Try resetting your filter
            selection.
          }
        </p>
      </div>

      <div class="pt-2">
        <button
          mat-stroked-button
          class="mat-mdc-outlined-button !text-xs"
          (click)="reset.emit()"
        >
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  `,
})
export class ProductsEmptyStateComponent {
  readonly searchQuery = input<string>('');
  readonly reset = output<void>();
}
