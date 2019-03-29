import { Directive, OnInit, OnDestroy, HostBinding, Input, ElementRef } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
    selector: `fed-mask, [fed-mask], [fedMask]`
})
export class FedMaskDirective implements OnInit, OnDestroy
{
    @HostBinding('class.fed-mask') compClass = true;

    @Input() fedMask =
    {
        mask: [],
        showMask: false,
        guide: true,
        placeholderChar: '_',
        type: ''
    };

    maskedInputController;

    constructor(private element: ElementRef) { }

    ngOnInit(): void {

        if (this.fedMask.type === 'date')
        {
           this.fedMask.mask = [
                    new RegExp('\\d'),
                    new RegExp('\\d'),
                    '/',
                    new RegExp('\\d'),
                    new RegExp('\\d'),
                    '/',
                    new RegExp('\\d'),
                    new RegExp('\\d'),
                    new RegExp('\\d'),
                    new RegExp('\\d')
            ];
        }

        this.maskedInputController = textMask.maskInput({
            inputElement: this.element.nativeElement,
            ...this.fedMask
        });
    }

    ngOnDestroy()
    {
        if (this.maskedInputController)
            this.maskedInputController.destroy();
    }
}
