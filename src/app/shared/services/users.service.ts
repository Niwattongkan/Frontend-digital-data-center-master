import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class UsersService {

  private userPermission = [];

  constructor(
    private apiService: ApiService
  ) { }

  getGroupUsersAll(): Observable<any> {
    return this.apiService.get(`getallgroupuser`);
  }

  public getPermissionById(): any {
    return this.apiService.getJSON('getpermissionbyid');
  }

  public getLocalUserPermission(): any {
    try {
      const u_permissionStr = localStorage.getItem('u_permission')
      // console.log('u_permissionStr= ' + u_permissionStr);
      this.userPermission = JSON.parse(u_permissionStr).data
      return this.userPermission;
    } catch (error) {
      console.log('error while get userPermission:', error);
      return [];
    }
  }

  private getLocalUserPagePerminssion(page, action){
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

  //  Person Page
  public canAddPerson() {
    return this.getLocalUserPagePerminssion('persons', 'Add');
  }

  public canEditPerson() {
    return this.getLocalUserPagePerminssion('persons', 'Edit');
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
}