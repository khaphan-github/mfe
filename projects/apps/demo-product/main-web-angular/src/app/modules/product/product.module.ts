import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing.module';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './component/product-list/product-list.component';
import { FilterModalService } from './component/filter/filter-modal/filter-modal.service';
import { ProductService } from './services/product.service';
import { CategoryService } from '../category/category.service';
import { DefaultNoComponentGlobalConfig, GLOBAL_CONFIG_PAGE_SIZE, MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorDefaultOptions, TOAST_CONFIG, ToastrModule, ToastrService } from '@erp/angular/components';
@NgModule({
  declarations: [
    ProductComponent,
  ],
  providers: [
    FilterModalService,
    ProductService,
    CategoryService,
    ToastrService,
    {
      provide: TOAST_CONFIG,
      useValue: {
        default: DefaultNoComponentGlobalConfig,
        config: {}
      }
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: GLOBAL_CONFIG_PAGE_SIZE as MatPaginatorDefaultOptions
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    ProductListComponent,
  ],
  exports: [ProductComponent, ProductListComponent]
})
export class ProductModule { }
