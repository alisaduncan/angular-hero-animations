import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GroupsService } from '../apis/groups.service';
import { of } from 'rxjs';
import { Group } from '../apis/model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const groupsServiceSpy = jasmine.createSpyObj<GroupsService>(['getGroup']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatIconTestingModule
      ],
      declarations: [ DashboardComponent ],
      providers: [
        { provide: GroupsService, useValue: groupsServiceSpy }
      ]
    })
    .compileComponents();

    groupsServiceSpy.getGroup.and.returnValue(of({id: 111, name: 'Test Group', contacts: []} as Group))

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
