import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';

@Injectable()

export class ReportService {

  constructor(
    private apiService: ApiService
  ) { }


  getreportperson(data): Observable<any> {
    let params = new URLSearchParams();
    params.append("Name", data.Name)
    params.append("CorporationName", data.CorporationName)
    params.append("StartYear", data.StartYear)
    params.append("Position", data.Position)
    return this.apiService.get(`getreportperson?` + params.toString());
  }

  getreportcorporation(data): Observable<any> {
    let params = new URLSearchParams();
    params.append("StartYear", data.StartYear)
    params.append("CorporationName", data.CorporationName)
    params.append("Position", data.Position)
    return this.apiService.get(`getreportcorporation?` + params.toString());
  }

  getreportboard(data): Observable<any> {
    let params = new URLSearchParams();
    params.append("Name", data.Name)
    params.append("BoardName", data.BoardName)
    return this.apiService.get(`getreportboard?` + params.toString());
  }
  
  getreportuserlog(data): Observable<any> {
    let params = new URLSearchParams();
    params.append("Name", data.Name)
    params.append("StartDate", data.StartDate)
    params.append("EndDate", data.EndDate)
    return this.apiService.get(`getreportuserlog?` + params.toString());
  }
  
  getreportnote(data): Observable<any> {
    let params = new URLSearchParams();
    if(data.Name !== ''){
    params.append("Name", data.Name)
    }
    if(data.StrDate !== null){
    params.append("StartDate", data.StrDate)
    }
    if(data.EndDate !== null){
    params.append("EndDate", data.EndDate)
    }
    return this.apiService.get(`getreportuserlog?` + params.toString());
  }

}