import axios from "axios";

// const host ='http://10.10.10.225:8080/api/product';
const host ='http://localhost:8082/api/product';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
  }
}

export const getList = async (page: number) => {

  try {
    const res = await axios.get(`${host}/list?page=${page}`);
    console.log('API Response for getList:', res.data); // 전체 응답을 콘솔에 출력
    console.log('DTO List:', res.data.dtoList); // dtoList 부분만 콘솔에 출력
    return res.data.dtoList;
  } catch (error) {
    console.error('Error fetching product list:', error);
  }

};

export const getOne = async (pno: number) => {

  const res = await axios.get(`${host}/read/${pno}`)

  return res.data

}

// 상품 수정 API
export const updateProduct = async (product: any) => {
  const res = await axios.put(`${host}/update`, product);
  return res.data;
};

// 상품 삭제 API
export const deleteProduct = async (pno: number) => {
  const res = await axios.delete(`${host}/delete/${pno}`);
  return res.data;
};

export const postAdd = async (productData: FormData) => {
  try {
    const res = await axios.post(`${host}/add`, productData); // 헤더 생략
    console.log('API Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
};

// export const postAdd = async (productData: any) => {
//   try {
//     const res = await axios.post(`${host}/add`, productData, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     console.log('API Response:', res.data);
//     return res.data;
//   } catch (error) {
//     console.error('Failed to add product:', error);
//     throw error;
//   }
// };

// api/categoryAPI.ts
export const getCategories = async () => {
  try {
    const response = await fetch('/api/categories'); // 카테고리 API 엔드포인트
    const data = await response.json();
    console.log('API Response for getCategories:', data);
    return data;
  } catch (error) {
    console.error('상위 카테고리 로드 실패', error);
  }
};

export const getSubCategories = async (categoryId: number) => {
  try {
    const response = await fetch(`/api/subcategories/${categoryId}`); // 하위 카테고리 API 엔드포인트
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('하위 카테고리 로드 실패', error);
  }
};
