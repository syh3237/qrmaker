// ... 기존 코드 ...
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // firebase.js에서 auth 가져오기
import Admin from '../pages/AdminPage/Admin';

// function PrivateRoute({ children }) {
//     const [isAuthenticated, setIsAuthenticated] = useState(null); // 초기 상태를 null로 설정
  
//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         setIsAuthenticated(!!user); // 사용자가 있으면 true, 없으면 false
//       });
  
//       return () => unsubscribe();
//     }, []);
  
//     console.log(isAuthenticated);
//     if (isAuthenticated === null) {
//       return <div>Loading...</div>; // 인증 상태를 확인하는 동안 로딩 표시
//     }
  
//     return isAuthenticated ? <Admin /> : <Navigate to="/login" />;
// }

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
// ... 기존 코드 ...