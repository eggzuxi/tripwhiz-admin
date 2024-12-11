import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLuggageStorageDetails, updateLuggageStorageStatus } from '../../api/luggageStorageApi';
import useAuthStore from '../../AuthState';
import { LuggageStorage } from '../../types/luggagestorage';

const LuggageStorageDetail: React.FC = () => {
  const { lsno } = useParams<{ lsno: string }>();
  const [luggageStorage, setLuggageStorage] = useState<LuggageStorage | null>(null);
  const { storeowner } = useAuthStore();

  const fetchLuggageStorageDetail = async () => {
    if (!lsno) return;

    try {
      const data = await getLuggageStorageDetails(Number(lsno));
      setLuggageStorage(data);
    } catch (error) {
      console.error(error);
      alert('상세 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!lsno) return;

    try {
      await updateLuggageStorageStatus(Number(lsno), status);
      alert(`상태가 ${status}로 업데이트되었습니다.`);
      fetchLuggageStorageDetail();
    } catch (error) {
      console.error(error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (storeowner?.accessToken) {
      fetchLuggageStorageDetail();
    } else {
      alert('점주로 로그인되어 있지 않습니다.');
    }
  }, [storeowner?.accessToken]);

  if (!luggageStorage) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <h1>수화물 보관 상세보기</h1>
      <p>지점: {luggageStorage.storageSpotName}</p>
      <p>상태: {luggageStorage.status}</p>
      <p>보관 시작 날짜: {luggageStorage.storageDate}</p>
      <p>보관 종료 날짜: {luggageStorage.storedUntil}</p>
      <button onClick={() => handleStatusChange('APPROVED')}>승인</button>
      <button onClick={() => handleStatusChange('STORED')}>보관 중</button>
      <button onClick={() => handleStatusChange('RELEASED')}>보관 완료</button>
    </div>
  );
};

export default LuggageStorageDetail;
