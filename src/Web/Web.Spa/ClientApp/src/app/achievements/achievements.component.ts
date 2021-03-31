import { Component, OnInit } from '@angular/core';
import { RewardService } from './rewards-service/rewards-service.service';
import { environment } from 'src/environments/environment';
import { Achievement } from '../models/achievement';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  providers: [RewardService] })

export class AchievementsComponent implements OnInit {
  rewardsUrl = environment.backendUrl  + '/Achievements';
  rewards: Observable<Achievement[]>;
  diploma: Achievement = new Achievement();
  active: number;
  photos: KeyValue<string, Observable<string>>[] = [];
  descriptions: string[] = [];

  constructor(private rewardservice: RewardService, private http: HttpClient) {
    this.diploma.items = [];
    this.refreshRewards();
  }

  ngOnInit() {
    $(document).on('hide.bs.modal', '#ModalImage', () => {
      this.photos = [];
    });
   }
  refreshRewards() {
    this.rewards = this.rewardservice.getRewards(this.rewardsUrl);
  }

  getModalDescription(id: string, itemIds: string[]) {
    for (const photo of itemIds) {
       this.photos.push({
             key: photo,
             value: this.http.get(this.rewardsUrl + '/' + id + '/itemDescription/' + photo, {responseType: 'text'}) 
        });
    }
  }

}
