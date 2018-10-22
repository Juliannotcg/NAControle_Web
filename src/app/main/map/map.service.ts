import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Marker } from './map.model';
import { MatSnackBar } from '@angular/material';
import { environment } from 'environments/environment';

@Injectable()
export class MapService
{
    onTipoDocumentoChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSearchTextChanged:  Subject<any> = new Subject();
    tiposDocumento: Marker[];

    searchText: string;

    constructor(private http: HttpClient,
                public snackBar: MatSnackBar)
    {
    }

    get(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this.http
                    .get(environment.api + 'api/TipoDocumento')
                    .subscribe((response: any) =>
                    {
                        this.tiposDocumento = response;
                        this.onTipoDocumentoChanged.next(this.tiposDocumento);
                        resolve(this.tiposDocumento);
                    }, reject);
            }
        );
    }

    add(tipoDocumento): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this.http.post(environment.api + 'api/TipoDocumento', {...tipoDocumento})
                .subscribe(response => {
                    this.get();

                    this.openSnackBar(response);

                    resolve(response);
                });
        });
    }

    update(tipoDocumento): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this.http.put(environment.api + 'api/TipoDocumento', {...tipoDocumento})
                .subscribe(response => {
                    this.get();

                    this.openSnackBar(response);

                    resolve(response);
                });
        });
    }

    delete(tipoDocumento): Promise<any> 
    {
        return new Promise((resolve, reject) => {

            this.http.delete(environment.api + 'api/TipoDocumento/' + tipoDocumento.id)
                .subscribe(response => {
                    this.tiposDocumento.splice(this.tiposDocumento.indexOf(tipoDocumento), 1);
                    this.onTipoDocumentoChanged.next(this.tiposDocumento);

                    this.openSnackBar(response);

                    resolve(response);
                });
        });
    }


    openSnackBar(response: any): void
    {
        this.snackBar.open(response.message, null,
        {
            duration: 3000,
        });
    }
}
