import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report-searching-board.routing';

import { ReportSearchingBoardComponent } from './report-searching-board.component';

import { ReportService } from '../../shared/services/report.service';

@NgModule({
  declarations: [ReportSearchingBoardComponent],
  imports: [
    SharedModule,
    RoutingModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportSearchingBoardModule { }
