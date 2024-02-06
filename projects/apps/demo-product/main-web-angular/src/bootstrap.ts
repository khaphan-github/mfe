import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TranslocoRootModule, ToastrModule, MAT_PAGINATOR_DEFAULT_OPTIONS, GLOBAL_CONFIG_PAGE_SIZE, MatPaginatorDefaultOptions, TOAST_CONFIG, DefaultNoComponentGlobalConfig } from "@erp/angular/components";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { MFE_ROUTES } from "./app/configs/mfe.routes";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app/app.component";

const APP_BOOTSTRAP_CONFIG = {
  providers: [
    importProvidersFrom([
      // Core lib modules
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,

      // Global modules
      RouterModule.forRoot(MFE_ROUTES),
      TranslocoRootModule,
      ToastrModule.forRoot({
        timeOut: 3000,
      }),
    ]),
    provideAnimations(),
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: GLOBAL_CONFIG_PAGE_SIZE as MatPaginatorDefaultOptions
    },
    {
      provide: TOAST_CONFIG,
      useValue: {
        default: DefaultNoComponentGlobalConfig,
        config: {}
      }
    }
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
