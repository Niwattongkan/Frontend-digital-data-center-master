import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrganizationsComponent } from './organizations.component';

import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsDetailComponent } from './organizations-detail/organizations-detail.component';
import { OrganizationsRelatedPersonComponent } from './organizations-related-person/organizations-related-person.component';
import { OrganizationsBursaryComponent } from './organizations-bursary/organizations-bursary.component';
import { AuthGuard } from '../../shared/component/guards/auth-guard.service';
import { OrganizationsImportComponent } from './organizations-import/organizations-import.component';

export const routes: Routes = [
    {
        path: '',
        component: OrganizationsComponent,
        children: [
            {
                path: '',
                component: OrganizationsListComponent,
                canActivate: [AuthGuard],
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
            }, 
            {
                path: 'import',
                component: OrganizationsImportComponent
            }

        ]
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
