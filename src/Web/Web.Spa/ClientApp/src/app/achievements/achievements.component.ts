import { Component, OnInit } from '@angular/core';
import { RewardService } from './rewards-service/rewards-service.service';
import { environment } from 'src/environments/environment';
import { Achievement } from '../models/achievement';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';
import { AchievementCategory } from '../models/achievementcategory';

declare var $: any;

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  providers: [RewardService] })

export class AchievementsComponent implements OnInit {
  achUrl = environment.backendUrl  + '/Achievements';
  categories: Observable<AchievementCategory[]>;
  diploma: Achievement = new Achievement();
  active: number;
  achievements: Achievement[] = [];

  constructor(private rewardservice: RewardService, private http: HttpClient) {
    this.refreshAchievements();
  }

  ngOnInit() {
    $(document).on('hide.bs.modal', '#ModalImage', () => {
      this.active = null;
    });
   }

   refreshAchievements() {
    this.categories = this.rewardservice.getAchievementCategories();
  }

  getByCategory(categoryId: string) {
   this.rewardservice.getAchievementsByCategory(categoryId).subscribe(
     (data: Achievement[]) => {
       this.achievements = data;
     }, error => console.log(error)
   );
  }
}
