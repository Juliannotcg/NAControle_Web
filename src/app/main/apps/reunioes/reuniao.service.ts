import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ReuniaoService implements Resolve<any>
{
    routeParams: any;
    reuniao: any;
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
                        this.reuniao = response;
                        this.onProductChanged.next(this.reuniao);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Salvar grupo
     *
     * @param reuniao
     * @returns {Promise<any>}
     */
    saveProduct(reuniao): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/grupos/' + reuniao.id, reuniao)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add grupo
     *
     * @param reuniao
     * @returns {Promise<any>}
     */
    addProduct(reuniao): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/grupos/', reuniao)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
