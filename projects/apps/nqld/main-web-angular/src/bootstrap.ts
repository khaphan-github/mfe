import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppChildComponent } from './app/app.component';

bootstrapApplication(AppChildComponent, appConfig).catch((err) =>
  console.error(err)
);
