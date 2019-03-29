import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorIntl,
    MatTooltipModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSearchBarModule } from '@fuse/components';

import { GrupoService } from './grupo.service';
import { GrupoComponent } from './grupo.component';
import { GrupoFormDialogComponent } from './grupo-form/grupo-form.component';
import { GrupoListComponent } from './grupo-list/grupo-list.component';


const routes: Routes = [
    {
        path     : 'grupo',
        component: GrupoComponent,
        resolve  : {
            grupos: GrupoService
        }
    }
];

@NgModule({
    declarations   : [
        GrupoComponent,
        GrupoFormDialogComponent,
        GrupoListComponent
    ],
    imports        : [
        RouterModule.forChild(routes),
        CdkTableModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSidenavModule,
        MatTableModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        FuseSearchBarModule,
        MatTooltipModule,


        FuseSharedModule,
        FuseConfirmDialogModule
    ],
    providers      : [
        GrupoService
    ],
    entryComponents: [GrupoFormDialogComponent]
})
export class GrupoModule
{
}
