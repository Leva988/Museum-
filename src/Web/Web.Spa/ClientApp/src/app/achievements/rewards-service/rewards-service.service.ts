import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RewardService {
  constructor(private http: HttpClient ) {
      }

  getRewards(url: string ) {
    const heads = new HttpHeaders();
    return this.http.get(url , {headers: heads, responseType: 'json'});
   }
}
