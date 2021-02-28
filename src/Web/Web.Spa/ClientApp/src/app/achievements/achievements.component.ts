import { Component, OnInit } from '@angular/core';
import { RewardService } from './rewards-service/rewards-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  providers: [RewardService] })

export class AchievementsComponent implements OnInit {
  rewardsUrl = environment.backendUrl  + '/achievements';


  constructor(private rewardservice: RewardService) {
  }

  ngOnInit() { }
}
