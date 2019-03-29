import { NgModule } from '@angular/core';

import { Core21Module } from './core21.module';
import { Core21DirectivesModule } from './directives/directives.module';
import { StorageService } from './services/storage.service';

@NgModule({
    declarations: [
    ],
    imports     : [
        Core21DirectivesModule,
        Core21Module
        
    ],
    exports     : [
        Core21DirectivesModule,
        Core21Module
    ],
    providers: [
        StorageService
    ]
})
export class Core21SharedModule
{
}
