import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HistoryService {
  constructor(private http: HttpClient ) {
      }

    getItems(url: string ) {
    return this.http.get(url, {responseType: 'json'}); }

}
