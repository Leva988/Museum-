import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthToken } from './auth.token';

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private auth: AuthToken) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthentificated()) {
      this.router.navigateByUrl('/admin/auth');
      return false;
    } else {
      return true;
      }
  }
}
