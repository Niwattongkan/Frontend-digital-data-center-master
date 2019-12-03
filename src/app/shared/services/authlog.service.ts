import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';
import { UsersService } from '../../shared/services/users.service';
@Injectable()

export class AuthlogService {

  constructor(
    private apiService: ApiService,
    private usersService:UsersService
  ) { }

  setFormData(data) {
    var formData = new FormData();
    let key = Object.keys(data);
    for (let index = 0; index < key.length; index++) {
        formData.append(key[index], (data[key[index]]) + "");
    }
    var CreateBy = this.usersService.getUserInfo().email;
    formData.append("CreateBy", `${CreateBy}`);
    formData.append("UpdateBy", `${CreateBy}`);
    return formData
}
  getuserinfo(data):Observable<any>{
    return this.apiService.get(`getuserinfo?PersonId=`+data)
  }
  insertAuditlog(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertauditlog`, formData);
  }

  getauditlog(): Observable<any> {
    return this.apiService.get(`getauditlog`);
  }

  getEditlogBoardAll(): Observable<any> {
    return this.apiService.get(`geteditlogboard`);
  }

  getEditlogBoardPersonalAll(): Observable<any> {
    return this.apiService.get(`geteditlogboardpersonal`);
  }

  getEditlogContactGroupAll(): Observable<any> {
    return this.apiService.get(`geteditlogcontactgroup`);
  }

  getEditlogCoordinatorAll(): Observable<any> {
    return this.apiService.get(`geteditlogcoordinator`);
  }

  getEditlogCoordinatorContactlogAll(): Observable<any> {
    return this.apiService.get(`geteditlogcoordinatorcontact`);
  }

  getEditlogCorporationAddressAll(): Observable<any> {
    return this.apiService.get(`geteditlogcorporationaddress`);
  }

  getEditlogFamilyAll(): Observable<any> {
    return this.apiService.get(`geteditlogfamily`);
  }

  getEditlogGroupUserAll(): Observable<any> {
    return this.apiService.get(`geteditloggroupuser`);
  }

  getEditlogmanagegroupAll(): Observable<any> {
    return this.apiService.get(`geteditlogmanagegroup`);
  }

  getEditlogMemberContactGroupAll(): Observable<any> {
    return this.apiService.get(`geteditlogmembercontactgroup`);
  }

  getEditlogPersonAll(): Observable<any> {
    return this.apiService.get(`geteditlogperson`);
  }

  getEditlogPersonAddressAll(): Observable<any> {
    return this.apiService.get(`geteditlogpersonaddress`);
  }

  getEditlogprojectAll(): Observable<any> {
    return this.apiService.get(`geteditlogproject`);
  }

  getEditlogPurchaseAll(): Observable<any> {
    return this.apiService.get(`geteditlogpurchase`);
  }

  getEditlogWorkAll(): Observable<any> {
    return this.apiService.get(`geteditlogwork`);
  }

}
