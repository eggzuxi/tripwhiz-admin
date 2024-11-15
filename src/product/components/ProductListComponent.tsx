import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate를 import
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
  imageUrl: string; // 이미지 URL
}

const ProductListComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate를 사용하여 페이지 이동

  const fetchProducts = async () => {
    setLoading(true);
    const productList = await getList(page); // API 호출
    if (productList) {
      setProducts(prevProducts => [...prevProducts, ...productList]); // 제품 목록 업데이트
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1); // 페이지 증가
  };

  const handleViewDetails = (pno: number) => {
    navigate(`/product/read/${pno}`);  // /product/read/:pno로 이동
  };

  const handleAddProduct = () => {
    navigate('/product/add');  // /product/add로 이동
  };

  return (
    <Box className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen pl-40 mt-10"> {/* 왼쪽 여백을 충분히 넓힘 */}

      {/* "상품 추가" 버튼 */}
      <Box mb={4} textAlign="right">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddProduct}  // 상품 추가 페이지로 이동
        >
          상품 추가
        </Button>
      </Box>

      {/* 카드 리스트 (Grid를 사용하여 카드 레이아웃 구성) */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.pno}>
            <Card className="shadow-md rounded-lg">
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.pname}
                className="object-cover"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="textPrimary">
                  {product.pname}
                </Typography>
                <Typography variant="body1" color="textSecondary" className="mt-2">
                  가격: ₩{product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4 w-full"
                  onClick={() => handleViewDetails(product.pno)} // 버튼 클릭 시 상품 상세 페이지로 이동
                >
                  자세히 보기
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListComponent;
