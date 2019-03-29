import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor 
{
    constructor(private _authService: AuthService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        if (!request.url.includes('https://viacep.com.br') && this._authService.IsAuthorized) 
        {
            request = request.clone(
            {
                setHeaders: 
                { 
                    Authorization: `Bearer ${this._authService.getToken()}`
                }
            });
        }

        return next.handle(request);
    }
}
