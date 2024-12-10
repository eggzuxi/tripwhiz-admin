import React, { useEffect, useState } from 'react';
import { PageRequestDTO, ProductListDTO } from '../../types/product';
import { fetchProductsWithFilters } from '../../api/productAPI';
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

const ProductListComponent: React.FC = () => {
  const [products, setProducts] = useState<ProductListDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 페이징과 검색 조건 상태
  const [pageRequest, setPageRequest] = useState<PageRequestDTO>({ page: 1, size: 10 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchProductsWithFilters(
        searchQuery,
        minPrice,
        maxPrice,
        undefined, // tno
        undefined, // cno
        undefined, // scno
        pageRequest
      );
      console.log('API Response:', response);
      setProducts(response.dtoList || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [pageRequest]);

  const handleSearch = () => {
    setPageRequest((prev) => ({ ...prev, page: 1 })); // 검색 시 첫 페이지로 초기화
    loadProducts();
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
                  <TableCell>Product ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.pno}>
                    <TableCell>{product.pno}</TableCell>
                    <TableCell>{product.pname}</TableCell>
                    <TableCell>{`${product.price.toLocaleString()} 원`}</TableCell>
                    <TableCell>{product.category || 'N/A'}</TableCell>
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
            onClick={() => setPageRequest((prev) => ({ ...prev, page: prev.page - 1 }))}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPageRequest((prev) => ({ ...prev, page: prev.page + 1 }))}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductListComponent;
