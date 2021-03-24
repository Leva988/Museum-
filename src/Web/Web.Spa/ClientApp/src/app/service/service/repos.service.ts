import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Repos {
  constructor(private http: HttpClient ) {
     }

  getServices(url: string ) {
      return this.http.get(url, {responseType: 'json'});
    }
}
