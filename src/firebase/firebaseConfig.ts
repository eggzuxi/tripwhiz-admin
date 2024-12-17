import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase 설정 (환경 변수 사용)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// FCM 토큰 요청 함수
export const requestFCMToken = async (): Promise<string | null> => {
    try {
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY, // VAPID 키 설정
        });
        console.log("FCM 토큰:", token);
        return token;
    } catch (error) {
        console.error("FCM 토큰 요청 실패:", error);
        return null;
    }
};

// 알림 수신 리스너 설정
export const onMessageListener = () =>
  new Promise((resolve) => {
      onMessage(messaging, (payload) => {
          console.log("알림 수신:", payload);
          resolve(payload);
      });
  });

export { app, analytics, messaging };
