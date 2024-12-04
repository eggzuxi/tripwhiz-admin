import { IAdmin } from '../types/admin'; // IAdmin 타입 임포트
import axios from 'axios';

// localhost
const host = 'http://localhost:8082/api';

// 관리자 생성
export const createAdmin = async (admin: IAdmin): Promise<IAdmin> => {
    try {
        // 필수 값 검증
        if (!admin.id || !admin.pw || !admin.role) {
            throw new Error('ID, Password, and Role are required.');
        }

        const res = await axios.post(`${host}/admin/register`, admin, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Created Admin Data:', res.data);
        return res.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            console.error('Validation failed:', error.response.data);
        } else {
            console.error('Error creating admin:', error.message || error);
        }
        throw error;
    }
};
