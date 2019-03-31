import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Reuniao } from './reuniao.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';

@Component(
{
    selector     : 'reuniao.component',
    templateUrl  : './reuniao.component.html',
    styleUrls    : ['./reuniao.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ReuniaoComponent 
{
    reuniao: Reuniao;
    pageType: string;
    reuniaoForm: FormGroup;

    situacao: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _route: ActivatedRoute
    )
    {
        // Set the default
        this.reuniao = new Reuniao();

        this._route.params.subscribe(res => this.situacao = res.situacao);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
}
