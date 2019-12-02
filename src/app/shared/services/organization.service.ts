import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./config-services/api.service";
import { UsersService } from '../../shared/services/users.service';
@Injectable()
export class OrganizationService {
  constructor(private apiService: ApiService,  private usersService:UsersService) {}

  setFormData(data) {
    const formData = new FormData();
    const key = Object.keys(data);
    for (let index = 0; index < key.length; index++) {
      formData.append(key[index], data[key[index]] + "");
    }
    // formData.append("CreateBy", `${1}`);
    // formData.append("UpdateBy", `${1}`);
    // formData.append("Channel", "xxx");
    // formData.append("Verify", `${1}`);
    // formData.append("IsActive", `${1}`);
    return formData;
  }

  getserchcorporationaddress(id): Observable<any> {
    return this.apiService.get(
      `getserchcorporationaddress?corporationid=${id}`
    );
  }

  getserchcorporationcontact(id): Observable<any> {
    return this.apiService.get(
      `getserchcorporationcontact?corporationid=${id}`
    );
  }

  getOrganizationAll(): Observable<any> {
    return this.apiService.get(`getsearchcorporation`);
  }

  getCorporationAll(): Observable<any> {
    return this.apiService.get(`getcorporation`);
  }

  getallcorporationaddress(): Observable<any> {
    return this.apiService.get(`getallcorporationaddress`);
  }

  getallcorporationcontact(): Observable<any> {
    return this.apiService.get(`getallcorporationcontact`);
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
    var CreateBy = 1;
    const formData = this.setFormData(data);
    formData.append("CreateBy", `${CreateBy}`)
    return this.apiService.post(`insertcorporation`, formData);
  }

  insertCorporationContact(data): Observable<any> {
    var CreateBy = 1;
    const formData = this.setFormData(data);
    formData.append("CreateBy", `${CreateBy}`)
    return this.apiService.post(`insertcorporationcontact`, formData);
  }

  insertcoordinatorcantact(data): Observable<any> {
    var CreateBy = 1;
    const formData = this.setFormData(data);
    formData.append("CreateBy", `${CreateBy}`)
    return this.apiService.post(`insertcoordinatorcantact`, formData);
  }

  insertCorporationAddress(data): Observable<any> {
    const formData = this.setFormData(data);
    return this.apiService.post(`insertcorporationaddress`, formData);
  }

  updatecorporation(data): Observable<any> {
    var UpdateBy = 1;
    const formData = this.setFormData(data);
    formData.append("UpdateBy", `${UpdateBy}`);
    return this.apiService.put(`updatecorporation`, formData);
  }

  updateCorporationContact(data): Observable<any> {
    var UpdateBy = 1;
    const formData = this.setFormData(data);
    formData.append("UpdateBy", `${UpdateBy}`);
    return this.apiService.put(`updatecorporationcontact`, formData);
  }

  updateCorporationAddress(data): Observable<any> {
    var UpdateBy = 1;
    const formData = this.setFormData(data);
    formData.append("UpdateBy", `${UpdateBy}`);
    return this.apiService.put(`updatecorporationaddress`, formData);
  }

  deleteCorporation(id): Observable<any> {
    var formData = new FormData();
    formData.append("IsActive", "0");
    formData.append("CorporationId", id);
    return this.apiService.put(`deletecorporation`, formData);
  }

  deleteCorporationContact(data): Observable<any> {
    var formData = new FormData();
    formData.append("IsActive", "0");
    formData.append("CorporationContactId", data);
    return this.apiService.put(`deletecorporationcontact`, formData);
  }

  deleteCorporationAddress(id): Observable<any> {
    var formData = new FormData();
    formData.append("IsActive", "0");
    formData.append("CorporationAddressId", id);
    return this.apiService.put(`deletecorporationaddress`, formData);
  }
}
