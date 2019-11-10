import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class PersonsService {

  constructor(
    private apiService: ApiService
  ) { }

  setFormData(data) {
    var formData = new FormData();
    let key = Object.keys(data);
    for (let index = 0; index < key.length; index++) {
      formData.append(key[index], (data[key[index]]));
    }
    formData.append("CreateBy", `${1}`);
    formData.append("UpdateBy", `${1}`);
    formData.append("Channel", "xxx");
    formData.append("IsActive", `${1}`);
    formData.append("Verify", `${1}`);
    return formData
  }

  insertPerson(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertperson`, formData);
  }

  insertPersonAddress(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertpersonaddress`, formData);
  }

  insertPersonContact(data): Observable<any> {
    console.log(data)
    let formData = this.setFormData(data)
    return this.apiService.post(`insertpersoncontact`, formData);
  }

  insertFamily(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertfamily`, formData);
  }

  insertCoordinator(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertcoordinator`, formData);
  }

  insertcoordinatorcantact(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertcoordinatorcantact`, formData);
  }

  insertWork(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertwork`, formData);
  }

  inserteducation(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`inserteducation`, formData);
  }

  insertcheckpersonaddress(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertcheckpersonaddress`, formData);
  }

  updatePerson(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updateperson`, formData);
  }

  getallperson(): Observable<any> {
    return this.apiService.get(`getallperson`);
  }

  getperson(): Observable<any> {
    return this.apiService.get(`getperson`);
  }

  getworkperson(id): Observable<any> {
    return this.apiService.get(`getworkbyid?PersonId=${id}`);
  }

  getPersonSearch(name): Observable<any> {
    return this.apiService.get(`getsearchperson?FristNameTh=${name}`);
  }

  getPersonById(id): Observable<any> {
    return this.apiService.get(`getviewsearchperson?id=${id}`);
  }

  getbookbankperson(id): Observable<any> {
    return this.apiService.get(`getbookbankperson?personid=${id}`);
  }

  getAddressById(id): Observable<any> {
    return this.apiService.get(`getviewaddressperson?id=${id}`);
  }

  getDetailById(id): Observable<any> {
    return this.apiService.get(`getviewdetailsearchperson?id=${id}`);
  }

  getFamilyById(id): Observable<any> {
    return this.apiService.get(`getfamily?id=${id}`);
  }

  getWorkingById(id): Observable<any> {
    return this.apiService.get(`getallwork?id=${id}`);
  }

  getcontactperson(id): Observable<any> {
    return this.apiService.get(`getcontactperson?personid=${id}`);
  }

  getcoordinator(id): Observable<any> {
    return this.apiService.get(`getcoordinator?personid=${id}`);
  }

  // getworkperson(id): Observable<any> {
  //   return this.apiService.get(`getworkperson?id=${id}&corporationid=1`);
  // }

  getProjectById(id): Observable<any> {
    return this.apiService.get(`getprojectperson?id=${id}`);
  }

  getEducationById(id): Observable<any> {
    return this.apiService.get(`geteducationperson?personid=${id}`);
  }

  getcheckaddressperson(id): Observable<any> {
    return this.apiService.get(`getcheckaddressperson?id=${id}`);
  }

  deletePersonById(id): Observable<any> {
    return this.apiService.put(`deleteperson?IsActive=0&PersonId=${id}`);
  }

  deletepersoncontact(id): Observable<any> {
    return this.apiService.put(`deletepersoncontact?IsActive=0&PersonContactId=${id}`);
  }

  deletepersonaddress(id): Observable<any> {
    return this.apiService.put(`deletepersonaddress?IsActive=0&PersonAddressId=${id}`);
  }

  deletefamily(id): Observable<any> {
    return this.apiService.put(`deletefamily?IsActive=0&FamilyId=${id}`);
  }

  deletecoordinator(id): Observable<any> {
    return this.apiService.put(`deletecoordinator?IsActive=0&CoordinatorId=${id}`);
  }

  deletecoordinatorcontact(id): Observable<any> {
    return this.apiService.put(`deletecoordinatorcontact?IsActive=0&CoordinatorContactId=${id}`);
  }

  deleteducation(id): Observable<any> {
    return this.apiService.put(`deleteeducation?IsActive=0&EducationId=${id}`);
  }

  deletework(id): Observable<any> {
    return this.apiService.put(`deletework?IsActive=2&WorkId=${id}`);
  }

  updatePersonAddress(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updatepersonaddress`, formData);
  }

  updateFamily(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updatefamily`, formData);
  }

  updatePersonContact(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updatepersoncontact`, formData);
  }

  updateCoordinator(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updatecoordinator`, formData);
  }

  updateCoordinatorcontact(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updateCoordinatorcontact`, formData);
  }

  updateWork(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updatework`, formData);
  }

  updateeducation(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`updateeducation`, formData);
  }

  insertphoto(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.post(`insertphoto`, formData);
  }

  updatephoto(data): Observable<any> {
    let formData = this.setFormData(data)
    return this.apiService.put(`insertphoto`, formData);
  }

  getsearchpersoncontact(text): Observable<any> {
    return this.apiService.get(`getsearchpersoncontact?contact=${text}`);
  }


  getphotoperson(id): Observable<any> {
    return this.apiService.get(`getphotoperson?PersonId=${id}`);
  }

  uploadImage(image: File): Observable<Response> {
    const formData = new FormData();
    formData.append('image', image);
    return this.apiService.postContent('/api/v1/image-upload', formData);
  }
}
