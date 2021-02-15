import { Component, OnInit, ViewChild } from '@angular/core';
import {Department} from '../models/department';
import { Project } from '../models/project';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from './department-service/department-service.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Employee } from '../models/employee';
import { GraficComponent } from './grafic/grafic.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {
  @ViewChild(GraficComponent, {static: true}) indicators: GraficComponent;
  empUrl = environment.backendUrl + '/Employees';
  projectUrl = environment.backendUrl + '/Projects';
  depUrl = environment.backendUrl + '/Departments/';
  headerUrl: any;
  department: Department = new Department();
  title: string;
  description: string;
  employees: Employee[] = [];
  boss: Employee = new Employee();
  number: number;
  projects: Project[] = [];
  id;
  projectTab: string;
  constructor( private route: ActivatedRoute, private depService: DepartmentService, private sanitizer: DomSanitizer) {    }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.getDepartment();
      this.getEmployees();
      this.getProjects();
    }

    getDepartment() {
      this.depService.getInfo(this.depUrl + this.id ).subscribe (
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
      this.depService.getInfo(this.empUrl + '/Department/' + this.id ).subscribe (
        (data: any[] ) => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === 'boss') {
              this.boss = data[i];
            } else {
              this.employees.push(data[i]);
            }
            this.number = this.employees.length + 1;
          }
        },
         // tslint:disable: no-shadowed-variable
         error => console.log(error));
    }

    getProjects() {
     this.depService.getInfo(this.projectUrl + '/Department/' + this.id ).subscribe (
       (data: any[]) => {
         // tslint:disable-next-line: prefer-for-of
         this.projects = data;
         if (this.projects.length === 0) {
           document.getElementById('projects').remove();
           this.projectTab = null;
         } else {
           document.getElementById('projects').style.display = 'block';
           this.projectTab = 'Проекты';
         }
       },
        // tslint:disable: no-shadowed-variable
        error => {
          console.log(error);
        });
     }
}
