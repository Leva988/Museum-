import { Component, OnInit } from '@angular/core';
import { RewardService } from './rewards-service/rewards-service.service';
import { environment } from 'src/environments/environment';
import { Achievement } from '../models/achievement';
import { HttpClient } from '@angular/common/http';
import { AchievementNew } from '../models/achievementNew';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  providers: [RewardService] })

export class AchievementsComponent implements OnInit {
  rewardsUrl = environment.backendUrl  + '/Achievements';
  rewards: Achievement[] = [];
  diplomas: AchievementNew[] = [];
  diploma: AchievementNew = new AchievementNew();
  active: string;

  constructor(private rewardservice: RewardService, private http: HttpClient) {
    this.diploma.items = [];
    this.refreshRewards();
    $('#ModalImage').on('hidden.bs.modal', () => {
      this.diploma = new AchievementNew();
    });
  }

  ngOnInit() { }
  refreshRewards() {
    this.rewardservice.getRewards(this.rewardsUrl).subscribe(
      (data: Achievement[]) => {
        this.rewards = data;
        this.rewards.forEach(rew => {
          const diploma: AchievementNew = new AchievementNew();
          diploma.id = rew.id;
          diploma.name = rew.name;
          diploma.items = [];
          rew.items.forEach(item => {
            const i = {key: item, value: this.getDescription(rew.id, item)};
            diploma.items.push(i);
          });
          this.diplomas.push(diploma);
       });
      }, error => console.log(error));
  }

  getDescription(id: string, itemid: string): Observable<string> {
    return this.http.get(this.rewardsUrl + '/' + id + '/itemDescription/' + itemid, {responseType: 'text'}).
      pipe(map(data => data.toString()));
  }

  modal(diploma, i) {
    this.diploma = diploma;
    this.active = i;
  }
}
