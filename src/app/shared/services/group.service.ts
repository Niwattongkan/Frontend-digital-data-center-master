import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class GroupService {

    constructor(
        private apiService: ApiService
    ) { }

    getGroupUserAll(): Observable<any> {
        return this.apiService.get(`getallgroupuser`);
    }

}

