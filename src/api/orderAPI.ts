import axios from 'axios';
import { IOrderList, IOrderRead, IPageResponse } from '../types/order';

// API 엔드포인트
const host = 'http://localhost:8082/api/user/order';

// 주문 목록 조회
export const getOrderList = async (page: number, size: number): Promise<IPageResponse> => {

  const pageValue:number = page || 1
  const sizeValue:number = size || 10

  try {
    const res = await axios.get<IPageResponse>(`${host}/list?page=${pageValue}&size=${sizeValue}`, {
      params: { page, size }, // 페이지 번호와 크기 전달
    });
    console.log(res.data.dtoList);
    return res.data;
  } catch (error) {
    console.error('Error fetching order list:', error);
    throw error;
  }

  
};

// 주문 상세 조회
export const getOrderDetails = async (ono: number): Promise<IOrderRead> => {
  try {
    const res = await axios.get<IOrderRead>(`${host}/details/${ono}`);
    console.log('Fetched Order Details:', res.data);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Order not found:', error);
      return null;
    }
    console.error('Error fetching order details:', error);
    throw error;
  }
};

// 주문 취소
export const cancelOrder = async (ono: number): Promise<string> => {
  try {
    const res = await axios.put(`${host}/cancel/${ono}`);
    console.log('Order Cancelled:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

// 여러 주문 삭제
export const deleteOrders = async (orderIds: number[]): Promise<void> => {
  try {
    await axios.delete(`${host}/delete`, {
      data: orderIds,
    });
    console.log('Deleted Orders:', orderIds);
  } catch (error) {
    console.error('Error deleting orders:', error);
    throw error;
  }
};
