import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./Components/RoleSelection";
import VendorLogin from "./Components/VendorLogin";
import VendorRegister from "./Components/VendorRegister";
import VendorDashboard from "./Components/VendorDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-register" element={<VendorRegister />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
