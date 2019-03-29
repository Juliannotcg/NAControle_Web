import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';


@Directive({
    selector: '[validateNotEqual][formControlName],[validateNotEqual][formControl],[validateNotEqual][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EqualNotValidatorDirective),
            multi: true
        }
    ]
})
export class EqualNotValidatorDirective implements Validator
{
    @Input('validateNotEqual') validateNotEqual: any;

    validate(c: AbstractControl): { [key: string]: any }
    {
        if (this.validateNotEqual.value === c.value)
            return { validateNotEqual: true };

        return null;
    }
}
