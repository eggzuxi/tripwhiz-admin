import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../../api/adminAPI";
import { ICreateAdmin } from '../../types/admin';

function SignUpComponent() {
    const [adminData, setAdminData] = useState<ICreateAdmin>({
        aname: "",
        id: "",
        pw: "",
        role: "ADMIN",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createAdmin(adminData);
            setSuccess("Admin registered successfully!");
            setError(null);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            setError(err.message || "Admin registration failed");
            setSuccess(null);
        }
    };

    return (
      <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
          <h2>Admin Registration</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                  <input
                    type="text"
                    name="aname"
                    value={adminData.aname}
                    onChange={handleChange}
                    placeholder="Name"
                    style={{ padding: "0.5rem", width: "100%" }}
                    required
                  />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                  <input
                    type="text"
                    name="id"
                    value={adminData.id}
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
                    value={adminData.pw}
                    onChange={handleChange}
                    placeholder="Password"
                    style={{ padding: "0.5rem", width: "100%" }}
                    required
                  />
              </div>
              <button
                type="submit"
                style={{
                    padding: "0.5rem 1rem",
                    background: "green",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                }}
              >
                  Sign Up
              </button>
          </form>
      </div>
    );
}

export default SignUpComponent;
