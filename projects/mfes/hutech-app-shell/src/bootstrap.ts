import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslocoRootModule, ToastrModule } from 'projects/libs/frontend/angular/components/src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export const appConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom([
      // Core lib modules
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,

      // Global modules
      TranslocoRootModule,
      ToastrModule.forRoot({
        timeOut: 3000,
      }),
    ]),],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
