import { useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { postFaq } from '../../../../tripwhiz-admin/src/api/faqAPI';
import { FaqCategory, IFaq } from '../../../../tripwhiz-admin/src/types/faq';

// 초기 상태 정의
const initState: IFaq = {
  fno:undefined,
  question: '',
  answer: '',
  del_flag: false,
  view_cnt: 0,
  category: 'APP' as FaqCategory, // 기본 카테고리 설정
};

// 카테고리 목록 정의
const categories: FaqCategory[] = ['APP', '환불', '픽업', '매장', '영수증'];

function FaqAddComponent() {
  const [faq, setFaq] = useState<IFaq>({...initState});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    faq[e.target.name] = e.target.value;
    setFaq(prevFaq => ({
      ...prevFaq,
      [e.target.name]:e.target.value
    }));
  },[]);

  const handleCategoryChange = (e: SelectChangeEvent<FaqCategory>) => {
    setFaq({ ...faq, category: e.target.value as FaqCategory });
  };

  const handleClick = () => {
    setLoading(true);
    postFaq(faq)
      .then(() => {
        setFaq(initState);
        navigate('/faq/list');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate('/faq/list');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: '60%', p: 4 }}>
        <CardContent>
          <Typography variant="h4" component="div" textAlign="center" gutterBottom>
            새로운 FAQ 추가
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>카테고리</InputLabel>
              <Select
                value={faq.category}
                onChange={handleCategoryChange}
                variant="outlined"
                label="카테고리"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="질문"
              name="question"
              value={faq.question}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="답변"
              name="answer"
              value={faq.answer}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={6}
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : '제출'}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                취소
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FaqAddComponent;
