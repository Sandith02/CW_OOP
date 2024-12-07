package com.example.backend.controller;

import com.example.backend.model.Vendor;
import com.example.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class LoginController {

    @Autowired
    private VendorRepository vendorRepository;

    private Map<String, String> session = new HashMap<>(); // Temporary session

    // Register a new vendor
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Vendor vendor) {
        if (vendorRepository.findByUsername(vendor.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        vendorRepository.save(vendor);
        return ResponseEntity.ok("Registration Successful");
    }

    // Vendor login
    @PostMapping
    public ResponseEntity<String> login(@RequestBody Vendor loginDetails) {
        Optional<Vendor> vendor = vendorRepository.findByUsername(loginDetails.getUsername());
        if (vendor.isPresent() && vendor.get().getPassword().equals(loginDetails.getPassword())) {
            session.put("loggedInVendor", loginDetails.getUsername()); // Save to session
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Invalid Username or Password");
        }
    }

    // Vendor logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        session.remove("loggedInVendor"); // Clear session
        return ResponseEntity.ok("Logged Out");
    }

    // Get logged-in vendor (Optional Helper)
    public String getLoggedInVendor() {
        return session.get("loggedInVendor");
    }
}
