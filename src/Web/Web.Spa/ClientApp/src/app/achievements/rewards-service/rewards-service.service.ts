import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AchievementCategory } from 'src/app/models/achievementcategory';
import { environment } from 'src/environments/environment';

@Injectable()
export class RewardService {

  categoryUrl = environment.backendUrl + '/AchievementCategories';
  constructor(private http: HttpClient ) {
      }

  getAchievementCategories() {
    return this.http.get<AchievementCategory[]>(this.categoryUrl, { responseType: 'json'});
   }
}
