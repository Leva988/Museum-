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
import { CompanyIndicatorsComponent } from './company/company-indicators/company-indicators.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ServiceComponent } from './service/service.component';
import { ImageComponent } from './shared/image/image.component';
import { DepartmentComponent } from './department/department.component';
import { ButtonComponent } from './shared/button/button.component';
import { HistoryDatesComponent} from './hisrory/hisrory-dates/history-dates.component';
import { HistoryVeteransComponent} from './hisrory/history-veterans/history-veterans.component';
import { HistoryRefComponent } from './hisrory/history-ref/history-ref.component';
import { SocialComponent } from './social/social.component';
import { NewsComponent } from './news/news.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProjectsComponent } from './projects/projects.component';
import { NeftByComponent } from './news/neft.by/neft.by.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BelorusneftComponent } from './news/belorusneft/belorusneft.component';
import { GraficComponent } from './department/grafic/grafic.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CompanyComponent,
    HeaderComponent,
    CompanyBossesComponent,
    CompanyDepartmentsComponent,
    CompanyIndicatorsComponent,
    AchievementsComponent,
    ServiceComponent,
    ImageComponent,
    DepartmentComponent,
    ButtonComponent,
    HistoryDatesComponent,
    HistoryVeteransComponent,
    HistoryRefComponent,
    SocialComponent,
    NewsComponent,
    GalleryComponent,
    ProjectsComponent,
    NeftByComponent,
    NotfoundComponent,
    BelorusneftComponent,
    GraficComponent
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
