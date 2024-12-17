import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// Firebase 설정 (이미지에서 제공된 정보 기반)
const firebaseConfig = {
    apiKey: "AIzaSyAq4LWQ1QYwqK1xErJFBp3J9Pu1_Tw0K",
    authDomain: "jin1107-c14a2.firebaseapp.com",
    projectId: "jin1107-c14a2",
    storageBucket: "jin1107-c14a2.appspot.com",
    messagingSenderId: "11502337642045",
    appId: "1:11502337642045:web:7d696f03b008c1a616e854",
    measurementId: "G-T0B64CX97H",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Analytics 초기화
const analytics = getAnalytics(app);

// Firebase Cloud Messaging 초기화
const messaging = getMessaging(app);

export { app, analytics, messaging };
