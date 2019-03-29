import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { GrupoFormDialogComponent } from './grupo-form/grupo-form.component';
import { FuseSetingsDefaultComponent } from '@fuse/components/fuse-settings-default.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { GrupoService } from './grupo.service';

@Component({
    selector     : 'grupo',
    templateUrl  : './grupo.component.html',
    styleUrls    : ['./grupo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class GrupoComponent extends FuseSetingsDefaultComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    searchInput: FormControl;
    fuseSettings: any;

    constructor(
        public grupoService: GrupoService,
        public dialog: MatDialog,
        protected _fuseConfigService: FuseConfigService
    )
    {
        super(_fuseConfigService);
        this.searchInput = new FormControl('');
    }

    ngOnInit()
    {
        this.searchInput
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    takeUntil(this._unsubscribeAll)
                )
                .subscribe(searchText => {
                    this.grupoService.onSearchTextChanged.next(searchText);
                });
        super.ngOnInit();
    }

    newGrupo()
    {
        this.dialogRef = this.dialog.open(GrupoFormDialogComponent, {
            panelClass: 'grupo-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this.grupoService.add(response.getRawValue());

            });
    }

    ngOnDestroy()
    {

    }
}
