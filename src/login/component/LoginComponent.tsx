import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../AuthState";
import { login, LoginResponse } from "../../api/authAPI";
import { IAdmin } from "../../types/admin";
import { IStoreOwner } from "../../types/storeOwner";

function LoginComponent() {
  const [credentials, setCredentials] = useState({ id: "", pw: "", role: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAdmin, setStoreowner, logoutAdmin, logoutStoreowner } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data: LoginResponse = await login(credentials.id, credentials.pw, credentials.role);

      if (data.accessToken && data.refreshToken) {
        if (credentials.role === "ADMIN") {
          logoutStoreowner(); // 점주 상태 초기화
          const adminData = data as IAdmin;
          setAdmin(adminData.aname, adminData.id, adminData.accessToken, adminData.refreshToken);
        } else if (credentials.role === "STOREOWNER") {
          logoutAdmin(); // 관리자 상태 초기화
          const storeOwnerData = data as IStoreOwner;
          setStoreowner(storeOwnerData.sname, storeOwnerData.id, storeOwnerData.accessToken, storeOwnerData.refreshToken);
        }
        alert("Login successful!");
        navigate("/app");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            name="id"
            value={credentials.id}
            onChange={handleChange}
            placeholder="ID"
            style={{ padding: "0.5rem", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            name="pw"
            value={credentials.pw}
            onChange={handleChange}
            placeholder="Password"
            style={{ padding: "0.5rem", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <select
            name="role"
            value={credentials.role}
            onChange={handleChange}
            style={{ padding: "0.5rem", width: "100%" }}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="ADMIN">Admin</option>
            <option value="STOREOWNER">Store Owner</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={handleSignUp}
        style={{
          padding: "0.5rem 1rem",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Sign Up
      </button>
    </div>
  );
}

export default LoginComponent;
