import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseUtils } from '@fuse/utils';

import { ReuniaoFormComponent } from '../formulario/reuniao-form.component';

@Component(
{
    selector     : 'reuniao-listas',
    templateUrl  : './reuniao-listas.component.html',
    styleUrls    : ['./reuniao-listas.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ReuniaoListasComponent implements OnInit, OnDestroy
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['Dia', 'HorarioInicio', 'HorarioFim', 'Secretario', 'aberta', 'buttonExcluir'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    // Private
    private _unsubscribeAll: Subject<any>;
    dialogRef: any;
    
    constructor(
        protected _gruposService: GruposInMemoryService,
        public dialog: MatDialog,
    )
    {
        this._unsubscribeAll = new Subject();
    }


    newReuniao()
    {
        this.dialogRef = this.dialog.open(ReuniaoFormComponent,
        {
            height: '550px',
            width: '500px',
            
            autoFocus: false,
            panelClass: 'reuniaoFormComponent',
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

                //this.tipoDocumentoService.add(response.getRawValue());

            });
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._reuniaoService, this.paginator, this.sort);

       
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

export class FilesDataSource extends DataSource<any>
{
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    constructor(
        private _gruposService: ReuniaoInMemoryService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._reuniaoService.objs;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._reuniaoService.onObjsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this._reuniaoService.objs.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );

    }

    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'dia':
                    [propertyA, propertyB] = [a.dia, b.dia];
                    break;
                case 'horarioIncio':
                    [propertyA, propertyB] = [a.horarioIncio, b.horarioIncio];
                    break;
                case 'horarioFim':
                    [propertyA, propertyB] = [a.horarioFim, b.horarioFim];
                    break;
                case 'secretario':
                    [propertyA, propertyB] = [a.secretario, b.secretario];
                    break;
                case 'aberta':
                    [propertyA, propertyB] = [a.aberta, b.aberta];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect(): void
    {
    }
}
