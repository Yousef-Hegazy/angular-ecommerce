import { Component, input, output } from '@angular/core';
import { SortOption } from '../products-grid';

@Component({
  selector: 'app-products-toolbar',
  template: `
    <div
      class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2"
    >
      <!-- Live Search Field -->
      <div
        class="flex items-center gap-2.5 h-[38px] px-3.5 bg-paper border border-border rounded-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all shadow-subtle flex-1 max-w-md"
      >
        <span
          class="material-symbols-outlined text-[18px] text-ink-faint flex-shrink-0"
          >search</span
        >
        <input
          type="text"
          [value]="searchQuery()"
          (input)="searchChange.emit($any($event.target).value)"
          placeholder="Filter by name, material, or keyword..."
          aria-label="Search current products"
          class="w-full bg-transparent border-none outline-none p-0 text-xs text-ink placeholder:text-ink-faint leading-normal font-sans"
        />
        @if (searchQuery()) {
          <button
            type="button"
            (click)="searchChange.emit('')"
            class="text-ink-faint hover:text-ink transition-colors flex items-center p-0.5 cursor-pointer"
            aria-label="Clear search"
          >
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        }
      </div>

      <!-- Sorting Selector -->
      <div
        class="flex items-center gap-2.5 self-end sm:self-auto flex-shrink-0"
      >
        <label
          for="sort-select"
          class="text-xs font-mono text-ink-muted uppercase tracking-wider hidden sm:inline"
        >
          Sort by:
        </label>
        <div class="relative h-[38px]">
          <select
            id="sort-select"
            [value]="currentSort()"
            (change)="sortChange.emit($any($event.target).value)"
            class="h-full pl-3 pr-8 text-xs bg-paper border border-border rounded-sm text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer shadow-subtle appearance-none font-sans"
          >
            <option value="featured">Curated (Featured)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
          <span
            class="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint text-[16px]"
          >
            unfold_more
          </span>
        </div>
      </div>
    </div>
  `,
})
export class ProductsToolbarComponent {
  readonly searchQuery = input.required<string>();
  readonly currentSort = input.required<SortOption>();

  readonly searchChange = output<string>();
  readonly sortChange = output<SortOption>();
}
