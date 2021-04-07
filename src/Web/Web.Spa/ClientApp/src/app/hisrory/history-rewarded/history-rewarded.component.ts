import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HistoryService } from '../historyservice/history-service.service';
import { environment } from 'src/environments/environment';
import { RewardedEmployee } from 'src/app/models/rewardedemployee';
import { isNullOrUndefined } from 'util';
import { Reward } from 'src/app/models/reward';

@Component({
  selector: 'app-history-veterans',
  templateUrl: './history-rewarded.component.html',
  styleUrls: ['./history-rewarded.component.scss'],
  providers: [HistoryService]
})
export class HistoryRewardedComponent implements OnInit {
  title = 'Награжденные ведомственными и государственными наградами';
  rewards: Reward[] = [];
  rewardsUrl = environment.backendUrl + '/Rewards';
  employeeUrl = environment.backendUrl + '/RewardedEmployees';
  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.refreshRewards();
  }

  refreshRewards() {
      this.historyService.getItems(this.rewardsUrl).subscribe(
        (data: Reward[]) => {
          // tslint:disable: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            const d = data[i];
            this.rewards.push(d);
            if (!isNullOrUndefined(d.rewardedEmployees)) {
              for (let j = 0; j < d.rewardedEmployees.length; j++) {
                const e = d.rewardedEmployees[j];
                const datebirth = new Date(Date.parse(e.dateBirth));
                const dateStart = new Date(Date.parse(e.dateStart));
                const dateReward = new Date(Date.parse(e.dateReward));
                let dateEnd;
                if (isNullOrUndefined(e.dateEnd)) {
                  e.dateEnd = 'н.в.';
                } else {
                  dateEnd = new Date(Date.parse(e.dateEnd));
                  const localdateEnd = dateEnd.getFullYear().toString();
                  e.dateEnd = localdateEnd;
                }
                const localbirthtdate = datebirth.toLocaleDateString();
                const localdatestart = dateStart.getFullYear().toString();
                const localdateReward = dateReward.getFullYear().toString();
                e.dateBirth = localbirthtdate;
                e.dateStart = localdatestart;
                e.dateReward = localdateReward;
              }
            }
          }
        },
        error => console.log(error));
   }

}
