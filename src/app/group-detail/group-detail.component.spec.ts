import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailComponent } from './group-detail.component';
import { GroupsService } from '../apis/groups.service';
import { ContactsService } from '../apis/contacts.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpyLocation } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Group } from '../apis/model';

describe('GroupDetailComponent', () => {
  let component: GroupDetailComponent;
  let fixture: ComponentFixture<GroupDetailComponent>;
  const groupsServiceSpy = jasmine.createSpyObj<GroupsService>(['getGroup', 'updateGroup']);
  const contactsServiceSpy = jasmine.createSpyObj<ContactsService>(['getContacts']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      declarations: [ GroupDetailComponent ],
      providers: [
        { provide: GroupsService, useValue: groupsServiceSpy },
        { provide: ContactsService, useValue: contactsServiceSpy },
        { provide: Location, useClass: SpyLocation }
      ]
    })
    .compileComponents();

    groupsServiceSpy.getGroup.and.returnValue(of({id: 1, name: 'Test Group', contacts: []} as Group))

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
