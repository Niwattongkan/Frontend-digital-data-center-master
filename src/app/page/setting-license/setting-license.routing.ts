import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingLicenseComponent } from './setting-license.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: SettingLicenseComponent,
        canActivate: [AuthGuard]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
