import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HistoryService } from '../historyservice/history-service.service';
import { HistoryRef } from 'src/app/models/historyref';


@Component({
  selector: 'app-history-ref',
  templateUrl: './history-ref.component.html',
  styleUrls: ['./history-ref.component.scss'],
  providers: [HistoryService]
})

export class HistoryRefComponent implements OnInit {
  title = 'История/Историческая справка';
  @Input()communication: string;
  refUrl = environment.backendUrl + '/historyref';
  ref: HistoryRef = new HistoryRef();
  refs: HistoryRef[] = [];
  photo = '';

  constructor(private historyService: HistoryService) {
  }

  refreshRefs() {
    this.historyService.getItems(this.refUrl).subscribe(
      (data: HistoryRef[]) => {
        this.refs = data;
        this.refs[0].id = 'communication';
        this.refs[1].id = 'info';
        this.refs[2].id = 'sis';
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => console.log(error)
    );
  }

  ngOnInit() {
    // tslint:disable:only-arrow-functions
    this.refreshRefs();
  }

}
