import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

import { CalendarEvent } from 'angular-calendar';

import { Grupo } from '../grupo.model';
import { GrupoService } from '../grupo.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseConfigService } from '@fuse/services/config.service'
import { FuseSetingsDefaultComponent } from '@fuse/components/fuse-settings-default.component';;
import { takeUntil } from 'rxjs/operators';

@Component({
    selector     : 'grupo-form-dialog',
    templateUrl  : './grupo-form.component.html',
    styleUrls    : ['./grupo-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GrupoFormDialogComponent extends FuseSetingsDefaultComponent  implements OnInit, OnDestroy
{
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    event: CalendarEvent;
    dialogTitle: string;
    grupoForm: FormGroup;
    grupoFormErrors: any;
    action: string;
    grupo: Grupo;
    validateIfAlreadyExists: boolean;
    // fuseSettings: any;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        public dialogRef: MatDialogRef<GrupoFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private grupoService: GrupoService,
        public dialog: MatDialog,
        protected _fuseConfigService: FuseConfigService
    )
    {
        super(_fuseConfigService);

        this.action = data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar órgão emissor';
            this.grupo = data.grupo;
        }
        else
        {
            this.dialogTitle = 'Cadastrar órgão emissor';
            this.grupo = new Grupo({});
        }
        this.grupoForm = this.createOrgaiEmissorForm();

        this.grupoFormErrors = {
            id      : '',
            nome    : '',
            sigla   : ''
        };

        this.validateIfAlreadyExists = false;
    }

    ngOnInit(): void
    {
        super.ngOnInit();

        this.grupoForm
                .statusChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    this.onFormValuesChanged();
                });
    }

    createOrgaiEmissorForm()
    {
        return this.formBuilder.group({
            id      : [this.grupo.id],
            nome    : [this.grupo.nome, null, this.onControlNomeValuesChanged.bind(this)],
            sigla   : [this.grupo.sigla]
        });
    }

    confirmUpdate()
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Tem certeza de que deseja salvar alteração?';

        this.confirmDialogRef
                .afterClosed()
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(result =>
                {
                    if ( result )
                        this.dialogRef.close(['save', this.grupoForm]);

                    this.confirmDialogRef = null;
                });
    }

    onFormValuesChanged()
    {
        for ( const field in this.grupoFormErrors )
        {
            if ( !this.grupoFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.grupoFormErrors[field] = {};

            // Get the control
            const control = this.grupoForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.grupoFormErrors[field] = control.errors;
            }
        }
    }

    onControlNomeValuesChanged(controlNome: any)
    {
        return new Promise((resolve, reject) =>
        {
            if (this.grupoService
                    .grupos
                    .filter(_orgaoEmissor => _orgaoEmissor.id !== this.grupo.id
                                                &&
                                             _orgaoEmissor
                                                .nome
                                                .localeCompare(controlNome.value, 'pt-BR', { sensitivity: 'base' }) === 0)
                    .length > 0)
                    resolve({ validateIfAlreadyExists: false });
            else
                resolve(null);
        });
    }
}
