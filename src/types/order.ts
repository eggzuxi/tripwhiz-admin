// 주문 목록에서 사용하는 데이터 타입
export interface OrderListDTO {
  ono: number;
  email: string;
  totalAmount: number;
  totalPrice: number;
  createTime: string;
  pickUpDate: string;
  status: string;
  spno: number;
  deleted: boolean;
}

// 주문 항목 타입 (주문 상세에 포함됨)
export interface OrderItemDTO {
  pname: string;
  amount: number;
}

// 주문 상세에서 사용하는 데이터 타입
export interface OrderReadDTO {
  ono: number; // 주문 번호
  products: OrderItemDTO[]; // 주문 항목 리스트
}