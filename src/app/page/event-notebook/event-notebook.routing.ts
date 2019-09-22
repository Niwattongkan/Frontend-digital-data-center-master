import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EventNotebookComponent } from './event-notebook.component';

export const routes: Routes = [
    {
        path: '',
        component: EventNotebookComponent,
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
