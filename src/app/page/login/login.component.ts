import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public alertUser = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Check Existing Token (cookie name => code)
    //console.log(document.location.href);

    debugger
    if (this.cookieService.get('code') != ''){
      console.log('current tokent:' + this.cookieService.get('code'));
      // redirect to sso authen page home
      document.location.href = "/#/home";
    } else {
      this.callback();
    }
  }

  private callback() {
    // console.log('[IN callback]');
    // debugger
    //var code = this.activatedRoute.snapshot.queryParams.code;
    var url = new URL(document.location.href);
    var code = url.searchParams.get("code");

    if(typeof code !== 'undefined' && code != null){
      this.cookieService.set('code', code);
      document.location.href = "/#/home";
    } else {
      document.location.href = environment.ssoAuthUrl;
    }
    // TODO show error
  }

  public openModal(content) {
    return this.modalService.open(content);
  }
}
