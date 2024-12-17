import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLuggageStorageDetails, updateLuggageStorageStatus } from "../../api/luggageStorageApi";
import { sendTestNotification } from "../../api/fcmAPI"; // FCM 알림 전송 API 추가
import useAuthStore from "../../AuthState";
import { LuggageStorage } from "../../types/luggagestorage";

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
      alert("상세 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  // 상태 변경과 FCM 알림 전송
  const handleStatusChange = async (status: string) => {
    if (!lsno || !luggageStorage?.email) return;

    try {
      await updateLuggageStorageStatus(Number(lsno), status);

      // 상태에 따라 FCM 알림 메시지 설정
      const notificationTitle = "수화물 보관 상태 변경";
      const notificationBody =
        status === "APPROVED"
          ? "수화물 보관이 승인되었습니다."
          : status === "STORED"
            ? "수화물이 보관되었습니다."
            : "수화물 보관이 완료되었습니다.";

      // FCM 알림 전송 API 호출
      await sendTestNotification(luggageStorage.email, notificationBody, true);

      alert(`상태가 ${status}로 업데이트되었고 알림이 전송되었습니다.`);
      fetchLuggageStorageDetail();
    } catch (error) {
      console.error("상태 변경 중 오류 발생:", error);
      alert("상태 변경 또는 알림 전송 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (storeowner?.accessToken) {
      fetchLuggageStorageDetail();
    } else {
      alert("점주로 로그인되어 있지 않습니다.");
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
      <button onClick={() => handleStatusChange("APPROVED")}>승인</button>
      <button onClick={() => handleStatusChange("STORED")}>보관 중</button>
      <button onClick={() => handleStatusChange("RELEASED")}>보관 완료</button>
    </div>
  );
};

export default LuggageStorageDetail;
