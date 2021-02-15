import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeedService {
  constructor(private http: HttpClient ) {
      }
    getFeeds(url: string ) {
      return this.http.get(url + '/feed', { responseType: 'text'});
     }

    getBelnFeeds(url: string) {
      return this.http.get(url, { responseType: 'text'});
    }

}
