export interface StoreOwner {
  sno: number;
  sname: string;
  id: string;
  pw: string;
  tel: string;
  email: string;
  delFlag: boolean;

// StoreOwner 타입 정의 (백엔드와 필드명 일치)
export interface IStoreOwner {
    s_no: number;
    id: string;       // 점주 ID
    pw: string;       // 비밀번호
    email: string;    // 이메일
    delFlag: boolean; // 삭제 플래그
    sName?: string;   // 점주 이름 (Optional)
}
