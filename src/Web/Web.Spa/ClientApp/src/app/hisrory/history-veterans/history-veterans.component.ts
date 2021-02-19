import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HistoryService } from '../historyservice/history-service.service';
import { environment } from 'src/environments/environment';
import { Veteran } from 'src/app/models/veteran';

@Component({
  selector: 'app-history-veterans',
  templateUrl: './history-veterans.component.html',
  styleUrls: ['./history-veterans.component.scss'],
  providers: [HistoryService]
})
export class HistoryVeteransComponent implements OnInit {
  title = 'История/Ветераны';
  veterans: Veteran[] = [];
  veteransUrl = environment.backendUrl + '/Veterans';
  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.refreshVeterans();
  }

   refreshVeterans() {
      this.historyService.getItems(this.veteransUrl).subscribe(
        (data: Veteran[]) => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            const d = data[i];
            // BirthDay
            const birthDate = new Date(Date.parse(d.birthDay));
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            const localbirthtdate = birthDate.toLocaleDateString(undefined, options);
            d.birthDay = localbirthtdate;
            this.veterans.push(d);
            console.log(this.veterans);
            }
          },
        error => console.log(error));
   }

}
