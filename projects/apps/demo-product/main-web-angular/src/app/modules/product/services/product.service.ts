import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  debounceTime,
  delay,
  lastValueFrom,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';

import * as _ from 'lodash';
import {

  FilterModalSharedState,
  IModalFilterSharedState,
} from '../shared-state/fitler-modal-shared.state';
import {
  HinhAnhSeoSanPham,
  ThongTinChiTietProductVariant,
  ThongTinChungSanPham,
} from '../model/product.model';
import { ProductVariant } from '../model/product-variant.model';
import { ICreateProductDto, IUpdateProductDto } from '../dto/product.dto';
import {
  ICreateProductVariantDto,
  IUpdateProductVariantDto,
} from '../dto/product-variant.dto';

import { Products } from '../repository/products.model';
import { SelectedItemSharedState } from '../shared-state/selected-item-shared.state';
import { Product } from '../repository/product.model';
import { GLOBAL_CONFIG_PAGE_SIZE, SortOptions } from '@erp/angular/components';
import { ErrorBase } from '@erp/angular/logic';
import { API_ENDPOINTS } from '../../../configs/api.config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  filterState = inject(FilterModalSharedState);
  selectedItemState = inject(SelectedItemSharedState);

  // danh sach Product
  private products: Products = new Products();

  private productsDisplay = new BehaviorSubject<Array<Product> | null>(null);
  public products$: Observable<Array<Product> | null> = this.productsDisplay.asObservable(); //de ben ngoai xem du lieu

  private productDetails = new BehaviorSubject<Product | null>(null);
  productDetails$ = this.productDetails.asObservable().pipe(shareReplay(1));

  //flag đánh dấu dữ liệu list có sự thay đổi
  private productsHasChanged: boolean = true;
  public useDataInSubject: boolean = false;

  // so luong recore
  private readonly totalRecord = new BehaviorSubject<number>(0);
  public readonly totalRecord$ = this.totalRecord.asObservable();
  constructor(
    private readonly httpClient: HttpClient,
  ) {
    console.log(`ProductServiceConstructor`)
  }

  private _getProductListData = (filter: any) => {
    // Trong trường hợp, list dữ liệu trước đó không có phần tử, thì lúc nào cũng sẽ bị gọi API
    // Trong trường hợp, server có data mới, thì hệ thống vẫn chưa cập nhật dữ liệu mới. Phải click search
    // Tùy theo loại nghiệp vụ. Mức độ dữ liệu thay đổi nhiều bởi các thành viên trong cùng nhóm quán lý. Cân nhắc có dùng đoạn logic này hay không.
    const useDataInSubject = this.useDataInSubject
      && this.productsDisplay.value
      && this.productsDisplay.value.length !== 0;

    if (useDataInSubject) {
      this.productsDisplay.next(this.productsDisplay.getValue());
      this.totalRecord.next(this.totalRecord.getValue());
      this.SetProductIsChanged(false);
      return of(true);
    };

    //#regions  Trích xuất thông tin từ filter để tạo request body or query param
    let requestBody: any = {
      page: GLOBAL_CONFIG_PAGE_SIZE.pageDefault + 1, // Because of page require positive
      per_page: GLOBAL_CONFIG_PAGE_SIZE.pageSizeDefault,
      filters: [],
      sorts: [],
    };
    // # The default value for the 'page' parameter sent to the server should be set to a minimum of 1.
    requestBody.page = (filter?.page || GLOBAL_CONFIG_PAGE_SIZE.pageDefault) + 1;
    requestBody.per_page = +filter?.size || GLOBAL_CONFIG_PAGE_SIZE.pageSizeDefault;

    // # Additional other query example: { id:"branch", value: "vinamilk" }
    if (filter?.searchString && filter?.searchString.length !== 0) {
      requestBody.filters.push({
        id: 'searchString', // <--- Key from backend
        value: filter?.searchString,
      });
    }
    if (filter?.categoryByAlias && filter?.categoryByAlias.length !== 0) {
      requestBody.filters.push({
        id: 'categoryByAlias', // <--- Key from backend
        value: filter?.categoryByAlias,
      });
    }

    if (filter?.status && filter?.status.length !== 0) {
      const value = filter?.status[0]?.id;
      // 0 is all
      if (value !== '0') {
        requestBody.filters.push({
          id: 'status', // <--- Key from backend
          value: filter?.status[0]?.id,
        });
      }
    }

    // # Sort is an array - Result ex: [name:asc, age:desc]
    if (filter?.sortBy && filter?.sortBy.length !== 0) {
      requestBody.sorts = (filter?.sortBy as []).map((sort: SortOptions) => sort.id);
    }

    /* If use request body:
      this.httpClient.get<any>(`${API_ENDPOINTS.product}/get-all`, requestBody)...
    */
    // Else use query param:
    return this.httpClient
      .post<any>(`${API_ENDPOINTS.product}/get-all`, requestBody).pipe(
        tap((response) => {
          this.products.convertDataFromAPI(response);
          this.productsDisplay.next(this.products.getProducts());

          this.totalRecord.next(response.total);

          this.SetProductIsChanged(false);
        }),

        catchError((error: ErrorBase) => {
          console.log(error);
          this.productsDisplay.next([]);
          this.totalRecord.next(0);
          this.SetProductIsChanged(false);
          return EMPTY
        })
      );
  };

  GetProductListData() {
    // có shared state;
    return this.filterState.getState().pipe(
      debounceTime(500), // Chờ 500ms sau mỗi lần gửi yêu cầu
      // ;load
      switchMap((shareData) => {
        return this._getProductListData(shareData);
      })
      // ;load
    );
  }

  DeleteProductById = (id: number[]) => {
    // Case error happen
    // try {
    //   throw new Error(`My test error`);
    // } catch (error) {
    //   return of({
    //     error: true,
    //     message: 'This is my catch error',
    //     errorItems: id,
    //     totalItems: id.length
    //   })
    // }
    // case error khi chan la duoc xoa
    const MOCK_API_DELAY_TIME = 1500; //MS;
    const errorItems: number[] = id.filter((_id) => _id % 2 === 0);
    return of({
      error: true,
      message: 'Error primary key....',
      errorItems: errorItems,
      totalItems: id.length
    }).pipe(delay(MOCK_API_DELAY_TIME), catchError((err) => {
      return of({
        error: true,
        message: 'Error primary key....',
        errorItems: errorItems,
        totalItems: id.length
      })
    }));

    // case sucess
    return of({
      error: false,
      message: 'Delete success',
    });

    const url = `${API_ENDPOINTS.product}/${id}`;
    // if (id == 2) return throwError(() => new Error(`Sản phẩm ${id} không thể xóa vì lý do: abcxyz...`));
    const requestBody = {
      ids: id
    }
    return this.httpClient.post<any>(url, requestBody).pipe(
      map((response) => {
        // Case delete fail
        if (response.error) {
          return {
            error: true,
            message: response.message,
            errorItems: response.errorItems, // <-- array
          }
        }
        return true;
      }),
      catchError((error: ErrorBase) => {
        return throwError(() => error);
      })
    );
  };

  deleteById(id: number) {
    const requestBody = {
      id: id
    }
    return this.httpClient.post(`${API_ENDPOINTS.product}/delete`, requestBody).pipe(
      tap((response) => {
        this.SetProductIsChanged(true);
      })
    );
  }

  // DeleteManyByIds = (ids: number[]) => {
  //   const deleteRequests = ids.map(id => this.DeleteProductById(id).pipe(
  //     map(() => {
  //       return {
  //         id: id,
  //         success: true,
  //       }
  //     }),
  //     catchError(error => {
  //       return of({ id, success: false, error: error });
  //     })
  //   ));

  //   return forkJoin(deleteRequests);
  // }

  /**
   * Hàm reload dữ liệu dành riêng cho các tương tác làm thay đổi dữ liệu ở DB của product
   * Khi người dùng đứng ở một view khác, ko phải đang ở trực tiếp trên view list
   */
  ReloadDataAndBackToViewManageProductLists() {
    if (this.productsHasChanged) {
      lastValueFrom(this.GetProductListData().pipe(take(1)));
    }
  }


  SetProductIsChanged = (isChanged: boolean) => this.productsHasChanged = isChanged;

  // #region

  /********************************************* Xử lý tương tác với API ***************************************************** */

  /**
   * Lấy products model
   * @returns trả về products model
   */
  getProductsModel() {
    return this.products;
  }

  /**
   * Trả về thông tin sản phẩm
   * @param id id của sản phẩm
   * @returns Thông tin của sản phẩm
   */
  getProductById(id: number) {
    const storedProduct = this.productDetails.getValue();

    if (storedProduct && storedProduct.id === id) {
      this.productDetails.next(storedProduct);
      return of(storedProduct);
    }

    const url = `${API_ENDPOINTS.product}/get-one/${id}`;

    return this.httpClient.get<any>(url).pipe(
      map(response => new Product(response)),
      tap(response => this.productDetails.next(response)),
      catchError((error: ErrorBase) => throwError(() => error))
    ).pipe(shareReplay())
  }

  /**
   * Tạo một sản phẩm mới dựa trên dữ liệu từ biểu mẫu.
   *
   * @param formData Dữ liệu sản phẩm từ biểu mẫu.
   * @returns Observable<ProductModel> Ứng dụng theo dõi dữ liệu sản phẩm dạng ProductModel.
   */
  createProduct = (formData: ICreateProductDto): Observable<Product> => {
    const requestBody = {
      name_default: formData.name
    }

    const response = this.httpClient.post<any>(`${API_ENDPOINTS.product}/create`, requestBody);

    return response.pipe(
      map((response) => new Product(response)),
      catchError((error: ErrorBase) => {
        return throwError(() => error);
      })
    );
  }

  editProduct = (data: any) => {
    const requestBody = {
      id: data.id,
      name_default: data.name
    }

    const response = this.httpClient.post<any>(`${API_ENDPOINTS.product}/edit`, requestBody);
    return response.pipe(
      map((response) => new Product(response)),
      catchError((error: ErrorBase) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Lấy thông tin hình ảnh va seo của product
   * @param productId id của product
   * @returns Thông tin về hình ảnh va seo của product
   */
  getProductImageAndSeo(productId: number): Observable<HinhAnhSeoSanPham> {
    // Kiểm tra có tồn tại trong shared state hay không, nếu có thì lấy trong shared;
    // const productImage = this.products.findProductImageSeo(productId);
    // if (productImage) {
    //   return of(productImage);
    // }
    // const url = `${API_ENDPOINTS.product}/${productId}?query=image&query=seo`;

    // const response = this.httpClient.get<any>(url, {
    //   observe: 'response',
    // });

    // return response.pipe(
    //   map((response) => new Product().setDataHinhAnhAndSEOByResponse(response.body.data)),
    //   tap((image) => {
    //     if (!_.isNil(this.products)) {
    //       let product = this.products.getProducts().find(ele => ele.id == productId);
    //       if (!_.isNil(product)) {
    //         product.setHinhAnhSeo(image);
    //         this.products.updateItemExistedInProductList(product);
    //       }
    //     }
    //   }),
    //   catchError((error: ErrorBase) => {
    //     return throwError(() => error);
    //   })
    // )
    return of();
  }

  /**
   *
   * @param productId id của product
   * @param dto thông tin của product image
   * @returns trả về
   */
  updateProduct(dto: IUpdateProductDto) {
    const requestBody = dto;
    console.log(`Call this function to laod ata`)
    return this.httpClient.put<any>(`${API_ENDPOINTS.product}/${requestBody.id}`, requestBody)
      .pipe(
        map((response) => {
          this.SetProductIsChanged(true);
          return new Product(response);
        }),
        catchError((error: ErrorBase) => {
          return throwError(() => error);
        })
      );
  }

  updateProducts(items: Array<any>) {
    const requestBody = {
      items: items
    }
    return this.httpClient.put<any>(`${API_ENDPOINTS.product}/update-array`, requestBody);
  }

  /**
   * Lấy danh sách product variant chỉ gồm thông tin chung
   * @param productId id của product
   * @returns trả về danh sách product variant
   */
  getListProductVariant(productId: number): Observable<ProductVariant[]> {
    // const productVariant = this.products.findListProductVariant(productId);
    // if (productVariant) {
    //   return of(productVariant);
    // }
    // const url = `${API_ENDPOINTS.product}/${productId}/variants`;

    // const response = this.httpClient.get<any>(url, {
    //   observe: 'response',
    // });

    // return response.pipe(
    //   map((response) => new ProductVariant().setDataByResponse(response.body.data)),
    //   tap((productVariants) => {
    //     if (!_.isNil(this.products)) {
    //       let product = this.products.getProducts().find(ele => ele.id == productId);
    //       if (!_.isNil(product)) {
    //         product.setProductsVariant(productVariants);
    //         this.products.updateItemExistedInProductList(product);
    //       }
    //     }
    //   }),
    //   catchError((error: ErrorBase) => {
    //     return throwError(() => error);
    //   })
    // )
    return of();
  }

  /**
   * Lấy thông tin chi tiết của 1  product variant
   * @param variantId id của variant
   * @returns trả về thông tin chi tiết của 1 product variant
   */
  getChiTietProductVariant(
    productId: number,
    variantId: number
  ): Observable<ThongTinChiTietProductVariant> {
    // const productVariant = this.products.findProductVariant(productId, variantId);
    // if (productVariant) {
    //   return of(productVariant);
    // }
    // const url = `${API_ENDPOINTS.product}/${productId}/variants/${variantId}`;

    // const response = this.httpClient.get<any>(url, {
    //   observe: 'response',
    // });

    // return response.pipe(
    //   map((response) => new Product().setOneDataProductVariantByResponse(response.body.data)),
    //   tap((productVariants) => {
    //     if (!_.isNil(this.products)) {
    //       let product = this.products.getProducts().find(ele => ele.id == productId);
    //       if (!_.isNil(product)) {
    //         product.setOneProductsVariant(new ProductVariant(productVariants));
    //         this.products.updateItemExistedInProductList(product);
    //       }
    //     }
    //   }),
    //   catchError((error: ErrorBase) => {
    //     return throwError(() => error);
    //   })
    // )
    return of();
  }

  /**
   * Cập nhật lại product variant
   * @param productId id của product
   * @param body thông tin của Product Variant
   * @returns nhận kết quả từ server
   */
  updateProductVariant(
    productId: number,
    variantId: number,
    dto: IUpdateProductVariantDto
  ) {
    // return this.httpClient.put(`${API_ENDPOINTS.product}/${productId}/variants/${variantId}`, dto)
    //   .pipe(
    //     map((response) => of(response)),
    //     tap((value) => {
    //       if (!_.isNil(this.products)) {
    //         let product = this.products.getProducts().find(ele => ele.id == productId);
    //         if (!_.isNil(product)) {
    //           if (dto.is_default) {
    //             product.setListProductVariant(product.getListProductVariant().map(ele => {
    //               if (ele.id == variantId) {
    //                 ele.update(dto);
    //                 return ele;
    //               }
    //               ele.is_default = false;
    //               return ele
    //             }))
    //           } else {
    //             product.setListProductVariant(product.getListProductVariant().map(ele => {
    //               if (ele.id == variantId) {
    //                 ele.update(dto);
    //                 return ele;
    //               }
    //               return ele
    //             }))
    //           }
    //           this.products.updateItemExistedInProductList(product);
    //         }
    //       }
    //     }),
    //     catchError((error: ErrorBase) => {
    //       return throwError(() => error);
    //     })
    //   );
    return of();
  }

  /**
   * Cập nhật lại product variant
   * @param productId id của product
   * @param body thông tin của Product Variant
   * @returns nhận kết quả từ server
   */
  createProductVariant(productId: number, dto: ICreateProductVariantDto) {
    // const response = this.httpClient.post<any>(`${API_ENDPOINTS.product}/${productId}/variants`, dto);

    // return response.pipe(
    //   map((response) => new Product().getProductVariantByResponse(response.data)),
    //   tap((value) => {
    //     let body = Object.assign(dto, value)
    //     if (!_.isNil(this.products)) {
    //       let product = this.products.getProducts().find(ele => ele.id == productId);
    //       if (!_.isNil(product)) {
    //         product.createProductVariant(new ProductVariant(body));
    //         this.products.updateItemExistedInProductList(product);
    //       }
    //     }
    //   }),
    //   catchError((error: ErrorBase) => {
    //     return throwError(() => error);
    //   })
    // );
    return of();
  }

  /**
   * Xóa một product variant
   * @param id id của product variant
   * @returns nhận kết quả từ server
   */
  deleteProductVariant(productId: number, variantId: number) {
    // return this.httpClient.delete<Product>(`${API_ENDPOINTS.product}/${productId}/variants/${variantId}`)
    //   .pipe(
    //     map((response) => of(response)),
    //     tap((value) => {
    //       if (!_.isNil(this.products)) {
    //         let product = this.products.getProducts().find(ele => ele.id == productId);
    //         if (!_.isNil(product)) {
    //           product.deleteProductVariant(variantId);
    //           this.products.updateItemExistedInProductList(product);
    //         }
    //       }
    //     }),
    //     catchError((error: ErrorBase) => {
    //       return throwError(() => error);
    //     })
    //   );
    return of();
  }

  /**
   * Lấy thông tin product
   * @param productId id của product
   */
  getThongTinChungProduct(productId: number): Observable<ThongTinChungSanPham> {
    // const url = `${API_ENDPOINTS.product}/${productId}`;

    // const response = this.httpClient.get<any>(url, {
    //   observe: 'response',
    // });

    // return response.pipe(
    //   map((response) => new Product(response)),
    //   tap((response) => console.log(response)),
    //   catchError((error: ErrorBase) => {
    //     return throwError(() => error);
    //   })
    // )
    return of();
  }

  /********************************************* Xử lý tương tác với Observable Core State ***************************************************** */

  /**
   * Lấy số lượng mục (items per page) trên mỗi trang từ trạng thái chia sẻ của bộ lọc.
   *
   * @returns Observable<number> Ứng dụng theo dõi số lượng mục trên mỗi trang.
   */
  getItemsPerPage = (): Observable<number> => {
    return this.filterState
      .getState()
      .pipe(map((state) => state?.size || 10));
  };

  getFilteredState = () => {
    return this.filterState.getState();
  };

  // getCurrentSelectedItemId = (): Observable<number | string> => {
  //   return this.filterState.getState().pipe(map((state) => state?.currentSelectionItemId || -1));
  // }

  // #region product list:
  getProductListInState = (): Observable<Array<Product>> => {
    // return of(this.products.getProducts())
    return of();
  };

  getTotalRecordsByFilter = () => {
    return of();
    // return of(this.products.getTotalRecords());
  };

  getProductTableInState = () => {
    // return of(this.products);
  };

  setProductListSharedState = (state: Products) => {
    this.products = state;
  };
  // #endregion product list:

  /**
   * Tạo các tham số bộ lọc từ trạng thái chia sẻ bộ lọc.
   *
   * @param filter Trạng thái chia sẻ bộ lọc.
   * @returns Các tham số bộ lọc dưới dạng đối tượng.
   */
  getFilterParams = (filter: IModalFilterSharedState) => {
    const params: any = {};

    if (filter?.size) params._limit = +filter.size;

    if (filter?.page) params._page = +filter.page;

    return params;
  };
  // #endregion


  exportExcel(itemsIds: Array<number>) {
    return this.httpClient.get(API_ENDPOINTS.product + '/export');
  }

}
