import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { ContactsService } from '../apis/contacts.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { Group } from '../apis/model';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  const contactsServiceSpy = jasmine.createSpyObj<ContactsService>(['getContacts', 'addContact']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatIconTestingModule
      ],
      declarations: [ ContactsComponent ],
      providers: [
        { provide: ContactsService, useValue: contactsServiceSpy }
      ]
    })
    .compileComponents();

    contactsServiceSpy.getContacts.and.returnValue(of([]))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
