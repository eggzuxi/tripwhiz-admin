import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, CircularProgress, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoard, deleteBoard, updateBoard } from '../../api/boardAPI'; // updateBoard 추가

function BoardReadComponent() {
    const { bno } = useParams<{ bno: string }>();
    const [board, setBoard] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false); // 수정 모드 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        if (!bno) return;
        setLoading(true);
        getBoard(parseInt(bno))
            .then((data) => {
                if (data) {
                    setBoard({
                        title: data.title || '제목 없음',
                        content: data.bcontent || '내용 없음',
                    });
                } else {
                    alert('게시글을 찾을 수 없습니다.');
                    navigate('/boa/list');
                }
            })
            .catch((error) => {
                console.error('게시글 불러오기 오류:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [bno, navigate]);

    // 목록으로 이동
    const handleList = () => {
        navigate('/boa/list');
    };

    // 수정 모드 전환
    const handleEdit = () => {
        setEditMode(true);
    };

    // 수정 완료 및 저장
    const handleSave = () => {
        // @ts-ignore
        updateBoard(parseInt(bno), board)
            .then(() => {
                alert('수정되었습니다.');
                setEditMode(false); // 수정 모드 종료
            })
            .catch((error) => {
                console.error('수정 실패:', error);
                alert('수정에 실패했습니다.');
            });
    };

    // 게시글 삭제
    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteBoard(parseInt(bno))
                .then(() => {
                    alert('삭제되었습니다.');
                    navigate('/boa/list');
                })
                .catch((error) => {
                    console.error('삭제 실패:', error);
                    alert('삭제에 실패했습니다.');
                });
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" bgcolor="#f4f6f9" p={4} style={{ marginTop: '-10vh' }}>
            <Card sx={{ width: '80%', maxWidth: '900px', p: 4, boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Box position="relative" display="flex" justifyContent="center" alignItems="center" mb={2}>
                                {editMode ? (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        value={board.title}
                                        onChange={(e) => setBoard({ ...board, title: e.target.value })}
                                        sx={{ textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: 1 }}
                                    />
                                ) : (
                                    <Typography variant="h4" fontWeight="bold" color="black" textAlign="center">
                                        {board.title}
                                    </Typography>
                                )}
                                <Button
                                    variant="text"
                                    color="error"
                                    onClick={handleDelete}
                                    sx={{ position: "absolute", right: 0 }}
                                >
                                    삭제
                                </Button>
                            </Box>

                            <TextField
                                label="내용"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={12}
                                value={board.content}
                                onChange={(e) => setBoard({ ...board, content: e.target.value })}
                                InputProps={{
                                    readOnly: !editMode, // editMode가 true일 때만 readOnly가 해제됨
                                }}
                                sx={{
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: 1,
                                    mb: 2,
                                }}
                            />

                            <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
                                <Button variant="text" color="secondary" onClick={handleList} sx={{ width: '10%' }}>
                                    목록
                                </Button>
                                {editMode ? (
                                    <Button variant="text" color="primary" onClick={handleSave} sx={{ width: '10%' }}>
                                        수정 완료
                                    </Button>
                                ) : (
                                    <Button variant="text" color="secondary" onClick={handleEdit} sx={{ width: '10%' }}>
                                        수정
                                    </Button>
                                )}
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default BoardReadComponent;