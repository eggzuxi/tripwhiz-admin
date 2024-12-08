import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import jwtAxios from "../util/jwtUtil";
import { refreshRequest } from "../api/commonAPI";

const TokenStatus = () => {
  const [accessTokenRemainingTime, setAccessTokenRemainingTime] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // JWT 디코드 함수
  const decodeJWT = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  };

  // 남은 시간 계산
  const calculateRemainingTime = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setAccessTokenRemainingTime(null);
      return;
    }

    const payload = decodeJWT(accessToken);
    if (!payload || !payload.exp) {
      setAccessTokenRemainingTime(null);
      return;
    }

    const exp = payload.exp * 1000; // 만료 시간 (밀리초)
    const now = Date.now();

    const remainingTime = exp - now;
    setAccessTokenRemainingTime(Math.max(remainingTime, 0)); // 음수 시간 방지
  };

  // Refresh 버튼 클릭 핸들러
  const handleRefreshToken = async () => {
    setRefreshing(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        alert("No tokens found. Please log in again.");
        return;
      }

      // Refresh API 요청
      const data = await refreshRequest(accessToken, refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      alert("Token refreshed successfully!");

      calculateRemainingTime(); // 새 토큰 기준으로 남은 시간 재계산
    } catch (error) {
      console.error("Token refresh failed:", error);
      alert("Failed to refresh token. Please log in again.");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    calculateRemainingTime();

    // 주기적으로 남은 시간 업데이트
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="body2">
        {accessTokenRemainingTime !== null
          ? `Access Token: ${formatTime(accessTokenRemainingTime)}`
          : "No Access Token"}
      </Typography>
      <IconButton
        color="primary"
        onClick={handleRefreshToken}
        disabled={refreshing}
      >
        <RefreshIcon />
      </IconButton>
    </Box>
  );
};

export default TokenStatus;
