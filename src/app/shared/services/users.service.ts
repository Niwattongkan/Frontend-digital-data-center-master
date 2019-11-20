import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class UsersService {

  private userPermission = [];
  private userGroup = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  getSSOUserInfo() {
    //return this.apiService.get(`ssoGetUserInfo`, new HttpParams(), "http://qdoc.ecmxpert.com:8008/uapi/sso/");
    return this.apiService.get(`ssoGetUserInfo`);
  }

  getGroupUsersAll(): Observable<any> {
    return this.apiService.get(`getallgroupuser`);
  }

  public getPermissionByRoles(roleName): any {
    return this.apiService.get('getpermissionbyroles?roles=' + roleName);
  }

  public getGroupUser(): any {
    return this.apiService.get('getgroupuserbyid');
  }

  public getLocalUserPermission(): any {
    try {
      if (this.userGroup.length == 0) {
        const u_permissionStr = localStorage.getItem('u_permission')
        // console.log('u_permissionStr= ' + u_permissionStr);
        this.userPermission = JSON.parse(u_permissionStr).data
      }
    } catch (error) {
      console.log('error while get userPermission:', error);
      return [];
    }
    return this.userPermission;
  }

  private getLocalGroupUser(): any {
    try {
      if (this.userGroup.length == 0) {
        debugger
        const u_groupStr = localStorage.getItem('u_group')
        // console.log('u_groupStr= ' + u_groupStr);
        this.userGroup = JSON.parse(u_groupStr).data
      }
    } catch (error) {
      console.log('error while get userGroup:', error);
      debugger
      return [];
    }
    return this.userGroup;
  }

  private getLocalUserPagePerminssion(page, action) {
    for (var i = 0; i < this.userPermission.length; i++) {
      var uMenu = this.userPermission[i].MenuNameEn;
      if ([page].includes(uMenu)) {
        if (action == 'Add' && this.userPermission[i].PAdd == 1) {
          return true;
        }
        else if (action == 'Edit' && this.userPermission[i].PEdit == 1) {
          return true;
        }
        else if (action == 'Delete' && this.userPermission[i].PDelete == 1) {
          return true;
        }
        else if (action == 'Import' && this.userPermission[i].Import == 1) {
          return true;
        }
        else if (action == 'Export' && this.userPermission[i].Export == 1) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  private getLocalGroupUserAcess(page, value) {
    for (var i = 0; i < this.getLocalGroupUser().length; i++) {
      var group = this.userGroup[i];
      if(page == 'persons' && group.PersonIdBoard == value ) {//isInt(a)
        return true;
      } else if(page == 'users' && group.GroupUserId == value ) {//isInt(a)
        debugger
        return true;
      } else if(page == 'permission' && group.BoardId == value ) {//isInt(a)
        debugger
        return true;
      }
    }
    return false;
  }

  //  Person Page
  public canAddPerson() {
    return this.getLocalUserPagePerminssion('persons', 'Add');
  }

  public canEditPerson() {
    return this.getLocalUserPagePerminssion('persons', 'Edit');
  }

  public canAccessPersonWithCurrentGroup(personId) {
    return this.getLocalGroupUserAcess('persons', personId);
  }

  public canDeletePerson() {
    return this.getLocalUserPagePerminssion('persons', 'Delete');
  }

  //  Organization Page
  public canAddOrganization() {
    return this.getLocalUserPagePerminssion('organizations', 'Add');
  }

  public canEditOrganization() {
    return this.getLocalUserPagePerminssion('organizations', 'Edit');
  }

  public canDeleteOrganization() {
    return this.getLocalUserPagePerminssion('organizations', 'Delete');
  }

  //  report/searching-personal Page
  public canExportSearchingPersonalReport() {
    return this.getLocalUserPagePerminssion('searching-personal', 'Export');
  }

  //  report/searching-corperation Page
  public canExportSearchingCorperationReport() {
    return this.getLocalUserPagePerminssion('searching-corperation', 'Export');
  }

  //  report/searching-board Page
  public canExportSearchingBoardReport() {
    return this.getLocalUserPagePerminssion('searching-board', 'Export');
  }

  //  report/using Page
  public canExportUsingReport() {
    return this.getLocalUserPagePerminssion('using', 'Export');
  }

  //  report/note Page
  public canExportNoteReport() {
    return this.getLocalUserPagePerminssion('note', 'Export');
  }

  //  Event/NoteBook Page
  public canAddNoteBook() {
    return this.getLocalUserPagePerminssion('notebook', 'Add');
  }

  public canEditNoteBook() {
    return this.getLocalUserPagePerminssion('notebook', 'Edit');
  }

  public canDeleteNoteBook() {
    return this.getLocalUserPagePerminssion('notebook', 'Delete');
  }

  //  Event/Group Page
  public canAddGroup() {
    return this.getLocalUserPagePerminssion('group', 'Add');
  }

  public canEditGroup() {
    return this.getLocalUserPagePerminssion('group', 'Edit');
  }

  public canDeleteGroup() {
    return this.getLocalUserPagePerminssion('group', 'Delete');
  }

  public canExportGroup() {
    return this.getLocalUserPagePerminssion('group', 'Export');
  }

  //  setting/Users Page
  public canAddUser() {
    return this.getLocalUserPagePerminssion('users', 'Add');
  }

  public canEditUser() {
    return this.getLocalUserPagePerminssion('users', 'Edit');
  }

  public canAccessUserWithCurrentGroup(GroupUserId) {
    return this.getLocalGroupUserAcess('users', GroupUserId);
  }

  public canDeleteUser() {
    return this.getLocalUserPagePerminssion('users', 'Delete');
  }

  //  setting/permission Page
  public canAddPermission() {
    return this.getLocalUserPagePerminssion('permission', 'Add');
  }

  public canEditPermission() {
    return this.getLocalUserPagePerminssion('permission', 'Edit');
  }

  public canAccessPermissionWithCurrentGroup(GroupUserId) {
    return this.getLocalGroupUserAcess('permission', GroupUserId);
  }

  public canDeletePermission() {
    return this.getLocalUserPagePerminssion('permission', 'Delete');
  }

  //  setting/license Page
  public canAddLicense() {
    return this.getLocalUserPagePerminssion('license', 'Add');
  }

  public canEditLicense() {
    return this.getLocalUserPagePerminssion('license', 'Edit');
  }

  public canDeleteLicense() {
    return this.getLocalUserPagePerminssion('license', 'Delete');
  }

  public canDo(url: string, action: string) {
    if (!window['ACLS']) return true;
    let acls = window['ACLS'];
    let roles: any = localStorage.getItem('roles') || '';
    url = url || this.router.url
    roles = roles.split(',')

    for (let i = 0; i < roles.length; i++) {
      let roleName = roles[i];
      let aclUrls = acls[roleName];
      if (!aclUrls) continue;
      let acl = null;
      for (let j = 0; j < aclUrls.length; j++) {
        acl = aclUrls[j]
        if (acl.url == url) break;
        else acl = null;
      }
      if (acl) {
        let ret = acl[action] || false;
        if (ret) return ret;
      }
    }
    return false
  }

  public canEdit(url: string = null) {
    return this.canDo(url, 'edit');
  }

  public canView(url: string = null) {
    return this.canDo(url, 'view');
  }

  public getUserInfo() {
    var json = localStorage.getItem('userinfo');
    if (!json) return null;
    return JSON.parse(json)
  }
}