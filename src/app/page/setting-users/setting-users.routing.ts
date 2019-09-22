import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingUsersComponent } from './setting-users.component';

export const routes: Routes = [
    {
        path: '',
        component: SettingUsersComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
