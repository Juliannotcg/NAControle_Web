import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { Observable, merge, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { GrupoService } from '../grupo.service';
import { SearchBarService } from '@fuse/components/search-bar/search-bar.service';
import { GrupoFormDialogComponent } from '../grupo-form/grupo-form.component';

@Component({
    selector     : 'grupo-list',
    templateUrl  : './grupo-list.component.html',
    styleUrls    : ['./grupo-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class GrupoListComponent implements OnInit
{
    protected _unsubscribeAll: Subject<any>;

    grupo: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['nome', 'sigla', 'buttons'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dialogRef: any;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private grupoService: GrupoService,
        public dialog: MatDialog,
        private _searchBarService: SearchBarService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this.grupoService, this.paginator, this.sort);

        this.grupoService
            .onSearchTextChanged
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((filter) =>
            {

                if ( !this.dataSource ) { return; }
                this.dataSource.filter = filter;
            });

            this._searchBarService
                    .searchBar
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(value => this.dataSource.filter = value);
    }

    editOrgaoEmissor(grupo): void
    {
        this.dialogRef = this.dialog.open(GrupoFormDialogComponent, {
            panelClass: 'orgao-emissor-form-dialog',
            data      : {
                grupo: grupo,
                action : 'edit'
            }
        });

        this.dialogRef
                .afterClosed()
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(response => {
                    if ( !response )
                    {
                        return;
                    }
                    const actionType: string = response[0];
                    const formData: FormGroup = response[1];
                    switch ( actionType )
                    {
                        case 'save':
                            this.grupoService.update(formData.getRawValue());
                            break;
                        case 'delete':
                            this.delete(grupo);
                            break;
                    }
                });
    }

    delete(orgaoEmissor): void
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Tem certeza de que deseja excluir?';

        this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
            if ( result )
            {
                this.grupoService.delete(orgaoEmissor);
            }
            this.confirmDialogRef = null;
        });

    }

}

export class FilesDataSource extends DataSource<any>
{
    _filterChange = new BehaviorSubject('');
    _filteredDataChange = new BehaviorSubject('');

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

    constructor(private grupoService: GrupoService,
                private _paginator: MatPaginator,
                private _sort: MatSort)
    {

        super();
        this.filteredData = this.grupoService.grupos;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.grupoService. onGruposChanged,
            this._paginator.page,
            this._filterChange,
            this._sort.sortChange
        ];

        return merge(...displayDataChanges)
                    .pipe(map(() =>
                    {
                        let data = this.grupoService.grupos.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                        return data.splice(startIndex, this._paginator.pageSize);
                    }
               ));
    }

    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data)
        :
        any[]
    {
        if ( !this._sort.active || this._sort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._sort.active )
            {
                case 'nome':
                    [propertyA, propertyB] = [a.nome, b.nome];
                    break;
                case 'sigla':
                    [propertyA, propertyB] = [a.sigla, b.sigla];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;


            return (valueA.toString().localeCompare(valueB.toString(), 'pt-BR', { sensitivity: 'base' })) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect(): void
    {
    }
}
