import axios from "axios";
import { PageResponseDTO, Spot } from '../types/spot';

const host = "http://localhost:8080/api/spot";

// Spot 목록 조회 (페이지네이션 적용)
export const getSpots = (
  page: number,
  size: number
): Promise<PageResponseDTO<Spot>> => {
  return axios
    .get<PageResponseDTO<Spot>>(`${host}/list`, {
      params: { page, size },
    })
    .then((response) => response.data);
};

// 단일 Spot 조회
export const getSpotById = (spno: number): Promise<Spot> => {
  return axios
    .get<Spot>(`${host}/read/${spno}`)
    .then((response) => response.data);
};

// Spot 추가
export const addSpot = (spot: Partial<Spot>): Promise<Spot> => {
  return axios
    .post<Spot>(`${host}/add`, spot)
    .then((response) => response.data);
};

// Spot 수정
export const updateSpot = (spno: number, spot: Partial<Spot>): Promise<void> => {
  return axios.put(`${host}/update/${spno}`, spot).then((response) => response.data);
};

// Spot 소프트 삭제
export const softDeleteSpot = (spno: number): Promise<void> => {
  return axios.delete(`${host}/delete/${spno}`).then((response) => response.data);
};