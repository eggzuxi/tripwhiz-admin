import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { OrderReadDTO } from "../../types/order";
import { fetchOrderDetails } from '../../api/orderAPI';

// 초기 상태
const initialState: OrderReadDTO = {
  ono: 0,
  products: [], // OrderItemDTO 형태로 초기화
};

function OrderReadComponent() {
  const { ono } = useParams<{ ono: string }>(); // URL에서 주문 번호 가져오기
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderReadDTO>(initialState); // 초기 상태 사용

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (ono) {
          const response = await fetchOrderDetails(Number(ono));
          setOrderDetails(response);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderData();
  }, [ono]);

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" marginBottom={3} textAlign="center">
        주문 상세 정보
      </Typography>

      {orderDetails ? (
        <Card sx={{ padding: 2, marginBottom: 3 }}>
          <CardContent>
            {/* 주문 기본 정보 */}
            <Typography variant="h6" gutterBottom>
              주문 번호: {orderDetails.ono}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" textAlign="center">
          주문 정보를 불러오는 중입니다...
        </Typography>
      )}

      <Divider sx={{ marginY: 3 }} />

      <Typography variant="h6" marginBottom={2}>
        주문 상품 목록
      </Typography>

      {orderDetails.products.length > 0 ? (
        <Grid container spacing={3}>
          {orderDetails.products.map((products, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  상품 이름: {products.pname || "N/A"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  수량: {products.amount}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  상품 가격: {products.price?.toLocaleString()}원
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary" textAlign="center">
          주문 상품이 없습니다.
        </Typography>
      )}

      <Divider sx={{ marginY: 3 }} />

      <Box display="flex" justifyContent="center" gap={2} marginTop={3}>
        <Button variant="contained" color="primary" onClick={goBack}>
          뒤로가기
        </Button>
      </Box>
    </Box>
  );
}

export default OrderReadComponent;
