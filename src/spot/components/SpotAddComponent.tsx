import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpot } from "../../api/spotAPI"; // addSpot API 호출
import { TextField, Button, Box, Typography } from "@mui/material";

const SpotAddComponent = () => {
  // Spot의 필드에 대한 상태 관리
  const [spotname, setSpotName] = useState(""); // Spot 이름
  const [address, setAddress] = useState(""); // Spot 주소
  const [tel, setTel] = useState(""); // Spot 전화번호
  const [storeOwner, setStoreOwner] = useState({ sno: "", sname: "" }); // 점주 정보

  const navigate = useNavigate(); // navigate 함수로 페이지 이동

  // Spot 추가 핸들러
  const handleAddSpot = async () => {
    const sno = parseInt(storeOwner.sno, 10); // 점주 번호를 숫자형으로 변환
    if (!spotname || !address || !tel || isNaN(sno)) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    // 새로운 Spot 데이터 생성
    const newSpot = {
      spotname, // Spot 이름
      address, // Spot 주소
      tel, // Spot 전화번호
      sno, // 점주 번호
      sname: storeOwner.sname, // 점주 이름
    };

    try {
      // Spot 추가 API 호출
      await addSpot(newSpot);
      alert("Spot이 성공적으로 추가되었습니다.");
      navigate("/spot/list"); // 추가 후 목록 페이지로 이동
    } catch (error) {
      console.error("Error adding spot:", error);
      alert("Spot 추가에 실패했습니다.");
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={8} p={4} bgcolor="white" boxShadow={3}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Spot 추가
      </Typography>

      {/* Spot 이름 입력 필드 */}
      <TextField
        label="Spot 이름"
        value={spotname}
        onChange={(e) => setSpotName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Spot 주소 입력 필드 */}
      <TextField
        label="주소"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Spot 전화번호 입력 필드 */}
      <TextField
        label="전화번호"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* 점주 번호 입력 필드 */}
      <TextField
        label="점주 번호"
        value={storeOwner.sno}
        onChange={(e) =>
          setStoreOwner({ ...storeOwner, sno: e.target.value })
        }
        fullWidth
        margin="normal"
        required
      />

      {/* 점주 이름 입력 필드 */}
      <TextField
        label="점주 이름"
        value={storeOwner.sname}
        onChange={(e) =>
          setStoreOwner({ ...storeOwner, sname: e.target.value })
        }
        fullWidth
        margin="normal"
        required
      />

      {/* 추가 버튼 */}
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleAddSpot}>
          추가
        </Button>
      </Box>
    </Box>
  );
};

export default SpotAddComponent;
