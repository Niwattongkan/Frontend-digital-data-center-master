import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './event-group.routing';

import { EventGroupComponent } from './event-group.component';

import { ContactGroupService } from '../../shared/services/contact-group.service';
import { SharedGroupModalComponent } from './shared-group-modal/shared-group-modal.component';
import { EventGroupModalComponent } from './event-group-modal/event-group-modal.component';
import { CopyGroupModalComponent } from './copy-group-modal/copy-group-modal.component';

import { PersonsService } from '../../shared/services/persons.service';
import { ExcelService } from '../../shared/services/excel.service';
import {NgxSpinnerModule} from "ngx-spinner";
import { FontService } from './font';

@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    EventGroupComponent,
    SharedGroupModalComponent,
    EventGroupModalComponent,
    CopyGroupModalComponent,
  ],
  providers: [
    ContactGroupService,
    PersonsService,
    ExcelService,
    FontService
  ]
})
export class EventGroupModule { }
