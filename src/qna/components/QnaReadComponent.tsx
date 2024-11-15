import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneQuestion } from '../../api/qnaAPI';
import { IQuestion } from '../../types/question';


function QnaReadComponent() {
  const [qna, setQna] = useState<IQuestion | null>(null);
  const [answer, setAnswer] = useState(''); // 관리자 답변 상태
  const { qno } = useParams<{ qno: string }>(); // URL에서 qno 추출
  const navigate = useNavigate();



  // 질문 데이터를 불러오는 함수
  useEffect(() => {
    const fetchQna = () => {
      getOneQuestion(qno)
        .then((qconObj) => {
          console.log('Fetched Q&A:', qconObj);
          // @ts-ignore
          setQna(qconObj as IQuestion);
        })
        .catch((error) => {
          console.error('Q&A 데이터를 불러오는 데 실패했습니다:', error);
        });
    };

    fetchQna();
  }, [qno]);



  // 답변 입력값 변경 처리
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="100%" bgcolor="#f5f5f5" sx={{ pb: 8 }}>
      <Card sx={{ width: '95%', p: 4 }}>
        <CardContent>
          <Typography variant="h2" component="div" textAlign="center" gutterBottom>
            Admin Q&A
          </Typography>

          {qna ? (
            <Box component="form" sx={{ mt: 3 }}>
              {/* 질문 제목 및 작성자 */}
              <Typography variant="h6">질문 No.: {qna.qno}</Typography>
              <Typography variant="h6">질문 제목: {qna.title}</Typography>
              <Typography variant="body1">작성자: {qna.writer}</Typography>

              {/* 질문 내용 */}
              <Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
                {qna.qcontent}
              </Typography>

              {/* 관리자의 답변 입력란 */}
              {qna.status === '답변대기' && (
                <>
                  <Typography variant="h3" component="div" textAlign="left" gutterBottom>
                    Answer Here!
                  </Typography>
                  <TextField
                    fullWidth
                    label="관리자 답변"
                    value={answer}
                    onChange={handleAnswerChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                  />

                  <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button variant="outlined" onClick={() => navigate('/qna/list')} sx={{ mr: 1 }}>
                      취소
                    </Button>

                    {/*<Button variant="contained" color="primary" onClick={handleSubmit}>
                      답변 완료
                    </Button>*/}
                  </Box>
                </>
              )}
            </Box>
          ) : (
            <Typography variant="h6" color="textSecondary" align="center">
              데이터를 불러오는 중입니다...
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}


export default QnaReadComponent;