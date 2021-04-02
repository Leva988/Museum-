import { Component, OnInit } from '@angular/core';
import {Department} from '../models/department';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from './department-service/department-service.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Employee } from '../models/employee';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {
  depUrl = environment.backendUrl + '/Departments/';
  empUrl = environment.backendUrl + '/Employees';
  headerUrl: string;
  department: Department = new Department();
  title: string;
  description: string;
  employees: Employee[] = [];
  boss: Employee = new Employee();
  id;
  projectTab: string;
  constructor( private route: ActivatedRoute, private depService: DepartmentService, private sanitizer: DomSanitizer) {    }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.getDepartment();
      this.getEmployees();
    }

    getDepartment() {
      this.depService.getDepartment(this.id).subscribe (
        (data: any) => {
          this.department = data;
          if (this.department === null) {
            window.location.href = '/notfound';
          }
          this.headerUrl = 'url(' + this.depUrl + this.id + '/Photo' + ')';
          this.sanitizer.bypassSecurityTrustResourceUrl(this.headerUrl);
        },
        error => console.log(error));
    }

    getEmployees() {
      this.depService.getEmployees(this.id).subscribe (
        (data: any[] ) => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === 'boss') {
              this.boss = data[i];
            } else {
              this.employees.push(data[i]);
            }
          }
        },
         // tslint:disable: no-shadowed-variable
         error => console.log(error));
    }
}
