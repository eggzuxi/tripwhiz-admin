import { IBoard } from '../types/board';
import axios from 'axios';

// main
// const host = 'http://10.10.10.158:8080/api/boa';

// localhost
const host = 'http://localhost:8082/api/boa';

// 게시글 생성
export const createBoard = async (board: IBoard): Promise<number> => {
  try {
    const res = await axios.post(`${host}/add`, board);
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
    const res = await axios.get<IBoard[]>(`${host}/list`);
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
    const res = await axios.get<IBoard>(`${host}/read/${bno}`);
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
    const res = await axios.put(`${host}/update/${bno}`, board); // PUT 방식으로 수정
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
    const res = await axios.delete(`${host}/delete/${bno}`);
    console.log('Deleted board Data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error deleting board :', error);
    throw error;
  }
};