//import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { OnInit } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  private userPermission = JSON.parse('{}');

  constructor(
    private cookieService: CookieService,
    private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    debugger
    this.userPermission = JSON.parse(this.cookieService.get('u_permission')).data;
    var menuNameEng = state.url.split("/")[1]
    for (var i = 0; i < this.userPermission.length; i++) {
      if (menuNameEng == this.userPermission[i].MenuNameEng && this.userPermission[i].PView == 1) {
        return true;
      }
    }
    return false;

    //if (this._authService.isAuthenticated()) {
        //return true;
    //}

    // navigate to login page
    //this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    //return false;
  }

}