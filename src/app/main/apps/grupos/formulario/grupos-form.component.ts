import { Subject, Observable } from 'rxjs';
import * as _moment from 'moment';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Grupo } from '../grupos.model';
import { CartoriosService } from 'app/main/third-party-services/cartorios.service';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { TitulosService } from 'app/main/third-party-services/titulos.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DocumentsValidate } from 'core21/utils/documents-validate';

_moment.locale('pt-br');

@Component(
{
    selector     : 'grupoNa-grupos-form',
    templateUrl  : './grupos-form.component.html',
    styleUrls    : ['./grupos-form.component.scss'],
    animations   : fuseAnimations

})
export class GruposFormComponent implements OnInit
{
    @Input() form: FormGroup;
    grupo: Grupo;
    pageType: string;
    grupoForm: FormGroup;
    progressBar = false;

    habilitaBusca = false;

    minDate = new Date(1900, 0, 1);
    maxDate = new Date(Date.now());

    maskCpfCnpj: string;

    // Private
    private _unsubscribeAll: Subject<any>;
    
    cartorios: any;

    filteredOptions: Observable<any[]>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    constructor( 
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _cartoriosService: CartoriosService,
        private _titulosService: TitulosService
    )
    {
        // Set the default
        this.grupo = new Grupo();

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.grupoForm = this.formBuilder.group({});
    }

    ngOnInit(): void
    {        
        this.form.addControl('id', new FormControl(this.grupo.id));
        this.form.addControl('nome', new FormControl(this.grupo.nome));
        this.form.addControl('latitude', new FormControl(this.grupo.latitude));
        this.form.addControl('longitude', new FormControl({ value: this.grupo.longitude, disabled: true }));
        this.form.addControl('label', new FormControl({ value: this.grupo.label, disabled: true }));
        this.form.addControl('draggable', new FormControl({ value: this.grupo.draggable, disabled: true }));
        this.form.addControl('iconUrl', new FormControl({ value: this.grupo.iconUrl, disabled: true }));

        this.form.setValidators((controls) => 
        {
            const t = controls.get('nome').value ? null : { 'validateNome': true };
            return t;
        });
    
        this.form.statusChanges.subscribe(() => this.habilitaBusca = this.form.get('documentoDevedor').valid 
                                                                        && 
                                                                    this.form.get('cartorio').valid 
                                                                        && 
                                                                    this.form.get('numeroTitulo').valid);

        this.form.get('documentoDevedor').valueChanges.subscribe(control => 
        {
            if (control.length > 11)
            {
                this.maskCpfCnpj = '00.000.000/0000-00';
                this.form.get('documentoDevedor').setValidators(DocumentsValidate.cnpj);
            }
            else
            {
                this.maskCpfCnpj = '000.000.000-000';
                this.form.get('documentoDevedor').setValidators(DocumentsValidate.cpf);
            }
        });

        
        this._cartoriosService.get().then(response =>  
        {
            this.cartorios = response._embedded.cartorio;
            this.form.get('cartorio').setValidators(this.validateCartorioInList(response._embedded.cartorio));
            this.form.get('cartorio').updateValueAndValidity();

            this.filteredOptions = this.form.get('cartorio').valueChanges
                                            .pipe(
                                                startWith<string | any>(''),
                                                map((value: any) => typeof value === 'string' ? value : value.nome),
                                                map(nome => nome ? this._filter(nome) : this.cartorios.slice())
                                            );
        });
    }

    displayFn = (cartorio?: any): string | undefined => 
        cartorio ? cartorio.nome : undefined
      
    private _filter = (value: string): string[]  =>
        this.cartorios.filter(cartorio => cartorio.nome.toLowerCase().indexOf(value.toLowerCase()) === 0)

    buscaTitulo(): void
    {
        this.progressBar = true;
        const dadosForm = this.form.getRawValue();
        this._titulosService.get( dadosForm.numeroTitulo, dadosForm.cartorio.id, dadosForm.documentoDevedor).then(titulo => 
        {
            if (titulo)
            {
                this.form.patchValue(
                {
                    valorTitulo: titulo.valor,
                    numeroProtocolo: titulo.protocolo,
                    dataVencimento: _moment(titulo.dataVencimento, 'dd/MM/yyyy').toDate(),
                    nomeDevedor: this.obterNomeDevedor(titulo.devedores, dadosForm.documentoDevedor)
                });
                this.form.updateValueAndValidity();

                this.habilitarCamposCadastro();
            }
            else
            {
                this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, { disableClose: false });
                
                this.confirmDialogRef.componentInstance.confirmMessage = 'Não foi encontrado nenhum título com os dados informados.' + 
                ' Deseja continuar o cadastro?';

                this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => 
                {
                    if ( result )
                        this.habilitarCamposCadastro(true);
                    
                    this.confirmDialogRef = null;
                });
            }

            this.progressBar = false;
        });
    }

    obterNomeDevedor = (devedores: any[], documento: string): any =>
        devedores.find(devedor => devedor.documento === documento).nome

    habilitarCamposCadastro(novo: boolean = false): void
    {
        this.form.get('documentoDevedor').disable();
        this.form.get('numeroTitulo').disable();
        this.form.get('cartorio').disable();
        
        this.form.get('emailDevedor').enable();
        this.form.get('telefoneDevedor').enable();

        if (novo)
        {
            this.form.get('nomeDevedor').enable();
            this.form.get('numeroProtocolo').enable();
            this.form.get('valorTitulo').enable();
            this.form.get('dataVencimento').enable();
        }
    }

    validateCartorioInList(cartorios: any[]): ValidatorFn 
    {
        return (control: AbstractControl): ValidationErrors | null => 
            cartorios && cartorios.find(cartorio => cartorio.nome === control.value.nome) ? null : { 'validateCartorio': true };
    }
}
