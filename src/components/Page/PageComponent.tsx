import { ReactElement } from "react";
import { PageResponseDTO } from "../../types/page";
import { Box, Button } from "@mui/material";

interface Props {
  pageResponse: PageResponseDTO<any>; // PageResponseDTO 타입 사용
  onPageChange: (pageNum: number) => void; // 페이지 변경 핸들러 추가
}

const PageComponent = ({ pageResponse, onPageChange }: Props): ReactElement => {
  const { current, pageNumList, next, prev } = pageResponse; // 수정된 필드 이름 사용

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      {/* Prev 버튼 */}
      {prev && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onPageChange(current - 1)}
          sx={{ marginX: 1 }}
        >
          Prev
        </Button>
      )}

      {/* 페이지 번호 버튼 */}
      {pageNumList.map((num) => (
        <Button
          key={num}
          variant={num === current ? "contained" : "outlined"} // 현재 페이지는 강조
          color={num === current ? "primary" : "inherit"}
          onClick={() => onPageChange(num)}
          sx={{ marginX: 1 }}
        >
          {num}
        </Button>
      ))}

      {/* Next 버튼 */}
      {next && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onPageChange(current + 1)}
          sx={{ marginX: 1 }}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default PageComponent;
