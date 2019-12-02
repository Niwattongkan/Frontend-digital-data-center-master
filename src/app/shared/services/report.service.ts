import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './config-services/api.service';

@Injectable()
export class ReportService {
  constructor(private apiService: ApiService) {
  }

  getreportperson(data): Observable<any> {
    const params = new URLSearchParams();
    if (data.Name !== '') {
      params.append('Name', data.Name);
    }
    if (data.CorporationName !== '') {
      params.append('CorporationName', data.CorporationName);
    }
    if (data.StartYear !== '') {
      params.append('StartYear', data.StartYear);
    }
    if (data.Position !== '') {
      params.append('Position', data.Position);
    }
    if (data.ProjectName !== ''){
      params.append('ProjectName', data.ProjectName);
    }
    if (data.ProjectNo !== ''){
      params.append('ProjectNo' , data.ProjectNo);
    }
    return this.apiService.get(`getreportperson?` + params.toString());
  }

  getreportcorporation(data): Observable<any> {
    const params = new URLSearchParams();
    if (data.StartDate !== '') {
      params.append('StartDate', data.StartDate+` 00:00:00.000`);
    }
    if (data.EndDate !== '') {
      params.append('EndDate', data.EndDate+` 00:00:00.000`);
    }
    if (data.CorporationName !== '') {
      params.append('CorporationName', data.CorporationName);
    }

    return this.apiService.get(`getreportcorporation?` + params.toString());
  }

  getreportboard(): Observable<any> {
    return this.apiService.get(`getreportboard?Name=test`);
  }

  getreportuserlog(data): Observable<any> {
    const params = new URLSearchParams();
    params.append('Name', data.Name);
    params.append('UpdateMenu', data.Status ? data.Status : 'บุคคล');
    params.append('StrDate', data.StartDate);
    params.append('EndDate', data.EndDate);
    return this.apiService.get(`getreportuserlog?` + params.toString());
  }

  getreportnote(data): Observable<any> {
    
    const params = new URLSearchParams();
    params.append('CreateBy', data.CreateBy ? data.CreateBy : '');
    params.append('NoteName', data.NoteName ? data.NoteName : '');
    params.append('StrDate', data.StartDate);
    params.append('EndDate', data.EndDate);
    return this.apiService.get(`getreportnote?` + params.toString());
  }

  getsearchcorporation(): Observable<any> {
    return this.apiService.get(`getsearchcorporation`);

  }
}
