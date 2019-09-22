import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportSearchingCorperationComponent } from './report-searching-corperation.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportSearchingCorperationComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
