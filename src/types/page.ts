export interface PageRequestDTO {
  page: number;
  size: number;
  categoryCno?: number;
  subCategoryScno?: number;
  themeCategory?: string;
}

export interface PageResponseDTO<E> {
  dtoList: E[]; // 현재 페이지 데이터 목록
  pageNumList: number[]; // 현재 표시할 페이지 번호 목록
  pageRequestDTO: PageRequestDTO; // 요청 DTO
  prev: boolean; // 이전 버튼 활성화 여부
  next: boolean; // 다음 버튼 활성화 여부
  totalCount: number; // 총 데이터 개수
  prevPage?: number; // 이전 페이지 번호
  nextPage?: number; // 다음 페이지 번호
  totalPage: number; // 총 페이지 수
  current: number; // 현재 페이지 번호
}
