import React, { useState } from "react";

const VendorPage = () => {
  // State for tickets and error messages
  const [totalTickets, setTotalTickets] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle adding tickets
  const handleAddTickets = () => {
    const ticketsToAdd = parseInt(inputValue, 10);

    // Input validation
    if (isNaN(ticketsToAdd) || ticketsToAdd <= 0) {
      setErrorMessage("Please enter a positive number!");
      return;
    }

    // Update the total tickets and clear input
    setTotalTickets(totalTickets + ticketsToAdd);
    setInputValue("");
    setErrorMessage(""); // Clear the error message
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vendor Dashboard</h1>
      <p>Total Tickets Available: <strong>{totalTickets}</strong></p>

      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter number of tickets"
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
            width: "200px",
          }}
        />
        <button
          onClick={handleAddTickets}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add Tickets
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default VendorPage;
