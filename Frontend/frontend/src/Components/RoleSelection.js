import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "Vendor") {
      navigate("/vendor-login"); // Redirect to vendor login
    } else if (role === "Customer") {
      navigate("/customer-login"); // Redirect to customer login
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Ticketing System</h1>
      <p>Please select your role:</p>
      <button
        style={{
          padding: "10px 20px",
          margin: "20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
        onClick={() => handleRoleSelect("Vendor")}
      >
        I am a Vendor
      </button>
      <button
        style={{
          padding: "10px 20px",
          margin: "20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
        onClick={() => handleRoleSelect("Customer")}
      >
        I am a Customer
      </button>
    </div>
  );
};

export default RoleSelection;
