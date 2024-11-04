import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      localStorage.setItem('authToken', token); // 로그인 성공 시 토큰 저장
      onLoginSuccess(); // 로그인 성공 시 상태 업데이트
      navigate('/admin'); // 페이지 새로고침 없이 /admin 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert("로그인에 실패했습니다. 다시 시도해 주세요."); // 로그인 실패 시 메시지 표시
    }
  };

  return (
    <div className="container">
      <div className="login_area">
        <h2>Login</h2>
        <div className="btn_box">
          <button onClick={handleLogin}>구글 로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Login;