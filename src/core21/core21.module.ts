import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatPaginatorIntl } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { PtBrMomentDateAdapter } from './services/pt-br-moment-date-adapter/pt-br-moment-date-adapter';
import { ServicesInMemoryService } from './services/services-in-memory.service';
import { getPtBrPaginatorTranslate } from './services/mat-translate/mat-paginator-translate';
import { DynamicMatDataPickerWithMaskModule } from './components/dynamic-mat-datapicker-with-mask/dynamic-mat-datapicker-with-mask.module';
import { DateTimePickerModule } from './components/date-time-picker/date-time-picker.module';

@NgModule({
    declarations: [

    ],
    imports: [
        DynamicMatDataPickerWithMaskModule,
        DateTimePickerModule
    ],
    // exports     : [
    //     DynamicMatDataPickerWithMaskModule,
    //     DateTimePickerModule
    // ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: DateAdapter, useClass: PtBrMomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: MatPaginatorIntl, useValue: getPtBrPaginatorTranslate() },
        ServicesInMemoryService
    ],
    entryComponents : [

    ]
})
export class Core21Module
{

}
