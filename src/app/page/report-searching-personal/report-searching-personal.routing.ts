import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportSearchingPersonalComponent } from './report-searching-personal.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportSearchingPersonalComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
