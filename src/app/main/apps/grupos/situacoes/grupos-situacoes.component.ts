import * as _moment from 'moment';

import { fuseAnimations } from '@fuse/animations';

import { Component, Input, ViewEncapsulation } from '@angular/core';

_moment.locale('pt-br');

@Component(
{
    selector     : 'grupoNa-grupos-situacoes',
    templateUrl  : './grupos-situacoes.component.html',
    styleUrls    : ['./grupos-situacoes.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class GruposSituacoesComponent
{
    @Input()
    situacao: string;
}
