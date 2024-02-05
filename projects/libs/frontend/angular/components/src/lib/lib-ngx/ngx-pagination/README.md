# Tài liệu kỹ thuât:

Cách dùng:
Bước 1: Chèn selctor vào template html của bạn, Khai báo trước các hàm nhé!

```
<pagination-controls [config]="paginationParams" (pageChange)="onPageChanged($event)" />
```

Bước 2: Implement AppPagination interface sau đó, định nghĩa config bằng biến bên dưới sau đó khai báo hàm :

```
@Component({...})
export class ListComponent implements AppPagination {
  // Init pagination data;
  paginationParams: PaginationParams = {
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0,
  }

  onPageChanged(index: number) {
    // Bạn có thể lấy số trang chổ này nhé
    ex: 1,2,3,4,5,...
  }
}
```

Bước 3: Thực hiện các thao tác lấy dữ liệu với phân trang được chọn:

```

  // Ví dụ nhé/
  /**
   * Xử lý sự kiện khi trang hiện tại thay đổi.
   * @param pageIndex Chỉ mục của trang mới.
   */
  onPageChanged(pageIndex: number) {
    // Cập nhật trang hiện tại của phân trang
    this.filterService.updateStateByKey('page', pageIndex.toString());

    // Áp dụng thay đổi trạng thái bộ lọc
    this.filterService.pushState();
  }
```
