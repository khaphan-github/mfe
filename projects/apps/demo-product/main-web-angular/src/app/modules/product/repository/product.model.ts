import { SEO } from "./product-seo.model";

// 
export interface ICategory {
  id: number;
  name: string;
}

export class Product {
  id: number;
  key: string;
  //info:json
  name_default: string;
  name_display: string;
  description: string;

  //category
  category: Array<ICategory>;

  seo: SEO;

  //...
  current_status: string;
  public_time: string;

  constructor(args?: any) {
    const {
      id = 0,
      key = '',

      name_default = '',
      name_display = '',
      description = '',

      category = [],

      seo = {},

      current_status = '',
      public_time = '',

    } = args || {};

    this.id = id;
    this.key = key;

    this.name_default = name_default;
    this.name_display = name_display;
    this.description = description;

    this.category = category;

    this.seo = seo;

    this.current_status = current_status;
    this.public_time = public_time;

    // Các xử lý dữ liệu khác trong model nếu cần
    // this.doSomethingWithData();
  }

  private doSomethingWithData() {
    // Các xử lý dữ liệu trong model nếu cần
  }
}
