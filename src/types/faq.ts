export type FaqCategory = 'APP' | '환불' | '픽업' | '매장' | '영수증';

// FAQ 데이터 인터페이스 정의
export interface IFaq {
  fno: number;
  question: string;
  answer: string;
  del_flag: boolean;
  view_cnt: number;
  category : FaqCategory;
}

