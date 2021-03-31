import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthToken implements OnDestroy  {
    // tslint:disable: variable-name
    auth_Url: string;
    public auth_token: string;

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private cookie: CookieService) {
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
             this.cookie.put('token', this.auth_token);
            }
        }));
    }

    public isAuthentificated(): boolean {
      if (!isNullOrUndefined(this.cookie.get('token'))) {
        return !this.jwtHelper.isTokenExpired(this.cookie.get('token'));
      } else {
      return false;
      }
    }

    ngOnDestroy() {
      this.cookie.remove('token');
    }

}
