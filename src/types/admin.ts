//so
export interface IAdmin {
    ano?: number;
    aname: string;
    accessToken?: string;
    refreshToken?: string;
    id: string;
    pw: string;
    role: string;
}
//so
export interface ICreateAdmin {
    aname: string;
    id: string;
    pw: string;
    role: string;
}