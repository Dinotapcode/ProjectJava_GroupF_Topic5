package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(int userId); // Method to fetch payments by userId
}
