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
    return this.apiService.get(`getreportperson?` + params.toString());
  }

  getreportcorporation(data): Observable<any> {
    const params = new URLSearchParams();
    if (data.Parent !== '') {
      params.append('Parent', data.Parent);
    }
    if (data.CorporationName !== '') {
      params.append('CorporationName', data.CorporationName);
    }
    if (data.FullnameTh !== '') {
      params.append('Name', data.FullnameTh);
    }
    return this.apiService.get(`getreportcorporation?` + params.toString());
  }

  getreportboard(data): Observable<any> {
    const params = new URLSearchParams();
    params.append('Name', data.Name);
    params.append('BoardName', data.BoardName);
    return this.apiService.get(`getreportboard?` + params.toString());
  }

  getreportuserlog(data): Observable<any> {
    const params = new URLSearchParams();
    params.append('Name', data.Name);
    params.append('UpdateMenu', data.Status ? data.Status : 'บุคคล')
    params.append('StrDate', data.StartDate);
    params.append('EndDate', data.EndDate);
    return this.apiService.get(`getreportuserlog?` + params.toString());
  }

  getreportnote(data): Observable<any> {
    const params = new URLSearchParams();
      params.append('CreateBy', data.CreateBy ? data.CreateBy : '');
      params.append('NoteName' , data.NoteName ? data.NoteName : '');
      params.append('StrDate', data.StartDate);
      params.append('EndDate', data.EndDate);
    return this.apiService.get(`getreportnote?` + params.toString());
  }

  getsearchcorporation(): Observable<any> {
    return this.apiService.get(`getsearchcorporation`);

  }
}
