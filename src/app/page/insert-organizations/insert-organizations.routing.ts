import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { InsertOrganizationsComponent } from './insert-organizations.component';
import {OrganizationsListComponent} from '../organizations/organizations-list/organizations-list.component';
import {OrganizationsDetailComponent} from '../organizations/organizations-detail/organizations-detail.component';
import {OrganizationsRelatedPersonComponent} from '../organizations/organizations-related-person/organizations-related-person.component';
import {OrganizationsBursaryComponent} from '../organizations/organizations-bursary/organizations-bursary.component';

export const routes: Routes = [
    {
        path: '',
        component: InsertOrganizationsComponent,

    }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
