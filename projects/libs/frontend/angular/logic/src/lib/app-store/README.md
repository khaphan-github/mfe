# Vấn đề cần giải quyết:

- Chức năng localStorage cần dùng rất nhiều ở những chức năng khác nhau, vấn đề xảy ra khi developer đặt tên của khóa, những khóa này có thể trùng ở các module mà developer khó nhận thấy
- Việc này gây cho ứng dụng có thể hoạt động sai khi đọc dữ liệu từ localStorage.

# Giải quyết:

- Đưa cấu hình localstorage vào chung 1 file.
- Dùng localStorage bằng cách inject CoreLocalStorage vào service muốn lưu trữ dữ liệu vào ocalStorage
- Mỗi khi ứng dụng chạy với môi trường development thì CoreLocalStorage sẽ tự động kiểm tra khai báo localStorageKey có bị trùng hay không:

```
@Injectable({ providedIn: 'root' })
export class AppForDevelopService {
  constructor(
    private readonly storage: CoreLocalStorage
  ) { }

  runDevelopmentTasks = () => {
    this.validateConfigLocalStorage();
    // ... //
  }
  private validateConfigLocalStorage = () => {
    this.storage.validateLocalStorageKeysConfig();
  }
}
```

# Tài liệu kỹ thuật:

## 1. Khai báo key của item trong LocalStorage:

- Cấu hình trong file: '/src/app/config/local-storage/localstorage.config.ts'
- Lưu ý:
  1. Cần đặt tên khóa đúng cú pháp để tránh sự trùng lặp tên khóa.
  2. Cần viết mô tả cho khóa đã khai báo - vd: // Khóa lưu trữ <Nội dung thông tin> trong chức năng <Tên chức năng>.
  3. Cần quy hoạch khóa dựa theo chức năng (feature) và toàn ứng dung (global):

```
export const LocalStorageConfigKeys = {
  global: {
    routing: {                <--- Tên chức năng global
      // Khóa lưu trữ URL trước đó trong định tuyến sau khi login thành công.
      previousUrl: 'global.routing.previousUrl', <--- Tên key của dữ liệu giống với đường dẫn đến key trong file này global > routing > previousUrl.
    }
  },
  feature: {
    shared: {                 <--- Tên chức năng con
    },
    auth: {
      //  Khóa lưu trữ thông tin người dùng trong chức năng xác thực.
      userInformation: 'feature.auth.user',
    },
  }
};

```

## Thông báo lỗi:

1. Ví dụ trong quá trình phát triển phần mềm, developer khai báo thông key không cẩn thận dẫn đến trùng key.

```
export const LocalStorageConfigKeys = {
  global: {
    routing: {
      previousUrl: 'global.routing.previousUrl',   <--- Ví dụ đặt trùng khóa.
    }
  },
  feature: {
    auth: {
      //  Khóa lưu trữ thông tin người dùng trong chức năng xác thực.
      userInformation: 'global.routing.previousUrl',   <--- Ví dụ đặt trùng khóa.
    },
  }
};

```

2. Sau khi run project nếu khóa của localStorage bị trùng - bạn sẽ thấy thông báo lỗi tại cửa sổ console của browser như vầy:

```
ERROR Error: Uncaught (in promise): Error: Giá trị trùng lặp "global.routing.previousUrl" trong các khóa [global > routing > previousUrl], [feature > auth > actionIds]
```

3. Cần kiểm tra lại key 'global.routing.previousUrl' trong file cấu hình LocalStorageConfigKeys
   để điều chỉnh key bạn mới tạo cho đúng, tránh thay đỗi những cái đã tồn tại.

## Cách sử dụng - Xem code mẫu đưới đây nhé ^>^!:

```
 /**
   * Lấy danh sách danh mục sản phẩm.
   */
  getCategories = (): Observable<IDataSourceType> => {
    const storedKey =
      this.storage.sessionStorageKeys.features.products.filters.categories;

    const categoryStoraged = this.storage.getItem<IDataSourceType>(
      storedKey,
      { location: 'SESSION_STORAGE' }
    );

    if (categoryStoraged && categoryStoraged.length !== 0) {
      return of(categoryStoraged);
    }

    const response = this.httpClient.get<any>(
      API_ENDPOINTS.categories,
      { observe: 'response' }
    );
    return response.pipe(
      map((response) => new FilterModel(response?.body).handle()),
      tap((responseMapped) => {
        this.storage.setItem(storedKey, responseMapped, { location: 'SESSION_STORAGE' });
      }),
      catchError((error: ErrorBase) => throwError(() => error))
    )
  }
```
