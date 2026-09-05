import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from '../../models/product';
import {
  ProductQuickViewDialog,
  QuickViewDialogResult,
} from './product-quick-view-dialog.component';

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  // Route category input binding
  category = input<string>('all');

  // Interactive UI Signals
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('all');
  readonly currentSort = signal<SortOption>('featured');
  readonly wishlistedProductIds = signal<Set<string>>(new Set());

  // Category list curated from current inventory
  readonly categories = [
    { id: 'all', label: 'All Items' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'home & kitchen', label: 'Home & Living' },
    { id: 'bags & luggage', label: 'Luggage' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'photography', label: 'Photography' },
  ];

  constructor() {
    // Sync initial input route if provided
    if (this.category() && this.category() !== 'all') {
      this.selectedCategory.set(this.category().toLowerCase());
    }
  }

  readonly products = signal<Product[]>([
    {
      id: 'prod-001',
      name: 'Acoustic Over-Ear Headphones',
      description:
        'Engineered with custom dynamic drivers, active noise cancellation, and a 40-hour battery life for high-fidelity listening.',
      price: 249.99,
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 1240,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 'prod-002',
      name: 'Classic Minimalist Chronograph',
      description:
        'Featuring a 316L brushed stainless steel case, sapphire crystal glass, and a genuine Italian quick-release leather strap.',
      price: 185.0,
      imageUrl:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviewCount: 432,
      inStock: true,
      category: 'Accessories',
    },
    {
      id: 'prod-003',
      name: 'Everyday Commuter Leather Sneaker',
      description:
        'Low-profile silhouette crafted from full-grain nappa leather with an ergonomic cushioned footbed and vulcanized rubber sole.',
      price: 129.5,
      imageUrl:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewCount: 815,
      inStock: false,
      category: 'Footwear',
    },
    {
      id: 'prod-004',
      name: 'Ceramic Conical Coffee Dripper',
      description:
        'Hand-finished matte ceramic brewer with ribbed internal spiral walls designed for precise brew flow and clean extraction.',
      price: 34.0,
      imageUrl:
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewCount: 310,
      inStock: true,
      category: 'Home & Kitchen',
    },
    {
      id: 'prod-005',
      name: 'Waxed Canvas Weekender Duffel',
      description:
        'Weather-resistant 18oz waxed duck canvas reinforced with solid brass hardware, a separate shoe compartment, and padded shoulder sling.',
      price: 165.0,
      imageUrl:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      reviewCount: 198,
      inStock: true,
      category: 'Bags & Luggage',
    },
    {
      id: 'prod-006',
      name: 'Polarized Acetate Sunglasses',
      description:
        'Handcrafted cellulose acetate frame fitted with scratch-resistant category 3 polarized lenses offering full UV400 protection.',
      price: 98.0,
      imageUrl:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      reviewCount: 156,
      inStock: true,
      category: 'Accessories',
    },
    {
      id: 'prod-007',
      name: 'Wireless Mechanical Keyboard',
      description:
        'Compact 75% layout with hot-swappable tactile switches, per-key RGB backlighting, and Bluetooth 5.1 multi-device pairing.',
      price: 119.0,
      imageUrl:
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewCount: 520,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 'prod-008',
      name: 'Insulated Stainless Steel Tumbler',
      description:
        'Double-wall vacuum insulation keeps beverages cold for 24 hours or hot for 12, featuring a splash-resistant magnetic slider lid.',
      price: 32.5,
      imageUrl:
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewCount: 940,
      inStock: true,
      category: 'Home & Kitchen',
    },
    {
      id: 'prod-009',
      name: 'Refillable Full-Grain Leather Journal',
      description:
        'Supple oil-tanned leather cover holding 192 pages of bleed-proof 100gsm acid-free cream paper with an integrated pen loop.',
      price: 45.0,
      imageUrl:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviewCount: 275,
      inStock: false,
      category: 'Stationery',
    },
    {
      id: 'prod-010',
      name: '35mm Vintage Film Camera',
      description:
        'Mechanical rangefinder camera with a sharp 40mm f/1.7 prime lens, integrated light meter, and classic textured grip.',
      price: 210.0,
      imageUrl:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 388,
      inStock: true,
      category: 'Photography',
    },
  ]);

  // Filtered and sorted products stream
  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();
    const sort = this.currentSort();

    let list = this.products();

    // Filter by category
    if (cat !== 'all') {
      list = list.filter((p) => p.category.toLowerCase().includes(cat));
    }

    // Filter by search query
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep inventory default order
        break;
    }

    return sorted;
  });

  selectCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  updateSearch(val: string): void {
    this.searchQuery.set(val);
  }

  resetFilters(): void {
    this.selectedCategory.set('all');
    this.searchQuery.set('');
    this.currentSort.set('featured');
  }

  openQuickView(product: Product, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const dialogRef = this.dialog.open<
      ProductQuickViewDialog,
      any,
      QuickViewDialogResult
    >(ProductQuickViewDialog, {
      data: {
        product,
        isWishlisted: this.isWishlisted(product.id),
      },
      panelClass: ['atelier-dialog-panel'],
      maxWidth: '896px',
      width: '94vw',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result.action === 'add-to-bag') {
        this.addToBag(result.product);
      } else if (result.action === 'toggle-wishlist') {
        this.toggleWishlist(result.product);
      }
    });
  }

  toggleWishlist(product: Product, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const current = new Set(this.wishlistedProductIds());
    const isSaved = current.has(product.id);

    if (isSaved) {
      current.delete(product.id);
      this.showToast(`Removed "${product.name}" from wishlist`);
    } else {
      current.add(product.id);
      this.showToast(`Saved "${product.name}" to your wishlist`);
    }

    this.wishlistedProductIds.set(current);
  }

  isWishlisted(productId: string): boolean {
    return this.wishlistedProductIds().has(productId);
  }

  addToBag(product: Product, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (!product.inStock) {
      this.showToast(`"${product.name}" is currently out of stock`);
      return;
    }
    this.showToast(`Added "${product.name}" to your bag`);
  }

  private showToast(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3200,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['bg-ink', 'text-paper', 'border', 'border-border-strong'],
    });
  }
}
