import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportNoteComponent } from './report-note.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportNoteComponent
    }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
