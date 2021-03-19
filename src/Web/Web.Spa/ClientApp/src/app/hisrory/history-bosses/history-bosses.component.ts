import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../historyservice/history-service.service';
import { Boss } from 'src/app/models/boss';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-history-bosses',
  templateUrl: './history-bosses.component.html',
  styleUrls: ['./history-bosses.component.scss'],
  providers: [HistoryService]
})
export class BossComponent implements OnInit {
  title = 'Наши руководители';
  bosses: Boss[] = [];
  url = environment.backendUrl + '/Bosses';
  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.getBosses();
  }

  getBosses() {
      this.historyService.getBosses().subscribe(
        (data: Boss[]) => {
          // tslint:disable: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            const d = data[i];
            const localdatestart = new Date(Date.parse(d.dateStart)).getFullYear().toString();
            d.dateStart = localdatestart;
            const localdateEnd = new Date(Date.parse(d.dateEnd)).getFullYear().toString();
            d.dateEnd = localdateEnd;
            this.bosses.push(d);
          }
        },
        error => console.log(error));
   }

}
