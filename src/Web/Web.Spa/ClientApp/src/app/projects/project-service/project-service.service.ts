import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient ) {
      }

    getProjects(url: string ) {
      return this.http.get(url , { responseType: 'json'});
    }
}
