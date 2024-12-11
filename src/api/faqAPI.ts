import jwtAxios from '../util/jwtUtil';
import { IFaq } from '../types/faq';

// FAQ 리스트를 가져오는 함수 (페이지네이션 및 카테고리 포함)
export const getFaqList = (page: number, size: number, category?: string): Promise<{ dtoList: IFaq[], totalCount: number }> => {

  return jwtAxios.get<{ dtoList: IFaq[], totalCount: number }>(`/faq/list`, {
    params: { page, size, category: category || null }, // 카테고리가 없을 경우 null로 설정
  }).then((res) => res.data); // API 응답 데이터 반환

};

// 특정 FAQ를 가져오는 함수
export const getFaqById = async (fno: number): Promise<IFaq> => {

  const response = await jwtAxios.get<IFaq>(`/faq/read/${fno}`);
  return response.data; // API의 FAQ 데이터 반환

};

// FAQ 추가 함수
export const postFaq = async (faq: IFaq): Promise<IFaq> => {

  const res = await jwtAxios.post(`/faq/add`, faq);
  return res.data.fno;

}


// FAQ 삭제 함수
export const deleteFaq = async (fno: number): Promise<void> => {
  await jwtAxios.delete(`/faq/delete/${fno}`);
}

// FAQ 수정 함수
export const updateFaq = (fno: number, faq: IFaq): Promise<void> => {
  return jwtAxios.put(`/faq/update/${fno}`, faq);
};
