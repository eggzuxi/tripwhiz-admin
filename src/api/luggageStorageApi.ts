import jwtAxios from "../util/jwtUtil";

// ===== Luggage Storage 관련 API =====

export const createLuggageStorage = async (data: any) => {
  try {
    const response = await jwtAxios.post('/storeowner/luggagestorage/create', data);
    console.log('Luggage Storage Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create luggage storage:', error);
    throw error;
  }
};

export const getLuggageStorageDetails = async (lsno: number) => {
  try {
    const response = await jwtAxios.get(`/storeowner/luggagestorage/${lsno}`);
    console.log('Luggage Storage Details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch luggage storage details:', error);
    throw error;
  }
};

export const getAllLuggageStorages = async () => {
  try {
    const response = await jwtAxios.get('/storeowner/luggagestorage/list');
    console.log('All Luggage Storages:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch luggage storages:', error);
    throw error;
  }
};

export const updateLuggageStorageStatus = async (lsno: number, status: string) => {
  try {
    const response = await jwtAxios.put(`/storeowner/luggagestorage/${lsno}/status`, null, {
      params: { status },
    });
    console.log('Updated Luggage Storage Status:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update luggage storage status:', error);
    throw error;
  }
};
