import React, { useEffect, useState } from 'react';
import { getAllLuggageMoves } from '../../api/luggagemoveAPI';
import useAuthStore from '../../AuthState';
import { LuggageMove } from '../../types/luggagemove';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';

const LuggageMoveList: React.FC = () => {
  const [luggageMoves, setLuggageMoves] = useState<LuggageMove[]>([]);
  const { storeowner } = useAuthStore();
  const navigate = useNavigate();

  // 권한 및 토큰 확인 로그
  console.log('Current storeowner state:', storeowner);
  console.log('------------------------------------------');
  console.log('Access Token:', storeowner?.accessToken);

  const fetchLuggageMoves = async () => {
    try {
      const data = await getAllLuggageMoves();
      setLuggageMoves(data);
    } catch (error) {
      console.error('수화물 이동 목록 오류:', error);
      alert('수화물 이동 목록을 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (storeowner?.accessToken) {
      fetchLuggageMoves();
    } else {
      alert('점주로 로그인되어 있지 않습니다.');
    }
  }, [storeowner?.accessToken]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Card
        sx={{
          width: '80%',
          maxWidth: '800px',
          p: 4,
          boxShadow: 3,
          background: '#ffffff',
          borderRadius: 2, // 약간 둥근 모서리
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div" textAlign="center" gutterBottom>
            수화물 이동 목록
          </Typography>
          <List>
            {luggageMoves.map((move) => (
              <ListItem
                key={move.lmno}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  mb: 2,
                  p: 2,
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      출발: {move.sourceSpotName} ➔ 도착: {move.destinationSpotName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      상태: {move.status}
                    </Typography>
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/luggagemove/${move.lmno}`)}
                  sx={{
                    ml: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 'bold',
                    textTransform: 'none', // 버튼 텍스트 소문자 유지
                  }}
                >
                  상세보기
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LuggageMoveList;
