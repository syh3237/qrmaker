import React from 'react';
import { signInWithPopup } from 'firebase/auth'; // signInWithPopup 가져오기
import { auth, provider } from '../firebase';

function Login() {
  const handleLogin = async () => {
     try {
        const result = await signInWithPopup(auth, provider); // signInWithPopup 사용
        // const user = result.user; // 로그인한 사용자 정보 얻기
        window.location.href = '/admin';
     } catch (error) {
        console.error('로그인 실패:', error);
     }
  };

  return (
     <div>
        <button onClick={handleLogin}>구글 로그인</button>
     </div>
  );
}

export default Login;