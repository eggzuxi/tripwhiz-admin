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
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card elevation={3}>
        <CardHeader
          title={product.pname}
          subheader={`Price: ${product.price.toLocaleString()}원`}
          sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                {product.pdesc}
              </Typography>
            </Grid>

            <Typography variant="subtitle1">
              <strong>Category:</strong> {product.category?.cname || 'N/A'}
            </Typography>
            <Typography variant="subtitle1">
              <strong>SubCategory:</strong> {product.subCategory?.sname || 'N/A'}
            </Typography>

            {product.tnos?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>Theme Categories:</strong>
                </Typography>
                <ul>
                  {product.tnos.map((tno) => (
                    <li key={tno}>Theme ID: {tno}</li>
                  ))}
                </ul>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6">Images</Typography>
              {product?.attachFiles?.length > 0 ? (
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  {product.attachFiles.map((file, index) => (
                    <Grid item key={index} xs={4}>
                      <Paper elevation={2} sx={{ padding: '5px', textAlign: 'center' }}>
                        <img
                          src={`http://localhost:8082/api/admin/product/image/${file.file_name}`}
                          alt={`Attachment ${index + 1}`}
                          style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
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