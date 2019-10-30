import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class OrganizationService {

  constructor(
    private apiService: ApiService
  ) { }

  setFormData(data) {
    const formData = new FormData();
    const key = Object.keys(data);
    for (let index = 0; index < key.length; index++) {
      formData.append(key[index], (data[key[index]]) + '');
    }
    formData.append('CreateBy', `${1}`);
    formData.append('UpdateBy', `${1}`);
    formData.append('Channel', 'xxx');
    formData.append('Verify', `${1}`);
    formData.append('IsActive', `${1}`);
    return formData;
  }

  getserchcorporationaddress(id): Observable<any> {
    return this.apiService.get(`getserchcorporationaddress?corporationid=${id}`);
  }

  getserchcorporationcontact(id): Observable<any> {
    return this.apiService.get(`getserchcorporationcontact?corporationid=${id}`);
  }

  getOrganizationAll(): Observable<any> {
    return this.apiService.get(`getsearchcorporation`);
  }

  getCorporationAll(): Observable<any> {
    return this.apiService.get(`getcorporation`);
  }

  getCorporation(id): Observable<any> {
    return this.apiService.get(`getcorporation?id=${id}`);
  }

  getCorporationPerson(id): Observable<any> {
    return this.apiService.get(`getcorporationperson?id=${id}`);
  }

  getcorporationaddress(id): Observable<any> {
    return this.apiService.get(`getcorporationaddress?corporationid=${id}`);
  }

  getCorporationProject(id): Observable<any> {
    return this.apiService.get(`getcorporationproject?id=${id}`);
  }

  getcorporationcontact(id): Observable<any> {
    return this.apiService.get(`getcorporationcontact?corporationid=${id}`);
  }


  insertCorporation(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.post(`insertcorporation`, formData);
  }

  insertCorporationContact(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.post(`insertcorporationcontact`, formData);
  }

  insertcoordinatorcantact(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.post(`insertcoordinatorcantact`, formData);
  }

  insertCorporationAddress(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.post(`insertcorporationaddress`, formData);
  }

  updatecorporation(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.put(`updatecorporation`, formData);
  }

  updateCorporationContact(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.put(`updatecorporationcontact`, formData);
  }

  updateCorporationAddress(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.put(`updatecorporationaddress`, formData);
  }

  deleteCorporation(id): Observable<any> {
    return this.apiService.put(`deletecorporation?IsActive=0&CorporationId=${id}`);
  }

  deleteCorporationContact(id): Observable<any> {
    return this.apiService.put(`deletecorporationcontact?IsActive=0&CorporationContactId=${id}`);
  }

  deleteCorporationAddress(id): Observable<any> {
    return this.apiService.put(`deletecorporationaddress?IsActive=0&CorporationAddressId=${id}`);
  }

}
