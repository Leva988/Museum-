import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CorporateService {

  url = environment.backendUrl + '/CorporateYears';
  constructor(private http: HttpClient ) {
      }

    getYears() {
      return this.http.get(this.url , {responseType: 'json'});
     }

    getFile(url: string) {
      return this.http.get(url , { responseType: 'blob'});
     }
}
