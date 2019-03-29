import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Grupo } from '../grupos.model';
import { GruposInMemoryService } from '../grupos-in-memory.service';
import { Router } from '@angular/router';

@Component(
{
    selector     : 'grupoNa-grupos-cadastrar-editar',
    templateUrl  : './grupos-cadastrar-editar.component.html',
    styleUrls    : ['./grupos-cadastrar-editar.component.scss'],
    animations   : fuseAnimations

})
export class GruposCadastrarEditarComponent
{
    grupo: Grupo;
    pageType: string;
    grupoForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private formBuilder: FormBuilder,
        private _gruposService: GruposInMemoryService,
        private _router: Router,
    )
    {
        this.grupoForm = this.formBuilder.group({});
        // Set the default
        this.grupo = new Grupo();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    novaAnuencia(): void
    {
        this._gruposService.add(this.grupoForm.getRawValue()).then(() => this._router.navigate([`/grupos/novas`]));
    }

}
