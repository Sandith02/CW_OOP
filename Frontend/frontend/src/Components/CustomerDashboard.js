import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [tab, setTab] = useState("tickets"); // Current tab ('tickets' or 'history')
  const [availableTickets, setAvailableTickets] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId"); // Retrieve customerId from localStorage

  // Fetch Available Tickets
  const fetchAvailableTickets = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/customers/tickets");
      if (response.ok) {
        const data = await response.json();
        setAvailableTickets(data);
      } else {
        setErrorMessage("Failed to fetch available tickets");
      }
    } catch (error) {
      console.error("Error fetching available tickets:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  // Fetch Purchase History
  const fetchPurchaseHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/${customerId}/history`
      );
      if (response.ok) {
        const data = await response.json();
        setPurchaseHistory(data);
      } else {
        setErrorMessage("Failed to fetch purchase history");
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  // Purchase Ticket
  const purchaseTicket = async (ticketId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/tickets/${ticketId}/purchase`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId: parseInt(customerId) }),
        }
      );

      if (response.ok) {
        alert("Ticket purchased successfully!");
        fetchAvailableTickets(); // Refresh tickets
        fetchPurchaseHistory(); // Refresh purchase history
      } else {
        const error = await response.text();
        alert(`Failed to purchase ticket: ${error}`);
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/customers/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("customerId"); // Clear session
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

  // Fetch data on component mount or when tab changes
  useEffect(() => {
    if (tab === "tickets") {
      fetchAvailableTickets();
    } else if (tab === "history") {
      fetchPurchaseHistory();
    }
  }, [tab]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Customer Dashboard</h1>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      {/* Tab Navigation */}
      <div>
        <button
          onClick={() => setTab("tickets")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: tab === "tickets" ? "#ccc" : "#fff",
          }}
        >
          Available Tickets
        </button>
        <button
          onClick={() => setTab("history")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: tab === "history" ? "#ccc" : "#fff",
          }}
        >
          Purchase History
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {tab === "tickets" && (
          <div>
            <h2>Available Tickets</h2>
            {availableTickets.length > 0 ? (
              <ul>
                {availableTickets.map((ticket) => (
                  <li key={ticket.id}>
                    <strong>Ticket ID:</strong> {ticket.id}, <strong>Status:</strong>{" "}
                    {ticket.status}
                    <button
                      onClick={() => purchaseTicket(ticket.id)}
                      style={{
                        padding: "5px 10px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Purchase
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No available tickets.</p>
            )}
          </div>
        )}

        {tab === "history" && (
          <div>
            <h2>Purchase History</h2>
            {purchaseHistory.length > 0 ? (
              <ul>
                {purchaseHistory.map((ticket) => (
                  <li key={ticket.id}>
                    <strong>Ticket ID:</strong> {ticket.id}, <strong>Status:</strong>{" "}
                    {ticket.status}, <strong>Purchase Time:</strong>{" "}
                    {ticket.purchaseTime}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No purchase history found.</p>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default CustomerDashboard;
