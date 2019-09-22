import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportSearchingBoardComponent } from './report-searching-board.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportSearchingBoardComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
