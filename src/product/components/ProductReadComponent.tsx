import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductReadDTO } from '../../types/product';
import { fetchProductById } from '../../api/productAPI';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material';

const ProductReadComponent: React.FC = () => {
  const { pno } = useParams<{ pno: string }>();
  const [product, setProduct] = useState<ProductReadDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      if (!pno) {
        setError('상품 번호(pno)가 없습니다.');
        return;
      }

      try {
        const productData = await fetchProductById(Number(pno));
        if (isMounted) {
          setProduct(productData);
        }
      } catch (error) {
        if (isMounted) {
          setError('상품 정보를 불러오는 데 실패했습니다.');
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [pno]);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Card elevation={4} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="bold">
              {product.pname}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle1" color="textSecondary">
              Price: {product.price.toLocaleString()} 원
            </Typography>
          }
          sx={{
            textAlign: 'center',
            backgroundColor: '#f0f4f8',
            padding: '16px',
            borderBottom: '1px solid #ddd',
          }}
        />
        <CardContent sx={{ padding: '24px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ marginBottom: 2, color: '#555' }}>
                {product.pdesc || 'No description available for this product.'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Category:</strong> {product.category?.cname || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>SubCategory:</strong> {product.subCategory?.sname || 'N/A'}
              </Typography>
            </Grid>

            {product.tnos?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Theme Categories:
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {product.tnos.map((tno) => (
                    <li key={tno} style={{ color: '#666' }}>
                      Theme ID: {tno}
                    </li>
                  ))}
                </ul>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider sx={{ marginY: 3 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Images
              </Typography>
              {product?.attachFiles?.length > 0 ? (
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  {product.attachFiles.map((file, index) => (
                    <Grid item key={index} xs={4}>
                      <Paper
                        elevation={3}
                        sx={{
                          padding: '8px',
                          textAlign: 'center',
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa',
                        }}
                      >
                        <img
                          src={`https://tripwhiz.store/api/admin/product/image/${file.file_name}`}
                          alt={`Attachment ${index + 1}`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No images available.
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductReadComponent;
