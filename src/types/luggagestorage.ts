export interface LuggageStorage {
  lsno: number;
  storageSpotName: string;
  email: string;
  storageDate: string;
  storedUntil: string;
  status: 'PENDING' | 'APPROVED' | 'STORED' | 'RELEASED';
}
