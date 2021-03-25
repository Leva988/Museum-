import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class Repos {

  servicesUrl = environment.backendUrl + '/Services';
  prodUrl = environment.backendUrl + '/Production';
  constructor(private http: HttpClient ) {
     }

  getServices() {
      return this.http.get(this.servicesUrl, {responseType: 'json'});
    }

  getProduction() {
      return this.http.get(this.prodUrl, {responseType: 'json'});
    }
}
