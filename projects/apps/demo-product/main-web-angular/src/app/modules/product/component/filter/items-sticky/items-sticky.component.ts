import { Component, OnInit } from '@angular/core';

import { Observable, map } from 'rxjs';
import { ItemStickyService } from './item-sticky.service';
import { ITEMSTICKY_TYPE, ItemsSticky } from './items-sticky.model';
import { CommonModule } from '@angular/common';
import { CoreReactiveState } from '@erp/angular/logic';

//Khai bao cac doi tuong state su dung trong component
type ItemsStickyComponentState = {
  itemsSticky: Array<ItemsSticky[]> | never[];
};

type ViewModel = Pick<ItemsStickyComponentState, 'itemsSticky'>;

@Component({
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    ItemStickyService,
  ],
  selector: 'app-product-items-sticky',
  templateUrl: './item-sticky.html',
})
export class ItemsStickyComponent
  extends CoreReactiveState<ItemsStickyComponentState>
  implements OnInit {
  constructor(private readonly itemStickyService: ItemStickyService) {
    super();
  }

  public readonly itemViewModel$: Observable<ViewModel> =
    this.onlySelectWhen(['itemsSticky']);

  ngOnInit() {
    // khoi tao gia tri ban dau
    this.initialize({ itemsSticky: [] });

    //thiet lap ket noi den cac state can thiet
    this.connect({
      itemsSticky: this.itemStickyService.filterStateThenUpdateItemSticky$
    });
  }

  ITEM_STICKY_ENUM = ITEMSTICKY_TYPE;

  /**
   * Xóa một ItemsSticky khỏi danh sách.
   * @param item Mục dán cần xóa.
   */
  removeItem = (item: any) => {
    //cap nhat tren state cua component (Vi state cua component dang la bang anh xa cua itemsSticky$ duoi service.
    // nen moi thay doi duoi service se tu ap dung tren component)
    //ap dung xuong service
    this.itemStickyService.removeSticky(item);
  };

  trackByFn(index: number, item: any): number {
    return item.key;
  }
}
