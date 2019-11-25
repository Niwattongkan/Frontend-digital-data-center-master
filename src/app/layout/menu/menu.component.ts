import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { url } from 'inspector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private userPermission = [];
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    try {
      this.userPermission = this.usersService.getLocalUserPermission();
    } catch (error) {
      console.log('error while get userPermission:', error);
    }

  }
  showMenu(menuNameEng) {
    return this.usersService.showMenu(menuNameEng);
  }
  
  canView(url, checkNext = null){
    var ret = this.usersService.canView(url)
    if (ret){
      if (checkNext !== null)
        return checkNext;
    }
    return ret;
  }

  canViewReport(){
    return this.canView('/report/searching-personal') || this.canView('/report/searching-corperation')
    || this.canView('/report/searching-board') || this.canView('/report/using') || this.canView('/report/note')
  }

  canViewEvent(){
    return this.canView('/event/notebook') || this.canView('/event/group')
  }

  canViewSetting(){
    return this.canView('/setting/users') || this.canView('/setting/permission')
    || this.canView('/setting/auditlog') || this.canView('/setting/license')
  }

}
