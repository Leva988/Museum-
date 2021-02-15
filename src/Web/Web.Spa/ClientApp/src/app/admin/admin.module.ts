import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthToken } from './auth/auth.token';
import { EmployeeAdminComponent } from './employee/employee.admin.component';
import { ProjectAdminComponent } from './project/project.admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExitGuard } from './auth/exit.admin.guard';
import { EconomyYearAdminComponent } from './economyyear/economy.year.admin.component';
import { EconomyMonthAdminComponent } from './economymonth/economy.month.admin.component';
import { SocialCategoryAdminComponent } from './socialcategory/social.category.admin.component';
import { GalleryAdminComponent } from './gallery/gallery.admin.component';
import { VeteranAdminComponent } from './veteran/veteran.admin.component';
import { ServiceAdminComponent } from './services/service.admin.component';
const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate : [AuthGuard], canDeactivate: [ExitGuard],
    children: [
      { path: 'employees', component: EmployeeAdminComponent},
      { path: 'projects', component: ProjectAdminComponent},
      { path: 'economyyears', component: EconomyYearAdminComponent},
      { path: 'economymonths', component: EconomyMonthAdminComponent},
      { path: 'socialcategories', component: SocialCategoryAdminComponent},
      { path: 'galleries', component: GalleryAdminComponent},
      { path: 'veterans', component: VeteranAdminComponent},
      { path: 'services', component: ServiceAdminComponent} ]},
  { path: '**', redirectTo: 'auth' }
]);
@NgModule({
  imports: [CommonModule, FormsModule, routing, ReactiveFormsModule],
  declarations: [AuthComponent, AdminComponent, EmployeeAdminComponent, SocialCategoryAdminComponent, VeteranAdminComponent,
    ProjectAdminComponent, EconomyYearAdminComponent, EconomyMonthAdminComponent, GalleryAdminComponent, ServiceAdminComponent],
  providers: [AuthGuard, AuthToken, ExitGuard]
})
export class AdminModule {

    constructor(private router: Router) { }

 }
