import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Core21SharedModule } from 'core21/core21-shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatTabsModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { GruposModule } from '../apps/grupos/grupos.module';
import { grupoNaComponentsComponent } from './components.component';

const routes: Routes = [
    {
        path     : '',
        component: grupoNaComponentsComponent,
    }
];

@NgModule({
    declarations   : [
        grupoNaComponentsComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        FuseSharedModule,

        Core21SharedModule,

        MatTabsModule,
        MatExpansionModule,
        MatIconModule,

        GruposModule

    ],
    providers: []
})
export class grupoNaComponentsModule
{
}
