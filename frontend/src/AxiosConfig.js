import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // Đảm bảo cookies được gửi đi và nhận về
});

// Interceptor để kiểm tra phản hồi lỗi và làm mới token nếu cần
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi là do token hết hạn
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API làm mới token
        const response = await api.post('/auth/refresh-token');
        console.log('Refresh token response:', response.status);

        if (response.status === 200) {
          // Sau khi làm mới token thành công, gửi lại yêu cầu ban đầu
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        // Đăng xuất người dùng nếu làm mới token thất bại
        localStorage.removeItem('loginResponse');
        window.location.href = '/sign-in';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
