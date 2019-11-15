import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingUsersComponent } from './setting-users.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: SettingUsersComponent,
        canActivate: [AuthGuard]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
