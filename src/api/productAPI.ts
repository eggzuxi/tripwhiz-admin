import axios from "axios";

const host ='http://10.10.10.225:8080/api/product';
// const host ='http://localhost:8080/api/product';


// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }

export const getList = async (page:number) => {

  const res = await axios.get(`${host}/list?page=${page}`)

  console.log(res.data)

  return res.data.dtoList

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
