import { Category, PageRequestDTO, ProductListDTO, ProductReadDTO, SubCategory, ThemeCategory } from '../types/product';
import jwtAxios from '../util/jwtUtil';


// 상품 관련 API
export const fetchProducts = async (
  params: PageRequestDTO
): Promise<{ dtoList: ProductListDTO[] }> => {
  console.log('Fetching Products with params:', params);
  try {
    const response = await jwtAxios.get(`/admin/product/list`, { params });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching Products:', error);
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

export const fetchProductById = async (pno: number): Promise<ProductReadDTO> => {
  console.log('Fetching Product by ID:', pno);
  try {
    const response = await jwtAxios.get(`/admin/product/read/native/${pno}`);
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
    const response = await jwtAxios.post(`/admin/product/add`, formData, {
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
    const response = await jwtAxios.put(
      `/admin/product/update/${pno}`,
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
    const response = await jwtAxios.get(`/categories`);
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
    const response = await jwtAxios.get(`/categories/${cno}/subcategories`);
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
    const response = await jwtAxios.get(`/admin/product/themes`);
    console.log('Theme Categories Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching Theme Categories:', error);
    throw error;
  }
};
