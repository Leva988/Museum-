import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../historyservice/history-service.service';
import { environment } from 'src/environments/environment';
import { HistoryMilestone } from 'src/app/models/historymilestones';

@Component({
  selector: 'app-history-dates',
  templateUrl: './history-milestones.component.html',
  styleUrls: ['./history-milestones.component.scss'],
  providers: [HistoryService]
  })
export class HistoryMilestonesComponent implements OnInit {
  title = 'Вехи истории';
  dates: HistoryMilestone[] = [];
  photo = '';
  date: HistoryMilestone = new HistoryMilestone();
  url = environment.backendUrl + '/HistoryMilestones';

  constructor(private historyService: HistoryService) {
      this.getDates();
    }

  ngOnInit() {

  }

  getDates() {
    this.historyService.getItems(this.url).subscribe(
      (data: HistoryMilestone[]) => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          const dateStart = new Date(Date.parse(d.dateStart));
          const dateEnd = new Date(Date.parse(d.dateEnd));
          const yearStart = dateStart.getFullYear().toString();
          const yearEnd = dateEnd.getFullYear().toString();
          d.dateStart = yearStart;
          d.dateEnd = yearEnd;
          this.dates.push(d);
        }

      },
        error => console.log(error));
  }
}
