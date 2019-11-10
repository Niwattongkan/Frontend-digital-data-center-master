import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  template: '<h1>Callback</h1>'
})
export class CallbackComponent implements OnInit {

  public alertUser = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.callback()
  }

  public callback() {
    console.log('[IN callback]');
    //debugger
    var code = this.activatedRoute.snapshot.queryParams.code;
    if(typeof code != undefined){
      this.cookieService.set('code', code);
      this.router.navigate(['/home']);
    } else {
      document.location.href = environment.ssoAuthUrl;
    }
    console.log('[End callback] code ='+ code);
  }

}
