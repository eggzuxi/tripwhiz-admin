import { ReactElement } from "react";
import { IPageResponse } from "../../types/order";
import { Box, Button } from "@mui/material";

interface Props {
  pageResponse: IPageResponse;
}

const PageComponent = ({ pageResponse }: Props): ReactElement => {
  const { current, pageNumList, next, prev } = pageResponse; // 수정된 필드 이름 사용

  const changePage = (pageNum: number) => {
    console.log(`Changing to page: ${pageNum}`);
    // 페이지 변경 로직 (예: URL 파라미터 또는 상태 변경)
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      {/* Prev 버튼 */}
      {prev && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => changePage(current - 1)}
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
          onClick={() => changePage(num)}
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
          onClick={() => changePage(current + 1)}
          sx={{ marginX: 1 }}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default PageComponent;
