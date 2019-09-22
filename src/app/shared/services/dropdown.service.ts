import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class DropdownService {

    constructor(
        private apiService: ApiService
    ) { }

    getProvinceAll(): Observable<any> {
        return this.apiService.get(`getprovince`);
    }

    getDistrictByProvince(id): Observable<any> {
        return this.apiService.get(`getdistrict?Name=${id}`);
    }

    getSubdistrictByDistrict(id): Observable<any> {
        return this.apiService.get(`getsubdistrict?Name=${id}`);
    }

    getEthnicityAll(): Observable<any> {
        return this.apiService.get(`getethnicity`);
    }

    getacademyAll(): Observable<any> {
        return this.apiService.get(`getacademy`);
    }

}