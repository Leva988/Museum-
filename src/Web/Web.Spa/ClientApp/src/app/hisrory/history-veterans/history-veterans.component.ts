import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HistoryService } from '../historyservice/history-service.service';
import { environment } from 'src/environments/environment';
import { Veteran } from 'src/app/models/veteran';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-history-veterans',
  templateUrl: './history-veterans.component.html',
  styleUrls: ['./history-veterans.component.scss'],
  providers: [HistoryService]
})
export class HistoryVeteransComponent implements OnInit {
  title = 'Награжденные ведомственными и государственными наградами';
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
            const recruitDate = new Date(Date.parse(d.recruitDate));
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            let dateEnd;
            if (isNullOrUndefined(d.dateEnd)) {
              d.dateEnd = 'н.в.';
            } else {
              dateEnd = new Date(Date.parse(d.dateEnd));
              const localdateEnd = dateEnd.getFullYear().toString();
              d.dateEnd = localdateEnd;
            }
            const localbirthtdate = birthDate.toLocaleDateString(undefined, options);
            const localrecruitdate = recruitDate.getFullYear().toString();
            d.birthDay = localbirthtdate;
            d.recruitDate = localrecruitdate;
            this.veterans.push(d);
            }
          },
        error => console.log(error));
   }

}
