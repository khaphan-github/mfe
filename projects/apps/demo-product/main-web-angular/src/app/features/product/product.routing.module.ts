import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ListComponent } from '../category/list/list.component';

// Nơi khai báo các đường dẫn liên quan đến các chuyển hướng đến modal theo kiểu routing
export const ModalRouting = {
  productDetail: {
    root: 'product-detail-modal',

    thongTinChungTab: {
      root: 'thong-tin-chung-tab',
      children: {
        thongTinCoBanMenu: 'thong-tin-co-ban',
        phanLoaiMenu: 'phan-loai',
        hienTrangMenu: 'hien-trang',
      }
    },

    tongQuatTab: {
      root: 'tong-quat-tab',
      children: {
        thongTinCoBanMenu: 'thong-tin-co-ban',
        phanLoaiMenu: 'phan-loai',
        hienTrangMenu: 'hien-trang',
      }
    },

    bienTheTab: {
      root: 'bien-the-tab',
      children: {
        thongTinCoBanMenu: 'thong-tin-co-ban',
        phanLoaiMenu: 'phan-loai',
        hienTrangMenu: 'hien-trang',
      }
    },

    hinhAnhSeoTab: {
      root: 'hinh-anh-seo-tab',
      children: {
        thongTinCoBanMenu: 'thong-tin-co-ban',
        phanLoaiMenu: 'phan-loai',
        hienTrangMenu: 'hien-trang',
      }
    },

    logActivitiesTab: {
      root: 'loc-activites-tab',
      children: {
        thongTinCoBanMenu: 'thong-tin-co-ban',
        phanLoaiMenu: 'phan-loai',
        hienTrangMenu: 'hien-trang',
      }
    }
  }
}

const productRoutes: Routes = [
  {
    path: '', component: ProductComponent,
    children: [
      {
        title: 'Dánh sách sản phẩm',
        path: '',
        component: ProductListComponent,
      },

      {
        title: 'Xem chi tiết sản phẩm theo mã',
        path: ModalRouting.productDetail.root + '/:id',
        component: ProductDetailsComponent,
        outlet: 'modal',
      },
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
