import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthToken } from './auth/auth.token';
import { EmployeeAdminComponent } from './employee/employee.admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExitGuard } from './auth/exit.admin.guard';
import { ButtonRendererComponent } from './button-renderer.component';
import { AchievementAdminComponent } from './achievement/achievement.admin.component';
import { RewardedAdminComponent } from './rewarded/rewarded.admin.component';
import { RewardAdminComponent } from './reward/reward.admin.component';
import { ProjectAdminComponent } from './project/project.admin.component';
import { GalleryCategoryAdminComponent } from './gallery-category/gallery-category.admin.component';
import { GalleryAdminComponent } from './gallery/gallery.admin.component';
import { CorporateYearAdminComponent } from './corporate-year/corporate-year.admin.component';
import { CorporateMonthAdminComponent } from './corporate-month/corporate-month.admin.component';
import { HistoryAdminComponent } from './history-milestones/history.admin.component';
import { DepartmentAdminComponent } from './department/department.admin.component';

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, // canActivate: [AuthGuard], canDeactivate: [ExitGuard],
    children: [
      { path: 'employees', component: EmployeeAdminComponent},
      { path: 'achievements', component: AchievementAdminComponent},
      { path: 'rewarded', component: RewardedAdminComponent },
      { path: 'rewards', component: RewardAdminComponent },
      { path: 'projects', component: ProjectAdminComponent },
      { path: 'gallery-categories', component: GalleryCategoryAdminComponent },
      { path: 'galleries', component: GalleryAdminComponent },
      { path: 'corporate-years', component: CorporateYearAdminComponent },
      { path: 'corporate-months', component: CorporateMonthAdminComponent },
      { path: 'history-milestones', component: HistoryAdminComponent },
      { path: 'departments', component: DepartmentAdminComponent }
     ]},
      { path: '**', redirectTo: 'auth' }
]);
@NgModule({
  imports: [CommonModule, FormsModule, routing, ReactiveFormsModule, AgGridModule.withComponents([ButtonRendererComponent])],
  declarations: [AuthComponent, AdminComponent, EmployeeAdminComponent, AchievementAdminComponent, DepartmentAdminComponent,
     GalleryAdminComponent, RewardedAdminComponent, ButtonRendererComponent, RewardAdminComponent, HistoryAdminComponent,
     ProjectAdminComponent, GalleryCategoryAdminComponent, CorporateYearAdminComponent, CorporateMonthAdminComponent],
  providers: [AuthGuard, AuthToken, ExitGuard]
})
export class AdminModule {

    constructor(private router: Router) { }

 }
