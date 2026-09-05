import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-chip',
  imports: [TitleCasePipe],
  template: `
    <button
      type="button"
      role="tab"
      [attr.aria-selected]="isSelected()"
      (click)="selected.emit(id())"
      [class]="
        isSelected()
          ? 'bg-ink text-paper border-ink shadow-subtle'
          : 'bg-surface-container text-ink hover:bg-surface-container-high border-border'
      "
      class="px-4 py-2 rounded-full border text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 focus-visible:outline-2 focus-visible:outline-accent"
    >
      @if (isSelected()) {
        <span class="material-symbols-outlined text-[14px]">check</span>
      }
      <span>{{ label() | titlecase }}</span>
    </button>
  `,
})
export class CategoryChipComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly isSelected = input<boolean>(false);

  readonly selected = output<string>();
}
