import jwtAxios from "../util/jwtUtil";
import { Member } from "../types/member";

export const getMembers = async (): Promise<Member[]> => {
  try {
    const response = await jwtAxios.get("/admin/member/list");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    throw error;
  }
};
