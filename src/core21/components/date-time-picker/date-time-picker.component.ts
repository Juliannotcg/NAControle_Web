import { Component, Input, OnInit, EventEmitter, ViewChild, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
    DynamicFormControlModel,
    DynamicDatePickerModel,
    DynamicInputModel,
    DynamicFormService,
    DynamicFormControlComponent,
    DynamicFormLayout,
    DynamicFormControlCustomEvent,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component(
{
    selector: 'date-time-picker',
    templateUrl: './date-time-picker.component.html'
})
export class DateTimePickerComponent extends DynamicFormControlComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any>;

    @Input() bindId = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(DateTimePickerComponent) myCustomFormControlComponent: DateTimePickerComponent;

    dateTimePickerForm: FormGroup;
    dateTimePickerFormModel: DynamicFormControlModel[] =
    [
        new DynamicDatePickerModel(
        {
            id: 'data',
            inline: false,
            placeholder: 'Data',
            min: new Date(1900, 0, 1),
            max: new Date(Date.now()),
            validators: {
                required: null
            },
            errorMessages:
            {
                required: 'O campo Data é obrigatório'
            }
        }),

        new DynamicInputModel(
        {
            id: 'hora',
            placeholder: 'Hora',
            inputType: 'time',
            validators: {
                required: null
            },
            errorMessages:
            {
                required: 'O campo Hora é obrigatório'
            }
        })
    ];

    constructor(
        protected layoutService: DynamicFormLayoutService,
        protected validationService: DynamicFormValidationService,
        private _formService: DynamicFormService)
    {
        super(layoutService, validationService);
        this.dateTimePickerForm = this._formService.createFormGroup(this.dateTimePickerFormModel);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.group.addControl(this.model.id, new FormControl());
        this.dateTimePickerForm.statusChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() =>
        {
            const date = new Date(this.dateTimePickerForm.get('data').value);
            const hora = this.dateTimePickerForm.get('hora').value;

            if (hora)
            {
                const horaMinuto = hora.split(':');
                date.setUTCHours(horaMinuto[0], horaMinuto[1]);
            }

            this.group.get(this.model.id).patchValue(date);
        });

        this.group.get(this.model.id).valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((date) =>
        {
            if (typeof(date) === 'string')
            {
                const dataHora = date.split('T');
                this.dateTimePickerForm.patchValue(
                {
                    data: dataHora[0],
                    hora: dataHora[1].substring(0, 5)
                });
            }
        });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.unsubscribe();
    }
}
