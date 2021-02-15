import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DepartmentService {

  constructor(private http: HttpClient ) {
      }

  getInfo(url: string) {
      return this.http.get(url , {responseType: 'json'});
    }
}
