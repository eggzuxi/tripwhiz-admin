// Spot 인터페이스
export interface Spot {
  spno: number;
  spotname: string;
  address: string;
  tel: string;
  latitude?: number;
  longitude?: number;
  sno: number;
  sname: string;

}

// 페이지네이션 응답 타입
export interface PageResponseDTO<T> {
  dtoList: T[];
  pageNumList: number[];
  prev: boolean;
  next: boolean;
  totalCount: number;
  totalPage: number;
  current: number;
}
