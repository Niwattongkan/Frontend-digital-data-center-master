import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CallbackComponent } from './callback.component';

export const routes: Routes = [
    {
        path: '',
        component: CallbackComponent
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
