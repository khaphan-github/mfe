import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing.module';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './component/product-list/product-list.component';
import { FilterModalService } from './component/filter/filter-modal/filter-modal.service';
import { ProductService } from './services/product.service';
import { CategoryService } from '../category/category.service';
@NgModule({
  declarations: [
    ProductComponent,
  ],
  providers: [
    FilterModalService,
    ProductService,
    CategoryService,
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
