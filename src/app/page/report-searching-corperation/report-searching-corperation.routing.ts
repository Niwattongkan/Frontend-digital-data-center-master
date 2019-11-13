import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportSearchingCorperationComponent } from './report-searching-corperation.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: ReportSearchingCorperationComponent,
        canActivate: [AuthGuard],
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
