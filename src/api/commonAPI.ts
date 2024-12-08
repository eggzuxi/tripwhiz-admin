import jwtAxios from "../util/jwtUtil";

// 토큰 갱신 요청 함수
export const refreshRequest = async (
  accessToken: string,
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    console.log("Refreshing tokens");
    const res = await jwtAxios.get(`/refresh?refreshToken=${refreshToken}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("Tokens refreshed successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Token refresh failed:", error.message);
    throw new Error("토큰 갱신 중 오류 발생");
  }
};
