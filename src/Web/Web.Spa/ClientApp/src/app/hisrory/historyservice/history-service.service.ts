import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable()
export class HistoryService {
  constructor(private http: HttpClient ) {
      }

    getItems(url: string ) {
    return this.http.get(url, {responseType: 'json'}); }

}
