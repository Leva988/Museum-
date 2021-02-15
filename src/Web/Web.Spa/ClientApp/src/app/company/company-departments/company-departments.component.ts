import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../companyservice/company-service.service';
import { environment } from 'src/environments/environment';
import { Structure } from 'src/app/models/structure';

@Component({
  selector: 'app-company-departments',
  templateUrl: './company-departments.component.html',
  styleUrls: ['./company-departments.component.scss'],
  providers: [CompanyService]
})
export class CompanyDepartmentsComponent implements OnInit {
  structures: Structure[] = [];
  laststruct: Structure[] = [];
  url = environment.backendUrl + '/Structure';
  constructor(private http: HttpClient, private comService: CompanyService) {
  }

  ngOnInit() {
    this.refreshStructure();
  }

  refreshStructure() {
    this.comService.getStruct(this.url).subscribe(
      (data: Structure[]) => {
         // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          if (d.bossPosition !== '') {
            this.structures.push(d);
          } else {
            this.laststruct.push(d);
          }
        }
      },
        // tslint:disable: no-shadowed-variable
        error => console.log(error));
  }
}
