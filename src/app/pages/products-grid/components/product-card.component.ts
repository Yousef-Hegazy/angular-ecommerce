import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatTooltip],
  template: `
    <article
      class="group bg-paper border border-border hover:border-border-strong rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-card focus-within:border-accent relative h-full"
    >
      <!-- Visual Container with Image & Overlays -->
      <div
        class="relative aspect-[4/3] bg-surface-container overflow-hidden border-b border-border flex items-center justify-center"
      >
        <!-- Product Photography with Subtle Scale Hover -->
        <img
          [src]="product().imageUrl"
          [alt]="product().name"
          loading="lazy"
          class="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <!-- Top Left Category Eyebrow or Stock Status -->
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-1">
          @if (!product().inStock) {
            <span
              class="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-error text-paper font-semibold shadow-subtle"
            >
              Sold Out
            </span>
          } @else {
            <span
              class="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-ink/80 backdrop-blur-sm text-paper font-semibold shadow-subtle"
            >
              {{ product().category }}
            </span>
          }
        </div>

        <!-- Top Right Wishlist Toggle Action -->
        <button
          type="button"
          (click)="onToggleWishlist($event)"
          [attr.aria-label]="
            isWishlisted() ? 'Remove from Wishlist' : 'Add to Wishlist'
          "
          matTooltip="{{
            isWishlisted() ? 'Remove from Wishlist' : 'Save to Wishlist'
          }}"
          class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-paper/90 backdrop-blur-md border border-border flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-all duration-200 shadow-subtle cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span
            class="material-symbols-outlined text-[18px] transition-transform active:scale-125"
            [class.text-accent]="isWishlisted()"
            [style.font-variation-settings]="
              isWishlisted() ? fontVariationFilled : fontVariationRegular
            "
          >
            favorite
          </span>
        </button>

        <!-- Quick View Floating Action (Luminous Hover Pill) -->
        <div
          class="absolute inset-x-0 bottom-3 px-4 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
        >
          <button
            type="button"
            (click)="onQuickView($event)"
            class="w-full py-2 px-3 rounded bg-paper/95 backdrop-blur-md text-ink text-xs font-medium border border-border hover:border-ink flex items-center justify-center gap-1.5 shadow-card transition-all cursor-pointer"
          >
            <span class="material-symbols-outlined text-[16px]"
              >visibility</span
            >
            <span>Quick View</span>
          </button>
        </div>
      </div>

      <!-- Card Content Details -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Metadata Row: Category & Star Rating -->
          <div
            class="flex items-center justify-between text-xs font-mono text-ink-faint mb-1.5"
          >
            <span class="truncate">{{ product().category }}</span>
            <div class="flex items-center gap-1 text-secondary font-semibold">
              <span
                class="material-symbols-outlined text-[14px]"
                style="font-variation-settings: 'FILL' 1, 'wght' 400;"
                >star</span
              >
              <span>{{ product().rating }}</span>
              <span class="text-ink-faint font-normal"
                >({{ product().reviewCount }})</span
              >
            </div>
          </div>

          <!-- Product Title (Strictly Roman Cormorant Garamond Heading) -->
          <h2
            class="font-display text-xl text-ink font-normal tracking-tight group-hover:text-accent transition-colors line-clamp-1"
          >
            {{ product().name }}
          </h2>

          <!-- Concise Description -->
          <p
            class="text-xs text-ink-muted line-clamp-2 mt-1.5 leading-relaxed font-sans"
          >
            {{ product().description }}
          </p>
        </div>

        <!-- Price & Add To Bag Footer Action -->
        <div
          class="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3"
        >
          <div class="flex flex-col">
            <span class="text-[10px] font-mono uppercase text-ink-faint"
              >Price</span
            >
            <span
              class="text-lg font-display font-semibold text-ink leading-tight"
            >
              \${{ product().price.toFixed(2) }}
            </span>
          </div>

          <button
            mat-flat-button
            [disabled]="!product().inStock"
            class="btn-atelier-primary !text-xs !py-1.5 !px-3.5 !h-[36px]"
            (click)="onAddToBag($event)"
            [attr.aria-label]="'Add ' + product().name + ' to Bag'"
          >
            <span class="material-symbols-outlined text-[16px]">
              {{ product().inStock ? 'shopping_bag' : 'remove_shopping_cart' }}
            </span>
            <span>{{ product().inStock ? 'Add to Bag' : 'Sold Out' }}</span>
          </button>
        </div>
      </div>
    </article>
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly isWishlisted = input<boolean>(false);

  readonly addToBag = output<Product>();
  readonly toggleWishlist = output<Product>();
  readonly quickView = output<Product>();

  readonly fontVariationFilled = "'FILL' 1, 'wght' 400";
  readonly fontVariationRegular = "'FILL' 0, 'wght' 300";

  onAddToBag(event: Event): void {
    event.stopPropagation();
    this.addToBag.emit(this.product());
  }

  onToggleWishlist(event: Event): void {
    event.stopPropagation();
    this.toggleWishlist.emit(this.product());
  }

  onQuickView(event: Event): void {
    event.stopPropagation();
    this.quickView.emit(this.product());
  }
}
