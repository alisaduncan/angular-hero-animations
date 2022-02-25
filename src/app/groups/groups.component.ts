import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../apis/groups.service';
import { Group } from '../apis/model';
import { take } from 'rxjs';
import { transition, trigger, useAnimation } from '@angular/animations';
import { animateListIn } from '../animations';

@Component({
  selector: 'app-groups',
  styleUrls: ['./groups.component.scss'],
  template: `
    <h2>My Contact Groups</h2>
    <mat-form-field>
      <mat-label>Group name</mat-label>
      <input matInput #groupName>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="add(groupName.value); groupName.value=''" [disabled]="!groupName.value">
      ADD GROUP
    </button>
    <mat-nav-list [@animateIn]="groups.length">
      <mat-list-item *ngFor="let group of groups">
        <a matLine routerLink="/groups/{{group.id}}">
          <div class="list-item">
            <mat-icon mat-list-icon>group</mat-icon>
            <span>{{group.name}}</span>
          </div>
        </a>
      </mat-list-item>
    </mat-nav-list>
  `,
  animations: [
    trigger('animateIn', [
      transition('* => *', [
        useAnimation(animateListIn)
      ])
    ])
  ]
})
export class GroupsComponent implements OnInit {
  public groups: Group[] = [];

  constructor(private groupsService: GroupsService) { }

  ngOnInit(): void {
    this.groupsService.getGroups()
      .pipe(take(1))
      .subscribe(groups => this.groups = groups)
  }

  public add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.groupsService.addGroup({ name } as Group)
      .pipe(take(1))
      .subscribe(group => this.groups.push(group));
  }
}
