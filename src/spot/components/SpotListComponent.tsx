import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpots, deleteSpot } from "../../api/spotAPI";
import { Spot } from "../../types/spot";
import useAuthStore from "../../AuthState";
import { Button, Box, Grid, Card, CardContent, Typography } from "@mui/material";

const SpotListComponent = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { admin } = useAuthStore();

  // Admin 권한 확인
  useEffect(() => {

    if (!admin?.accessToken) {
      alert("Admin 권한이 필요합니다.");
      navigate("/login");
    }

  }, [admin, navigate]);

  // Spot 목록 가져오기
  const fetchSpots = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getSpots(1, 10);
      if (response.dtoList && Array.isArray(response.dtoList)) {
        setSpots(response.dtoList);
      } else {
        throw new Error("유효하지 않은 데이터 구조입니다.");
      }
    } catch (error) {
      console.error("Spot 목록을 가져오는 데 실패했습니다:", error);
      setError("Spot 목록을 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  // Spot 삭제 처리
  const handleDelete = (spno: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteSpot(spno)
        .then(() => {
          alert("Spot이 삭제되었습니다.");
          fetchSpots();
        })
        .catch(() => alert("Spot 삭제에 실패했습니다."));
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 8 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/app/spot/add")}
        sx={{ mb: 4 }}
      >
        Spot 추가
      </Button>
      <Grid container spacing={4}>
        {spots.length > 0 ? (
          spots.map((spot) => (
            <Grid item xs={12} sm={6} md={4} key={spot.spno}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{spot.spotname}</Typography>
                  <Typography variant="body1">주소: {spot.address}</Typography>
                  {/*<Typography variant="body1">전화: {spot.tel}</Typography>*/}
                  <Typography variant="body2">점주 번호: {spot.sno}</Typography>
                  <Typography variant="body2">점주 이름: {spot.sname}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/app/spot/read/${spot.spno}`)}
                    sx={{ mt: 2 }}
                  >
                    자세히 보기
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(spot.spno)}
                    sx={{ mt: 2 }}
                  >
                    삭제
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
            표시할 Spot이 없습니다.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default SpotListComponent;
