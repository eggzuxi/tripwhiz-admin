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
import { getStoreOwners, deleteStoreOwner } from '../../api/storeOwnerAPI'; // 점주 목록과 삭제 API 호출

function ListManagerComponent() {
    const [storeOwners, setStoreOwners] = useState([]); // 점주 목록 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const navigate = useNavigate();

    // 점주 목록을 불러오는 함수
    const fetchStoreOwners = async () => {
        try {
            const data = await getStoreOwners();
            console.log('Fetched store owners:', data);
            setStoreOwners(data); // 점주 목록 상태 업데이트
        } catch (error) {
            console.error('점주 목록 불러오기 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    // 점주 삭제 함수
    const handleDelete = async (s_no) => {
        try {
            const confirmed = window.confirm('정말로 이 점주를 삭제하시겠습니까?');
            if (confirmed) {
                await deleteStoreOwner(s_no); // 점주 삭제 API 호출
                alert('점주 계정이 삭제되었습니다.');
                fetchStoreOwners(); // 삭제 후 점주 목록을 다시 불러옴
            }
        } catch (error) {
            console.error('점주 삭제 오류:', error);
            alert('점주 계정 삭제에 실패했습니다.');
        }
    };

    // 컴포넌트가 마운트될 때 점주 목록 불러오기
    useEffect(() => {
        fetchStoreOwners();
    }, []);

    // 점주 추가 버튼 클릭 시 호출되는 함수
    const handleAddStoreOwner = () => {
        navigate('/storeOwner/create'); // '/storeOwner/add' 경로로 이동하여 점주 추가 페이지로 이동
    };

    return (
        <Card>
            {/* 헤더 */}
            <CardHeader
                title="점주 목록"
                action={
                    <Button variant="contained" color="primary" onClick={handleAddStoreOwner}>
                        점주 추가
                    </Button>
                }
            />
            {/* 카드와 테이블의 구분선 */}
            <Divider />
            {/* 테이블을 담는 컨테이너 */}
            <TableContainer>
                <Table>
                    {/* 테이블 헤더 */}
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>점주 이름</TableCell>
                            <TableCell>점주 ID</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>삭제 여부</TableCell>
                            <TableCell>삭제</TableCell> {/* 삭제 버튼 추가 */}
                        </TableRow>
                    </TableHead>
                    {/* 테이블 바디 */}
                    <TableBody>
                        {!loading && storeOwners.length > 0 ? (
                            storeOwners.map((owner, index) => (
                                <TableRow key={owner.id} onClick={() => navigate(`/storeOwner/detail/${owner.id}`)}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{owner.sName}</TableCell>
                                    <TableCell>{owner.id}</TableCell>
                                    <TableCell>{owner.email}</TableCell>
                                    <TableCell>{owner.delFlag ? '삭제됨' : '활성'}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={(e) => {
                                                e.stopPropagation(); // 테이블 클릭 이벤트가 발생하지 않도록 함
                                                handleDelete(owner.id); // 삭제 함수 호출
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography align="center">
                                        {loading ? '불러오는 중...' : '점주 목록이 없습니다.'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

export default ListManagerComponent;