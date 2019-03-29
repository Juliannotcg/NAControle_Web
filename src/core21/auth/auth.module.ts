import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { Core21SharedModule } from 'core21/core21-shared.module';
import { AuthErrosInterceptor } from './auth-errors.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
        Core21SharedModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthErrosInterceptor, multi: true }
    ],
})
export class AuthModule { }
