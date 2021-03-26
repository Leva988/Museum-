import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompanyService {
    structUrl = environment.backendUrl + '/Structure';
    depUrl = environment.backendUrl + '/Departments';
    empUrl = environment.backendUrl + '/Employees';
    constructor(private http: HttpClient ) {
      }

    getDepartments() {
      return this.http.get(this.depUrl , {responseType: 'json'});
    }

    getStruct() {
      return this.http.get(this.structUrl , {responseType: 'json'});
    }

    getPeople() {
      return this.http.get(this.empUrl , {responseType: 'json'});
    }
}
