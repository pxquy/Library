\*\* library management system (Node.js)

\*\* Một ứng dụng quản lý thư viện được xây dựng bằng Node.js. Hệ thống cho phép người quản trị
Thêm/Sửa/Xoá thư viện, giúp người quản trị và người dùng có các chức năng như mượn / trả sách
quản lý thời gian mượn trả và quản lý người dùng;

\*\* Tính năng chính

- Quản lý sách (thêm, sửa, xóa, tìm kiếm)
- Quản lý người dùng (đăng ký, đăng nhập, phân quyền admin/user)
- Mượn và trả sách
- Theo dõi hạn trả, gửi cảnh báo
- Thống kê: số sách mượn, sách trễ hạn, người dùng đang hoạt động

\*\* Công nghệ sử dụng

| Công nghệ    | Mô tả                     |
| ------------ | ------------------------- |
| Node.js      | Backend runtime           |
| Express.js   | Web framework cho Node.js |
| MongoDB      | Cơ sở dữ liệu             |
| Mongoose     | ORM để thao tác DB        |
| JWT / Bcrypt | Xác thực và bảo mật       |

\*\* Cấu chúc thư mục
|--mode_modules/ # Chứa cấu chúc và các thư viện của Node.js
|--note/ # Chứa file text hoặc document
src/  
|--config # Kết nối database
|--controller # Sử lý các chức năng trong trang web
|--middleware # Kiểm tra quyền truy cập, validate
|--models # Định nghĩa schema và định nghĩa các model
|--routers # Chứa các đường dẫn và các router chính(user, categories, author, book, borrowRecode)
|--validations # Định nghĩa validate có các schema
|--app # Đường dẫn api và router
|--.babelrc # Cấu hình và công cụ phiên dịch Node.js
|--.env # Chứa địa chỉ Server,database và keyboard yourSecretKey/
|--package.json # Trái tim chính của Node.js (chứa thông tin phiên bản, tên và quản lý các thư viện)
|--pnpm-lock.yaml # Khoá phiên bản của thư viện
|--README.md

