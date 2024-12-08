import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createStoreOwner } from '../../api/storeOwnerAPI';
import useAuthStore from '../../AuthState';
import { IStoreOwner } from '../../types/storeOwner';

const CreateStoreOwnerComponent = () => {
    const [storeOwner, setStoreOwner] = useState<Omit<IStoreOwner, 'sno' | 'delFlag'>>({
        id: '',
        pw: '',
        email: '',
        sname: '',
    });
    const { admin } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin || !admin.accessToken) {
            alert("관리자 계정으로 로그인해야 접근 가능합니다.");
            navigate('/login');
        }
    }, [admin, navigate]);

    const handleCreate = async () => {
        try {
            const newStoreOwner: IStoreOwner = { ...storeOwner, sno: 0, delFlag: false };
            await createStoreOwner(newStoreOwner);
            alert('점주 계정이 생성되었습니다.');
            navigate('/storeOwner/list');
        } catch (error) {
            console.error('점주 생성 오류:', error);
            alert('점주 계정 생성에 실패했습니다.');
        }
    };

    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" bgcolor="#f4f6f9" p={4}>
          <Card sx={{ width: '80%', maxWidth: '900px', p: 4, boxShadow: 5, borderRadius: 2 }}>
              <CardContent>
                  <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={2}>
                      새 가게 주인 추가
                  </Typography>
                  <TextField
                    label="점주 이름"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={storeOwner.sname}
                    onChange={(e) => setStoreOwner({ ...storeOwner, sname: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="점주 ID"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={storeOwner.id}
                    onChange={(e) => setStoreOwner({ ...storeOwner, id: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="비밀번호"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={storeOwner.pw}
                    onChange={(e) => setStoreOwner({ ...storeOwner, pw: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="이메일"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={storeOwner.email}
                    onChange={(e) => setStoreOwner({ ...storeOwner, email: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                      <Button variant="outlined" color="secondary" onClick={() => navigate('/storeOwner/list')}>
                          목록으로 돌아가기
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleCreate}>
                          생성
                      </Button>
                  </Box>
              </CardContent>
          </Card>
      </Box>
    );
};

export default CreateStoreOwnerComponent;
