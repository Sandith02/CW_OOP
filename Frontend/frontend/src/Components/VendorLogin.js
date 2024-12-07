import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const message = await response.text();
        localStorage.setItem("vendorUsername", username); // Save session
        alert(message);
        navigate("/vendor-dashboard"); // Redirect to dashboard
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vendor Login</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "200px" }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "200px" }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          margin: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/vendor-register")}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default VendorLogin;
