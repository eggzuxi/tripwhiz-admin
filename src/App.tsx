import { useRoutes } from 'react-router-dom';
import router from '../../tripwhiz-admin/src/router/mainRouter';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

import useFCM from './hooks/useFCM'; // useFCM 훅 가져오기
import { useEffect, useState } from 'react';

function App() {
  const content = useRoutes(router);
  const [email, setEmail] = useState<string | null>(null);

  // 사용자가 로그인했다고 가정하여 이메일 설정
  useEffect(() => {
    // 여기에 실제 이메일 정보를 설정하는 로직을 넣어주세요.
    setEmail("user@example.com");
  }, []);

  // FCM 훅 호출
  useFCM(email);

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
