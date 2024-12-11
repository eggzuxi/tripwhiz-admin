import {
  Category,
  PageRequestDTO,
  ProductListDTO,
  ProductReadDTO,
  SubCategory,
  ThemeCategory
} from '../types/product';
import jwtAxios from '../util/jwtUtil';
import useAuthStore from '../AuthState';

// 상품 관련 API

// 상품 목록 조회 (배열 반환)
export const fetchProducts = async (): Promise<ProductListDTO[]> => {
  try {
    const response = await jwtAxios.get('/admin/product/list');

    // 추가 디버깅용 로그
    console.log('Response Status:', response.status); // 응답 상태 코드
    console.log('Response Headers:', response.headers); // 응답 헤더
    console.log('Response Data Type:', typeof response.data); // 응답 데이터 타입
    console.log('Response Data:', response.data); // 응답 데이터

    return response.data; // 배열 반환
  } catch (error) {
    console.error('Error Fetching Products:', error);
    throw error;
  }
};


// 상품 상세 조회 (단일 객체 반환)
export const fetchProductById = async (pno: number): Promise<ProductReadDTO> => {
  console.log('Fetching Product by ID:', pno);  // 확인용 로그
  try {
    const response = await jwtAxios.get(`/admin/product/read/native/${pno}`);
    console.log('Product Data:', response.data); // 응답 데이터 로그
    return response.data;
  } catch (error) {
    console.error('Error Fetching Product by ID:', error);
    throw error;
  }
};

// 상품 검색
export const fetchProductsWithFilters = async (
  keyword?: string,
  minPrice?: number,
  maxPrice?: number,
  tno?: number,
  cno?: number,
  scno?: number,
  pageRequestDTO?: PageRequestDTO
): Promise<{ dtoList: ProductListDTO[]; totalCount: number }> => {
  console.log('Fetching Products with Filters:', { keyword, minPrice, maxPrice, tno, cno, scno, pageRequestDTO });

  try {
    const response = await jwtAxios.get(`/admin/product/list/search`, {
      params: {
        keyword,
        minPrice,
        maxPrice,
        tno,
        cno,
        scno,
        page: pageRequestDTO?.page,
        size: pageRequestDTO?.size,
      },
    });

    console.log('Search API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching Products with Filters:', error);
    throw error;
  }
};


// 상품 생성
export const createProduct = async (
  productListDTO: ProductListDTO,
  imageFiles?: File[]
): Promise<number> => {
  const formData = new FormData();

  // JSON 데이터를 FormData에 추가
  formData.append('productListDTO', JSON.stringify(productListDTO));

  // 이미지 파일을 FormData에 추가
  if (imageFiles) {
    imageFiles.forEach((file, index) => {
      formData.append('imageFiles', file);
    });
  }

  try {
    // multipart/form-data 요청 전송
    const response = await jwtAxios.post('/admin/product/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Create Product Response:', response.data);
    return response.data; // 반환된 Product ID
  } catch (error) {
    console.error('Error Creating Product:', error);
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

  if (imageFiles) {
    imageFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });
  }

  console.log('FormData to send:', formData);

  // 1. Log formData contents
  console.log('Updating Product with FormData:');
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(`Key: ${key}, File Name: ${value.name}, Size: ${value.size}`);
    } else {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  });

  // 2. Log token and request details
  const { admin, storeowner } = useAuthStore.getState();
  const token = admin?.accessToken || storeowner?.accessToken;
  console.log("Authorization Token:", token); // 토큰 로그
  console.log(`Sending update request for product with ID: ${pno}`);

  // 디버깅용 콘솔 로그 추가
  console.log('Updating Product - pno:', pno);
  console.log('FormData:', Array.from(formData.entries()));


  try {
    const response = await jwtAxios.put(`/admin/product/update/${pno}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Update Product Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Updating Product:', error);
    if (error.response) {
      console.error('Error Response:', error.response);
      // 서버에서 전달하는 구체적인 오류 메시지 출력
    } else if (error.message) {
      console.error('Error Message:', error.message);
    }
    throw error;
  }

};

// 카테고리 관련 API

// 카테고리 목록 조회 (배열 반환)
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await jwtAxios.get('/categories');
    console.log('Categories Data:', response.data);
    return response.data; // 배열 반환
  } catch (error) {
    console.error('Error Fetching Categories:', error);
    throw error;
  }
};

// 하위 카테고리 조회 (배열 반환)
export const fetchSubCategories = async (cno: number): Promise<SubCategory[]> => {
  try {
    const response = await jwtAxios.get(`/categories/${cno}/subcategories`);
    console.log('SubCategories Data:', response.data);
    return response.data; // 배열 반환
  } catch (error) {
    console.error('Error Fetching SubCategories:', error);
    throw error;
  }
};

// 테마 관련 API

// 테마 카테고리 목록 조회 (배열 반환)
export const fetchThemeCategories = async (): Promise<ThemeCategory[]> => {
  try {
    const response = await jwtAxios.get('/admin/product/themes');
    console.log('Theme Categories Data:', response.data);
    return response.data; // 배열 반환
  } catch (error) {
    console.error('Error Fetching Theme Categories:', error);
    throw error;
  }
};
