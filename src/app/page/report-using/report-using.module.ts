import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-using.routing';

import { ReportUsingComponent } from './report-using.component';

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from '../../shared/services/excel.service';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [ReportUsingComponent],
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
export class ReportUsingModule { }
