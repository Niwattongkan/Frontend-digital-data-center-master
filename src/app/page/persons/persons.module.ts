import { NgModule } from '@angular/core';
import { RoutingModule } from './persons.routing';
import { SharedModule } from '../../shared/shared.module';

import { PersonsComponent } from './persons.component';
import { PersonsDetailComponent } from './persons-detail/persons-detail.component';
import { PersonsDetailProfileComponent } from './persons-detail/persons-detail-profile/persons-detail-profile.component';
import { PersonsDetailContactComponent } from './persons-detail/persons-detail-contact/persons-detail-contact.component';
import { PersonsDetailCoordinateComponent } from './persons-detail/persons-detail-coordinate/persons-detail-coordinate.component';
import { PersonsDetailFavoriteComponent } from './persons-detail/persons-detail-favorite/persons-detail-favorite.component';
import { PersonsDetailAccountComponent } from './persons-detail/persons-detail-account/persons-detail-account.component';
import { PersonsDetailPositionComponent } from './persons-detail/persons-detail-position/persons-detail-position.component';
import { PersonsDetailAddressComponent } from './persons-detail/persons-detail-address/persons-detail-address.component';
import { PersonsFamilyComponent } from './persons-family/persons-family.component';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonsWorkingComponent } from './persons-working/persons-working.component';
import { PersonsBursaryComponent } from './persons-bursary/persons-bursary.component';
import { PersonsStudiesComponent } from './persons-studies/persons-studies.component';

import { PersonsService } from '../../shared/services/persons.service';
import {NgxSpinnerModule} from "ngx-spinner";

import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    PersonsFamilyComponent,
    PersonsListComponent,
    PersonsComponent,
    PersonsWorkingComponent,
    PersonsBursaryComponent,
    PersonsStudiesComponent,
    PersonsDetailComponent,
    PersonsDetailProfileComponent,
    PersonsDetailContactComponent,
    PersonsDetailCoordinateComponent,
    PersonsDetailFavoriteComponent,
    PersonsDetailAccountComponent,
    PersonsDetailPositionComponent,
    PersonsDetailAddressComponent,
  ],
  providers: [
    PersonsService
  ]
})
export class PersonsModule { }
