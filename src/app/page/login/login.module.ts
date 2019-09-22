import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './login.routing'

import { LoginComponent } from './login.component';
import { ForgetPasswordModalComponent } from './forget-password-modal/forget-password-modal.component'
@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordModalComponent
  ],
})
export class LoginModule { }
