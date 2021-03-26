import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../companyservice/company-service.service';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-company-bosses',
  templateUrl: './company-bosses.component.html',
  styleUrls: ['./company-bosses.component.scss'],
  providers: [CompanyService]

})

export class CompanyBossesComponent implements OnInit {

  bosses: Employee[] = [];
  url = environment.backendUrl + '/employees';
  constructor(private comService: CompanyService) {
    this.getBosses();
  }

  ngOnInit() {}

  getBosses() {
    this.comService.getPeople().subscribe(
      (data: Employee[]) => {
         // tslint:disable-next-line: prefer-for-of
         for (let i = 0; i < data.length; i++) {
           const d = data[i];
           if (d.type === 'boss' && d.departmentId === '') {
             if (d.position === 'Начальник управления') {
               this.bosses.unshift(d);
             } else {
             this.bosses.push(d);
             }
           }
         }
      },
        // tslint:disable: no-shadowed-variable
        error => console.log(error));
    }
}
