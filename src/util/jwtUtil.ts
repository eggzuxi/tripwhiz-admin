import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { refreshRequest } from "../api/commonAPI";
import useAuthStore from "../AuthState";

const jwtAxios = axios.create({
    baseURL: "http://tripwhiz.store/api",
    // baseURL: "http://localhost:8082/api",
});


// 요청 전 처리
const beforeReq = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log("Request initiated", config.url);

    // 인증이 필요 없는 엔드포인트 처리
    if (config.url?.includes("/auth/login") || config.url?.includes("/admin/register")) {
        return config;
    }

    // Zustand에서 현재 인증 상태 가져오기
    const { admin, storeowner } = useAuthStore.getState();
    const token = admin?.accessToken || storeowner?.accessToken;

    // 토큰이 없는 경우 에러 처리
    if (!token) {
        console.error("No access token found.");
        throw new Error("Access token not found.");
    }

    // 요청 헤더에 Authorization 추가
    config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;

    console.log("Request Headers:", config.headers);

    return config;
};

// 요청 실패 처리
const failReq = (error: any) => {
    console.error("Request failed:", error.message);
    return Promise.reject(error);
};

// 응답 전 처리
const beforeRes = async (res: AxiosResponse): Promise<AxiosResponse> => {
    console.log("Response received:", res);

    const data = res.data;

    if (data.error === "ERROR_ACCESS_TOKEN") {
        console.warn("Access token invalid. Attempting refresh.");

        const { admin, storeowner } = useAuthStore.getState();
        const tokenData = admin?.accessToken ? admin : storeowner;

        if (!tokenData || !tokenData.accessToken || !tokenData.refreshToken) {
            throw new Error("Invalid or missing tokens.");
        }

        try {
            const refreshResult = await refreshRequest(tokenData.accessToken, tokenData.refreshToken);

            console.log("Tokens refreshed successfully:", refreshResult);

            // 상태 업데이트
            if (admin?.accessToken) {
                useAuthStore.getState().setAdmin(
                  admin.name,
                  admin.id,
                  refreshResult.accessToken,
                  refreshResult.refreshToken
                );
            } else if (storeowner?.accessToken) {
                useAuthStore.getState().setStoreowner(
                  storeowner.name,
                  storeowner.id,
                  refreshResult.accessToken,
                  refreshResult.refreshToken
                );
            }

            // 원래 요청에 새로운 토큰 설정
            const originalRequest = res.config;
            originalRequest.headers = {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${refreshResult.accessToken}`,
            } as AxiosRequestHeaders;

            return await jwtAxios.request(originalRequest);
        } catch (refreshError) {
            console.error("Token refresh failed:", refreshError.message);
            useAuthStore.getState().logoutAdmin();
            useAuthStore.getState().logoutStoreowner();
            throw new Error("Session expired. Please log in again.");
        }
    }

    return res;
};

// 응답 실패 처리
const failRes = (error: any) => {
    console.error("Response failed:", error.message);
    return Promise.reject(error);
};

// 인터셉터 등록
jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
