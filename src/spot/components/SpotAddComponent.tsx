import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpot } from "../../api/spotAPI";
import { Spot } from "../../types/spot";
import { TextField, Button, Box, Typography } from "@mui/material";

const SpotAddComponent = () => {
  const [spotname, setSpotName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [storeOwner, setStoreOwner] = useState({
    sno: "",
    sname: "",
  });
  const navigate = useNavigate();

  const handleAddSpot = async () => {
    if (!spotname || !address || !tel || !storeOwner.sno) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const newSpot: Spot = {
      spno: 0, // 자동 생성되므로 0으로 설정
      spotname,
      address,
      tel,
      sno: parseInt(storeOwner.sno, 10),
      sname: storeOwner.sname,
    };

    try {
      await addSpot(newSpot);
      alert("Spot이 성공적으로 추가되었습니다.");
      navigate("/spot/list");
    } catch (error) {
      alert("Spot 추가에 실패했습니다.");
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
        Spot 추가
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
          onChange={(e) => setStoreOwner({ ...storeOwner, sno: e.target.value })}
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
            onClick={handleAddSpot}
            sx={{ mr: 2 }}
          >
            추가
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

export default SpotAddComponent;
