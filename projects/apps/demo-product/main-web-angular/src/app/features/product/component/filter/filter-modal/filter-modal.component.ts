import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, map, catchError, throwError, combineLatest, takeUntil, tap, debounceTime, switchMap, of } from "rxjs";
import { CATEGORIES } from "../consts/category.const";
import { FilterModalService } from "./filter-modal.service";
import { FilterModalUtils } from "./filter-modal.utils";
import { PRICE_RANGE } from "../items-sticky/items-sticky.model";
import { NgSelect2Module, AppCheckBoxComponent, ZaaGroupButtonComponent, Select2Data, Select2Option, ICheckbox, IGroupButton } from "@erp/angular/components";
import { IModalFilterSharedState } from "../../../shared-state/fitler-modal-shared.state";
import * as _ from "lodash";
import { MatMenuModule } from "@angular/material/menu";


@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    NgSelect2Module,
    AppCheckBoxComponent,
    ZaaGroupButtonComponent,
  ],
  providers: [
    FilterModalService,
  ],
  selector: 'app-products-filters-modal',
  templateUrl: './filter-modal.html',
  styleUrls: ['./material.style.scss']
})
export class FiltersModalComponent implements OnInit, OnDestroy {
  // Biến này để unsubcribe các observable when component destroy:
  private readonly destroy$$ = new Subject<void>();

  // #REGION Khai báo các biến cần thiết dùng cho component:
  //// Đồ gia dụng select2
  public doGiaDungSelect2Data: Array<Select2Data> = [];
  public doGiaDungSelect2Option: Select2Option | null = null;

  //// Các biến để hiển thị thông báo đang tải dữ liêu, không tìm thấy dữ liệu
  public doGiaDungSelect2Loading: boolean = true;
  public doGiaDungSelect2NotFoundResult: boolean = true;

  //// Đồ gia dụng con
  public doGiaDungChildSelect2Data: Array<Select2Data> = [];
  public doGiaDungChildSelect2Option: Select2Option | null = null;

  //// Các biến để hiển thị thông báo đang tải dữ liêu, không tìm thấy dữ liệu
  public doGiaDungChildSelect2Loading: boolean = true;

  //// Giá sản phẩm
  public readonly PRICE_RANGE_DEFAULT = PRICE_RANGE;
  public priceFrom: number = this.PRICE_RANGE_DEFAULT.MIN;
  public priceTo: number = this.PRICE_RANGE_DEFAULT.MAX;

  //// Check box danh mucj đồ điện tử
  public doDienTuCheckBox: Array<ICheckbox> = [];
  public doDienTuCheckLoading: boolean = true;

  //// Khai báo các sự kiên xảy ra trong nội bộ component
  ////// Khi chọn danh mục cha, danh mục con sẽ load - kích hoạt dựa vào obs onSelectDoGiadung
  private readonly onSelectDoGiadung$ = new BehaviorSubject<Select2Option | null>(null);


  groupButtonOptions: Array<IGroupButton> = [
    {
      id: '0',
      displayText: 'Tất cả',
      icon: 'fal fa-box-full',
    },
    {
      id: 'active',
      displayText: 'Đang kích hoạt',
      icon: 'fal fa-box-check',
      metadata: ''
    },
    {
      id: 'inactive',
      displayText: 'Chưa kích hoạt',
      icon: 'fal fa-box',
    },
    {
      id: '3',
      displayText: 'Hết hàng',
      icon: 'fal fa-box-alt',
    }
  ]

  DEFAULT_STATUS = {
    id: '0',
    displayText: 'Tất cả',
    icon: 'fal fa-box-full',
  };
  currentSelectedOptions: Array<IGroupButton> = [];

  // #ENDREGION Khai báo các biến cần thiết dùng cho component:

  //#REGION Các thủ tục chạy đầu tiên
  constructor(private readonly filterModalService: FilterModalService) {
  }

  ngOnInit() {
    // Khởi tạo dữ liệu cho select2 đồ gia dụng cha
    this.initDoGiaDungParentSelect2();

    // Khởi tạo dữ liệu giá
    this.initPriceRange();

    // Khởi tạo dữ liệu cho checked box đồ điện tử
    this.initDoDienTuCheckBox()

    // Khởi tạo luồng nghe sự kiện thay đổ danh mục cha - tải dử liệu danh mục con theo cha.
    this.initSelectedParentDoGiaDungEvent();

    this.initCurrentSelectedStatus();
  }

  initDoGiaDungParentSelect2() {
    // listDoGiaDung chỉ gọi lần đầu khi stream init, còn mấy lần sau shared state change thì không gọi
    const listDoGiaDung$ = this.filterModalService.getCategoriesByKey(CATEGORIES.GIA_DUNG).pipe(
      map(arrayGiaDung => FilterModalUtils.mapCategoriesToSelect2(arrayGiaDung)),
      // Xử lý lỗi cho viêc load dữ liệu tại đây
      catchError((err) => {
        this.doGiaDungSelect2NotFoundResult = true;
        return throwError(() => err);
      })
    );
    /// Chọn ra danh mục đồ gia dụng trong stream này
    const filterShareState$ =
      this.filterModalService.getFilterModalSharedState().getState().pipe(
        map(state => state?.doGiaDungSelect2)
      );

    return combineLatest([listDoGiaDung$, filterShareState$])
      .pipe(
        takeUntil(this.destroy$$),
      ).subscribe({
        next: ([arrayGiaDung, selectedState]) => {
          /// Chỉ thay khởi tạo lần dầu thôi mấy lần sau không cần gán lại dữ liệu
          ///  Vì giá trị này sẽ không thay đổi trong suốt phiên làm việc.
          if (this.doGiaDungSelect2Data.length === 0) {
            this.doGiaDungSelect2Data = arrayGiaDung;
          }
          /// Khi có thay đổi thì bắn sự kiện cho ô select2 kế bên để nó load dữ liệu;
          if (!_.isEqual(selectedState, this.doGiaDungSelect2Option)) {
            this.doGiaDungSelect2Option = selectedState as any;
            this.onSelectDoGiadung$.next(selectedState as any);
          }

          this.doGiaDungSelect2Loading = false;
        },
        error: (err) => {
          console.error(err);
          this.doGiaDungSelect2Loading = false;
        },
      });
  }

  initPriceRange() {
    return this.filterModalService.getFilterModalSharedState().getState()
      .pipe(
        takeUntil(this.destroy$$),
      ).subscribe({
        next: (state: IModalFilterSharedState | null) => {
          if (state !== null) {
            this.priceFrom = state.priceFrom;
            this.priceTo = state.priceTo;
          }
        },
      });
  }

  initDoDienTuCheckBox() {
    this.doDienTuCheckLoading = true;
    return combineLatest([
      this.filterModalService.getCategoriesByKey(CATEGORIES.DIEN_TU),
      this.filterModalService.getFilterModalSharedState().getState().pipe(
        map(state => state?.doDienTuCheckedBox)
      )
    ]).pipe(
      takeUntil(this.destroy$$),
    ).subscribe({
      next: ([arrayDoDienTu, arrayDoDienTuChecked]) => {
        this.doDienTuCheckBox = FilterModalUtils.mapSelectedCheckboxToAllCheckBox(
          arrayDoDienTuChecked as [], arrayDoDienTu as []
        );
        this.doDienTuCheckLoading = false;

      },
      error: (err) => {
        this.doDienTuCheckLoading = false;
      },
    });
  }

  initSelectedParentDoGiaDungEvent() {
    const DEBOUNCE_TIME_SELECT2_RELOAD = 200 //MS

    return this.onSelectDoGiadung$.pipe(
      tap(() => {
        this.doGiaDungChildSelect2Loading = true;
        this.doGiaDungChildSelect2Option = null;
      }),
      debounceTime(DEBOUNCE_TIME_SELECT2_RELOAD),

      switchMap((event) => {
        if (_.isNil(event?.data?.alias)) {
          return of([null, null]);
        }
        return combineLatest([
          this.filterModalService.getCategoriesByKey(event?.data?.alias),
          this.filterModalService.getFilterModalSharedState().getState().pipe(
            map(state => state?.doGiaDungChildSelect2)
          )
        ])
      }),
      takeUntil(this.destroy$$),
    ).subscribe({
      next: ([arrayDoGiaDungChildren, selectedState]) => {
        if (arrayDoGiaDungChildren === null || arrayDoGiaDungChildren.length === 0) {
          this.doGiaDungChildSelect2Data = [];
        }
        else {
          this.doGiaDungChildSelect2Data = FilterModalUtils.mapCategoriesToSelect2(arrayDoGiaDungChildren);
        }

        this.doGiaDungChildSelect2Option = selectedState as Select2Option | null;
        this.doGiaDungChildSelect2Loading = false;
      },
      error: (err: any) => {
        this.doGiaDungChildSelect2Loading = true;
      }
    })
  }

  initCurrentSelectedStatus() {
    return this.filterModalService.getFilterModalSharedState().getState()
      .pipe(
        takeUntil(this.destroy$$),
      ).subscribe({
        next: (state: IModalFilterSharedState | null) => {
          if (state !== null && state.status.length !== 0) {
            this.currentSelectedOptions = state.status;
          } else {
            this.currentSelectedOptions = [this.DEFAULT_STATUS];
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
  //#ENDREGION Các thủ tục chạy đầu tiên

  // #REGION các tương tác với component
  onUpdateSelectionDoGiaDung = (event: any) => {
    const { options } = event;
    this.doGiaDungSelect2Option = options ? options[0] : options;

    this.onSelectDoGiadung$.next(this.doGiaDungSelect2Option);

  }

  onUpdateSelectionDoGiaDungChild(event: any) {
    const { options } = event;
    this.doGiaDungChildSelect2Option = options ? options[0] : options;
  }

  onPriceFromChange = (event: any) => {
    this.priceFrom = +event.target.value
  };

  onPriceToChange = (event: any) => {
    this.priceTo = +event.target.value
  };

  onCheckBoxByDoDienTuChanged(checked: boolean, item: ICheckbox) {
    this.doDienTuCheckBox = FilterModalUtils.updateCheckedBox(checked, item, this.doDienTuCheckBox);
  }

  onSatusChange($event: Array<IGroupButton>) {
    this.currentSelectedOptions = $event;
  }

  onCloseMenu(): void {
    // Nếu hàm reset form đã gọi nhưng không gọi hàm filter thì gán lại các giá trị trước khi thay đổi
    /// Delay time để khi form ẩn rồi mới thực hiện task này
    const DELAY_TIME_TO_RESET_DATA = 100 // ms;
    setTimeout(() => {
      const currentValueInShareState =
        this.filterModalService.getFilterModalSharedState().getCurrentValue() as IModalFilterSharedState;

      const {
        doGiaDungSelect2,
        doGiaDungChildSelect2,
        priceFrom,
        priceTo,
        doDienTuCheckedBox,
        status,
      } = currentValueInShareState;

      this.doGiaDungSelect2Option = doGiaDungSelect2;
      this.doGiaDungChildSelect2Option = doGiaDungChildSelect2;

      this.priceFrom = priceFrom;
      this.priceTo = priceTo;

      this.doDienTuCheckBox = FilterModalUtils.mapSelectedCheckboxToAllCheckBox(
        doDienTuCheckedBox as [], this.doDienTuCheckBox as []
      );

      this.currentSelectedOptions = status;
    }, DELAY_TIME_TO_RESET_DATA);
  }

  /**
   * Bỏ chọn tất cả thôi chứ vẫn còn giữ cái state cho đến khi bấm cái nút
   */
  onEmptyAllSelection = () => {
    // reset selction;
    this.doGiaDungSelect2Option = null;
    this.doGiaDungChildSelect2Option = null;

    // Price
    this.priceFrom = PRICE_RANGE.MIN;
    this.priceTo = PRICE_RANGE.MAX;


    // Reset checkbox
    FilterModalUtils.resetCheckBox(false, this.doDienTuCheckBox);

    this.currentSelectedOptions = [this.DEFAULT_STATUS];
  }

  onFilter = () => {
    this.filterModalService.applyFilter(
      FilterModalUtils.getCheckedBoxFrom(this.doDienTuCheckBox),
      this.doGiaDungSelect2Option,
      this.doGiaDungChildSelect2Option,
      this.priceFrom,
      this.priceTo,
      this.currentSelectedOptions,
    );
  };


  // #ENDREGION các tương tác với component

  // #REGION Utilities
  //// tối ưu hiểu năng - chỉ render lại những phần tử thay đổi, không phải render tất cả các phần tử
  trackByDoDienTuModelFn(index: number, item: ICheckbox): number {
    return item.id;
  }

  // #ENDREGION Utilities
}
