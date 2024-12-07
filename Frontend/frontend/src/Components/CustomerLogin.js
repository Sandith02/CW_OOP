import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Both username and password are required");
      return;
    }

    setLoading(true); // Start loading
    setErrorMessage(""); // Clear previous errors
    try {
      const response = await fetch("http://localhost:8080/api/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("customerId", result.customerId); // Save session
        alert("Login Successful!");
        navigate("/customer-dashboard"); // Redirect to dashboard
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Customer Login</h1>
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
        disabled={loading} // Disable button during loading
        style={{
          padding: "10px 20px",
          margin: "10px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: loading ? "#ccc" : "initial",
        }}
      >
        {loading ? "Logging in..." : "Login"} {/* Show loading text */}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/customer-register")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register Here
        </span>
      </p>
    </div>
  );
};

export default CustomerLogin;
