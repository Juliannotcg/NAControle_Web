import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthErrosInterceptor implements HttpInterceptor 
{
    private _state: RouterStateSnapshot;

    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        return next.handle(request).pipe(catchError(error =>
        {
            if (error.status === 401 || error.status === 403) 
            {
                this._authService.logoff(window.location.href);
            }
            
            const _error = error.error.message || error.statusText;
            return throwError(_error);
        }));
    }
}
