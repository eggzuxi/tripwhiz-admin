import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getStoreOwners, deleteStoreOwner } from '../../api/storeOwnerAPI';
import useAuthStore from '../../AuthState';
import { IStoreOwner } from '../../types/storeOwner';

const ListManagerComponent = () => {
    const [storeOwners, setStoreOwners] = useState<IStoreOwner[]>([]);
    const [loading, setLoading] = useState(true);
    const { admin } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin || !admin.accessToken) {
            alert("관리자 계정으로 로그인해야 접근 가능합니다.");
            navigate('/login');
        } else {
            fetchStoreOwners();
        }
    }, [admin, navigate]);

    const fetchStoreOwners = async () => {
        try {
            setLoading(true);
            const data = await getStoreOwners();
            setStoreOwners(data);
        } catch (error) {
            console.error('점주 목록 불러오기 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (sno: number) => {
        try {
            const confirmed = window.confirm('정말로 이 점주를 삭제하시겠습니까?');
            if (confirmed) {
                await deleteStoreOwner(sno);
                alert('점주 계정이 성공적으로 삭제되었습니다.');
                fetchStoreOwners();
            }
        } catch (error) {
            console.error('점주 삭제 오류:', error);
            alert('점주 계정 삭제에 실패했습니다.');
        }
    };

    return (
      <Card>
          <CardHeader
            title="점주 목록"
            action={
              admin && (
                <Button variant="contained" color="primary" onClick={() => navigate('/storeOwner/create')}>
                    점주 추가
                </Button>
              )
            }
          />
          <Divider />
          <TableContainer>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>점주 이름</TableCell>
                          <TableCell>점주 ID</TableCell>
                          <TableCell>이메일</TableCell>
                          <TableCell>삭제 여부</TableCell>
                          <TableCell>삭제</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {!loading && storeOwners.length > 0 ? (
                        storeOwners.map((owner, index) => (
                          <TableRow key={owner.sno}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{owner.sname}</TableCell>
                              <TableCell>{owner.id}</TableCell>
                              <TableCell>{owner.email}</TableCell>
                              <TableCell>{owner.delFlag ? '삭제됨' : '활성'}</TableCell>
                              <TableCell>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(owner.sno)}
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
};

export default ListManagerComponent;
