import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router 사용

function LoginComponent() {
    const [credentials, setCredentials] = useState({ id: '', pw: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate 훅으로 리다이렉트 처리

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include', // 쿠키를 함께 보낼 경우 사용
            });

            if (response.ok) {
                const text = await response.text();
                if (text) {
                    try {
                        const data = JSON.parse(text);
                        if (data.accessToken && data.refreshToken) {
                            // accessToken과 refreshToken을 localStorage에 저장
                            localStorage.setItem('accessToken', data.accessToken);
                            localStorage.setItem('refreshToken', data.refreshToken);

                            alert('Login successful!');
                            navigate('/'); // 로그인 성공 시 메인 페이지로 이동
                        } else {
                            setError('Token not found in server response.');
                        }
                    } catch {
                        setError('Failed to parse server response.');
                    }
                } else {
                    setError('Server returned an empty response.');
                }
            } else {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    setError(errorData.msg || 'Login failed');
                } catch {
                    setError(errorText || 'Login failed');
                }
            }
        } catch (err) {
            console.error('Error during fetch:', err);
            setError('Network error: Unable to connect to the server.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        name="id"
                        value={credentials.id}
                        onChange={handleChange}
                        placeholder="ID"
                        style={{ padding: '0.5rem', width: '100%' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="password"
                        name="pw"
                        value={credentials.pw}
                        onChange={handleChange}
                        placeholder="Password"
                        style={{ padding: '0.5rem', width: '100%' }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginComponent;
