import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, Box, Divider, Table, TableHead, TableCell, TableBody, TableRow, TableContainer, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../../common/PageComponent';
import usePage from '../../hooks/usePage';

const StockCheckComponent = () => {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  const { pageResponse } = usePage();

  // 발주 페이지로 이동하는 함수
  const goToOrderPage = () => {
    navigate('/stock/order');
  };

  useEffect(() => {
    // API를 호출하여 재고 목록 조회
    axios.get('/api/stock')
      .then((response) => {
        setStocks(response.data); // 서버에서 받은 재고 목록 데이터
      })
      .catch((error) => {
        console.error('재고 목록을 불러오는 데 실패했습니다:', error);
      });
  }, []);

  return (
    <Card>
      {/* 카드 헤더 */}
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6"
                        style={{ fontWeight: 'bold', fontSize: '25px', color: '#003366' }}
            >재고 목록</Typography>
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
            {/* stocks 배열을 순회하며 테이블의 각 행을 생성 */}
            {stocks.length > 0 ? (
              stocks.map((stock) => {

                const formattedPrice = typeof stock.price === 'number'
                  ? stock.price.toLocaleString() // 숫자일 경우 포맷팅
                  : '가격 정보 없음'; // 아니면 '가격 정보 없음' 표시

                return (
                  <TableRow key={stock.productId}>
                    {/* 번호 */}
                    <TableCell align="center">{stock.pno}</TableCell>

                    {/* 상품 이름 */}
                    <TableCell align="left" style={{ width: '450px', paddingLeft: '180px' }}>
                      <Typography variant="body1" fontWeight="bold" noWrap>
                        {stock.pname}
                      </Typography>
                    </TableCell>

                    {/* 가격 */}
                    <TableCell align="center">
                      {formattedPrice} 원
                    </TableCell>

                    {/* 현재 수량 */}
                    <TableCell align="center">{stock.quantity}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  재고가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PageComponent pageResponse={pageResponse}  ></PageComponent>
    </Card>
  );
};

export default StockCheckComponent;
