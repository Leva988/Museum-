import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Service {
  constructor(private http: HttpClient ) {
     }

  getServices(url: string ) {
      return this.http.get(url, {responseType: 'json'});
    }
}
