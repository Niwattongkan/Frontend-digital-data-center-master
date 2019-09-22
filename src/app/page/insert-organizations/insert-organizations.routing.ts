import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { InsertOrganizationsComponent } from './insert-organizations.component';

export const routes: Routes = [
    {
        path: '',
        component: InsertOrganizationsComponent,
    }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
