import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Service Worker 등록
export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('Service Worker 등록 성공:', registration);
        } catch (error) {
            console.error('Service Worker 등록 실패:', error);
        }
    }
};

// FCM 토큰 요청
export const requestFCMToken = async (): Promise<string | null> => {
    try {
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
        });
        console.log("FCM 토큰:", token);
        return token;
    } catch (error) {
        console.error("FCM 토큰 요청 실패:", error);
        return null;
    }
};

// 알림 수신
export const onMessageListener = () =>
  new Promise((resolve) => {
      onMessage(messaging, (payload) => {
          console.log("알림 수신:", payload);
          resolve(payload);
      });
  });
