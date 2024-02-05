# NOT FOUND COMPOENT

## Usecase

- Hiển thị component này khi trong giao diện không tìm thấy dữ liệu khi người dùng truy vấn
- Trường hợp dùng mạc định:

```typescript
<app-not-found-data [show]="true" />
```

- Trường hợp muốn cấu hình thêm một số thứ:

```typescript
<app-not-found-data 
  [show]="true"
  [title]="'Điền tiêu đề thông báo'"
  [desc]="'Điền mô tả thông báo'"
  [iconPath]="'/asserts/image/icon/icon.svg'"
/>
```

## Lưu ý:

- **title** nếu không điền thì mạc định là: 'Rất tiếc, không tìm thấy thông tin phù hợp với lựa chọn của bạn!'
- **desc** nếu không điền thì mạc định là: ""
- **iconPath** nếu không điền thì mạc định là: "/assets/img/image/con-heo-cham-hoi-light.svg"
