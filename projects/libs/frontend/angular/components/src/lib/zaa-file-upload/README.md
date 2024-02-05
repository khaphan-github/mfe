## ng2-file-upload

là một thư viện Angular giúp quản lý quá trình tải lên tệp tin. Nó cung cấp các thành phần và chức năng hữu ích để giảm bớt công việc khi xây dựng tính năng tải lên.

## Description

- Hình ảnh (xuất hiện tên file).
- Files khác.
- Dùng theo kịch bản
    - Upload trực tiếp.
    - Upload theo form có control upload - hiển thị như thế nào theo form.

# Issues

- Thông tin về thư viện hỗ trợ:
    
    Thư viện sẽ giúp quản lý quá trình upload file từ client lên server.
    
    1. Tải tệp lên server: gửi file từ client lên server thông qua phương thức post.
    2. Quản lý hàng đợi tải lên: Cho phép quản lý nhiều tệp trong một hàng đợi, sau đó tự động tải lên.
    3. Cấu hình tùy chọn tải lên: Cho phép cầu hình các tùy chọn như URL máy chủ, xác thực, tham số bổ sung, tự động tải lên và nhiều tùy chọn khác.
    4. Theo dõi tiến trình tải lên: Cung cấp các sự kiện và hàm gọi lại để theo dõi tiến trình tải lên, bôm gồm xử lý khi tải lên thành công hoặc thất bại.
    5. Hiển thị giao diện người dùng: Cung cấp các thành phần giao diện người dùng có sẵn để hiển thị thông tin về tệp và tiến trình tải lên (vd: progress)
- Chức năng chính:
    - Upload file lên server:
        - Upload trực tiếp và theo form
        - Upload chép link ngoài (option)
        - Upload từ máy tính
        - Cho phép hoặc không cho phép upload (option)
    - Các giới hạn được cung cấp khi upload:
        - Định dạng file (Ví dụ: pdf, docx,…)
        - Kích thước file (Ví dụ: 5mb)
- Chức năng phụ:
    1. Upload single: (select 1 file)
        1. Kiểu upload:
            1. Upload từ máy tính: 
                - File upload sẽ được lưu vào server và các thông tin file được lưu vào db.
                - Tự động upload khi thêm file (option)
            2. Upload từ link ngoài: (option)
                - Không cần phải lưu vào server vì các thông tin file đã có sẵn thể hiện qua link
        2. File đã upload:
            1. View file đã upload.
            2. Xóa link đã upload.
            3. Khi upload link mới server phải tự xóa file cũ (nếu có) bằng id của file trước đó.
    2. Upload multi: (select nhiều file)
        1. Kiểu upload:
            1. Upload từ máy tính: 
                - File upload lưa vào server và các thông tin file được lưu vào db.
                - Tự động upload khi thêm file (option)
            2. Upload từ link ngoài: (option) (chưa xử lý) 
        2. Table của danh sách file cần upload và đã upload:
            1. View danh sách file.
            2.  Xóa các file cần upload và đã upload.
