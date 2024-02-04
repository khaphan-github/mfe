import { Injectable } from '@angular/core';
import { GLOBAL_CONFIG_PAGE_SIZE } from '../../ui.const';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any;
// TODO: Implement in future
export interface IConfigDisplayDataGird {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language: any;
};

@Injectable()
export class DataTableLoaderService {
  private readonly DEFAULT_PAGINATE = GLOBAL_CONFIG_PAGE_SIZE.pageSizeOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;

  showDataGird(parentElementId: string, options: object, display: IConfigDisplayDataGird) {
    $.extend(true, $.fn.dataTable.defaults, {
      lengthMenu: [[...this.DEFAULT_PAGINATE, -1], [...this.DEFAULT_PAGINATE, "All"]],
      language: display.language
    });
    this.table = $(`#${parentElementId}`)?.dataTable(options);
    return this.table;
  }

}
