import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAdmin } from '../../types/admin';
import { createAdmin } from '../../api/admin';

function SignUpComponent() {
    const [adminData, setAdminData] = useState<IAdmin>({
        ano: 0, // 초기값 설정 (auto-generated 필드일 경우 기본값)
        aname: '',
        id: '',
        pw: '',
        role: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await createAdmin(adminData);

            setSuccess('Admin registration successful!');
            setError(null);
            console.log('Created Admin:', result);

            // 성공 시 2초 후 로그인 페이지로 이동
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            setError(error.message || 'Failed to register admin.');
            setSuccess(null);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', padding: '1rem' }}>
            <h2>Admin Registration</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {success && <p style={{ color: 'green', fontWeight: 'bold' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        name="aname"
                        value={adminData.aname}
                        onChange={handleChange}
                        placeholder="Name"
                        style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        name="id"
                        value={adminData.id}
                        onChange={handleChange}
                        placeholder="ID"
                        style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="password"
                        name="pw"
                        value={adminData.pw}
                        onChange={handleChange}
                        placeholder="Password"
                        style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <select
                        name="role"
                        value={adminData.role}
                        onChange={handleChange}
                        style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="MANAGER">Manager</option>
                    </select>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'green',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUpComponent;
