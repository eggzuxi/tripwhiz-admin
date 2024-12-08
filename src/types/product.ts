// 상위 카테고리 (Category) 타입 정의
export interface Category {
  cno: number; // 카테고리 ID
  cname: string; // 카테고리 이름
}

// 하위 카테고리 (SubCategory) 타입 정의
export interface SubCategory {
  scno: number; // 서브 카테고리 ID
  sname: string; // 서브 카테고리 이름
}

// 첨부 파일 (AttachFile) 타입 정의
export interface AttachFile {
  ord: number; // 파일 순서
  filename: string; // 파일 이름
}

// 테마 카테고리 (ThemeCategory) 타입 정의
export interface ThemeCategory {
  tno: number; // 테마 카테고리 ID
  tname: string; // 테마 카테고리 이름
  delFlag: boolean; // 삭제 여부
}

// 상품 테마 (ProductTheme) 타입 정의
export interface ProductTheme {
  ptno: number; // 상품 테마 ID
  product: Product; // 연결된 상품 정보
  themeCategory: ThemeCategory; // 연결된 테마 카테고리 정보
}

// 상품 (Product) 타입 정의
export interface Product {
  pno: number; // 상품 번호
  pname: string; // 상품 이름
  pdesc: string; // 상품 설명
  price: number; // 상품 가격
  delFlag: boolean; // 삭제 여부
  attachFiles: AttachFile[]; // 첨부 파일 목록
  category: Category; // 상위 카테고리
  subCategory: SubCategory; // 하위 카테고리
}

// 상품 목록 DTO (ProductListDTO) 타입 정의
export interface ProductListDTO {
  pno?: number; // 상품 번호 (optional)
  pname: string; // 상품 이름
  price: number; // 상품 가격
  pdesc: string; // 상품 설명
  category: Category; // 상위 카테고리
  subCategory: SubCategory; // 하위 카테고리
  tnos: number[]; // 테마 카테고리 ID 배열
  attachFiles?: AttachFile[]; // 첨부 파일 목록 (optional)
}

// 상품 조회 DTO (ProductReadDTO) 타입 정의
export interface ProductReadDTO {
  pno: number; // 상품 번호
  pname: string; // 상품 이름
  pdesc: string; // 상품 설명
  price: number; // 상품 가격
  category: Category; // 상위 카테고리
  subCategory: SubCategory; // 하위 카테고리
  attachFiles: AttachFile[]; // 첨부 파일 목록
}

// 페이지 요청 DTO (PageRequestDTO) 타입 정의
export interface PageRequestDTO {
  page: number; // 현재 페이지
  size: number; // 페이지 크기
  categoryCno?: number; // 상위 카테고리 ID (optional)
  subCategoryScno?: number; // 하위 카테고리 ID (optional)
  themeCategory?: number; // 테마 카테고리 ID (optional)
}

// 페이지 응답 DTO (PageResponseDTO) 타입 정의
export interface PageResponseDTO<T> {
  dtoList: T[]; // DTO 목록
  totalPage: number; // 총 페이지 수
  totalCount: number; // 총 항목 수
  pageRequestDTO: PageRequestDTO; // 요청 정보
  prev: boolean; // 이전 페이지 여부
  next: boolean; // 다음 페이지 여부
  pageNumList: number[]; // 페이지 번호 목록
}
