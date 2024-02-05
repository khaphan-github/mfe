import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultNoComponentGlobalConfig, GLOBAL_CONFIG_PAGE_SIZE, MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorDefaultOptions, SmartAdminConfigService, TOAST_CONFIG, ToastrModule, ToastrService, TranslocoRootModule } from '@erp/angular/components';
import { ProductModule } from './modules/product/product.module';


@Component({
  standalone: true,
  selector: 'erp-root',
  imports: [
    RouterOutlet,
    ProductModule,
    TranslocoRootModule,
    ToastrModule,
  ],
  providers: [
    SmartAdminConfigService,
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
    }
  ],
  templateUrl: './app.component.html',
})

export class AppComponent implements AfterViewInit {
  smartAdminConfigService: SmartAdminConfigService = inject(SmartAdminConfigService);

  ngAfterViewInit(): void {
    this.smartAdminConfigService.activeJsAppComponent();
  }
}
