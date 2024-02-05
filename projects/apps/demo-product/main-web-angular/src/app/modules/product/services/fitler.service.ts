import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppStorageService } from 'src/app/core/app-store/app-storage.service';
import { FilterModalSharedState, IModalFilterSharedState } from '../shared-state/fitler-modal-shared.state';
@Injectable()
export class FilterService {
  constructor(
    private readonly filterSharedState: FilterModalSharedState,
    private readonly storage: AppStorageService,
  ) { }

  getOtherOptions = (): Observable<any> => {
    return of([
      {
        keyFilter: 'co_hinh_anh',
        displayName: 'Có hình ảnh'
      },
      {
        keyFilter: 'hang_moi_nhap',
        displayName: 'Hàng mới nhập'
      },
      {
        keyFilter: 'hang_ton_kho',
        displayName: 'Hàng tồn kho'
      },
      {
        keyFilter: 'hang_doi_tra',
        displayName: 'Hàng đỗi trả'
      },
      {
        keyFilter: 'hang_giam_gia',
        displayName: 'Giảm giá'
      },
      {
        keyFilter: 'hang_het_hang',
        displayName: 'Hết hạn sữ dụng'
      },
      {
        keyFilter: 'hang_dang_nhap',
        displayName: 'Đang nhập hàng'
      },
    ])
  }

  /**
   * Cập nhật trạng thái bằng khóa và giá trị.
   * @param key Khóa trạng thái.
   * @param value Giá trị trạng thái.
   */
  updateStateByKey = (key: keyof IModalFilterSharedState, value: any) => {
    this.filterSharedState.setStateByKey(key, value);
  }
  /**
   * Áp dụng và đẩy thay đổi trạng thái bộ lọc.
   */
  pushState = () => {
    // Áp dụng thay đổi trạng thái bộ lọc
    this.filterSharedState.pushStateToSubscriber();
  }

  getCurrentValue = () => {
    return this.filterSharedState.getCurrentValue();
  }


}
