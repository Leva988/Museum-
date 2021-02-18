import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../companyservice/company-service.service';
import { environment } from 'src/environments/environment';
import { Structure } from 'src/app/models/structure';
import { Department } from 'src/app/models/department';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-company-departments',
  templateUrl: './company-departments.component.html',
  styleUrls: ['./company-departments.component.scss'],
  providers: [CompanyService]
})
export class CompanyDepartmentsComponent implements OnInit {
  structures: Structure[] = [];
  departments: Department[] = [];
  url = environment.backendUrl + '/Structure';
  depUrl = environment.backendUrl + '/Departments';
  constructor(private http: HttpClient, private comService: CompanyService) {
  }

  ngOnInit() {
    this.refreshStructure();
  }

  refreshStructure() {
    this.comService.getStruct(this.url).subscribe(
      (data: Structure[]) => {
         // tslint:disable-next-line: prefer-for-of
          this.structures = data.reverse();
          this.comService.getPeople(this.depUrl).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (data: Department[]) => {
              data.forEach(d => {
                if (d.structureId === '' || isNullOrUndefined(d.structureId)) {
                   this.departments.push(d);
                }
              });
            },  error => console.log(error));
        },
        // tslint:disable: no-shadowed-variable
        error => console.log(error));
  }
}
