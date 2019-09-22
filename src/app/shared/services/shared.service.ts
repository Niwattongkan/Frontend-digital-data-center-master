import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class SharedService {

  constructor(
    private apiService: ApiService
  ) { }

  getsearchperson(): Observable<any> {
    return this.apiService.get(`getsearchperson`);
  }

  getallgroupuser(): Observable<any> {
    return this.apiService.get(`getallgroupuser`);
  }

}