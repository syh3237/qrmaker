// eslint-disable-next-line
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import FirebaseConnector from '../../connector/FirebaseConnector'; // FirebaseConnector 가져오기
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 15px;
  background: none;
  border: 1px solid #111;
`;

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Google 로그인 팝업을 띄워서 인증
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userId = user.uid; // Firebase의 사용자 고유 ID

      // 토큰을 가져와서 인증 확인 (필요할 경우)
      const token = await user.getIdToken();
      
      const firebaseConnector = new FirebaseConnector(); // FirebaseConnector 인스턴스 생성
      await firebaseConnector.writeUserName(); // 예시 함수 호출, 실제 필요에 따라 수정

      // 로그인 성공 처리 - userId 전달
      onLoginSuccess(userId);

      // /admin/{userId}로 페이지 이동
      navigate(`/admin/${userId}`);
    } catch (error) {
      console.error('로그인 실패:', error);
      alert("로그인에 실패했습니다. 다시 시도해 주세요."); // 로그인 실패 시 메시지 표시
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Button onClick={handleLogin}>구글 로그인</Button>
    </Container>
  );
}

export default Login;