import React, { useEffect, useState } from 'react';
import { getAllLuggageMoves } from '../../api/luggagemoveAPI';
import useAuthStore from '../../AuthState';
import { LuggageMove } from '../../types/luggagemove';
import { useNavigate } from 'react-router-dom';

const LuggageMoveList: React.FC = () => {
  const [luggageMoves, setLuggageMoves] = useState<LuggageMove[]>([]);
  const { storeowner } = useAuthStore();
  const navigate = useNavigate();

  // 권한 및 토큰 확인 로그
  console.log('Current storeowner state:', storeowner);

  console.log('------------------------------------------')


  console.log('Access Token:', storeowner?.accessToken);

  const fetchLuggageMoves = async () => {
    try {
      const data = await getAllLuggageMoves();
      setLuggageMoves(data);
    } catch (error) {
      console.error('수화물 이동 목록 오류:', error);
      alert('수화물 이동 목록을 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (storeowner?.accessToken) {
      fetchLuggageMoves();
    } else {
      alert('점주로 로그인되어 있지 않습니다.');
    }
  }, [storeowner?.accessToken]);

  return (
    <div>
      <h1>수화물 이동 목록</h1>
      <ul>
        {luggageMoves.map((move) => (
          <li key={move.lmno} style={{ marginBottom: '1rem' }}>
            <p>출발: {move.sourceSpotName} ➔ 도착: {move.destinationSpotName}</p>
            <p>상태: {move.status}</p>
            <button onClick={() => navigate(`/luggagemove/${move.lmno}`)}>상세보기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LuggageMoveList;
