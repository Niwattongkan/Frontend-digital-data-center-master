import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './insert-organizations.routing';

import { InsertOrganizationsComponent } from './insert-organizations.component';

import { DropdownService } from '../../shared/services/dropdown.service';
import { OrganizationService } from '../../shared/services/organization.service';
import { ModalContactOrganizationComponent } from './modal-contact-organization/modal-contact-organization.component';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    InsertOrganizationsComponent,
    ModalContactOrganizationComponent,
  ],
  providers: [
    OrganizationService,
    DropdownService
  ]
})
export class InsertOrganizationsModule { }
