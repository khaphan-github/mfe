import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TranslocoRootModule, ToastrModule } from "@erp/angular/components";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { AppRoutingModule } from "./app/app.routing.module";

const APP_BOOTSTRAP_CONFIG = {
  providers: [
    importProvidersFrom([
      // Core lib modules
      BrowserModule,
      HttpClientModule, 
      BrowserAnimationsModule,

      // Global modules
      AppRoutingModule,
      TranslocoRootModule,
      ToastrModule.forRoot({
        timeOut: 3000,
      }),
    ]), 
    provideAnimations(),
    // Interceptor http provider
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpRequestInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpResponseInterceptor,
    //   multi: true,
    // },
  ],
}
bootstrapApplication(AppComponent, APP_BOOTSTRAP_CONFIG)