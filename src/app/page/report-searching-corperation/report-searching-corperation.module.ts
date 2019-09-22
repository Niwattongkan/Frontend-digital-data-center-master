import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-searching-corperation.routing';

import { ReportSearchingCorperationComponent } from './report-searching-corperation.component';

import { ReportService } from '../../shared/services/report.service';

@NgModule({
  declarations: [ReportSearchingCorperationComponent],
  imports: [
    SharedModule,
    RoutingModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportSearchingCorperationModule { }
