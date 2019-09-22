import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './report.routing';

import { ReportComponent } from './report.component';

import { ReportService } from '../../shared/services/report.service';

@NgModule({
  imports: [
    SharedModule,
    RoutingModule
  ],
  declarations: [
    ReportComponent
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
