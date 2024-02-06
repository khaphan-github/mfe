import * as _ from "lodash";
import { Product } from "./product.model";

export interface TesttViewModel {
  displayname: string;
};

export class Products {
   private listItemProduct: Array<Product> = [];

  constructor(args?: any) {
    const { Product = [] } = args || {};
    this.listItemProduct = Product;
  }

  convertDataFromAPI(args?: any): void {
    const data = args.list;
    if (!_.isNil(data)) {
      this.listItemProduct = _.map(data, (value) => {
        return new Product({
          id: value.id,
          key: value.key,

          // name_default: value.info.name_default,
          // name_display: value.info.name_display,
          // description: value.info.description,
          name_default: value.name_default,
          name_display: value.name_display,
          description: value.description,

          category: value.category,

          seo: value.seo,

          current_status: value.current_status,
          public_time: value.public_time,
        });
      });
    }
  }

  getProducts() {
    return this.listItemProduct;
  }


  getTest(): TesttViewModel {
    return {
      displayname: '',
    }
  }

}
