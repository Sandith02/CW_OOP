import React from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("vendorUsername"); // Clear session
        alert("Logged out successfully!");
        navigate("/");
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Vendor Dashboard</h1>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          margin: "20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default VendorDashboard;
