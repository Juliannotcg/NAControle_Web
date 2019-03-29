import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class CartoriosService 
{

    constructor(private _http: HttpClient)
    {
    }

    get = (): Promise<any> =>
        new Promise((resolve, reject) => 
        {
            this._http
                .get(environment.apiCra21 + 'cartorio',
                {
                    headers: 
                    { 
                        'Authorization': 'Basic Y3JhcnM6cDIxJnNob3c=', 
                        'Accept': 'application/json'
                    }
                })
                .subscribe((response: any) => resolve(response), reject);
        });
}