import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EventGroupComponent } from './event-group.component';

export const routes: Routes = [
    {
        path: '',
        component: EventGroupComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
