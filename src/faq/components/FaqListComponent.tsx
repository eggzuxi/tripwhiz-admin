import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, Divider, Box, CircularProgress, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IFaq, FaqCategory } from '../../../../tripwhiz-admin/src/types/faq';
import { getFaqList, deleteFaq } from '../../../../tripwhiz-admin/src/api/faqAPI';
import { useNavigate } from 'react-router-dom';

const categories: FaqCategory[] = ['APP', '환불', '픽업', '매장', '영수증'];

function FaqListComponent() {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [filterCategory, setFilterCategory] = useState<FaqCategory | '전체'>('전체');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchFaqs = () => {
    setLoading(true);
    getFaqList(currentPage, pageSize, filterCategory === '전체' ? undefined : filterCategory)
      .then((data) => {
        setFaqs(data.dtoList);
        setTotalCount(data.totalCount);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, [currentPage, filterCategory]);

  const handleEdit = (fno: number) => navigate(`/faq/update/${fno}`);

  const handleDelete = (fno: number) => {
    if (window.confirm('이 FAQ를 삭제하시겠습니까?')) {
      setLoading(true);
      deleteFaq(fno).then(fetchFaqs).finally(() => setLoading(false));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilterCategory(e.target.value as FaqCategory | '전체');
    setCurrentPage(1);
  };

  const moveToAddPage = ():void => {
    navigate(`/faq/add`)
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  const getPageButtons = () => {
    const pages = [];
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          variant={currentPage === i ? 'contained' : 'outlined'}
          sx={{ margin: '0 2px' }}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <Box>
      <Typography variant="h1" align="center" marginTop={5} marginBottom={2} fontWeight="bold">
        FAQ TOP 5
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>카테고리</InputLabel>

          <Select value={filterCategory} onChange={handleCategoryChange} label="카테고리">
            <MenuItem value="전체">전체</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={moveToAddPage}
          sx={{
            color: '#FFFFFF',
            borderRadius: '8px',          // 둥근 모서리
            padding: '8px 16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 약간의 그림자
          }}
        >
          ADD
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}

      {!loading && faqs.length > 0 ? (
        faqs.map((faq) => (
          <Card key={faq.fno} style={{ marginBottom: '16px' }}>
            <Box style={{ backgroundColor: '#FCFBF0' }}>
              <CardHeader
                title={`${faq.category} | ${faq.question}`}
                action={
                  <Box display="flex" gap={2}>
                    <Box style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => handleEdit(faq.fno)}>
                      <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                    </Box>
                    <Box style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => handleDelete(faq.fno)}>
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Box>
                  </Box>
                }
              />
            </Box>
            <Divider />
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-content-${faq.fno}`} id={`faq-header-${faq.fno}`}>
                <Typography variant="subtitle1" fontWeight="bold">
                  자세히 보기
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                  A: {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Card>
        ))
      ) : (
        !loading && (
          <Typography align="center" marginTop={2}>
            FAQ가 없습니다.
          </Typography>
        )
      )}

      <Box display="flex" justifyContent="center" marginTop={2}>
        {currentPage > 10 && (
          <Button onClick={() => setCurrentPage(currentPage - 10)}>이전</Button>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>{getPageButtons()}</Box>

        {currentPage + 10 <= totalPages && (
          <Button onClick={() => setCurrentPage(currentPage + 10)}>다음</Button>
        )}
      </Box>
    </Box>
  );
}

export default FaqListComponent;
