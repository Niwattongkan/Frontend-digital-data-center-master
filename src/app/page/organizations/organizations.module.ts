// Module imports
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './organizations.routing'

import { OrganizationsComponent } from './organizations.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsDetailComponent } from './organizations-detail/organizations-detail.component';
import { OrganizationsRelatedPersonComponent } from './organizations-related-person/organizations-related-person.component';
import { OrganizationsBursaryComponent } from './organizations-bursary/organizations-bursary.component';
import { OrganizationsDetailProfileComponent } from './organizations-detail/organizations-detail-profile/organizations-detail-profile.component';
import { OrganizationsDetailContactComponent } from './organizations-detail/organizations-detail-contact/organizations-detail-contact.component';
import { OrganizationsDetailAddressComponent } from './organizations-detail/organizations-detail-address/organizations-detail-address.component';

import { OrganizationService } from '../../shared/services/organization.service';

@NgModule({

  imports: [
    SharedModule,
    RoutingModule
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
    OrganizationService
  ]
})
export class OrganizationsModule { }
