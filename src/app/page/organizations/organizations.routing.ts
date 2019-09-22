import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrganizationsComponent } from './organizations.component';

import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsDetailComponent } from './organizations-detail/organizations-detail.component';
import { OrganizationsRelatedPersonComponent } from './organizations-related-person/organizations-related-person.component';
import { OrganizationsBursaryComponent } from './organizations-bursary/organizations-bursary.component';

export const routes: Routes = [
    {
        path: '',
        component: OrganizationsComponent,
        children: [
            {
                path: '',
                component: OrganizationsListComponent
            },
            {
                path: 'detail/:id',
                component: OrganizationsDetailComponent
            },
            {
                path: 'related-person/:id',
                component: OrganizationsRelatedPersonComponent
            },
            {
                path: 'bursary/:id',
                component: OrganizationsBursaryComponent
            }
        ]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
