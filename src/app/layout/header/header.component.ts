import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService:UsersService) { }

  ngOnInit() {
  }

  logout(){
    // debugger
    this.cookieService.delete('code');
    localStorage.removeItem('u_permission');
    localStorage.removeItem('userinfo');
    localStorage.removeItem('roles');
    document.location.href = environment.logoutUrl
  }

  getName(){
    var userInfo = this.userService.getUserInfo();
    if (!userInfo) return '';
    return userInfo.firstname + ' ' + userInfo.lastname;
  }
}
