import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class GruposService implements Resolve<any>
{
    routeParams: any;
    grupo: any;
    onProductChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onProductChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get grupo
     *
     * @returns {Promise<any>}
     */
    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get('api/grupos/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.grupo = response;
                        this.onProductChanged.next(this.grupo);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Salvar grupo
     *
     * @param grupo
     * @returns {Promise<any>}
     */
    saveProduct(grupo): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/grupos/' + grupo.id, grupo)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add grupo
     *
     * @param grupo
     * @returns {Promise<any>}
     */
    addProduct(grupo): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/grupos/', grupo)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
