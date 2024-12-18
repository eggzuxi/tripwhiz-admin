import { useRoutes } from 'react-router-dom';
import router from '../../tripwhiz-admin/src/router/mainRouter';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

import { useEffect, useState } from 'react';
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";

function App() {
  const content = useRoutes(router);
  const [email, setEmail] = useState<string | null>(null);

  // 사용자가 로그인했다고 가정하여 이메일 설정
  useEffect(() => {
    // 여기에 실제 이메일 정보를 설정하는 로직을 넣어주세요.
    setEmail("user@example.com");
  }, []);

  // 알림 권한 요청 및 메시지 리스너 설정
  async function requestPermission() {
    // Requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      alert("Notification granted!");
      const token = await getToken(messaging, {
        vapidKey: 'BPBzQraHoZvc1D9vyZtyRSXLBRcWf3bhXCL3qgeMHcIfop5nQWFIkmpdPa0c2BzOW5JTXLICfd2SGxH1Or74Gxo',
      });

      // We can send the token to the server
      console.log("Token generated: ", token);

    } else if (permission === "denied") {
      // Notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();

    // Message listener
    onMessage(messaging, (payload) => {
      console.log(payload);
      alert("On Message");
    });
  }, []);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
