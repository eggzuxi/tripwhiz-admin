export interface ProductListDTO {
  pno: number;
  pname: string;
  price: number;
  pdesc: string;
  cno: number; // 카테고리 ID
  scno: number; // 서브카테고리 ID
}

export interface ProductReadDTO {
  pno: number;
  pname: string;
  pdesc: string;
  price: number;
  cno: number;
  scno: number;
}

export interface Category {
  cno: number; // 카테고리 ID
  cname: string; // 카테고리 이름
}

export interface SubCategory {
  scno: number; // 서브카테고리 ID
  sname: string; // 서브카테고리 이름
  cno: number; // 상위 카테고리 ID
}
