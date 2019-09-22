import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProgramComponent } from './program.component';

import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
export const routes: Routes = [
    {
        path: '',
        component: ProgramComponent,
        children: [
            {
                path: '',
                component: ProgramListComponent
            },
            {
                path: 'detail/:typeProgamer/:id',
                component: ProgramDetailComponent
            }
        ]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
