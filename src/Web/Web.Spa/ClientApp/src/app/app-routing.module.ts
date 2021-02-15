import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CompanyComponent } from './company/company.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ServiceComponent } from './service/service.component';
import { DepartmentComponent } from './department/department.component';
import { HistoryDatesComponent} from './hisrory/hisrory-dates/history-dates.component';
import { HistoryVeteransComponent} from './hisrory/history-veterans/history-veterans.component';
import { HistoryRefComponent } from './hisrory/history-ref/history-ref.component';
import { SocialComponent } from './social/social.component';
import {NewsComponent} from './news/news.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
   { path: '', component: MenuComponent },
   { path: 'company/:id', component: CompanyComponent },
   { path: 'company/:id/admin', component: CompanyComponent },
   { path: 'achievements', component: AchievementsComponent},
   { path: 'service', component: ServiceComponent},
   { path: 'departments/:id', component: DepartmentComponent},
   { path: 'historydates', component: HistoryDatesComponent},
   { path: 'historyveterans', component: HistoryVeteransComponent},
   { path: 'historyref', component: HistoryRefComponent},
   { path: 'social', component: SocialComponent},
   { path: 'news', component: NewsComponent},
   { path: 'gallery', component: GalleryComponent},
   { path: 'projects', component: ProjectsComponent},
   { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
   { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
