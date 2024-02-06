import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { TranslocoRootModule } from "@erp/angular/components";
import { MFE_ROUTES } from "./app/configs/mfe.routes";

const APP_BOOTSTRAP_CONFIG = {
  providers: [
    importProvidersFrom([
      // Core lib modules
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,

      // Global modules
      TranslocoRootModule,
      RouterModule.forRoot(MFE_ROUTES),
    ]),
    provideAnimations(),
  ],
}
bootstrapApplication(AppComponent, APP_BOOTSTRAP_CONFIG)
