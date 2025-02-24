import axios from 'axios';

// Lấy baseURL từ biến môi trường
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: baseURL, // Sử dụng baseURL từ .env
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor response
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
