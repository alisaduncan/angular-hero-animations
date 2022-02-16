import { Component, HostBinding } from '@angular/core';

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
        <div>
          <span class="mat-subheading-2">Learn more!</span>
          <button mat-icon-button color="accent" aria-label="learnMore ? 'Learn less' : 'Learn more'" (click)="onLearnMore()">
            <mat-icon>{{learnMore ? 'expand_less' : 'expand_more'}}</mat-icon>
          </button>
          <p *ngIf="learnMore">
            Glad to see you want to learn more! Did you know that elephants can't jump?
          </p>
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent {
  public learnMore = false;
  constructor() { }

  public onLearnMore(): void {
    this.learnMore = !this.learnMore;
  }
}
