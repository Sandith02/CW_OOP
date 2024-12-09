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
      <h1>simpleEvents</h1>
      <div className="subTitle1">
         - Welcome to My Minimal Ticketing Portal -
      </div>
      <div className="subTitle2">
        Please select your role
      </div>
      <div className="role-selection-buttons">
        <button
          className="btn1"
          onClick={() => handleRoleSelect("Vendor")}
        >
          Vendor
        </button>
        <button
          className="btn2"
          onClick={() => handleRoleSelect("Customer")}
        >
          Customer
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
