import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./config-services/api.service";

@Injectable()
export class ReportService {
  constructor(private apiService: ApiService) {}

  getreportperson(data): Observable<any> {
    let params = new URLSearchParams();
    if (data.Name !== "") {
      params.append("Name", data.Name);
    }
    if (data.CorporationName !== "") {
      params.append("CorporationName", data.CorporationName);
    }
    if (data.StartYear !== "") {
      params.append("StartYear", data.StartYear);
    }
    if (data.Position !== "") {
      params.append("Position", data.Position);
    }
    return this.apiService.get(`getreportperson?` + params.toString());
  }

  getreportcorporation(data): Observable<any> {
    let params = new URLSearchParams();
    if (data.Parent !== "") {
      params.append("Parent", data.Parent);
    }
    if (data.CorporationName !== "") {
      params.append("CorporationName", data.CorporationName);
    }
    if (data.FullnameTh !== "") {
      params.append("FullnameTh", data.FullnameTh);
    }
    return this.apiService.get(`getreportcorporation?` + params.toString());
  }

  getreportboard(data): Observable<any> {
    let params = new URLSearchParams();
    params.append("Name", data.Name);
    params.append("BoardName", data.BoardName);
    return this.apiService.get(`getreportboard?` + params.toString());
  }

  getreportuserlog(data): Observable<any> {
    let params = new URLSearchParams();
    if (data.Name !== "") {
      params.append("Name", data.Name);
    }
    if (data.Status !== "") {
      params.append("Status", data.Status);
    }
    if (data.StartDate !== null) {
      params.append("StartDate", data.StartDate);
    }
    if (data.EndDate !== null) {
      params.append("EndDate", data.EndDate);
    }
    return this.apiService.get(`getreportuserlog?` + params.toString());
  }

  getreportnote(data): Observable<any> {
    let params = new URLSearchParams();
    if (data.Name !== "") {
      params.append("Name", data.Name);
    }
    if (data.StartDate !== null) {
      params.append("StartDate", data.StartDate);
    }
    if (data.EndDate !== null) {
      params.append("EndDate", data.EndDate);
    }
    return this.apiService.get(`getreportuserlog?` + params.toString());
  }
}
