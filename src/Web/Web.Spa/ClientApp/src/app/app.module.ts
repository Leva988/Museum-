import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CompanyComponent } from './company/company.component';
import { HeaderComponent } from './shared/header/header.component';
import { CompanyBossesComponent } from './company/company-bosses/company-bosses.component';
import { CompanyDepartmentsComponent } from './company/company-departments/company-departments.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ServiceComponent } from './service/service.component';
import { ImageComponent } from './shared/image/image.component';
import { ButtonComponent } from './shared/button/button.component';
import { HistoryMilestonesComponent} from './hisrory/hisrory-milestones/history-milestones.component';
import { HistoryRewardedComponent} from './hisrory/history-veterans/history-rewarded.component';
import { SocialComponent } from './social/social.component';
import { NewsComponent } from './news/news.component';
import { GalleryVideoComponent } from './gallery/gallery-videos/gallery-video.component';
import { GalleryPhotoComponent } from './gallery/gallery-photos/gallery-photo.component';
import { ProjectsComponent } from './projects/projects.component';
import { NeftByComponent } from './news/neft.by/neft.by.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BelorusneftComponent } from './news/belorusneft/belorusneft.component';
import { GalleryCategoryComponent } from './gallery/gallery-photos/category/gallery-category.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CompanyComponent,
    HeaderComponent,
    CompanyBossesComponent,
    CompanyDepartmentsComponent,
    AchievementsComponent,
    ServiceComponent,
    ImageComponent,
    ButtonComponent,
    HistoryMilestonesComponent,
    HistoryRewardedComponent,
    SocialComponent,
    NewsComponent,
    GalleryVideoComponent,
    GalleryPhotoComponent,
    ProjectsComponent,
    NeftByComponent,
    NotfoundComponent,
    BelorusneftComponent,
    GalleryCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
