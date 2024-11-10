import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DBConnector from '../../connector/DBConnector';

function Admin({ qrCodeUrl }) {
  const { userId } = useParams(); // URL에서 userId 파라미터 가져오기
  const dbConnector = new DBConnector();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // userId를 사용해 현재 사용자 정보를 가져옴
        const user = await dbConnector.getCurrentUser(userId);
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSetQRList = () => {
    // eslint-disable-next-line
    const qrList = {phoneNumber: '01012345678', name: '홍길동'}; // 예시 QR 리스트
    dbConnector.putQRList(qrList);
  };

  if (!currentUser) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h1>{currentUser.displayName}</h1>
      <p>{currentUser.email}</p>
      <button onClick={handleSetQRList}>Set QR List</button> {/* 버튼 추가 */}
    </div>
  );
}

export default Admin;
