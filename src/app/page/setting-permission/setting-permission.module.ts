import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './setting-permission.routing';

import { SettingPermissionComponent } from './setting-permission.component';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';

import { BoardService } from '../../shared/services/board.service';
import { PersonsService } from '../../shared/services/persons.service';

@NgModule({
  declarations: [SettingPermissionComponent, PermissionModalComponent],
  imports: [
    SharedModule,
    RoutingModule
  ],
  providers: [
    BoardService,
    PersonsService
  ]
})
export class SettingPermissionModule { }
