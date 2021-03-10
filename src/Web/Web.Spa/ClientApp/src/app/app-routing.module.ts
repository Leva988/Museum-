import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CompanyComponent } from './company/company.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ServiceComponent } from './service/service.component';
import { HistoryMilestonesComponent} from './hisrory/hisrory-milestones/history-milestones.component';
import { HistoryRewardedComponent} from './hisrory/history-veterans/history-rewarded.component';
import { SocialComponent } from './social/social.component';
import { NewsComponent } from './news/news.component';
import { GalleryVideoComponent } from './gallery/gallery-videos/gallery-video.component';
import { GalleryPhotoComponent } from './gallery/gallery-photos/gallery-photo.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GalleryCategoryComponent } from './gallery/gallery-photos/category/gallery-category.component';

const routes: Routes = [
   { path: '', component: MenuComponent },
   { path: 'company/:id', component: CompanyComponent },
   { path: 'company/:id/admin', component: CompanyComponent },
   { path: 'achievements', component: AchievementsComponent},
   { path: 'service', component: ServiceComponent},
   { path: 'historymilestones', component: HistoryMilestonesComponent},
   { path: 'historyrewarded', component: HistoryRewardedComponent},
   { path: 'social', component: SocialComponent},
   { path: 'news', component: NewsComponent},
   { path: 'galleryvideos', component: GalleryVideoComponent},
   { path: 'galleryphotos/:category', component: GalleryPhotoComponent,
    children: [{path: 'category', component: GalleryCategoryComponent}]},
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
