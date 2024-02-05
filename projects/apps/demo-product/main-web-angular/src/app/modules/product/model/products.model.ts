import { IModalFilterSharedState } from "../shared-state/fitler-modal-shared.state";
import _ from "lodash";
import { HinhAnhSeoSanPham, Product, ThongTinChiTietProductVariant, ThongTinChungSanPham } from "./product.model";
import { ProductVariant } from "./product-variant.model";
import { BehaviorSubject } from "rxjs";


export class ProductsModel {
  private products: Product[] = [];
  private total_records: number = 0; // Tach ra

  constructor(args?: any) {
    const {
      products = [],
      total_records = 0
    } = args || {};
    this.products = products;
    this.total_records = total_records;
  }


  /**
   * Ánh xạ dữ liệu từ phản hồi API thành định dạng TableProductModel.
   *
   * @param response Phản hồi từ API.
   * @returns TableProductModel Đối tượng TableProductModel với dữ liệu đã ánh xạ.
   */
  mapDataFromAPI(response?: any) {
    console.log(response)
    console.log("--------------")
    this.products = [];
    if (!_.isNil(response)) {
      this.products = response.records.map((ele: any) => {
        let product =  new Product();
        ele['id'] = ele.product_id;
        product.setProduct(ele);
        return product;
      });
    }
    this.total_records = response?.totalRecords;
    return this;
  }



  getProducts() {
    return this.products;
  }

  getTotalRecords() {
    return this.total_records;
  }

  setTotalRecords(data: number) {
    this.total_records = data;
  }

  mapDataFromLocal(data?: any) {
    this.products = [];
    if (!_.isNil(data)) {
      this.products = data.products.map((ele: any) => {
        return new Product(ele);
      });
    }
    this.total_records = data?.total_records;
  }


  appendItemsToProductList = (model: Product) => {
    this.products.unshift(model);
    this.total_records = parseInt(this.total_records.toString()) +  1;
  }

  // Update if exist else add new
  updateItemExistedInProductList = (model: Product) => {

    const productIndex = this.products.findIndex(item => item.id === model.id);

    if (productIndex !== -1) {
        this.products[productIndex] = model;
    } else {
      this.products.unshift(model);
    }
  }


  findById = (id: number): Product | undefined => {
    const currentList = this.products;
    if (currentList) {
      return currentList.find(product => product.id == id);
    }
    return undefined;
  }


  findProductImageSeo = (id: number): HinhAnhSeoSanPham | undefined => {
    const currentList = this.products;
    if (!_.isNil(currentList)) {
      let product = currentList.find(product => product.id == id);
      if (!_.isNil(product)) {
        let image = product.checkedHinhAnhSeo();
        if (image) {
          return {
            hinh_anh: product.hinh_anh,
            seo: product.seo
          };
        }
      }
    }
    return undefined;
  }



  findListProductVariant = (id: number): ProductVariant[] | undefined => {
    const currentList = this.products;
    if (!_.isNil(currentList)) {
      let product = currentList.find(product => product.id == id);
      if (!_.isNil(product)) {
        let productVariant = product.getListProductVariant();
        if (!_.isEmpty(productVariant)) {
          return productVariant;
        }
      }
    }
    return undefined;
  }

  findProductVariant = (productId: number, variantId: number): ThongTinChiTietProductVariant | undefined => {
    const currentList = this.products;
    if (!_.isNil(currentList)) {
      let product = currentList.find(product => product.id == productId);
      if (!_.isNil(product)) {
        let productVariant = product.getProductVariant(variantId);
        if (!_.isNil(productVariant)) {
           return {
            id: productVariant.id,
            key: productVariant.key,
            product_name: product.name_default,
            product_key: product.key,
            name_variant: productVariant.name_variant,
            is_default: productVariant.is_default,
            attribute: productVariant.attribute,
            prices: productVariant.prices,
            current_status: productVariant.current_status,
            public_time: productVariant.public_time
           }
        }
      }
    }
    return undefined;
  }




  findThongTinChungProduct = (id: number): ThongTinChungSanPham | undefined => {
    const currentList = this.products;
    if (!_.isNil(currentList)) {
      let product = currentList.find(product => product.id == id);
      if (!_.isNil(product)) {
        if (!_.isEmpty(product.category) && !_.isEmpty(product.name_default)) {
          return {
            id: product.id,
            key: product.key,
            name_default: product.name_default,
            name_display: product.name_display,
            description: product.description,
            category: product.category,
            current_status: product.current_status,
            public_time: product.public_time
          };
        }
      }
    }
    return undefined;
  }
}
