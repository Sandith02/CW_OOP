package com.example.backend.controller;

import com.example.backend.model.Ticket;
import com.example.backend.repository.TicketRepository;
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
    private LoginController loginController; // Access login session

    // Check if vendor is logged in
    private boolean isLoggedIn() {
        return loginController.getLoggedInVendor() != null;
    }

    // Retrieve all tickets
    @GetMapping
    public ResponseEntity<?> getAllTickets() {
        if (!isLoggedIn()) {
            return ResponseEntity.status(401).body("Unauthorized: Please log in.");
        }
        return ResponseEntity.ok(ticketRepository.findAll());
    }

    // Retrieve a ticket by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable Long id) {
        if (!isLoggedIn()) {
            return ResponseEntity.status(401).body("Unauthorized: Please log in.");
        }
        Optional<Ticket> ticket = ticketRepository.findById(id);
        return ticket.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new ticket
    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket) {
        if (!isLoggedIn()) {
            return ResponseEntity.status(401).body("Unauthorized: Please log in.");
        }
        return ResponseEntity.ok(ticketRepository.save(ticket));
    }

    // Update an existing ticket
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
        if (!isLoggedIn()) {
            return ResponseEntity.status(401).body("Unauthorized: Please log in.");
        }
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            Ticket existingTicket = ticket.get();
            existingTicket.setStatus(ticketDetails.getStatus());
            existingTicket.setPurchaseTime(ticketDetails.getPurchaseTime());
            return ResponseEntity.ok(ticketRepository.save(existingTicket));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a ticket
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        if (!isLoggedIn()) {
            return ResponseEntity.status(401).body("Unauthorized: Please log in.");
        }
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            ticketRepository.delete(ticket.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
