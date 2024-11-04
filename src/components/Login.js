// eslint-disable-next-line
import React from 'react';
import { signInWithPopup } from 'firebase/auth'; // signInWithPopup 가져오기
import { auth, provider } from '../firebase';
import FirebaseConnector from '../connector/FirebaseConnector'; // FirebaseConnector 가져오기

function Login() {
  const handleLogin = async () => {
     try {
        // eslint-disable-next-line no-unused-vars
        const result = await signInWithPopup(auth, provider); // signInWithPopup 사용
        const firebaseConnector = new FirebaseConnector(); // FirebaseConnector 인스턴스 생성
        await firebaseConnector.writeUserName(); // writeUserName 호출
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