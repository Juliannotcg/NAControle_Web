import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component(
{
    selector     : 'grupoNa-components',
    templateUrl  : './components.component.html',
    styleUrls    : ['./components.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class grupoNaComponentsComponent implements OnInit
{

    constructor() 
    { 
    }

    ngOnInit(): void
    {

    }
}
