import axios from 'axios';
import { Category, ProductListDTO, ProductReadDTO, SubCategory, ThemeCategory } from '../types/product';


// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios 요청에 accessToken 추가
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/**
 * 상품 관련 API
 */

// 상품 목록 조회
export const fetchProductList = (): Promise<ProductListDTO[]> => {
  return api.get('/api/admin/product/list')
    .then((response) => {
      if (response.data && response.data.dtoList) {
        return response.data.dtoList;
      }
      console.error('Invalid API response:', response.data);
      return [];
    });
};

// 특정 상품 조회
export const fetchProductById = (pno: number): Promise<ProductReadDTO> => {
  return api.get(`/api/admin/product/read/${pno}`)
    .then((response) => response.data);
};

// 상품 추가
export const addProduct = (product: ProductListDTO, imageFiles?: File[]): Promise<number> => {
  const formData = new FormData();
  formData.append('productListDTO', JSON.stringify(product));
  if (imageFiles) {
    imageFiles.forEach((file) => formData.append('imageFiles', file));
  }

  return api.post('/api/admin/product/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((response) => response.data);
};

// 상품 수정
export const modifyProduct = (pno: number, product: ProductListDTO, imageFiles?: File[]): Promise<number> => {
  const formData = new FormData();
  formData.append('productListDTO', JSON.stringify(product));
  if (imageFiles) {
    imageFiles.forEach((file) => formData.append('imageFiles', file));
  }

  return api.put(`/api/admin/product/update/${pno}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((response) => response.data);
};

// 상품 삭제
export const deleteProduct = (pno: number): Promise<void> => {
  return api.put(`/api/admin/product/delete/${pno}`).then(() => undefined);
};

/**
 * 카테고리 관련 API
 */

// 전체 카테고리 조회
export const fetchCategories = (): Promise<Category[]> => {
  return api.get('/api/categories')
    .then((response) => response.data);
};

// 특정 카테고리의 하위 카테고리 조회
export const fetchSubCategories = (cno: number): Promise<SubCategory[]> => {
  return api.get(`/api/categories/${cno}/subcategories`)
    .then((response) => response.data);
};

// 테마 목록 조회
export const fetchThemes = (): Promise<ThemeCategory[]> => {
  return api.get('/api/admin/themes').then((response) => response.data);
};