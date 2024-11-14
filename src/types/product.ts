
export interface IProduct {
  pno: number,
  pname: string,
  price: number,
  pdesc: string,
  category: string,
  subcategory: string,
  themecategory: string,
  fileName?: string,
  delflag: boolean
}