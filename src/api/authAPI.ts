import jwtAxios from "../util/jwtUtil";
import { handleError } from "../util/errorHandler";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role?: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// 로그인
export const login = async (id: string, pw: string, role: string): Promise<LoginResponse> => {
  try {
    const res = await jwtAxios.post<LoginResponse>("/auth/login", { id, pw, role });
    console.log("Login successful:", res.data);
    return res.data;
  } catch (error) {
    handleError(error, "로그인");
    throw error;
  }
};

// 토큰 갱신
export const refreshRequest = async (accessToken: string, refreshToken: string): Promise<RefreshResponse> => {
  if (!accessToken || !refreshToken) {
    throw new Error("유효하지 않은 토큰: Access Token 또는 Refresh Token이 없습니다.");
  }

  try {
    const res = await jwtAxios.get<RefreshResponse>(`/auth/refresh?refreshToken=${refreshToken}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("Tokens refreshed successfully:", res.data);
    return res.data;
  } catch (error) {
    handleError(error, "토큰 갱신");
    throw error;
  }
};
