import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class RoleService {

  constructor(
    private apiService: ApiService
  ) { }

  getgroupuserisnull(): Observable<any> {
    return this.apiService.get(`getgroupuserisnull`);
  }

  

}