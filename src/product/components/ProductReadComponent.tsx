import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct, getOne, getCategories, getSubCategories } from '../../api/productAPI';
import axios from 'axios';

const ProductReadComponent = () => {
  const { pno } = useParams<{ pno: string }>(); // 상품 번호 추출
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);  // 상품 데이터 저장
  const [updatedProduct, setUpdatedProduct] = useState<any>(null);  // 수정된 상품 데이터 저장
  const [isEditing, setIsEditing] = useState(false);  // 수정 모드 활성화 여부

  const [categories, setCategories] = useState<any[]>([]);  // 상위 카테고리 목록
  const [subCategories, setSubCategories] = useState<any[]>([]);  // 하위 카테고리 목록
  const [themeCategories, setThemeCategories] = useState<any[]>([]);  // 테마 카테고리 목록

  useEffect(() => {
    // 상품 데이터 가져오기
    const fetchProduct = async () => {
      try {
        const response = await getOne(Number(pno));
        setProduct(response);
        setUpdatedProduct(response);  // 수정된 상품 정보 초기화
      } catch (error) {
        console.error('상품 정보를 불러오는 데 실패했습니다:', error);
      }
    };
    fetchProduct();
  }, [pno]);

  useEffect(() => {
    // 카테고리 및 테마 카테고리 데이터 가져오기
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('카테고리 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    // 테마 카테고리 데이터 가져오기
    const fetchThemeCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product/list/theme', {
          params: {
            themeCategory: 'themeCategory',  // 실제 테마 카테고리 값으로 바꿔주세요
            page: 1,                        // PageRequestDTO의 page 파라미터 (필요 시)
            size: 10                        // PageRequestDTO의 size 파라미터 (필요 시)
          }
        });
        setThemeCategories(response.data);  // 응답 데이터로 상태 업데이트
      } catch (error) {
        console.error('테마 카테고리 데이터를 가져오는 데 실패했습니다:', error);
      }
    };


    fetchCategories();
    fetchThemeCategories();
  }, []);

  const handleCategoryChange = async (event: SelectChangeEvent<unknown>) => {
    const categoryId = event.target.value as number;
    setUpdatedProduct((prev: any) => ({
      ...prev,
      category: categoryId,
    }));

    // 하위 카테고리 업데이트
    const subCategoryData = await getSubCategories(categoryId);
    setSubCategories(subCategoryData);
  };

  const handleThemeCategoryChange = (event: SelectChangeEvent<any>) => {
    const selectedValue = event.target.value;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      themecategory: selectedValue,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(updatedProduct);
      setIsEditing(false);
      setProduct(updatedProduct);
    } catch (error) {
      console.error('상품 수정에 실패했습니다:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(Number(pno));
      navigate('/admin/product/list');
    } catch (error) {
      console.error('상품 삭제에 실패했습니다:', error);
    }
  };

  if (!product) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="100%" bgcolor="#f5f5f5" sx={{ pb: 8 }}>
      <Card sx={{ width: '80%', p: 4 }}>
        <CardContent>
          <Typography variant="h3" component="div" textAlign="center" gutterBottom>
            {product.pname}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {product.pdesc}
          </Typography>
          <Typography variant="body1" gutterBottom>
            가격: {product.price} 원
          </Typography>

          {/* 상품 수정 폼 */}
          {isEditing ? (
            <Box>
              <TextField
                fullWidth
                label="상품 이름"
                name="pname"
                value={updatedProduct.pname}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="상품 설명"
                name="pdesc"
                value={updatedProduct.pdesc}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="상품 가격"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>상위 카테고리</InputLabel>
                <Select
                  value={updatedProduct.category || ''}
                  onChange={handleCategoryChange}
                  label="상위 카테고리"
                  name="category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.cno} value={category.cno}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>하위 카테고리</InputLabel>
                <Select
                  value={updatedProduct.subcategory || ''}
                  onChange={handleChange}
                  label="하위 카테고리"
                  name="subcategory"
                >
                  {subCategories.map((subCategory) => (
                    <MenuItem key={subCategory.scno} value={subCategory.scno}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>테마 카테고리</InputLabel>
                <Select
                  value={updatedProduct.themecategory}
                  onChange={handleThemeCategoryChange}
                  label="테마 카테고리"
                >
                  {themeCategories.map((themeCategory) => (
                    <MenuItem key={themeCategory.id} value={themeCategory.id}>
                      {themeCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                수정 완료
              </Button>
            </Box>
          ) : (
            <Box>
              {product.fileUrl && (
                <img src={product.fileUrl} alt={product.pname} style={{ maxWidth: '100%', marginBottom: '16px' }} />
              )}
              <Typography variant="body2" color="textSecondary" gutterBottom>
                상위 카테고리 ID: {product.categoryCno}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                하위 카테고리 ID: {product.subCategoryScno}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                테마 카테고리: {product.themeCategory}
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
                수정
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mt: 2, ml: 2 }}>
                삭제
              </Button>
            </Box>
          )}

          <Button variant="contained" color="secondary" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
            목록으로 돌아가기
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductReadComponent;
