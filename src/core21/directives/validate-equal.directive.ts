import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EqualValidatorDirective),
            multi: true
        }
    ]
})
export class EqualValidatorDirective implements Validator
{
    @Input('validateEqual') validateEqual: any;

    validate(c: AbstractControl): { [key: string]: any }
    {
        if (this.validateEqual.value !== c.value)
            return { validateEqual: true };

        return null;
    }
}
