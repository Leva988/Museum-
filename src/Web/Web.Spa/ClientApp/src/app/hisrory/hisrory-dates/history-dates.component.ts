import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HistoryService } from '../historyservice/history-service.service';
import { environment } from 'src/environments/environment';
import { HistoryDates } from 'src/app/models/historydates';

@Component({
  selector: 'app-history-dates',
  templateUrl: './history-dates.component.html',
  styleUrls: ['./history-dates.component.scss'],
  providers: [HistoryService]
  })
export class HistoryDatesComponent implements OnInit {
  title = 'История/Важные даты';
  dates: HistoryDates[];
  url = environment.backendUrl + '/historydates';

  constructor(private historyService: HistoryService) {
      this.getDates();
    }

  ngOnInit() {

  }

  getDates() {
    this.historyService.getItems(this.url).subscribe(
      (data: HistoryDates[]) => {
        this.dates = data;
      },
        error => console.log(error));
  }
}
