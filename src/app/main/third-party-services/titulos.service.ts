import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class TitulosService 
{

    constructor(private _http: HttpClient)
    {
    }

    get = (numeroTitulo: string, idCartorio: string, documentoDevedor: string): Promise<any> =>
        new Promise((resolve, reject) => 
        {
            this._http
                .get(`${ environment.apiCra21 }titulo?idCartorio=${ idCartorio }&numeroTitulo=${ numeroTitulo }&documentoDevedor=${ documentoDevedor }`,
                {
                    headers: 
                    { 
                        'Authorization': 'Basic Y3JhcnM6cDIxJnNob3c=', 
                        'Accept': 'application/json'
                    }
                })
                .subscribe((response: any) => resolve(response._embedded.titulo[0]), reject);
        });
}