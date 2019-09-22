import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingPermissionComponent } from './setting-permission.component';

export const routes: Routes = [
    {
        path: '',
        component: SettingPermissionComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
