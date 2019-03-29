import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';

import { EqualNotValidatorDirective } from './validate-not-equal.directive';
import { EqualValidatorDirective } from './validate-equal.directive';
import { FedMaskDirective } from './mask.directive';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [
        EqualNotValidatorDirective,
        EqualValidatorDirective,
        FedMaskDirective
    ],
    imports     : [
        FuseSharedModule
    ],
    exports     : [
        EqualNotValidatorDirective,
        EqualValidatorDirective,
        FedMaskDirective
    ]
})
export class Core21DirectivesModule
{

}
