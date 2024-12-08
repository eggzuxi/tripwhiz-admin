import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLuggageMoveDetails, updateLuggageMoveStatus } from '../../api/luggagemoveAPI';
import useAuthStore from '../../AuthState';
import { LuggageMove } from '../../types/luggagemove';

const LuggageMoveDetail: React.FC = () => {
  const { lmno } = useParams<{ lmno: string }>();
  const [luggageMove, setLuggageMove] = useState<LuggageMove | null>(null);
  const { storeowner } = useAuthStore();

  const fetchLuggageMoveDetail = async () => {
    if (!lmno) return;

    try {
      const data = await getLuggageMoveDetails(Number(lmno));
      setLuggageMove(data);
    } catch (error) {
      console.error(error);
      alert('상세 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!lmno) return;

    try {
      await updateLuggageMoveStatus(Number(lmno), status);
      alert(`상태가 ${status}로 업데이트되었습니다.`);
      fetchLuggageMoveDetail();
    } catch (error) {
      console.error(error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (storeowner?.accessToken) {
      fetchLuggageMoveDetail();
    } else {
      alert('점주로 로그인되어 있지 않습니다.');
    }
  }, [storeowner?.accessToken]);

  if (!luggageMove) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <h1>수화물 이동 상세보기</h1>
      <p>출발: {luggageMove.sourceSpotName} ➔ 도착: {luggageMove.destinationSpotName}</p>
      <p>상태: {luggageMove.status}</p>
      <p>요청 날짜: {luggageMove.moveDate}</p>
      <p>출발 날짜: {luggageMove.startDate}</p>
      <p>도착 날짜: {luggageMove.endDate}</p>
      <button onClick={() => handleStatusChange('APPROVED')}>승인</button>
      <button onClick={() => handleStatusChange('IN_TRANSIT')}>이동 중</button>
      <button onClick={() => handleStatusChange('DELIVERED')}>도착 완료</button>
    </div>
  );
};

export default LuggageMoveDetail;
