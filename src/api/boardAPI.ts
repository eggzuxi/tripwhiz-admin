import { IBoard } from '../types/board';
import jwtAxios from '../util/jwtUtil';

// 게시글 생성
export const createBoard = async (board: IBoard): Promise<number> => {
  try {
    const res = await jwtAxios.post(`/boa/add`, board);
    console.log('CreatedBoard Data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

// 게시글 리스트 조회
export const getBoardList = async (): Promise<IBoard[] | null> => {
  try {
    const res = await jwtAxios.get<IBoard[]>(`/boa/list`);
    console.log('Fetched Data:', res.data);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Board not found:', error);
      return null;
    }
    console.error('Error fetching board:', error);
    throw error;
  }
};

// 특정 게시글 읽기
export const getBoard = async (bno: number): Promise<IBoard | null> => {
  try {
    const res = await jwtAxios.get<IBoard>(`/boa/read/${bno}`);
    console.log('Fetched Data:', res.data);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Board not found:', error);
      return null;
    }
    console.error('Error fetching board:', error);
    throw error;
  }
};

export const updateBoard = async (bno: number, board: IBoard): Promise<number> => {
  try {
    const res = await jwtAxios.put(`/boa/update/${bno}`, board); // PUT 방식으로 수정
    console.log('Updated board Data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error updating board:', error);
    throw error;
  }
};

// 게시글 삭제
export const deleteBoard = async (bno: number): Promise<number> => {
  try {
    const res = await jwtAxios.delete(`/boa/delete/${bno}`);
    console.log('Deleted board Data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error deleting board :', error);
    throw error;
  }
};
