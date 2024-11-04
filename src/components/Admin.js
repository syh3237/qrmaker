import React, { useState, useEffect } from 'react';
import DBConnector from '../connector/DBConnector';

function Admin({ qrCodeUrl }) {
  
  const dbConnector = new DBConnector();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await dbConnector.getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
