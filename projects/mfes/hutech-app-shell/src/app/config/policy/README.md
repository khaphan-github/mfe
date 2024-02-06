# Làm thế nào để cấu hình mấy chính sách này đây ta?

## Policy sẽ khác nhau ở 3 môi trường: dev, test, prod:

**Lưu ý:**

- File `policy.config.ts` phải điền đầy đủ các key, các value của từng key nên để trống để tránh nhầm lẫn giữa các môi trường.

- Khi import policy tại các module con thì import `GlobalPolcies` từ `policy.config.ts`

- Mới từng môi trường khác nhau thì sẽ có các value khác nhau ứng với từng key, nhưng các key sẽ giống nhau với từng môi trường.

## How does it work?
- Khi thực thi lệnh
```bash
npm run start:prod
```
thì chính sach `policy.config.prod.ts` sẽ được áp dụng

Tương tự với các môi trường khác.

## Cấu hình bằng cách replace file policy trong `angular.json`.
