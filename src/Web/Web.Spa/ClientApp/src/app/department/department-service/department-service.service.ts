import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class DepartmentService {

  empUrl = environment.backendUrl + '/Employees';
  depUrl = environment.backendUrl + '/Departments/';

  constructor(private http: HttpClient ) {
      }

  getDepartment(id: string) {
      return this.http.get(this.depUrl + id , {responseType: 'json'});
    }

  getEmployees(id: string) {
      return this.http.get(this.empUrl + '/Department/' + id  , {responseType: 'json'});
    }
}
