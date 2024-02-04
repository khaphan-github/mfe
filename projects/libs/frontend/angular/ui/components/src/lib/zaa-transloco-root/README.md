
## Nội dung chính:

### Yêu cầu ban đầu:

1. Tích hợp được đa ngôn ngữ vào trang web angular sữ dụng (18n).
2. Demo các trường hợp sử dụng của thư viện Transloco.
3. Tổ chức file ngôn ngữ "{lang}.json" phân cấp.
4. Các tổ chức thư mục, import module hiệu quả:

### Các tiêu chí cần đạt được + Kết quả:

1. Khi thay đỗi ngôn ngữ - tự reload lại trang - toàn bộ ngôn ngữ trên trang web đều thay đỗi.
2. Sữ dụng Attribute directive để đánh dấu chổ thay đỗ ngôn ngữ trên template (html), cách truyền param:
   ```
    <div transloco="features.auth.header" [translocoParams]="{ name: accountName, date: now }"></div>
   ```
3. Tổ chức file ngôn ngữ phân cấp theo các level Application -> Module -> Component -> Element --> Child element,...
4. Import TranslocoRootModule vào AppModule, Import TranslocoModule khi dùng tại các module con.
5. Đưa file transloco config vào thư mục **config.**

### Các nội dung tìm hiểu sau:

1. Viết service để truyền key của ngôn ngữ ngay trong component.
2. Tương lại nếu dùng project cho nhiều module - xem xét chia i18n/language.json vào từng module - mỗi module chứa ngôn ngữ của module đó.

## Cách sữ dụng module Đa ngôn ngữ (Transloco):

Transloco module là một module của thư viện Angular, được sử dụng để quản lý đa ngôn ngữ trong ứng dụng Angular. Nó cung cấp các công cụ để dịch và hiển thị các chuỗi văn bản trong các ngôn ngữ khác nhau mà không cần phải tạo lại toàn bộ ứng dụng.

Với Transloco, bạn có thể tạo các tệp ngôn ngữ chứa các bộ dịch và sau đó sử dụng các khối mã để hiển thị chuỗi dịch tương ứng. Nó hỗ trợ cả việc dịch tĩnh và dịch động, cho phép bạn cung cấp dữ liệu động như các biến, động từ và định dạng.

Transloco cũng cung cấp các tính năng quản lý ngôn ngữ như chuyển đổi ngôn ngữ, cập nhật ngôn ngữ và lưu trữ trạng thái ngôn ngữ. Nó cũng tích hợp tốt với Angular và cung cấp các ứng dụng CLI để tạo các tệp ngôn ngữ và quản lý việc dịch trong quá trình phát triển.

#### Cài đặt @ngneat/transloco bằng Angular CLI:

Xem thêm tại:https://www.npmjs.com/package/@ngneat/transloco

```
npm i @ngneat/transloco

```

\*Note: Cách tự động generate file ngôn ngữ: https://ngneat.github.io/transloco/docs/schematics/ng-add/

```
ng add @ngneat/transloco

```

Xem thêm tại: https://ngneat.github.io/transloco/docs/getting-started/installation

## Cách tích hợp:

#### 1: Các thành phần của Transloco:

##### 1.1: TranslocoRootModule:

Đây là một module chính của Transloco được import vào AppModule trong ứng dụng Angular. Nó được sử dụng để cấu hình Transloco và cung cấp các tùy chọn cấu hình như ngôn ngữ mặc định, bộ dịch, và các thiết lập khác cho toàn bộ ứng dụng.

##### 1.2: TranslocoLoader:

Là một interface được sử dụng để tải các tệp ngôn ngữ từ nguồn dữ liệu như tệp JSON hoặc từ dịch vụ web. Bạn có thể tạo một TranslocoLoader tùy chỉnh để tải các tệp ngôn ngữ từ nguồn dữ liệu của riêng bạn.

##### 1.3: TranslocoModule:

Là module chính của Transloco được import vào các module con trong ứng dụng Angular. Nó cung cấp các công cụ và chức năng cần thiết để sử dụng các khối mã dịch trong ứng dụng.

##### 1.3: File json ngôn ngữ (vi.json, en.json,...):

Đây là các tệp ngôn ngữ chứa các bộ dịch tương ứng cho từng ngôn ngữ trong ứng dụng. Mỗi tệp ngôn ngữ thường có một cấu trúc JSON với các khóa và giá trị tương ứng. Các tệp ngôn ngữ này được sử dụng bởi Transloco để hiển thị các chuỗi dịch cho người dùng trong ngôn ngữ tương ứng.

#### 2: Cách sữ dụng:

##### 2.1: Import:

```
  @NgModule({
    declarations: [],
    imports: [
      BrowserModule,
      HttpClientModule,

      TranslocoRootModule, // <--- Import TranslocoRootModule tại đây
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

  @NgModule({
    declarations: [
      ProductComponent
    ],
    imports: [
      CommonModule,
      ProductRoutingModule,
      TranslocoModule, <--- Import TranslocoModule tại các module con
    ]
  })
  export class ProductModule { }


  @Component({})
  export class ProductListComponent implements OnInit, OnDestroy {
    constructor(
      private readonly translocoService: TranslocoService // <--- Inject TranslocoService tại contructor của component
    ) { }
  }
```

#### 2.2: Đặt tên trong file cấu hình ngôn ngữ:

\*Note: Khi cài đặt transloco các file này sẽ được chức trong "src/asserts/i18n/"

```
    Ví dụ:
    File "vi.json" với dữ liệu:
    {
      "app": {
        "name": "Quản trị viên thông minh" <--- Tên ứng dụng
       },
      "navigation": {                      <--- Danh sách các navigation
        "dashboard": "Bảng điều khiển",    <--- Tên các navigation
        "products": "Sản phẩm",
        "account": "Tài khoản"
      },
      "features": {                        <---- Quy định đường dẫn module trong hệ thống
        "feature1": {                      <---- Tên chức năng/module
          "childComponent": {              <---- Tên Component trong chức năng/module
            "form": {                      <---- Thành phần form của component
              "inputPlaceholder": "",      <---- Các element trong form
              "button": "",                <----
              "label": "",                 <----
              "errorMessage": ""           <----
            },
            "header": "",                  <---- Các thành phần khác trong Component
            "notify": "",
            ...
          }
        }
      },
      "feature2": {
          "childComponent": {
            "form": {
              "inputPlaceholder": "",
              "button": "",
              "label": "",
              "errorMessage": ""
            },

            "header": "",
            "notify": "",
            ...
          }
        }
    }
```

##### 2.3: Các dùng trong template html:

Trước khi dùng cần phải import TranslocoModule vào Feature module:

```
  @NgModule({
    declarations: [
      ProductComponent
    ],
    imports: [
      CommonModule,
      ProductRoutingModule,
      TranslocoModule, <--- Import TranslocoModule tại các module con
    ]
  })
  export class ProductModule { }
```

Trong phần này quy định dùng "Attribute Directive":

```
    <div transloco="features.auth.header" [translocoParams]="{ name: accountName, date: now }"></div>
```

\*Mô tả:
**features.auth.header** là đường dẫn đến giá trị cần thay đổi ngôn ngữ trong file `i18n/{lang}.json`:

```
{
  "features":
    "auth": {
      "header": "Xin chào {{ name }} hôm nay là {{ date }}"
    }
}
```

**[translocoParams]="{ name: accountName, date: now }"** Là tham số truyền vào để thay đỗi giá trị động.
ví dụ:

```
const accountName = "Some name";
const date = Date(); // <-- 'Thứ Hai, 17 tháng 7, 2023'

// Sau khi đoạn code trên được chạy sẽ cho ra kết quả:

--> Xin chào Some name hôm nay là Thứ Hai, 17 tháng 7, 2023
```

\*Lưu ý:
Đối với các thẻ nào có kèm text hoặc thẻ con phía sau phía sau nên chuyển sang dạng "Structural Directive" để không bị mất thẻ.

Xem chi tiết tại đây: https://ngneat.github.io/transloco/docs/translation-in-the-template

```
    <span *transloco="let translated;">
     {{ translated('your_key_of_message_to_change_in_file_i18n.path.to.your.key') }} Your text in there
     </span>
```

#### 2.4: Dùng TranslocoService trong Component con:

Đầu tiên, bạn cần import TranslocoService từ gói @ngneat/transloco vào Component con của bạn. Đảm bảo rằng bạn đã cài đặt gói transloco trước khi thực hiện bước này.

```
  import { TranslocoService } from '@ngneat/transloco';
```

Tiếp theo, bạn cần thêm TranslocoService vào constructor của Component con để có thể sử dụng nó trong Component đó. Bạn cần chú ý rằng TranslocoService phải được inject thông qua dependency injection.

```
 @Component({})
  export class ProductListComponent implements OnInit, OnDestroy {
    constructor(
      private readonly translocoService: TranslocoService // <--- Inject TranslocoService tại contructor của component
    ) { }
  }
```

2.4.1: Dùng API setTranslation:

```
export class ProductComponent {
  constructor(
    private readonly translocoService: TranslocoService
  ) { }

  someFunction = () => {
    this.translocoService.setTranslation({
      "features": {
        "products": {
          "header": "Quản lý điện thoại",
          "listComponent": {
            "button": {
              "share": "Chia sẽ",
              "notifyMe": "Thông báo"
            }
          }
        },
      }
    }, 'vi', { merge: true });
  }
}

```

*Mục đích:

- Thay đỗi cách dịch thuật đối với từng Component
- Mô tả đoạn code trên, đối với ngôn ngữ là Tiếng Việt ('vi') sẽ hiển thị các giá trị ứng với các key tương ứng trong Object này: '{"features": "..."}'
  Còn 'merge: true' sẽ ghép object này với các từ nằm trong i18n/{lang} để hiển thị toàn bộ.

TranslocoService cung cấp nhiều phương thức để thao tác với việc chuyển đỗi ngôn ngữ:
Xem chi tiết tại đây: https://ngneat.github.io/transloco/docs/translation-api
