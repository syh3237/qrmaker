import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// 예시: 로그인 상태를 확인하는 함수
const isAuthenticated = () => {
  // 예시로 localStorage에 저장된 'authToken' 값을 사용
  return localStorage.getItem('authToken') !== null;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;