import { NgModule, Type } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { DateTimePickerComponent } from './date-time-picker.component';
import { DynamicFormsCoreModule, DYNAMIC_FORM_CONTROL_MAP_FN, DynamicFormControlModel, DynamicFormControl, DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER } from '@ng-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { DynamicMatDataPickerWithMaskModule } from '../dynamic-mat-datapicker-with-mask/dynamic-mat-datapicker-with-mask.module';
import { DYNAMIC_FORM_CONTROL_TYPE_DATETIMEPICKER } from './dynamic-form-control-type-datetimepickr';
import { DynamicMatDataPickerWithMaskComponent } from '../dynamic-mat-datapicker-with-mask/dynamic-mat-datapicker-with-mask.component';

@NgModule({
    declarations: [ DateTimePickerComponent ],
    imports: [
        FuseSharedModule,


        DynamicFormsCoreModule.forRoot(),
        DynamicFormsMaterialUIModule,

        DynamicMatDataPickerWithMaskModule
    ],
    entryComponents: [ DateTimePickerComponent ],
    providers: [
    {
        provide: DYNAMIC_FORM_CONTROL_MAP_FN,
        useValue: (model: DynamicFormControlModel): Type<DynamicFormControl> | null  =>
        {

            switch (model.type)
            {
                case DYNAMIC_FORM_CONTROL_TYPE_DATETIMEPICKER:
                    return DateTimePickerComponent;
                case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                    return DynamicMatDataPickerWithMaskComponent;
            }
        }
    }]
})
export class DateTimePickerModule {}
