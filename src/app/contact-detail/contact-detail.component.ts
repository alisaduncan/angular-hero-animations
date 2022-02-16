import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../apis/contacts.service';
import { take } from 'rxjs';
import { Contact } from '../apis/model';

@Component({
  selector: 'app-contact-detail',
  styleUrls: ['./contact-detail.component.scss'],
  template: `
    <ng-container *ngIf="contact">
      <h2>{{contact.name | uppercase}} Details</h2>
      <div class="contact-overview">
        <div>
          <mat-icon class="avatar" svgIcon="avatars:{{contact.id}}"></mat-icon>
        </div>
        <div class="info">
          <mat-form-field>
            <mat-label>Contact name</mat-label>
            <input matInput placeholder="Name" value="{{contact.name}}" [(ngModel)]="contact.name">
          </mat-form-field>
          <span>Id: {{contact.id}}</span>
        </div>
      </div>
      <div>
        <button mat-button color="accent" (click)="goBack()">GO BACK</button>
        <button mat-raised-button color="accent" (click)="save()">SAVE</button>
      </div>
    </ng-container>
  `
})
export class ContactDetailComponent implements OnInit {
  public contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private location: Location
  ) { }

  public ngOnInit(): void {
    this.getContact();
  }

  public goBack(): void {
    this.location.back();
  }

  public save(): void {
    if (this.contact) {
      this.contactsService.updateContact(this.contact)
        .pipe(
          take(1)
        )
        .subscribe(_ => this.goBack());
    }
  }

  private getContact(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.contactsService.getContact(id)
      .pipe(
        take(1)
      )
      .subscribe((c: Contact) => this.contact = c);
  }
}
