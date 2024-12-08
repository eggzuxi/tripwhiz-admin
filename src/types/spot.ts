export interface Spot {
  spno: number;
  spotname: string;
  address: string;
  tel: string;
  latitude?: number;
  longitude?: number;
  sno: number;
  sname: string;

}

export interface PageResponseDTO<T> {
  dtoList: T[];
  pageNumList: number[];
  prev: boolean;
  next: boolean;
  totalCount: number;
  totalPage: number;
  current: number;
}
