import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QRCode from 'qrcode';
import Home from './components/Home';
import Admin from './components/Admin';
import './style.css';

import PrivateRoute from './auth/PrivateRoute';
import Login from './components/Login'; // Login 컴포넌트 임포트 추가

function App() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

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
        <header className="App-header">
          <nav>
            <Link to="/">홈</Link> | <Link to="/about">소개</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home qrCodeUrl={qrCodeUrl} />} />
          <Route path="/login" element={<Login />} /> {/* /login 경로 추가 */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;