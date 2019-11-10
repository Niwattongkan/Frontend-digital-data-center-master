import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { ApiService } from './shared/services/config-services/api.service';
import { AuthlogService } from './shared/services/authlog.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: true,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger'
    }),
    LayoutModule,
    Routing,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ApiService,
    AuthlogService,
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
