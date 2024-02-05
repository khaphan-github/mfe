import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { map, } from 'rxjs';
import { ITEMSTICKY_TYPE, ItemsSticky, PRICE_RANGE } from './items-sticky.model';
import { ICheckbox, IGroupButton } from '@erp/angular/components';
import { FilterModalSharedState, IModalFilterSharedState } from '../../../shared-state/fitler-modal-shared.state';

@Injectable()
export class ItemStickyService {
  constructor(private readonly filterModalSharedState: FilterModalSharedState) { }

  readonly filterStateThenUpdateItemSticky$ = this.filterModalSharedState.getState()
    .pipe(map((state: IModalFilterSharedState | null) => {
      if (!state) { return []; }

      let displayItemSticky: Array<Array<any>> = [[]];

      const {
        doDienTuCheckedBox,
        doGiaDungSelect2,
        doGiaDungChildSelect2,
        priceFrom,
        priceTo,
        status
      } = state;

      if (doDienTuCheckedBox && doDienTuCheckedBox.length > 0) {
        const doDienTuItemSticky = _.map(doDienTuCheckedBox,
          (value: ICheckbox) => new ItemsSticky(value, value.name, ITEMSTICKY_TYPE.DO_DIEN_TU));
        displayItemSticky.push(doDienTuItemSticky);
      };

      if (!_.isEmpty(doGiaDungSelect2)) {
        displayItemSticky.push(
          [new ItemsSticky(doGiaDungSelect2, doGiaDungSelect2?.label ?? '', ITEMSTICKY_TYPE.DO_GIA_DUNG)]
        );
      }

      if (!_.isEmpty(doGiaDungChildSelect2)) {
        displayItemSticky.push(
          [new ItemsSticky(doGiaDungChildSelect2, doGiaDungChildSelect2?.label ?? '', ITEMSTICKY_TYPE.DO_GIA_DUNG_CHILD)]
        );
      }

      // [từ 100.000 Đến 10.000.000]
      // Giá mạc định không cần hiển thị.
      const isNotDefaultPrice = priceFrom != PRICE_RANGE.MIN || priceTo != PRICE_RANGE.MAX;
      if (isNotDefaultPrice) {
        const displayVnd = (amount: number): string => {
          return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
        };
        const displayPrice = `Từ ${displayVnd(state?.priceFrom)} đến ${displayVnd(state?.priceTo)}`;

        displayItemSticky.push(
          [new ItemsSticky({
            priceFrom: priceFrom,
            priceTo: priceTo,
          }, displayPrice, ITEMSTICKY_TYPE.GIA
          )]
        );
      }

      if (status && status.length > 0) {
        const statusItemSticky = _.map(status,
          (value: IGroupButton) => new ItemsSticky(value, value.displayText, ITEMSTICKY_TYPE.STATUS));
        displayItemSticky.push(statusItemSticky);
      }

      return displayItemSticky;
    }));



  /**
   * Cập nhật state của filter modal theo key được quy định IModalFilterState
   */
  removeSticky = (itemToRemove: ItemsSticky): void => {

    switch (itemToRemove.type) {
      case ITEMSTICKY_TYPE.DO_DIEN_TU:
        const doDienTuInState = this.filterModalSharedState.getCurrentValue()?.doDienTuCheckedBox;
        const removeItemsIndex = doDienTuInState?.findIndex((object) =>
          object?.id.toString() == itemToRemove?.itemValue?.id
        );

        if (removeItemsIndex !== -1) {
          doDienTuInState?.splice(removeItemsIndex ?? 0, 1);
        }

        this.filterModalSharedState.setStateByKey('doDienTuCheckedBox', doDienTuInState || []);
        break;

      case ITEMSTICKY_TYPE.DO_GIA_DUNG:
        this.filterModalSharedState.setStateByKey('doGiaDungSelect2', null);
        this.filterModalSharedState.setStateByKey('doGiaDungChildSelect2', null);
        break;

      case ITEMSTICKY_TYPE.DO_GIA_DUNG_CHILD:
        this.filterModalSharedState.setStateByKey('doGiaDungChildSelect2', null);
        break;

      case ITEMSTICKY_TYPE.GIA:
        this.filterModalSharedState.setStateByKey('priceFrom', PRICE_RANGE.MIN);
        this.filterModalSharedState.setStateByKey('priceTo', PRICE_RANGE.MAX);
        break;

      case ITEMSTICKY_TYPE.STATUS:
        this.filterModalSharedState.setStateByKey('status', []);
        break;

      default:
        break;
    }

    this.filterModalSharedState.pushStateToSubscriber();
  };

}
