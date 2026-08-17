# SmartCampus — Chương 2: Core Primitives & Interaction

## Component

- **App.tsx** — điểm vào ứng dụng, render `SmartCampusScreen`.
- **SmartCampusScreen** — màn hình chính, ghép các component con, quản lý state ô tìm kiếm và trạng thái lưu.
- **Header** — thanh tiêu đề "SmartCampus".
- **Avatar** — ảnh đại diện sinh viên, có fallback initials khi chưa có ảnh.
- **InfoRow** — một dòng thông tin dạng label + value (Email, Lớp...).
- **SearchField** — ô nhập tìm kiếm (`TextInput` có `value`, `onChangeText`, `placeholder`).
- **ActionButton** — nút hành động dùng `Pressable`, có 3 trạng thái (bình thường / đang nhấn / vô hiệu hóa), khai báo đầy đủ `accessibilityRole`, `accessibilityLabel`, `accessibilityState`, và mở rộng vùng chạm bằng `hitSlop`.

## Cách chạy

```bash
npm install
npx expo start
```

Quét mã QR bằng Expo Go (hoặc nhấn `w` để mở bản web) để xem ứng dụng.