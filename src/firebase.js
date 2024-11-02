import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // getAuth와 GoogleAuthProvider 가져오기

   
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL 
};


const app = initializeApp(firebaseConfig); // Firebase 앱 초기화
const auth = getAuth(app); // 초기화된 앱을 사용하여 인증 객체 생성
const provider = new GoogleAuthProvider();

export { app, auth, provider }; // app도 함께 내보내기

