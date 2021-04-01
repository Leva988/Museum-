import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { queueScheduler } from 'rxjs';

@Injectable()
export class AuthToken implements OnDestroy  {
    // tslint:disable: variable-name
    auth_Url: string;
    public auth_token: string;
    public expireTime: number;
    public name: string;
    public pass: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private cookie: CookieService, private router: Router) {
      this.auth_Url = environment.authTokenUrl;
    }

  authenticate(name: string, pass: string) {
      this.name = name;
      this.pass = pass;
      const body = new HttpParams()
        .set('grant_type', 'password')
        .set('client_id', 'museum.bgpz.web')
        .set('client_secret', 'secret')
        .set('scope', 'museum.bgpz')
        .set('username', name.toString())
        .set('password', pass.toString());
      const url = this.auth_Url;
      return this.http.post(url + '/identity/connect/token', body.toString(),
        {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }).pipe(map((data: any) => {
            if (data) {
             console.log(body);
             this.auth_token = data.access_token;
             this.cookie.put('token', this.auth_token);
             this.expireTime =  this.jwtHelper.getTokenExpirationDate(this.cookie.get('token')).getTime() - Date.now();
             setTimeout(() => {
              this.cookie.remove('token');
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                      alert('Время сессии истекло');
                      this.router.navigate([currentUrl]);
                  });
                }, this.expireTime);
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
