import React, { useEffect, useState } from 'react';
import { PageRequestDTO, ProductListDTO } from '../../types/product';

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  IconButton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchProducts, fetchProductsWithFilters } from '../../api/productAPI';
import { useNavigate } from 'react-router-dom';

const ProductListComponent: React.FC = () => {
  const [products, setProducts] = useState<ProductListDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

  const [pageRequest, setPageRequest] = useState<PageRequestDTO>({ page: 1, size: 10 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const loadInitialProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      console.log('Fetched Products:', data); // 응답 데이터 확인
      setProducts(data); // 상태 설정
    } catch (err) {
      console.error('Error fetching initial products:', err);
      setError('Failed to load products.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFilteredProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchProductsWithFilters(
        searchQuery,
        minPrice,
        maxPrice,
        undefined,
        undefined,
        undefined,
        pageRequest
      );
      console.log('Filtered Products:', response.dtoList); // 필터링된 데이터 확인
      setProducts(response.dtoList || []);
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      setError('Failed to load filtered products.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialProducts();
  }, []);

  useEffect(() => {
    if (searchQuery || minPrice || maxPrice) {
      loadFilteredProducts();
    }
  }, [pageRequest]);

  const handleSearch = () => {
    setPageRequest((prev) => ({ ...prev, page: 1 }));
    loadFilteredProducts();
  };

  // moveToRead 메서드 구현
  const moveToRead = (pno: number) => {
    navigate(`/app/product/read/native/${pno}`); // productId를 기반으로 상세 페이지로 이동
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3} bgcolor="#f4f6f8" minHeight="100vh">
      <Paper elevation={3} sx={{ maxWidth: '1200px', margin: 'auto', p: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Product List
        </Typography>
        {/* 검색창 및 필터 */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TextField
            type="number"
            variant="outlined"
            placeholder="Min price"
            value={minPrice || ''}
            onChange={(e) => setMinPrice(Number(e.target.value) || undefined)}
          />
          <TextField
            type="number"
            variant="outlined"
            placeholder="Max price"
            value={maxPrice || ''}
            onChange={(e) => setMaxPrice(Number(e.target.value) || undefined)}
          />
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
        {products.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            No products found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.pno} onClick={() => moveToRead(product.pno)}>
                    <TableCell>
                      {product.attachFiles && product.attachFiles.length > 0 && product.attachFiles[0].file_name ? (
                        <img
                          src={`http://localhost:8082/api/admin/product/image/${product.attachFiles[0].file_name}`}
                          alt={product.pname}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                          }}
                        />
                      ) : (
                        <img
                          src="http://via.placeholder.com/50x50?text=No+Image"
                          alt="No image"
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                          }}
                        />
                      )}
                    </TableCell>

                    <TableCell>{product.pno}</TableCell>
                    <TableCell>{product.pname}</TableCell>
                    <TableCell>{`${product.price.toLocaleString()} 원`}</TableCell>
                    <TableCell>{product.category.cname}</TableCell>
                  </TableRow>
                ))}
              </TableBody>


            </Table>
          </TableContainer>
        )}
        {/* 페이지 네이션 버튼 */}
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            color="primary"
            disabled={pageRequest.page === 1}
            onClick={() => setPageRequest((prev) => ({ ...prev, page: prev.page - 1 }))}>
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPageRequest((prev) => ({ ...prev, page: prev.page + 1 }))}>
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductListComponent;
