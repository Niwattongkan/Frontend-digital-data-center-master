
import { throwError as observableThrowError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtService: JwtService,
    private cookieService: CookieService,
  ) { }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      // 'Content-Type': 'application/json',
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    debugger
    if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
      this.router.navigate(['/login']);
    }
    return observableThrowError(error);
  }

  get(path: string, params: HttpParams = new HttpParams(), apiUrl: string = null): Observable<any> {
    apiUrl = apiUrl || environment.apiUrl;
    return this.http.get(this.appendParams(`${apiUrl}${path}`),
      { headers: this.setHeaders(), params: params }).pipe(
      tap(response => this.checkTokenExprire(response)),
      catchError(this.formatErrors.bind(this))
    );
  }

  getJSON(path: string) {
    return this.http.get(this.appendParams(`${environment.apiUrl}${path}`),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: new HttpParams(), observe: 'body' })
  }

  getContent(path: string): Observable<any> {
    return this.http.get(this.appendParams(`${environment.apiUrl}${path}`),
      {
        headers: this.setHeaders(),
        responseType: 'blob'
      }).pipe(
      tap(response => this.checkTokenExprire(response)),
      catchError(this.formatErrors.bind(this)));
  }
  getEventSource(path: string): Observable<any> {
    return Observable.create(observer => {
      const eventSource = new EventSource(this.appendParams(`${environment.apiUrl}${path}`));
      eventSource.onmessage = (x) => {
        if (x.data.length > 0) {
          observer.next(JSON.parse(x.data));
        }
      };
      eventSource.onerror = x => observer.error(x);
      return () => {
        eventSource.close();
      };
    }).pipe(
      tap(response => this.checkTokenExprire(response)),
      catchError(this.formatErrors.bind(this)));
  }
  postContent(path: string, body: Object = {}): any {
    return this.http.post(
      this.appendParams(`${environment.apiUrl}${path}`),
      JSON.stringify(body),
      {
        headers: this.setHeaders(),
        responseType: 'blob'
      }).pipe(
      tap(response => this.checkTokenExprire(response)),
      catchError(this.formatErrors.bind(this)));
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      this.appendParams(`${environment.apiUrl}${path}`),
      body,
      { headers: this.setHeaders() }
    ).pipe(
      tap(response => this.checkTokenExprire(response)),
      catchError(this.formatErrors.bind(this)));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      this.appendParams(`${environment.apiUrl}${path}`),
      body,
      { headers: this.setHeaders() }
    ).pipe(
      tap(response => this.checkTokenExprire(response)),
      catchError(this.formatErrors.bind(this)));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      this.appendParams(`${environment.apiUrl}${path}`),
      { headers: this.setHeaders() }
    ).pipe(
      tap(response => this.checkTokenExprire(response)),
      catchError(this.formatErrors.bind(this)));
  }

  appendParams(path){
    if(path.includes('?')){
      return path +'&code=' +this.cookieService.get('code')
    }
    return path +'?code=' +this.cookieService.get('code')
  }


  checkTokenExprire(data) {
    //debugger
    try {
      if (!data.successful && data.message != undefined && data.message.toLowerCase().includes('token')){ //TODO Make sure error about token exprie, or invalid
        debugger
        console.log(data);
        this.cookieService.delete('code');
        document.location.href = "/";
      }
    } catch (err) {
      debugger
      console.log("Unexpected exception while checkTokenExprire");
      console.log(data);
    }
  }
}
