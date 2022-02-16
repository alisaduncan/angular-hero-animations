import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin, take } from 'rxjs';
import { Contact, Group } from '../apis/model';
import { GroupsService } from '../apis/groups.service';
import { ContactsService } from '../apis/contacts.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-group-detail',
  styleUrls: ['./group-detail.component.scss'],
  template: `
    <ng-container *ngIf="group">
      <h2>{{group.name | uppercase}} Details</h2>
      <div class="group-overview">
        <div class="group-name">
          <mat-icon class="avatar">group</mat-icon>
          <mat-form-field>
            <mat-label>Group name</mat-label>
            <input matInput placeholder="Name" value="{{group.name}}" [(ngModel)]="group.name">
          </mat-form-field>
        </div>
        <div *ngIf="group.contacts.length > 0">
          <h3 class="mat-subheading-2">Contacts in {{group.name}}</h3>
          <mat-list>
            <mat-list-item *ngFor="let contact of group.contacts" class="list-item">
              <mat-icon matListAvatar svgIcon="avatars:{{contact.id}}"></mat-icon>
              <div matLine>
                {{contact.name}}
              </div>
              <button mat-icon-button color="accent" title="remove contact" (click)="deleteContact(contact)">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-list-item>
          </mat-list>
        </div>
        <div *ngIf="availableContacts.length > 0">
          <h3 class="mat-subheading-2">Add contacts to {{group.name}}</h3>
          <mat-form-field>
            <mat-label>All contacts</mat-label>
            <mat-select multiple>
              <mat-option *ngFor="let contact of availableContacts" [value]="contact">{{contact.name}}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div>
          <span>Id: {{group.id}}</span>
        </div>
      </div>
      <div>
        <button mat-button color="accent" (click)="goBack()">GO BACK</button>
        <button mat-raised-button color="accent" (click)="save()">SAVE</button>
      </div>
    </ng-container>
  `
})
export class GroupDetailComponent implements OnInit {

  @ViewChild(MatSelect) public contactSelect!: MatSelect;
  public group: Group | undefined;
  public availableContacts: Contact[] = [];

  constructor(private route: ActivatedRoute,
              private groupsService: GroupsService,
              private contactsService: ContactsService,
              private location: Location) { }

  public ngOnInit(): void {
    this.getGroup();
  }

  public goBack(): void {
    this.location.back();
  }

  public deleteContact(contact: Contact): void {
    const idx = this.group?.contacts.findIndex(el => el.id === contact.id) as number;
    this.group?.contacts.splice(idx, 1);
  }

  public save(): void {
    if (this.group) {
      const addedContacts =
        (this.contactSelect.selected as MatOption[]).filter(s => s.selected).map(s => s.value);
      const contacts = this.group.contacts.concat(addedContacts);
      const group = {...this.group, contacts}
      this.groupsService.updateGroup(group)
        .pipe(
          take(1)
        )
        .subscribe(_ => this.goBack());
    }
  }

  private getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    forkJoin([
      this.groupsService.getGroup(id),
      this.contactsService.getContacts()
    ]).pipe(
      take(1)
    ).subscribe( {
      next: ([group, contacts]) => {
        this.group = group;
        const contactIds = group.contacts.map(c => c.id);
        this.availableContacts = contacts.filter(c => !contactIds.includes(c.id))
      }
    });
  }
}
