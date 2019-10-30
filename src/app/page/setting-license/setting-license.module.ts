import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './setting-license.routing';

import { SettingLicenseComponent } from './setting-license.component';
import { LicenseModalComponent } from './license-modal/license-modal.component';

import { BoardService } from '../../shared/services/board.service';
import { PersonsService } from '../../shared/services/persons.service';
import { PermissionsService } from '../../shared/services/permission.service';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    SettingLicenseComponent,
    LicenseModalComponent
  ],
  providers: [
    BoardService,
    PersonsService,
    PermissionsService
  ]
})
export class SettingLicenseModule { }
