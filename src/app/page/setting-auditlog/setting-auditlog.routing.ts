import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingAuditlogComponent } from './setting-auditlog.component';

export const routes: Routes = [
    {
        path: '',
        component: SettingAuditlogComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
