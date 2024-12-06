package com.example.backend.repository;

import com.example.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Find tickets by status (case-insensitive, flexible usage)
    List<Ticket> findByStatus(String status);

    // Custom JPQL query to find available tickets with exact case match
    @Query("SELECT t FROM Ticket t WHERE t.status = 'AVAILABLE'")
    List<Ticket> findAvailableTickets();

    // Count the number of tickets by a specific status
    long countByStatus(String status);

    // Find tickets by customer ID
    @Query("SELECT t FROM Ticket t WHERE t.customer.id = :customerId")
    List<Ticket> findByCustomerId(Long customerId);
}
