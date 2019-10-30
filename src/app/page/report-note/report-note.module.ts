import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-note.routing';

import { ReportNoteComponent } from './report-note.component';

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from '../../shared/services/excel.service';
import {NgxSpinnerModule} from "ngx-spinner";
@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
    NgxSpinnerModule
  ],
  declarations: [ReportNoteComponent],
  providers: [
    ReportService,
    ExcelService
  ]
})
export class ReportNoteModule { }
