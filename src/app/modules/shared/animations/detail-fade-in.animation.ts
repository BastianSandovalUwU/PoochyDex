import { animate, style, transition, trigger } from '@angular/animations';

const DETAIL_FADE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const detailFadeInAnimations = [
  trigger('detailFadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(12px)' }),
      animate(
        `400ms ${DETAIL_FADE_EASE}`,
        style({ opacity: 1, transform: 'translateY(0)' })
      )
    ])
  ])
];
