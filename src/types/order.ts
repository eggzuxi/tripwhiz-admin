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
  products: IOrderItem[];   // 주문 항목 리스트
}

export interface IPageResponse {
  dtoList: IOrderList[]; // 데이터 배열
  current: number;       // 현재 페이지 번호
  next: boolean;         // 다음 페이지 존재 여부
  nextPage: number;      // 다음 페이지 번호
  pageNumList: number[]; // 페이지 번호 리스트
  pageRequestDTO: {      // 요청 DTO
    page: number;        // 현재 페이지 번호
    size: number;        // 페이지 크기
    categoryCno?: number | null; // 카테고리 번호 (옵션)
    subCategoryScno?: number | null; // 하위 카테고리 번호 (옵션)
    themeCategory?: string | null;   // 테마 카테고리 (옵션)
  };
  prev: boolean;         // 이전 페이지 존재 여부
  prevPage: number;      // 이전 페이지 번호
  totalCount: number;    // 총 데이터 수
  totalPage: number;     // 총 페이지 수
}
