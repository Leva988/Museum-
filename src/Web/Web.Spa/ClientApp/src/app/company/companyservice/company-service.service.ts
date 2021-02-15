import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class CompanyService {
    constructor(private http: HttpClient ) {
      }

    getPeople(url: string) {
      return this.http.get(url , {responseType: 'json'});
    }

    getStruct(url: string) {
      return this.http.get(url , {responseType: 'json'});
    }
}
