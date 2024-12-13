import React from 'react';
import { Navigate } from 'react-router-dom';

// Kiểm tra xem người dùng đã đăng nhập hay chưa
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage

  if (!token) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    console.log('Token not found, redirecting to /login');
    return <Navigate to="/login" />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung con
  console.log('Token found, allowing access');
  return children;
};

export default PrivateRoute;
