import { Injectable } from '@angular/core';
import { AppStorageService, StorageLocation } from '@core/app-store/app-storage.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '@config/api.config';
import { ErrorBase } from '@core/models/error-base.model';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { CompanyDataHandler, CompanyModel } from '../model/company.model';

@Injectable()
export class CompanyService {
  private readonly storageScope = this.storage.sessionStorageKeys.features.products.filters;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: AppStorageService,
  ) { }

  /**
    * Lấy danh sách công ty sản phẩm nếu danh sách công ty không có trong SESSION_STORAGE
    * thì mới gọi api lấy data.
    */
  getAll = (): Observable<CompanyModel[]> => {
    const storedKey = this.storageScope.companies;

    const companiesStoraged = this.storage.getItem<CompanyModel[]>(
      storedKey,
      { location: StorageLocation.SESSION_STORAGE }
    );

    if (companiesStoraged && companiesStoraged.length !== 0) {
      return of(companiesStoraged);
    }

    const response = this.httpClient.get<any>(
      API_ENDPOINTS.company, { observe: 'response' }
    );

    return response.pipe(
      map((response) => new CompanyDataHandler(response?.body).mapDataFromAPI()),
      tap((responseMapped: CompanyModel[]) => {
        this.storage.setItem(storedKey, responseMapped, {
          location: StorageLocation.SESSION_STORAGE
        });
      }),
      catchError((error: ErrorBase) => throwError(() => error))
    )
  }
}
