import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-searching-corperation.routing';

import { ReportSearchingCorperationComponent } from './report-searching-corperation.component';

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from '../../shared/services/excel.service';
import {NgxSpinnerModule} from "ngx-spinner";
@NgModule({
  declarations: [ReportSearchingCorperationComponent],
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
export class ReportSearchingCorperationModule { }
