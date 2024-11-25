// StoreOwner 타입 정의 (백엔드와 필드명 일치)
//so
export interface IStoreOwner {
    sno: number;       // 점주 번호 (Primary Key)
    sname: string;     // 점주 이름
    id: string;        // 점주 ID
    pw: string;        // 비밀번호
    email: string;     // 이메일
    delFlag: boolean;  // 삭제 여부
}
