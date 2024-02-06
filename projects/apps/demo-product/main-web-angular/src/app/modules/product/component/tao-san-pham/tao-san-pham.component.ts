import { CommonModule } from "@angular/common";
import { Component, Input, inject, } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal, ToastrService } from "@erp/angular/components";
import { ProductService } from "../../services/product.service";
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-tao-san-pham',
  templateUrl: './tao-san-pham.component.html',
  styleUrls: ['./tao-san-pham.component.css']
})
export class TaoSanPhamComponent {
  @Input() item: object | any;

  router = inject(Router);
  productService = inject(ProductService);
  activeModal = inject(NgbActiveModal);
  // toast = inject(ToastrService);

  isSaving: boolean = false;
  displayErrorMessage: string = '';

  formComponent = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)]))
  });

  canNotSubmit = () => {
    return this.formComponent.controls.name.value?.length === 0
      || this.isSaving;
  }

  onSubmitAndReturnList(navigateTo: 'list' | 'detail') {
    if (this.canNotSubmit()) return;

    // Before summit
    this.isSaving = true;
    this.formComponent.disable();
    this.displayErrorMessage = '';

    // Lấy thông tin từ form
    const product = {
      name: this.formComponent.controls.name.value ?? '',
    };

    // Gọi service xử lý
    this.productService.createProduct(product).subscribe({
      // handle success
      next: (response) => {
        // this.toast.success(`Cập nhật thông tin thành công`);
        this.isSaving = false;
        this.productService.SetProductIsChanged(true);
        if (navigateTo == 'list') {
          this.productService.ReloadDataAndBackToViewManageProductLists();
        } else {
          console.log(`Navigate to product`)
          this.router.navigate([
            'products',
            { outlets: { modal: ['product-detail-modal', response.id], }, },
          ],
            {
              queryParams: { tab1: 'thong-tin-chung-tab', tab2: 'phan-loai' },
              queryParamsHandling: 'merge',
            }
          );
        };
        this.activeModal.close()
      },
      error: (err) => {
        this.displayErrorMessage = `Đã xảy ra lỗi ${err.message} khi lưu`;
        this.formComponent.enable();
        this.isSaving = false;
      },
    })
  }
}
