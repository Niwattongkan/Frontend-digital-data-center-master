import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-searching-personal.routing';

import { ReportSearchingPersonalComponent } from './report-searching-personal.component';

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from '../../shared/services/excel.service';
import {NgxSpinnerModule} from "ngx-spinner";
@NgModule({
  declarations: [ReportSearchingPersonalComponent],
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    ReportService,
    ExcelService
  ]
})
export class ReportSearchingPersonalModule { }
