import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SocialService {
  constructor(private http: HttpClient ) {
      }

    getCategories(url: string ) {
      return this.http.get(url , {responseType: 'json'});
     }

    getFile(url: string) {
      return this.http.get(url , { responseType: 'blob'});
     }
}
