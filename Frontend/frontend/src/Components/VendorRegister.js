import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/vendor-login");
        }, 2000); // Redirect to login page after 2 seconds
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vendor Registration</h1>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
            margin: "10px",
          }}
        >
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
      <button
        onClick={() => navigate("/vendor-login")}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          margin: "10px",
        }}
      >
        Back to Login
      </button>
    </div>
  );
};

export default VendorRegister;
