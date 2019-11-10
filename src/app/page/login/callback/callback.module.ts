import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RoutingModule } from './callback.routing';

import { CallbackComponent } from './callback.component';
@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
  ],
  declarations: [
    CallbackComponent,
  ],
})
export class CallbackModule { }
