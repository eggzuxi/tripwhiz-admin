import axios from "axios";
import { Spot } from "../types/spot";

// API 기본 URL 설정
const host = "http://localhost:8082/api/spot";

// Axios 요청 설정을 중앙화
const getHeaders = (): Record<string, string> => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
};

// 공통 에러 처리 함수
const handleError = (error: any, action: string): never => {
  if (error.response) {
    console.error(`${action} 오류:`, error.response.data);
    throw new Error(`${action} 중 오류가 발생했습니다: ${error.response.data.message || error.response.data}`);
  } else if (error.request) {
    console.error(`${action} 오류 (No response):`, error.request);
    throw new Error("서버 응답이 없습니다. 서버를 확인해주세요.");
  } else {
    console.error(`${action} 오류 (Request setup):`, error.message);
    throw new Error(`요청 설정 중 오류가 발생했습니다: ${error.message}`);
  }
};

// Spot 생성
export const addSpot = async (spot: Partial<Spot>): Promise<Spot> => {
  try {
    const res = await axios.post(`${host}/add`, spot, { headers: getHeaders() });
    console.log("Spot 생성 응답:", res.data);
    return res.data;
  } catch (error) {
    handleError(error, "Spot 생성");
  }
};

// Spot 목록 가져오기 (페이지네이션)
export const getSpots = async (page: number, size: number): Promise<Spot[]> => {
  try {
    const res = await axios.get(`${host}/list`, {
      headers: getHeaders(),
      params: { page, size },
    });
    console.log("Spot 목록 응답:", res.data);
    return res.data || [];
  } catch (error) {
    handleError(error, "Spot 목록 로드");
  }
};

// 단일 Spot 가져오기
export const getSpotById = async (spno: number): Promise<Spot> => {
  try {
    const res = await axios.get(`${host}/read/${spno}`, { headers: getHeaders() });
    console.log("단일 Spot 응답:", res.data);
    return res.data;
  } catch (error) {
    handleError(error, "단일 Spot 로드");
  }
};

// Spot 수정
export const updateSpot = async (spno: number, spot: Partial<Spot>): Promise<void> => {
  try {
    const res = await axios.put(`${host}/update/${spno}`, spot, { headers: getHeaders() });
    console.log("Spot 수정 응답 상태:", res.status);
  } catch (error) {
    handleError(error, "Spot 수정");
  }
};

// Spot 삭제
export const deleteSpot = async (spno: number): Promise<void> => {
  try {
    const res = await axios.delete(`${host}/delete/${spno}`, { headers: getHeaders() });
    console.log("Spot 삭제 응답 상태:", res.status);
  } catch (error) {
    handleError(error, "Spot 삭제");
  }
};
