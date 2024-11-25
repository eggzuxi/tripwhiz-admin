import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, Box, Divider, Table, TableHead, TableCell, TableBody, TableRow, TableContainer, Typography, Button, Pagination, PaginationItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';


// Stock 데이터 타입 정의
interface Stock {
  productId: string;
  pno: number;
  pname: string;
  price: number | null;
  quantity: number;
}


// Pagination 스타일 정의
const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '8px', // 테두리를 둥근 네모로 설정
    border: `1px solid ${theme.palette.primary.main}`, // 테두리 색
    color: theme.palette.primary.main, // 기본 텍스트 색
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main, // 선택된 페이지의 배경색
    color: '#ffffff', // 선택된 페이지의 텍스트 색
  },
  '& .MuiPaginationItem-ellipsis': {
    border: 'none', // 생략 기호(...)의 테두리 제거
  },
}));

const StockCheckComponent = () => {
  const [stocks, setStocks] = useState<Stock[]>([]); // Stock 타입 배열
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [rowsPerPage] = useState<number>(10); // 페이지당 행 개수
  const navigate = useNavigate();

  // 발주 페이지로 이동하는 함수
  const goToOrderPage = () => {
    navigate('/stock/order');
  };

  useEffect(() => {
    // API를 호출하여 재고 목록 조회
    axios
      .get(`/api/stock`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setStocks(response.data); // 서버에서 받은 재고 목록 데이터
        } else {
          console.error('API 응답이 배열 형태가 아닙니다:', response.data);
        }
      })
      .catch((error) => {
        console.error('재고 목록을 불러오는 데 실패했습니다:', error);
      });
  }, []);

  // 페이지 수 계산
  const totalPages = Math.ceil(stocks.length / rowsPerPage);

  // 현재 페이지에 표시할 데이터 계산
  const currentData = stocks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      {/* 카드 헤더 */}
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              style={{ fontWeight: 'bold', fontSize: '25px', color: '#003366' }}
            >
              재고 목록
            </Typography>
            <Button variant="contained" color="primary" onClick={goToOrderPage}>
              발주하기
            </Button>
          </Box>
        }
      />

      {/* 카드와 테이블의 구분선 */}
      <Divider />

      {/* 테이블을 담는 컨테이너 */}
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: '#FCFBF0' }}>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">상품 이름</TableCell>
              <TableCell align="center">가격</TableCell>
              <TableCell align="center">현재 수량</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* currentData 배열을 순회하며 테이블의 각 행을 생성 */}
            {currentData.length > 0 ? (
              currentData.map((stock, index) => {
                // 가격 포맷팅
                const formattedPrice =
                  typeof stock.price === 'number'
                    ? stock.price.toLocaleString() // 숫자일 경우 포맷팅
                    : '가격 정보 없음'; // 아니면 '가격 정보 없음' 표시

                return (
                  <TableRow key={stock.productId || `stock-${index}`}>
                    {/* 번호 */}
                    <TableCell align="center">{stock.pno}</TableCell>

                    {/* 상품 이름 */}
                    <TableCell
                      align="left"
                      style={{ width: '450px', paddingLeft: '180px' }}
                    >
                      <Typography variant="body1" fontWeight="bold" noWrap>
                        {stock.pname}
                      </Typography>
                    </TableCell>

                    {/* 가격 */}
                    <TableCell align="center">{formattedPrice} 원</TableCell>

                    {/* 현재 수량 */}
                    <TableCell align="center">{stock.quantity}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  style={{ padding: '20px 0', fontStyle: 'italic' }}
                >
                  재고가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="16px"
      >
        <StyledPagination
          count={totalPages} // 총 페이지 수
          page={currentPage} // 현재 선택된 페이지
          onChange={(event, value) => handlePageChange(value)} // 페이지 변경 핸들러
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              // PREV/NEXT로 텍스트 변경
              components={{
                previous: () => <Typography>PREV</Typography>,
                next: () => <Typography>NEXT</Typography>,
              }}
            />
          )}
        />
      </Box>
    </Card>
  );
};


export default StockCheckComponent;