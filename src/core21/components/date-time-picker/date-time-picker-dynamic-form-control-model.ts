import { DynamicFormControlModel, DynamicFormControlModelConfig } from '@ng-dynamic-forms/core';
import { DYNAMIC_FORM_CONTROL_TYPE_DATETIMEPICKER } from './dynamic-form-control-type-datetimepickr';

export class DateTimePickerDynamicFormControlModel extends DynamicFormControlModel
{
    readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DATETIMEPICKER;

    constructor(model: DynamicFormControlModelConfig)
    {
        super(model);
    }
}
