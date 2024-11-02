import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QRCode from 'qrcode';
import Home from './components/Home';
import Profile from './components/Profile';

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

    // 연결할 경로 설정
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
          <Route path="/about" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;