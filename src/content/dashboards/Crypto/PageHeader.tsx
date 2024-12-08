import { useEffect, useState } from 'react';
import { Typography, Avatar, Grid, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh'; // 리프레시 아이콘

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const theme = useTheme();

  // Access Token 초기 만료 시간 (60분)
  const initialRemainingTime = 60 * 60; // 60분 * 60초
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 남은 시간을 '분:초' 형식으로 변환
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // 리프레시 버튼 클릭 핸들러
  const handleRefresh = () => {
    alert('Token has been refreshed!');
    setRemainingTime(initialRemainingTime); // 리프레시 후 남은 시간 초기화
  };

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                mr: 2,
                width: theme.spacing(8),
                height: theme.spacing(8)
              }}
              variant="rounded"
              alt={user.name}
              src={user.avatar}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Welcome, {user.name}!
            </Typography>
            <Typography variant="subtitle2">
              Today is a good day to start trading crypto assets!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* 토큰 남은 시간 및 리프레시 버튼 */}
      <Grid item>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={{
              marginRight: theme.spacing(2),
              fontWeight: 'bold',
              color: theme.palette.text.secondary
            }}
          >
            Token Expires In: {formatTime(remainingTime)}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderColor: theme.palette.primary.dark
              }
            }}
          >
            Refresh
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
