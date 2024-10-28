import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅
// @ts-ignore
import { IBoard, getBoardList } from '../../api/boardAPI';

function BoardListComponent() {
    const [boardList, setBoardList] = useState<IBoard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    // 게시글 리스트를 불러오는 함수
    const fetchBoardList = async () => {
        try {
            // @ts-ignore
            const data = await getBoardList();
            console.log('Fetched board list:', data);
            // @ts-ignore
            setBoardList(data);
        } catch (error) {
            console.error('게시글 리스트 불러오기 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트가 마운트될 때 게시글 리스트 불러오기
    useEffect(() => {
        fetchBoardList();
    }, []);

    // 게시글 추가 버튼 클릭 시 호출되는 함수
    const handleAddPost = () => {
        navigate('/boa/add'); // '/boa/add' 경로로 이동하여 게시글 추가 페이지로 이동
    };

    return (
        <Card>
            {/* 헤더 */}
            <CardHeader
                title="공지사항"
                action={
                    <Box display="flex" justifyContent="space-between" width={150}>
                        <Button variant="contained" color="primary" onClick={handleAddPost}>
                            글 추가
                        </Button>
                    </Box>
                }
            />

            {/* 카드와 테이블의 구분선 */}
            <Divider />

            {/* 테이블을 담는 컨테이너 */}
            <TableContainer>
                <Table>
                    {/* 테이블 헤더 */}
                    <TableHead style={{ backgroundColor: '#FCFBF0' }}>
                        <TableRow>
                            <TableCell align="center">No.</TableCell>
                            <TableCell align="center">제목</TableCell>
                            <TableCell align="center">작성자</TableCell>
                            <TableCell align="center">작성일</TableCell>
                            <TableCell align="center">조회수</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* 테이블 바디 */}
                    <TableBody>
                        {!loading && boardList.length > 0 ? (
                            <>
                                {/* 상단 고정 게시글 3개 */}
                                {boardList.slice(0, 3).map((board) => (
                                    <TableRow
                                        hover
                                        key={`fixed-${board.bno}`}
                                        onClick={() => navigate(`/boa/read/${board.bno}`)}
                                        style={{ backgroundColor: '#f9f9f9' }}
                                    >
                                        <TableCell align="center">{board.bno}</TableCell>
                                        <TableCell align="center" style={{ width: '450px' }}>
                                            <Typography variant="body1" fontWeight="bold" align="center" noWrap>
                                                {board.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">{board.writer}</TableCell>
                                        <TableCell align="center">
                                            {new Date(board.createdDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">{board.viewCount}</TableCell>
                                    </TableRow>
                                ))}

                                {/* 고정되지 않은 나머지 게시글 */}
                                {boardList.slice(3).map((board) => (
                                    <TableRow
                                        hover
                                        key={board.bno}
                                        onClick={() => navigate(`/boa/read/${board.bno}`)}
                                    >
                                        <TableCell align="center">{board.bno}</TableCell>
                                        <TableCell align="center" style={{ width: '450px' }}>
                                            <Typography variant="body1" fontWeight="bold" align="center" noWrap>
                                                {board.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">{board.writer}</TableCell>
                                        <TableCell align="center">
                                            {new Date(board.createdDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">{board.viewCount}</TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    {loading ? '불러오는 중...' : '게시글이 없습니다.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

export default BoardListComponent;