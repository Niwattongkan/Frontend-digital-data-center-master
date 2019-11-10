import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', loadChildren: './page/login/login.module#LoginModule', pathMatch: 'full' },
    { path: 'callback', loadChildren: './page/login/callback/callback.module#CallbackModule', pathMatch: 'full'},
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'home',
                loadChildren: './page/home/home.module#HomeModule',
            },
            {
                path: 'persons/insert/:id',
                loadChildren: './page/insert-persons/insert-persons.module#InsertPersonsModule',
            },
            {
                path: 'persons/insert',
                loadChildren: './page/insert-persons/insert-persons.module#InsertPersonsModule',
            },
            {
                path: 'persons',
                loadChildren: './page/persons/persons.module#PersonsModule'
            },
            {
                path: 'organizations/insert/:id',
                loadChildren: './page/insert-organizations/insert-organizations.module#InsertOrganizationsModule'
            },
            {
                path: 'organizations/insert',
                loadChildren: './page/insert-organizations/insert-organizations.module#InsertOrganizationsModule'
            },
            {
                path: 'organizations',
                loadChildren: './page/organizations/organizations.module#OrganizationsModule'
            },
            {
                path: 'program',
                loadChildren: './page/program/program.module#ProgramModule'
            },
            {
                path: 'report',
                loadChildren: './page/report/report.module#ReportModule'
            },
            {
                path: 'report/note',
                loadChildren: './page/report-note/report-note.module#ReportNoteModule'
            },
            {
                path: 'report/searching-board',
                loadChildren: './page/report-searching-board/report-searching-board.module#ReportSearchingBoardModule'
            },
            {
                path: 'report/searching-corperation',
                loadChildren: './page/report-searching-corperation/report-searching-corperation.module#ReportSearchingCorperationModule'
            },
            {
                path: 'report/searching-personal',
                loadChildren: './page/report-searching-personal/report-searching-personal.module#ReportSearchingPersonalModule'
            },
            {
                path: 'report/using',
                loadChildren: './page/report-using/report-using.module#ReportUsingModule'
            },
            {
                path: 'event/group',
                loadChildren: './page/event-group/event-group.module#EventGroupModule'
            },
            {
                path: 'event/notebook',
                loadChildren: './page/event-notebook/event-notebook.module#EventNotebookModule'
            },
            {
                path: 'setting/auditlog',
                loadChildren: './page/setting-auditlog/setting-auditlog.module#SettingAuditlogModule'
            },
            {
                path: 'setting/permission',
                loadChildren: './page/setting-permission/setting-permission.module#SettingPermissionModule'
            },
            {
                path: 'setting/users',
                loadChildren: './page/setting-users/setting-users.module#SettingUsersModule'
            },
            {
                path: 'setting/license',
                loadChildren: './page/setting-license/setting-license.module#SettingLicenseModule'
            }
        ],
    },
    { path: '**', redirectTo: '' },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    useHash: true,
});
