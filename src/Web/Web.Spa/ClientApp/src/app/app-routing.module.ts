import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CompanyComponent } from './company/company.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ServiceComponent } from './service/service.component';
import { HistoryMilestonesComponent} from './hisrory/hisrory-milestones/history-milestones.component';
import { HistoryRewardedComponent} from './hisrory/history-rewarded/history-rewarded.component';
import { CorporateMonthComponent } from './corporate/corporate-month/corporate-month.component';
import { NewsComponent } from './news/news.component';
import { GalleryVideoComponent } from './gallery/gallery-videos/gallery-video.component';
import { GalleryPhotoComponent } from './gallery/gallery-photos/gallery-photo.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GalleryCategoryComponent } from './gallery/gallery-photos/category/gallery-category.component';
import { CorporateYearComponent } from './corporate/corporate-year.component';
import { DepartmentComponent } from './department/department.component';
import { BossComponent } from './hisrory/history-bosses/history-bosses.component';

const routes: Routes = [
   { path: '', component: MenuComponent },
   { path: 'company', component: CompanyComponent },
   { path: 'departments/:id', component: DepartmentComponent},
   { path: 'company/admin', component: CompanyComponent },
   { path: 'achievements', component: AchievementsComponent},
   { path: 'service', component: ServiceComponent},
   { path: 'historymilestones', component: HistoryMilestonesComponent},
   { path: 'historyrewarded', component: HistoryRewardedComponent},
   { path: 'historybosses', component: BossComponent},
   { path: 'corporate/year/:year', component: CorporateYearComponent,
    children: [{path: '', component: CorporateMonthComponent}]},
   { path: 'news', component: NewsComponent},
   { path: 'galleryvideos/category/:category', component: GalleryVideoComponent,
     children: [{path: '', component: GalleryCategoryComponent}]},
   { path: 'galleryphotos/category/:category', component: GalleryPhotoComponent,
    children: [{path: '', component: GalleryCategoryComponent}]},
   { path: 'projects', component: ProjectsComponent},
   { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
   { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
