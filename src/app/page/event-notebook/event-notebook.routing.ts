import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EventNotebookComponent } from './event-notebook.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: EventNotebookComponent,
        canActivate: [AuthGuard]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
