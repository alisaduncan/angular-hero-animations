import { Component } from '@angular/core';
import { Group } from '../apis/model';
import { map } from 'rxjs';
import { GroupsService } from '../apis/groups.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <h2>Frequent Contacts</h2>
    <div class="card-grid">
      <mat-card *ngFor="let contact of frequentContacts$ | async">
        <mat-card-header>
          <mat-icon matCardAvatar svgIcon="avatars:{{contact.id}}"></mat-icon>
          <mat-card-title>{{contact.name}}</mat-card-title>
        </mat-card-header>
        <mat-card-actions align="end">
          <a mat-button color="primary" routerLink="/contacts/{{contact.id}}">EDIT</a>
        </mat-card-actions>
      </mat-card>
    </div>
    <p *ngIf="displayWarning">Heroes are busy and may be unavailable.</p>
   `
})
export class DashboardComponent {
  public frequentContacts$ = this.groupsService.getGroup(111).pipe(
    map((group: Group) => group.contacts)
  );
  public displayWarning = false;

  constructor(private groupsService: GroupsService) { }
}
