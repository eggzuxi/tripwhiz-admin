import axios from "axios";
import { StoreOwner } from "../types/storeOwner";

const host = "http://localhost:8080/api/store";

// 모든 StoreOwner 조회
export const getStoreOwners = async (): Promise<StoreOwner[]> => {
  const response = await axios.get<StoreOwner[]>(`${host}/list`);
  return response.data;
};

// 특정 StoreOwner 조회
export const getStoreOwnerById = async (sno: number): Promise<StoreOwner> => {
  const response = await axios.get<StoreOwner>(`${host}/read/${sno}`);
  return response.data;
};

// StoreOwner 추가
export const addStoreOwner = async (storeowner: Partial<StoreOwner>): Promise<StoreOwner> => {
  const response = await axios.post<StoreOwner>(`${host}/add`, storeowner);
  return response.data;
};

// StoreOwner 수정
export const updateStoreOwner = async (
  sno: number,
  storeowner: Partial<StoreOwner>
): Promise<void> => {
  await axios.put(`${host}/update/${sno}`, storeowner);
};

// StoreOwner 소프트 삭제
export const softDeleteStoreOwner = async (sno: number): Promise<void> => {
  await axios.delete(`${host}/delete/${sno}`);
};
