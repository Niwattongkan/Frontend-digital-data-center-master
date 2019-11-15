import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportUsingComponent } from './report-using.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: ReportUsingComponent,
        canActivate: [AuthGuard],
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
