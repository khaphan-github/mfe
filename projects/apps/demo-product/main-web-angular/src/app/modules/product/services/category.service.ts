import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryDataHandler, CategoryModel } from '../model/category.model';
import { CategoriesModel } from '../model/categorys.model';
import * as _ from 'lodash';
import { API_ENDPOINTS } from '../../../configs/api.config';
import { AppStorageService, ErrorBase, StorageLocation } from '@erp/angular/logic';

@Injectable()
export class CategoryService {

  private readonly storageScope = '';

  categories: CategoriesModel = new CategoriesModel();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: AppStorageService
  ) { }
  // Get category then formated then storage to session storage;

  public getAll = (): Observable<CategoryModel[]> => {
    // const storedKey = this.storageScope.categories;

    // const categoryStoraged = this.storage.getItem<CategoryModel[]>(
    //   storedKey, { location: StorageLocation.SESSION_STORAGE }
    // );

    // if (categoryStoraged && categoryStoraged.length !== 0) {
    //   return of(categoryStoraged);
    // }

    const response = this.httpClient.get<any>(
      API_ENDPOINTS.category,
      { observe: 'response' }
    );

    return response.pipe(
      map((response) => new CategoryDataHandler(response?.body).mapDataFromAPI()),
      tap((responseMapped) => {
        this.storage.setItem('storedKey', responseMapped, { location: StorageLocation.SESSION_STORAGE });
      }),
      catchError((error: ErrorBase) => throwError(() => error))
    )
  }

  getCategory(id: number | string) : Observable<Category> {
    // Kiểm tra có tồn tại trong shared state hay không, nếu có thì lấy trong shared;
    const productInState = this.categories.findById(id);
    if (productInState) {
      return of(productInState);
    }
    const url = `${API_ENDPOINTS.product}/${id}`;

    const response = this.httpClient.get<any>(url, {
      observe: 'response',
    });

    return response.pipe(
      map((response) => new Category().setDataByResponse(response.body)),
      tap((value) => {
          this.categories.appendItemsToCategoryList(value);
      }),
      catchError((error: ErrorBase) => {
        return throwError(() => error);
      })
    )
  }
}
