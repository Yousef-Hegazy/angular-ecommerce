import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShowcaseProduct } from '../../core/models/component-state.model';

@Component({
  selector: 'app-component-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  template: `
    <div class="space-y-12">

      <!-- ================================================================= -->
      <!-- 03. BUTTONS & ACTIONS SHOWCASE -->
      <!-- ================================================================= -->
      <section class="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle">
        <div class="pb-6 border-b border-border">
          <span class="text-xs font-mono tracking-widest uppercase text-accent font-semibold">03 / Components</span>
          <h2 class="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
            Button Hierarchy & Microinteractions
          </h2>
          <p class="text-sm text-ink-muted mt-1 font-sans">
            Refined weights, bespoke terracotta accents, tactile elevation and focus states.
          </p>
        </div>

        <div class="mt-8 space-y-8">
          
          <!-- Standard Material Action Buttons -->
          <div>
            <h3 class="text-xs font-mono uppercase tracking-wider text-ink-faint mb-4">
              A · Variant Ranks & Styles
            </h3>
            <div class="flex flex-wrap items-center gap-4">
              <button mat-flat-button class="btn-atelier-primary" (click)="showToast('Added Atelier Overcoat to Cart')">
                <span class="material-symbols-outlined">shopping_bag</span>
                <span>Primary Terracotta</span>
              </button>

              <button mat-stroked-button class="mat-mdc-outlined-button" (click)="showToast('Saved to Curated Wishlist')">
                <span class="material-symbols-outlined">favorite</span>
                <span>Outlined Secondary</span>
              </button>

              <button mat-flat-button class="btn-atelier-secondary">
                <span class="material-symbols-outlined">tune</span>
                <span>Tonal Surface</span>
              </button>

              <button mat-button class="text-ink hover:text-accent font-medium">
                <span>Text Only Link →</span>
              </button>

              <button mat-flat-button disabled class="btn-atelier-primary">
                <span>Disabled Action</span>
              </button>
            </div>
          </div>

          <!-- Icon Buttons & Mini Badges -->
          <div>
            <h3 class="text-xs font-mono uppercase tracking-wider text-ink-faint mb-4">
              B · Circular Icons & Badge Triggers
            </h3>
            <div class="flex flex-wrap items-center gap-5">
              <button 
                mat-icon-button
                matBadge="3" 
                matBadgeColor="primary"
                matBadgePosition="above after"
                (click)="showToast('3 items in your shopping bag')"
                aria-label="Shopping bag">
                <span class="material-symbols-outlined">shopping_bag</span>
              </button>

              <button 
                mat-icon-button
                matBadge="12"
                matBadgeColor="primary"
                matBadgePosition="above after"
                (click)="showToast('12 curated notifications')"
                aria-label="Notifications">
                <span class="material-symbols-outlined">notifications</span>
              </button>

              <button 
                mat-icon-button
                (click)="showToast('Product bookmark toggled')"
                aria-label="Bookmark">
                <span class="material-symbols-outlined">bookmark</span>
              </button>

              <button 
                mat-icon-button
                class="icon-btn-secondary"
                (click)="showToast('Filter drawer toggled')"
                aria-label="Filters">
                <span class="material-symbols-outlined">tune</span>
              </button>

              <button 
                mat-icon-button
                class="icon-btn-primary"
                (click)="showToast('Quick search dialog triggered')"
                aria-label="Search">
                <span class="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- ================================================================= -->
      <!-- 04. FORM CONTROLS & E-COMMERCE FILTERS -->
      <!-- ================================================================= -->
      <section class="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle">
        <div class="pb-6 border-b border-border">
          <span class="text-xs font-mono tracking-widest uppercase text-accent font-semibold">04 / Form Inputs</span>
          <h2 class="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
            Inputs, Selectors & Refined Filters
          </h2>
          <p class="text-sm text-ink-muted mt-1 font-sans">
            Minimal luxury form fields with floating labels, custom select dropdowns, and range sliders.
          </p>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Search Field -->
          <div>
            <label class="block text-xs font-mono text-ink-muted uppercase mb-1.5">Collection Search</label>
            <div class="flex items-center gap-2.5 h-[38px] px-3 bg-paper border border-border rounded-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all shadow-subtle">
              <span class="material-symbols-outlined text-[18px] text-ink-faint flex-shrink-0">search</span>
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                placeholder="Search cashmere, tailoring, ceramics..."
                class="w-full bg-transparent border-none outline-none p-0 text-xs text-ink placeholder:text-ink-faint leading-normal"
              />
            </div>
          </div>

          <!-- Category Select -->
          <div>
            <label class="block text-xs font-mono text-ink-muted uppercase mb-1.5">Curated Department</label>
            <div class="h-[38px] flex items-center">
              <select 
                [(ngModel)]="selectedDepartment"
                class="w-full h-full px-3 text-xs bg-paper border border-border rounded-sm text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer shadow-subtle">
                <option value="all">All Departments (148 pieces)</option>
                <option value="outerwear">Outerwear & Coats</option>
                <option value="knitwear">Cashmere & Fine Knitwear</option>
                <option value="ceramics">Hand-thrown Studio Ceramics</option>
                <option value="leather">Artisan Tuscan Leather</option>
              </select>
            </div>
          </div>

          <!-- Price Range Slider -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-mono text-ink-muted uppercase">Max Budget</label>
              <span class="text-xs font-mono font-semibold text-accent">\${{ maxPrice() }}</span>
            </div>
            <div class="pt-2">
              <mat-slider min="50" max="1200" step="25" class="w-full">
                <input matSliderThumb [value]="maxPrice()" (valueChange)="maxPrice.set($event)" />
              </mat-slider>
            </div>
          </div>

        </div>

        <!-- Filter Chips Strip -->
        <div class="mt-6 pt-6 border-t border-border">
          <div class="text-xs font-mono text-ink-muted uppercase mb-3">Active Material Tags</div>
          <div class="flex flex-wrap gap-2">
            @for (chip of filterChips(); track chip.name) {
              <button 
                type="button"
                (click)="toggleChip(chip)"
                [class]="chip.selected ? 'bg-ink text-paper border-ink shadow-subtle' : 'bg-surface-container text-ink hover:bg-surface-container-high border-border'"
                class="px-3.5 py-1.5 rounded-full border text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer">
                @if (chip.selected) {
                  <span class="material-symbols-outlined text-[14px]">check</span>
                }
                {{ chip.name }}
              </button>
            }
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- 05. E-COMMERCE PRODUCT CARDS & LIVE DIALOG PREVIEW -->
      <!-- ================================================================= -->
      <section class="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span class="text-xs font-mono tracking-widest uppercase text-accent font-semibold">05 / Catalog Preview</span>
            <h2 class="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
              Editorial Product Cards
            </h2>
            <p class="text-sm text-ink-muted mt-1 font-sans">
              Balanced typography, tactile materials, stock indicator chips, and instant quick-view overlay.
            </p>
          </div>

          <div class="text-xs font-mono text-ink-muted">
            Showing {{ products().length }} Curated Pieces
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          @for (product of products(); track product.id) {
            <div class="group bg-paper border border-border hover:border-border-strong rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-card">
              
              <!-- Card Image / Mock Visual Canvas -->
              <div class="relative h-64 bg-surface-container flex flex-col items-center justify-center p-6 border-b border-border overflow-hidden">
                
                <!-- Badge (New / Rare / Limited) -->
                @if (product.badge) {
                  <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-ink text-paper font-semibold shadow-subtle">
                    {{ product.badge }}
                  </span>
                }

                <!-- Category Watermark -->
                <span class="font-serif text-6xl text-ink-faint/15 select-none uppercase tracking-widest">
                  {{ product.category.slice(0, 3) }}
                </span>

                <!-- Color Swatch Circle -->
                <div class="flex items-center gap-2 mt-4">
                  <span class="w-4 h-4 rounded-full border border-border shadow-subtle" [style.background-color]="product.colorSwatch"></span>
                  <span class="text-xs font-mono text-ink-muted">{{ product.material }}</span>
                </div>

                <!-- Quick Action Overlay -->
                <div class="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <button 
                    type="button"
                    (click)="openQuickView(product)"
                    class="w-full py-2 bg-paper/95 hover:bg-paper backdrop-blur-sm border border-border text-ink text-xs font-medium font-sans rounded-sm shadow-subtle hover:border-ink transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    <span class="material-symbols-outlined text-[16px]">visibility</span>
                    Quick View
                  </button>
                </div>

              </div>

              <!-- Product Details -->
              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-ink-faint mb-1">
                    <span>{{ product.category }}</span>
                    <div class="flex items-center gap-1 text-secondary font-semibold">
                      <span class="material-symbols-outlined text-[14px]">star</span>
                      <span>{{ product.rating }}</span>
                    </div>
                  </div>

                  <h3 class="font-serif text-xl text-ink font-normal group-hover:text-accent transition-colors">
                    {{ product.name }}
                  </h3>
                  <p class="text-xs text-ink-muted mt-1 line-clamp-2">
                    {{ product.subtitle }}
                  </p>
                </div>

                <!-- Price and Add Button -->
                <div class="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div class="text-base font-serif font-semibold text-ink">
                      \${{ product.price }}
                    </div>
                    @if (product.originalPrice) {
                      <div class="text-[11px] font-mono text-ink-faint line-through">
                        \${{ product.originalPrice }}
                      </div>
                    }
                  </div>

                  <button 
                    mat-flat-button 
                    class="btn-atelier-primary !text-xs !py-1.5 !px-3"
                    (click)="showToast('Added ' + product.name + ' to Bag')">
                    <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>Add to Bag</span>
                  </button>
                </div>

              </div>

            </div>
          }
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- QUICK VIEW MODAL OVERLAY (STANDALONE DIALOG COMPONENT DEMO) -->
      <!-- ================================================================= -->
      @if (activeModalProduct(); as activeProd) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div class="bg-paper border border-border rounded-md shadow-modal max-w-lg w-full overflow-hidden p-6 relative">
            
            <button 
              type="button"
              (click)="activeModalProduct.set(null)"
              class="absolute top-4 right-4 p-1.5 rounded-full text-ink-muted hover:text-ink hover:bg-surface-container transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div class="text-xs font-mono text-accent uppercase tracking-widest font-semibold mb-1">
              {{ activeProd.category }} · {{ activeProd.material }}
            </div>

            <h3 class="font-serif text-2xl text-ink font-normal">
              {{ activeProd.name }}
            </h3>

            <p class="text-sm text-ink-muted font-sans mt-2">
              {{ activeProd.subtitle }} Crafted with double-faced woven fibres and tailored Italian finishes. Designed for longevity and effortless layering.
            </p>

            <div class="my-6 p-4 rounded bg-surface border border-border flex items-center justify-between">
              <div>
                <span class="text-xs font-mono text-ink-faint block">Direct Price</span>
                <span class="text-2xl font-serif font-semibold text-ink">\${{ activeProd.price }}</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-mono text-success block font-semibold">✓ In Stock</span>
                <span class="text-[11px] font-mono text-ink-muted">Dispatches in 24h</span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button 
                mat-flat-button 
                class="btn-atelier-primary flex-1 !py-2.5"
                (click)="showToast('Added ' + activeProd.name + ' to Bag'); activeModalProduct.set(null)">
                <span class="material-symbols-outlined">shopping_bag</span>
                <span>Confirm & Add to Bag</span>
              </button>
              <button 
                mat-stroked-button 
                class="mat-mdc-outlined-button"
                (click)="activeModalProduct.set(null)">
                Close
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  `,
})
export class ComponentShowcaseComponent {
  private readonly snackBar = inject(MatSnackBar);

  readonly searchQuery = '';
  readonly selectedDepartment = 'all';
  readonly maxPrice = signal<number>(850);
  readonly activeModalProduct = signal<ShowcaseProduct | null>(null);

  readonly filterChips = signal([
    { name: 'Pure Cashmere', selected: true },
    { name: 'Organic Linen', selected: true },
    { name: 'Tuscan Leather', selected: false },
    { name: 'Glazed Stoneware', selected: false },
    { name: 'Merino Wool', selected: true },
    { name: 'Recycled Brass', selected: false },
  ]);

  readonly products = signal<ShowcaseProduct[]>([
    {
      id: 'p1',
      name: 'Double-Breasted Wool Overcoat',
      subtitle: 'Unstructured silhouette cut from heavy brushed melton wool.',
      category: 'Outerwear',
      price: 680,
      originalPrice: 750,
      rating: 4.9,
      reviewsCount: 38,
      badge: 'Bespoke Batch',
      inStock: true,
      material: '100% Melton Wool',
      colorSwatch: '#8C6D46',
    },
    {
      id: 'p2',
      name: 'Ribbed Cashmere Mockneck',
      subtitle: 'Spun from grade-A Mongolian cashmere with tactile micro-ribbing.',
      category: 'Knitwear',
      price: 340,
      rating: 5.0,
      reviewsCount: 64,
      badge: 'Iconic Core',
      inStock: true,
      material: 'Pure Grade-A Cashmere',
      colorSwatch: '#C25E3E',
    },
    {
      id: 'p3',
      name: 'Hand-Thrown Terracotta Vessel',
      subtitle: 'Wheel-thrown stoneware finished with raw earthen slip glaze.',
      category: 'Studio Ceramics',
      price: 195,
      rating: 4.8,
      reviewsCount: 19,
      badge: 'Numbered 04/20',
      inStock: true,
      material: 'Local Red Clay & Ash',
      colorSwatch: '#A94E31',
    },
  ]);

  toggleChip(chip: { name: string; selected: boolean }): void {
    chip.selected = !chip.selected;
  }

  openQuickView(product: ShowcaseProduct): void {
    this.activeModalProduct.set(product);
  }

  showToast(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['bg-ink', 'text-paper'],
    });
  }
}
