import jwtAxios from "../util/jwtUtil";
import { IAdmin, ICreateAdmin } from '../types/admin';
import { handleError } from "../util/errorHandler";

// Admin 생성
export const createAdmin = async (adminData: ICreateAdmin): Promise<IAdmin> => {
    try {
        const res = await jwtAxios.post("/admin/register", adminData);
        return res.data;
    } catch (error) {
        handleError(error, "Admin 생성");
        throw error;
    }
};

// Admin 목록 조회
export const getAdmins = async (): Promise<IAdmin[]> => {
    try {
        console.log("Fetching Admins");
        const res = await jwtAxios.get("/admin/admins");
        console.log("Admins fetched successfully:", res.data);
        return res.data || [];
    } catch (error) {
        handleError(error, "Admin 목록 로드");
    }
};
