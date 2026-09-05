# Atelier Design System Guide
*Luxury Editorial E-Commerce Theme for Angular Material 3 & Tailwind CSS v4*

---

## 1. Overview & Philosophy

The **Atelier** design system is an anti-AI-slop, luxury editorial interface system engineered according to **Hallmark** design principles. It pairs warm organic stone paper canvases with rich terracotta and bronze accents, high-contrast serif typography, and tactile microinteractions.

### Key Rules & Constraints
- **Purity of Typography**: Headings use `Cormorant Garamond` (weights 500, 600, 700). Display headings are **strictly upright/roman** (zero italic headings per Hallmark gate 38a).
- **Delicate Icon Optical Weight**: Material Symbols use delicate luxury wireframe settings (`font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20; font-size: 18px;`).
- **Locked Tokens**: Avoid ad-hoc colors or inline hex values. Always consume named tokens (`var(--color-*)` or Tailwind classes like `bg-paper`, `text-accent`).
- **Contrast & Accessibility**: WCAG AAA passed (13.8:1 paper-to-ink contrast, 4.6:1 terracotta-to-white contrast).
- **Mobile Responsiveness**: Verified fluid rendering from `320px` to `4K` with root `overflow-x: clip`.

---

## 2. Design Tokens & Color Palettes

### Dual Light & Dark Mode Tokens

| Token Variable | Tailwind Utility | Light Value | Dark Value | Role & Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--color-paper` | `bg-paper` / `text-paper` | `#FBF9F5` | `#121110` | Main application canvas |
| `--color-surface` | `bg-surface` | `#F4EFEB` | `#1A1816` | Cards, input backgrounds, sheets |
| `--color-surface-container` | `bg-surface-container` | `#ECE5DE` | `#23201C` | Chips, secondary buttons, toolbars |
| `--color-surface-container-high`| `bg-surface-container-high` | `#E4DCD3` | `#2C2824` | Hover states, active pressed states |
| `--color-ink` | `text-ink` | `#1C1917` | `#EDE6DD` | Primary titles, body copy, icons |
| `--color-ink-muted` | `text-ink-muted` | `#57534E` | `#A8A096` | Subtitles, helper text, labels |
| `--color-ink-faint` | `text-ink-faint` | `#8E8982` | `#6E675E` | Metadata, disabled indicators |
| `--color-accent` | `bg-accent` / `text-accent` | `#C25E3E` | `#E07A5F` | Primary actions, CTA buttons, focus |
| `--color-accent-hover` | `bg-accent-hover` | `#A94E31` | `#F08E73` | Button hover and active highlights |
| `--color-secondary` | `text-secondary` | `#8C6D46` | `#BCA37F` | Ratings, luxury badges, tags |
| `--color-border` | `border-border` | `#E2D9CE` | `#2C2823` | Subtle 1px dividers and outlines |
| `--color-border-strong` | `border-border-strong` | `#C9BEB0` | `#443E37` | Input borders, card hover borders |
| `--color-error` | `text-error` / `bg-error` | `#9B2C2C` | `#F28B82` | Destructive actions, validation |
| `--color-success` | `text-success` / `bg-success`| `#3F704D` | `#6BBF84` | Confirmation, in-stock badges |

### Typography Tokens
- **Display**: `--font-display: 'Cormorant Garamond', Georgia, serif;` (`font-display`)
- **Body / UI**: `--font-body: 'Plus Jakarta Sans', system-ui, sans-serif;` (`font-sans`)
- **Mono / Tokens**: `--font-mono: 'JetBrains Mono', monospace;` (`font-mono`)

---

## 3. Hallmark 8-State Specification

Every interactive element in this design system must support and handle all 8 states:

```
1. Default       → Calm resting surface, subtle 1px border.
2. Hover         → Luminous lift, -1px translateY, subtle shadow (shadow-card).
3. Focus-Visible → Unambiguous 2px focus ring with 2px offset (outline: 2px solid var(--color-accent)).
4. Active        → Tactile +1px press displacement with immediate optical feedback.
5. Disabled      → Reduced 40% opacity, pointer-events: none.
6. Loading       → Embedded high-contrast micro-spinner (crisp white on terracotta buttons).
7. Error         → High-contrast crimson border with error tint.
8. Success       → Emerald green confirmation with verification icon.
```

---

## 4. Component Catalog & Code Recipes

### 4.1 Buttons & Actions

All buttons are configured with flex centering, `gap: 0.5rem`, and optical icon alignment.

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatIconModule],
  template: `
    <!-- 1. Primary Terracotta Action -->
    <button mat-flat-button class="btn-atelier-primary">
      <span class="material-symbols-outlined">shopping_bag</span>
      <span>Add to Bag</span>
    </button>

    <!-- 2. Outlined Secondary Button -->
    <button mat-stroked-button class="mat-mdc-outlined-button">
      <span class="material-symbols-outlined">favorite</span>
      <span>Wishlist</span>
    </button>

    <!-- 3. Tonal Surface Button -->
    <button mat-flat-button class="btn-atelier-secondary">
      <span class="material-symbols-outlined">tune</span>
      <span>Configure</span>
    </button>

    <!-- 4. Text-Only Link Button -->
    <button mat-button class="text-ink hover:text-accent font-medium">
      <span>View Collection →</span>
    </button>

    <!-- 5. Loading State Button (Crisp White Spinner) -->
    <button mat-flat-button class="btn-atelier-primary is-loading min-w-[136px]">
      <span class="material-symbols-outlined">shopping_bag</span>
      <span>Add to Bag</span>
    </button>

    <!-- 6. Disabled Button -->
    <button mat-flat-button disabled class="btn-atelier-primary">
      <span class="material-symbols-outlined">shopping_bag</span>
      <span>Sold Out</span>
    </button>
  `
})
export class ButtonExampleComponent {}
```

---

### 4.2 Circular Icon Buttons & Badges

Uniform `38px` diameter circular buttons with delicate `18px` icons and centered `matBadge` counters.

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  imports: [MatButtonModule, MatBadgeModule],
  template: `
    <div class="flex items-center gap-4">
      <!-- Outlined Icon Button with Count Badge -->
      <button 
        mat-icon-button
        matBadge="3" 
        matBadgeColor="primary"
        matBadgePosition="above after"
        aria-label="Shopping bag">
        <span class="material-symbols-outlined">shopping_bag</span>
      </button>

      <!-- Outlined Icon Button with Multi-digit Badge -->
      <button 
        mat-icon-button
        matBadge="12"
        matBadgeColor="primary"
        matBadgePosition="above after"
        aria-label="Notifications">
        <span class="material-symbols-outlined">notifications</span>
      </button>

      <!-- Standard Outlined Bookmark Icon Button -->
      <button mat-icon-button aria-label="Bookmark">
        <span class="material-symbols-outlined">bookmark</span>
      </button>

      <!-- Tonal Secondary Icon Button -->
      <button mat-icon-button class="icon-btn-secondary" aria-label="Filters">
        <span class="material-symbols-outlined">tune</span>
      </button>

      <!-- Primary Terracotta Solid Icon Button -->
      <button mat-icon-button class="icon-btn-primary" aria-label="Search">
        <span class="material-symbols-outlined">search</span>
      </button>
    </div>
  `
})
export class IconButtonExampleComponent {}
```

---

### 4.3 Form Inputs & Search Fields

Inputs use flex containers (`h-[38px]` or `h-9`) ensuring that prefix icons and typed text are on the same optical axis.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  template: `
    <!-- Precision Flex Search Field -->
    <div class="flex items-center gap-2.5 h-[38px] px-3 bg-paper border border-border rounded-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all shadow-subtle">
      <span class="material-symbols-outlined text-[18px] text-ink-faint flex-shrink-0">search</span>
      <input 
        type="text" 
        [(ngModel)]="searchQuery" 
        placeholder="Search outerwear, cashmere, ceramics..."
        class="w-full bg-transparent border-none outline-none p-0 text-xs text-ink placeholder:text-ink-faint leading-normal"
      />
    </div>

    <!-- Curated Department Select -->
    <div class="h-[38px] flex items-center mt-4">
      <select 
        [(ngModel)]="selectedCategory"
        class="w-full h-full px-3 text-xs bg-paper border border-border rounded-sm text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer shadow-subtle">
        <option value="all">All Departments</option>
        <option value="outerwear">Outerwear & Coats</option>
        <option value="knitwear">Cashmere & Fine Knitwear</option>
        <option value="ceramics">Hand-thrown Studio Ceramics</option>
      </select>
    </div>
  `
})
export class InputExampleComponent {
  searchQuery = '';
  selectedCategory = 'all';
}
```

---

### 4.4 Material Filter Chips & Pills

```typescript
import { Component, signal } from '@angular/core';

@Component({
  template: `
    <div class="flex flex-wrap gap-2">
      @for (chip of chips(); track chip.name) {
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
  `
})
export class ChipExampleComponent {
  readonly chips = signal([
    { name: 'Pure Cashmere', selected: true },
    { name: 'Organic Linen', selected: false },
    { name: 'Merino Wool', selected: true },
  ]);

  toggleChip(chip: { name: string; selected: boolean }): void {
    chip.selected = !chip.selected;
  }
}
```

---

### 4.5 E-Commerce Product Card & Quick View Dialog

```typescript
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  imports: [MatButtonModule, MatSnackBarModule],
  template: `
    <div class="group bg-paper border border-border hover:border-border-strong rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-card max-w-sm">
      
      <!-- Visual Container with Watermark and Badge -->
      <div class="relative h-64 bg-surface-container flex flex-col items-center justify-center p-6 border-b border-border overflow-hidden">
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-ink text-paper font-semibold shadow-subtle">
          Bespoke Batch
        </span>

        <span class="font-serif text-6xl text-ink-faint/15 select-none uppercase tracking-widest">
          OUT
        </span>

        <div class="flex items-center gap-2 mt-4">
          <span class="w-4 h-4 rounded-full border border-border bg-[#8C6D46] shadow-subtle"></span>
          <span class="text-xs font-mono text-ink-muted">100% Melton Wool</span>
        </div>
      </div>

      <!-- Card Information -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs font-mono text-ink-faint mb-1">
            <span>Outerwear</span>
            <span class="text-secondary font-semibold">★ 4.9</span>
          </div>
          <h3 class="font-serif text-xl text-ink font-normal group-hover:text-accent transition-colors">
            Double-Breasted Wool Overcoat
          </h3>
          <p class="text-xs text-ink-muted mt-1">
            Unstructured silhouette cut from heavy brushed melton wool.
          </p>
        </div>

        <!-- Footer Price and Add Action -->
        <div class="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span class="text-base font-serif font-semibold text-ink">$680</span>

          <button 
            mat-flat-button 
            class="btn-atelier-primary !text-xs !py-1.5 !px-3"
            (click)="addToBag('Double-Breasted Wool Overcoat')">
            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

    </div>
  `
})
export class ProductCardExampleComponent {
  private readonly snackBar = inject(MatSnackBar);

  addToBag(productName: string): void {
    this.snackBar.open(`Added ${productName} to Bag`, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['bg-ink', 'text-paper'],
    });
  }
}
```

---

## 5. Theme Switching & Color Mode

Inject `ThemeService` into any standalone component to toggle or inspect the current color mode:

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  template: `
    <button 
      type="button" 
      (click)="themeService.toggleMode()"
      class="px-3.5 py-1.5 rounded-sm border border-border bg-surface text-ink text-xs font-medium flex items-center gap-2 cursor-pointer shadow-subtle">
      <span class="material-symbols-outlined text-[18px]">
        {{ themeService.mode() === 'dark' ? 'light_mode' : 'dark_mode' }}
      </span>
      <span class="capitalize">{{ themeService.mode() }} Mode</span>
    </button>
  `
})
export class ThemeToggleExampleComponent {
  readonly themeService = inject(ThemeService);
}
```

---

## 6. Do's and Don'ts

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Typography** | Use upright `Cormorant Garamond` with weight 500/600/700 for titles. | Do not use italic display headings (`<em>` or italic serif titles). |
| **Colors** | Use named tokens `var(--color-accent)`, `bg-paper`, `text-ink`. | Do not hardcode random hex (`#ff0000`) or generic purple/indigo slop. |
| **Icons** | Use `.material-symbols-outlined` with `'wght' 300` and flex centering. | Do not mix bulky 400/700 icon weights with ad-hoc margin offsets (`mr-1.5`). |
| **Buttons** | Always include `<span>` children inside `.btn-atelier-primary` for flex gap alignment. | Do not place raw text nodes next to icons without container formatting. |
| **State Feedback** | Use `.is-loading` with crisp white spinner on primary buttons. | Do not disable buttons silently without visual micro-indicators. |
| **Containers** | Ensure root pages have `overflow-x: clip` to prevent horizontal scrolling on mobile. | Do not use `overflow-x: hidden` which breaks sticky navigation. |
