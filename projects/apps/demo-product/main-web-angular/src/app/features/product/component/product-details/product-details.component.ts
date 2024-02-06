import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ThongTinChungComponent } from './thong-tin-chung/thong-tin-chung.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { TongQuatComponent } from './tong-quat/tong-quat.component';
import { NgbModal } from '@erp/angular/components';
import { ModalRouting } from '../../product.routing.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ThongTinChungComponent,
    ModalHeaderComponent,
    TongQuatComponent,
  ],
  providers: [],
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  @ViewChild('content', { static: true }) contentTemplate: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly productService: ProductService,
    private readonly modalService: NgbModal,
  ) {
  }
  public readonly MODAL_ROUTING = ModalRouting.productDetail;
  public activeTab: string = "";

  ngOnInit() {
    //Mở popup lên
    this.modalService.open(this.contentTemplate, {
      fullscreen: true,
      keyboard: false,
      // scrollable: true,
    });

    //Xử lý các đối số trên router truyền qua.
    this.activeTab = this.route.snapshot.queryParams['tab1']; // ex: thong-tin-chung-tab
  }

  closeModal() {
    this.modalService.dismissAll();
    this.router.navigate(["products", { outlets: { modal: null } }]);
    // Load product;
    this.productService.ReloadDataAndBackToViewManageProductLists();
  }

  changeTab(tab: string) {
    // Cập nhật query parameter mà không làm thay đổi phần còn lại của URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab1: tab },
      queryParamsHandling: 'merge'
    });
  }
}
