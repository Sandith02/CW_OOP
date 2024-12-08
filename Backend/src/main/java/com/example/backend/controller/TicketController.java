package com.example.backend.controller;

import com.example.backend.model.Ticket;
import com.example.backend.model.Vendor;
import com.example.backend.repository.TicketRepository;
import com.example.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private LoginController loginController;

    // Retrieve tickets for the logged-in vendor
    @GetMapping
    public ResponseEntity<?> getTicketsForLoggedInVendor() {
        String loggedInVendorUsername = loginController.getLoggedInVendor();
        if (loggedInVendorUsername == null) {
            return ResponseEntity.status(401).body("Unauthorized: No vendor is logged in.");
        }

        Optional<Vendor> vendor = vendorRepository.findByUsername(loggedInVendorUsername);
        if (vendor.isEmpty()) {
            return ResponseEntity.status(404).body("Vendor not found.");
        }

        List<Ticket> tickets = ticketRepository.findTicketsByVendorId(vendor.get().getId());
        return ResponseEntity.ok(tickets);
    }

    // Create a new ticket
    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket) {
        String loggedInVendorUsername = loginController.getLoggedInVendor();
        if (loggedInVendorUsername == null) {
            return ResponseEntity.status(401).body("Unauthorized: No vendor is logged in.");
        }

        Optional<Vendor> vendor = vendorRepository.findByUsername(loggedInVendorUsername);
        if (vendor.isEmpty()) {
            return ResponseEntity.status(404).body("Vendor not found.");
        }

        ticket.setVendor(vendor.get()); // Associate the ticket with the logged-in vendor
        try {
            Ticket savedTicket = ticketRepository.save(ticket);
            return ResponseEntity.ok(savedTicket);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create ticket: " + e.getMessage());
        }
    }

    // Other methods (update, delete, etc.) remain unchanged


// Update an existing ticket
    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            Ticket existingTicket = ticket.get();
            existingTicket.setStatus(ticketDetails.getStatus());
            existingTicket.setPurchaseTime(ticketDetails.getPurchaseTime());
            return ResponseEntity.ok(ticketRepository.save(existingTicket));
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a ticket
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            ticketRepository.delete(ticket.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
