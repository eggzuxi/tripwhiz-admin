import axios from 'axios';
import { IFaq } from '../../../tripwhiz-admin/src/types/faq';

// main
// const host = 'http://10.10.10.158:8080/api/faq';

// localhost
const host = 'http://localhost:8082/api/faq';

// FAQ 리스트를 가져오는 함수 (페이지네이션 및 카테고리 포함)
export const getFaqList = (page: number, size: number, category?: string): Promise<{ dtoList: IFaq[], totalCount: number }> => {

  return axios.get<{ dtoList: IFaq[], totalCount: number }>(`${host}/list`, {
    params: { page, size, category: category || null }, // 카테고리가 없을 경우 null로 설정
  }).then((res) => res.data); // API 응답 데이터 반환

};

// 특정 FAQ를 가져오는 함수
export const getFaqById = async (fno: number): Promise<IFaq> => {

  const response = await axios.get<IFaq>(`${host}/read/${fno}`);
  return response.data; // API의 FAQ 데이터 반환

};

// FAQ 추가 함수
export const postFaq = async (faq: IFaq): Promise<IFaq> => {

  const res = await axios.post(`${host}/add`, faq);
  return res.data.fno;

}


// FAQ 삭제 함수
export const deleteFaq = async (fno: number): Promise<void> => {
  await axios.delete(`${host}/delete/${fno}`);
}

// FAQ 수정 함수
export const updateFaq = (fno: number, faq: IFaq): Promise<void> => {
  return axios.put(`${host}/update/${fno}`, faq);
};
