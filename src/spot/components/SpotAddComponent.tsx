import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpot, getSpots } from "../../api/spotAPI";
import { TextField, Button, Box, Typography } from "@mui/material";

interface Spot {
  spno: number;
  spotname: string;
  address: string;
  tel: string;
  storeowner?: {
    sno: number;
    sname: string;
  };
}

const SpotAddComponent = () => {
  const [spotname, setSpotName] = useState(""); // Spot 이름
  const [address, setAddress] = useState(""); // Spot 주소
  const [tel, setTel] = useState(""); // Spot 전화번호
  const [storeOwner, setStoreOwner] = useState({
    sno: "",
    sname: "",
  }); // 점주 정보
  const [spots, setSpots] = useState<Spot[]>([]); // 기존 Spot 목록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  // Spot 목록 가져오기
  useEffect(() => {
    setLoading(true);
    getSpots(1, 100) // 충분히 많은 Spot을 가져오기
      .then((response) => {
        setSpots(response.dtoList);
      })
      .catch(() => {
        alert("Spot 데이터를 가져오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  // sno 중복 확인
  const isDuplicateSno = (sno: number) => {
    return spots.some((spot) => spot.storeowner?.sno === sno); // Optional chaining 사용
  };

  // Spot 추가 함수
  const handleAddSpot = () => {
    const sno = Number(storeOwner.sno);

    // 필드 유효성 검사
    if (!spotname.trim() || !address.trim() || !tel.trim() || !sno) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    if (isDuplicateSno(sno)) {
      alert("중복된 점주 번호(sno)가 있습니다.");
      return;
    }

    const newSpot = {
      spotname,
      address,
      tel,
      storeowner: {
        sno,
        sname: storeOwner.sname.trim(),
      },
    };

    setLoading(true); // 로딩 상태 활성화
    addSpot(newSpot)
      .then(() => {
        alert("Spot이 성공적으로 추가되었습니다.");
        navigate("/spot/list"); // 추가 후 목록 페이지로 이동
      })
      .catch(() => {
        alert("Spot 추가에 실패했습니다.");
      })
      .finally(() => setLoading(false)); // 로딩 상태 비활성화
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
          required
        />
        <TextField
          label="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="전화번호"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          fullWidth
          margin="normal"
          required
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
          required
        />
        <TextField
          label="점주 이름 (Store Owner Name)"
          value={storeOwner.sname}
          onChange={(e) =>
            setStoreOwner({ ...storeOwner, sname: e.target.value })
          }
          fullWidth
          margin="normal"
          required
        />

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSpot}
            disabled={loading} // 로딩 중에는 버튼 비활성화
            sx={{ mr: 2 }}
          >
            {loading ? "추가 중..." : "추가"}
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
