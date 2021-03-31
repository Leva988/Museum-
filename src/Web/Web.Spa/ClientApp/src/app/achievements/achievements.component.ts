import { Component, OnInit } from '@angular/core';
import { RewardService } from './rewards-service/rewards-service.service';
import { environment } from 'src/environments/environment';
import { Achievement } from '../models/achievement';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  providers: [RewardService] })

export class AchievementsComponent implements OnInit {
  rewardsUrl = environment.backendUrl  + '/Achievements';
  rewards: Achievement[] = [];
  diploma: Achievement = new Achievement();
  active: number;
  photos: KeyValue<string, string>[] = [];
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
    this.rewardservice.getRewards(this.rewardsUrl).subscribe(
      (data: Achievement[]) => {
        this.rewards = data;
      }, error => console.log(error));
  }

  getModalDescription(id: string, itemIds: string[]) {
    for (const photo of itemIds) {
      this.http.get(this.rewardsUrl + '/' + id + '/itemDescription/' + photo, {responseType: 'text'}).subscribe(
        (data: string) => {
          this.photos.push({key: photo, value: data });
        },
        error => console.log(error));
    }
  }

}
