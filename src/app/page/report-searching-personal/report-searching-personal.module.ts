import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-searching-personal.routing';

import { ReportSearchingPersonalComponent } from './report-searching-personal.component';

import { ReportService } from '../../shared/services/report.service';

@NgModule({
  declarations: [ReportSearchingPersonalComponent],
  imports: [
    SharedModule,
    RoutingModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportSearchingPersonalModule { }
