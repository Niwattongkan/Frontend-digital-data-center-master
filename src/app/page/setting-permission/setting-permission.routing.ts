import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingPermissionComponent } from './setting-permission.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: SettingPermissionComponent,
        canActivate: [AuthGuard]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
