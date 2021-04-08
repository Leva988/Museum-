import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AchievementCategory } from 'src/app/models/achievementcategory';
import { environment } from 'src/environments/environment';
import { Achievement } from 'src/app/models/achievement';

@Injectable()
export class RewardService {

  categoryUrl = environment.backendUrl + '/AchievementCategories';
  achievementUrl = environment.backendUrl + '/Achievements';
  constructor(private http: HttpClient ) {
      }

  getAchievementCategories() {
    return this.http.get<AchievementCategory[]>(this.categoryUrl, { responseType: 'json'});
   }

  getAchievementsByCategory(categoryId: string) {
    return this.http.get<Achievement[]>(this.achievementUrl + '/Category/' + categoryId,  { responseType: 'json'});
  }
}
