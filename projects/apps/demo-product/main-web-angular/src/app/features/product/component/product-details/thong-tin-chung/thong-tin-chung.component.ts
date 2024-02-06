import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Subscription,finalize,  of, switchMap,  tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ThongTinChungService } from './thong-tin-chung.service';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@erp/angular/components';
import { CategoryInit } from '../../../model/product.model';
import { ModalRouting } from '../../../product.routing.module';
import * as _ from 'lodash';
import { IUpdateProductDto } from '../../../dto/product.dto';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ThongTinChungService
  ],
  selector: 'app-thong-tin-chung',
  templateUrl: './thong-tin-chung.component.html',
  styleUrls: ['./thong-tin-chung.component.css'],
})
export class ThongTinChungComponent implements OnInit, OnDestroy, AfterViewInit {

  //#region Khai báo các biến được sử dụng
  @ViewChild('tab_thong_tin_chung') element_tab_thong_tin_chung: any;

  constructor(
    private thongTinChungService: ThongTinChungService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private readonly modalService: NgbModal,
    private router: Router,
  ) { }

  // id của product
  product_id: number = 0;
  product_name_default: string = "_";

  //#region Xử lý logic if else
  isLoadedQueriesParam = false;
  protected isEditPublicTime: boolean = false;
  //#endregion

  waitingToDelete: boolean = false;

  //#region Quản lí subscribed
  private subscriptions = new Subscription();
  //#endregion

  //#region Biến các controls
  protected thongTinChungForm: FormGroup = new FormGroup({
    info: new FormGroup({
      name_display: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    category: new FormGroup({}),
    current_status: new FormControl(''),
    public_time: new FormGroup({
      ngay: new FormControl(
        { value: '', disabled: true }
      ),
      gio: new FormControl(
        { value: '', disabled: true }
      ),
      phut: new FormControl(
        { value: '', disabled: true }
      )
    })
  });
  //#endregion

  //#region Nội dung sản phẩm
  readonly descriptionThongTinCoBan: string = "The perfect size to grill up a couple of burgers for everyone in the family";
  readonly descriptionPhanLoai: string = "Convenient side table...for placing serving trays";
  readonly descriptionHienTrang: string = "Packed with [branded] features. Welcome to the Weber family";
  //#endregion

  //#region dataSource
  protected attributes: Array<CategoryInit> = [];
  protected attributesDataSource: any = {};
  protected dataSourceStatus_local: any = {
    data: [
      { text: 'Công khai', value: 'active' },
      { text: 'Riêng tư', value: 'inactive' },
    ]
  }

  //#endregion

  //#region Kích hoạt tab
  public readonly THONG_TIN_CHUNG_MENU = ModalRouting.productDetail.thongTinChungTab.children;
  private readonly tab_thong_tin_chung: string = ModalRouting.productDetail.thongTinChungTab.root;
  activeTabMenu: string = '';
  activeTabNavbar: string = "";
  //#endregion

  //#region Lưu dữ liệu khi chưa submit
  private oldData: any;
  //#endregion

  //#endregion


  //#region Các method Life Cyclehooks
  ngOnInit() {
    //#region Lắng nghe sự kiện
    // event xử lý khi openDetail từ component "Chi tiết"
    // 1. Lấy thông tin cần thiết từ route.
    this.activeTabNavbar = this.route.snapshot.queryParams['tab1'] ?? this.tab_thong_tin_chung; // ex: thong-tin-chung-tab
    this.activeTabMenu = this.route.snapshot.queryParams['tab2'] ?? this.THONG_TIN_CHUNG_MENU.thongTinCoBanMenu;

    this.product_id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    if (!this.product_id || this.product_id == 0) {
      throw new Error(`Product id in rout should not be empty`);
    }

    // Subcribe các thứ cần thiết: thông tin chung của sản phẩm theo mã
    this.subscriptions = this.productService.getThongTinChungProduct(this.product_id).pipe(
      tap((response) => {
        this.product_name_default = response['name_default'];
        this.attributes = [...response['category']];

        const infoFormGroup = this.thongTinChungForm.get('info') as FormGroup;
        infoFormGroup?.get('name_display')?.patchValue({
          name_display: response['name_display']
        });

        this.thongTinChungForm.patchValue({
          current_status: response['current_status'],
          public_time: this.thongTinChungService.formatTimeFromAPI(response['public_time'])
        });


        this.attributes.forEach(item => {
          const { data_sources, id, name, values } = item;
          (this.thongTinChungForm.get('category') as FormGroup)?.addControl(
            _.toString(id),
            new FormControl([]));
          this.attributesDataSource[id] = {
            data: [],
            isLoading: false,
            name: name,
          };

          // đưa data vào form
          (this.thongTinChungForm.get('category') as FormGroup)?.patchValue({ [id]: values });

          this.attributesDataSource[id].name = name;

          let items: any[] = [];

          if (data_sources.length) {
            data_sources.map(item => {
              items.push({
                value: _.toString(item.id),
                text: item.name,
              })
            })
          }
          this.attributesDataSource[id].data = items;
        });
      }),

      tap((response) => {
        this.isLoadedQueriesParam = true;
      })

    ).subscribe();

    // Setup dữ liệu ban đầu của components
    this.updateLocalData();

    //#endregion
  }

  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }

  ngAfterViewInit(): void { }

  //#endregion

  //#region Các methods tự khai báo

  /**
   * Check xem dữ liệu có thay đổi hay không
   * @alias true
   * @alias false
   */
  get isDataChanged(): boolean {
    // if (!this.isLoadedQueriesParam) return false;
    return !_.isEqual(this.thongTinChungForm.getRawValue(), this.oldData);
  }
  /**
   * update dữ liệu để check ẩn hiện popup
   */
  private updateLocalData() {
    // Cach 1
    this.oldData = _.cloneDeep(this.thongTinChungForm.getRawValue());
    // Cach 2
    // this.oldData = JSON.parse(JSON.stringify(this.thongTinChungForm.getRawValue()));
  }
  /**
   * @param controlName tên control
   * @returns dữ liệu của control đó
   */
  private getFormControl(controlName: string) {
    const control = this.thongTinChungForm.get(controlName);
    return control ? control : null;
  }

  /**
   * Chuyển đổi quyền edit thời gian sản phẩm
   */
  toggle = (): void => {
    this.isEditPublicTime = !this.isEditPublicTime;
    if (this.isEditPublicTime) {
      this.getFormControl('public_time.ngay')?.enable();
      this.getFormControl('public_time.gio')?.enable();
      this.getFormControl('public_time.phut')?.enable();
    } else {
      this.getFormControl('public_time.ngay')?.disable();
      this.getFormControl('public_time.gio')?.disable();
      this.getFormControl('public_time.phut')?.disable();
    }
  }

  /**
   * Mỗi lần cuộn trang tới 1 ID nào đó thì sẽ bắn ra 1 event của section ID đó
   */
  onSectionChange(sectionId: string) {
    this.activeTabMenu = sectionId;
  }

  /**
   * Cuộn đến nội dung đã nhấn tab
   */
  scrollTo(section: string) {
    this.element_tab_thong_tin_chung?.nativeElement?.querySelector('#' + section)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab1: this.activeTabNavbar, tab2: section },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Lấy các trường khi có sự thay đổi giữa newData và oldData
   */
  getChangedFields(newData: any, oldData: any) {
    const changedFields: { [key: string]: any } = {};

    // Sử dụng Lodash để so sánh dữ liệu mới và dữ liệu trước đó
    _.forOwn(newData, (value, key) => {
      if (!_.isEqual(value, oldData[key])) {
        changedFields[key] = value;
      }
    });
    const body: IUpdateProductDto = {
      id: _.toNumber(this.product_id),
    }

    // format time
    if (changedFields['public_time']) {

      const time = this.thongTinChungService.formatTimeToUpdate(
        this.getFormControl('public_time.ngay')?.value,
        this.getFormControl('public_time.gio')?.value,
        this.getFormControl('public_time.phut')?.value);

      Object.assign(body, { public_time: time });
    }

    if (changedFields['info']) Object.assign(body, { info: this.thongTinChungForm.getRawValue()['info'] });

    if (changedFields['current_status']) Object.assign(body, { current_status: this.thongTinChungForm.getRawValue()['current_status'] });

    if (changedFields['category']) {
      const newCategories = (this.thongTinChungForm.get('category') as FormGroup).getRawValue();
      const oldCategories = _.cloneDeep(oldData['category']);
      // Tạo một đối tượng để lưu trữ các trường thay đổi trong ['category']
      const changedCategoryFields: any = [];

      // Lặp qua tất cả các trường trong newCategories | oldCategories
      for (const key in newCategories) {
        if (newCategories.hasOwnProperty(key)) {
          let oldArray = oldCategories[key];
          let newArray = newCategories[key];

          if (!_.isEqual(oldArray.sort(), newArray.sort())) {

            changedCategoryFields.push(
              {
                id: _.toNumber(key),
                values: newCategories[key]
              }
            );
          }
        }
      }

      Object.assign(body, { category: changedCategoryFields });
    }
    return body;
  }

  /**
   * Thực thi gửi dữ liệu form đi
   */
  waitingForUpdate: boolean = false;
  onUpdate() {
    if (this.thongTinChungForm.invalid) {
      return;
    }
    const body = this.getChangedFields(
      this.thongTinChungForm.getRawValue(),
      this.oldData
    );

    this.waitingForUpdate = true;
    this.productService.updateProduct(body)
      .pipe(
        switchMap(() => of(Swal.fire({
          allowOutsideClick: false,
          title: `Chúc mừng! Cập nhật dữ liệu thành công`,
          confirmButtonText: 'Ok! Tôi hiểu rồi',
          icon: 'success',
          customClass: {
            container: 'z-index--99999',
          },
        }))),
        finalize(() => {
          this.waitingForUpdate = false;
        })
      ).subscribe({
        next: (value) => {
          this.updateLocalData();
        },
        error: (err) => {
          Swal.fire({
            allowOutsideClick: false,
            title: `Cập nhật thất bại \n Vui lòng thử lại `,
            confirmButtonText: 'Ok! Tôi hiểu rồi',
            icon: 'error',
            customClass: {
              container: 'z-index--99999',
            },
          })
        },
      })

  }

  /**
   * Dữ liệu được reset lại ban đầu
   */
  reset() {
    this.thongTinChungForm.setValue(this.oldData);
  }


  onDelete() {
    this.waitingToDelete = true;
    Swal.fire({
      allowOutsideClick: false,
      title: `Bạn chắt chắn muốn xóa? \nDữ liệu khi xóa sẽ không thể khôi phục`,
      confirmButtonText: 'Ok! Xác nhận',
      cancelButtonText: `Quay lại`,
      icon: 'warning',
      customClass: {
        container: 'z-index--99999',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteById(this.product_id).pipe(
          finalize(() => {
            this.waitingToDelete = false;
          }),
          switchMap(() => of(Swal.fire({
            allowOutsideClick: false,
            title: `Dữ liệu đã được xóa thành công!`,
            confirmButtonText: 'Ok!',
            icon: 'success',
            customClass: {
              container: 'z-index--99999',
            },
          })))
        ).subscribe({
          next: (value) => {
            if (result.isConfirmed) {
              this.modalService.dismissAll();
              this.router.navigate(["products", { outlets: { modal: null } }]);
              // Load product;
              this.productService.ReloadDataAndBackToViewManageProductLists();
            }
          },
          error: (err) => {
            Swal.fire({
              allowOutsideClick: false,
              title: `Xóa sản phẩm thất bại \n Vui lòng thử lại `,
              confirmButtonText: 'Ok! Tôi hiểu rồi',
              icon: 'error',
              customClass: {
                container: 'z-index--99999',
              },
            });
          },
        })
      }
    })
  }
  //#endregion

}
