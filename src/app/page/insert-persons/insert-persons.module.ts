// Module imports
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './insert-persons.routing'

// Page imports
import { InsertPersonsComponent } from './insert-persons.component';

import { ModalAddressInformationComponent } from './modal-address-information/modal-address-information.component';
import { ModalFamilyInformationComponent } from './modal-family-information/modal-family-information.component';
import { ModalContactInformationComponent } from './modal-contact-information/modal-contact-information.component';
import { ModalCoordinatorInformationComponent } from './modal-coordinator-information/modal-coordinator-information.component';
import { ModalHistoryOfEducationComponent } from './modal-history-of-education/modal-history-of-education.component';
import { ModalCareerHistoryComponent } from './modal-career-history/modal-career-history.component';

import { PersonsService } from '../../shared/services/persons.service';
import { DropdownService } from '../../shared/services/dropdown.service';
import { OrganizationService } from '../../shared/services/organization.service';

@NgModule({

  imports: [
    SharedModule,
    RoutingModule
  ],
  declarations: [
    ModalAddressInformationComponent,
    ModalFamilyInformationComponent,
    ModalContactInformationComponent,
    ModalCoordinatorInformationComponent,
    ModalHistoryOfEducationComponent,
    ModalCareerHistoryComponent,
    InsertPersonsComponent,
  ],
  entryComponents: [
    ModalAddressInformationComponent,
    ModalFamilyInformationComponent,
    ModalContactInformationComponent,
    ModalCoordinatorInformationComponent,
    ModalHistoryOfEducationComponent,
    ModalCareerHistoryComponent,
  ],
  providers: [
    PersonsService,
    DropdownService,
    OrganizationService
  ]
})

export class InsertPersonsModule { }
