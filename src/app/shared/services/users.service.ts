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
    debugger
    this.apiService.get(`getpermissionbyid`).subscribe((rs: any) => {
      console.log(rs.data);
      localStorage.setItem('u_permission', rs.Result)
    });
  }

  public getLocalUserPermission(): any {
    try {
      return JSON.parse(localStorage.getItem('u_permission')).data as any;
    } catch (error) {
      console.log('error while get userPermission:', error);
      return [];
    }
  }

}