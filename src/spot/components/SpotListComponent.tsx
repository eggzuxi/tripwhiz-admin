import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpots, softDeleteSpot } from "../../api/spotAPI";
import { Spot, PageResponseDTO } from "../../types/spot";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";

const SpotListComponent = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRange, setCurrentRange] = useState(0); // 현재 페이지 범위
  const PAGE_SIZE = 9; // 한 페이지에 표시할 데이터 수
  const PAGES_PER_GROUP = 10; // 한 번에 표시할 페이지 수
  const navigate = useNavigate();

  // Spot 목록을 가져오는 함수
  const fetchSpots = (page: number) => {
    getSpots(page, PAGE_SIZE)
      .then((response: PageResponseDTO<Spot>) => {
        setSpots(response.dtoList); // Spot 목록 설정
        setTotalPages(response.totalPage); // 총 페이지 수 설정
      })
      .catch(() => {
        alert("Spot 데이터를 가져오는 데 실패했습니다.");
      });
  };

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 현재 페이지 변경
    fetchSpots(page); // 새로운 페이지 데이터 가져오기
  };

  // Spot 삭제
  const handleDeleteSpot = (spno: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      softDeleteSpot(spno)
        .then(() => {
          alert("Spot이 성공적으로 삭제되었습니다.");
          fetchSpots(currentPage); // 현재 페이지 데이터 갱신
        })
        .catch(() => {
          alert("Spot 삭제에 실패했습니다.");
        });
    }
  };

  // Spot 상세 페이지로 이동
  const handleViewDetails = (spno: number) => {
    navigate(`/spot/read/${spno}`);
  };

  // Spot 추가 페이지로 이동
  const handleAddSpot = () => {
    navigate("/spot/add");
  };

  // 현재 범위의 페이지 번호를 생성
  const getCurrentPageGroup = () => {
    const start = currentRange * PAGES_PER_GROUP + 1;
    const end = Math.min(start + PAGES_PER_GROUP - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  // 컴포넌트 마운트 시 Spot 목록 첫 페이지 가져오기
  useEffect(() => {
    fetchSpots(currentPage);
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        p: 8,
        bgcolor: "grey.50",
        minHeight: "100vh",
      }}
    >
      {/* Spot 추가 버튼 */}
      <Box mb={4} textAlign="right">
        <Button variant="contained" color="secondary" onClick={handleAddSpot}>
          Spot 추가
        </Button>
      </Box>

      {/* Spot 목록 */}
      <Grid container spacing={4}>
        {spots.map((spot) => (
          <Grid item xs={12} sm={6} md={4} key={spot.spno}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="textPrimary"
                  gutterBottom
                >
                  {spot.spotname}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  주소: {spot.address}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                  전화: {spot.tel}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#A5D6A7",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#81C784",
                    },
                  }}
                  onClick={() => handleViewDetails(spot.spno)}
                >
                  자세히 보기
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => handleDeleteSpot(spot.spno)}
                >
                  삭제
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 페이지 네비게이션 */}
      <Box mt={4} textAlign="center">
        {/* 이전 버튼 */}
        {currentRange > 0 && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setCurrentRange((prev) => prev - 1);
              const previousStartPage = (currentRange - 1) * PAGES_PER_GROUP + 1;
              handlePageChange(previousStartPage);
            }}
            sx={{ mx: 0.5 }}
          >
            이전
          </Button>
        )}

        {/* 현재 범위의 페이지 번호 */}
        {getCurrentPageGroup().map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "contained" : "outlined"}
            color="primary"
            onClick={() => handlePageChange(page)}
            sx={{ mx: 0.5 }}
          >
            {page}
          </Button>
        ))}

        {/* 다음 버튼 */}
        {(currentRange + 1) * PAGES_PER_GROUP < totalPages && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setCurrentRange((prev) => prev + 1);
              const nextStartPage = (currentRange + 1) * PAGES_PER_GROUP + 1;
              handlePageChange(nextStartPage);
            }}
            sx={{ mx: 0.5 }}
          >
            다음
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SpotListComponent;
