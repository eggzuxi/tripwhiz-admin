import axios from "axios";
import { IStoreOwner } from "../types/storeOwner";

// API 기본 URL 설정
const host = 'http://localhost:8080/api/admin'; // 점주 관련 API가 /api/admin에 있으므로 URL을 수정

// 점주 계정 생성
export const createStoreOwner = async (storeOwner: IStoreOwner): Promise<IStoreOwner> => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json', // JSON 형식 지정
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }) // 토큰이 있을 때만 Authorization 헤더 추가
    };

    console.log('Request Headers:', headers); // 헤더를 콘솔에 출력하여 확인

    try {
        const res = await axios.post(`${host}/createStoreOwner`, storeOwner, { headers }); // 엔드포인트 수정
        console.log('점주 계정 생성 응답:', res.data);
        return res.data; // 생성된 점주 정보를 반환
    } catch (error) {
        if (error.response) {
            // 서버가 응답을 했으나 에러 코드가 반환된 경우
            console.error('점주 계정 생성 오류:', error.response.data);
            throw new Error(`점주 계정 생성 중 오류가 발생했습니다: ${error.response.data.message || error.response.data}`);
        } else if (error.request) {
            // 서버로 요청은 했으나 응답이 없었던 경우
            console.error('점주 계정 생성 오류 (No response):', error.request);
            throw new Error('서버 응답이 없습니다. 서버를 확인해주세요.');
        } else {
            // 요청을 설정하는 중에 문제가 발생한 경우
            console.error('점주 계정 생성 오류 (Request setup):', error.message);
            throw new Error(`요청 설정 중 오류가 발생했습니다: ${error.message}`);
        }
    }
};

// 점주 목록 가져오기
export const getStoreOwners = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    };

    try {
        const res = await axios.get(`${host}/storeOwners`, { headers }); // 엔드포인트 수정
        console.log('점주 목록 응답:', res.data);
        return res.data || []; // 점주 목록 반환
    } catch (error) {
        console.error('점주 목록 로드 오류:', error);
        throw error;
    }
};

// 점주 단일 정보 조회
export const getStoreOwner = async (id: string): Promise<IStoreOwner> => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    };

    try {
        const res = await axios.get(`${host}/storeOwner/${id}`, { headers }); // 엔드포인트 수정
        console.log('점주 정보 응답:', res.data);
        return res.data; // 점주 정보 반환
    } catch (error) {
        console.error('점주 정보 조회 오류:', error);
        throw error;
    }
};

// 점주 계정 수정
export const updateStoreOwner = async (storeOwner: IStoreOwner): Promise<IStoreOwner> => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    };

    try {
        const res = await axios.put(`${host}/updateStoreOwner`, storeOwner, { headers }); // 엔드포인트 수정
        console.log('점주 계정 수정 응답:', res.data);
        return res.data; // 수정된 점주 정보 반환
    } catch (error) {
        console.error('점주 계정 수정 오류:', error);
        throw error;
    }
};

export const deleteStoreOwner = async (s_no) => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    };

    console.log('Request Headers:', headers); // 헤더를 콘솔에 출력하여 확인

    try {
        const res = await axios.delete(`http://localhost:8080/api/admin/deleteStoreOwner/${s_no}`, { headers });
        console.log('점주 계정 삭제 응답:', res.data);
        return res.data;
    } catch (error) {
        if (error.response) {
            console.error('점주 계정 삭제 오류:', error.response.data);
            throw new Error(`점주 계정 삭제 중 오류가 발생했습니다: ${error.response.data.message || error.response.data}`);
        } else if (error.request) {
            console.error('점주 계정 삭제 오류 (No response):', error.request);
            throw new Error('서버 응답이 없습니다. 서버를 확인해주세요.');
        } else {
            console.error('점주 계정 삭제 오류 (Request setup):', error.message);
            throw new Error(`요청 설정 중 오류가 발생했습니다: ${error.message}`);
        }
    }
};

