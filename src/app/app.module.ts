import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { Core21SharedModule } from 'core21/core21-shared.module';
import { ReuniaoModule } from './main/apps/reunioes/reuniao.module';

const appRoutes: Routes = [
    {
        path        : 'components',
        loadChildren: './main/components/components.module#grupoNaComponentsModule'
    },
    {
        path        : 'grupos',
        loadChildren: './main/components/components.module#grupoNaComponentsModule'
    },
    {
        path        : 'reunioes',
        loadChildren: './main/components/components.module#grupoNaComponentsModule'
    },
    {
        path        : '**',
        redirectTo  : 'grupos'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ReuniaoModule,
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        Core21SharedModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        ReuniaoModule


    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
