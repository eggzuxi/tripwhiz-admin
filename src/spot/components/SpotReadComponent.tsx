import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotById } from "../../api/spotAPI";
import { Box, Typography, Button, Divider } from "@mui/material";

const SpotReadComponent = () => {
  const { spno } = useParams<{ spno: string }>(); // URL에서 Spot 번호 가져오기
  const [spot, setSpot] = useState<{
    spotname: string;
    address: string;
    tel: string;
    storeowner: {
      sno: number;
      sname: string;
    };
  } | null>(null);
  const navigate = useNavigate();

  // Spot 상세 정보 가져오기
  useEffect(() => {
    if (!spno) return;
    getSpotById(Number(spno))
      .then((data) => setSpot(data))
      .catch(() => {
        alert("Spot 데이터를 가져오는 데 실패했습니다.");
        navigate("/spot/list"); // 실패 시 목록 페이지로 이동
      });
  }, [spno, navigate]);

  if (!spot) {
    return null; // 데이터가 로드되지 않았을 경우 아무것도 표시하지 않음
  }

  return (
    <Box
      sx={{
        maxWidth: "600px",
        mx: "auto",
        mt: 8,
        p: 4,
        bgcolor: "grey.50",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
        Spot 상세 정보
      </Typography>

      <Typography variant="h6" gutterBottom>
        Spot 이름:
      </Typography>
      <Typography variant="body1" mb={2}>
        {spot.spotname}
      </Typography>

      <Divider />

      <Typography variant="h6" gutterBottom mt={2}>
        주소:
      </Typography>
      <Typography variant="body1" mb={2}>
        {spot.address}
      </Typography>

      <Divider />

      <Typography variant="h6" gutterBottom mt={2}>
        전화번호:
      </Typography>
      <Typography variant="body1" mb={2}>
        {spot.tel}
      </Typography>

      <Divider />

      <Typography variant="h6" gutterBottom mt={2}>
        점주 정보:
      </Typography>
      <Typography variant="body1" mb={2}>
        번호: {spot.storeowner.sno}, 이름: {spot.storeowner.sname}
      </Typography>

      <Box textAlign="center" mt={4}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/spot/list")}
          sx={{ mr: 2 }}
        >
          목록으로
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/spot/modi/${spno}`)}
        >
          수정하기
        </Button>
      </Box>
    </Box>
  );
};

export default SpotReadComponent;
