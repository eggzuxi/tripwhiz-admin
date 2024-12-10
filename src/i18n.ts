import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ms: {
    translation: {
      welcome: "Selamat datang ke aplikasi!",
      description: "Ini adalah contoh terjemahan.",
    },
  },
  ko: {
    translation: {
      welcome: "앱에 오신 것을 환영합니다!",
      description: "이것은 번역 예제입니다.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ms', // 기본 언어를 말레이시아어로 설정
  fallbackLng: 'ms', // 말레이시아어로 돌아가기
  interpolation: {
    escapeValue: false, // React에서 XSS 방지가 필요 없음
  },
});

export default i18n;
