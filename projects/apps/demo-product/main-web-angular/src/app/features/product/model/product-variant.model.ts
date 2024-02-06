import { IPriceProductVariantDto, IUpdateProductVariantDto } from "../dto/product-variant.dto";

export interface IPriceProductVariant {
  retail: number;
  wholesale: number;
}

export class ProductVariant {
  id: number;
  key: number;
  name_variant: string;
  is_default: boolean;
  attribute: Array<AttributeInit>;
  prices: IPriceProductVariant;
  current_status: string;
  public_time: string;

  constructor(args?: any) {
    const {
      id = 0,
      key = 0,
      name_variant = "",
      attribute = [],
      prices = {
        retail: 0,
        wholesale: 0
      },
      current_status = false,
      public_time = "",
      is_default = false

    } = args || {};
    this.id = id;
    this.key = key;
    this.name_variant = name_variant;
    this.attribute = attribute;
    this.prices = prices;
    this.current_status = current_status;
    this.is_default = is_default;
    this.public_time = public_time
  }

  setId(data: number) {
    this.id = data;
  }

  setKey(data: number) {
    this.key = data;
  }

  setNameDefault(data: string) {
    this.name_variant = data
  }

  setDefault(data: boolean) {
    this.is_default = data;
  }

  setAttribute(data: any) {
    this.attribute = data;
  }

  setPrices(data: IPriceProductVariant) {
    this.prices = data;
  }

  setCurrentStatus(data: string) {
    this.current_status = data;
  }

  setPublicTime(data: string) {
    this.public_time = data;
  }

  setter(data: any) {
    this.id = data.variant_id;
    this.key = data.key;
    this.name_variant = data.info.name_variant;
    this.is_default = data.is_default ? data.is_default : this.is_default;
    this.attribute = data.attribute ? data.attribute : this.attribute;
    this.prices = data.prices ? data.prices : this.prices;
    this.current_status = data.current_status ? data.current_status : this.current_status;
    this.public_time = data.public_time ? data.public_time : this.public_time;
  }

  update(data: IUpdateProductVariantDto) {
    this.name_variant = data.info && data.info.name_variant ? data.info.name_variant : this.name_variant;
    this.is_default = data.is_default ? data.is_default : this.is_default;
    this.attribute = data.attribute ? this.setElementAttribute(data.attribute) : this.attribute;
    this.prices = data.prices ? this.setElementPrice(data.prices) : this.prices;
    this.current_status = data.current_status ? data.current_status : this.current_status;
    this.public_time = data.public_time ? data.public_time : this.public_time;
  }

  setElementPrice(prices: IPriceProductVariantDto) {
    if (prices.retail && prices.retail > 0) {
      this.prices.retail = prices.retail;
    }
    if (prices.wholesale && prices.wholesale > 0) {
      this.prices.wholesale = prices.wholesale;
    }
    return this.prices;
  }

  setElementAttribute(attribute: AttributeInit[]) {
    for (let index = 0; index < attribute.length; index++) {
      const element = attribute[index];
      for (let idx = 0; idx < this.attribute.length; idx++) {
        const ele = this.attribute[idx];
        if (element.id == ele.id) {
          this.attribute[idx].values = element.values;
          break;
        }
      }
    }
    return this.attribute;
  }

  /**
   * Ánh xạ dữ liệu từ server thành Product Variant model.
   *
   * @param response Dữ liệu trẩ về từ server.
   */
  setDataByResponse = (response: any) => {
    let res = response.map((ele: any) => {
      let productVariant = new ProductVariant();
      productVariant.setter(ele);
      return productVariant;
    })
    return res;
  }

}


export interface AttributeInit {
  id: number;
  name: string;
  data_sources: Array<IDataSource>;
  values: number;
}


export interface IDataSource {
  id: number;
  name: string;
}
