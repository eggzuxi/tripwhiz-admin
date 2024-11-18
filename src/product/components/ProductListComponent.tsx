import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getList } from '../../api/productAPI';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Button
} from '@mui/material';

interface Product {
  pno: number;
  pname: string;
  price: number;
  fileUrl: string;  // 제품 이미지 URL
}

const ProductListComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 상품 목록을 가져오는 함수
  const fetchProducts = async () => {
    setLoading(true);
    const productList = await getList(page);
    if (productList) {
      setProducts(prevProducts => [...prevProducts, ...productList]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // 더보기 버튼 클릭 시 페이지 증가
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // 상품 상세 페이지로 이동
  const handleViewDetails = (pno: number) => {
    navigate(`/product/read/${pno}`);
  };

  // 상품 추가 페이지로 이동
  const handleAddProduct = () => {
    navigate('/product/add');
  };

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        p: 8,
        bgcolor: 'grey.50',
        minHeight: '100vh',
        ml: 10
      }}
    >
      <Box mb={4} textAlign="right">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddProduct}
        >
          상품 추가
        </Button>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.pno}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              {/* 이미지 URL을 http://localhost:8080/로 시작하는 웹 경로로 설정 */}
              <CardMedia
                component="img"
                height="500"  // 이미지 크기 설정
                image={`http://localhost:8080/${product.fileUrl}`}  // 이미지 URL 설정
                alt={product.pname}
                sx={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = 'http://localhost:8080/m1.jpg'; // 대체 이미지
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="textPrimary">
                  {product.pname}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                  가격: ₩{product.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: '#A5D6A7', // 연한 청록색 배경
                    color: 'white', // 흰색 텍스트
                    '&:hover': {
                      bgcolor: '#81C784', // 호버 시 더 진한 색
                    }
                  }}
                  onClick={() => handleViewDetails(product.pno)}
                >
                  자세히 보기
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 더보기 버튼 */}
      <Box mt={4} textAlign="center">
        {loading ? (
          <Button disabled>로딩 중...</Button>
        ) : (
          <Button variant="outlined" onClick={loadMore}>
            더보기
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductListComponent;
