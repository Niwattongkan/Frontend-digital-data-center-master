import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { InsertPersonsComponent } from './insert-persons.component';

export const routes: Routes = [
    {
        path: '',
        component: InsertPersonsComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
