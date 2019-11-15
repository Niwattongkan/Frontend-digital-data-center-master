import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportSearchingBoardComponent } from './report-searching-board.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: ReportSearchingBoardComponent,
        canActivate: [AuthGuard],
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
