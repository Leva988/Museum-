import { Component, OnInit } from '@angular/core';
import { RewardService } from './rewards-service/rewards-service.service';
import { environment } from 'src/environments/environment';
import { Achievement } from '../models/achievement';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  providers: [RewardService] })

export class AchievementsComponent implements OnInit {
  rewardsUrl = environment.backendUrl  + '/Achievements';
  diplomas: Achievement[] = [];
  certificates: Achievement[] = [];

  constructor(private rewardservice: RewardService) {
    this.refreshRewards();
  }

  ngOnInit() { }
  refreshRewards() {
    this.rewardservice.getRewards(this.rewardsUrl).subscribe(
      (data: Achievement[]) => {
        // tslint:disable prefer-for-of
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          if ( d.type === 'diploma') {
            this.diplomas.push(d);
            }
          if ( d.type === 'certificate') {
              this.certificates.push(d);
              }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
