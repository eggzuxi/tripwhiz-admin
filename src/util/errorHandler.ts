export const handleError = (error: any, action: string): never => {
  if (error.response) {
    console.error(`${action} 오류:`, error.response.data);
    throw new Error(`${action} 실패: ${error.response.data.message || error.response.data}`);
  } else if (error.request) {
    console.error(`${action} 오류 (No response):`, error.request);
    throw new Error(`${action} 실패: 서버 응답 없음`);
  } else {
    console.error(`${action} 오류 (Request setup):`, error.message);
    throw new Error(`${action} 실패: ${error.message}`);
  }
};
