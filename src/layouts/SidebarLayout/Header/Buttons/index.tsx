import { Box, Button, Typography } from "@mui/material";
import HeaderSearch from "./Search";
import HeaderNotifications from "./Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const initialRemainingTime = 60 * 60; // 60분 * 60초

function HeaderButtons() {
  const theme = useTheme();
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);

  // 타이머로 남은 시간 업데이트
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // 리프레시 버튼 클릭 핸들러
  const handleRefresh = () => {
    alert("Token has been refreshed!");
    setRemainingTime(initialRemainingTime); // 리프레시 후 남은 시간 초기화
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
      {/* 토큰 남은 시간 */}
      <Typography
        variant="body1"
        sx={{
          marginRight: theme.spacing(1),
          fontWeight: "bold",
          color: theme.palette.text.secondary,
        }}
      >
        Token Expires In: {formatTime(remainingTime)}
      </Typography>

      {/* 리프레시 버튼 */}
      <Button
        onClick={handleRefresh}
        sx={{
          minWidth: 0, // 버튼의 기본 너비 제거
          paddingRight: 1.5, // 여백 제거
          color: theme.palette.primary.main, // 아이콘 색상 설정
          "&:hover": {
            backgroundColor: theme.palette.action.hover, // 호버 효과
          },
        }}
      >
        <RefreshIcon />
      </Button>

      {/* 검색 및 알림 */}
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
