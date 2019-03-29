import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Guid } from 'guid';
import { NotificationService } from './notification.service';
import { AuthService } from 'core21/auth/auth.service';

@Injectable()
export class DataService 
{
    constructor(
        private http: HttpClient, 
        private securityService: AuthService,
        private _notificationService: NotificationService
    ) { }

    get(url: string): Observable<any> 
    {
        return this.http
                        .get(url, this.setHeaders())
                        .pipe(
                            map((res: any) => res),
                            catchError(this.handleError)
                        );
    }

    postWithId(url: string, data: any): Observable<any> 
    {
        return this.doPost(url, data, true);
    }

    post(url: string, data: any): Observable<any> 
    {
        return this.doPost(url, data, false);
    }

    putWithId(url: string, data: any): Observable<any> 
    {
        return this.doPut(url, data, true);
    }

    private doPost(url: string, data: any, needId: boolean): Observable<any> 
    {
        return this.http
                        .post(url, data, this.setHeaders(needId))
                        .pipe(
                            map((res: any) => res),
                            catchError(this.handleError)
                        );
    }
    
    delete(url: string): void
    {
        this.http.delete(url, this.setHeaders()).pipe(catchError(this.handleError));
    }

    private handleError(error: any): Observable<never>
    {
        if (error.error instanceof ErrorEvent)
        {
            const message = `Ocorreu um erro de rede no lado do cliente: ${error.error.message}`;
            this._notificationService.notifyErrorMessage(message);
            console.error(message);
        } 
        else 
        {
            const message = 'Backend - ' +
                            `status: ${error.status}, ` +
                            `statusText: ${error.statusText}, ` +
                            `message: ${error.error.message}`;

            this._notificationService.notifyErrorMessage(message);
            console.error(message);
        }

        return throwError(error || 'server error');
    }

    private doPut(url: string, data: any, needId: boolean): Observable<any> 
    {
        return this.http
                        .put(url, data, this.setHeaders(needId))
                        .pipe(
                            map((res: any) => res),
                            catchError(this.handleError)
                        );
    }

    private setHeaders(needId?: boolean): any
    {
        const options = {};
        if (needId && this.securityService) 
        {            
            options['headers'] = new HttpHeaders()
                .append('authorization', 'Bearer ' + this.securityService.getToken())
                .append('x-requestid', Guid.newGuid());
        }
        else if (this.securityService) 
        {            
            options['headers'] = new HttpHeaders()
                .append('authorization', 'Bearer ' + this.securityService.getToken());
        }
    }
}
