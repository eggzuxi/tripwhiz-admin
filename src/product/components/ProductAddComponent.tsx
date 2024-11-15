import { ChangeEvent, useState } from 'react';
import { postAdd } from '../../api/productAPI';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const initialState = {
  pname: '',
  pdesc: '',
  price: 0,
  categoryCno: 0,
  subCategoryScno: 0,
};

const categories = [
  { cno: 1, name: '수납/편의' },
  { cno: 2, name: '의류' },
  { cno: 3, name: '안전/위생' },
  { cno: 4, name: '악세사리' },
  { cno: 5, name: '액티비티 용품' },
];

const subcategories = {
  1: [
    { scno: 1, name: '파우치' },
    { scno: 2, name: '케이스/커버' },
  ],
  2: [
    { scno: 3, name: '아우터' },
    { scno: 4, name: '상의/하의' },
  ],
};

function ProductAddComponent() {
  const [product, setProduct] = useState({ ...initialState });
  const [categoryCno, setCategoryCno] = useState(1);
  const [subCategoryScno, setSubCategoryScno] = useState(0);
  const navigate = useNavigate();

  // const moveToList = () => {
  //   navigate('/product/list');
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCategoryCno = parseInt(e.target.value, 10);
    setCategoryCno(selectedCategoryCno);
    setSubCategoryScno(0); // 상위 카테고리 변경 시 하위 카테고리 초기화
  };

  const handleSubCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubCategoryScno(parseInt(e.target.value, 10));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const productData = {
      ...product,
      categoryCno,
      subCategoryScno,
    };

    try {
      const response = await postAdd(productData);
      console.log('Product added successfully:', response);
      // moveToList();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <Card>
          <CardHeader title="상품 등록 화면" />
          <Divider />
          <CardContent>
            <TextField
                id="pname"
                label="상품명"
                value={product.pname}
                name="pname"
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                id="price"
                label="가격"
                type="number"
                value={product.price}
                name="price"
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                id="pdesc"
                label="상품 설명"
                value={product.pdesc}
                name="pdesc"
                onChange={handleChange}
                fullWidth
                multiline
                minRows={4}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                id="categoryCno"
                select
                label="상위 카테고리"
                value={categoryCno}
                onChange={handleCategoryChange}
                helperText="상위 카테고리를 선택하세요"
                fullWidth
                sx={{ marginBottom: 2 }}
            >
              {categories.map((category) => (
                  <MenuItem key={category.cno} value={category.cno}>
                    {category.name}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
                id="subCategoryScno"
                select
                label="하위 카테고리"
                value={subCategoryScno}
                onChange={handleSubCategoryChange}
                helperText="하위 카테고리를 선택하세요"
                fullWidth
                sx={{ marginBottom: 2 }}
            >
              {subcategories[categoryCno]?.map((subcategory) => (
                  <MenuItem key={subcategory.scno} value={subcategory.scno}>
                    {subcategory.name}
                  </MenuItem>
              ))}
            </TextField>
            <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                onClick={handleClick}
            >
              상품 등록
            </Button>
          </CardContent>
        </Card>
      </Grid>
  );
}

export default ProductAddComponent;
