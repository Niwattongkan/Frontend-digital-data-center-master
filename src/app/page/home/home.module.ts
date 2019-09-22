import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './home.routing';

import { HomeComponent } from './home.component';

import { PersonsService } from '../../shared/services/persons.service';
import { OrganizationService } from '../../shared/services/organization.service';
import { ProgramService } from '../../shared/services/program.service';

@NgModule({
  imports: [
    SharedModule,
    RoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    PersonsService,
    OrganizationService,
    ProgramService
  ]
})
export class HomeModule { }
