import { Component, EventEmitter, Input, Output } from '@angular/core';

export type UiButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'icon'
  | 'cry-play'
  | 'cry-pause';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent {
  /** Visual style. `cry-play` / `cry-pause` are circular audio controls (Pokémon cry). */
  @Input() variant: UiButtonVariant = 'primary';

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** When true, button spans full width of its container. */
  @Input() fullWidth = false;

  @Input() type: 'button' | 'submit' = 'button';

  @Input() disabled = false;

  @Input() ariaLabel?: string;

  /** Optional ARIA / semantics forwarded to the native `button` (modals, tabs, toggles). */
  @Input() role?: string | null;
  @Input() ariaExpanded?: boolean | string | null;
  @Input() ariaSelected?: boolean | string | null;
  @Input() ariaPressed?: boolean | string | null;

  /** Extra Tailwind / utility classes merged onto the native `button`. */
  @Input() extraClasses = '';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(ev: MouseEvent): void {
    if (this.disabled) {
      return;
    }
    this.buttonClick.emit(ev);
  }

  get hostClasses(): string {
    const parts: string[] = ['ui-button', `ui-button--${this.variant}`];

    if (this.fullWidth) {
      parts.push('w-full');
    }

    if (this.variant === 'primary') {
      parts.push(
        'rounded-full font-medium shadow-sm',
        'bg-red-500 text-white hover:bg-red-600',
        'dark:bg-red-600 dark:hover:bg-red-700',
        'focus-visible:ring-red-400'
      );
      parts.push(this.size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm');
    }

    if (this.variant === 'secondary') {
      parts.push(
        'rounded-lg border-2 font-medium',
        'border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100',
        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
        'focus-visible:ring-gray-400'
      );
      parts.push(this.size === 'sm' ? 'p-2 text-sm' : 'p-3 text-sm');
    }

    if (this.variant === 'outline') {
      parts.push(
        'rounded-lg border font-medium',
        'border-gray-300 bg-transparent text-gray-800 hover:bg-gray-50',
        'dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800/80',
        'focus-visible:ring-gray-400'
      );
      parts.push('px-3 py-2 text-sm');
    }

    if (this.variant === 'ghost') {
      parts.push(
        'rounded-lg font-medium',
        'text-gray-700 hover:bg-gray-100',
        'dark:text-gray-200 dark:hover:bg-gray-700',
        'focus-visible:ring-gray-400'
      );
      parts.push('px-3 py-2 text-sm');
    }

    if (this.variant === 'icon') {
      parts.push(
        'rounded-full w-10 h-10 min-w-[40px] min-h-[40px]',
        'text-gray-700 hover:bg-black/5',
        'dark:text-gray-200 dark:hover:bg-white/10',
        'focus-visible:ring-2 focus-visible:ring-blue-500/50'
      );
    }

    if (this.variant === 'cry-play' || this.variant === 'cry-pause') {
      parts.push('ui-button--cry');
    }

    parts.push(
      'inline-flex items-center justify-center gap-2',
      'transition-colors duration-200',
      'disabled:opacity-50 disabled:pointer-events-none'
    );

    if (this.variant !== 'cry-play' && this.variant !== 'cry-pause') {
      parts.push('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2');
    }

    const base = parts.join(' ');
    return this.extraClasses ? `${base} ${this.extraClasses}`.trim() : base;
  }
}
