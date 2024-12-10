import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLuggageMoveDetails, updateLuggageMoveStatus } from '../../api/luggagemoveAPI';
import useAuthStore from '../../AuthState';
import { LuggageMove } from '../../types/luggagemove';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';

const LuggageMoveDetail: React.FC = () => {
  const { lmno } = useParams<{ lmno: string }>();
  const [luggageMove, setLuggageMove] = useState<LuggageMove | null>(null);
  const { storeowner } = useAuthStore();

  const fetchLuggageMoveDetail = async () => {
    if (!lmno) return;

    try {
      const data = await getLuggageMoveDetails(Number(lmno));
      setLuggageMove(data);
    } catch (error) {
      console.error(error);
      alert('상세 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!lmno) return;

    try {
      await updateLuggageMoveStatus(Number(lmno), status);
      alert(`상태가 ${status}로 업데이트되었습니다.`);
      fetchLuggageMoveDetail();
    } catch (error) {
      console.error(error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (storeowner?.accessToken) {
      fetchLuggageMoveDetail();
    } else {
      alert('점주로 로그인되어 있지 않습니다.');
    }
  }, [storeowner?.accessToken]);

  if (!luggageMove) {
    return <p className="text-center text-gray-500 text-lg animate-pulse">로딩 중...</p>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f5f7">
      <Card
        sx={{
          width: '100%',
          maxWidth: '800px',
          p: 4,
          boxShadow: 4,
          background: '#ffffff',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" textAlign="center" fontWeight="bold" gutterBottom>
            수화물 이동 상세보기
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box mt={3} mb={3}>
            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
              <strong>출발:</strong> {luggageMove.sourceSpotName}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
              <strong>도착:</strong> {luggageMove.destinationSpotName}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
              <strong>상태:</strong> {luggageMove.status}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              <strong>요청 날짜:</strong> {luggageMove.moveDate}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              <strong>출발 날짜:</strong> {luggageMove.startDate}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              <strong>도착 날짜:</strong> {luggageMove.endDate}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-around" mt={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#e0f7fa',
                color: '#006064',
                px: 3,
                py: 1,
                fontWeight: 'bold',
                width: '130px',
                height: '50px',
                '&:hover': {
                  backgroundColor: '#b2ebf2',
                },
              }}
              onClick={() => handleStatusChange('APPROVED')}
            >
              승인
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#bbdefb',
                color: '#0d47a1',
                px: 3,
                py: 1,
                fontWeight: 'bold',
                width: '130px',
                height: '50px',
                '&:hover': {
                  backgroundColor: '#90caf9',
                },
              }}
              onClick={() => handleStatusChange('IN_TRANSIT')}
            >
              이동 중
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ffcdd2',
                color: '#b71c1c',
                px: 3,
                py: 1,
                fontWeight: 'bold',
                width: '130px',
                height: '50px',
                '&:hover': {
                  backgroundColor: '#ef9a9a',
                },
              }}
              onClick={() => handleStatusChange('DELIVERED')}
            >
              도착 완료
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LuggageMoveDetail;
