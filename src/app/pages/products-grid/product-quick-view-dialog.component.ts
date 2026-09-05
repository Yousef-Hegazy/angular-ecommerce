import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from '../../models/product';

export interface QuickViewDialogData {
  product: Product;
  isWishlisted: boolean;
}

export interface QuickViewDialogResult {
  action: 'add-to-bag' | 'toggle-wishlist';
  product: Product;
}

@Component({
  selector: 'app-product-quick-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
    <div class="relative bg-paper text-ink overflow-hidden flex flex-col md:flex-row w-full">
      
      <!-- Left Column: High Res Image -->
      <div
        class="w-full md:w-1/2 aspect-[4/3] md:aspect-auto bg-surface-container relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-border min-h-[260px] md:min-h-[420px]"
      >
        <img
          [src]="data.product.imageUrl"
          [alt]="data.product.name"
          class="w-full h-full object-cover object-center"
        />
        @if (!data.product.inStock) {
          <span
            class="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-error text-paper font-semibold shadow-subtle"
          >
            Sold Out
          </span>
        }
      </div>

      <!-- Right Column: Product Narrative & Specs -->
      <div class="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
        
        <!-- Top Row: Category, Rating & Exit Button (cleanly spaced, no absolute overlap) -->
        <div class="space-y-4">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <span class="text-xs font-mono uppercase tracking-wider text-ink-faint block">
                {{ data.product.category }}
              </span>
              <div class="flex items-center gap-1 text-secondary font-semibold text-xs">
                <span
                  class="material-symbols-outlined text-[14px]"
                  style="font-variation-settings: 'FILL' 1"
                >star</span>
                <span>{{ data.product.rating }}</span>
                <span class="text-ink-faint font-normal">({{ data.product.reviewCount }} reviews)</span>
              </div>
            </div>

            <!-- Modal Close Button -->
            <button
              type="button"
              (click)="dialogRef.close()"
              aria-label="Close product quick view"
              class="w-8 h-8 flex-shrink-0 rounded-full bg-surface-container border border-border text-ink hover:text-accent hover:border-accent flex items-center justify-center transition-all cursor-pointer shadow-subtle -mr-1 -mt-1"
            >
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <h2 class="font-display text-2xl sm:text-3xl text-ink font-normal leading-tight">
            {{ data.product.name }}
          </h2>

          <p class="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
            {{ data.product.description }}
          </p>

          <div class="p-3.5 rounded bg-surface border border-border flex items-center justify-between text-xs font-mono">
            <div>
              <span class="text-ink-faint block text-[10px]">Reference</span>
              <span class="text-ink font-semibold uppercase">{{ data.product.id }}</span>
            </div>
            <div class="text-right">
              <span class="text-ink-faint block text-[10px]">Status</span>
              <span [class]="data.product.inStock ? 'text-success font-semibold' : 'text-error font-semibold'">
                {{ data.product.inStock ? '● In Stock · Dispatch 24h' : '○ Out of Stock' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Price & Primary CTA -->
        <div class="space-y-4 pt-4 border-t border-border">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-mono text-ink-faint uppercase">Direct Price</span>
            <span class="text-2xl font-display font-semibold text-ink">
              \${{ data.product.price.toFixed(2) }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <button
              mat-flat-button
              [disabled]="!data.product.inStock"
              class="btn-atelier-primary flex-1 !py-2 !h-[42px]"
              (click)="onAddToBag()"
            >
              <span class="material-symbols-outlined text-[18px]">
                {{ data.product.inStock ? 'shopping_bag' : 'remove_shopping_cart' }}
              </span>
              <span>{{ data.product.inStock ? 'Add to Bag' : 'Sold Out' }}</span>
            </button>

            <button
              type="button"
              (click)="onToggleWishlist()"
              [attr.aria-label]="isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'"
              matTooltip="{{ isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist' }}"
              class="w-[42px] h-[42px] rounded-sm border border-border hover:border-accent text-ink hover:text-accent flex items-center justify-center transition-all bg-paper shadow-subtle cursor-pointer"
            >
              <span
                class="material-symbols-outlined text-[18px]"
                [class.text-accent]="isWishlisted"
                [style.font-variation-settings]="isWishlisted ? fontVariationFilled : fontVariationRegular"
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductQuickViewDialog {
  readonly dialogRef = inject(MatDialogRef<ProductQuickViewDialog, QuickViewDialogResult>);
  readonly data = inject<QuickViewDialogData>(MAT_DIALOG_DATA);

  readonly fontVariationFilled = "'FILL' 1, 'wght' 400";
  readonly fontVariationRegular = "'FILL' 0, 'wght' 300";

  isWishlisted = this.data.isWishlisted;

  onAddToBag(): void {
    this.dialogRef.close({
      action: 'add-to-bag',
      product: this.data.product,
    });
  }

  onToggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
    this.dialogRef.close({
      action: 'toggle-wishlist',
      product: this.data.product,
    });
  }
}
