import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private userPermission = JSON.parse('{}');
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    const u_permissionStr = this.cookieService.get('u_permission')
    try {
      this.userPermission = JSON.parse(u_permissionStr).data;
    } catch (error) {
      console.log('error while get userPermission:', error);
      console.log(u_permissionStr);
    }

  }
  showMenu(menuNameEng) {
    // { "successful": true, "data": [ { "PView": 1, "MenuName": "ข้อมูลบุคคล", "MenuNameEng": "persons", } ] }
    for (var i = 0; i < this.userPermission.length; i++) {
      if (menuNameEng == this.userPermission[i].MenuNameEn && this.userPermission[i].PView == 1) {
        return true;
      }
    }
    return false;
  }

}
