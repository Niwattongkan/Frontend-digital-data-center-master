import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';
import { UsersService } from '../../shared/services/users.service';
@Injectable()

export class NoteService {

    constructor(
        private apiService: ApiService,
        private usersService:UsersService
    ) { }

    setFormData(data) {
        var CreateBy = this.usersService.getUserInfo().uid;
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

    searhNote(noteName): Observable<any> {
        return this.apiService.get(`getsearchnote?NoteName=${noteName}`);
    }

    getNoteAll(): Observable<any> {
        return this.apiService.get(`getallnote`);
    }

    getDetailNote(id): Observable<any> {
        return this.apiService.get(`getviewdetailnote?noteid=${id}`);
    }

    insertNote(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertnote`, formData);
    }

    insertShareNote(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertsharenote`, formData);
    }

    insertdetailShareNote(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.post(`insertdetailsharenote`, formData);
    }

    updateNote(data): Observable<any> {
        let formData = this.setFormData(data)
        return this.apiService.put(`updatenote`, formData);
    }

    deleteNote(id): Observable<any> {
        let formData = this.setFormData({
            IsActive: 0,
            NoteId: id
        })
        return this.apiService.put(`deletenote`, formData);
    }
}