import React, { useState, useEffect } from 'react';
import { getCategories, getOne, getSubCategories } from '../../api/productAPI';  // API 불러오기
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
  SelectChangeEvent
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct } from '../../api/productAPI';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';  // 수정, 삭제 API

const ProductReadComponent = () => {
  const { pno } = useParams<{ pno: string }>();  // URL에서 상품 번호 추출
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);  // 상품 데이터 저장
  const [updatedProduct, setUpdatedProduct] = useState<any>(null);  // 수정된 상품 데이터 저장
  const [isEditing, setIsEditing] = useState(false);  // 수정 모드 활성화 여부

  const [categories, setCategories] = useState<any[]>([]);  // 상위 카테고리 목록
  const [subCategories, setSubCategories] = useState<any[]>([]);  // 하위 카테고리 목록
  const [themeCategories, setThemeCategories] = useState<any[]>([]);  // 테마 카테고리 목록


  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        // 상품 상세 정보 불러오기
        const productData = await getOne(Number(pno));
        setProduct(productData);

        // 상위 카테고리 목록 불러오기
        const categoryData = await getCategories();
        setCategories(categoryData);

        // 테마 카테고리 목록 불러오기
        const themeCategoryData = await getThemeCategories();
        setThemeCategories(themeCategoryData);
      } catch (error) {
        console.error('상품 정보를 불러오는 데 실패했습니다:', error);

      }
    };

    if (pno) {
      fetchProductAndCategories();
    }
  }, [pno]);


  const getThemeCategories = async () => {
    try {
      const response = await axios.get('/api/theme-categories');  // 백엔드 API 엔드포인트
      return response.data;
    } catch (error) {
      console.error('테마 카테고리 데이터를 가져오는 데 실패했습니다:', error);
      return [];
    }
  };

  const handleCategoryChange = async (event: SelectChangeEvent<unknown>) => {
    const categoryId = event.target.value as number;
    setUpdatedProduct((prev: any) => ({
      ...prev,
      category: categoryId
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

  // 상품 정보 수정 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  // 상품 수정 처리 함수
  const handleUpdate = async () => {
    try {
      await updateProduct(updatedProduct);  // 수정된 상품 정보를 API로 전송
      setIsEditing(false);  // 수정 모드 종료
      setProduct(updatedProduct);  // 수정된 데이터로 상품 정보 갱신
    } catch (error) {
      
      console.error("상품 수정에 실패했습니다:", error);

    }
  };

  // 상품 삭제 처리 함수
  const handleDelete = async () => {
    try {
      await deleteProduct(Number(pno));  // 상품 삭제 요청
      navigate('/admin/product/list');  // 삭제 후 상품 목록 페이지로 이동
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

              {/* 테마 카테고리 드롭다운 */}
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

          {/*<Button variant="contained" color="secondary" onClick={() => navigate('/admin/product/list')} sx={{ mt: 2 }}>*/}
          {/*  목록으로 돌아가기*/}
          {/*</Button>*/}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductReadComponent;
