import * as _ from "lodash";
import { ICreateProductDto, IUpdateProductDto } from "../dto/product.dto";
import { HinhAnhSanPham, SEO } from "./product-seo-image.model";
import { AttributeInit, IPriceProductVariant, ProductVariant } from "./product-variant.model";

export interface HinhAnhSeoSanPham {
  hinh_anh: HinhAnhSanPham,
  seo: SEO
}

export interface ThongTinChungSanPham {
  id: number;
  key: number;
  name_default: string;
  name_display: string;
  description: string;
  category: Array<CategoryInit>;
  current_status: string;
  public_time: string;
}


export interface ThongTinChiTietProductVariant {
  id: number;
  key: number;
  product_name: string;
  product_key: number;
  name_variant: string;
  is_default: boolean;
  attribute: Array<AttributeInit>;
  prices: IPriceProductVariant;
  current_status: string;
  public_time: string;
}

export class Product {
  //Thong tin co ban
  id: number;
  key: number;
  name_default: string;
  name_display: string;
  description: string;

  //phan loai
  category: Array<CategoryInit>;

  //bien the
  products_variant: Array<ProductVariant>;

  //nhom seo
  hinh_anh!: HinhAnhSanPham;
  seo!: SEO;


  //khac
  current_status: string;
  public_time: string;
  is_show: boolean;


  constructor(args?: any) {
    const {
      id = 0,
      key = 0,
      name_default = "",
      name_display = "",
      description = "",
      category = {},
      products_variant = [],
      current_status = "",
      public_time = "",
      is_show = true,
      hinh_anh = {},
      seo = {}
    } = args || {};
    this.id = id;
    this.key = key;
    this.name_default = name_default;
    this.name_display = name_display;
    this.description = description;
    this.products_variant = products_variant;
    this.category = category;
    this.current_status = current_status;
    this.public_time = public_time;
    this.is_show = is_show;
    this.hinh_anh = hinh_anh;
    this.seo = seo
  }

  setProduct(data: IUpdateProductDto) {
    this.id = data.id;
    this.key = data.key ? data.key : this.key;
    this.name_default = data.info && data.info.name_default ? data.info.name_default : this.name_default;
    this.name_display = data.info && data.info.name_display ? data.info.name_display : this.name_display;
    this.description = data.info && data.info.description ? data.info.description : this.description;
    this.category = data.category ? this.setElementCategory(data.category) : this.category;
    this.current_status = data.current_status ? data.current_status : this.current_status;
    this.public_time = data.public_time ? data.public_time : this.public_time;
    this.hinh_anh = data.info && data.info.images ? new HinhAnhSanPham(data.info.images) : this.hinh_anh;
    this.seo = data.info && data.info.seo ? new SEO(data.info.seo) : this.seo;
  }

  setElementCategory(category: CategoryInit[]) {
    for (let index = 0; index < category.length; index++) {
      const element = category[index];
      for (let idx = 0; idx < this.category.length; idx++) {
        const ele = this.category[idx];
        if (element.id == ele.id) {
          this.category[idx].values = element.values;
          break;
        }
      }
    }
    return this.category;
  }

  setKey(data: number) {
    this.key = data;
  }

  setIsShow(data: boolean) {
    this.is_show = data;
  }

  setThongTinChung(data: any) {
    this.name_display = data.name_display;
    this.category = data.category;
    this.current_status = data.current_status;
    this.public_time = data.public_time;
  }


  setCategory(data: any) {
    this.category = data;
  }

  setProductsVariant(data: Array<ProductVariant>) {
    this.products_variant = data;
  }

  setOneProductsVariant(data: ProductVariant) {
    this.products_variant = this.products_variant.map(ele => {
      if (ele.id == data.id) {
        ele = data;
      }
      return ele;
    });
  }

  setProductVariant(data: ProductVariant) {
    this.products_variant.map(ele => {
      if (ele.id == data.id) {
        ele = data;
        return ele;
      }
      return ele;
    })
  }

  createProductVariant(data: ProductVariant) {
    this.products_variant.push(data);
  }

  deleteProductVariant(id: number) {
    let index = this.products_variant.findIndex(ele => ele.id == id);
    if (index > -1) {
      this.products_variant.splice(index, 1);
    }
  }

  checkedHinhAnhSeo() {
    if (!_.isEmpty(this.hinh_anh) && !_.isEmpty(this.seo)) {
      return true;
    }
    return false;
  }

  setHinhAnhSeo(data: HinhAnhSeoSanPham) {
    this.hinh_anh = data.hinh_anh;
    this.seo = data.seo;
  }

  setHinhAnhSeoByForm(data: any) {
    this.hinh_anh = data.hinh_anh;
    this.seo = data.seo;
  }

  setCurrentStatus(data: string) {
    this.current_status = data;
  }

  setPublicTime(data: string) {
    this.public_time = data;
  }

  setId(data: number) {
    this.id = data;
  }

  getNameDefault() {
    return this.name_default;
  }

  getListProductVariant() {
    return this.products_variant;
  }

  setListProductVariant(data: ProductVariant[]) {
    this.products_variant = data;
  }

  getProductVariant(variantId: number) {
    return this.products_variant.find(ele => ele.id == variantId && !_.isEmpty(ele.attribute));
  }

  getCategories() {
    return this.category;
  }

  setDataByForm = (formData: ICreateProductDto) => {
    this.name_default = formData.name;
  }


  setDataByResponse = (response: any) => {
    let product = new Product();
    response['id'] = response.id;
    product.name_default = response.name_default
    product.setProduct(response)
    return response as Product;
  }


  setDataByFormUpdate(data: any) {
    this.key = data.ma_san_pham;
    this.name_default = data.ten_san_pham;
    this.name_display = data.ten_hien_thi_gd;
  }


  setDataHinhAnhAndSEOByResponse = (response: any) => {
    return {
      hinh_anh: response.images,
      seo: response.seo
    };
  }


  setDataThongTinChungByResponse = (response: any) => {

    let category: Array<CategoryInit> = [];
    if (response.category) {
      response.category.map((ele: any) => {
        category.push(ele);
      })
    }

    return {
      id: response.id,
      key: response.key,
      name_default: response.name_default,
      name_display: response.name_display,
      description: response.description,
      category: category,
      current_status: response.current_status,
      public_time: response.public_time
    };
  }


  setOneDataProductVariantByResponse = (response: any) => {

    let attributes: Array<AttributeInit> = [];
    if (response.attribute) {
      response.attribute.map((ele: any) => {
        attributes.push(ele);
      })
    }

    this.name_default = response.product_name;
    this.key = response.product_key;

    return {
      id: response.variant_id,
      key: response.key,
      name_variant: response.info.name_variant,
      is_default: response.is_default,
      attribute: attributes,
      prices: response.prices ? response.prices : {
        retail: 0,
        wholesale: 0
      },
      current_status: response.current_status,
      public_time: response.public_time,
      product_name: response.product_name,
      product_key: response.product_key
    };
  }


  getProductVariantByResponse(response: any) {
    let productVariant = new ProductVariant();
    productVariant.setter(response);
    return productVariant;
  }

}


export interface CategoryInit {
  id: number;
  name: string;
  data_sources: Array<IDataSource>;
  values: Array<number>;
}

export interface IDataSource {
  id: number;
  name: string;
}
