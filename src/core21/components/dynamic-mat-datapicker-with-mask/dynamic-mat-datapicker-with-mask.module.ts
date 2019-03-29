import { NgModule, Type } from '@angular/core';
import { MatDatepickerModule, MatInputModule } from '@angular/material';
import {
    DYNAMIC_FORM_CONTROL_MAP_FN,
    DynamicFormControlModel,
    DynamicFormControl,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER
} from '@ng-dynamic-forms/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { DynamicMatDataPickerWithMaskComponent } from './dynamic-mat-datapicker-with-mask.component';
import { Core21DirectivesModule } from '../../directives/directives.module';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';

@NgModule({
    declarations: [ DynamicMatDataPickerWithMaskComponent ],
    imports: [
        FuseSharedModule,

        MatDatepickerModule,
        MatInputModule,

        DynamicFormsMaterialUIModule,

        Core21DirectivesModule
    ],
    entryComponents: [ DynamicMatDataPickerWithMaskComponent ],
    providers: [
    {
        provide: DYNAMIC_FORM_CONTROL_MAP_FN,
        useValue: (model: DynamicFormControlModel): Type<DynamicFormControl> | null  =>
        {
            switch (model.type)
            {
                case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                    return DynamicMatDataPickerWithMaskComponent;
            }
        }
    }]
})
export class DynamicMatDataPickerWithMaskModule {}
