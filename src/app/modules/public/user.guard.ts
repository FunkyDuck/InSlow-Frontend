import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const JWT = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const DECODED = helper.decodeToken(JWT as any);
    const CURTIME = new Date().getTime();

    if (helper.isTokenExpired(JWT as any) == false) {
      console.info(DECODED);
      console.log(new Date(DECODED.exp * 1000).toLocaleDateString("fr-BE"))

      return true;
    } else {
      console.log("GO OUT");
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
