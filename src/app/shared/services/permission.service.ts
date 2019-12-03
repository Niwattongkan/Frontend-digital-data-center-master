import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './config-services/api.service';
import { UsersService } from '../../shared/services/users.service';
@Injectable()

export class PermissionsService {

  constructor(
    private apiService: ApiService,
    private usersService:UsersService
  ) {
  }

  setFormData(data) {
    var CreateBy = 1;
    var formData = new FormData();
    formData.append("CreateBy", `${CreateBy}`);
    formData.append("UpdateBy", `${CreateBy}`);
    formData.append("Channel", "xxx");
    formData.append("IsActive", `${1}`);
    formData.append("Verify", `${1}`);

    let key = Object.keys(data);
    for (let index = 0; index < key.length; index++) {
      formData.append(key[index], (data[key[index]]) + "");
    }

    return formData
  }

  getallpermission(): Observable<any> {
    return this.apiService.get(`getallpermission`);
  }

  getpermissionmanage(id): Observable<any>{
    return this.apiService.get(`getpermissionmanage?PermissionId=` + id);
  }
  getgrouppermissionperson(id): Observable<any> {
    return this.apiService.get(`getgrouppermissionperson?PermissionId=` + id);
  }

  getgroupname(): Observable<any> {
    return this.apiService.get(`getgroupname`);
  }

  insertpermission(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertpermission`, formData);
  }

  insertgrouppermission(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertgrouppermission`, formData);
  }

  insertpermissionmanage(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertpermissionmanage`, formData);
  }

  updatepermission(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updatepermission`, formData);
  }

  updategrouppermission(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updategrouppermission`, formData);
  }
  updatepermissionmanage(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updatepermissionmanage`, formData);
  }
  deletepermission(id): Observable<any> {
    let formData = this.setFormData({
      PermissionId: id,
      IsActive: 0
    })
    return this.apiService.put(`deletepermission`, formData);
  }

  deletegrouppermissionperson(id): Observable<any> {
    return this.apiService.delete(`deletegrouppermissionperson?GroupPermissionId=${id}`);
  }

}

