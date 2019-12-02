import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';
import { UsersService } from '../../shared/services/users.service';
@Injectable()

export class ContactGroupService {

    constructor(
        private apiService: ApiService,
        private usersService:UsersService
    ) { }

    setFormData(data) {
        var CreateBy = 1;
        var formData = new FormData();
        let key = Object.keys(data);
        for (let index = 0; index < key.length; index++) {
            formData.append(key[index], (data[key[index]]) + "");
        }
        formData.append("CreateBy", `${CreateBy}`);
        formData.append("UpdateBy", `${CreateBy}`);
        formData.append("Channel", "xxx");
        formData.append("Verify", `${1}`);
        formData.append("IsActive", `${1}`);
        return formData
    }

    getContactGroupAll(): Observable<any> {
        return this.apiService.get(`getallcontactgroup`);
    }

    getallgroupuser(): Observable<any> {
        return this.apiService.get(`getallgroupuser`);
    }

    getpersoncontactgroup(id): Observable<any> {
        return this.apiService.get(`getpersoncontactgroup?ContactGroupId=${id}`);
    }

    insertcontactgroup(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertcontactgroup`, formData);
    }

    insertcotactgroupperson(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertcotactgroupperson`, formData);
    }

    insertsharecontactgroup(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertsharecontactgroup`, formData);
    }

    insertsharecontactgroupperson(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertsharecontactgroupperson`, formData);
    }
    
    updatecontactgroup(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.put(`updatecontactgroup`, formData);
    }

    updatecontactgroupperson(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.put(`updatecontactgroupperson`, formData);
    }

    deletecontactgroup(id): Observable<any> {
        var UpdateBy = 1;
        var formData = new FormData();
        formData.append("ContactGroupId", id);
        // formData.append("MemberGroupNo", id);
        formData.append("IsActive", `${0}`);
        formData.append("UpdateBy", `${UpdateBy}`);
        return this.apiService.put(`deletecontactgroup`, formData);
    }

    deletecontactgroupperson(id): Observable<any> {
        return this.apiService.delete(`deletecontactgroupperson?ContactGroupId=${id}`);
    }

    deletemembercontactgroupperson(id): Observable<any> {
        return this.apiService.delete(`deletemembercontactgroupperson?ContactGroupId=${id}`);
    }

}