import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class GroupUserService {

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

    getsearchgroupuser(): Observable<any> {
        return this.apiService.get(`getsearchgroupuser`);
    }

    getsearchperson(): Observable<any> {
        return this.apiService.get(`getsearchperson`);
    }

    getallgroupuser(): Observable<any> {
        return this.apiService.get(`getallgroupuser`);
    }

    insertmanagegroup(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertmanagegroup`, formData);
    }

    insertgroupuser(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertgroupuser`, formData);
    }

    insertgroupuserperson(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertgroupuserperson`, formData);
    }

    updategroupuser(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.put(`updategroupuser`, formData);
    }

    updatemanagegroup(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.put(`updatemanagegroup`, formData);
    }

    updategroupuserperson(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.put(`updategroupuserperson`, formData);
    }

    deletegroupuser(id, member): Observable<any> {
        let formData = this.setFormData({
            IsActive: 0,
            GroupUserId: id,
            // MemberGroupNo: member,
        })
        return this.apiService.put(`deletegroupuser`, formData);
    }

    deletegroupuserperson(id): Observable<any> {
        return this.apiService.delete(`deletegroupuserperson?GroupUserPersonalId=${id}`);
    }

}




