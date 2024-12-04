import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotById, updateSpot } from "../../api/spotAPI";
import { Spot } from "../../types/spot";
import { TextField, Button, Box, Typography } from "@mui/material";

const SpotModifyComponent = () => {
  const { spno } = useParams<{ spno: string }>(); // URL에서 Spot 번호 가져오기
  const [spot, setSpot] = useState<Spot | null>(null); // Spot 데이터 상태 관리
  const navigate = useNavigate();

  // 기존 Spot 데이터 가져오기
  useEffect(() => {
    if (!spno) return;
    getSpotById(Number(spno))
      .then((spotData) => {
        setSpot(spotData);
      })
      .catch(() => {
        alert("Spot 데이터를 가져오는 데 실패했습니다.");
      });
  }, [spno]);

  // Spot 수정 함수
  const handleModifySpot = () => {
    if (!spot || !spot.spotname || !spot.address || !spot.tel || !spot.sno) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    updateSpot(Number(spno), spot)
      .then(() => {
        alert("Spot이 성공적으로 수정되었습니다.");
        navigate("/spot/list"); // 수정 후 목록 페이지로 이동
      })
      .catch(() => {
        alert("Spot 수정에 실패했습니다.");
      });
  };

  // 값 변경 핸들러
  const handleChange = (field: keyof Spot, value: string | number) => {
    if (spot) {
      setSpot({
        ...spot,
        [field]: value,
      });
    }
  };

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
        Spot 수정
      </Typography>

      <Box component="form" noValidate>
        <TextField
          label="Spot 이름"
          value={spot?.spotname || ""}
          onChange={(e) => handleChange("spotname", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="주소"
          value={spot?.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="전화번호"
          value={spot?.tel || ""}
          onChange={(e) => handleChange("tel", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="점주 번호 (Store Owner ID)"
          type="number"
          value={spot?.sno || ""}
          onChange={(e) => handleChange("sno", Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="점주 이름 (Store Owner Name)"
          value={spot?.sname || ""}
          onChange={(e) => handleChange("sname", e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleModifySpot}
            sx={{ mr: 2 }}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/spot/list")}
          >
            취소
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SpotModifyComponent;
