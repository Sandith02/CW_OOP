package com.example.backend.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "tickets") // Map this class to the "tickets" table in the database
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment primary key
    private Long id;

    @Column(nullable = false) // "status" is required (cannot be null)
    private String status; // "available" or "sold"

    private Timestamp purchaseTime; // Records when the ticket was purchased (nullable)

    @ManyToOne
    @JoinColumn(name = "customer_id") // Foreign key column in the "tickets" table
    private Customer customer; // Link to the Customer who purchased the ticket

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getPurchaseTime() {
        return purchaseTime;
    }

    public void setPurchaseTime(Timestamp purchaseTime) {
        this.purchaseTime = purchaseTime;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
