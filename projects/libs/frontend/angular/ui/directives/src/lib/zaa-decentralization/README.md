# TÀI LIỆU KỸ THUẬT

### Cách ẩn hiện các Component dựa vào chính sách phân quyền từ API:

#### Mô tả:

- Sau bước kiểm tra người dùng có quyền truy cập module: cần kiểm tra người dùng có thể sử dụng chức năng cụ thể nao đó trong module.
  Ví dụ:
  Ta có chính sách:
- Nhân viên quản lý kho có quyền truy xóa sản phẩm.
- Nhân viên quản lý sản phẩm sự không có quyền xóa sản phẩm.
  Thì trên giao diện cần làm:
- Đối với nhân viên quản lý kho cần **hiện nút xóa sản phẩm**:
- Ngược lại đối vơi nhân viên quản lý sản phẩm ta **ẩn nút xóa sản phẩm**
  Trên Server sẽ quy định một số chính sách - trong số đó có chính sách:
  **Nút xóa sản phẩm ứng với id "14924"**

#### Cách sử dụng:

Bước 1: Cần cấu hình chính sách ứng với từng nút trong "GlobalPolicies" (Tương tự cấu hình canload module):
File cấu hình được lưu tại đường dẫn: **/src/config/policy/policy.config.ts**

```
export const GlobalPolcies = {
  productModule: {          <--- Module's name
    list: {                 <--- Component's name
      shareButton: 9865,
      notifyButton: 9865,
      deleteButton: 14924    <====== Điền id của nút xóa sản phẩm tại dây
    },
    navigator: 1903
  },
  userModule: {
    list: {

    },
    navigator: 9865
  }
}
```

Bước 2: Cần điền khóa của nút xóa sản phẩm bằng directive '[authenAction]':

```
<div [authenAction]="'productModule.list.shareButton'">
  <button type="button" (click)="share()" transloco="features.products.listComponent.button.share"></button>
</div>
```

\*Giải thích:

- Điền [authenAction]="'productModule.list.shareButton'" để đánh dấu dây là nút xóa sản phẩm
- Ứng với từng người dùng có quyền khác nhau nó sẽ tự ẩn hiện theo quền (logic code nằm ở decentralization module);
