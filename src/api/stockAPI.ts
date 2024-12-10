import axios from 'axios';
import { IStock, IStockResponse } from '../types/stock';


const host ='http://localhost:8082/api/stock';



export const getStockQuantity = async (): Promise<IStock[]> => {
  try {
    const res = await axios.get(`${host}`);
    console.log('Fetched Data:', res.data); // 데이터 확인
    // 응답이 성공적이면 데이터 반환
    return res.data.dtoList;
  } catch (error) {
    console.error('Failed to fetch question list:', error);
    throw error; // 에러가 발생하면 호출한 곳으로 전달
  }
};

export const updateStock = async (productId: string, quantity: number): Promise<IStockResponse> => {
  try {
    const res = await axios.get(`${host}`);
    console.log('Fetched Data:', res.data); // 데이터 확인
    // 응답이 성공적이면 데이터 반환
    return res.data.dtoList;
  } catch (error) {
    console.error('Failed to fetch question list:', error);
    throw error; // 에러가 발생하면 호출한 곳으로 전달
  }
};