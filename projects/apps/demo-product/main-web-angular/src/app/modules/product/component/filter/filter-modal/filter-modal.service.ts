import { Injectable } from '@angular/core';
import { ICheckbox, Select2Option, IGroupButton } from '@erp/angular/components';
import { Observable, delay, map } from 'rxjs';
import { FilterModalSharedState } from '../../../shared-state/fitler-modal-shared.state';
import { CategoryService } from '../../../../category/category.service';
import { Category } from '../../../../category/model/category.model';

@Injectable({
  providedIn: 'root'
})
export class FilterModalService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly filterModalSharedState: FilterModalSharedState
  ) { }

  getCategoriesByKey = (key: string): Observable<Category[]> => {
    return this.categoryService.getChildrenOfNode(key).pipe(delay(2000));
  };

  getFilterModalSharedState() {
    return this.filterModalSharedState;
  }

  applyFilter = (
    doDienTu: Array<ICheckbox>,
    doGiaDungSelect2: Select2Option | null,
    doGiaDungChildSelect2: Select2Option | null,
    priceFrom: number,
    priceTo: number,
    status: Array<IGroupButton>
  ) => {
    this.filterModalSharedState.setStateByObject({
      doDienTuCheckedBox: doDienTu,
      priceFrom: priceFrom,
      priceTo: priceTo,
      doGiaDungSelect2: doGiaDungSelect2,
      doGiaDungChildSelect2: doGiaDungChildSelect2,
      status: status
    });
    this.filterModalSharedState.pushStateToSubscriber();
  };

  applySearch = (searchString: string) => {
    this.filterModalSharedState.setStateByObject({
      searchString: searchString,
      page: 0,
    });
    this.filterModalSharedState.pushStateToSubscriber();
  };
}
