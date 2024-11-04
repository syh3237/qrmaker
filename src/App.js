import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCode from 'qrcode';
import Home from './components/Home';
import Admin from './components/Admin';
import Header from './components/Header';
import PrivateRoute from './auth/PrivateRoute';
import Login from './components/Login';
import './style.css';

function App() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  // 로그인 성공 시 상태 업데이트 콜백 함수
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // 로그아웃 시 상태 업데이트 콜백 함수
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // 토큰 제거
    setIsAuthenticated(false); // 인증 상태 업데이트
  };

  // QR 코드 생성 함수
  useEffect(() => {
    const generateQRCode = async (path) => {
      const url = `http://localhost:3000${path}`;
      try {
        const qrUrl = await QRCode.toDataURL(url);
        setQrCodeUrl(qrUrl);
      } catch (err) {
        console.error('QR 코드 생성 중 오류가 발생했습니다:', err);
      }
    };

    generateQRCode('/about');
  }, []);

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} /> {/* 로그아웃 콜백 전달 */}
        <Routes>
          <Route path="/" element={<Home qrCodeUrl={qrCodeUrl} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} /> {/* 로그인 성공 시 상태 업데이트 */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;