import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import PageComponent from "../../components/Page/PageComponent";
import { IOrderList, IPageResponse } from "../../types/order";
import { deleteOrders, getOrderList } from '../../api/orderAPI';
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';

const initialState: IPageResponse = {
  dtoList: [], // 빈 배열로 초기화
  current: 1,
  next: false,
  nextPage: 0,
  pageNumList: [],
  pageRequestDTO: { page: 1, size: 10, categoryCno: null, subCategoryScno: null, themeCategory: null },
  prev: false,
  prevPage: 0,
  totalCount: 0,
  totalPage: 0,
};

function OrderListComponent() {
  const navigate = useNavigate();
  const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrderList(currentPage - 1, 10); // 페이지 번호는 0부터 시작
        setPageResponse(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const moveToRead = (ono: number | undefined) => {
    navigate(`/ord/read/${ono}`);
  };

  const handleCheckboxChange = (ono: number) => {
    setSelectedOrders((prev) =>
      prev.includes(ono) ? prev.filter((id) => id !== ono) : [...prev, ono]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedOrders.length === 0) {
      alert("삭제할 주문을 선택하세요.");
      return;
    }

    const confirmDelete = window.confirm("선택된 주문을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteOrders(selectedOrders); // 선택된 주문 삭제 API 호출
      setPageResponse((prev) => ({
        ...prev,
        dtoList: prev.dtoList.filter((order) => !selectedOrders.includes(order.ono)),
      })); // UI 업데이트: 삭제된 주문 제거
      setSelectedOrders([]); // 선택 초기화
      alert("선택된 주문이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting selected orders:", error);
      alert("주문 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" marginBottom={2}>
        주문 리스트
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "0 auto" }} />
      ) : (
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">선택</TableCell>
                <TableCell align="center">주문 번호</TableCell>
                <TableCell align="center">회원 번호</TableCell>
                <TableCell align="center">이름</TableCell>
                <TableCell align="center">총 수량</TableCell>
                <TableCell align="center">총 가격</TableCell>
                <TableCell align="center">주문일</TableCell>
                <TableCell align="center">픽업일</TableCell>
                <TableCell align="center">상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageResponse.dtoList.map((order: IOrderList) => {
                const { ono, mno, name, totalAmount, totalPrice, createTime, pickUpDate, status, delFlag } = order;

                return (
                  <TableRow
                    key={ono}
                  >
                    <TableCell align="center">
                      <Checkbox
                        checked={selectedOrders.includes(ono || -1)}
                        onChange={() => handleCheckboxChange(ono || -1)}
                      />
                    </TableCell>
                    <TableCell align="center">{ono}</TableCell>
                    <TableCell align="center">{mno}</TableCell>
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{totalAmount}</TableCell>
                    <TableCell align="center">{totalPrice.toLocaleString()} 원</TableCell>
                    <TableCell align="center">{createTime}</TableCell>
                    <TableCell align="center">{pickUpDate}</TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          backgroundColor:
                            status === "PICKED_UP"
                              ? "green"
                              : status === "CANCELLED"
                                ? "red"
                                : "orange",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          display: "inline-block",
                        }}
                      >
                        {status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <Box marginTop={2} textAlign="right">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteSelected}
                disabled={selectedOrders.length === 0}
              >
                선택 삭제
              </Button>
            </Box>
          </Table>
        </TableContainer>
      )}

      <PageComponent
        pageResponse={pageResponse}
      />
    </Box>
  );
}

export default OrderListComponent;
