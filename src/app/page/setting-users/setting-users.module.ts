import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './setting-users.routing';

import { SettingUsersComponent } from './setting-users.component';
import { UserModalComponent } from './user-modal/user-modal.component';

import { GroupUserService } from '../../shared/services/group-user.service';
import { PersonsService } from '../../shared/services/persons.service';
import { BoardService } from '../../shared/services/board.service';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

@NgModule({
  declarations: [
    SettingUsersComponent,
    UserModalComponent,
    EditUserModalComponent
  ],
  imports: [
    SharedModule,
    RoutingModule
  ],
  providers: [
    GroupUserService,
    PersonsService,
    BoardService
  ]
})

export class SettingUsersModule { }
