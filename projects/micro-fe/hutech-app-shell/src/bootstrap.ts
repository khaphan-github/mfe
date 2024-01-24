import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

export const appConfig = {
  providers: [provideRouter(appRoutes)],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
