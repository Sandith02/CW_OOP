package com.example.backend.repository;

import com.example.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Find tickets by status
    List<Ticket> findByStatus(String status);

    // Custom query to find tickets for a specific customer
    @Query("SELECT t FROM Ticket t WHERE t.customer.id = :customerId")
    List<Ticket> findByCustomerId(Long customerId);

    // Find all available tickets (for customers)
    @Query("SELECT t FROM Ticket t WHERE t.status = 'AVAILABLE' AND t.customer IS NULL")
    List<Ticket> findAvailableTickets();

    // Find tickets by vendor ID (for vendors)
    @Query("SELECT t FROM Ticket t WHERE t.vendor.id = :vendorId")
    List<Ticket> findTicketsByVendorId(Long vendorId);
}
