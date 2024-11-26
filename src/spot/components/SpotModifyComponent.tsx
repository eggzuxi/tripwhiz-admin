import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotById, updateSpot } from "../../api/spotAPI";
import { Spot } from "../../types/spot";
import { TextField, Button, Box, Typography } from "@mui/material";

const SpotModifyComponent = () => {
  const { spno } = useParams<{ spno: string }>(); // URL에서 Spot 번호 가져오기
  const [spotname, setSpotName] = useState(""); // Spot 이름
  const [address, setAddress] = useState(""); // Spot 주소
  const [tel, setTel] = useState(""); // Spot 전화번호
  const [storeOwner, setStoreOwner] = useState({
    sno: "",
    sname: "",
  }); // 점주 정보
  const navigate = useNavigate();

  // 기존 Spot 데이터 가져오기
  useEffect(() => {
    if (!spno) return;
    getSpotById(Number(spno))
      .then((spot) => {
        setSpotName(spot.spotname);
        setAddress(spot.address);
        setTel(spot.tel);
        setStoreOwner({
          sno: String(spot.storeowner.sno),
          sname: spot.storeowner.sname,
        });
      })
      .catch(() => {
        alert("Spot 데이터를 가져오는 데 실패했습니다.");
      });
  }, [spno]);

  // Spot 수정 함수
  const handleModifySpot = () => {
    if (!spotname || !address || !tel || !storeOwner.sno) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const updatedSpot: Spot = {
      spno: Number(spno),
      spotname,
      address,
      tel,
      sno: Number(storeOwner.sno),
      sname: storeOwner.sname,
    };

    updateSpot(Number(spno), updatedSpot)
      .then(() => {
        alert("Spot이 성공적으로 수정되었습니다.");
        navigate("/spot/list"); // 수정 후 목록 페이지로 이동
      })
      .catch(() => {
        alert("Spot 수정에 실패했습니다.");
      });
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
          value={spotname}
          onChange={(e) => setSpotName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="전화번호"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="점주 번호 (Store Owner ID)"
          type="number"
          value={storeOwner.sno}
          onChange={(e) =>
            setStoreOwner({ ...storeOwner, sno: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="점주 이름 (Store Owner Name)"
          value={storeOwner.sname}
          onChange={(e) =>
            setStoreOwner({ ...storeOwner, sname: e.target.value })
          }
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
