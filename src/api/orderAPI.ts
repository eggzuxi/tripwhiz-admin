import jwtAxios from "../util/jwtUtil"; // jwtAxios 경로에 맞게 수정
import { OrderListDTO, OrderReadDTO } from "../types/order";
import { PageRequestDTO, PageResponseDTO } from '../types/page'; // DTO 파일 경로에 맞게 수정

// 주문 리스트 조회
export const fetchOrderList = async (pageRequestDTO: PageRequestDTO): Promise<PageResponseDTO<OrderListDTO>> => {
  try {
    const adjustedRequestDTO = {
      ...pageRequestDTO,
      page: pageRequestDTO.page + 1
    };

    const response = await jwtAxios.get<PageResponseDTO<OrderListDTO>>(
      "/storeowner/order/list",
      {
        params: adjustedRequestDTO,
      }
    );
    console.log("Order List Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch order list:", error.message);
    throw error;
  }
};

// 특정 주문 상세 조회
export const fetchOrderDetails = async (ono: number): Promise<OrderReadDTO> => {
  try {
    const response = await jwtAxios.get<OrderReadDTO>(
      `/storeowner/order/details/${ono}`
    );
    console.log("Order Details Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch order details:", error.message);
    throw error;
  }
};

// // 주문 취소
// export const cancelOrder = async (ono: number): Promise<string> => {
//   try {
//     const res = await axios.put(`${host}/cancel/${ono}`);
//     console.log('Order Cancelled:', res.data);
//     return res.data;
//   } catch (error) {
//     console.error('Error cancelling order:', error);
//     throw error;
//   }
// };
//
// // 여러 주문 삭제
// export const deleteOrders = async (orderIds: number[]): Promise<void> => {
//   try {
//     await axios.delete(`${host}/delete`, {
//       data: orderIds,
//     });
//     console.log('Deleted Orders:', orderIds);
//   } catch (error) {
//     console.error('Error deleting orders:', error);
//     throw error;
//   }
// };
