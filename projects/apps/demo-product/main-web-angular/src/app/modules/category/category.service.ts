import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  map,
  of,
  share,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categories, Category } from './model/category.model';
import { ErrorBase } from '@erp/angular/logic';
import { API_ENDPOINTS } from '../../configs/api.config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Categories = new Categories();
  private categoriesDisplaySubject = new BehaviorSubject<Categories | null>(
    null
  );

  public Categories$: Observable<Categories | null> =
    this.categoriesDisplaySubject.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAll() {
    return this.httpClient
      .get<any>(`${API_ENDPOINTS.category}/get-all`)
      .pipe(
        map((response) => {
          this.categories.convertDataFromAPI(response.list);
          this.categoriesDisplaySubject.next(this.categories);
        }),
        catchError((error: ErrorBase) => {
          if(error.code == 0) {
            //TODO:Some things
          }
          return throwError(() => error);
        }),
      )
  }

  /**
   * Truyền vào key Cha, Lấy toàn bộ các con của category
   * Dữ liệu trả về 1 array, mỗi item là 1 catelogy
   *
   * hàm getChildrenOfNode này giúp bạn lấy danh sách con của một nút cụ thể trong cấu trúc cây hoặc danh sách các mục tương tự dựa trên dữ liệu trong Categories$. Nếu không có dữ liệu, nó sẽ gọi this.getAll() để tải dữ liệu và trả về một mảng rỗng cho đến khi dữ liệu có sẵn.
   */
  public getChildrenOfNode = (key: string): Observable<Category[]> => {
    if (this.categories.hasData()) {
      return of(this.categories.getChildrenOfNode(key));
    }
    return this.getAll().pipe(map(() => {
      return this.categories.getChildrenOfNode(key);
    })
    )
  };

  getOne = (id: number) => {
    return this.Categories$.pipe(
      switchMap((data: Categories | null) => {
        if (!data) {
          this.getAll();
          return of([]);
        } else {
          return of(data.findById(id));
        }
      })
    );
  }
}
