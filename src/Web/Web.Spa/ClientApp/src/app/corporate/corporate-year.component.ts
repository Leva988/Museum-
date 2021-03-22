import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CorporateService } from './corporate-service/corporate-service.service';
import { CorporateMonth } from '../models/corporatemonth';
import { CorporateYear } from '../models/corporateyear';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

declare var $: any;
@Component({
  selector: 'app-corp-year',
  templateUrl: './corporate-year.component.html',
  styleUrls: ['./corporate-year.component.scss'],
  providers: [CorporateService]
})
export class CorporateYearComponent implements OnInit  {
  title = 'КАЛЕНДАРЬ СОБЫТИЙ';
  years: CorporateYear[] = [];
  months: CorporateMonth[] = [];
  year: CorporateYear = new CorporateYear();
  constructor(private corpService: CorporateService, private route: ActivatedRoute)  {
  }

  ngOnInit() {
    this.refreshYears();
  }

  refreshYears() {
    this.corpService.getYears().subscribe(
      (data: CorporateYear[]) => {
          this.years = data;
          if (this.route.snapshot.params.year === 'last') {
            this.fetchMonths(this.years[this.years.length - 1]);
          } else {
            const year = this.years.find(x => x.year === this.route.snapshot.params.year);
            this.fetchMonths(year);
          }
       },
       error => console.log(error));
      }

    fetchMonths(y: CorporateYear) {
      this.months = y.months;
    }

}
