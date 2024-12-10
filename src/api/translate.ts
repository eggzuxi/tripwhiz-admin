import axios from 'axios';

interface ITranslateRequest {
  text: string;
  targetLanguage: string;
}

interface ITranslateResponse {
  translatedText: string;
}

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const translateText = async (
  translateData: ITranslateRequest
): Promise<ITranslateResponse> => {
  if (!API_KEY) {
    throw new Error('Google API Key가 설정되지 않았습니다.');
  }

  try {
    const res = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: translateData.text,
        target: translateData.targetLanguage,
      }
    );

    return { translatedText: res.data.data.translations[0].translatedText };
  } catch (error) {
    console.error('번역 API 호출 실패:', error);
    throw error;
  }
};
