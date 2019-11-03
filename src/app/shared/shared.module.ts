import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModule } from './component/component.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AvatarModule } from 'ngx-avatar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MyDatePickerTHModule } from 'mydatepicker-th';

import { ApiService } from './services/config-services/api.service';
import { JwtService } from './services/config-services/jwt.service';
import { AutoFocusDirective } from './library/auto-focus.directive';

@NgModule({
  imports: [
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    NgbModule,
    SweetAlert2Module,
    NgMultiSelectDropDownModule,
    FilterPipeModule,
    NgxPaginationModule,
    AvatarModule,
    NgxChartsModule,
    MyDatePickerTHModule,
    AutoFocusDirective,
  ],
  providers: [
    ApiService,
    JwtService,
  ],
  declarations: [AutoFocusDirective],
})
export class SharedModule { }
