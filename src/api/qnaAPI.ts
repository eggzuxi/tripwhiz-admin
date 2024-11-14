import axios from 'axios';
import { IQuestion } from '../../src/types/question';
import { IAnswer } from '../../src/types/answer';

const host = 'http://10.10.10.158:8080/api/que';


//응답 데이터 타입 정의_SY
interface QuestionResponse {
  dtoList: IQuestion[];  // dtoList 배열에 IQuestion 타입이 포함됨
}

// QnA 리스트를 가져오는 함수_SY
export const getQuestionList = async (): Promise<IQuestion[]> => {
  try {
    // Axios GET 요청으로 Question 리스트를 가져옴
    const res = await axios.get<QuestionResponse>(`${host}/list`);
    console.log('Fetched Data:', res.data); // 데이터 확인
    // 응답이 성공적이면 데이터 반환
    return res.data.dtoList;
  } catch (error) {
    console.error('Failed to fetch question list:', error);
    throw error; // 에러가 발생하면 호출한 곳으로 전달
  }
};


// about QnA read_SA
// Q&A 데이터를 가져오는 API 호출
export const getOneQuestion = async (qno: string): Promise<IAnswer> => {
  try {
    const res = await axios.get(`${host}/read/${qno}`);
    return res.data;
  } catch (error) {
    console.error('Q&A 데이터를 가져오는 데 실패했습니다:', error);
    throw error;
  }
};

// 답변을 제출하는 API 호출
// export const postQnaAnswer = async (ano: number, answer: string): Promise<void> => {
//   try {
//     const addAnswer = {
//       acontent: answer,
//       updated_date: new Date()
//     };
//     await axios.post(`/api/ans/add/${ano}`, addAnswer);
//   } catch (error) {
//     console.error('답변 제출에 실패했습니다.', error);
//     throw error;
//   }
// };

// Q&A 수정 API 호출
// export const updateAnswer = async (ano: number, updatedQna: IAnswer): Promise<void> => {
//   try {
//     await axios.put(`/api/ans/update/${ano}`, updatedQna);
//   } catch (error) {
//     console.error('수정에 실패했습니다.', error);
//     throw error;
//   }
// };

// Q&A 삭제 API 호출
// export const deleteAnswer = async (ano: number): Promise<void> => {
//   try {
//     await axios.delete(`/api/ans/delete/${ano}`);
//   } catch (error) {
//     console.error('삭제에 실패했습니다.', error);
//     throw error;
//   }
// };

