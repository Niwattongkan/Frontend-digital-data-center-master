import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import {AuthlogService} from "../../shared/services/authlog.service";
import SimpleCrypto from "simple-crypto-js/build/SimpleCrypto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public username
  private personId: string | object;
  constructor(private cookieService: CookieService,
              private authlogService: AuthlogService,
              private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    let Crypto = new SimpleCrypto('some-unique-key');
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.personId = id != '' && id != null ? Crypto.decrypt(id) : ''
    this.username = this.authlogService.getuserinfo(this.personId)
  }

  logout(){
    // debugger
    this.cookieService.delete('code');
    document.location.href = environment.logoutUrl
  }

}
