import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AppCheckBoxComponent,
  ZaaSortComponent,
  NgbModal,
  SortOptions,
  NotFoundDataComponent,
  BootBoxComponent,
  ComponentCheckBoxHelper,
  MatPaginatorModule,
  PageEvent,
  ToastrService
} from "@erp/angular/components";
import { Subject, Observable, takeUntil, filter } from "rxjs";
import { Product } from "../../model/product.model";
import { ProductService } from "../../services/product.service";
import { IModalFilterSharedState } from "../../shared-state/fitler-modal-shared.state";
import { EditProductComponent } from "../filter/edit-product/edit-product.component";
import { ProductListFilterComponent } from "../filter/filter.component";
import { OtherToolComponent } from "../other-tool/other-tool.component";
import { QuickViewComponent } from "../product-details/quick-view/quick-view.component";
import { TaoSanPhamComponent } from "../tao-san-pham/tao-san-pham.component";
import Swal from "sweetalert2";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    OtherToolComponent,
    AppCheckBoxComponent,
    ProductListFilterComponent,
    TaoSanPhamComponent,
    NotFoundDataComponent,
    BootBoxComponent,
    ZaaSortComponent,
    TranslocoModule,
  ],
  providers: [],
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  router = inject(Router);
  route = inject(ActivatedRoute);
  modalService = inject(NgbModal);
  productService = inject(ProductService);

  destroy$$ = new Subject<void>();

  //#region Khai báo variable
  productList$!: Observable<Array<Product> | any>;

  // #region config paging
  pageIndex!: number | undefined;
  pageSize!: number | undefined;
  totalRecord$!: Observable<number> | null;
  // #endregion config paging

  showLoading: boolean = true;

  // CheckBox variable in component:
  checkBox = new ComponentCheckBoxHelper<Product>('id');
  // CheckBox variable in component:

  sortOptions: Array<SortOptions> = [
    {
      id: 'info->>\'name_default\':asc',
      displayText: 'Tên từ A đến Z',
      icon: 'fal fa-sort-alpha-down'
    },
    {
      id: 'info->>\'name_default\':desc',
      displayText: 'Tên từ Z đến A',
      icon: 'fal fa-sort-alpha-up'
    },
    {
      id: 'amount:desc',
      displayText: 'Giá từ cao đến thấp',
      icon: 'fal fa-sort-amount-down'
    },
    {
      id: 'amount:asc',
      displayText: 'Giá từ thấp đến cao',
      icon: 'fal fa-sort-amount-up'
    }
  ]
  currentSortId = new Array<SortOptions>;

  //#endregion
  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  //#region Method overide
  ngOnInit() {
    this.productService.useDataInSubject = true;

    const { page, size, sortBy } = this.productService.filterState.getCurrentValue() as IModalFilterSharedState;
    this.pageIndex = page;
    this.pageSize = size;
    this.currentSortId = sortBy;

    // Lắng nghe sự thay đổi trong Subject
    this.productList$ = this.productService.products$;
    this.totalRecord$ = this.productService.totalRecord$;

    // Sự kiện filter push state qua => Hiển thị loading
    this.productService.filterState.getState()
      .pipe(takeUntil(this.destroy$$))
      .subscribe({
        next: (state) => {
          this.showLoading = true;
          this.pageIndex = state?.page;
        },
      });

    //#region Thiết lập các subcription
    //kích hoạt load dữ liệu danh sách product khi vừa vào page
    this.productService.GetProductListData()
      .pipe(takeUntil(this.destroy$$))
      .subscribe({
        next: (value) => {
          this.productService.useDataInSubject = false;
          this.checkBox.refreshCheckBox();
          this.productService.selectedItemState.setState({ items: [] });
        },
      });

    this.productList$
      .pipe(takeUntil(this.destroy$$),
        filter((value) => value !== null)
      ).subscribe({
        next: (value) => {
          if (!this.productService.useDataInSubject) {
            this.checkBox.refreshCheckBox();
            this.productService.selectedItemState.setState({ items: [] });
          }
          this.showLoading = false;
        },
      })

    //#endregion
  }
  //#endregion
  //#region Tương tác trên table product
  deleteProductById = (id: any) => {
    this.productService.deleteById(id).subscribe({
      next: (value) => {
        Swal.fire('', 'Xóa dữ liệu thành công', 'success')
          .then(() => {
            this.showLoading = true;
            this.productService.SetProductIsChanged(true);
            this.productService.ReloadDataAndBackToViewManageProductLists();
          })
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Thông báo', 'Xóa dữ liệu thất bại - vui lòng thử lại!');
      },
    })
  };

  quickViewProduct(item: any) {
    const modalRef = this.modalService.open(QuickViewComponent, { size: "lg", });
    modalRef.componentInstance.productInput = item;
  }

  openProductDetail(value: any) {
    this.router.navigate(
      [{ outlets: { modal: ["product-detail-modal", value.id] } }],
      {
        relativeTo: this.route,
        queryParams: { tab1: "thong-tin-chung-tab", tab2: "phan-loai" },
        queryParamsHandling: 'merge',
      }
    );
  }
  //#endregion

  //#region phan trang
  //set thong tin paging xuong share data.... hệ thống sẽ tự reload list
  handlePageEvent(e: PageEvent) {
    this.productService.filterState.setStateByKey('size', e.pageSize);
    this.productService.filterState.setStateByKey('page', e.pageIndex);
    this.productService.filterState.pushStateToSubscriber();
  }
  // #endregion

  //#region other
  clickedRow(data: any) {
    const currentSelectionId = data.id;
    this.router.navigate([{ outlets: { modal: ['product-modal', currentSelectionId] } }], {
      relativeTo: this.route,
      queryParams: { tab1: 'tong-quat-tab', tab2: 'phan-loai' },
      queryParamsHandling: 'merge',
    });
  }


  // Sử dụng RegExp để kiểm tra mô hình (modal:***)
  checkIsProductModal(currentUrl: string): boolean {
    const modalPattern = /\(modal:.*\)/;
    return modalPattern.test(currentUrl);
  }

  navigateToDetailProductById(productId: number): string[] {
    return ['/products', productId.toString()];
  }

  // #region check box
  checkboxChange(checked: boolean, item: Product) {
    this.checkBox.handleOneChecked(checked, item.id, item);
    this.pushSelectedItemToState();
  }

  onCheckAllItems(checked: boolean, item: Product[]) {
    this.checkBox.handleCheckAllItems(checked, item);
    this.pushSelectedItemToState();
  }

  pushSelectedItemToState = () => {
    this.productService.selectedItemState.setState({
      items: this.checkBox.getArraySelected() as any
    });
  }
  // #endregion check box

  // # sort
  onSortChange(event$: Array<SortOptions>) {
    this.productService.filterState.setStateByKey('sortBy', event$ as []);
    this.productService.filterState.pushStateToSubscriber();
  }

  // Hiển thị modal tạo sản phẩm theo ten
  showCreateProductModal() {
    this.modalService.open(TaoSanPhamComponent, {
      keyboard: true,
      backdrop: "static",
    }
    );
  }

  editProduct(item: any) {
    const editModal = this.modalService.open(EditProductComponent, {
      keyboard: true,
      backdrop: "static",
    });

    editModal.componentInstance.item = item;
  }
  navigateToCategory() {
    this.router.navigate(['product/category']);
  }
}
