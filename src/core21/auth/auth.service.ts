import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { StorageService } from 'core21/services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService 
{
    private authenticationSource = new Subject<boolean>();
    authenticationChallenge$ = this.authenticationSource.asObservable();

    public UserData: any;
    public IsAuthorized: boolean;

    constructor( 
        private _storageService: StorageService,
        private _router: Router
    )
    {
        if (this._storageService.retrieve('IsAuthorized') !== '') 
        {
            this.IsAuthorized = this._storageService.retrieve('IsAuthorized');
            this.authenticationSource.next(true);
            this.UserData = this._storageService.retrieve('userData');
        }
    }

    public getToken(): any 
    {
        return this._storageService.retrieve('authorizationData');
    }

    public resetAuthorizationData(): void
    {
        this._storageService.store('authorizationData', '');

        this.IsAuthorized = false;
        this._storageService.store('IsAuthorized', false);
    }

    public setAuthorizationData(token: any): void
    {
        if (this._storageService.retrieve('authorizationData') !== '') 
        {
            this._storageService.store('authorizationData', '');
        }

        this._storageService.store('authorizationData', token);
        this.IsAuthorized = true;
        this._storageService.store('IsAuthorized', true);
    }

    public authorize(): void
    {
        this.resetAuthorizationData();

        window.location.href = environment.authorityUrl;
    }

    public authorizedCallback(): void
    {
        this.resetAuthorizationData();

        const hash = window.location.hash.substr(1);

        const result: any = hash.split('&').reduce((result: any, item: string) =>
        {
            const parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        this._storageService.store('token', result);

        let token = '';

        if (!result.error) 
        {
            token = result.access_token;
            this.setAuthorizationData(token);
        }

        this._router.navigate([window.location.pathname]);
    }

    public logoff(returnUrl?: string): void
    {
        this.resetAuthorizationData();
        this.authenticationSource.next(false);

        window.location.href = `${environment.authorityUrl}?returnUrl=${returnUrl || ''}`;
    }
}
