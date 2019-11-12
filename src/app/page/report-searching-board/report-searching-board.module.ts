import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-searching-board.routing';

import { ReportSearchingBoardComponent } from './report-searching-board.component';

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from '../../shared/services/excel.service';
import {NgxSpinnerModule} from "ngx-spinner";
import {MatSelectModule} from "@angular/material/select";
@NgModule({
  declarations: [ReportSearchingBoardComponent],
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule,
    MatSelectModule
  ],
  providers: [
    ReportService,
    ExcelService
  ]
})
export class ReportSearchingBoardModule { }
