// Module imports
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './organizations.routing'
import { ExcelService } from '../../shared/services/excel.service';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsDetailComponent } from './organizations-detail/organizations-detail.component';
import { OrganizationsRelatedPersonComponent } from './organizations-related-person/organizations-related-person.component';
import { OrganizationsBursaryComponent } from './organizations-bursary/organizations-bursary.component';
import { OrganizationsDetailProfileComponent } from './organizations-detail/organizations-detail-profile/organizations-detail-profile.component';
import { OrganizationsDetailContactComponent } from './organizations-detail/organizations-detail-contact/organizations-detail-contact.component';
import { OrganizationsDetailAddressComponent } from './organizations-detail/organizations-detail-address/organizations-detail-address.component';

import { OrganizationService } from '../../shared/services/organization.service';
import {NgxSpinnerModule} from "ngx-spinner";
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

@NgModule({

  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    OrganizationsComponent,
    OrganizationsListComponent,
    OrganizationsDetailComponent,
    OrganizationsRelatedPersonComponent,
    OrganizationsBursaryComponent,
    OrganizationsDetailProfileComponent,
    OrganizationsDetailContactComponent,
    OrganizationsDetailAddressComponent,
  ],
  providers: [
    OrganizationService,
    AuthGuard,
    ExcelService
  ]
})
export class OrganizationsModule { }
