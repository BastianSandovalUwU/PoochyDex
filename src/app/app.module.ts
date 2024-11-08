import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageService } from './modules/shared/services/language.service';
import { NgxLoadingModule } from 'ngx-loading';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [LanguageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
