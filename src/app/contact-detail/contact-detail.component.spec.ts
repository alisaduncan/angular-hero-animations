import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailComponent } from './contact-detail.component';
import { SpyLocation } from '@angular/common/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactsService } from '../apis/contacts.service';
import { of } from 'rxjs';
import { Contact } from '../apis/model';
import { FormsModule } from '@angular/forms';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;

  const contactsServiceSpy = jasmine.createSpyObj<ContactsService>(['getContact', 'updateContact']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        NoopAnimationsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatIconTestingModule
      ],
      declarations: [ ContactDetailComponent ],
      providers: [
        { provide: ContactsService, useValue: contactsServiceSpy },
        { provide: Location, useClass: SpyLocation }
      ]
    })
    .compileComponents();

    contactsServiceSpy.getContact.and.returnValue(of({id: 1, name: 'Test Contact'} as Contact))

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
