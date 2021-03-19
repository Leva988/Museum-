import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HistoryService {

  bossesUrl = environment.backendUrl + '/Bosses';
  constructor(private http: HttpClient ) {
      }

    getItems(url: string ) {
    return this.http.get(url, {responseType: 'json'}); }

    getBosses() {
      return this.http.get(this.bossesUrl, {responseType: 'json'}); 
    }

}
