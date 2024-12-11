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
  Checkbox,
} from "@mui/material";
import PageComponent from "../../components/Page/PageComponent";
import { OrderListDTO } from "../../types/order";
import { fetchOrderList } from "../../api/orderAPI";
import { useNavigate } from "react-router-dom";
import { PageRequestDTO, PageResponseDTO } from '../../types/page';

const initialPageRequest: PageRequestDTO = {
  page: 1,
  size: 10,
};

const initialPageResponse: PageResponseDTO<OrderListDTO> = {
  dtoList: [],
  current: 1,
  next: false,
  nextPage: 0,
  pageNumList: [],
  pageRequestDTO: initialPageRequest,
  prev: false,
  prevPage: 0,
  totalCount: 0,
  totalPage: 0,
};

function OrderListComponent() {
  const navigate = useNavigate();
  const [pageResponse, setPageResponse] = useState<PageResponseDTO<OrderListDTO>>(initialPageResponse);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetchOrderList({ ...initialPageRequest, page: currentPage - 1 });
        setPageResponse(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const moveToRead = (ono: number) => {
    navigate(`/app/ord/read/${ono}`);
  };

  const handleCheckboxChange = (ono: number) => {
    setSelectedOrders((prev) =>
      prev.includes(ono) ? prev.filter((id) => id !== ono) : [...prev, ono]
    );
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
                <TableCell align="center">회원</TableCell>
                <TableCell align="center">총 수량</TableCell>
                <TableCell align="center">총 가격</TableCell>
                <TableCell align="center">주문일</TableCell>
                <TableCell align="center">픽업일</TableCell>
                <TableCell align="center">지점</TableCell>
                <TableCell align="center">상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageResponse.dtoList.map((order) => {
                const { ono, email, totalAmount, totalPrice, createTime, pickUpDate, spno, status } = order;

                return (
                  <TableRow
                    key={ono}
                    onClick={(e: React.MouseEvent<HTMLTableRowElement>) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName !== "INPUT") moveToRead(ono); // 태그 이름으로 체크
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="center">
                      <Checkbox
                        checked={selectedOrders.includes(ono)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.stopPropagation(); // Prevents row click when checkbox is clicked
                          handleCheckboxChange(ono);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{ono}</TableCell>
                    <TableCell align="center">{email}</TableCell>
                    <TableCell align="center">{totalAmount}개</TableCell>
                    <TableCell align="center">{totalPrice.toLocaleString()}원</TableCell>
                    <TableCell align="center">{createTime}</TableCell>
                    <TableCell align="center">{pickUpDate}</TableCell>
                    <TableCell align="center">{spno}</TableCell>
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
          </Table>
        </TableContainer>
      )}

      <PageComponent
        pageResponse={pageResponse}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </Box>
  );
}

export default OrderListComponent;
