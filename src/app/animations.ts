import { animate, animateChild, animation, group, query, stagger, style } from '@angular/animations';

export const animateListIn = animation([
  query(':enter', [
    style({ opacity: 0, transform: 'translateY(100%)' }),
    stagger(500, [
      animate('500ms ease-in-out', style({ opacity: 1, transform: 'none' }))
    ])
  ], { optional: true })
]);

export const slideOverRouteAnimation = animation([
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter',
    style({
      transform: '{{enter}}',
    }),
    { optional: true }),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      style({
        transform: 'none',
      }),
      animate('300ms ease-in',
        style({
          transform: '{{leave}}'
        })
      )
    ], { optional: true }),
    query(':enter',
      animate('300ms ease-out',
        style({
          transform: 'translateX(0%)'
        })
      ), { optional: true }),
  ]),
  query(':enter', animateChild()),
]);
