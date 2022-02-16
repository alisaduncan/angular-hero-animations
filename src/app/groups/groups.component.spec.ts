import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponent } from './groups.component';
import { GroupsService } from '../apis/groups.service';
import { group } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;
  const groupsServiceSpy = jasmine.createSpyObj<GroupsService>(['getGroups', 'addGroup']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      declarations: [ GroupsComponent ],
      providers: [
        { provide: GroupsService, useValue: groupsServiceSpy }
      ]
    })
    .compileComponents();

    groupsServiceSpy.getGroups.and.returnValue(of([]))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
