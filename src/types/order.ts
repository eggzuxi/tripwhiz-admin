// 주문 목록에서 사용하는 데이터 타입
import { IProduct } from './product';

export interface IOrderList {
  ono: number;
  mno: number;
  name: string;
  totalAmount: number;
  totalPrice: number;
  createTime: string;
  pickUpDate: string;
  status: string;
  delFlag: boolean;
}

// 주문 항목 타입 (주문 상세에 포함됨)
export interface IOrderItem {
  product: IProduct[];   // 상품 이름
  amount: number;
}

// 주문 상세에서 사용하는 데이터 타입
export interface IOrderRead {
  ono: number;           // 주문 번호
  items: IOrderItem[];   // 주문 항목 리스트
}

export interface IPageResponse {
  content: IOrderList[],
  totalElements: number,
  number: number,
  first: boolean
  last: boolean
  size: number
  totalPages: number
}