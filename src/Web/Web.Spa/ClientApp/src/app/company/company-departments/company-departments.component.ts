import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../companyservice/company-service.service';
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
  constructor(private http: HttpClient, private comService: CompanyService) {
  }

  ngOnInit() {
    this.refreshStructure();
  }

  refreshStructure() {
    this.comService.getStruct().subscribe(
      (data: Structure[]) => {
          this.structures = data.reverse();
          this.comService.getDepartments().subscribe(
            (deps: Department[]) => {
              deps.forEach(d => {
                if (d.structureId === '' || isNullOrUndefined(d.structureId)) {
                   this.departments.push(d);
                }
              });
            },  error => console.log(error));
        },
        // tslint:disable: no-shadowed-variable
        error => console.log(error));
  }

  bossClick(id) {
    const name = document.getElementById('boss' + id);
    if (name.style.display === 'none') {
      name.style.display = 'block';
    } else {
      name.style.display = 'none';
    }
  }
}
