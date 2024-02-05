import * as _ from "lodash";

export const PRICE_RANGE = {
  MAX: 10_000_000,
  MIN: 1_000,
};

export enum ITEMSTICKY_TYPE {
  DO_DIEN_TU,
  DO_GIA_DUNG,
  DO_GIA_DUNG_CHILD,

  GIA,
  STATUS
}

export class ItemsSticky {
  id!: string;
  constructor(
    public itemValue: any,
    public itemDisplayText: string,
    public type?: ITEMSTICKY_TYPE,
  ) {
    this.id = type + _.uniqueId();
  }
}
