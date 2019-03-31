import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FuseSetingsDefaultComponent } from 'core21/components/fuse-settings-default.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { Reuniao } from '../reuniao.model';

export interface Dias {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'reuniaoFormComponent',
  templateUrl: 'reuniao-form.component.html',
  styleUrls: ['reuniao-form.component.scss'],
})
export class ReuniaoFormComponent extends FuseSetingsDefaultComponent implements OnInit {

  reuniaoForm: FormGroup;
  reuniaoFormErrors: any;
  action: string;
  reuniao: Reuniao;
  validateIfAlreadyExists: boolean;
  fuseSettings: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  //diasControl = new FormControl('', [Validators.required]);
  dias: Dias[] = [
    { value: 'segunda', viewValue: 'Segunda-Feira' },
    { value: 'terca', viewValue: 'Terça-Feira' },
    { value: 'quarta', viewValue: 'Quarta-Feira' },
    { value: 'quinta', viewValue: 'Quinta-Feira' },
    { value: 'sexta', viewValue: 'Sexta-Feira' },
    { value: 'sabado', viewValue: 'Sabado' },
    { value: 'domingo', viewValue: 'Domingo' }
  ];


  constructor(
    public dialogRef: MatDialogRef<ReuniaoFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    protected _fuseConfigService: FuseConfigService
  ) {
    super(_fuseConfigService);

    this.action = data.action;

    if (this.action === 'new') 
    {
      this.reuniao = new Reuniao({});
    }
    
    this.reuniaoForm = this.createReuniaoForm();
    this.validateIfAlreadyExists = false;
  }

  createReuniaoForm() {
    return this.formBuilder.group({
      id: [this.reuniao.id],
      dia: [this.reuniao.dia],
      horarioInicio: [this.reuniao.horarioInicio],
      horarioFim: [this.reuniao.horarioFim],
      aberta: [this.reuniao.aberta],
      secretario: [this.reuniao.secretario]
    });
  }

  editReuniaoForm() {
    return this.formBuilder.group({
      id: [this.reuniao.id],
      dia: [this.reuniao.dia],
      horarioInicio: [this.reuniao.horarioInicio],
      horarioFim: [this.reuniao.horarioFim],
      aberta: [this.reuniao.aberta],
      secretario: [this.reuniao.secretario]
    });
  }
}