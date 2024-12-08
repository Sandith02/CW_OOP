import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/RoleSelection.css";

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
    <div className="role-selection">
      <h1>Welcome to the Ticketing System</h1>
      <p>Please select your role to proceed:</p>
      <div className="role-selection-buttons">
        <button
          className="role-selection-button vendor"
          onClick={() => handleRoleSelect("Vendor")}
        >
          I am a Vendor
        </button>
        <button
          className="role-selection-button customer"
          onClick={() => handleRoleSelect("Customer")}
        >
          I am a Customer
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
