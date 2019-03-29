import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Grupo } from './grupo.model';
import { MatSnackBar } from '@angular/material';
import { environment } from 'environments/environment';

@Injectable()
export class GrupoService implements Resolve<any>
{
    onGruposChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSearchTextChanged:  Subject<any> = new Subject();
    public grupos: Grupo[];

    searchText: string;

    private apiRoute = `${environment.api}api/values`;

    constructor(
        private http: HttpClient,
        public snackBar: MatSnackBar
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.get()
            ]).then(() => resolve(this.grupos), reject);
        });
    }

    get(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this.http
                    .get(this.apiRoute)
                    .subscribe((response: any) =>
                    {
                        this.grupos = response || [];
                        this.onGruposChanged.next(this.grupos);
                        resolve(this.grupos.sort((a, b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)));
                    }, reject);
            }
        );
    }

    add(grupo)
    {
        return new Promise((resolve, reject) => {

            this.http.post(this.apiRoute, {...grupo})
                .subscribe(response => {
                    this.get();

                    this.openSnackBar(response);

                    resolve(response);
                });
        });
    }

    update(grupo): any {
        return new Promise((resolve, reject) => {

            this.http.put(this.apiRoute, {...grupo})
                .subscribe(response => {
                    this.get();

                    this.openSnackBar(response);

                    resolve(response);
                });
        });
    }

    delete(grupo): any {
        return new Promise((resolve, reject) => {

            this.http.delete(`${this.apiRoute}/${grupo.id}`)
                .subscribe(response => {
                    this.grupos.splice(this.grupos.indexOf(grupo), 1);
                    this.onGruposChanged.next(this.grupos);

                    this.openSnackBar(response);

                    resolve(response);
                });
        });
    }


    openSnackBar(response: any)
    {
        this.snackBar.open(response.message, null,
        {
            duration: 3000,
        });
    }
}
