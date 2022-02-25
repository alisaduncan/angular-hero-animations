import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { route: 0 } },
  { path: 'contacts', component: ContactsComponent, data: { route: 1 } },
  { path: 'contacts/:id', component: ContactDetailComponent, data: { route: 2 } },
  { path: 'groups', component: GroupsComponent, data: { route: 3 } },
  { path: 'groups/:id', component: GroupDetailComponent, data: { route: 4 } },
  { path: 'about', component: AboutComponent, data: { route: 5 } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
