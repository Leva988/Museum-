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
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CookieModule } from 'ngx-cookie';
import { AchievementCategoryAdminComponent } from './achievement-category/achievement-category.admin.component';
import { BossAdminComponent } from './boss/boss.admin.component';
import { GalleryVideoAdminComponent } from './gallery-video/gallery-video.admin.component';
import { VideoCategoryAdminComponent } from './video-category/video-category.admin.component';

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
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
      { path: 'departments', component: DepartmentAdminComponent },
      { path: 'achievement-categories', component: AchievementCategoryAdminComponent },
      { path: 'bosses', component: BossAdminComponent },
      { path: 'gallery-videos', component: GalleryVideoAdminComponent },
      { path: 'video-categories', component: VideoCategoryAdminComponent }
     ]},
      { path: '**', redirectTo: 'auth' }
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing, ReactiveFormsModule, AgGridModule.withComponents([ButtonRendererComponent]),
  JwtModule.forRoot({
  }),
  CookieModule.forRoot(), ],
  declarations: [AuthComponent, AdminComponent, EmployeeAdminComponent, AchievementAdminComponent, DepartmentAdminComponent,
     GalleryAdminComponent, RewardedAdminComponent, ButtonRendererComponent, RewardAdminComponent, HistoryAdminComponent,
     ProjectAdminComponent, GalleryCategoryAdminComponent, CorporateYearAdminComponent, CorporateMonthAdminComponent,
     AchievementCategoryAdminComponent, BossAdminComponent, GalleryVideoAdminComponent, VideoCategoryAdminComponent],
  providers: [AuthGuard, AuthToken, JwtHelperService]
})
export class AdminModule {

    constructor(private router: Router) { }

 }
