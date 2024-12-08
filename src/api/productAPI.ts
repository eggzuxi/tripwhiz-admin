import axios from 'axios';
import {
  Category,
  PageRequestDTO,
  PageResponseDTO,
  ProductListDTO,
  ProductReadDTO,
  SubCategory,
  ThemeCategory,
} from '../types/product';

const API_BASE_URL = 'http://localhost:8082/api/admin/product';
const CATEGORY_API_BASE_URL = 'http://localhost:8082/api/categories';

// Access Token 가져오기 함수
const getAccessToken = (): string | null => {
  const token = localStorage.getItem('accessToken');
  console.log('AccessToken:', token); // Access Token 확인 로그
  return token;
};

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios 요청 인터셉터로 Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Request Headers:', config.headers); // 요청 헤더 로그
    }
    console.log('Request Config:', config); // 전체 요청 정보 로그
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error); // 인터셉터 오류 로그
    return Promise.reject(error);
  }
);

// Axios 응답 인터셉터로 응답 정보 추가
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response Received:');
    console.log(`Status: ${response.status}`);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Error Data:', error.response.data);
      console.error('Response Headers:', error.response.headers);
    } else {
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

// 상품 관련 API
export const fetchProducts = async (
  params: PageRequestDTO
): Promise<{ dtoList: ProductListDTO[] }> => {
  console.log('Fetching Products with params:', params);
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/list`, { params });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching Products:', error);
    throw error;
  }
};

export const fetchProductById = async (pno: number): Promise<ProductReadDTO> => {
  console.log('Fetching Product by ID:', pno);
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/read/native/${pno}`);
    console.log('Product Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching Product by ID:', error);
    throw error;
  }
};

// createProduct 수정
export const createProduct = async (
  productListDTO: ProductListDTO,
  imageFiles?: File[]
): Promise<number> => {
  const formData = new FormData();
  formData.append('productListDTO', JSON.stringify(productListDTO));

  if (imageFiles) {
    imageFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });
  }

  console.log('FormData being sent:');
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(`Key: ${key}, File Name: ${value.name}, Size: ${value.size}`);
    } else {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  });

  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/add`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Create Product Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Creating Product:', error);
    if (error.response) {
      console.error('Response Error Details:');
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Other Error:', error.message);
    }
    throw error;
  }
};

export const updateProduct = async (
  pno: number,
  productListDTO: ProductListDTO,
  imageFiles?: File[]
): Promise<number> => {
  const formData = new FormData();
  formData.append('productListDTO', JSON.stringify(productListDTO));

  // 이미지 파일이 있을 경우 FormData에 추가
  if (imageFiles) {
    imageFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });
  }

  console.log('Updating Product with FormData:');
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(`Key: ${key}, File Name: ${value.name}, Size: ${value.size}`);
    } else {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  });

  try {
    // PUT 요청으로 상품 업데이트
    const response = await axiosInstance.put(
      `${API_BASE_URL}/update/${pno}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.log('Update Product Response:', response.data);
    return response.data; // 응답 데이터 반환 (상품 번호)
  } catch (error) {
    console.error('Error Updating Product:', error);
    if (error.response) {
      console.error('Response Error Details:');
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Other Error:', error.message);
    }
    throw error; // 에러 던지기
  }
};


// 카테고리 관련 API
export const fetchCategories = async (): Promise<Category[]> => {
  console.log('Fetching Categories');
  try {
    const response = await axiosInstance.get(`${CATEGORY_API_BASE_URL}`);
    console.log('Categories Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching Categories:', error);
    throw error;
  }
};

export const fetchSubCategories = async (cno: number): Promise<SubCategory[]> => {
  console.log('Fetching SubCategories for Category ID:', cno);
  try {
    const response = await axiosInstance.get(`${CATEGORY_API_BASE_URL}/${cno}/subcategories`);
    console.log('SubCategories Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching SubCategories:', error);
    throw error;
  }
};

// 테마 관련 API
export const fetchThemeCategories = async (): Promise<ThemeCategory[]> => {
  console.log('Fetching Theme Categories');
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/themes`);
    console.log('Theme Categories Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching Theme Categories:', error);
    throw error;
  }
};
