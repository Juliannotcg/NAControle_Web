import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Moment } from 'moment';

@Injectable()
export class PtBrMomentDateAdapter extends MomentDateAdapter
{

    constructor( @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
        super(dateLocale);
    }

    format(date: Moment, displayFormat: Object): string
    {
        return _moment(date).format('DD/MM/YYYY');
    }

    createDate(year: number, month: number, date: number): Moment
    {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error(`Índice do mês inválido "${month}". O índice do mês tem que estar entre 0 e 11.`);
        }

        if (date < 1) {
            throw Error(`Data inválida "${date}". A data deve ser maior que 0.`);
        }

        const result = _moment.utc({ year, month, date }).locale(this.locale);

        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Data inválida "${date}" por mês com índice "${month}".`);
        }

        return result;
    }
}
