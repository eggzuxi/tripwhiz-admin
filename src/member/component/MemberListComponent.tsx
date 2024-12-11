import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMembers } from "../../api/memberAPI";
import { Member } from "../../types/member";
import useAuthStore from '../../AuthState';
import { Box, Button, Typography, Grid, Card, CardContent } from "@mui/material";

const MemberListComponent = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { admin } = useAuthStore();

  useEffect(() => {
    if (!admin?.accessToken) {
      alert("Admin 권한이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchMembers = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setError("회원 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [admin, navigate]);

  if (loading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 8 }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        회원 목록
      </Typography>
      <Grid container spacing={4}>
        {members.length > 0 ? (
          members.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body1">이메일: {member.email}</Typography>
                  <Typography variant="body1">비밀번호: {member.pw}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography textAlign="center">회원이 없습니다.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MemberListComponent;
