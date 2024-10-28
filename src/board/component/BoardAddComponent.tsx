import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../../api/boardAPI'; // createBoard 함수 가져오기

function BoardAddComponent() {
    const [board, setBoard] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    // 게시글 생성 함수
    const handleCreate = async () => {
        try {
            // @ts-ignore
            const newBoardId = await createBoard(board);
            alert('게시글이 추가되었습니다.');
            navigate(`/boa/read/${newBoardId}`); // 새 게시글 페이지로 이동
        } catch (error) {
            console.error('게시글 추가 오류:', error);
            alert('게시글 추가에 실패했습니다.');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" bgcolor="#f4f6f9" p={4}>
            <Card sx={{ width: '80%', maxWidth: '900px', p: 4, boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={2}>
                        새 게시글 추가
                    </Typography>

                    <TextField
                        label="제목"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={board.title}
                        onChange={(e) => setBoard({ ...board, title: e.target.value })}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="내용"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={12}
                        value={board.content}
                        onChange={(e) => setBoard({ ...board, content: e.target.value })}
                        sx={{ mb: 2 }}
                    />

                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/boa/list')}>
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
}

export default BoardAddComponent;