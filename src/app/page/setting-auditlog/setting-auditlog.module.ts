import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './setting-auditlog.routing';

import { SettingAuditlogComponent } from './setting-auditlog.component';

import { AuthlogService } from '../../shared/services/authlog.service';
import { PersonsService } from '../../shared/services/persons.service';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [SettingAuditlogComponent],
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthlogService,
    PersonsService
  ]
})
export class SettingAuditlogModule { }
