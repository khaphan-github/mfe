import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ProductRoutingModule } from './product.routing.module';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilterModalService } from './component/filter/filter-modal/filter-modal.service';
import { ProductService } from './services/product.service';
import { CategoryService } from '../category/category.service';
import { ToastrModule, ToastrService, TranslocoRootModule } from '@erp/angular/components';
@NgModule({
  declarations: [
    ProductComponent,
  ],
  providers: [
    HttpClient,
    FilterModalService,
    ProductService,
    CategoryService,
    ToastrService,
    TranslocoService,
  ],
  imports: [
    ToastrModule.forRoot({ autoDismiss: true }),
    TranslocoRootModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    ProductListComponent,
  ],
})
export class ProductModule { }
