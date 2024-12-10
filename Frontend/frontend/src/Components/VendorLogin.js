import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/VendorLogin.css"; // Import the external CSS file

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

    <div className="container">
      <div className="title">Vendor Login</div>
      <div className="fields">
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      </div>
      <button onClick={handleLogin} className="animated-button">
  <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
  <span className="text">Login</span>
  <span className="circle"></span>
  <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
</button>
{errorMessage && <p className="errorMessage">{errorMessage}</p>}
<p className="message">
  Don't have an account?{" "}
  <button
    onClick={() => navigate("/vendor-register")}
    className="register-link"
  >
    Register here
  </button>
</p>

    </div>
  );
};

export default VendorLogin;
