import { handleError } from "../util/errorHandler";
import useAuthStore from "../AuthState";
import jwtAxios from "../util/jwtUtil";
import { IStoreOwner } from "../types/storeOwner";

// StoreOwner 생성
export const createStoreOwner = async (storeOwner: IStoreOwner): Promise<IStoreOwner> => {
    try {
        const { admin } = useAuthStore.getState();
        if (!admin || !admin.accessToken) {
            throw new Error("권한이 없습니다. 관리자 계정으로 로그인하세요.");
        }

        console.log("Creating StoreOwner:", storeOwner);
        const res = await jwtAxios.post("/admin/manager/createStoreOwner", storeOwner);
        console.log("StoreOwner created successfully:", res.data);
        return res.data;
    } catch (error) {
        handleError(error, "StoreOwner 생성");
    }
};

// StoreOwner 목록 가져오기
export const getStoreOwners = async (): Promise<IStoreOwner[]> => {
    try {
        const { admin } = useAuthStore.getState();
        if (!admin || !admin.accessToken) {
            throw new Error("권한이 없습니다. 관리자 계정으로 로그인하세요.");
        }

        console.log("Fetching StoreOwners");
        const res = await jwtAxios.get("/admin/storeOwners");
        console.log("StoreOwners fetched successfully:", res.data);
        return res.data || [];
    } catch (error) {
        handleError(error, "StoreOwner 목록 로드");
    }
};

// StoreOwner 삭제
export const deleteStoreOwner = async (sno: number): Promise<void> => {
    try {
        const { admin } = useAuthStore.getState();
        if (!admin || !admin.accessToken) {
            throw new Error("권한이 없습니다. 관리자 계정으로 로그인하세요.");
        }

        console.log(`Deleting StoreOwner with sno: ${sno}`);
        await jwtAxios.delete(`/admin/storeOwner/${sno}`);
        console.log("StoreOwner deleted successfully");
    } catch (error) {
        handleError(error, "StoreOwner 삭제");
    }
};
