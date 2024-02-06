import { ModuleWithProviders, NgModule } from '@angular/core';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorDefaultOptions } from '../lib-material/public-api';
import { GLOBAL_CONFIG_PAGE_SIZE } from '../ui.const';
import { DefaultNoComponentGlobalConfig, TOAST_CONFIG, ToastrModule, ToastrService } from '../lib-ngx/public-api';

@NgModule({
  imports: [
    ToastrModule.forRoot({
      timeOut: 30000,
    }),
  ]
})
export class ZaaShareProviderModule {
  static forFeature(): ModuleWithProviders<ZaaShareProviderModule> {
    return {
      ngModule: ZaaShareProviderModule,
      providers: [
        ToastrService,
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
        },
      ],
    };
  }
}
