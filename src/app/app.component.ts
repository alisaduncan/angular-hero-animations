import { Component, HostBinding } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { animate, animateChild, group, query, style, transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="app">
      <mat-toolbar color="primary">
        <h1>{{title}}</h1>
      </mat-toolbar>
      <nav>
        <a mat-button color="primary" class="mat-headline" routerLink="/dashboard">Dashboard</a>
        <a mat-button color="primary" class="mat-headline" routerLink="/contacts">Contacts</a>
        <a mat-button color="primary" class="mat-headline" routerLink="/groups">Groups</a>
        <a mat-button color="primary" class="mat-headline" routerLink="/about">About</a>
      </nav>
      <mat-divider></mat-divider>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        <div class="mat-caption">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div class="copyright">&copy; 2022 Made with 💖 by <a href="https://twitter.com/AlisaDuncan">@AlisaDuncan</a> using <a href="https://angular.io/">Angular</a> and <a href="https://material.angular.io/">Angular Material</a></div>
      </footer>
    </div>
  `
})
export class AppComponent {
  title = 'Hero Contacts';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg');
    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }
}
