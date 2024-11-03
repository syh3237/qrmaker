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
     <div className='login_area'>
         <h2>Login</h2>
         <div className="input_box">
            <input type="text" className='user_id'/>
            <input type="text" className='user_pw'/>
         </div>
         <div className="btn_box">
            <button>로그인</button>
            <button onClick={handleLogin}>구글 로그인</button>
         </div>
     </div>
  );
}

export default Login;