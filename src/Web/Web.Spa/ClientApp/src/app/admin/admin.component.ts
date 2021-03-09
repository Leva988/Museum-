import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ComponentCanDeactivate } from './auth/exit.admin.guard';
import { AuthToken } from './auth/auth.token';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Component({
templateUrl: 'admin.component.html',
styleUrls: ['admin.component.scss'],
providers: [AuthComponent]
})

export class AdminComponent implements ComponentCanDeactivate  {
   baseUrl: string;
   authHeaders: HttpHeaders;
   constructor(private router: Router, private token: AuthToken, private http: HttpClient) {
      this.baseUrl = environment.backendUrl;
      this.authHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token.auth_token}`);
    }

   logout() {
     this.token.authentificated = false;
     this.router.navigateByUrl('/');
    }

  canDeactivate(): boolean | Observable<boolean> {
     return confirm('Вы хотите покинуть страницу? Данные авторизации будут утеряны!');
  }

  getDepartments() {
    return this.http.get(this.baseUrl + '/departments');
  }

  // Employee Panel
  getEmployees() {
    return this.http.get(this.baseUrl + '/employees');
  }

  getEmployee(id: string) {
      return  this.http.get(this.baseUrl + '/Employees' + '/' + id, {responseType: 'json'});
  }

  addEmployee(emp: Employee) {
      return this.http.post(this.baseUrl + '/Employees/Employee', emp,
      {
        headers: this.authHeaders
      });
    }

  updateEmployee(id: string, emp: Employee) {
      return this.http.put(this.baseUrl + '/Employees' + '/' + id, emp,
      {
        headers: this.authHeaders
      });
    }

  deleteEmployee(id: string) {
      return this.http.delete(this.baseUrl + '/Employees' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  getEmployeePhoto(id: string) {
      return  this.http.get(this.baseUrl + '/Employees' + '/' + id + '/Photo', {responseType: 'blob'});
  }

  addEmployeePhoto(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Employees/' + id + '/Photo', formData,
      {
        headers: this.authHeaders
      });
   }

  deleteEmployeePhoto(id: string) {
      return this.http.delete(this.baseUrl + '/Employees/' + id + '/Photo',
      {
        headers: this.authHeaders
      });
    }

}
