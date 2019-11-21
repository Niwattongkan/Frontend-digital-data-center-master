import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EventGroupComponent } from './event-group.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: EventGroupComponent,
        canActivate: [AuthGuard]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
