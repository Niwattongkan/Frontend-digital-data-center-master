import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthlogService } from "../../shared/services/authlog.service";
import SimpleCrypto from "simple-crypto-js/build/SimpleCrypto";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from 'src/app/shared/services/users.service';
import { ApiService } from 'src/app/shared/services/config-services/api.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public username
  private personId: string | object;

  constructor(private cookieService: CookieService,
    private apiService: ApiService,
    private authlogService: AuthlogService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private http: HttpClient) {
    this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => { this.ipAddress = data })
  }
  ipAddress: any;
  ngOnInit() {
    let Crypto = new SimpleCrypto('some-unique-key');
    let id = decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id'));
    this.personId = id != '' && id != null ? Crypto.decrypt(id) : ''
    this.username = this.authlogService.getuserinfo(this.personId)
  }

  logout() {
    // debugger
    var userInfo = this.userService.getUserInfo();
    this.updateLog(userInfo.email);
    
    this.cookieService.delete('code');
    localStorage.removeItem('u_permission');
    localStorage.removeItem('u_group');
    localStorage.removeItem('userinfo');
    localStorage.removeItem('roles');
    this.apiService.get('ssologout').subscribe(() => {
      document.location.href = environment.logoutUrl
    })

  }

  getName() {
    var userInfo = this.userService.getUserInfo();
    if (!userInfo) return '';
    return userInfo.firstname + ' ' + userInfo.lastname;
  }

  async updateLog(data){
    await this.auditLogService(data, '' , this.ipAddress)
 }

 async auditLogService(field, origin, ipAddress) {
  await this.authlogService.insertAuditlog({
    UpdateDate: new Date(),
    UpdateMenu: "logout",
    UpdateField: field,
    DataOriginal: origin,
    IpAddress: ipAddress.ip
  }).toPromise()
}
}
