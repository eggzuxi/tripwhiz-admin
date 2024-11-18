import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { updateFaq, getFaqById } from '../../../../tripwhiz-admin/src/api/faqAPI';
import { IFaq } from '../../../../tripwhiz-admin/src/types/faq';

const initState: IFaq = { fno: 0, question: '', answer: '', del_flag: false, view_cnt: 0, category: 'APP'  };

function FaqModifyComponent() {
  const [faq, setFaq] = useState<IFaq>(initState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fno } = useParams<{ fno: string }>();

  const fetchFaq = useCallback((faqId: number) => {
    setLoading(true);
    getFaqById(faqId).then(setFaq).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (fno) fetchFaq(Number(fno));
    return () => setLoading(false);
  }, [fno, fetchFaq]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFaq((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleClick = () => {
    if (!faq.fno) return;
    setLoading(true);
    updateFaq(faq.fno, faq).then(() => navigate('/faq/list')).finally(() => setLoading(false));
  };

  const handleCancel = () => navigate('/faq/list');

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ width: '60%', p: 4 }}>
        <CardContent>
          <Typography variant="h2" textAlign="center" gutterBottom>
            FAQ 수정
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="질문"
              name="question"
              value={faq.question}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              disabled={loading}
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
              disabled={loading}
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
              <Button variant="contained" color="secondary" onClick={handleCancel} disabled={loading}>
                취소
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FaqModifyComponent;
