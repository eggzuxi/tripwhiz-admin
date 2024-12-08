import jwtAxios from "../util/jwtUtil";
import { Spot, PageResponseDTO } from "../types/spot";

export const addSpot = async (data: Spot) => {
  try {
    const response = await jwtAxios.post('/admin/spot/add', data);
    return response.data;
  } catch (error) {
    console.error('Failed to add spot:', error);
    throw error;
  }
};

export const getSpotById = async (spno: number): Promise<Spot> => {
  try {
    const response = await jwtAxios.get(`/admin/spot/read/${spno}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch spot:', error);
    throw error;
  }
};

export const getSpots = async (page: number, size: number): Promise<PageResponseDTO<Spot>> => {
  try {
    const response = await jwtAxios.get('/admin/spot/list', {
      params: { page, size },
    });

    // 응답 구조를 확인하고 필요한 데이터를 반환
    if (response.data && Array.isArray(response.data.dtoList)) {
      return response.data;
    } else if (Array.isArray(response.data)) {
      // 단순 배열 형태의 응답 처리
      return {
        dtoList: response.data,
        pageNumList: [],
        prev: false,
        next: false,
        totalCount: response.data.length,
        totalPage: 1,
        current: 1,
      };
    } else {
      throw new Error("Invalid data structure");
    }
  } catch (error) {
    console.error('Failed to fetch spots:', error);
    throw error;
  }
};

export const updateSpot = async (spno: number, data: Spot) => {
  try {
    const response = await jwtAxios.put(`/admin/spot/update/${spno}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update spot:', error);
    throw error;
  }
};

export const deleteSpot = async (spno: number) => {
  try {
    const response = await jwtAxios.delete(`/admin/spot/delete/${spno}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete spot:', error);
    throw error;
  }
};
