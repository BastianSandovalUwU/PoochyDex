import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';

/**
 * Generic modal shell: backdrop, title bar, projected body. Use for any in-app dialog content.
 * z-index above app chrome (e.g. music player); locks body scroll while open.
 */
@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss']
})
export class UiModalComponent implements OnChanges, OnDestroy {
  /** Controls visibility; supports two-way binding via openChange. */
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  /** Header text (caller translates). */
  @Input() title = '';

  /** Close when clicking the dimmed backdrop. */
  @Input() closeOnBackdrop = true;

  /** Optional id for aria-labelledby (defaults to generated). */
  @Input() titleId = `app-ui-modal-title-${Math.random().toString(36).slice(2, 11)}`;

  /** Accessible label for the close control. */
  @Input() closeAriaLabel = 'Close';

  @Output() closed = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.syncBodyScroll();
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined' && this.open) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (this.open) {
      event.preventDefault();
      this.close();
    }
  }

  close(): void {
    if (!this.open) {
      return;
    }
    this.openChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop) {
      return;
    }
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  private syncBodyScroll(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.style.overflow = this.open ? 'hidden' : '';
  }
}
