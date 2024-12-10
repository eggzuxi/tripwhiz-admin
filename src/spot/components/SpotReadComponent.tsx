import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotById, updateSpot } from "../../api/spotAPI";
import { Spot } from "../../types/spot";
import { Box, Typography, Button, Divider, TextField } from "@mui/material";

const SpotReadComponent = () => {
  const { spno } = useParams<{ spno: string }>();
  const [spot, setSpot] = useState<Spot | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSpot, setUpdatedSpot] = useState({
    spotname: "",
    address: "",
    // tel: "",
    sno: 0,
    sname: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!spno) return;

    const fetchSpotDetails = async () => {
      try {
        const data = await getSpotById(Number(spno));
        setSpot(data);
        setUpdatedSpot({
          spotname: data.spotname,
          address: data.address,
          // tel: data.tel,
          sno: data.sno,
          sname: data.sname,
        });
      } catch (error) {
        console.error("Spot 데이터를 가져오는 데 실패했습니다:", error);
        alert("Spot 데이터를 가져오는 데 실패했습니다.");
        navigate("/app/spot/list");
      }
    };

    fetchSpotDetails();
  }, [spno, navigate]);

  const handleSave = async () => {
    if (!spno || !spot) return;

    const updatedData: Spot = {
      ...spot,
      spotname: updatedSpot.spotname,
      address: updatedSpot.address,
      // tel: updatedSpot.tel,
      sno: updatedSpot.sno,
      sname: updatedSpot.sname,
    };

    try {
      await updateSpot(Number(spno), updatedData);
      alert("Spot이 성공적으로 수정되었습니다.");
      setSpot(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Spot 수정에 실패했습니다:", error);
      alert("Spot 수정에 실패했습니다.");
    }
  };

  if (!spot) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Spot 정보를 로드할 수 없습니다.</Typography>
      </Box>
    );
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

      {!isEditing ? (
        <>
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

          {/*<Typography variant="h6" gutterBottom mt={2}>*/}
          {/*  전화번호:*/}
          {/*</Typography>*/}
          {/*<Typography variant="body1" mb={2}>*/}
          {/*  {spot.tel}*/}
          {/*</Typography>*/}

          <Divider />

          <Typography variant="h6" gutterBottom mt={2}>
            점주 정보:
          </Typography>
          <Typography variant="body1" mb={2}>
            번호: {spot.sno}, 이름: {spot.sname}
          </Typography>

          <Box textAlign="center" mt={4}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/app/spot/list")}
              sx={{ mr: 2 }}
            >
              목록으로
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              수정하기
            </Button>
          </Box>
        </>
      ) : (
        <>
          <TextField
            label="Spot 이름"
            value={updatedSpot.spotname}
            onChange={(e) =>
              setUpdatedSpot({ ...updatedSpot, spotname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="주소"
            value={updatedSpot.address}
            onChange={(e) =>
              setUpdatedSpot({ ...updatedSpot, address: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          {/*<TextField*/}
          {/*  label="전화번호"*/}
          {/*  value={updatedSpot.tel}*/}
          {/*  onChange={(e) =>*/}
          {/*    setUpdatedSpot({ ...updatedSpot, tel: e.target.value })*/}
          {/*  }*/}
          {/*  fullWidth*/}
          {/*  margin="normal"*/}
          {/*/>*/}
          <TextField
            label="점주 번호"
            value={updatedSpot.sno}
            onChange={(e) =>
              setUpdatedSpot({ ...updatedSpot, sno: Number(e.target.value) })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="점주 이름"
            value={updatedSpot.sname}
            onChange={(e) =>
              setUpdatedSpot({ ...updatedSpot, sname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mr: 2 }}
            >
              저장
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SpotReadComponent;
