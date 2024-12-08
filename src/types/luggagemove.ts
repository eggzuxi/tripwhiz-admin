export interface LuggageMove {
  lmno: number;
  sourceSpotName: string;
  destinationSpotName: string;
  email: string;
  qrCodePath: string;
  moveDate: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'IN_TRANSIT' | 'DELIVERED';
}
