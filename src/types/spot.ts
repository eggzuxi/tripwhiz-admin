// Spot 인터페이스
export interface Spot {
  spno: number;
  spotname: string;
  address: string;
  tel: string;
  sno: number; // 점주 번호
  sname: string | null; // 점주 이름
}

// 페이지네이션 응답 타입
export interface PageResponseDTO<T> {
  dtoList: T[]; // 데이터 목록
  pageNumList?: number[]; // 페이지 번호 목록 (필요에 따라 옵셔널로 설정)
  prev: boolean; // 이전 페이지 여부
  next: boolean; // 다음 페이지 여부
  totalCount: number; // 총 데이터 수
  totalPage: number; // 총 페이지 수
  current: number; // 현재 페이지 번호
}
