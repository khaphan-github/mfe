import { Injectable } from '@angular/core';
import { PRICE_RANGE } from '../component/filter/items-sticky/items-sticky.model';
import { AppStorageService, CoreSharedState, StorageLocation } from '@erp/angular/logic';
import {
  GLOBAL_CONFIG_PAGE_SIZE,
  ICheckbox,
  IGroupButton,
  Select2Option,
  SortOptions
} from '@erp/angular/components';
import { LOCAL_STORAGE_CONFIG_KEY } from '../../../configs/app-storage/local-storage.config';

/**
 * Đối tượng dải giá.
 */
export type PriceRange = {
  from: number; // Giá bắt đầu
  to: number; // Giá kết thúc
};
/**
 * Trạng thái chia sẻ bộ lọc của Modal.
 */
export type IModalFilterSharedState = {
  //catology
  doDienTuCheckedBox: ICheckbox[];

  doGiaDungSelect2: Select2Option | null;
  doGiaDungChildSelect2: Select2Option | null;

  //range price
  priceFrom: number;
  priceTo: number;
  searchString: string; // Tìm kiếm

  page: number; // Trang hiện tại
  size: number; // Số lượng mục trên mỗi trang

  // Sort
  sortBy: Array<SortOptions>;

  // status
  status: Array<IGroupButton>;
};

@Injectable({
  providedIn: 'root'
})
export class FilterModalSharedState
  extends CoreSharedState<IModalFilterSharedState> {
  constructor(private readonly storage: AppStorageService) {
    super();
    this.setInitialState(this.getInitedState());
  };
  KEY = LOCAL_STORAGE_CONFIG_KEY.features.products.filters;
  STORAGE_LOCATON = { location: StorageLocation.SESSION_STORAGE }

  setStateByKey = <K extends keyof IModalFilterSharedState>(
    key: K,
    value: IModalFilterSharedState[K]
  ) => {
    const currentState = this.getCurrentValue();
    if (currentState) {
      currentState[key] = value;
      this.setStateToStorage(currentState);
      this.setState(currentState);
    }
  };

  // Dùng cái này code ngắn hơn
  setStateByObject = (updates: Partial<IModalFilterSharedState>) => {
    const currentState = this.getCurrentValue();
    if (currentState) {
      Object.assign(currentState, updates);
      this.setStateToStorage(currentState);
      this.setState(currentState);
    }
  };

  getInitedState = () => {
    const stateInStorage = this.storage.getItem<IModalFilterSharedState>(
      this.KEY, this.STORAGE_LOCATON
    );
    if (stateInStorage) {
      return stateInStorage;
    }
    return {
      doDienTuCheckedBox: [],

      doGiaDungSelect2: null,
      doGiaDungChildSelect2: null,

      //range price
      priceFrom: PRICE_RANGE.MIN,
      priceTo: PRICE_RANGE.MAX,

      searchString: '',

      page: GLOBAL_CONFIG_PAGE_SIZE.pageDefault, // 0
      size: GLOBAL_CONFIG_PAGE_SIZE.pageSizeDefault, // 10

      sortBy: [],
      status: [],
    };
  };

  setStateToStorage = (currentState: IModalFilterSharedState) => {
    this.storage.setItem(this.KEY, currentState, this.STORAGE_LOCATON);
  };
}
