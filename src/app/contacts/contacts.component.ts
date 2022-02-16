import { Component, HostBinding, OnInit } from '@angular/core';
import { ContactsService } from '../apis/contacts.service';
import { Contact } from '../apis/model';
import { take } from 'rxjs';
import { animate, group, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-contacts',
  styleUrls: ['./contacts.component.scss'],
  template: `
    <h2>My Contacts</h2>
    <mat-form-field>
      <mat-label>Contact name</mat-label>
      <input matInput #contactName>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="add(contactName.value); contactName.value=''" [disabled]="!contactName.value">
      ADD CONTACT
    </button>
    <mat-nav-list>
      <mat-list-item *ngFor="let contact of contacts">
        <a matLine routerLink="/contacts/{{contact.id}}">
          <div class="list-item">
            <mat-icon matListAvatar svgIcon="avatars:{{contact.id}}"></mat-icon>
            <span>{{contact.name}}</span>
          </div>
        </a>
      </mat-list-item>
    </mat-nav-list>
  `
})
export class ContactsComponent implements OnInit {
  public contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) { }

  public ngOnInit(): void {
    this.contactsService.getContacts()
      .pipe(
        take(1)
      ).subscribe((c: Contact[]) => this.contacts = c);
  }

  public add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.contactsService.addContact({name} as Contact)
      .pipe(
        take(1)
      ).subscribe((c: Contact) => this.contacts.push(c))
  }
}
