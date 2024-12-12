import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl, SelectChangeEvent
} from '@mui/material';
import {
  Category,
  ProductListDTO,
  SubCategory,
  ThemeCategory,
  AttachFile,
} from '../../types/product';
import {
  createProduct,
  fetchCategories,
  fetchSubCategories,
  fetchThemeCategories,
} from '../../api/productAPI';

const AddComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [themeCategories, setThemeCategories] = useState<ThemeCategory[]>([]);
  const [product, setProduct] = useState<ProductListDTO>({
    pno: 0,
    pname: '',
    price: 0,
    pdesc: '',
    category: { cno: 0, cname: '' },
    subCategory: { scno: 0, sname: '' },
    tnos: [],
    attachFiles: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch {
        setError('카테고리를 불러오는데 실패했습니다.');
      }
    };

    const loadThemeCategories = async () => {
      try {
        const themeData = await fetchThemeCategories();
        setThemeCategories(themeData);
      } catch {
        setError('테마 카테고리를 불러오는데 실패했습니다.');
      }
    };

    loadCategories();
    loadThemeCategories();
  }, []);

  const handleCategoryChange = async (event: SelectChangeEvent) => {
    const selectedCategoryId = event.target.value; // 선택된 카테고리의 ID를 먼저 추출

    const selectedCategory = categories.find((category) => category.cno === Number(selectedCategoryId));

    setProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedCategory || { cno: 0, cname: '' },
      subCategory: { scno: 0, sname: '' },
    }));
    setSubCategories([]);

    if (selectedCategory) {
      try {
        const subCategoryData = await fetchSubCategories(selectedCategory.cno);
        setSubCategories(subCategoryData);
      } catch {
        setError('서브카테고리를 불러오는데 실패했습니다.');
      }
    }
  };

  const handleSubCategoryChange = (event: SelectChangeEvent) => {
    // Access selected value directly
    const selectedSubCategoryId = event.target.value;

    const selectedSubCategory = subCategories.find((subCategory) => subCategory.scno === Number(selectedSubCategoryId));
    setProduct((prevProduct) => ({
      ...prevProduct,
      subCategory: selectedSubCategory || { scno: 0, sname: '' },
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
    }
  };

  const handleThemeChange = (event: SelectChangeEvent<number[]>): void => {
    // 선택된 값들을 직접 접근
    const selectedThemeNos = event.target.value as number[];

    // product 상태 업데이트
    setProduct((prevProduct) => ({
      ...prevProduct,
      tnos: selectedThemeNos,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedProduct = {
      ...product,
      cno: product.category.cno,
      scno: product.subCategory.scno,
      category: undefined,
      subCategory: undefined,
    };

    try {
      const response = await createProduct(formattedProduct, imageFiles);
      alert(`상품이 성공적으로 생성되었습니다! ID: ${response}`);
    } catch {
      setError('상품 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardHeader title="상품 추가" sx={{ textAlign: 'center' }} />
        <CardContent>
          {error && <Typography color="error" variant="body1">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="상품명"
                  name="pname"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="가격"
                  name="price"
                  type="number"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="설명"
                  name="pdesc"
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>카테고리</InputLabel>
                  <Select
                    value={product.category?.cno || ''}
                    onChange={handleCategoryChange}
                    label="카테고리"
                  >
                    <MenuItem value="">카테고리를 선택하세요</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.cno} value={category.cno}>
                        {category.cname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth disabled={!subCategories.length}>
                  <InputLabel>서브카테고리</InputLabel>
                  <Select
                    value={product.subCategory?.scno || ''}
                    onChange={handleSubCategoryChange}
                    label="서브카테고리"
                  >
                    <MenuItem value="">서브카테고리를 선택하세요</MenuItem>
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory.scno} value={subCategory.scno}>
                        {subCategory.sname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>테마 카테고리</InputLabel>
                  <Select
                    multiple
                    value={product.tnos}
                    onChange={handleThemeChange}
                    label="테마 카테고리"
                  >
                    {themeCategories.map((theme) => (
                      <MenuItem key={theme.tno} value={theme.tno}>
                        {theme.tname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  이미지 업로드
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  상품 추가
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddComponent;
