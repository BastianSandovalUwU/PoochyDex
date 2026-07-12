import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './modules/shared/app-header/app-header.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { LanguageService } from './modules/shared/services/language.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { AuthService } from './modules/auth/services/auth.service';
import { AuthInterceptor } from './modules/auth/auth.interceptor';

@NgModule({ declarations: [
        AppComponent,
        AppHeaderComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWithDelay:5000'
        })], providers: [LanguageService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideHttpClient(withXhr(), withInterceptorsFromDi())] })
export class AppModule { }
