import { Component, Input } from '@angular/core';

/**
 * Shimmer placeholder for loading states. Place inside a `position: relative` container
 * with defined size so the overlay fills it (`absolute inset-0`).
 */
@Component({
  selector: 'app-ui-skeleton',
  templateUrl: './ui-skeleton.component.html',
  styleUrls: ['./ui-skeleton.component.scss'],
  host: { class: 'contents' }
})
export class UiSkeletonComponent {
  /** When true, the shimmer overlay is visible. */
  @Input() loading = false;

  /** Optional extra classes on the overlay (e.g. z-index). */
  @Input() extraClasses = '';
}
