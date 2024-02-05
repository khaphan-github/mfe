import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, ToastrService } from '@erp/angular/components';
import { ProductService } from '../../../services/product.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  @Input() item: object | any;

  router = inject(Router);
  productService = inject(ProductService);
  activeModal = inject(NgbActiveModal);
  toast = inject(ToastrService);

  isSaving: boolean = false;
  displayErrorMessage: string = '';

  editForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)]))
  });

  canNotSubmit = () => {
    return this.editForm.controls.name.value?.length === 0
      || this.isSaving;
  }

  onSubmitAndReturnList(navigateTo: 'list' | 'detail') {
    if (this.canNotSubmit()) return;

    // Before summit
    this.isSaving = true;
    this.editForm.disable();
    this.displayErrorMessage = '';

    // Lấy thông tin từ form
    const product = {
      id: this.item.id,
      name: this.editForm.controls.name.value ?? '',
    };

    // Gọi service xử lý
    this.productService.editProduct(product).subscribe({
      // handle success
      next: () => {
        this.toast.success(`Cập nhật thông tin thành công`);
        this.isSaving = false;
        this.productService.SetProductIsChanged(true);
        this.productService.ReloadDataAndBackToViewManageProductLists();
        if (navigateTo == 'list') {
        } else {
          console.log(`Navigate to product`)
          this.router.navigate([
            'products',
            { outlets: { modal: ['product-detail-modal', this.item.id], }, },
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
        this.editForm.enable();
        this.isSaving = false;
      },
    })
  }
}
