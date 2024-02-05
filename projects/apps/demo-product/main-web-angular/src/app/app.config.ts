import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { BrowserModule } from '@angular/platform-browser';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom([
      BrowserModule, 
      BrowserAnimationsModule,
      PortalModule,
    ])
  ],

};
