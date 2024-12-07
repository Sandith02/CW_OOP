import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./Components/RoleSelection";
import VendorLogin from "./Components/VendorLogin";
import VendorRegister from "./Components/VendorRegister";
import VendorDashboard from "./Components/VendorDashboard";
import CustomerLogin from "./Components/CustomerLogin";
import CustomerRegister from "./Components/CustomerRegister";
import CustomerDashboard from "./Components/CustomerDashboard";

const App = () => {
  console.log("RoleSelection:", RoleSelection);
  console.log("VendorLogin:", VendorLogin);
  console.log("VendorRegister:", VendorRegister);
  console.log("VendorDashboard:", VendorDashboard);
  console.log("CustomerLogin:", CustomerLogin);
  console.log("CustomerRegister:", CustomerRegister);
  console.log("CustomerDashboard:", CustomerDashboard);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-register" element={<VendorRegister />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
