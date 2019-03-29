import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LabelOptions, MAT_LABEL_GLOBAL_OPTIONS, MatDatepicker, MatInput } from '@angular/material';
import {
    DynamicDatePickerModel,
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { DynamicMaterialDatePickerComponent } from '@ng-dynamic-forms/ui-material';

@Component(
{
    selector: 'dynamic-mat-datepicker-with-mask',
    templateUrl: './dynamic-mat-datapicker-with-mask.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicMatDataPickerWithMaskComponent extends DynamicMaterialDatePickerComponent
{
    @Input() bindId = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_LABEL_GLOBAL_OPTIONS) @Optional() public LABEL_OPTIONS: LabelOptions) {

        super(layoutService, validationService, LABEL_OPTIONS);
    }
}
