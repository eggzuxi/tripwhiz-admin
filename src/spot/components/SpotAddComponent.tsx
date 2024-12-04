import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpot } from "../../api/spotAPI";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddSpotComponent = () => {
  const [spotname, setSpotName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [sno, setSno] = useState<number | "">("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("Spot Data to Add:", { spotname, address, tel, sno }); // 디버깅 로그
    if (!spotname || !address || !tel || !sno || sno <= 0) {
      alert("All fields are required, and Store Owner ID must be greater than 0.");
      return;
    }
    try {
      const response = await addSpot({ spotname, address, tel, sno });
      console.log("Add Spot API Response:", response); // API 응답 확인
      alert("Spot added successfully!");
      navigate("/spots"); // 목록으로 이동
    } catch (error: any) {
      console.error("Error adding spot:", error.response || error); // 에러 로그
      alert("Failed to add spot.");
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Add Spot
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Spot Name"
          value={spotname}
          onChange={(e) => setSpotName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          fullWidth
        />
        <TextField
          label="Store Owner ID (SNO)"
          type="number"
          value={sno}
          onChange={(e) => setSno(Number(e.target.value) || "")}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!spotname || !address || !tel || !sno || sno <= 0} // 버튼 비활성화 조건
        >
          Add Spot
        </Button>
      </Box>
    </Box>
  );
};

export default AddSpotComponent;
