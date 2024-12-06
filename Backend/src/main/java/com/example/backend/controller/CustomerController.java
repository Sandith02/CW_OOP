package com.example.backend.controller;

import com.example.backend.model.Customer;
import com.example.backend.model.Ticket;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // Simulate session storage for simplicity
    private static final Map<String, Object> customerSession = new HashMap<>();

    // Customer Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<Customer> customer = customerRepository.findByUsername(username);
        if (customer.isPresent() && customer.get().getPassword().equals(password)) {
            customerSession.put("loggedInCustomer", customer.get());
            return ResponseEntity.ok(Map.of("message", "Login successful!", "customerId", customer.get().getId()));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // Customer Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        if (customerSession.containsKey("loggedInCustomer")) {
            customerSession.remove("loggedInCustomer");
            return ResponseEntity.ok("Logout successful!");
        }
        return ResponseEntity.badRequest().body("No customer is currently logged in.");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        if (customerRepository.findByUsername(customer.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }
        customerRepository.save(customer);
        return ResponseEntity.ok("Customer registered successfully!");
    }

    // View all available tickets
    @GetMapping("/tickets")
    public List<Ticket> getAvailableTickets() {
        return ticketRepository.findAvailableTickets();
    }

    // Purchase a ticket
    @PutMapping("/tickets/{id}/purchase")
    public ResponseEntity<String> purchaseTicket(@PathVariable Long id, @RequestBody Map<String, Long> request) {
        Long customerId = request.get("customerId");
        Optional<Customer> customer = customerRepository.findById(customerId);
        Optional<Ticket> ticket = ticketRepository.findById(id);

        if (ticket.isPresent() && customer.isPresent() && "AVAILABLE".equalsIgnoreCase(ticket.get().getStatus())) {
            Ticket purchasedTicket = ticket.get();
            purchasedTicket.setStatus("SOLD");
            purchasedTicket.setCustomer(customer.get());
            ticketRepository.save(purchasedTicket);
            return ResponseEntity.ok("Ticket purchased successfully!");
        }
        return ResponseEntity.badRequest().body("Unable to purchase ticket.");
    }

    // View Purchase History
    @GetMapping("/{customerId}/history")
    public List<Ticket> getPurchaseHistory(@PathVariable Long customerId) {
        return ticketRepository.findByCustomerId(customerId);
    }
}
