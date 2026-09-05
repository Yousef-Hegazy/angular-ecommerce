import { Component, input } from '@angular/core';

@Component({
  selector: 'app-products-catalog-header',
  template: `
    <section class="pb-2">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div
            class="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-accent font-semibold"
          >
            <span class="inline-block w-2 h-2 rounded-full bg-accent"></span>
            <span>Curated Department</span>
            <span class="text-ink-faint">/</span>
            <span class="text-ink-muted">Autumn Archive</span>
          </div>

          <h1
            class="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight leading-[1.05]"
          >
            The Considered Collection
          </h1>

          <p
            class="text-sm sm:text-base text-ink-muted font-sans font-normal leading-relaxed pt-1"
          >
            Precision crafted objects, archival textiles, and tactile
            accessories made in micro-batches with transparent provenance.
          </p>
        </div>

        <!-- Inventory Metrics Bar (Honest Metrics) -->
        <div
          class="flex items-baseline gap-3 self-start md:self-end bg-surface px-4 py-2.5 rounded-sm border border-border text-xs font-mono"
        >
          <span class="text-ink-faint">Active Listings:</span>
          <span class="text-ink font-semibold text-sm">{{
            activeCount()
          }}</span>
          <span class="text-ink-faint">of</span>
          <span class="text-ink-muted">{{ totalCount() }} Items</span>
        </div>
      </div>
    </section>
  `,
})
export class ProductsCatalogHeaderComponent {
  readonly activeCount = input.required<number>();
  readonly totalCount = input.required<number>();
}
