import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';

import { DataTableComponent } from './data-table/data-table.component';
import { StepperComponent } from './stepper/stepper.component';
import { ListCardComponent } from './list-card/list-card.component';
import { LogingComponent } from './loging/loging.component';

//UploadFile
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CardPersonComponent } from './card-person/card-person.component';
import { CardOrganizationComponent } from './card-organization/card-organization.component';
import { CardProgramComponent } from './card-program/card-program.component';
import { PaginationComponent } from './pagination/pagination.component';

import { OrganizationService } from './../services/organization.service';
import { AuthlogService } from '../../shared/services/authlog.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    AvatarModule
  ],
  declarations: [
    DataTableComponent,
    StepperComponent,
    ListCardComponent,
    LogingComponent,
    UploadFileComponent,
    CardPersonComponent,
    CardOrganizationComponent,
    CardProgramComponent,
    PaginationComponent
  ],
  exports: [
    DataTableComponent,
    StepperComponent,
    ListCardComponent,
    LogingComponent,
    UploadFileComponent,
    CardPersonComponent,
    CardOrganizationComponent,
    CardProgramComponent,
    PaginationComponent
  ],
  providers: [
    OrganizationService,
    AuthlogService,
  ]
})
export class ComponentModule { }
