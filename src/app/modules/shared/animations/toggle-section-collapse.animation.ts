import { animate, state, style, transition, trigger } from '@angular/animations';

/** Duration for height + opacity collapse (matches former inline triggers). */
const TOGGLE_SECTION_TIMING = '300ms ease-in-out';

/**
 * Collapsible panel: animates height and opacity between `visible` and `hidden`.
 * In templates: bind `[@toggleFilters]` to `'visible' | 'hidden'` (trigger name kept for templates).
 */
export const toggleSectionCollapseAnimations = [
  trigger('toggleFilters', [
    state(
      'visible',
      style({
        height: '*',
        opacity: 1
      })
    ),
    state(
      'hidden',
      style({
        height: '0px',
        opacity: 0
      })
    ),
    transition('visible <=> hidden', [animate(TOGGLE_SECTION_TIMING)])
  ])
];
