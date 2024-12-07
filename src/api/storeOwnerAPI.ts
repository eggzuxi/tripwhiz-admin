import axios from "axios";
import { IStoreOwner } from "../types/storeOwner";

// API 기본 URL 설정
const host = 'http://localhost:8082/api/admin';

// Axios 요청 설정을 중앙화
const getHeaders = (): Record<string, string> => {
    const accessToken = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    };
};

// 공통 에러 처리 함수
const handleError = (error: any, action: string): never => {
    if (error.response) {
        console.error(`${action} 오류:`, error.response.data);
        throw new Error(`${action} 중 오류가 발생했습니다: ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
        console.error(`${action} 오류 (No response):`, error.request);
        throw new Error('서버 응답이 없습니다. 서버를 확인해주세요.');
    } else {
        console.error(`${action} 오류 (Request setup):`, error.message);
        throw new Error(`요청 설정 중 오류가 발생했습니다: ${error.message}`);
    }
};

// 점주 계정 생성
export const createStoreOwner = async (storeOwner: IStoreOwner): Promise<IStoreOwner> => {
    try {
        const res = await axios.post(`${host}/createStoreOwner`, storeOwner, { headers: getHeaders() });
        console.log('점주 계정 생성 응답:', res.data);
        return res.data;
    } catch (error) {
        handleError(error, '점주 계정 생성');
    }
};

// 점주 목록 가져오기
export const getStoreOwners = async (): Promise<IStoreOwner[]> => {
    try {
        const res = await axios.get(`${host}/storeOwners`, { headers: getHeaders() });
        console.log('점주 목록 응답:', res.data);
        return res.data || [];
    } catch (error) {
        handleError(error, '점주 목록 로드');
    }
};

// 점주 계정 삭제
export const deleteStoreOwner = async (sno: number): Promise<void> => {
    try {
        const res = await axios.delete(`${host}/storeOwner/${sno}`, { headers: getHeaders() });
        console.log('삭제 응답 상태:', res.status);
    } catch (error) {
        handleError(error, '점주 계정 삭제');
    }
};
