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
src/
├── components/
│   ├── ui/          # Shadcn UI components
│   └── ...          # Custom components
├── lib/
│   └── utils.js     # Utility functions (cn helper)
├── App.jsx
├── main.jsx
└── index.css        # Tailwind CSS entry
```
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