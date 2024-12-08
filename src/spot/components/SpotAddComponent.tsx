import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpot } from "../../api/spotAPI";
import { Spot } from "../../types/spot";
import { TextField, Button, Box, Typography } from "@mui/material";

const SpotAddComponent = () => {
  const [spotname, setSpotName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [sno, setSno] = useState<number | "">("");
  const [sname, setSname] = useState("");
  const navigate = useNavigate();

  const handleAddSpot = async () => {
    if (!spotname || !address || !tel || !sno || !sname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const newSpot: Spot = {
      spno: 0, // 새로 추가할 Spot이므로 0으로 설정
      spotname,
      address,
      tel,
      latitude: null,
      longitude: null,
      sno: Number(sno),
      sname,
    };

    try {
      await addSpot(newSpot);
      alert("Spot이 성공적으로 추가되었습니다.");
      navigate("/app/spot/list");
    } catch (error) {
      console.error("Spot 추가에 실패했습니다:", error);
      alert("Spot 추가에 실패했습니다.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 4 }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        Spot 추가
      </Typography>
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
        label="점주 번호"
        value={sno}
        onChange={(e) => setSno(e.target.value ? Number(e.target.value) : "")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="점주 이름"
        value={sname}
        onChange={(e) => setSname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleAddSpot}>
          추가
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/app/spot/list")}
          sx={{ ml: 2 }}
        >
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default SpotAddComponent;
