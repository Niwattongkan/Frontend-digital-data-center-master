import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class UsersService {

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
      return JSON.parse(u_permissionStr).data;
    } catch (error) {
      console.log('error while get userPermission:', error);
      return [];
    }
  }
}