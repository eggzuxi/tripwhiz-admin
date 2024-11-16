import { ChangeEvent, useState, useRef } from 'react';
import { postAdd } from '../../api/productAPI';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { string } from 'prop-types';

const initialState = {
  pname: '',
  pdesc: '',
  price: 0,
  categoryCno: 0,
  subCategoryScno: 0,
  fileUrl: [],
  delflag: false
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
    { scno: 3, name: '안대/목베개' },
    { scno: 4, name: '와이파이 유심' }
  ],
  2: [
    { scno: 5, name: '아우터' },
    { scno: 6, name: '상의/하의' },
    { scno: 7, name: '잡화' }
  ],
  3: [
    { scno: 8, name: '뷰티케어' },
    { scno: 9, name: '세면도구' },
    { scno: 10, name: '상비약' }
  ],
  4: [
    { scno: 11, name: '전기/전자용품' },
    { scno: 12, name: '여행 아이템' }
  ],
  5: [
    { scno: 13, name: '캠핑/등산' },
    { scno: 14, name: '수영' },
    { scno: 15, name: '야외/트래블' }
  ]
};

function ProductAddComponent() {
  const [product, setProduct] = useState({ ...initialState });
  const [categoryCno, setCategoryCno] = useState(1);
  const [subCategoryScno, setSubCategoryScno] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files); // 파일 리스트 저장
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('상품 등록:', product)

    const formData = new FormData();
    formData.append('pname', product.pname);
    formData.append('pdesc', product.pdesc);
    formData.append('price', product.price.toString());
    formData.append('categoryCno', categoryCno.toString());
    formData.append('subCategoryScno', subCategoryScno.toString());

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
    }

    try {
      const response = await postAdd(formData); // postAdd를 통해 데이터 전송
      console.log('Product added successfully:', response);
      navigate('/product/list'); // 상품 리스트 페이지로 이동
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
          <Box sx={{ marginBottom: 2 }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ marginBottom: '16px' }}
            />
            {selectedFiles && (
              <Box>
                <strong>선택된 파일:</strong>
                <ul>
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
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
