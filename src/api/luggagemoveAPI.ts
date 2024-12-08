import jwtAxios from "../util/jwtUtil";

// ===== Luggage Move 관련 API =====


export const createLuggageMove = async (data: any) => {
  try {
    const response = await jwtAxios.post('/storeowner/luggagemove/create', data);
    console.log('Luggage Move Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create luggage move:', error);
    throw error;
  }
};


export const getLuggageMoveDetails = async (lmno: number) => {
  try {
    const response = await jwtAxios.get(`/storeowner/luggagemove/list/${lmno}`);
    console.log('Luggage Move Details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch luggage move details:', error);
    throw error;
  }
};


export const getAllLuggageMoves = async () => {
  try {
    const response = await jwtAxios.get('/storeowner/luggagemove/list');
    console.log('All Luggage Moves:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch luggage moves:', error);
    throw error;
  }
};


export const updateLuggageMoveStatus = async (lmno: number, status: string) => {
  try {
    const response = await jwtAxios.put(`/storeowner/luggagemove/${lmno}/status`, null, {
      params: { status },
    });
    console.log('Updated Luggage Move Status:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update luggage move status:', error);
    throw error;
  }
};
