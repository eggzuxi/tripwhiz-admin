import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export interface IPageResponse {
  content: any[];
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

const initialState: IPageResponse = {
  content: [],
  first: false,
  last: false,
  number: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0
}

// 페이지네이션 훅
const usePage = () => {
  const [query] = useSearchParams(); // URL에서 쿼리 파라미터 읽기
  const page: number = Number(query.get("page")) || 1; // 페이지 번호
  const size: number = Number(query.get("size")) || 10; // 페이지 크기
  const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);


  useEffect(() => {
    // 서버에서 재고 목록 가져오기
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stock?page=${page}&size=${size}`);
        const data = await response.json();
        setPageResponse(data);
      } catch (error) {
        console.error('재고 목록을 불러오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, [page, size]); // 페이지나 페이지 크기가 변경될 때마다 다시 호출

  return { pageResponse };
};


export default usePage