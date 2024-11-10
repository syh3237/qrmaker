import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Admin from './pages/AdminPage/Admin';
import Header from './components/Header/Header';
import PrivateRoute from './auth/PrivateRoute';
import Login from './pages/LoginPage/Login';
import Util from './components/Util/Util';
import './style.css';
import './style/reset.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // 로그인 상태와 userId를 localStorage에서 가져옴
    const token = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    setIsAuthenticated(!!token);
    setUserId(storedUserId);
  }, []);

  const handleLoginSuccess = (uid) => {
    // 로그인 성공 시 호출되는 함수
    setIsAuthenticated(true);
    setUserId(uid);
    localStorage.setItem('authToken', 'your-auth-token'); // 토큰을 저장
    localStorage.setItem('userId', uid); // userId를 localStorage에 저장
  };

  const handleLogout = () => {
    // 로그아웃 시 상태 초기화 및 localStorage에서 삭제
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          
          {/* /admin/:userId 경로를 PrivateRoute로 보호하고 Admin 컴포넌트 렌더링 */}
          <Route 
            path="/admin/:userId" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </PrivateRoute>
            } 
          />
        </Routes>
        <Util isAuthenticated={isAuthenticated} userId={userId} onLogout={handleLogout} />
      </div>
    </Router>
  );
}

export default App;