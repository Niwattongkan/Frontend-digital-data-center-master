import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-login',
  //templateUrl: './login.component.html',
  template: '',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public alertUser = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if (this.cookieService.get('code') != '') {
      //console.log('current tokent:' + this.cookieService.get('code'));
      // redirect to sso authen page home
      document.location.href = "/#/home";
    } else {
      this.callback();
    }
  }

  private callback() {
    var url = new URL(document.location.href);
    var code = url.searchParams.get("code");
    var error = url.searchParams.get("error");

    if (typeof code !== 'undefined' && code != null) { // Logon
      this.cookieService.set('code', code);
      this.setPermission();
      document.location.href = "/#/home";
    } else if (typeof error !== 'undefined' && error != null) { // Error access_denined, logout
      alert(error);
      this.cookieService.delete('code');
      localStorage.removeItem('u_permission');
      document.location.href = environment.logoutUrl
    } else { // Reqest login
      document.location.href = environment.ssoAuthUrl
        .replace("$redirect_uri", environment.redirect_uri)
        .replace("$client_id", environment.client_id);
    }
  }

  public openModal(content) {
    return this.modalService.open(content);
  }

  private async setPermission() {
    const mockPermission = '{ "successful": true, "data": [ ' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 1, "MenuName": "หน้าแรก", "MenuNameEn": "home" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 2, "MenuName": "ข้อมูลบุคคล", "MenuNameEn": "persons" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 3, "MenuName": "ข้อมูลองค์กร", "MenuNameEn": "organizations" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 4, "MenuName": "ข้อมูลโครงการ", "MenuNameEn": "program" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 5, "MenuName": "รายงานการสืบค้นข้อมูลบุคคล", "MenuNameEn": "searching-personal" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 6, "MenuName": "รายงานการสืบค้นข้อมูลองค์กร", "MenuNameEn": "searching-corperation" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 7, "MenuName": "รายงานการสืบค้นข้อมูลคณะกรรมการ", "MenuNameEn": "searching-board" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 8, "MenuName": "รายงานการใช้งานระบบ", "MenuNameEn": "using" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 9, "MenuName": "รายงานบันทึกจากฝ่ายเลขา", "MenuNameEn": "note" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 10, "MenuName": "สมุดบันทึก", "MenuNameEn": "notebook" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 11, "MenuName": "กลุ่มการจัดส่งเอกสาร", "MenuNameEn": "group" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 12, "MenuName": "กลุ่มผู้ใช้งาน", "MenuNameEn": "users" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 13, "MenuName": "กลุ่มจำกัดสิทธิ์", "MenuNameEn": "permission" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 14, "MenuName": "Audit Log", "MenuNameEn": "auditlog" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 15, "MenuName": "จัดการสิทธิ์การใช้งาน", "MenuNameEn": "license" }' +
      ' ] }';
    localStorage.setItem('u_permission', mockPermission);

    // https://tc.thaihealth.or.th:4122/uapi/ddc/getpermissionbyid?code=fRGa9vOjW1G0WvCxOt-s5dp7GraOj1wGwSwwOv9SfgM%3D
    //this.usersService.getPermissionById();
  }
}
