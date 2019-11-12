import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PersonsComponent } from './persons.component';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonsFamilyComponent } from './persons-family/persons-family.component';
import { PersonsWorkingComponent } from './persons-working/persons-working.component';
import { PersonsBursaryComponent } from './persons-bursary/persons-bursary.component';
import { PersonsStudiesComponent } from './persons-studies/persons-studies.component';
import { PersonsDetailComponent } from './persons-detail/persons-detail.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '', component: PersonsComponent,
        children: [
            {
                path: '',
                component: PersonsListComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'detail/:id',
                component: PersonsDetailComponent
            },
            {
                path: 'family/:id',
                component: PersonsFamilyComponent
            },
            {
                path: 'working/:id',
                component: PersonsWorkingComponent
            },
            {
                path: 'bursary/:id',
                component: PersonsBursaryComponent
            },
            {
                path: 'studies/:id',
                component: PersonsStudiesComponent
            },
        ]
    },
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
