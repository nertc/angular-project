import { animate, style, transition, trigger } from "@angular/animations";

export const appear = trigger('appear', [
  transition(':enter', [
    style({
      opacity: 0,
      // left: '-25px',
    }),
    animate('1s', style({
      opacity: 1,
      // left: '0',
    }))
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      // left: '0',
    }),
    animate('1s', style({
      opacity: 0,
      // left: '25px',
    }))
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('0.25s', style({
      opacity: 1,
    }))
  ]),
  transition(':leave', [
    style({
      opacity: 1,
    }),
    animate('0.25s', style({
      opacity: 0,
    }))
  ]),
]);

export const popIn = trigger('popIn', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.5, 0.5)',
    }),
    animate('0.25s', style({
      opacity: 1,
      transform: 'scale(1, 1)',
    }))
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'scale(1, 1)',
    }),
    animate('0.25s', style({
      opacity: 0,
      transform: 'scale(0.5, 0.5)',
    }))
  ]),
])
