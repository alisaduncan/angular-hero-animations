import { Component, HostBinding } from '@angular/core';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-about',
  styleUrls: ['./about.component.scss'],
  template: `
    <div class="about">
      <h2 class="mat-subheading-2">About Hero Contacts</h2>
      <p class="description mat-subheading-2">
        The easiest way to manage your hero contacts! Arrange your heroes in groups, see your heroes at a glance!
      </p>
      <section>
        <div [@learn-more]="learnMore ? 'expanded' : 'collapsed'">
          <span class="mat-subheading-2">Learn more!</span>
          <button mat-icon-button color="accent" aria-label="learnMore ? 'Learn less' : 'Learn more'" (click)="onLearnMore()">
            <mat-icon>{{learnMore ? 'expand_less' : 'expand_more'}}</mat-icon>
          </button>
          <p *ngIf="learnMore" @slideIn>
            Glad to see you want to learn more! Did you know that elephants can't jump?
          </p>
        </div>
      </section>
    </div>
  `,
  animations: [
    trigger('learn-more', [
      state('expanded, collapsed', style({
        border: '1px dashed lightgray',
        borderRadius: '4px'
      })),
      transition('expanded => collapsed', [
        group([
          animate('500ms cubic-bezier(.68,-0.73,.26,1.65)'),
          query('@slideIn', animateChild())
        ])
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-25%)' }),
        animate(500, style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0, transform: 'translateY(-25%)' }))
      ])
    ]),
    trigger('pageAnimations', [
      transition(':enter', [
        query('.description', [
          style({ opacity: 0 }),
          animate(2000, style({ opacity: 1 }))
        ])
      ])
    ]),
  ]
})
export class AboutComponent {
  @HostBinding('@pageAnimations') public pageAnimations = true;
  public learnMore = false;
  constructor() { }

  public onLearnMore(): void {
    this.learnMore = !this.learnMore;
  }
}
