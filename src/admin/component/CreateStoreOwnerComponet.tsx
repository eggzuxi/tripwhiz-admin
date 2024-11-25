import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createStoreOwner } from '../../api/storeOwnerAPI';
import { IStoreOwner } from '../../types/storeOwner';

const CreateStoreOwnerComponent = () => {
    const [storeOwner, setStoreOwner] = useState<IStoreOwner>({
        sno: 0, // 숫자 타입으로 초기화
        id: '',
        pw: '',
        email: '',
        sname: '',
        delFlag: false, // boolean 타입
    });

    const navigate = useNavigate();

    // JWT 토큰 확인 코드
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            console.log('JWT Token:', token);  // 정상적으로 토큰 값 출력 확인
        } else {
            console.log('JWT Token not found');
        }
    }, []);

    const handleCreate = async () => {
        try {
            // JWT 토큰을 포함한 요청을 보낼 때
            await createStoreOwner(storeOwner);
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
                    {/* Form fields */}
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
                    <TextField
                        label="삭제 플래그 (true 또는 false)"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={storeOwner.delFlag ? 'true' : 'false'} // boolean을 string으로 변환하여 표시
                        onChange={(e) => setStoreOwner({ ...storeOwner, delFlag: e.target.value === 'true' })}
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