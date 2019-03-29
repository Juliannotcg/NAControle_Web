import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class SearchBarService
{
    private _searchBarSubject: BehaviorSubject<any>;

    constructor() 
    { 
        this._searchBarSubject = new BehaviorSubject(_.cloneDeep(''));
    }

    set searchBar(value)
    {
        this._searchBarSubject.next(value);
    }

    get searchBar(): any | Observable<any>
    {
        return this._searchBarSubject.asObservable();
    }
}

