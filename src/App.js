import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCode from 'qrcode';
import Home from './pages/HomePage/Home';
import Admin from './pages/AdminPage/Admin';
import Header from './components/Header/Header';
import PrivateRoute from './auth/PrivateRoute';
import Login from './pages/LoginPage/Login';
import Util from './components/Util/Util';
import Profile from './components/Profile/Profile';
import './style.css';
import './style/reset.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} /> */}
        {/* <Profile></Profile> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </PrivateRoute>
            } 
          />
        </Routes>
        <Util isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </div>
    </Router>
  );
}

export default App;