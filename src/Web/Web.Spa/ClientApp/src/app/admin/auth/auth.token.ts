import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthToken {
    // tslint:disable: variable-name
    auth_Url: string;
    public auth_token: string;
    authentificated = false;

    constructor(private http: HttpClient) {
      this.auth_Url = environment.authTokenUrl;
    }

  authenticate(name: string, pass: string) {
      const body = new HttpParams()
        .set('grant_type', 'password')
        .set('client_id', 'museum.bgpz.web')
        .set('client_secret', 'secret')
        .set('scope', 'museum.bgpz')
        .set('username', name.toString())
        .set('password', pass.toString());
      const head = new HttpHeaders();
      head.set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.auth_Url + '/identity/connect/token', body.toString(),
        {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }).pipe(map((data: any) => {
            if (data) {
             this.auth_token = data.access_token;
             this.authentificated = true;
            }
        }));
    }

}
