# BTCN2 - React Project

## 📦 Allowed Libraries

This project is restricted to using **only** the following libraries:

| Library | Purpose |
|---------|---------|
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Shadcn UI** | Reusable UI components built on Radix UI |
| **react-hook-form** | Form validation and management |
| **zod** | TypeScript-first schema validation |
| **react-router-dom** | Client-side routing |

> ⚠️ **Important**: Do not add any other external libraries without approval.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
MY-MOVIE-APP/
├── .env                    # Biến môi trường (Lưu API_URL)
├── .gitignore              # Cấu hình file/folder không up lên git
├── diem.txt                # FILE BẮT BUỘC (Tự chấm điểm)
├── gitlog.txt              # FILE BẮT BUỘC (Log commit)
├── index.html              # File HTML gốc
├── package.json            # Khai báo thư viện (dependencies)
├── postcss.config.js       # Cấu hình Tailwind
├── tailwind.config.js      # Cấu hình Tailwind
├── vite.config.js          # Cấu hình Vite
├── README.md               # Báo cáo bài tập
│
└── src/
    ├── main.jsx            # Entry point (Render App)
    ├── App.jsx             # Nơi khai báo Routing chính (Routes)
    ├── index.css           # CSS toàn cục (Import Tailwind directives)
    │
    ├── components/         # Chứa các thành phần giao diện nhỏ (Reusable)
    │   ├── ui/             # Các component của Shadcn (Button, Input, Card...)
    │   ├── layout/         # Bố cục trang
    │   │   ├── Header.jsx       # Navbar, Logo, DarkModeToggle
    │   │   ├── Footer.jsx       # Footer thông tin
    │   │   └── MainLayout.jsx   # Chứa <Outlet /> để render các page con
    │   │
    │   ├── movie/          # Component riêng về Phim
    │   │   ├── MovieCard.jsx    # Card hiển thị phim (Poster, Title...)
    │   │   ├── HeroSlider.jsx   # Slider to ở trang chủ
    │   │   ├── MovieRow.jsx     # List phim nằm ngang
    │   │   └── ReviewItem.jsx   # Item hiển thị review
    │   │
    │   └── common/         # Component dùng chung khác
    │       ├── LoadingSpinner.jsx
    │       ├── PaginationControls.jsx
    │       └── ProtectedRoute.jsx # Wrapper bảo vệ route cần login
    │
    ├── pages/              # Các trang màn hình chính (tương ứng link router)
    │   ├── Home.jsx             # Trang chủ
    │   ├── Login.jsx            # Trang đăng nhập
    │   ├── Register.jsx         # Trang đăng ký
    │   ├── MovieDetail.jsx      # Trang chi tiết phim
    │   ├── PersonDetail.jsx     # Trang chi tiết diễn viên
    │   ├── Search.jsx           # Trang tìm kiếm
    │   ├── Favorites.jsx        # Trang danh sách yêu thích
    │   └── NotFound.jsx         # Trang 404
    │
    ├── services/           # Xử lý Logic gọi API (Chỉ dùng Fetch)
    │   ├── apiClient.js         # File cấu hình fetch chung (Base URL, Token)
    │   ├── authService.js       # API login, register
    │   └── movieService.js      # API get movies, details, search
    │
    ├── hooks/              # Custom Hooks (Logic tái sử dụng)
    │   ├── useAuth.js           # Hook lấy thông tin user/token
    │   └── useDebounce.js       # Hook delay khi gõ tìm kiếm
    │
    ├── context/            # Quản lý State toàn cục
    │   ├── AuthContext.jsx      # Lưu trạng thái đăng nhập
    │   └── ThemeContext.jsx     # Lưu trạng thái Dark Mode
    │
    ├── lib/                # Các hàm tiện ích (Utils)
    │   └── utils.js             # Hàm của Shadcn (cn, clsx...)
    │
    └── assets/             # Hình ảnh tĩnh, Logo...
## 🏗 Project Structure & Compliance (Kiến trúc & Tuân thủ)

Dự án được xây dựng nhằm đảm bảo tuân thủ chặt chẽ các yêu cầu khắt khe về Kiến trúc và Quy trình:

### 1. Architecture & Routing (Chuẩn kiến trúc)
*Cam kết tránh lỗi kiến trúc (-5đ) và lỗi routing (-7đ):*

- **Routing (react-router-dom):**
  - Ứng dụng hoạt động chuẩn **SPA (Single Page Application)**, tương tác mượt mà với trình duyệt, hỗ trợ nút Back/Forward, không reload trang.
  - Cấu hình Router bao gồm: `Outlet` cho Layout chung, `Protected Route` cho các trang cá nhân (Profile, Favorites).
  
- **Folder Structure (Cấu trúc thư mục):** Phân tách rõ ràng theo chức năng:
  - `src/layouts`: Layout chính (Header, Footer).
  - `src/pages`: Các trang màn hình (Home, Detail, Auth...).
  - `src/components`: Các thành phần UI tái sử dụng (MovieCard, Slider, Pagination...).
  - `src/services`: Xử lý gọi API tập trung.
  - `src/hooks`: Custom hooks (useFetch, useAuth...).

### 2. Git Workflow (Quy trình Commit)
*Tuân thủ yêu cầu: "Mỗi chức năng tối thiểu 2 commit" (Tránh điểm 0):*

- Lịch sử commit được ghi lại chi tiết, rõ ràng theo từng đầu mục yêu cầu.
- Quy trình phát triển cho mỗi tính năng luôn bao gồm ít nhất 2 bước:
  1.  **Commit 1 (UI):** Xây dựng giao diện, bố cục (Layout/CSS).
  2.  **Commit 2 (Logic):** Tích hợp xử lý dữ liệu, API và sự kiện (Events).
- Chi tiết lịch sử xem tại file: `gitlog.txt`.

---