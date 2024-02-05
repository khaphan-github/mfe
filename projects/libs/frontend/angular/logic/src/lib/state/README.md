# Tài liệu kỹ thuật:

## Vấn đề:

### Cách Truyền Dữ Liệu Giữa Các Component Trong Angular có một số cách:

1. Truyền Dữ Liệu Theo Kiểu Cha-Con

- Ưu điểm:
  - Dễ dàng: Thích hợp cho việc truyền dữ liệu giữa các component có mối quan hệ cha-con.
  - Linh hoạt: Có thể truyền dữ liệu từ cha đến nhiều con khác nhau.
- Nhược điểm:
  - Giới hạn phạm vi: Không phù hợp khi muốn truyền dữ liệu giữa các component không có mối quan hệ cha-con.
  - Khó khăn trong trường hợp phức tạp: Gặp khó khăn khi phải truyền dữ liệu qua nhiều component lồng nhau.

2. Truyền Dữ Liệu Thông Qua Các Service

- Ưu điểm:
  - Không cần phải là cha-con: Cho phép truyền dữ liệu giữa các component không có mối quan hệ cha-con.
  - Đảm bảo tính cách biệt: Dữ liệu được truyền thông qua service không phụ thuộc vào cấu trúc component.
- Nhược điểm:
  - Cần phải quản lý service: Yêu cầu quản lý tốt các service để đảm bảo dữ liệu không bị lẫn lộn.
  - Không phải lúc nào phù hợp: Không phù hợp cho việc truyền dữ liệu tạm thời hoặc trong một phạm vi cụ thể.

3. Truyền Dữ Liệu Vào Một State Chung (Global State - Ngrx)

- Ưu điểm:
  - Quản lý trạng thái toàn cục: Cho phép quản lý dữ liệu trạng thái toàn cục và truyền dữ liệu giữa các component một cách dễ dàng.
  - Đồng bộ hóa dữ liệu: Đảm bảo dữ liệu trạng thái luôn đồng bộ và nhất quán trong toàn bộ ứng dụng.
- Nhược điểm:
  - Phức tạp hơn: Yêu cầu hiểu biết về Ngrx và quản lý trạng thái toàn cục.
  - Cần học hỏi: Đòi hỏi thời gian để hiểu và triển khai các khái niệm liên quan đến quản lý trạng thái.

## Hướng giải quyết:

- Chọn phương án thứ 2 là lựa chọn phù hợp nếu không muốn code quá phức tạp mà vẫn đảm bảo tính linh hoạt trong quá trình truyền dữ liệu giửa các component.

## Cách sử dụng:

\*Đặt vấn đề:

- Phần mềm yêu cầu chức năng quản lý sản phẩm gồm 2 chức năng con:

1. Bộ lọc thông tin sản phẩm:

- Lọc theo danh mục, lọc theo công ty, lọc theo giá tiền,...

2. Hiển thị danh sách sản phẩm:

- Nghiệp vụ yêu cầu: Sau khi bấm lọc -> sản phẩm sẽ được lọc theo bộ lọc và hiển thị lên trang danh sách.

### Hướng giải quyết trước giờ:

```
// Tạo filter componnet.
@Component({...})
export class FilterComponent {
  @Input('') categoryId: string;
  @Input('') companyId: string;
  @Input('') priceId: string;


  @Output() filterApplied: EventEmitter<{
    categoryId: string,
    companyId: string,
    priceId: string
    }> = new EventEmitter();

  // Other logic.
}


// Tạo list productComponent:
```

### 2. Luồng xử lý:
Luồng phát dữ liệu

1. Mỗi khi bộ lọc thay đỗi -> Dữ liệu từ FilterComponent sẽ được truyền đến FilterService.
2. FilterService sẽ truyền dữ liệu nhận từ FilterComponent vào FilterSharedState. (cần inject FilterSharedState vào FilterService);

Luồng nhận dữ liệu: 
3. ProductService cần inject FilterSharedState vào để truy suất dữ liệu từ FilterSharedState.
4. ListComponent sẽ lắng nghe sự thay đỗi dữ liệu từ ProductService để nhận dữ liệu từ filter và gọi ProductService để lấy dánh sách sản phẩm theo filter.

## Tài liệu tham khảo:

- Angular state mananement best practices: https://blog.simplified.courses/angular-state-management-best-practices/
- RXJS best practices: https://blog.brecht.io/rxjs-best-practices-in-angular/
- Observable State: https://blog.simplified.courses/observable-state-in-angular-ui-components/
- Reactive pattern: Reactive patterns for Angular Enterprise Solutions - Brecht Billiet - NG-BE 2023 - YouTube - link: https://www.youtube.com/watch?v=58h_w7PzNtM&ab_channel=NG-BE
