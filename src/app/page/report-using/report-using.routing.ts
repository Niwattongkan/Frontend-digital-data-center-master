import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportUsingComponent } from './report-using.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportUsingComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
