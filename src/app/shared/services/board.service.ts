import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class BoardService {

  constructor(
    private apiService: ApiService
  ) { }

  setFormData(data) {
    var formData = new FormData();
    let key = Object.keys(data);
    for (let index = 0; index < key.length; index++) {
      formData.append(key[index], (data[key[index]]) + "");
    }
    formData.append("CreateBy", `${1}`);
    formData.append("UpdateBy", `${1}`);
    formData.append("Channel", "xxx");
    formData.append("Verify", `${1}`);
    formData.append("IsActive", `${1}`);
    return formData
  }

  getallrole(): Observable<any> {
    return this.apiService.get(`getallrole`);
  }

  insertrole(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertrole`, formData);
  }
  insertroleperson(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertroleperson`, formData);
  }

  getsearchrole(text): Observable<any> {
    return this.apiService.get(`getsearchrole?FristNameTh=${text}`);
  }

  getallgroupuser(): Observable<any> {
    return this.apiService.get(`getallgroupuser`);
  }
  getsearchperson(): Observable<any> {
    return this.apiService.get(`getsearchperson`);
  }
  getmenu(): Observable<any> {
    return this.apiService.get(`getmenu`);
  }
  getmenudetail(id): Observable<any> {
    return this.apiService.get(`getmenudetail?menuid=${id}`);
  }

  getallboard(): Observable<any> {
    return this.apiService.get(`getallboard`);
  }

  getpersonboard(id): Observable<any> {
    return this.apiService.get(`getpersonboard?BoardId=${id}`);
  }

  insertboard(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertboard`, formData);
  }

  insertboardperson(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertboardperson`, formData);
  }

  updateboard(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updateboard`, formData);
  }

  updaterole(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updaterole`, formData);
  }
  updateroleperson(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updateroleperson`, formData);
  }

  deletegroupboardperson(id): Observable<any> {
    return this.apiService.delete(`deletegroupboardperson?BoardId=${id}`);
  }
  
  deleteboard(id): Observable<any> {
    var formData = new FormData();
    formData.append("IsActive", `${0}`);
    formData.append("UpdateBy", `${1}`);
    formData.append("BoardId", `${id}`);
    return this.apiService.put(`deleteboard`, formData);
  }

  deleterole(id): Observable<any> {
    var formData = new FormData();
    formData.append("IsActive", `${0}`);
    formData.append("UpdateBy", `${1}`);
    formData.append("RoleId", `${id}`);
    return this.apiService.put(`deleterole`, formData);
  }

  deletepersongroupboard(id): Observable<any> {
    return this.apiService.delete(`deletepersongroupboard?BoardPersonalId=${id}`);
  }

}