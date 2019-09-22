import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class ProgramService {

  constructor(
    private apiService: ApiService
  ) { }


  getallproject(): Observable<any> {
    return this.apiService.get(`getallproject`);
  }

  getallpurchase(): Observable<any> {
    return this.apiService.get(`getallpurchase`);
  }

  getDetailProject(id): Observable<any> {
    return this.apiService.get(`getdetailproject?id=${id}`);
  }

  getDetailPurchase(id): Observable<any> {
    return this.apiService.get(`getdetailpurchase?id=${id}`);
  }

  getprojectpersoncontact(id): Observable<any> {
    return this.apiService.get(`getprojectpersoncontact?projectid=${id}`);
  }

  getprojectpersonaddress(id): Observable<any> {
    return this.apiService.get(`getprojectpersonaddress?projectid=${id}`);
  }

  getpurchasepersoncontact(id): Observable<any> {
    return this.apiService.get(`getpurchasepersoncontact?PurchaseId=${id}`);
  }

  getpurchasepersonaddress(id): Observable<any> {
    return this.apiService.get(`getpurchasepersonaddress?PurchaseId=${id}`);
  }

  getprojectcorporationcontact(id): Observable<any> {
    return this.apiService.get(`getprojectcorporationcontact?projectid=${id}`);
  }

  getprojectcorporationaddress(id): Observable<any> {
    return this.apiService.get(`getprojectcorporationaddress?projectid=${id}`);
  }

  getpurchasecorporationcontact(id): Observable<any> {
    return this.apiService.get(`getpurchasecorporationcontact?PurchaseId=${id}`);
  }

  getpurchasecorporationaddress(id): Observable<any> {
    return this.apiService.get(`getpurchasecorporationaddress?PurchaseId=${id}`);
  }

  getdetailPurchaseProjectManagercontact(id): Observable<any> {
    return this.apiService.get(`getdetailPurchaseProjectManagercontact?PurchaseId=${id}`);
  }

  getdetailPurchaseProjectManageraddress(id): Observable<any> {
    return this.apiService.get(`getdetailPurchaseProjectManageraddress?PurchaseId=${id}`);
  }

}