import axios from "axios";

// Lấy baseURL từ biến môi trường hoặc sử dụng giá trị mặc định
const baseURL = process.env.BASE_URL || "http://localhost:3000";

// Tạo một instance của axios với cấu hình cơ bản
const axiosInstance = axios.create({
  baseURL: baseURL, // Sử dụng baseURL từ .env
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho request để gắn token nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm interceptor cho response để xử lý token hết hạn
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Nếu mã lỗi là 401, tức là token hết hạn hoặc không hợp lệ
    if (error.response && error.response.status === 401) {
      alert("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại!");
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
