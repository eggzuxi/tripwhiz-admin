import React, { useEffect, useState } from 'react';
import { getAllLuggageStorages } from '../../api/luggageStorageApi';
import useAuthStore from '../../AuthState';
import { LuggageStorage } from '../../types/luggagestorage';
import { useNavigate } from 'react-router-dom';

const LuggageStorageList: React.FC = () => {
  const [luggageStorages, setLuggageStorages] = useState<LuggageStorage[]>([]);
  const { storeowner } = useAuthStore();
  const navigate = useNavigate();

  const fetchLuggageStorages = async () => {
    try {
      const data = await getAllLuggageStorages();
      setLuggageStorages(data);
    } catch (error) {
      console.error('수화물 보관 목록 오류:', error);
      alert('수화물 보관 목록을 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (storeowner?.accessToken) {
      fetchLuggageStorages();
    } else {
      alert('점주로 로그인되어 있지 않습니다.');
    }
  }, [storeowner?.accessToken]);

  return (
    <div>
      <h1>수화물 보관 목록</h1>
      <ul>
        {luggageStorages.map((storage) => (
          <li key={storage.lsno} style={{ marginBottom: '1rem' }}>
            <p>지점: {storage.storageSpotName}</p>
            <p>상태: {storage.status}</p>
            <button onClick={() => navigate(`/luggagestorage/${storage.lsno}`)}>상세보기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LuggageStorageList;
