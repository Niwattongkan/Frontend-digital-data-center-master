import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingLicenseComponent } from './setting-license.component';

export const routes: Routes = [
    {
        path: '',
        component: SettingLicenseComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
