import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-using.routing';

import { ReportUsingComponent } from './report-using.component';

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from '../../shared/services/excel.service';
@NgModule({
  declarations: [ReportUsingComponent],
  imports: [
    SharedModule,
    RoutingModule
  ],
  providers: [
    ReportService,    
    ExcelService
  ]
})
export class ReportUsingModule { }
