import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Grupo } from './grupos.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';

@Component(
{
    selector     : 'grupoNa-grupos',
    templateUrl  : './grupos.component.html',
    styleUrls    : ['./grupos.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class GruposComponent
{
    grupo: Grupo;
    pageType: string;
    grupoForm: FormGroup;

    situacao: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _route: ActivatedRoute
    )
    {
        // Set the default
        this.grupo = new Grupo();

        this._route.params.subscribe(res => this.situacao = res.situacao);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
}
