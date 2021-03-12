import { Component, Input, OnInit } from '@angular/core';
import { CorporateService } from '../corporate-service/corporate-service.service';
import { CorporateMonth } from '../../models/corporatemonth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-corp-month',
  templateUrl: './corporate-month.component.html',
  styleUrls: ['./corporate-month.component.scss'],
  providers: [CorporateService]
})
export class CorporateMonthComponent implements OnInit  {

  @Input() months: CorporateMonth[];
  month: CorporateMonth = new CorporateMonth();
  url = environment.backendUrl + '/CorporateMonths';
  constructor()  {
  }

  ngOnInit() {
  }
}
