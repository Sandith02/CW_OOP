import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/customer-login"); // Redirect to login page
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Customer Register</h1>
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
        onClick={handleRegister}
        style={{
          padding: "10px 20px",
          margin: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/customer-login")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login Here
        </span>
      </p>
    </div>
  );
};

export default CustomerRegister;
