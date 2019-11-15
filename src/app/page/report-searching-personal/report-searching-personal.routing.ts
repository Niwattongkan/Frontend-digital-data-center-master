import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportSearchingPersonalComponent } from './report-searching-personal.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: ReportSearchingPersonalComponent,
        canActivate: [AuthGuard],
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
