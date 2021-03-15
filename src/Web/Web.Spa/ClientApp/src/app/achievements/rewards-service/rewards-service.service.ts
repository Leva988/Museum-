import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Achievement } from 'src/app/models/achievement';

@Injectable()
export class RewardService {
  constructor(private http: HttpClient ) {
      }

  getRewards(url: string ) {
    const heads = new HttpHeaders();
    return this.http.get<Achievement[]>(url , {headers: heads, responseType: 'json'});
   }
}
