//import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private userPermission = [];

  constructor(
    private usersService: UsersService,
    private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.userPermission = this.usersService.getLocalUserPermission();
    
    var subMenuNameEng = null;
    
    const menus = state.url.split("/");
    const mainMenuNameEng = menus[1];
    if(menus.length >2){
      subMenuNameEng = menus[2]
    }

    for (var i = 0; i < this.userPermission.length; i++) {
      var uMenu = this.userPermission[i].MenuNameEn;
      if ([mainMenuNameEng, subMenuNameEng].includes(uMenu) && this.userPermission[i].PView == 1 && this.usersService.canView(state.url)) {
        return true;
      }
    }
    return false;
  }

}