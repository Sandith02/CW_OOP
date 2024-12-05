import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./Components/RoleSelection";
import VendorPage from "./Components/VendorPage";
import CustomerPage from "./Components/CustomerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/customer" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
