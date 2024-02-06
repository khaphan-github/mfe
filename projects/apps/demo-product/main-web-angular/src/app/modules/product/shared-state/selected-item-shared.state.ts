import { Injectable } from '@angular/core';
import { Product } from '../repository/product.model';
import { CoreSharedState } from '@erp/angular/logic';

export type ISelectedItemSharedState = {
  items: Product[];
};

@Injectable({
  providedIn: 'root',
})
export class SelectedItemSharedState
  extends CoreSharedState<ISelectedItemSharedState> {
  constructor() {
    super();
    this.setInitialState({
      items: []
    });
  }

  override setState(state: ISelectedItemSharedState | null): void {
    super.setState(state);
    super.pushStateToSubscriber();
  }
}
