// 재고 아이템의 타입을 정의
export interface IStock {
  productId: string;
  productName: string;
  quantity: number;
}

// 재고 목록을 반환하는 함수의 타입을 정의
export interface IStockResponse {
  dtoList: IStock[];
  message: string;
}
