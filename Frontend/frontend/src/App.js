import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./Components/Loading";
import RoleSelection from "./Components/RoleSelection";
import VendorLogin from "./Components/VendorLogin";
import VendorRegister from "./Components/VendorRegister";
import VendorDashboard from "./Components/VendorDashboard";
import CustomerLogin from "./Components/CustomerLogin";
import CustomerRegister from "./Components/CustomerRegister";
import CustomerDashboard from "./Components/CustomerDashboard";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default App;
