import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ status: "AVAILABLE" });
  const [editTicket, setEditTicket] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Fetch all tickets from backend
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/tickets");
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        const error = await response.text();
        console.error("Failed to fetch tickets:", error);
        alert("Error fetching tickets: " + error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Create a new ticket
  const createTicket = async () => {
    if (!newTicket.status || newTicket.status.trim() === "") {
      alert("Please enter a valid ticket status.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      if (response.ok) {
        alert("Ticket created successfully!");
        fetchTickets(); // Refresh tickets
        setNewTicket({ status: "AVAILABLE" }); // Reset new ticket form
      } else {
        const error = await response.text();
        alert("Failed to create ticket: " + error);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing ticket
  const updateTicket = async (ticketId) => {
    if (!editTicket.status || editTicket.status.trim() === "") {
      alert("Please enter a valid ticket status.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTicket),
      });

      if (response.ok) {
        alert("Ticket updated successfully!");
        fetchTickets(); // Refresh tickets
        setEditTicket(null); // Reset edit form
      } else {
        const error = await response.text();
        alert("Failed to update ticket: " + error);
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a ticket
  const deleteTicket = async (ticketId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/tickets/${ticketId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Ticket deleted successfully!");
        fetchTickets(); // Refresh tickets
      } else {
        const error = await response.text();
        alert("Failed to delete ticket: " + error);
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
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
        const error = await response.text();
        alert("Failed to log out: " + error);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Ensure vendor is logged in
  useEffect(() => {
    const username = localStorage.getItem("vendorUsername");
    if (!username) {
      alert("Please log in to access the dashboard.");
      navigate("/vendor-login");
    } else {
      fetchTickets();
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vendor Dashboard</h1>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Create Ticket */}
      <div>
        <h2>Create Ticket</h2>
        <input
          type="text"
          placeholder="Ticket Status (e.g., AVAILABLE)"
          value={newTicket.status}
          onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
          style={{ margin: "10px", padding: "5px", width: "200px" }}
        />
        <button onClick={createTicket} style={{ padding: "10px", cursor: "pointer" }}>
          Create Ticket
        </button>
      </div>

      {/* Display Tickets */}
      <div>
        <h2>All Tickets</h2>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <strong>Status:</strong> {ticket.status}
              <button
                onClick={() => setEditTicket(ticket)}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTicket(ticket.id)}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Ticket */}
      {editTicket && (
        <div>
          <h2>Edit Ticket</h2>
          <input
            type="text"
            value={editTicket.status}
            onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value })}
            style={{ margin: "10px", padding: "5px", width: "200px" }}
          />
          <button
            onClick={() => updateTicket(editTicket.id)}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Update Ticket
          </button>
          <button
            onClick={() => setEditTicket(null)}
            style={{ padding: "10px", cursor: "pointer", marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "30px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default VendorDashboard;
