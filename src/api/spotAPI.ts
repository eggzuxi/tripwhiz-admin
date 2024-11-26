import axios from "axios";
import { Spot } from "../types/spot";

// Axios 인스턴스 생성
const spotAPI = axios.create({
  baseURL: "http://localhost:8080/api/spot", // API 기본 URL
  headers: {
    "Content-Type": "application/json", // 기본 Content-Type
  },
});

// 요청 인터셉터: Authorization 헤더 추가
spotAPI.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

// Spot 목록 조회 (페이지네이션 적용)
export const getSpots = (page: number, size: number): Promise<Spot[]> =>
  spotAPI
    .get<Spot[]>("/list", {
      params: { page, size },
    })
    .then((response) => response.data);

// 단일 Spot 조회
export const getSpotById = (spno: number): Promise<Spot> =>
  spotAPI
    .get<Spot>(`/read/${spno}`)
    .then((response) => response.data);

// Spot 추가
export const addSpot = (spot: Partial<Spot>): Promise<Spot> =>
  spotAPI
    .post<Spot>("/add", spot)
    .then((response) => response.data);

// Spot 수정
export const updateSpot = (spno: number, spot: Partial<Spot>): Promise<void> =>
  spotAPI
    .put(`/update/${spno}`, spot)
    .then((response) => response.data);

// Spot 소프트 삭제
export const softDeleteSpot = (spno: number): Promise<void> =>
  spotAPI
    .delete(`/delete/${spno}`)
    .then((response) => response.data);

export default spotAPI;
