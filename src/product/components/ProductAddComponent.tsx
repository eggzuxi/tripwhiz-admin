import { IProduct } from '../../types/product';
import { ChangeEvent, useRef, useState } from 'react';
import { postAdd } from '../../api/productAPI';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const initialState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  category:'',
  subcategory: '',
  themecategory: '',
  uploadFileNames: [],
  delflag: false
}

const categories = [
  { value: '수납/편의', label: '수납/편의' },
  { value: '의류', label: '의류' },
  { value: '안전/위생', label: '안전/위생' },
  { value: '악세사리', label: '악세사리' },
  { value: '액티비티 용품', label: '액티비티 용품' }
];

const subcategories = {
  '수납/편의': [
    { value: '파우치', label: '파우치' },
    { value: '케이스/커버', label: '케이스/커버' },
    { value: '안대/목베개', label: '안대/목베개' },
    { value: '와이파이 유심', label: '와이파이 유심' }
  ],
  '의류': [
    { value: '아우터', label: '아우터' },
    { value: '상의/하의', label: '상의/하의' },
    { value: '잡화', label: '잡화' }
  ],
  '안전/위생': [
    { value: '뷰티케어', label: '뷰티케어' },
    { value: '세면도구', label: '세면도구' },
    { value: '상비약', label: '상비약' }
  ],
  '악세사리': [
    { value: '전기/전자용품', label: '전기/전자용품' },
    { value: '여행 아이템', label: '여행 아이템' },
  ],
  '액티비티 용품': [
    { value: '캠핑/등산', label: '캠핑/등산' },
    { value: '수영', label: '수영' },
    { value: '야외/트래블', label: '야외/트래블' }
  ]
}

function ProductAddComponent() {

  const [product, setProduct] = useState<IProduct>({...initialState})
  const [isRegistered, setIsRegistered] = useState(false); // 상품 등록 완료 여부 상태 추가
  const filesRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  const moveToList = () => {
    navigate('/product/list')
  }

  const [category, setCategory] = useState('수납/편의');
  const [subcategory, setSubcategory] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  //입력값 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubcategory(''); // 상위 카테고리 변경 시 하위 카테고리 초기화
  };

  const handleSubcategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubcategory(e.target.value);
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(files); // 파일을 상태에 저장
    }
  };

  //상품 등록 핸들러
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() //기본 폼 제출 방지

    console.log('상품 등록:', product)

    const files = filesRef?.current?.files
    console.log(files)

    const formData: FormData = new FormData()

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i])
      }
    }
    formData.append("pname", product.pname)
    formData.append("pdesc", product.pdesc)
    formData.append("price", product.price.toLocaleString())

    // 파일입력 후 초기화
    postAdd(formData).then(data => {
      console.log(data)
      setIsRegistered(true);
      if (filesRef.current) {
        filesRef.current.value = '';
      }
    })
    moveToList(); // 상품 리스트 페이지로 이동
  }


  return (
    <>
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
              id="category"
              select
              label="카테고리"
              value={category}
              onChange={handleCategoryChange}
              helperText="상위 카테고리를 선택하세요"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="subcategory"
              select
              label="하위 카테고리"
              value={subcategory}
              onChange={handleSubcategoryChange}
              helperText="하위 카테고리를 선택하세요"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              {subcategories[category]?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ marginBottom: 2 }}>
              <input
                ref={filesRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ marginBottom: '16px' }}
              />
              {filesRef?.current?.files && (
                <div>
                  <strong>선택된 파일:</strong>
                  <ul>
                    {Array.from(filesRef.current.files).map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
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
    </>
  );
}

export default ProductAddComponent;